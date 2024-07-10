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

export default function Users() {
  const userToken = useAtomValue(userTokenAtom);
  const [openAdvanceFilter, setOpenAdvanceFilter] = useState(false);
  const [openModalManageUsers, setOpenModalManageUsers] =
    useState<boolean>(false);
  const [selectedUsersId, setSelectedUsersId] = useState<string>("");

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

  const getAllUsers = useQuery({
    queryKey: ["getAllUsers", searchParams.toString()],
    queryFn: () =>
      axiosIn
        .get(`${apiUrl}/admin/users?${searchParams.toString()}`, {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        })
        .then((res) => res.data)
        .catch((err) => err.response.data),
  });

  const column: ColumnDef<UsersColumn>[] = [
    {
      accessorKey: "id",
      header: "ID",
      cell: ({ row }) => (
        <Link
          className="hover:underline"
          href={`/admin/users/${row.original.id}`}
        >
          #{row.original.id.slice(0, 6)}...
        </Link>
      ),
    },
    {
      accessorKey: "username",
      header: "Username",
      cell: ({ row }) => (
        <Link
          className="text-blue-500 hover:underline font-semibold"
          href={`/admin/users/${row.original.id}`}
        >
          {row.original.username}
        </Link>
      ),
    },
    {
      accessorKey: "balance",
      header: () => (
        <Button
          variant="ghost"
          onClick={() => router.replace(`${pathname}?${handleSort("balance")}`)}
        >
          Balance
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => priceFormat(row.original.balance),
    },
    {
      accessorKey: "email",
      header: "Email",
    },
    {
      accessorKey: "isBanned",
      header: () => (
        <Button
          variant="ghost"
          onClick={() =>
            router.replace(`${pathname}?${handleSort("isBanned")}`)
          }
        >
          Is Banned
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => (
        <Badge
          variant={row.original.isBanned ? "default" : "secondary"}
          className={cn({
            "bg-red-200": row.original.isBanned,
          })}
        >
          {row.original.isBanned ? "Yes" : "No"}
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
                  setSelectedUsersId(row.getValue("id"));
                  setOpenModalManageUsers(true);
                }}
              >
                Manage
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() =>
                  router.push(
                    `/admin/transactions?searchQuery=${row.original.id}&searchBy=userId`
                  )
                }
              >
                History Transactions
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() =>
                  router.push(
                    `/admin/payments/deposit-history?searchQuery=${row.original.id}&searchBy=userId`
                  )
                }
              >
                History Deposit
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() =>
                  router.push(
                    `/admin/users/balance-mutation?searchQuery=${row.original.id}&searchBy=userId`
                  )
                }
              >
                Balance Mutation
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
          <h1 className="text-lg font-bold">All User</h1>
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
                    label: "User ID",
                  },
                  {
                    value: "username",
                    label: "Username",
                  },
                ]}
                defaultValue={[
                  {
                    value: "id",
                    label: "User ID",
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
            isLoading={getAllUsers.isLoading}
            columns={column}
            data={getAllUsers?.data?.data}
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
                  getAllUsers?.data?.pagination?.totalPage
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

type UsersColumn = {
  id: string;
  username: string;
  longName: string;
  email: string;
  balance: number;
  role: string;
  isBanned: boolean;
  createdAt: string;
};
