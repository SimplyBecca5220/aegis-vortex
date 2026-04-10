import type { Metadata } from "next";
import { Outfit, Space_Mono } from "next/font/google";
import "./globals.css";

const fontSans = Outfit({
  variable: "--font-sans",
  subsets: ["latin"],
});

const fontMono = Space_Mono({
  weight: ["400", "700"],
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Aegis.Vortex | Strategic Appeal Hub for GenLayer",
  description: "Aegis.Vortex is a Predatory Consensus Engine for GenLayer. We turn the Optimistic Democracy into a transparent, high-yield game for users by bridging the gap between on-chain consensus and off-chain LLM verification.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${fontSans.variable} ${fontMono.variable} antialiased selection:bg-teal-neon/30`}>
        {children}
      </body>
    </html>
  );
}
