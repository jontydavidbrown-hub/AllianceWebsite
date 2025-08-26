'use client';
import { useEffect } from 'react';

/**
 * GoldStarsOverlay — draws a performant, adaptive gold starfield on a fixed canvas.
 * - Auto-resizes with DPR awareness
 * - Auto-tunes density on slow devices
 * - Cleans up on unmount
 * - Ignores prefers-reduced-motion by default so it always shows (can be re-enabled if needed)
 */
export default function GoldStarsOverlay() {
  useEffect(() => {
    if (typeof document === 'undefined') return;
    const ID = 'gold-stars-overlay';
    if (document.getElementById(ID)) return;

    const cv = document.createElement('canvas');
    cv.id = ID;
    Object.assign(cv.style, {
      position:'fixed', inset:'0', width:'100vw', height:'100vh',
      pointerEvents:'none', zIndex:'2147483647'
    } as CSSStyleDeclaration);
    document.body.appendChild(cv);
    const ctx = cv.getContext('2d', { alpha:true });
    if (!ctx) return;

    // Config
    let DPR_CAP = 1.35;
    const DENSITY_BG  = 120;
    const DENSITY_MID = 85;
    const DENSITY_FG  = 55;
    let MAX_STARS_CAP = 220;
    const SPEED_MIN=0.05, SPEED_MAX=0.55;
    let TWINKLE_AMPL=0.60;
    const DRIFT_FREQ=0.0010;

    // State
    let width=0, height=0, dpr=1, last=performance.now(), running=true, raf=0;
    const layers = [
      { stars:[] as any[], speedScale:0.22, densityBase:DENSITY_BG,  spritePicker:null as any },
      { stars:[] as any[], speedScale:0.55, densityBase:DENSITY_MID, spritePicker:null as any },
      { stars:[] as any[], speedScale:1.00, densityBase:DENSITY_FG,  spritePicker:null as any }
    ];

    // Sprites
    function makeGlow(size:number){
      const off = document.createElement('canvas');
      const s = Math.ceil(size*3.0);
      off.width = s; off.height = s;
      const c = off.getContext('2d')!;
      c.translate(s/2, s/2);
      const g = c.createRadialGradient(0,0,0, 0,0, size*1.5);
      g.addColorStop(0.00,'rgba(255,242,170,0.98)');
      g.addColorStop(0.30,'rgba(255,223, 77,0.95)');
      g.addColorStop(0.75,'rgba(255,215,  0,0.55)');
      g.addColorStop(1.00,'rgba(255,215,  0,0.00)');
      c.fillStyle=g; c.beginPath(); c.arc(0,0,size*1.6,0,Math.PI*2); c.fill();
      c.fillStyle='rgba(255,250,210,0.95)';
      c.beginPath(); c.arc(0,0,Math.max(0.5,size*0.3),0,Math.PI*2); c.fill();
      return off;
    }
    const SPR_TINY  = makeGlow(0.65);
    const SPR_SMALL = makeGlow(0.95);
    const SPR_MED   = makeGlow(1.40);
    const SPR_LARGE = makeGlow(1.80);
    (layers[0] as any).spritePicker = (r:number)=> r<0.75?SPR_TINY:SPR_SMALL;
    (layers[1] as any).spritePicker = (r:number)=> r<1.15?SPR_SMALL:SPR_MED;
    (layers[2] as any).spritePicker = (r:number)=> r>1.45?SPR_LARGE:SPR_MED;

    const rand = (a:number,b:number)=> Math.random()*(b-a)+a;

    function resize(){
      width = window.innerWidth; height = window.innerHeight;
      dpr = Math.min(DPR_CAP, Math.max(1, window.devicePixelRatio||1));
      cv.width  = Math.floor(width * dpr);
      cv.height = Math.floor(height * dpr);
      (cv.style as any).width  = width + 'px';
      (cv.style as any).height = height + 'px';
      ctx.setTransform(dpr,0,0,dpr,0,0);
      spawnUniform();
    }

    function spawnUniform(){
      const area = width*height;
      // total target first
      let totalTarget = 0, perLayerTarget:number[] = [];
      for (const L of layers){
        const target = Math.floor(area * ((L as any).densityBase/(1280*720)));
        perLayerTarget.push(target); totalTarget += target;
      }
      const scale = totalTarget > MAX_STARS_CAP ? (MAX_STARS_CAP/totalTarget) : 1;

      for (let i=0; i<layers.length; i++){
        const L:any = layers[i];
        const target = Math.max(1, Math.floor(perLayerTarget[i]*scale));
        const cols = Math.ceil(Math.sqrt(target * (width/height)));
        const rows = Math.ceil(target / cols);
        const cw = width/cols, ch = height/rows;
        const arr:any[] = [];
        let n=0;
        for (let r=0; r<rows; r++){
          for (let c=0; c<cols; c++){
            if (n++ >= target) break;
            const x = c*cw + rand(cw*0.15, cw*0.85);
            const y = r*ch + rand(ch*0.15, ch*0.85);
            arr.push(makeStar(L, x, y));
          }
        }
        L.stars = arr;
      }
    }

    function makeStar(L:any, x:number, y:number){
      const dir = rand(0, Math.PI*2);
      const base = rand(SPEED_MIN, SPEED_MAX) * L.speedScale;
      const r = rand(0.55, 1.8);
      return {
        x, y,
        vx:Math.cos(dir)*base, vy:Math.sin(dir)*base,
        r,
        phase:rand(0,Math.PI*2),
        tw:rand(0.5,1.0),
        twinkleSpeed:rand(0.0016,0.0036),
        driftPhase:rand(0,Math.PI*2),
        sprite:L.spritePicker(r),
        scale:r/2.3
      };
    }

    const vis = ()=>{ running = !document.hidden; if (running) last = performance.now(); };
    document.addEventListener('visibilitychange', vis, {passive:true});

    function tick(){
      if (!running) { raf = requestAnimationFrame(tick); return; }
      const now = performance.now();
      const dt = Math.min(50, now - last); last = now;

      ctx.clearRect(0,0,width,height);
      ctx.globalCompositeOperation = 'lighter';

      for (const L of layers){
        const sarr:any[] = (L as any).stars;
        for (let i=0;i<sarr.length;i++){
          const s:any = sarr[i];
          const drift = Math.sin((now + s.driftPhase*1000) * DRIFT_FREQ) * 0.35;
          const nx = s.vx + (-s.vy) * 0.10 * drift;
          const ny = s.vy + ( s.vx) * 0.10 * drift;
          s.x += nx * (dt * 0.06);
          s.y += ny * (dt * 0.06);

          if (s.x < 0) s.x += width; else if (s.x >= width) s.x -= width;
          if (s.y < 0) s.y += height; else if (s.y >= height) s.y -= height;

          const alpha = s.tw + Math.sin((now*s.twinkleSpeed) + s.phase) * TWINKLE_AMPL;
          (ctx as any).globalAlpha = alpha < 0.25 ? 0.25 : (alpha > 1 ? 1 : alpha);
          const w = s.sprite.width*s.scale, h = s.sprite.height*s.scale;
          ctx.drawImage(s.sprite, s.x - w/2, s.y - h/2, w, h);
        }
      }
      raf = requestAnimationFrame(tick);
    }

    // Auto-tuner (one-shot)
    (function autoTune(){
      let tPrev = performance.now();
      let frames = 0;
      function sample(){
        const t = performance.now();
        frames++;
        if (t - tPrev >= 2500) {
          const fps = Math.round(1000 * frames / (t - tPrev));
          if (fps < 40) { MAX_STARS_CAP = Math.floor(MAX_STARS_CAP * 0.65); DPR_CAP = Math.max(1.0, DPR_CAP - 0.25); TWINKLE_AMPL = Math.min(0.55, TWINKLE_AMPL); resize(); }
          else if (fps < 50) { MAX_STARS_CAP = Math.floor(MAX_STARS_CAP * 0.8); DPR_CAP = Math.max(1.1, DPR_CAP - 0.15); resize(); }
        } else {
          requestAnimationFrame(sample);
        }
      }
      requestAnimationFrame(sample);
    })();

    function onResize(){ resize(); }
    resize();
    window.addEventListener('resize', onResize, {passive:true});
    tick();

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', onResize);
      document.removeEventListener('visibilitychange', vis as any);
      cv.remove();
    };
  }, []);

  return null;
}
