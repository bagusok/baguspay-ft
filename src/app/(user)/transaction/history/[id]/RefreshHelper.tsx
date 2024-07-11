"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function RefreshHelper({ data }: { data: any }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  useEffect(() => {
    const interval = setInterval(() => {
      if (
        data.paidStatus != "CANCELED" ||
        data.paidStatus != "EXPIRED" ||
        data.paidStatus != "PAID"
      ) {
        router.replace(pathname + "?time=" + new Date().getTime());
      }
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  return <div></div>;
}
