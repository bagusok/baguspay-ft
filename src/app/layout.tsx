"use client";

import { useAtomValue } from "jotai";
import "./globals.css";
import { themeAtom } from "@/store";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const theme = useAtomValue(themeAtom);

  return (
    <html lang="en">
      <body className={theme}>{children}</body>
    </html>
  );
}
