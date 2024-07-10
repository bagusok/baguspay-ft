"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn, priceFormat } from "@/lib/utils";
import { RadioGroup } from "@headlessui/react";
import { CheckCircledIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { useMediaQuery } from "usehooks-ts";

export default function SelectPaymentMethod({
  data = null,
  isLoading = false,
  selectedItem = "",
  setSelectedItem,
  paymentDetail,
  setPaymentDetail,
  defaultSelectedItem,
}: {
  data?: any;
  isLoading: boolean;
  selectedItem: string;
  setSelectedItem: (value: string) => void;
  paymentDetail?: {
    id?: string;
    name?: string;
    productPrice?: number;
    qty?: number;
    totalProductPrice?: number;
    fees?: number;
    total?: number;
  };
  setPaymentDetail: (value: any) => void;
  defaultSelectedItem: any;
}) {
  const [open, setOpen] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  useEffect(() => {
    if (!isLoading) {
      setSelectedItem(defaultSelectedItem?.id);
      setPaymentDetail(defaultSelectedItem);
    }
  }, [isLoading]);

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Input
            className="dark:outline-1 dark:border-white/80 h-12 rounded-md"
            readOnly
            disabled={!selectedItem}
            value={
              isLoading
                ? "Loading..."
                : !!selectedItem
                ? paymentDetail?.name
                : "Pilih Pembayaran"
            }
          ></Input>
        </DialogTrigger>
        <DialogContent className="max-h-96 overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-center mb-4">
              Metode Pembayaran
            </DialogTitle>
            <DialogDescription>
              <RadioGroup value={selectedItem} onChange={setSelectedItem}>
                <Accordion type="single" collapsible className="w-full">
                  <Accordion
                    type="multiple"
                    className="w-full"
                    defaultValue={[defaultSelectedItem?.type]}
                  >
                    {data?.map((item: any, indeks: number) => {
                      return (
                        <>
                          <AccordionItem key={indeks} value={item.type}>
                            <AccordionTrigger>
                              {item.type.replace("_", " ")}
                            </AccordionTrigger>
                            <div className="grid grid-cols-2 gap-3">
                              {!isLoading &&
                                item.data.map((payment: any, index: number) => (
                                  <AccordionContent
                                    key={payment.id}
                                    className="h-full"
                                  >
                                    <RadioGroup.Option
                                      value={payment.id}
                                      onClick={() =>
                                        setPaymentDetail({
                                          id: payment.id,
                                          name: payment.name,
                                          productPrice: payment.productPrice,
                                          qty: payment.qty,
                                          totalProductPrice:
                                            payment.totalProductPrice,
                                          fees: payment.fees,
                                          total: payment.total,
                                        })
                                      }
                                      className="mt-1 h-full"
                                      disabled={
                                        payment?.balance < payment.total
                                          ? true
                                          : false
                                      }
                                    >
                                      {({ checked, disabled }) => (
                                        <div
                                          className={cn(
                                            "w-full h-full inline-flex items-center justify-between gap-5 rounded py-2 px-4 bg-slate-100 relative",
                                            {
                                              "bg-slate-200/50": !checked,
                                              "border border-primary": checked,
                                              "opacity-40": disabled,
                                            }
                                          )}
                                        >
                                          <div className="inline-flex justify-between items-center gap-6">
                                            <div className="flex-none">
                                              <Image
                                                src={
                                                  payment.image ||
                                                  "https://upload.wikimedia.org/wikipedia/commons/thumb/8/86/Gopay_logo.svg/2560px-Gopay_logo.svg.png"
                                                }
                                                width={40}
                                                height={40}
                                                alt="gopay logo"
                                              />
                                            </div>
                                            <div className="flex flex-col gap-2">
                                              <h3 className="text-sm font-semibold">
                                                {payment.name}
                                              </h3>
                                              <Label
                                                htmlFor="detail-harga"
                                                className="text-sm font-light"
                                              >
                                                {priceFormat(payment.total)}
                                                <span className="text-[10px] text-light ml-2">
                                                  {priceFormat(
                                                    payment.totalProductPrice
                                                  )}{" "}
                                                  + {priceFormat(payment.fees)}
                                                </span>
                                              </Label>
                                            </div>
                                          </div>
                                          <div className="absolute top-[40%] right-6">
                                            {checked && (
                                              <CheckCircledIcon className="scale-150" />
                                            )}
                                          </div>
                                          {disabled && (
                                            <span className="px-3 py-0.5 text-xs bg-red-400 text-primary-foreground absolute top-0 right-0 rounded">
                                              Tidak tersedia
                                            </span>
                                          )}
                                        </div>
                                      )}
                                    </RadioGroup.Option>
                                  </AccordionContent>
                                ))}
                            </div>
                          </AccordionItem>
                        </>
                      );
                    })}
                  </Accordion>
                </Accordion>
              </RadioGroup>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Input
          className="dark:outline-1 dark:border-white/80 h-12 rounded-md text-start"
          readOnly
          // placeholder={isLoading ? "Loading..." : "Pilih Pembayaran"}
          value={
            isLoading
              ? "Loading..."
              : !!selectedItem
              ? paymentDetail?.name
              : "Pilih Pembayaran"
          }
        ></Input>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle className="text-center">Metode Pembayaran</DrawerTitle>
          <DrawerDescription className="mt-4 text-left">
            <RadioGroup value={selectedItem} onChange={setSelectedItem}>
              <Accordion
                type="multiple"
                className="w-full overflow-y-auto max-h-96"
                defaultValue={data?.map((a: any) => a.type)}
              >
                {data?.map((item: any) => {
                  return (
                    <>
                      <AccordionItem key={item.type} value={item.type}>
                        <AccordionTrigger>
                          {item.type.replace("_", " ")}
                        </AccordionTrigger>
                        {!isLoading &&
                          item.data.map((payment: any, index: number) => (
                            <AccordionContent key={payment.id}>
                              <RadioGroup.Option
                                value={payment.id}
                                className="mt-1"
                                onClick={() =>
                                  setPaymentDetail({
                                    id: payment.id,
                                    name: payment.name,
                                    productPrice: payment.productPrice,
                                    qty: payment.qty,
                                    totalProductPrice:
                                      payment.totalProductPrice,
                                    fees: payment.fees,
                                    total: payment.total,
                                  })
                                }
                              >
                                {({ checked }) => (
                                  <div
                                    className={cn(
                                      "w-full inline-flex items-center justify-between gap-5 rounded py-2 px-4 bg-slate-100",
                                      {
                                        "bg-slate-200/50": !checked,
                                        "border border-primary": checked,
                                      }
                                    )}
                                  >
                                    <div className="inline-flex justify-between items-center gap-6">
                                      <div className="flex-none">
                                        <Image
                                          src={
                                            payment.image ||
                                            "https://upload.wikimedia.org/wikipedia/commons/thumb/8/86/Gopay_logo.svg/2560px-Gopay_logo.svg.png"
                                          }
                                          width={60}
                                          height={60}
                                          alt="gopay logo"
                                        />
                                      </div>
                                      <div className="flex flex-col gap-2">
                                        <h3 className="text-sm font-semibold">
                                          {payment.name}
                                        </h3>
                                        <Label
                                          htmlFor="detail-harga"
                                          className="text-sm font-light"
                                        >
                                          {priceFormat(payment.total)}
                                          <span className="text-[10px] text-light ml-2">
                                            {priceFormat(
                                              payment.totalProductPrice
                                            )}{" "}
                                            + {priceFormat(payment.fees)}
                                          </span>
                                        </Label>
                                      </div>
                                    </div>
                                    <div className="justify-self-end">
                                      {checked && (
                                        <CheckCircledIcon className="scale-150" />
                                      )}
                                    </div>
                                  </div>
                                )}
                              </RadioGroup.Option>
                            </AccordionContent>
                          ))}
                      </AccordionItem>
                    </>
                  );
                })}
              </Accordion>
            </RadioGroup>
          </DrawerDescription>
        </DrawerHeader>

        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button>Lanjutkan</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
