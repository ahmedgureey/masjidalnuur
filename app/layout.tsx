import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Masjid Sadaqa Tracker",
  description: "Track sadaqa donations toward our fundraising goal.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="font-sans antialiased min-h-screen">{children}</body>
    </html>
  );
}
