"use client";

import { Button } from "@/components/ui/button";
import { apiUrl } from "@/lib/constant";
import { parseDate } from "@/lib/utils";
import { userTokenAtom } from "@/store";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useAtomValue } from "jotai";
import { useCallback, useState } from "react";
import toast from "react-hot-toast";
import CreateProductGroup from "./create-product-group";
import EditProductGroup from "./edit-product-group";
import { DataTable } from "@/components/data-table";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ColumnDef } from "@tanstack/react-table";
import { CaretSortIcon, DotsHorizontalIcon } from "@radix-ui/react-icons";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { axiosIn } from "@/lib/axios";

export default function AdminProductGroup() {
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

  const getProductGroup = useQuery({
    queryKey: ["products-group", searchParams.toString()],
    queryFn: () =>
      axiosIn
        .get(
          `${apiUrl}/admin/product/product-group?${searchParams.toString()}`,
          {
            headers: {
              authorization: `Bearer ${userToken}`,
            },
          }
        )
        .then((res) => res.data)
        .catch((err) => toast.error(err)),
  });
  const [openModalCreateProductGroup, setOpenModalCreateProductGroup] =
    useState(false);
  const [openModalEditProductGroup, setOpenModalEditProductGroup] =
    useState<boolean>(false);

  const [activeProductGroupId, setActiveProductGroupId] = useState<string>("");

  const deleteProductGroup = useMutation({
    mutationKey: ["delete-product-group"],
    mutationFn: async (productGroupId: string) => {
      const deleteProductGroup = await axiosIn.post(
        `${apiUrl}/admin/product/product-group/delete`,
        { id: productGroupId },
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );
      try {
        if (deleteProductGroup.data.statusCode != 200) {
          throw new Error(deleteProductGroup.data.message);
        }
        getProductGroup.refetch();
        return deleteProductGroup.data;
      } catch (error: any) {
        toast.error(error.message);
        throw new Error("Error Jaringan Ngab");
      }
    },
  });

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

  const column: ColumnDef<ProductGroup>[] = [
    {
      accessorKey: "id",
      header: "ID",
      cell: ({ row }) => row.original.id.slice(0, 6),
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
      accessorKey: "region",
      header: "Region",
    },
    {
      accessorKey: "servicesName",
      header: "Service Name",
      cell: ({ row }) => row.original?.Services?.name ?? "...",
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
            Created At
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
                  setActiveProductGroupId(row.getValue("id"));
                  setOpenModalEditProductGroup(true);
                }}
              >
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => deleteProductGroup.mutate(row.getValue("id"))}
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
    <section>
      <div className="inline-flex justify-between w-full">
        <h2 className="text-lg font-bold">List Product Group</h2>
        <Button onClick={() => setOpenModalCreateProductGroup(true)}>
          Add List
        </Button>
      </div>

      <DataTable
        isLoading={getProductGroup.isLoading}
        columns={column}
        data={getProductGroup?.data?.data}
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
              getProductGroup?.data?.pagination?.totalPage
            }
          >
            Next
          </Button>
        </div>
      </DataTable>
      <CreateProductGroup
        openModal={openModalCreateProductGroup}
        setOpenModal={setOpenModalCreateProductGroup}
        refetch={() => getProductGroup.refetch()}
      />
      <EditProductGroup
        openModal={openModalEditProductGroup}
        setOpenModal={setOpenModalEditProductGroup}
        refetch={() => getProductGroup.refetch()}
        productGroupId={activeProductGroupId}
      />
    </section>
  );
}

interface IAddProductGroup {
  name: string;
  desc: string;
  region: "INDONESIA" | "SINGAPORE" | "MALAYSIA" | "THAILAND" | "PHILIPPINES";
  serviceId: string;
}

type ProductGroup = {
  id: string;
  subName: string;
  name: string;
  desc: string;
  imgLogo: any;
  region: string;
  servicesId: string;
  createdAt: string;
  updatedAt: string;
  Services: {
    name?: string;
  };
};
