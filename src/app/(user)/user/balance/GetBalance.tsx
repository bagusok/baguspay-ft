"use client";

import { axiosIn } from "@/lib/axios";
import { apiUrl } from "@/lib/constant";
import { priceFormat } from "@/lib/utils";
import { userTokenAtom } from "@/store";
import { useQuery } from "@tanstack/react-query";
import { useAtomValue } from "jotai";

export default function GetBalance() {
  const userToken = useAtomValue(userTokenAtom);

  const getBalance = useQuery({
    queryKey: ["GetBalance"],
    queryFn: () =>
      axiosIn(`${apiUrl}/users/balance`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      })
        .then((res) => res.data.data)
        .catch((err) => console.log(err)),
  });

  if (getBalance.isLoading) return <div>Loading...</div>;

  if (getBalance.isError) return <div>Error...</div>;

  return (
    <>
      <h2 className="text-primary">Saldo</h2>
      <p className="text-muted-foreground">
        {priceFormat(getBalance.data.balance)}
      </p>
    </>
  );
}
