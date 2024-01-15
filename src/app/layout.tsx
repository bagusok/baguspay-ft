"use client";

import { useAtomValue } from "jotai";
import "./globals.css";
import { themeAtom } from "@/store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const theme = useAtomValue(themeAtom);
  const queryClient = new QueryClient();

  return (
    <html lang="en">
      <QueryClientProvider client={queryClient}>
        <body className={theme + " box-border"}>{children}</body>
      </QueryClientProvider>
    </html>
  );
}
