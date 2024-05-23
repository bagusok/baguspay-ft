"use client";

import { useAtom, useAtomValue } from "jotai";
import "./globals.css";
import { deviceIdAtom, themeAtom } from "@/store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import { useEffect } from "react";
import { generateDeviceId } from "@/lib/utils";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const theme = useAtomValue(themeAtom);
  const [deviceId, setDeviceId] = useAtom(deviceIdAtom);
  const queryClient = new QueryClient();

  useEffect(() => {
    if (!deviceId) {
      setDeviceId(generateDeviceId());
    }
  }, []);

  return (
    <html lang="en">
      <QueryClientProvider client={queryClient}>
        <body className={theme + " w-full h-full relative overflow-x-hidden"}>
          <Toaster position="top-right" reverseOrder={false} />
          {children}
        </body>
      </QueryClientProvider>
    </html>
  );
}
