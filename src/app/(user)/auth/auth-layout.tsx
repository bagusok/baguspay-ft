"use client";

import { Button } from "@/components/ui/button";
import { userAtom, userTokenAtom } from "@/store";
import { UserPermission } from "@/types/UserPermission";
import { AxiosError } from "axios";
import { useAtomValue, useSetAtom } from "jotai";
import Link from "next/link";
import { redirect, RedirectType, useRouter } from "next/navigation";

export default function AuthLayout({
  roles = [UserPermission.USER],
  children,
}: {
  roles: UserPermission[];
  children: React.ReactNode;
}) {
  const getUser = useAtomValue(userAtom);
  const setUserToken = useSetAtom(userTokenAtom);
  const router = useRouter();

  if (getUser.isLoading) {
    return (
      <div className="w-full h-dvh inline-flex justify-center items-center col-span-10">
        <h2 className="text-xl font-semibold">Loading...</h2>
      </div>
    );
  }

  if (getUser.error) {
    if ((getUser.error as AxiosError).response?.status === 401) {
      setUserToken(null);
      return redirect("/auth/login", RedirectType.replace);
    } else if ((getUser.error as AxiosError).response?.status === 403) {
      return (
        <div className="w-full h-dvh flex flex-col justify-center items-center col-span-10">
          <h2 className="text-xl font-semibold">
            {/* @ts-ignore */}
            {(getUser.error as AxiosError).response?.data.message}
          </h2>
          <Button
            onClick={(e) => {
              setUserToken(null);
              redirect("/auth/login", RedirectType.replace);
            }}
            className="mt-3"
          >
            Logout
          </Button>
        </div>
      );
    }

    return (
      <div className="w-full h-dvh flex flex-col justify-center items-center col-span-10">
        <h2 className="text-xl font-semibold">Something went wrong</h2>
        <Button onClick={(e) => window.location.reload} className="mt-3">
          Reload Page
        </Button>
      </div>
    );
  }

  if (!getUser.data?.role) {
    setUserToken(null);
    return redirect("/auth/login", RedirectType.replace);
  }

  if (roles.includes(getUser!.data!.role)) {
    return children as JSX.Element;
  } else {
    if (getUser.data.role === UserPermission.GUEST) {
      return (
        <div className="w-full h-dvh flex flex-col gap-3 items-center mt-60 col-span-10">
          <h2 className="text-xl font-semibold">
            Please Login to access this page!
          </h2>
          <Link
            href="/auth/login"
            className="px-6 py-2 bg-primary text-primary-foreground rounded-md hover:opacity-70 w-fit"
          >
            Login
          </Link>
        </div>
      );
    }

    return (
      <div className="w-full h-dvh flex flex-col gap-5 justify-center items-center col-span-10">
        <h2 className="text-xl font-semibold">Oops... Kamu tersesat</h2>
        <Link
          href="/"
          className="px-6 py-2 bg-primary text-primary-foreground rounded-md hover:opacity-70 w-fit"
        >
          Kembali ke home
        </Link>
      </div>
    );
  }
}
