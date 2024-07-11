"use client";

import { UserPermission } from "@/types/UserPermission";
import AuthLayout from "../../auth/auth-layout";
import { useQuery } from "@tanstack/react-query";
import { axiosIn } from "@/lib/axios";
import { apiUrl } from "@/lib/constant";
import { useAtomValue } from "jotai";
import { userTokenAtom } from "@/store";
import { Button } from "@/components/ui/button";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { DataTable } from "@/components/data-table";
import { useCallback } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { cn, parseDate, priceFormat } from "@/lib/utils";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { SlashIcon } from "@radix-ui/react-icons";

export default function TransactionHistory() {
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

  const getTransactionHistory = useQuery({
    queryKey: ["transactionHistory", searchParams.toString()],
    queryFn: () =>
      axiosIn
        .get(`${apiUrl}/transaction/list?${searchParams.toString()}`, {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        })
        .then((res) => res.data)
        .catch((err) => err),
  });

  const column: ColumnDef<TransactionHistoryColumn>[] = [
    {
      accessorKey: "id",
      header: "ID",
      cell: ({ row }) => (
        <Link
          className="hover:underline"
          href={`/transaction/history/${row.original.id}`}
        >
          #{row.original.id.slice(0, 6)}...
        </Link>
      ),
    },
    {
      accessorKey: "productName",
      header: "Product Name",
      cell: ({ row }) => (
        <Link
          className="text-blue-500 hover:underline font-semibold"
          href={`/transaction/history/${row.original.id}`}
        >
          {row.original.productName}
        </Link>
      ),
    },
    {
      accessorKey: "totalPrice",
      header: "Price",
      cell: ({ row }) => priceFormat(row.original.totalPrice),
    },
    {
      accessorKey: "paymentName",
      header: "Pembayaran",
    },
    {
      accessorKey: "paidStatus",
      header: "Paid Status",
      cell: ({ row }) => (
        <Badge
          variant="outline"
          className={cn("border-red-600 text-red-600", {
            "border-green-600 text-green-600":
              row.original.paidStatus === "PAID",
            "border-orange-600 text-orange-600":
              row.original.paidStatus === "PENDING",
          })}
        >
          {row.original.paidStatus}
        </Badge>
      ),
    },
    {
      accessorKey: "orderStatus",
      header: "Order Status",
      cell: ({ row }) => (
        <Badge
          variant="outline"
          className={cn("border-red-600 text-red-600", {
            "border-green-600 text-green-600":
              row.original.orderStatus === "SUCCESS",
            "border-gray-600 text-gray-600":
              row.original.orderStatus === "PENDING",
            "border-orange-600 text-orange-600":
              row.original.orderStatus === "PROCESS",
          })}
        >
          {row.original.orderStatus}
        </Badge>
      ),
    },
    {
      accessorKey: "isRefunded",
      header: "Refunded",
    },
    {
      accessorKey: "createdAt",
      header: "Tanggal Transaksi",
      cell: ({ row }) => parseDate(row.original.createdAt),
    },
  ];

  return (
    <AuthLayout roles={[UserPermission.ADMIN, UserPermission.USER]}>
      <div className="w-full px-6 md:px-0">
        <DataTable
          isLoading={getTransactionHistory.isLoading}
          columns={column}
          data={getTransactionHistory?.data?.data}
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
                getTransactionHistory?.data?.pagination?.totalPage
              }
            >
              Next
            </Button>
          </div>
        </DataTable>
      </div>
    </AuthLayout>
  );
}

type TransactionHistoryColumn = {
  id: string;
  productName: string;
  totalPrice: number;
  paymentName: string;
  paidStatus: string;
  orderStatus: string;
  isRefunded: boolean;
  createdAt: string;
  paidAt: string;
  sendAt: string;
};
