import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "BEAUTY DROP MONGOLIA — Exclusive beauty drops",
  description: "A considered selection of beauty drops for Mongolia. Limited editions, exclusive releases and transparent pre-orders.",
  other: {
    "codex-preview": "development",
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="mn">
      <body className="antialiased">{children}</body>
    </html>
  );
}
