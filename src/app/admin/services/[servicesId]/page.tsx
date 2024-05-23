"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useMemo, useState } from "react";
import { redirect, useParams } from "next/navigation";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useAtomValue } from "jotai";
import { userTokenAtom } from "@/store";
import { apiUrl } from "@/lib/constant";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn, parseDate } from "@/lib/utils";
import toast from "react-hot-toast";
import InputFilePicker from "../../_file-picker/file-picker";
import CreateProductGroup from "../product-group/create-product-group";
import { DeleteDialog } from "@/components/ui/delete-dialog";
import { AlertDialogTrigger } from "@/components/ui/alert-dialog";
import EditProduct from "../products/edit-product";
import CreateProduct from "../products/create-product";
import EditProductGroup from "../product-group/edit-product-group";
import Select from "react-select";
import {
  dataInputIdType,
  dataServiceType,
  IDataSelectType,
} from "@/lib/data/select.data";
import { axiosIn } from "@/lib/axios";

export default function ServiceDetailPage() {
  const params = useParams();

  const userToken = useAtomValue(userTokenAtom);

  const getServiceDetail = useQuery({
    queryKey: ["getServiceDetail", params.servicesId],
    queryFn: async () => {
      const res = await axiosIn.get(
        `${apiUrl}/admin/services/${params.servicesId}`,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );
      return res.data;
    },
  });

  const [openCreateProductGroup, setOpenCreateProductGroup] = useState(false);
  const [openCreateProduct, setOpenCreateProduct] = useState(false);
  const [productGroupTabsActiveId, setProductGroupTabsActiveId] = useState("");

  const [openEditProduct, setOpenEditProduct] = useState(false);
  const [productActiveId, setProductActiveId] = useState("");

  const [inputFieldOneType, setInputFieldOneType] = useState();
  const [inputFieldTwoType, setInputFieldTwoType] = useState();
  const [inputFieldThreeType, setInputFieldThreeType] = useState();

  const [editIsAvailableId, setEditIsAvailableId] = useState<string>("");

  const changeProductIsAvailable = useMutation({
    mutationKey: ["changeProductIsAvailable"],
    mutationFn: async (data: IChangeProductIsAvailable) => {
      setEditIsAvailableId(data.id);
      const res = await axiosIn.post(
        `${apiUrl}/admin/products/update
      `,
        {
          id: data.id,
          isAvailable: !data.isAvailable,
        },
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );

      if (res.data.data.statusCode == 200) {
        toast.success("Success change product is available");
        getServiceDetail.refetch();
      } else {
        toast.error("Failed change product is available");
      }
      setEditIsAvailableId("");
    },
  });

  const deleteProduct = useMutation({
    mutationKey: ["deleteProduct"],
    mutationFn: async (productId: string) => {
      const res = await axiosIn.post(
        `${apiUrl}/admin/products/delete
      `,
        {
          id: productId,
        },
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );

      if (res.data.data.statusCode == 200) {
        toast.success("Delete product success");
        getServiceDetail.refetch();
      } else {
        toast.error("Failed delete");
      }
    },
  });

  useEffect(() => {
    if (!params.servicesId) {
      return redirect("/admin/services");
    }

    if (getServiceDetail.data?.statusCode == 200) {
      setInputFieldOneType(getServiceDetail.data?.data.inputFieldOneType);
      setInputFieldTwoType(getServiceDetail.data?.data.inputFieldTwoType);
      setInputFieldThreeType(getServiceDetail.data?.data.inputFieldThreeType);

      if (productGroupTabsActiveId == "") {
        setProductGroupTabsActiveId(
          getServiceDetail.data?.data.productGroup[0]?.id
        );
      }
    }
  }, [getServiceDetail.data]);

  const indexDataServiceType = useMemo(() => {
    return dataServiceType.findIndex(
      (item) => item.value == getServiceDetail?.data?.data?.type
    );
  }, [getServiceDetail.data]);

  const saveService = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const {
      isAvailable,
      isInputFieldOne,
      isInputFieldTwo,
      isInputFieldThree,
      inputFieldOneLabel,
      inputFieldOneOption,
      inputFieldOneType,
      inputFieldTwoLabel,
      inputFieldTwoOption,
      inputFieldTwoType,
      inputFieldThreeLabel,
      inputFieldThreeOption,
      inputFieldThreeType,
      metaDesc,
      metaName,
      serviceName,
      publisher,
      slug,
      type,
      desc,
      imgLogo,
      imgBanner,
    } = e.target as any;

    const save = await fetch(`${apiUrl}/admin/services/update`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${userToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: params.servicesId,
        isAvailable: isAvailable.checked,
        isInputFieldOne: isInputFieldOne.checked,
        isInputFieldTwo: isInputFieldTwo.checked,
        isInputFieldThree: isInputFieldThree.checked,
        inputFieldOneLabel: inputFieldOneLabel.value,
        inputFieldOneOption: inputFieldOneOption?.value,
        inputFieldOneType: inputFieldOneType.value,
        inputFieldTwoLabel: inputFieldTwoLabel.value,
        inputFieldTwoOption: inputFieldTwoOption?.value,
        inputFieldTwoType: inputFieldTwoType.value,
        inputFieldThreeLabel: inputFieldThreeLabel.value,
        inputFieldThreeOption: inputFieldThreeOption?.value,
        inputFieldThreeType: inputFieldThreeType.value,
        metaDesc: metaDesc.value,
        metaName: metaName.value,
        name: serviceName.value,
        publisher: publisher.value,
        slug: slug.value,
        type: type.value,
        desc: desc.value,
        imgLogo: imgLogo.value,
        imgBanner: imgBanner.value,
      }),
    });

    try {
      const res = await save.json();
      if (res.statusCode == 200) {
        toast.success("Success save service");
        getServiceDetail.refetch();
      } else {
        toast.error("Failed save service");
      }
    } catch (error) {
      toast.error("Failed save service");
      console.log(error);
    }
  };

  if (getServiceDetail.isLoading) {
    return <div>Loading...</div>;
  }

  if (getServiceDetail.isError) {
    return <div>Error...</div>;
  }

  if (getServiceDetail.data.statusCode != 200) {
    return <div>Data not found</div>;
  }

  if (getServiceDetail.data) {
    return (
      <>
        <div className="inline-flex w-full justify-end mb-3">
          <Button type="submit" form="save-service-form">
            Save Service
          </Button>
        </div>
        <form
          id="save-service-form"
          onSubmit={saveService}
          className="grid md:grid-cols-2 gap-6 mb-5"
        >
          <div className="w-full flex flex-col">
            <div>
              <Label>Banner Image</Label>
              <InputFilePicker
                className="w-full h-28"
                name="imgBanner"
                defaultValue={getServiceDetail?.data?.data?.imgBanner}
              />
            </div>
            <div className="inline-flex w-full gap-8">
              <div className="mt-3">
                <Label>Logo Image</Label>
                <InputFilePicker
                  name="imgLogo"
                  className="w-24 h-28"
                  defaultValue={getServiceDetail?.data?.data?.imgLogo}
                />
              </div>
              <div className="mt-4 w-24">
                <Label>Is Available</Label>
                <Switch
                  defaultChecked={getServiceDetail.data.data.isAvailable}
                  className="mt-5"
                  name="isAvailable"
                />
              </div>
            </div>
            <div className="w-full mt-5">
              <Label>Title</Label>
              <Input
                name="serviceName"
                placeholder="Free Fire"
                className="w-full"
                defaultValue={getServiceDetail.data.data.name}
              />
            </div>
            <div className="w-full">
              <Label>Slug</Label>
              <Input
                name="slug"
                placeholder="Free Fire"
                className="w-full"
                defaultValue={getServiceDetail.data.data.slug}
              />
            </div>
            <div className="w-full">
              <Label>Publisher Game</Label>
              <Input
                name="publisher"
                placeholder="Garena"
                className="w-full"
                defaultValue={getServiceDetail.data?.data.publisher}
              />
            </div>
            <div className="w-full">
              <Label>Type</Label>
              <Select
                options={dataServiceType}
                name="type"
                defaultValue={dataServiceType[indexDataServiceType]}
              />
            </div>
            <div className="w-full">
              <Label>Description</Label>
              <Textarea
                name="desc"
                placeholder="Lorem ipsum dolor sit amet."
                defaultValue={getServiceDetail.data.data.desc}
              ></Textarea>
            </div>
            <div className="mt-2"></div>
            <Label className="text-center mt-4">Seo Setting</Label>
            <div className="w-full">
              <Label>Meta Title</Label>
              <Input
                name="metaName"
                placeholder="Free Fire"
                className="w-full"
                defaultValue={getServiceDetail.data.data.metaName}
              />
            </div>
            <div className="w-full">
              <Label>Meta Description</Label>
              <Textarea
                name="metaDesc"
                placeholder="Lorem ipsum dolor sit amet."
                defaultValue={getServiceDetail.data.data.metaDesc}
              ></Textarea>
            </div>
          </div>

          <div className="flex flex-col gap-2 w-full">
            <Label className="text-center mt-5">Input Settings</Label>

            <div className="flex flex-col mt-5">
              <Label className="font-semibold">Input 1</Label>
              <div className="inline-flex gap-3 items-center mt-5">
                <Switch
                  name="isInputFieldOne"
                  className=""
                  defaultChecked={getServiceDetail.data.data.isInputFieldOne}
                />
                <Label>Is Available</Label>
              </div>
              <div className="mt-3">
                <Label>Type Input</Label>
                <Select
                  options={dataInputIdType}
                  name="inputFieldOneType"
                  defaultValue={{
                    value: getServiceDetail?.data?.data?.inputFieldOneType,
                    label: getServiceDetail?.data?.data?.inputFieldOneType,
                  }}
                  onChange={(e) => setInputFieldOneType(e?.value)}
                />
              </div>
              {
                // @ts-ignore
                inputFieldOneType == "SELECT" && (
                  <div className="mt-3">
                    <Label>Data SELECT</Label>
                    <Textarea
                      name="inputFieldOneOption"
                      placeholder="json select option"
                      defaultValue={
                        getServiceDetail.data.data.inputFieldOneOption
                      }
                    ></Textarea>
                  </div>
                )
              }
              <div className="mt-3">
                <Label>Input Label</Label>
                <Input
                  placeholder="ID Number"
                  name="inputFieldOneLabel"
                  className="w-full"
                  defaultValue={getServiceDetail.data.data.inputFieldOneLabel}
                />
              </div>
            </div>

            <div className="flex flex-col mt-5">
              <Label className="font-semibold">Input 2</Label>
              <div className="inline-flex gap-3 items-center mt-5">
                <Switch
                  name="isInputFieldTwo"
                  className=""
                  defaultChecked={getServiceDetail.data.data.isInputFieldTwo}
                />
                <Label>Is Available</Label>
              </div>
              <div className="mt-3">
                <Label>Type Input</Label>
                <Select
                  options={dataInputIdType}
                  name="inputFieldTwoType"
                  defaultValue={{
                    value: getServiceDetail?.data?.data?.inputFieldTwoType,
                    label: getServiceDetail?.data?.data?.inputFieldTwoType,
                  }}
                  onChange={(e) => setInputFieldOneType(e?.value)}
                />
              </div>
              {
                // @ts-ignore
                inputFieldTwoType == "SELECT" && (
                  <div className="mt-3">
                    <Label>Data SELECT</Label>
                    <Textarea
                      name="inputFieldTwoOption"
                      placeholder="json select option"
                      defaultValue={
                        getServiceDetail.data.data.inputFieldTwoOption
                      }
                    ></Textarea>
                  </div>
                )
              }
              <div className="mt-3">
                <Label>Input Label</Label>
                <Input
                  name="inputFieldTwoLabel"
                  placeholder="ID Number"
                  className="w-full"
                  defaultValue={getServiceDetail.data.data.inputFieldTwoLabel}
                />
              </div>
            </div>

            <div className="flex flex-col mt-5">
              <Label className="font-semibold">Input 3</Label>
              <div className="inline-flex gap-3 items-center mt-5">
                <Switch
                  name="isInputFieldThree"
                  className=""
                  defaultChecked={getServiceDetail.data.data.isInputFieldThree}
                />
                <Label>Is Available</Label>
              </div>
              <div className="mt-3">
                <Label>Type Input</Label>
                <Select
                  options={dataInputIdType}
                  name="inputFieldThreeType"
                  defaultValue={{
                    value: getServiceDetail?.data?.data?.inputFieldThreeType,
                    label: getServiceDetail?.data?.data?.inputFieldThreeType,
                  }}
                  onChange={(e) => setInputFieldOneType(e?.value)}
                />
              </div>
              {
                // @ts-ignore
                inputFieldThreeType == "SELECT" && (
                  <div className="mt-3">
                    <Label>Data SELECT</Label>
                    <Textarea
                      name="inputFieldThreeOption"
                      placeholder="json select option"
                      defaultValue={
                        getServiceDetail.data.data.inputFieldThreeOption
                      }
                    ></Textarea>
                  </div>
                )
              }
              <div className="mt-3">
                <Label>Input Label</Label>
                <Input
                  name="inputFieldThreeLabel"
                  placeholder="ID Number"
                  className="w-full"
                  defaultValue={getServiceDetail.data.data.inputFieldThreeLabel}
                />
              </div>
            </div>
          </div>
        </form>
        <Label className="font-semibold pt-5 ">Product Group</Label>
        <Tabs
          defaultValue={
            getServiceDetail.data?.data?.productGroup[0]?.id ?? "aaa"
          }
          className="w-full"
          onValueChange={(e) => setProductGroupTabsActiveId(e)}
        >
          <TabsList className="inline-flex flex-wrap gap-3">
            {/* @ts-ignore */}
            {getServiceDetail.data?.data.productGroup.map((item, index) => (
              <TabsTrigger key={item.id} value={item.id}>
                {item.name}
              </TabsTrigger>
            ))}

            <Button
              className="text-xs font-medium "
              variant="outline"
              onClick={() => setOpenCreateProductGroup(true)}
            >
              + Tambah Group
            </Button>
          </TabsList>

          {/* @ts-ignore */}
          {getServiceDetail.data?.data.productGroup.map((item, itemIndex) => (
            <TabsContent key={item.id} value={item.id}>
              <div id="products" className="mt-3 ">
                <div className="inline-flex justify-end w-full">
                  <Button
                    type="button"
                    className="text-xs font-medium "
                    variant="default"
                    onClick={() => setOpenCreateProduct(true)}
                  >
                    + Tambah Product
                  </Button>
                </div>
                <Table className="mt-4">
                  <TableCaption>List Products</TableCaption>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[100px]">ID</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Total Price</TableHead>
                      <TableHead>Price From Provider</TableHead>
                      <TableHead>Profit</TableHead>
                      <TableHead>Is Available</TableHead>
                      <TableHead>Created At</TableHead>
                      <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {item?.products?.map((product: any, _: any) => (
                      <TableRow key={product.id}>
                        <TableCell className="">{product.id}</TableCell>
                        <TableCell className="">
                          {product.name} - {getServiceDetail.data.data.name}
                        </TableCell>
                        <TableCell className="">{product.price}</TableCell>
                        <TableCell className="">
                          {product.priceFromProvider}
                        </TableCell>
                        <TableCell className="">
                          {product.profitInPercent}% + {product.profit}
                        </TableCell>
                        <TableCell className="w-fit">
                          <button
                            onClick={() =>
                              changeProductIsAvailable.mutate(
                                new IChangeProductIsAvailable(
                                  product.id,
                                  product.isAvailable
                                )
                              )
                            }
                            disabled={editIsAvailableId == product.id}
                            id={product.id}
                            className={cn(
                              "w-full whitespace-nowrap text-xs rounded px-2.5 py-0.5 disabled:opacity-50 disabled:cursor-not-allowed",
                              {
                                "bg-green-500": product.isAvailable,
                                "bg-red-500": !product.isAvailable,
                              }
                            )}
                          >
                            {product.id == editIsAvailableId && "Loading..."}
                            {product.isAvailable &&
                              product.id != editIsAvailableId &&
                              "Available"}
                            {!product.isAvailable &&
                              product.id != editIsAvailableId &&
                              "Not Available"}
                          </button>
                        </TableCell>
                        <TableCell className="text-center">
                          {
                            // @ts-ignore
                            parseDate(product.createdAt)
                          }
                        </TableCell>
                        <TableCell className="">
                          <div className="inline-flex">
                            <button
                              className="text-xs bg-primary hover:opacity-60 rounded-md px-2.5 py-2 text-primary-foreground mr-3"
                              onClick={() => {
                                setProductActiveId(product.id);
                                setOpenEditProduct(true);
                              }}
                            >
                              Edit
                            </button>
                            <DeleteDialog
                              onConfirm={() => deleteProduct.mutate(product.id)}
                            >
                              <AlertDialogTrigger className="text-xs bg-red-500 hover:opacity-60 rounded-md px-2.5 py-2 text-white">
                                Delete
                              </AlertDialogTrigger>
                            </DeleteDialog>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                <Pagination className="mt-5">
                  <PaginationContent>
                    <PaginationPrevious href="#" />
                    <PaginationLink href="#">1</PaginationLink>
                    <PaginationLink href="#" isActive>
                      2
                    </PaginationLink>
                    <PaginationLink href="#">3</PaginationLink>
                    <PaginationEllipsis />
                    <PaginationNext href="#" />
                  </PaginationContent>
                </Pagination>
              </div>
            </TabsContent>
          ))}
        </Tabs>

        <CreateProductGroup
          refetch={getServiceDetail.refetch}
          openModal={openCreateProductGroup}
          setOpenModal={setOpenCreateProductGroup}
          serviceId={getServiceDetail.data?.data?.id}
        />
        <CreateProduct
          refetch={getServiceDetail.refetch}
          openModal={openCreateProduct}
          setOpenModal={setOpenCreateProduct}
          productGroupId={productGroupTabsActiveId}
        />

        <EditProduct
          refetch={getServiceDetail.refetch}
          openModal={openEditProduct}
          setOpenModal={setOpenEditProduct}
          productId={productActiveId}
        />
      </>
    );
  }
}

class IChangeProductIsAvailable {
  id: string;
  isAvailable: boolean;

  constructor(id: string, isAvailable: boolean) {
    this.id = id;
    this.isAvailable = isAvailable;
  }
}
