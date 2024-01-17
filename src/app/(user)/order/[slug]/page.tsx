"use client";

import { Badge } from "@/components/ui/badge";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { RadioGroup, Tab } from "@headlessui/react";
import Image from "next/image";
import { useState } from "react";
import { useMediaQuery } from "usehooks-ts";
import SelectPaymentMethod from "./select-payment-method";
import { Button } from "@/components/ui/button";

export default function OrderPage() {
  const [productSelected, setProductSelected] = useState("");
  const [paymentSelected, setPaymentSelected] = useState("");

  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const isMobile = useMediaQuery("(max-width: 768px)");

  const dummyProduct = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
    22, 23, 24,
  ];

  return (
    <section className="w-full grid lg:grid-cols-3 gap-4 relative">
      <div className="w-full lg:col-span-2 flex flex-col gap-4 ">
        <div className="hidden md:block h-24 md:h-40 w-full bg-slate-300 rounded relative overflow-hidden">
          <Image
            src="https://prod.assets.earlygamecdn.com/images/GenshinImpactCharacters-Banner.jpg?mtime=1666013458"
            alt="img-banner"
            width={1920}
            height={1080}
            className="object-cover object-center "
          ></Image>
        </div>
        <div className="w-full inline-flex md:pl-10">
          <div className="rounded-md overflow-hidden md:-translate-y-16 flex-none">
            <Image
              src="https://cdn2.steamgriddb.com/icon_thumb/ac4e7a4f341e7281b0f6f274f9ec3905.png"
              alt="img-banner"
              width={300}
              height={300}
              className="object-cover object-center w-24 h-24 md:w-40 md:h-40"
            ></Image>
          </div>
          <div className="ml-3">
            <h2 className="text-2xl font-bold">Genshin Impact</h2>
            <div className="hidden md:inline-flex mt-2 flex-wrap gap-2">
              <Badge variant="outline">Mihoyo</Badge>
              <Badge variant="outline">Indonesia</Badge>
              <Badge variant="outline">Otomatis</Badge>
              <Badge variant="outline">Cepat</Badge>
            </div>
            <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti
              architecto ratione obcaecati quae maiores esse dicta placeat porro
              possimus ducimus?
            </p>
          </div>
        </div>
        <div className="md:hidden inline-flex mt-2 flex-wrap gap-2">
          <Badge variant="outline">Mihoyo</Badge>
          <Badge variant="outline">Indonesia</Badge>
          <Badge variant="outline">Otomatis</Badge>
          <Badge variant="outline">Cepat</Badge>
        </div>

        <form action="" className="mt-4 md:hidden">
          <div id="split" className="w-full grid grid-cols-2 gap-2 mb-2">
            <div id="form-group">
              <Label htmlFor="input1">Masukkan UID</Label>
              <Input name="input1" placeholder="Your UID"></Input>
            </div>
            <div id="form-group">
              <Label htmlFor="input1">Masukkan Server</Label>
              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Server" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="apple">Asia</SelectItem>
                    <SelectItem value="banana">Global</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
          <Label className="text-muted-foreground  text-xs">
            Temukan ID dan Server Anda di dalam game pada menu Profile
          </Label>
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
              selectedItem={paymentSelected}
              setSelectedItem={setPaymentSelected}
            />
            <div className="w-full inline-flex justify-between items-center mt-3 bg-card">
              <h4 className="font-semibold text-sm">Rp 29.000</h4>
              <Button className="text-sm bg-primary text-primary-foreground">
                Checkout
              </Button>
            </div>
          </div>
        </form>

        <div className="w-full">
          <Tab.Group>
            <Tab.List className="inline-flex overflow-x-auto gap-3">
              <Tab className="px-5 py-2 text-sm font-bold bg-card border ui-not-selected:border-slate-200 ui-selected:border-slate-400 dark:ui-not-selected:border-none dark:ui-selected:border-white rounded-md">
                Diamond
              </Tab>
              <Tab className="px-5 py-2 text-sm font-bold bg-card border ui-not-selected:border-slate-200 ui-selected:border-slate-400 dark:ui-not-selected:border-none dark:ui-selected:border-white rounded-md">
                Weekly Pass
              </Tab>
            </Tab.List>
            <Tab.Panels className="mt-5">
              <RadioGroup
                value={productSelected}
                onChange={(e) => {
                  setProductSelected(e);
                  console.log(e);
                }}
              >
                <Tab.Panel className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 grid-flow-row-dense gap-4">
                  {dummyProduct.map((item, index) => (
                    <RadioGroup.Option key={index} value={item}>
                      {({ checked }) => (
                        <div
                          className={cn("px-4 py-2 rounded-md", {
                            "border border-slate-400 dark:border-slate-600":
                              checked,
                            "bg-slate-100 dark:bg-card": !checked,
                          })}
                        >
                          <h4 className={cn("text-sm font-semibold")}>
                            900 DM
                          </h4>
                          <p className={cn("text-sm font-light")}>
                            Rp. 100.000
                          </p>
                        </div>
                      )}
                    </RadioGroup.Option>
                  ))}
                </Tab.Panel>
                <Tab.Panel className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 grid-flow-row-dense gap-4">
                  <RadioGroup.Option value="week">
                    {({ checked }) => (
                      <div
                        className={cn("px-4 py-2 rounded-md", {
                          "border border-slate-400 dark:border-slate-600":
                            checked,
                          "bg-slate-100 dark:bg-card": !checked,
                        })}
                      >
                        <h4 className={cn("text-sm font-semibold")}>
                          Weekly pass
                        </h4>
                        <p className={cn("text-sm font-light")}>Rp. 100.000</p>
                      </div>
                    )}
                  </RadioGroup.Option>
                  <RadioGroup.Option value="week2">
                    {({ checked }) => (
                      <div
                        className={cn("px-4 py-2 rounded-md", {
                          "border border-slate-400 dark:border-slate-600":
                            checked,
                          "bg-slate-100 dark:bg-card": !checked,
                        })}
                      >
                        <h4 className={cn("text-sm font-semibold")}>
                          Weekly Pass{" "}
                        </h4>
                        <p className={cn("text-sm font-light")}>Rp. 100.000</p>
                      </div>
                    )}
                  </RadioGroup.Option>
                </Tab.Panel>
              </RadioGroup>
            </Tab.Panels>
          </Tab.Group>
        </div>
      </div>

      <div className="w-full h-fit lg:col-span-1 bg-card lg:p-5 rounded-lg">
        <h2 className="text-2xl font-bold">Detail Pesanan</h2>
        <form action="" className="mt-4 hidden md:block">
          <div id="split" className="w-full grid grid-cols-2 gap-2 mb-2">
            <div id="form-group">
              <Label htmlFor="input1">Masukkan UID</Label>
              <Input name="input1" placeholder="Your UID"></Input>
            </div>
            <div id="form-group">
              <Label htmlFor="input1">Masukkan Server</Label>
              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Server" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="apple">Asia</SelectItem>
                    <SelectItem value="banana">Global</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
          <Label className="text-muted-foreground  text-xs">
            Temukan ID dan Server Anda di dalam game pada menu Profile
          </Label>
          <div id="form-group" className="mt-3 mb-4 w-full h-12">
            <Label htmlFor="input1">Pilih Pembayaran</Label>
            <SelectPaymentMethod
              selectedItem={paymentSelected}
              setSelectedItem={setPaymentSelected}
            />
          </div>
          <Button className="mt-4 w-full rounded-md h-16 text-lg">
            Checkout
          </Button>
        </form>
      </div>
    </section>
  );
}
