/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
    remotePatterns: [
      { protocol: "https", hostname: "www.jointhealliance.com.au" },
      { protocol: "https", hostname: "jointhealliance.com.au" }
    ]
  }
};
module.exports = nextConfig;
