"use client";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { cn, priceFormat } from "@/lib/utils";
import { RadioGroup, Tab } from "@headlessui/react";
import Image from "next/image";
import { FormEvent, useCallback, useEffect, useMemo, useState } from "react";
import SelectPaymentMethod from "./select-payment-method";
import { Button } from "@/components/ui/button";
import { Data, ServiceResponse } from "./service-response.type";
import FormIdServer from "./form-id-server";
import { apiUrl } from "@/lib/constant";
import { useMutation } from "@tanstack/react-query";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import UrutanOrder from "./UrutanOrder";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useAtomValue, useSetAtom } from "jotai";
import { globalLoadingAtom, userTokenAtom } from "@/store";
import { axiosIn } from "@/lib/axios";

export default function ClientOrderPage({ data }: { data: Data }) {
  const [productSelected, setProductSelected] = useState("");
  const [paymentSelected, setPaymentSelected] = useState("");
  const [paymentDetail, setPaymentDetail] = useState<{
    id?: string;
    name?: string;
    productPrice?: number;
    qty?: number;
    totalProductPrice?: number;
    fees?: number;
    total?: number;
  }>({ total: 0 });

  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [inputId, setInputId] = useState("");

  const router = useRouter();
  const userToken = useAtomValue(userTokenAtom);
  const setGlobalLoading = useSetAtom(globalLoadingAtom);

  const getPaymentMethod = useMutation({
    mutationKey: ["getPaymentMethod"],
    mutationFn: async (productId: string) =>
      axiosIn
        .post(
          `${apiUrl}/ui/payment-method`,
          {
            productId,
            qty: 1,
          },
          {
            headers: {
              ...(userToken && { Authorization: `Bearer ${userToken}` }),
            },
          }
        )
        .then((res) => res.data)
        .catch((err) => toast.error(err)),
  });

  const submitOrder = useMutation({
    mutationKey: ["submit-order-"],
    mutationFn: async (e: FormEvent<HTMLFormElement>) => {
      // const mergeInput = `${e.target?.input1?.value}:${e.target?.input2?.value}`;

      e.preventDefault();

      return axiosIn
        .post(
          `${apiUrl}/transaction/create`,
          {
            // @ts-ignore
            phone: phoneNumber,
            productName: data.name,
            productService: data.name,
            productPrice: paymentDetail.productPrice,
            productQty: paymentDetail.qty,
            totalPrice: paymentDetail.total,
            paymentName: paymentDetail.name,
            paymentMethodId: paymentSelected,
            productId: productSelected,
            inputData: inputId,
          },
          {
            headers: {
              ...(userToken && { Authorization: `Bearer ${userToken}` }),
            },
          }
        )
        .then((res) => {
          if (res.data.statusCode == 200) {
            toast.success(res.data.message);
            router.push("/transaction/history/" + res.data.data.id);
          } else {
            toast.error(res.data.message);
          }
        })
        .catch((err) => toast.error(err));
    },
  });

  useMemo(() => {
    if (submitOrder.isPending || getPaymentMethod.isPending) {
      setGlobalLoading(true);
    } else {
      setGlobalLoading(false);
    }
  }, [getPaymentMethod, submitOrder]);

  return (
    <section className="w-full grid lg:grid-cols-3 gap-4 relative md:bg-white dark:bg-inherit">
      <div className="w-full lg:col-span-2 flex flex-col gap-4 lg:gap-0">
        <div className="px-6 md:px-0">
          <div className="hidden md:block h-24 md:h-40 w-full bg-slate-300 rounded relative overflow-hidden">
            <Image
              src={data.imgBanner}
              alt="img-banner"
              width={1920}
              height={1080}
              className="object-cover object-center "
            ></Image>
          </div>
          <div className="w-full inline-flex md:pl-10">
            <div className="rounded-md overflow-hidden md:-translate-y-16 flex-none">
              <Image
                src={data.imgLogo}
                alt="img-banner"
                width={300}
                height={300}
                className="object-cover object-center w-24 h-24 md:w-40 md:h-40"
              ></Image>
            </div>
            <div className="ml-3">
              <h2 className="text-2xl font-bold">{data.name}</h2>
              <div className="hidden md:inline-flex mt-2 flex-wrap gap-2">
                <Badge variant="outline">{data.publisher}</Badge>
                <Badge variant="outline">{data.region}</Badge>
                <Badge variant="outline">Otomatis</Badge>
                <Badge variant="outline">Cepat</Badge>
              </div>
              <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
                {data.desc}
              </p>
            </div>
          </div>
          <div className="md:hidden inline-flex mt-2 flex-wrap gap-2">
            <Badge variant="outline">{data.publisher}</Badge>
            <Badge variant="outline">{data.region}</Badge>
            <Badge variant="outline">Otomatis</Badge>
            <Badge variant="outline">Cepat</Badge>
          </div>
        </div>

        <div
          id="separator"
          className="bg-gray-100 w-full h-5 dark:hidden md:hidden"
        ></div>

        {/* Mobile Layout */}
        <div className="px-6 md:px-0">
          <UrutanOrder number={1} text="Masukkan ID" />
          <form
            onSubmit={(e) => submitOrder.mutate(e)}
            className="mt-4 md:hidden"
          >
            <FormIdServer value={inputId} setValue={setInputId} data={data} />

            <div
              className={cn(
                "fixed bottom-0 left-0 right-0 z-40 w-full bg-card px-4 py-4 border-t-slate-300 border-2 rounded-tl-2xl rounded-tr-2xl dark:border-t-white/60",
                {
                  hidden: productSelected.length == 0,
                  block: productSelected.length > 0,
                }
              )}
            >
              <SelectPaymentMethod
                setPaymentDetail={setPaymentDetail}
                paymentDetail={paymentDetail}
                isLoading={getPaymentMethod.isPending}
                data={getPaymentMethod.data?.data}
                selectedItem={paymentSelected}
                setSelectedItem={setPaymentSelected}
                defaultSelectedItem={getPaymentMethod.data?.selected}
              />
              <div className="w-full inline-flex justify-between items-center mt-3 bg-card">
                <h4 className="font-semibold text-sm">
                  {priceFormat(paymentDetail?.total ?? 0)}
                </h4>
                <Button
                  disabled={submitOrder.isPending}
                  type="submit"
                  className="text-sm bg-primary text-primary-foreground"
                >
                  {submitOrder.isPending ? "Loading..." : "Checkout"}
                </Button>
              </div>
            </div>
          </form>
        </div>

        <div
          id="separator"
          className="bg-gray-100 w-full h-5 dark:hidden md:hidden"
        ></div>

        {/* Mobile Layout */}

        <div className="px-6 py-5 rounded-xl md:border border-gray-200">
          <div className="w-full">
            <UrutanOrder number={2} text="Pilih Produk" />
            <h2 className="text-2xl font-bold mb-5 hidden md:block">
              Pilih Produk
            </h2>
            <Tab.Group>
              <Tab.List className="inline-flex overflow-x-auto gap-3 mt-6 md:mt-0">
                {data.productGroup?.map((item, index) => (
                  <Tab
                    key={index}
                    className="px-5 py-2 text-sm font-bold bg-card border ui-not-selected:border-slate-200 ui-selected:border-slate-400 dark:ui-not-selected:border-none dark:ui-selected:border-white rounded-md"
                  >
                    {item.name}
                  </Tab>
                ))}
              </Tab.List>
              <Tab.Panels className="mt-5">
                <RadioGroup
                  value={productSelected}
                  onChange={(e) => {
                    setProductSelected(e);
                    getPaymentMethod.mutate(e);
                  }}
                >
                  {data.productGroup?.map((item, index) => (
                    <Tab.Panel
                      key={item.id}
                      className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 grid-flow-row-dense gap-4"
                    >
                      {item.products?.map((product, index2) => (
                        <RadioGroup.Option
                          key={product.id}
                          value={product.id}
                          // onClick={() =>
                          //   setPaymentDetail({

                          //   })
                          // }
                        >
                          {({ checked }) => (
                            <div
                              className={cn("px-4 py-2 rounded-md h-full", {
                                "border border-slate-400 dark:border-slate-600":
                                  checked,
                                "bg-slate-100 dark:bg-card": !checked,
                              })}
                            >
                              <h4 className={cn("text-sm font-semibold")}>
                                {product.name}
                              </h4>
                              <p className={cn("text-sm font-light")}>
                                {priceFormat(product.price)}
                              </p>
                            </div>
                          )}
                        </RadioGroup.Option>
                      ))}
                    </Tab.Panel>
                  ))}
                </RadioGroup>
              </Tab.Panels>
            </Tab.Group>
          </div>
        </div>

        <div
          id="separator"
          className="bg-gray-100 w-full h-5 dark:hidden md:hidden"
        ></div>

        {/* Form Phone Number Email Mobile */}
        <div className="px-6 md:px-0">
          <UrutanOrder number={3} text="Masukkan Info Kontak" />
          <div className="md:hidden mt-6">
            <Tabs defaultValue="phone" className="w-full">
              <TabsList className="inline-flex gap-3">
                <TabsTrigger
                  className="data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:border data-[state=active]:border-primary dark:data-[state=active]:bg-primary-foreground dark:data-[state=active]:text-white"
                  value="phone"
                >
                  Whatsapp
                </TabsTrigger>
                <TabsTrigger
                  className="data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:border data-[state=active]:border-primary dark:data-[state=active]:bg-primary-foreground dark:data-[state=active]:text-white"
                  value="email"
                >
                  Email
                </TabsTrigger>
              </TabsList>
              <TabsContent value="phone">
                <Label htmlFor="phone">Nomor Whatsapp</Label>
                <Input
                  type="number"
                  name="phone"
                  placeholder="08xxxxx"
                  value={phoneNumber}
                  onInput={(e) => setPhoneNumber(e.currentTarget.value)}
                />
              </TabsContent>
              <TabsContent value="email">
                <Label htmlFor="phone">Email</Label>
                <Input
                  type="email"
                  placeholder="John@mail.com"
                  value={email}
                  onInput={(e) => setEmail(e.currentTarget.value)}
                />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="w-full h-fit lg:col-span-1 bg-card md:px-6 lg:px-5 md:py-5 rounded-xl border border-grey-100 dark:border-none">
        <form
          onSubmit={(e) => submitOrder.mutate(e)}
          className="hidden md:block"
        >
          <h2 className="text-2xl font-bold mb-3">Detail Pesanan</h2>
          <FormIdServer value={inputId} setValue={setInputId} data={data} />

          <hr className="bg-gray-200 my-3" />

          <div className="px-6 md:px-0">
            <div className="">
              <Label htmlFor="product" className="font-semibold mb-2">
                Masukkan Info Kontak
              </Label>
              <Tabs defaultValue="phone" className="w-full">
                <TabsList className="inline-flex gap-3">
                  <TabsTrigger
                    className="data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:border data-[state=active]:border-primary dark:data-[state=active]:bg-primary-foreground dark:data-[state=active]:text-white"
                    value="phone"
                  >
                    Whatsapp
                  </TabsTrigger>
                  <TabsTrigger
                    className="data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:border data-[state=active]:border-primary dark:data-[state=active]:bg-primary-foreground dark:data-[state=active]:text-white"
                    value="email"
                  >
                    Email
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="phone" className="mt-0">
                  <Label htmlFor="phone" className="text-xs">
                    Nomor Whatsapp
                  </Label>
                  <Input
                    type="number"
                    name="phone"
                    placeholder="08xxxxx"
                    value={phoneNumber}
                    onInput={(e) => setPhoneNumber(e.currentTarget.value)}
                  />
                </TabsContent>
                <TabsContent value="email" className="mt-0">
                  <Label htmlFor="phone" className="text-xs">
                    Email
                  </Label>
                  <Input
                    type="email"
                    placeholder="John@mail.com"
                    value={email}
                    onInput={(e) => setEmail(e.currentTarget.value)}
                  />
                </TabsContent>
              </Tabs>
            </div>
          </div>

          <hr className="bg-gray-200 mt-7" />

          <div id="form-group" className="mt-6 mb-4 w-full h-12">
            <Label htmlFor="input1">Pilih Pembayaran</Label>
            <SelectPaymentMethod
              setPaymentDetail={setPaymentDetail}
              isLoading={getPaymentMethod.isPending}
              data={getPaymentMethod.data?.data}
              selectedItem={paymentSelected}
              setSelectedItem={setPaymentSelected}
              paymentDetail={paymentDetail}
              defaultSelectedItem={getPaymentMethod.data?.selected}
            />
          </div>
          <div className="w-full inline-flex justify-between items-center mt-6 bg-slate-100 dark:bg-white/20 p-3 rounded-lg">
            <div className="inline-flex justify-between w-full">
              <h4 className="font-semibold text-sm">Total</h4>
              <h4 className="font-semibold text-sm">
                {priceFormat(paymentDetail?.total ?? 0)}
              </h4>
            </div>
          </div>
          <Button
            disabled={submitOrder.isPending}
            type="submit"
            className="mt-4 w-full rounded-md h-16 text-lg"
          >
            {submitOrder.isPending ? "Loading..." : "Checkout"}
          </Button>
        </form>
      </div>
      {/* Desktop Layout */}
    </section>
  );
}
