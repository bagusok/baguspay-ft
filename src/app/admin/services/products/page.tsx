"use client";
import { Button } from "@/components/ui/button";
import { apiUrl } from "@/lib/constant";
import { parseDate, priceFormat } from "@/lib/utils";
import { userTokenAtom } from "@/store";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useAtomValue } from "jotai";
import { useCallback, useState } from "react";
import toast from "react-hot-toast";
import CreateProduct from "./create-product";
import EditProduct from "./edit-product";
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/data-table";
import { Switch } from "@/components/ui/switch";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CaretSortIcon, DotsHorizontalIcon } from "@radix-ui/react-icons";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { axiosIn } from "@/lib/axios";

export default function AdminProducts() {
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

  const getProducts = useQuery({
    queryKey: ["products", searchParams.toString()],
    queryFn: () =>
      axiosIn
        .get(`${apiUrl}/admin/products?${searchParams.toString()}`, {
          headers: {
            authorization: `Bearer ${userToken}`,
          },
        })
        .then((res) => res.data),
  });

  const [openModalCreateProductGroup, setOpenModalCreateProductGroup] =
    useState(false);
  const [openModalEditProductGroup, setOpenModalEditProductGroup] =
    useState<boolean>(false);

  const [activeProductGroupId, setActiveProductGroupId] = useState<string>("");

  const deleteProductGroup = useMutation({
    mutationKey: ["delete-product"],
    mutationFn: async (productGroupId: string) => {
      const deleteProductGroup = await axiosIn.post(
        `${apiUrl}/admin/products/delete`,
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
        getProducts.refetch();
        return deleteProductGroup.data;
      } catch (error: any) {
        toast.error(error.message);
        throw new Error("Error Jaringan Ngab");
      }
    },
  });

  const editProduct = useMutation({
    mutationKey: ["edit-product"],
    mutationFn: async (data: any) => {
      const editProduct = await axiosIn.post(
        `${apiUrl}/admin/products/update`,
        data,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );
      try {
        if (editProduct.data.data.statusCode != 200) {
          throw new Error(editProduct.data.message);
        }

        toast.success(editProduct.data.message);
        getProducts.refetch();

        return editProduct.data;
      } catch (error: any) {
        toast.error(error.message);
        throw new Error("Error Jaringan Ngab");
      }
    },
  });

  const column: ColumnDef<Product>[] = [
    {
      accessorKey: "id",
      header: "Id",
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
      accessorKey: "price",
      header: () => {
        return (
          <Button
            variant="ghost"
            onClick={() => router.push(`${pathname}?${handleSort("price")}`)}
          >
            Price
            <CaretSortIcon className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => priceFormat(row.original.price),
    },
    {
      accessorKey: "profit",
      header: "Profit",
      cell: ({ row }) =>
        `${row.original.profit} + ${row.original.profitInPercent}%`,
    },
    {
      accessorKey: "priceFromProvider",
      header: "Price Provider",
      cell: ({ row }) => priceFormat(row.original.priceFromProvider),
    },
    {
      accessorKey: "isAvailable",
      header: "Is Available",
      cell: ({ row }) => {
        return (
          <Switch
            checked={row.original.isAvailable}
            onCheckedChange={(value) => {
              editProduct.mutate({
                id: row.getValue("id"),
                isAvailable: value,
              });
            }}
          />
        );
      },
    },
    {
      accessorKey: "stock",
      header: "Stock",
    },
    {
      accessorKey: "serviceId",
      header: "Service Name",
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
              router.push(`${pathname}?${handleSort("createdAt")}`)
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

  return (
    <section className="w-full box-border overflow-hidden">
      <h2 className="text-base font-bold">List Product Group</h2>
      <div className="inline-flex justify-between w-full mt-5">
        <form
          className="w-60"
          onSubmit={(e) => {
            console.log("pree");
            e.preventDefault();
            router.push(`${pathname}?search=${e.currentTarget.search.value}`);
          }}
        >
          <Input
            type="text"
            name="search"
            placeholder="Search Product"
            defaultValue={searchParams.get("search") || ""}
          />
        </form>

        <Button size="sm" onClick={() => setOpenModalCreateProductGroup(true)}>
          Add List
        </Button>
      </div>

      <DataTable
        isLoading={getProducts.isLoading}
        columns={column}
        data={getProducts?.data?.data}
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
              getProducts?.data?.pagination?.totalPage
            }
          >
            Next
          </Button>
        </div>
      </DataTable>

      <CreateProduct
        openModal={openModalCreateProductGroup}
        setOpenModal={setOpenModalCreateProductGroup}
        refetch={() => getProducts.refetch()}
      />
      <EditProduct
        openModal={openModalEditProductGroup}
        setOpenModal={setOpenModalEditProductGroup}
        refetch={() => getProducts.refetch()}
        productId={activeProductGroupId}
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

type Product = {
  id: string;
  sku_code: string;
  name: string;
  desc: null;
  imgLogo: null;
  profit: number;
  profitInPercent: number;
  price: number;
  stock: number;
  resellerPrice: number;
  profitReseller: number;
  profitResellerInPercent: number;
  type: string;
  typeResponse: string;
  isAvailable: boolean;
  h2hProvider: null;
  idProductProvider: string;
  priceFromProvider: number;
  productGroupId: string;
  cutOffStart: string;
  cutOffEnd: string;
  createdAt: Date;
  updatedAt: Date;
};
