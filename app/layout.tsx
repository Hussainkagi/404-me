import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Hussain Kagiwala | Software Engineer Portfolio",
  description:
    "Full-Stack Software Engineer based in Dubai, UAE. Interactive 3D portfolio showcasing experience, projects, and skills.",
  generator: "v0.app",
  icons: {
    icon: [
      {
        url: "/laptop2.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/laptop2.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/laptop2.png",
        type: "image/png",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
