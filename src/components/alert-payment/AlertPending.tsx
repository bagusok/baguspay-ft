"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ClockIcon } from "@radix-ui/react-icons";
import { useEffect, useRef, useState } from "react";

export default function AlertPaymentPending({
  targetTime,
}: {
  targetTime: number;
}) {
  const [timeLeft, setTimeLeft] = useState(targetTime - Date.now());
  const timerRef = useRef(null);

  useEffect(() => {
    // @ts-ignore
    timerRef.current = setInterval(() => {
      const currentTime = Date.now();
      const difference = targetTime - currentTime;
      console.log(targetTime, currentTime, difference);

      if (difference <= 0) {
        // @ts-ignore
        clearInterval(timerRef.current);
        setTimeLeft(0);
      } else {
        setTimeLeft(difference);
      }
    }, 1000);

    // @ts-ignore
    return () => clearInterval(timerRef.current);
  }, [targetTime]);

  const formatTime = (milliseconds: number) => {
    console.log(milliseconds);
    if (milliseconds <= 0) return "00:00:00";

    const totalSeconds = Math.floor(milliseconds / 1000);
    const seconds = totalSeconds % 60;
    const minutes = Math.floor(totalSeconds / 60) % 60;
    const hours = Math.floor(totalSeconds / 3600) % 24;

    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
      2,
      "0"
    )}:${String(seconds).padStart(2, "0")}`;
  };

  return (
    <Alert className="bg-orange-100 dark:bg-transparent dark:border dark:border-white">
      <ClockIcon className="h-5 w-5" />
      <AlertTitle className="font-semibold">
        Yuk bayar tagihanmu sebelum waktu habis!
      </AlertTitle>
      <AlertDescription className="inline-flex items-center">
        Waktu tersisa &nbsp;
        <span className="font-semibold text-red-600 text-base">
          {formatTime(timeLeft)}
        </span>
      </AlertDescription>
    </Alert>
  );
}
