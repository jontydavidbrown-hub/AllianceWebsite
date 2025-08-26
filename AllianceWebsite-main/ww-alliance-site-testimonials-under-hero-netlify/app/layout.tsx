import type { Metadata } from "next";
import "./globals.css";
import GoldStarsOverlay from "../components/GoldStarsOverlay";

export const metadata: Metadata = {
  title: "The W&W Global Alliance — AI Money Making & Personal Development",
  description:
    "Join the Alliance: AI sports betting, race betting, crypto trading and more. Global community, courses, 24/7 support.",
  openGraph: {
    title: "The W&W Global Alliance",
    description:
      "AI Money Making Platform — print money on your phone with our global community of winners.",
    type: "website",
    url: "https://jointhealliance.com.au",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <GoldStarsOverlay />
        {children}
      </body>
    </html>
  );
}
