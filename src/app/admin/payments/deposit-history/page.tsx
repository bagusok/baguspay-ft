"use client";

import AuthLayout from "@/app/(user)/auth/auth-layout";
import { DataTable } from "@/components/data-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";
import { axiosIn } from "@/lib/axios";
import { apiUrl } from "@/lib/constant";
import { cn, parseDate, priceFormat } from "@/lib/utils";
import { userTokenAtom } from "@/store";
import { UserPermission } from "@/types/UserPermission";
import { CaretSortIcon, DotsHorizontalIcon } from "@radix-ui/react-icons";
import { useQuery } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";
import { useAtomValue } from "jotai";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useCallback, useState } from "react";
import Select from "react-select";
import ModalAdvanceFilter from "./modal-advance-filter";
import ModalManageDeposit from "./modal-manage-deposit";

export default function GetAllDepositPage() {
  const userToken = useAtomValue(userTokenAtom);
  const [openAdvanceFilter, setOpenAdvanceFilter] = useState(false);
  const [openModalManageDeposit, setOpenModalManageDeposit] =
    useState<boolean>(false);
  const [selectedDepositId, setselectedDepositId] = useState<string>("");

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

  const handleSort = (sortBy: string) => {
    const getSortBy = searchParams.get("sortBy");
    const getSortType =
      getSortBy && getSortBy.includes(".")
        ? getSortBy.split(".")[1].toLowerCase()
        : "asc";

    return `${createQueryString(
      "sortBy",
      `${sortBy}.${getSortType == "asc" ? "desc" : "asc"}`
    )}`;
  };

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const params = new URLSearchParams(searchParams.toString());
    params.set("searchQuery", e.currentTarget?.searchQuery.value);
    params.set("searchBy", e.currentTarget?.searchBy.value);

    router.replace(`${pathname}?${params}`);
  };

  const getAllDeposit = useQuery({
    queryKey: ["getAllDeposit", searchParams.toString()],
    queryFn: () =>
      axiosIn
        .get(`${apiUrl}/admin/deposit?${searchParams.toString()}`, {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        })
        .then((res) => res.data)
        .catch((err) => err.response.data),
  });

  const column: ColumnDef<DepositHistoryColumn>[] = [
    {
      accessorKey: "id",
      header: "ID",
      cell: ({ row }) => (
        <Link
          className="hover:underline"
          href={`/user/balance/deposit/${row.original.id}`}
        >
          #{row.original.id.slice(0, 6)}...
        </Link>
      ),
    },
    {
      accessorKey: "Amount",
      header: "Amount",
      cell: ({ row }) => priceFormat(row.original.amount),
    },
    {
      accessorKey: "Fees",
      header: "Fees",
      cell: ({ row }) => priceFormat(row.original.fees),
    },
    {
      accessorKey: "total",
      header: "Total",
      cell: ({ row }) => priceFormat(row.original.total),
    },
    {
      accessorKey: "paymentName",
      header: "Pembayaran",
    },
    {
      accessorKey: "depositStatus",
      header: () => (
        <Button
          variant="ghost"
          onClick={() =>
            router.replace(`${pathname}?${handleSort("paidStatus")}`)
          }
        >
          Deposit Status
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => (
        <Badge
          variant="outline"
          className={cn("border-red-600 text-red-600", {
            "border-green-600 text-green-600":
              row.original.depositStatus === "SUCCESS",
            "border-orange-600 text-orange-600":
              row.original.depositStatus === "PENDING" ||
              row.original.depositStatus == "PROCESS",
          })}
        >
          {row.original.depositStatus}
        </Badge>
      ),
    },
    {
      accessorKey: "user",
      header: "User",
      cell: ({ row }) => (
        <Badge variant="secondary" className="text-xs">
          {row.original.user.username}
        </Badge>
      ),
    },
    {
      accessorKey: "sourceType",
      header: () => (
        <Button
          variant="ghost"
          onClick={() =>
            router.replace(`${pathname}?${handleSort("sourceType")}`)
          }
        >
          Source
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => (
        <Badge variant="secondary" className="text-xs">
          {row.original.sourceType}
        </Badge>
      ),
    },
    {
      accessorKey: "createdAt",
      header: () => (
        <Button
          variant="ghost"
          onClick={() =>
            router.replace(`${pathname}?${handleSort("createdAt")}`)
          }
        >
          Created At
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => parseDate(row.original.createdAt),
    },
    {
      accessorKey: "action",
      header: "Action",
      cell: ({ row }) => {
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <DotsHorizontalIcon className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => {
                  setselectedDepositId(row.getValue("id"));
                  setOpenModalManageDeposit(true);
                }}
              >
                Manage
              </DropdownMenuItem>
              <DropdownMenuItem
              // onClick={() => deletePaymentMethod.mutate(row.getValue("id"))}
              >
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  return (
    <>
      <AuthLayout roles={[UserPermission.ADMIN]}>
        <div className="min-h-dvh w-full">
          <ModalAdvanceFilter
            openModal={openAdvanceFilter}
            setOpenModal={setOpenAdvanceFilter}
          />
          <ModalManageDeposit
            refetch={getAllDeposit.refetch}
            openModal={openModalManageDeposit}
            setOpenModal={setOpenModalManageDeposit}
            depositId={selectedDepositId}
          />
          <h1 className="text-lg font-bold">All Deposits</h1>
          <div className="mt-4 flex flex-col md:flex-row gap-4 justify-between">
            <form
              className="inline-flex gap-2 items-center w-full"
              action=""
              onSubmit={(e) => handleSearch(e)}
            >
              <Select
                name="searchBy"
                options={[
                  {
                    value: "id",
                    label: "Deposit ID",
                  },
                  {
                    value: "userId",
                    label: "User ID",
                  },
                ]}
                defaultValue={[
                  {
                    value: "id",
                    label: "Deposit ID",
                  },
                ]}
              />
              <input
                type="text"
                placeholder="Search..."
                name="searchQuery"
                className="border border-gray-300 rounded-md py-1.5 px-2"
                defaultValue={searchParams.get("searchQuery")?.toString() ?? ""}
              />
              <Button type="submit" className="text-sm">
                Search
              </Button>
            </form>
            <div className="inline-flex gap-2">
              <Button
                onClick={() => setOpenAdvanceFilter(true)}
                className="text-sm"
              >
                Advance Filter
              </Button>
              <Button variant="outline" className="text-sm">
                Export
              </Button>
            </div>
          </div>
          <DataTable
            isLoading={getAllDeposit.isLoading}
            columns={column}
            data={getAllDeposit?.data?.data}
          >
            <div className="space-x-2 inline-flex w-full justify-end mt-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  router.replace(
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
                  router.replace(
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
                  getAllDeposit?.data?.pagination?.totalPage
                }
              >
                Next
              </Button>
            </div>
          </DataTable>
        </div>
      </AuthLayout>
    </>
  );
}

type DepositHistoryColumn = {
  id: string;
  paymentName: string;
  depositStatus: string;
  user: {
    id: string;
    username: string;
  };
  sourceType: string;
  amount: number;
  fees: number;
  total: number;
  createdAt: string;
};
