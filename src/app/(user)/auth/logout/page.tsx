"use client";
import { globalLoadingAtom, userAtom, userTokenAtom } from "@/store";
import { useAtomValue, useSetAtom } from "jotai";
import { redirect } from "next/navigation";
import { useEffect } from "react";

export default function Logout() {
  const setUserToken = useSetAtom(userTokenAtom);
  const user = useAtomValue(userAtom);
  const setGlobalLoading = useSetAtom(globalLoadingAtom);

  useEffect(() => {
    setGlobalLoading(true);
    setUserToken(null);
    user.refetch();
    setGlobalLoading(false);

    return () => redirect("/auth/login");
  }, [setUserToken, user]);

  return (
    <div>
      <h1>Logout</h1>
    </div>
  );
}
