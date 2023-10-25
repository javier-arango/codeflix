import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@styles/globals.scss";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Cinemify",
  description:
    "Cinemify aims to be the ultimate destination for movie enthusiasts, providing a comprehensive and interactive platform to explore, review, and watch films.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}

// Display name
RootLayout.displayName = "RootLayout";
