"use client";

import AuthLayout from "@/app/(user)/auth/auth-layout";
import { axiosIn } from "@/lib/axios";
import { apiUrl } from "@/lib/constant";
import { userAtom, userTokenAtom } from "@/store";
import { UserPermission } from "@/types/UserPermission";
import { useAtomValue } from "jotai";
import Link from "next/link";

import ChartTransaction from "./chart-transaction";
import ChartBalanceMutation from "./chart-balanceMutation";
import { useMutation, useQuery } from "@tanstack/react-query";
import { cn, parseDate, priceFormat } from "@/lib/utils";
import { useEffect } from "react";
import ModalChangeProfile from "./modal-change-profile";

export default function UserDetails() {
  const userToken = useAtomValue(userTokenAtom);
  const user = useAtomValue(userAtom);

  const getUserDetail = useMutation({
    mutationKey: ["get-user-detail"],
    mutationFn: () =>
      axiosIn
        .get(`${apiUrl}/users/${user.data?.id}/info`, {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        })
        .then((res) => res.data.data)
        .catch((err) => err.response.data),
  });

  useEffect(() => {
    if (user.data?.id) getUserDetail.mutate();
  }, [user]);
  return (
    <>
      <AuthLayout roles={[UserPermission.USER, UserPermission.ADMIN]}>
        <section className="w-full px-3 md:px-0">
          {getUserDetail.isPending && <div>Loading...</div>}
          {getUserDetail.isError && (
            <div>Error: {getUserDetail.error.message}</div>
          )}
          {getUserDetail.data && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="w-full py-2 rounded-md">
                  <div className="inline-flex justify-between w-full">
                    <h2 className="text-base font-semibold">Detail User</h2>
                    <ModalChangeProfile data={getUserDetail?.data} />
                  </div>

                  <p className="text-sm mt-1 text-muted-foreground">
                    Nama: {getUserDetail.data.longName}
                  </p>
                  <p className="text-sm mt-1 text-muted-foreground">
                    Username: {getUserDetail.data.username}
                  </p>
                  <p className="text-sm mt-1 text-muted-foreground">
                    Email: {getUserDetail.data.email}
                  </p>
                  <p className="text-sm mt-1 text-muted-foreground">
                    Phone: {getUserDetail.data.phone}
                  </p>
                </div>
                <div className="w-full py-2 rounded-md">
                  <h2 className="text-base font-semibold">Akun</h2>
                  <p className="text-sm mt-1 text-muted-foreground">
                    Is Banned:{" "}
                    <span
                      className={cn({
                        "text-red-500": getUserDetail.data.isBanned,
                        "text-green-500": !getUserDetail.data.isBanned,
                      })}
                    >
                      {getUserDetail.data.isBanned ? "Ya" : "Tidak"}
                    </span>
                  </p>
                  <p className="text-sm mt-1 text-muted-foreground">
                    Role:{" "}
                    <span className="text-green-500">
                      {getUserDetail.data.role}
                    </span>
                  </p>
                  <p className="text-sm mt-1 text-muted-foreground">
                    Is Verified:{" "}
                    <span
                      className={cn({
                        "text-red-500": getUserDetail.data.isVerified,
                        "text-green-500": !getUserDetail.data.isVerified,
                      })}
                    >
                      {getUserDetail.data.isVerified ? "Ya" : "Tidak"}
                    </span>
                  </p>
                  <p className="text-sm mt-1 text-muted-foreground">
                    Terdaftar: {parseDate(getUserDetail.data.createdAt)}
                  </p>
                </div>
              </div>
              <div className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mt-4">
                <div className="bg-slate-100 rounded-md w-full p-2">
                  <h3 className="text-sm">Saldo saat ini</h3>
                  <p className="font-semibold text-sm mt-1">
                    {priceFormat(getUserDetail.data.balance)}
                  </p>

                  <Link
                    href={`/user/balance/deposit`}
                    className="text-xs italic font-normal text-muted-foreground mt-1"
                  >
                    Lihat history deposit &gt;
                  </Link>
                </div>
                <div className="bg-slate-100 rounded-md w-full p-2">
                  <h3 className="text-sm">Saldo Terpakai</h3>
                  <p className="font-semibold text-sm mt-1">
                    {priceFormat(getUserDetail.data.usedBalance?._sum.amount)}
                  </p>

                  <Link
                    href={`/user/balance`}
                    className="text-xs italic font-normal text-muted-foreground mt-1"
                  >
                    Lihat mutasi saldo &gt;
                  </Link>
                </div>
                <div className="bg-slate-100 rounded-md w-full p-2">
                  <h3 className="text-sm">Transaksi Sukses</h3>
                  <p className="font-semibold text-sm mt-1">
                    {priceFormat(
                      getUserDetail.data.totalTransaction?._sum.totalPrice
                    )}
                  </p>

                  <Link
                    href={`/transaction/history`}
                    className="text-xs italic font-normal text-muted-foreground mt-1"
                  >
                    Lihat history transaksi &gt;
                  </Link>
                </div>
                <div className="bg-slate-100 rounded-md w-full p-2">
                  <h3 className="text-sm">Point </h3>
                  <p className="font-semibold text-sm mt-1">0</p>

                  <Link
                    href=""
                    className="text-xs italic font-normal text-muted-foreground mt-1"
                  >
                    Lihat mutasi point &gt;
                  </Link>
                </div>
              </div>
            </>
          )}
          <h3 className="text-base font-semibold my-5">Ringkasan</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <ChartTransaction />
            <ChartBalanceMutation />
          </div>
        </section>
      </AuthLayout>
    </>
  );
}
