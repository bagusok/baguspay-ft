"use client";
import { userAtom, userTokenAtom } from "@/store";
import { useAtomValue, useSetAtom } from "jotai";
import { redirect } from "next/navigation";
import { useEffect } from "react";

export default function Logout() {
  const setUserToken = useSetAtom(userTokenAtom);
  const user = useAtomValue(userAtom);

  useEffect(() => {
    setUserToken(null);
    user.refetch();

    return () => redirect("/auth/login");
  }, [setUserToken, user]);

  return (
    <div>
      <h1>Logout</h1>
    </div>
  );
}
