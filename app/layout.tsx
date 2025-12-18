import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Exam Room: One Minute",
  description: "You have 60 seconds. Answer correctly to earn time.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
