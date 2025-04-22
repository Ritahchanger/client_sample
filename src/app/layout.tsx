import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "University course finder",
  description: "a simple website to help in course finding",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
