"use client";

import { DataTable } from "@/components/data-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { axiosIn } from "@/lib/axios";
import { apiUrl } from "@/lib/constant";
import { cn, parseDate, parseDateWhithoutTime, priceFormat } from "@/lib/utils";
import { userTokenAtom } from "@/store";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";
import { useAtomValue } from "jotai";
import Link from "next/link";
import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import { Fragment, useCallback, useEffect, useMemo, useRef } from "react";
import { useInView } from "react-intersection-observer";

export default function DepositHistory() {
  const userToken = useAtomValue(userTokenAtom);

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  const getDepositHistory = useQuery({
    queryKey: ["depositHistory", searchParams.toString()],
    queryFn: () =>
      axiosIn
        .get(`${apiUrl}/user/deposit/history?${searchParams.toString()}`, {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        })
        .then((res) => res.data)
        .catch((err) => err),
  });

  const column: ColumnDef<DepositHistoryColumn>[] = [
    {
      accessorKey: "id",
      header: "ID",
      cell: ({ row }: { row: any }) => (
        <Link
          className="hover:underline"
          href={`/transaction/history/${row.original.id}`}
        >
          #{row.original.id.slice(0, 6)}...
        </Link>
      ),
    },
    {
      accessorKey: "paymentName",
      header: "Payment Name",
      cell: ({ row }: { row: any }) => (
        <Link
          className="text-blue-500 hover:underline font-semibold"
          href={`/user/balance/deposit/${row.original.id}`}
        >
          {row.original.paymentName}
        </Link>
      ),
    },
    {
      accessorKey: "amount",
      header: "Amount",
      cell: ({ row }: { row: any }) => priceFormat(row.original.amount),
    },
    {
      accessorKey: "fees",
      header: "Fees",
      cell: ({ row }: { row: any }) => priceFormat(row.original.fees),
    },
    {
      accessorKey: "Total",
      header: "Total",
      cell: ({ row }: { row: any }) => priceFormat(row.original.total),
    },
    {
      accessorKey: "depositStatus",
      header: "Status",
      cell: ({ row }: { row: any }) => (
        <Badge
          variant="outline"
          className={cn("border-red-600 text-red-600", {
            "border-green-600 text-green-600":
              row.original.depositStatus === "SUCCESS",
            "border-orange-600 text-orange-600":
              row.original.depositStatus === "PENDING",
          })}
        >
          {row.original.depositStatus}
        </Badge>
      ),
    },
    {
      accessorKey: "createdAt",
      header: "Tanggal Transaksi",
      cell: ({ row }) => parseDate(row.original.createdAt),
    },
    {
      accessorKey: "expiredAt",
      header: "Tanggal Transaksi",
      cell: ({ row }) => parseDate(row.original.createdAt),
    },
    {
      accessorKey: "action",
      header: "",
      cell: ({ row }) => (
        <Link
          className="px-3 py-1 text-xs font-medium bg-primary text-primary-foreground rounded"
          href={`/user/balance/deposit/${row.original.id}`}
        >
          Detail
        </Link>
      ),
    },
  ];

  return (
    <>
      <DataTable
        isLoading={getDepositHistory.isLoading}
        columns={column}
        data={getDepositHistory?.data?.data}
      >
        <div className="space-x-2 inline-flex w-full justify-end mt-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              router.push(
                pathname +
                  "?" +
                  createQueryString(
                    "page",
                    `${Number(searchParams.get("page")) - 1}`
                  )
              );
              // getProducts.refetch();
            }}
            disabled={Number(searchParams.get("page")) <= 1}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              router.push(
                pathname +
                  "?" +
                  createQueryString(
                    "page",
                    `${Number(searchParams.get("page") ?? 1) + 1}`
                  )
              );
            }}
            disabled={
              Number(searchParams.get("page")) >=
              getDepositHistory?.data?.pagination?.totalPage
            }
          >
            Next
          </Button>
        </div>
      </DataTable>
    </>
  );
}

type DepositHistoryColumn = {
  id: string;
  paymentName: string;
  depositStatus: string;
  amount: number;
  fees: number;
  total: number;
  createdAt: string;
  expiredAt: string;
};
