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
import { useEffect, useState } from "react";
import { redirect, useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { useAtomValue } from "jotai";
import { userTokenAtom } from "@/store";
import { apiUrl } from "@/lib/constant";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import toast from "react-hot-toast";
import InputFilePicker from "../../_file-picker/file-picker";
import CreateProductGroup from "./create-product-group";
import CreateProduct from "./create-product";

export default function ServiceDetailPage() {
  const params = useParams();

  const userToken = useAtomValue(userTokenAtom);

  const getServiceDetail = useQuery({
    queryKey: ["getServiceDetail", params.servicesId, userToken],
    queryFn: async () => {
      const res = await fetch(`${apiUrl}/services/${params.servicesId}`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });
      return res.json();
    },
  });

  const [openCreateProductGroup, setOpenCreateProductGroup] = useState(false);
  const [openCreateProduct, setOpenCreateProduct] = useState(false);
  const [productGroupTabsActiveId, setProductGroupTabsActiveId] = useState("");

  const [inputFieldOneType, setInputFieldOneType] = useState("SELECT");
  const [inputFieldTwoType, setInputFieldTwoType] = useState("TEXT");
  const [inputFieldThreeType, setInputFieldThreeType] = useState("TEXT");
  const [serviceType, setServiceType] = useState("LAINNYA");

  useEffect(() => {
    if (!params.servicesId) {
      return redirect("/admin/services");
    }

    if (getServiceDetail.data?.statusCode == 200) {
      setInputFieldOneType(getServiceDetail.data?.data.inputFieldOneType);
      setInputFieldTwoType(getServiceDetail.data?.data.inputFieldTwoType);
      setInputFieldThreeType(getServiceDetail.data?.data.inputFieldThreeType);
      setServiceType(getServiceDetail.data?.data.type);

      if (productGroupTabsActiveId == "") {
        setProductGroupTabsActiveId(
          getServiceDetail.data?.data.productGroup[0]?.id
        );
      }
    }
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

    console.log({ isAvailable });

    const save = await fetch(`${apiUrl}/services/update`, {
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
                name="imgBanner"
                defaultValue={getServiceDetail?.data?.data?.imgLogo}
              />
            </div>
            <div className="inline-flex w-full gap-8">
              <div className="mt-3 w-24 ">
                <Label>Logo Image</Label>
                <InputFilePicker
                  name="imgLogo"
                  defaultValue={getServiceDetail?.data?.data?.imgLogo}
                />
              </div>
              <div className="mt-4 w-24 ">
                <Label>Is Available</Label>
                <Switch
                  defaultChecked={getServiceDetail.data.data.isAvailable}
                  onCheckedChange={(value) => console.log(value)}
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
              <Input name="publisher" placeholder="Garena" className="w-full" />
            </div>
            <div className="w-full">
              <Label>Type</Label>
              <Select
                name="type"
                defaultValue={getServiceDetail.data.data.type}
                onValueChange={(value) => {
                  setServiceType(value);
                }}
                value={serviceType}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="GAME_DIRECT">GAME DIRECT</SelectItem>
                    <SelectItem value="GAME_VOUCHER">GAME VOUCHER</SelectItem>
                    <SelectItem value="TAGIHAN">TAGIHAN</SelectItem>
                    <SelectItem value="PULSA">PULSA</SelectItem>
                    <SelectItem value="PAKET_DATA">PAKET DATA</SelectItem>
                    <SelectItem value="E_MONEY">E MONEY</SelectItem>
                    <SelectItem value="AKUN_PREMIUM">AKUN PREMIUM</SelectItem>
                    <SelectItem value="SMM">SMM</SelectItem>
                    <SelectItem value="LAINNYA">LAINNYA</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
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
                  name="inputFieldOneType"
                  defaultValue={getServiceDetail.data.data.inputFieldOneType}
                  onValueChange={(value) => {
                    setInputFieldOneType(value);
                  }}
                  value={inputFieldOneType}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="TEXT">TEXT</SelectItem>
                      <SelectItem value="NUMBER">NUMBER</SelectItem>
                      <SelectItem value="SELECT">SELECT</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
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
                  name="inputFieldTwoType"
                  defaultValue={getServiceDetail.data.data.inputFieldTwoType}
                  onValueChange={(value) => {
                    setInputFieldTwoType(value);
                  }}
                  value={inputFieldTwoType}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="TEXT">TEXT</SelectItem>
                      <SelectItem value="NUMBER">NUMBER</SelectItem>
                      <SelectItem value="SELECT">SELECT</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
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
                  name="inputFieldThreeType"
                  defaultValue={getServiceDetail.data.data.inputFieldThreeType}
                  onValueChange={(value) => {
                    setInputFieldThreeType(value);
                  }}
                  value={inputFieldTwoType}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="TEXT">TEXT</SelectItem>
                      <SelectItem value="NUMBER">NUMBER</SelectItem>
                      <SelectItem value="SELECT">SELECT</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
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
                      <TableHead className="text-right">Created At</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {item?.products?.map((product, _) => (
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
                        <TableCell>
                          <Badge
                            className={cn({
                              "bg-green-500": product.isAvailable,
                              "bg-red-500": !product.isAvailable,
                            })}
                          >
                            {product.isAvailable
                              ? "Available"
                              : "Not Available"}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          {
                            // @ts-ignore
                            new Date(product.createdAt).toLocaleDateString()
                          }
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
      </>
    );
  }
}
