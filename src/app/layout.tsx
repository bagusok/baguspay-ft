"use client";

import { useAtom, useAtomValue } from "jotai";
import "./globals.css";
import { deviceIdAtom, globalLoadingAtom, themeAtom } from "@/store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import { useEffect } from "react";
import { cn, generateDeviceId } from "@/lib/utils";
import NextTopLoader from "nextjs-toploader";
import { Controls, Player } from "@lottiefiles/react-lottie-player";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const theme = useAtomValue(themeAtom);
  const [deviceId, setDeviceId] = useAtom(deviceIdAtom);
  const isGlobalLoading = useAtomValue(globalLoadingAtom);
  const queryClient = new QueryClient();

  useEffect(() => {
    if (!deviceId) {
      setDeviceId(generateDeviceId());
    }
  }, []);

  return (
    <html lang="en">
      <QueryClientProvider client={queryClient}>
        <body
          className={
            theme + " w-full h-full relative overflow-x-hidden box-border"
          }
        >
          <NextTopLoader showSpinner={false} />
          <Toaster position="top-right" reverseOrder={false} />
          <div
            className={cn(
              "absolute bg-primary/50 top-0 bottom-0 right-0 z-[99999] inline-flex justify-center pt-72 w-full",
              {
                hidden: !isGlobalLoading,
              }
            )}
          >
            <div className="rounded-lg bg-background py-3 px-10 h-fit">
              <Player
                autoplay
                loop
                src="/assets/lottie/loading.json"
                style={{ height: "70px", width: "70px" }}
              >
                <Controls visible={false} />
              </Player>
              <h4 className="text-sm text-center">Loading...</h4>
            </div>
          </div>
          {children}
        </body>
      </QueryClientProvider>
    </html>
  );
}
