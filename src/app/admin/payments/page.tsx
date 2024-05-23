"use client";

import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import AdminAddPaymentModal from "./add-payment-modal";
import { useCallback, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useAtomValue } from "jotai";
import { userTokenAtom } from "@/store";
import { apiUrl } from "@/lib/constant";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/data-table";
import { ColumnDef } from "@tanstack/react-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CaretSortIcon, DotsHorizontalIcon } from "@radix-ui/react-icons";
import { parseDate, priceFormat } from "@/lib/utils";
import { Switch } from "@/components/ui/switch";
import toast from "react-hot-toast";
import AdminEditPaymentModal from "./edit-payment-modal";
import { axiosIn } from "@/lib/axios";

export default function AdminPaymentsPage() {
  const [OpenModalCreatePayment, setOpenModalCreatePayment] = useState(false);
  const [openModalEditPayment, setOpenModalEditPayment] = useState(false);
  const [activePaymentMethodId, setActivePaymentMethodId] =
    useState<string>("");

  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const userToken = useAtomValue(userTokenAtom);

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

  const getPaymentMethods = useQuery({
    queryKey: ["payment-method", searchParams.toString()],
    queryFn: () =>
      axiosIn(`${apiUrl}/admin/payment-method?${searchParams.toString()}`, {
        headers: {
          authorization: `Bearer ${userToken}`,
        },
      })
        .then((res) => res.data)
        .catch((err) => toast.error(err)),
  });

  const editPaymentMethod = useMutation({
    mutationKey: ["edit-payment-method"],
    mutationFn: async (data: any) => {
      const editPaymentMethod = await axiosIn.post(
        `${apiUrl}/admin/payment-method/update`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userToken}`,
          },
        }
      );
      try {
        if (editPaymentMethod.data.statusCode != 200) {
          throw new Error(editPaymentMethod.data.message);
        }

        toast.success(editPaymentMethod.data.message);
        getPaymentMethods.refetch();

        return editPaymentMethod.data;
      } catch (error: any) {
        toast.error(error.message);
        throw new Error("Error Jaringan Ngab");
      }
    },
  });

  const deletePaymentMethod = useMutation({
    mutationKey: ["delete-payment-method"],
    mutationFn: async (id: string) => {
      const editPaymentMethod = await axiosIn.post(
        `${apiUrl}/admin/payment-method/delete`,
        {
          id,
        },
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );
      try {
        if (editPaymentMethod.data.statusCode != 200) {
          throw new Error(editPaymentMethod.data.message);
        }

        toast.success(editPaymentMethod.data.message);
        getPaymentMethods.refetch();

        return editPaymentMethod.data;
      } catch (error: any) {
        toast.error(error.message);
        throw new Error("Error Jaringan Ngab");
      }
    },
  });

  const column: ColumnDef<PaymentMethod>[] = [
    {
      accessorKey: "id",
      header: "ID",
    },
    {
      accessorKey: "name",
      header: () => {
        return (
          <Button
            variant="ghost"
            onClick={() => router.push(`${pathname}?${handleSort("name")}`)}
          >
            Name
            <CaretSortIcon className="ml-2 h-4 w-4" />
          </Button>
        );
      },
    },
    {
      accessorKey: "providerId",
      header: () => {
        return (
          <Button
            variant="ghost"
            onClick={() =>
              router.push(`${pathname}?${handleSort("providerId")}`)
            }
          >
            Provider ID
            <CaretSortIcon className="ml-2 h-4 w-4" />
          </Button>
        );
      },
    },
    {
      accessorKey: "provider",
      header: () => {
        return (
          <Button
            variant="ghost"
            onClick={() => router.push(`${pathname}?${handleSort("provider")}`)}
          >
            Provider
            <CaretSortIcon className="ml-2 h-4 w-4" />
          </Button>
        );
      },
    },
    {
      accessorKey: "type",
      header: () => {
        return (
          <Button
            variant="ghost"
            onClick={() => router.push(`${pathname}?${handleSort("type")}`)}
          >
            Type
            <CaretSortIcon className="ml-2 h-4 w-4" />
          </Button>
        );
      },
    },
    {
      accessorKey: "fees",
      header: "Fees",
      cell: ({ row }) =>
        `${row.original.feesInPercent} + ${priceFormat(row.original.fees)}`,
    },
    {
      accessorKey: "minAmount",
      header: "Min",
      cell: ({ row }) => priceFormat(row.original.minAmount),
    },
    {
      accessorKey: "maxAmount",
      header: "Max",
      cell: ({ row }) => priceFormat(row.original.maxAmount),
    },
    {
      accessorKey: "isAvailable",
      header: "Is Available",
      cell: ({ row }) => {
        return (
          <Switch
            checked={row.original.isAvailable}
            onCheckedChange={(value) => {
              editPaymentMethod.mutate({
                id: row.getValue("id"),
                isAvailable: value,
              });
            }}
          />
        );
      },
    },
    {
      accessorKey: "expiredInMinutes",
      header: "Expired",
    },
    {
      accessorKey: "createdAt",
      header: () => {
        return (
          <Button
            variant="ghost"
            onClick={() =>
              router.push(`${pathname}?${handleSort("createdAt")}`)
            }
          >
            CreatedAt
            <CaretSortIcon className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => parseDate(row.original.createdAt),
    },
    {
      accessorKey: "updatedAt",
      header: () => {
        return (
          <Button
            variant="ghost"
            onClick={() =>
              router.push(`${pathname}?${handleSort("updatedAt")}`)
            }
          >
            Updated At
            <CaretSortIcon className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => parseDate(row.original.updatedAt),
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
                  setActivePaymentMethodId(row.getValue("id"));
                  setOpenModalEditPayment(true);
                }}
              >
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => deletePaymentMethod.mutate(row.getValue("id"))}
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
      <AdminAddPaymentModal
        openModal={OpenModalCreatePayment}
        setOpenModal={setOpenModalCreatePayment}
        refetch={getPaymentMethods.refetch}
      />
      <AdminEditPaymentModal
        id={activePaymentMethodId}
        openModal={openModalEditPayment}
        setOpenModal={setOpenModalEditPayment}
        refetch={getPaymentMethods.refetch}
      />
      <div className="min-h-dvh">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-bold">Payments</h1>
          <button
            onClick={() => setOpenModalCreatePayment(true)}
            className="text-sm bg-primary text-primary-foreground px-4 py-2 rounded-md shadow-md hover:bg-primary-hover hover:text-primary-hover"
          >
            Add Payment
          </button>
        </div>

        <DataTable
          isLoading={getPaymentMethods.isLoading}
          columns={column}
          data={getPaymentMethods?.data?.data}
        >
          <div className="space-x-2">
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
                getPaymentMethods?.data?.pagination?.totalPage
              }
            >
              Next
            </Button>
          </div>
        </DataTable>
      </div>
    </>
  );
}

type PaymentMethod = {
  id: string;
  providerId: string;
  provider: string;
  type: string;
  name: string;
  desc: string;
  fees: number;
  feesInPercent: string;
  minAmount: number;
  maxAmount: number;
  isAvailable: boolean;
  expiredInMinutes: number;
  cutOffStart: string;
  cutOffEnd: string;
  createdAt: string;
  updatedAt: string;
};
