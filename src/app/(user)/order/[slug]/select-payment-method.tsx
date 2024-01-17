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
import { cn } from "@/lib/utils";
import { RadioGroup } from "@headlessui/react";
import { CheckCircledIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import { use, useEffect, useState } from "react";
import { useMediaQuery } from "usehooks-ts";

export default function SelectPaymentMethod({
  data = null,
  selectedItem = "",
  setSelectedItem,
}: {
  data?: any;
  selectedItem: string;
  setSelectedItem: (value: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Input
            className="dark:outline-1 dark:border-white/80 h-12 rounded-md"
            readOnly
            placeholder="Pilih Pembayaran"
            value={!!selectedItem ? selectedItem : "Pilih Pembayaran"}
          ></Input>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-center mb-4">
              Metode Pembayaran
            </DialogTitle>
            <DialogDescription>
              <RadioGroup value={selectedItem} onChange={setSelectedItem}>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1">
                    <AccordionTrigger>Direct E-Wallet</AccordionTrigger>
                    <AccordionContent>
                      <RadioGroup.Option value="startup" className="mt-1">
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
                                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/86/Gopay_logo.svg/2560px-Gopay_logo.svg.png"
                                  width={40}
                                  height={40}
                                  alt="gopay logo"
                                />
                              </div>
                              <div className="flex flex-col gap-2">
                                <h3 className="text-sm font-semibold">Gopay</h3>
                                <Label
                                  htmlFor="detail-harga"
                                  className="text-sm font-light"
                                >
                                  Rp. 100.000
                                  <span className="text-[10px] text-light ml-2">
                                    90.000 + 10.000(fee)
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
                      <RadioGroup.Option value="sovo" className="mt-1">
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
                                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/86/Gopay_logo.svg/2560px-Gopay_logo.svg.png"
                                  width={40}
                                  height={40}
                                  alt="gopay logo"
                                />
                              </div>
                              <div className="flex flex-col gap-2">
                                <h3 className="text-sm font-semibold">Gopay</h3>
                                <Label
                                  htmlFor="detail-harga"
                                  className="text-sm font-light"
                                >
                                  Rp. 100.000
                                  <span className="text-[10px] text-light ml-2">
                                    90.000 + 10.000(fee)
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
                  </AccordionItem>
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
          className="dark:outline-1 dark:border-white/80 h-12 rounded-md"
          readOnly
          placeholder="Pilih Pembayaran"
          value={!!selectedItem ? selectedItem : "Pilih Pembayaran"}
        ></Input>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle className="text-center">Metode Pembayaran</DrawerTitle>
          <DrawerDescription className="mt-4 text-left">
            <RadioGroup value={selectedItem} onChange={setSelectedItem}>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>Direct E-Wallet</AccordionTrigger>
                  <AccordionContent>
                    <RadioGroup.Option value="startup" className="mt-1">
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
                                src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/86/Gopay_logo.svg/2560px-Gopay_logo.svg.png"
                                width={40}
                                height={40}
                                alt="gopay logo"
                              />
                            </div>
                            <div className="flex flex-col gap-2">
                              <h3 className="text-sm font-semibold">Gopay</h3>
                              <Label
                                htmlFor="detail-harga"
                                className="text-sm font-light"
                              >
                                Rp. 100.000
                                <span className="text-[10px] text-light ml-2">
                                  90.000 + 10.000(fee)
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
                    <RadioGroup.Option value="sovo" className="mt-1">
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
                                src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/86/Gopay_logo.svg/2560px-Gopay_logo.svg.png"
                                width={40}
                                height={40}
                                alt="gopay logo"
                              />
                            </div>
                            <div className="flex flex-col gap-2">
                              <h3 className="text-sm font-semibold">Gopay</h3>
                              <Label
                                htmlFor="detail-harga"
                                className="text-sm font-light"
                              >
                                Rp. 100.000
                                <span className="text-[10px] text-light ml-2">
                                  90.000 + 10.000(fee)
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
                </AccordionItem>
              </Accordion>
            </RadioGroup>
          </DrawerDescription>
        </DrawerHeader>

        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
