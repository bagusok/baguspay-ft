import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
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
import { axiosIn } from "@/lib/axios";
import { apiUrl } from "@/lib/constant";
import { cn, priceFormat } from "@/lib/utils";
import { userTokenAtom } from "@/store";
import { RadioGroup } from "@headlessui/react";
import { CheckCircledIcon } from "@radix-ui/react-icons";
import { useMutation } from "@tanstack/react-query";
import { useAtomValue } from "jotai";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function SelectPaymentDeposit({
  amount,
  paymentSelected,
  setPaymentSelected,
}: {
  amount: number;
  paymentSelected: {
    id?: string;
    name?: string;
  };
  setPaymentSelected: React.Dispatch<
    React.SetStateAction<{
      id?: string;
      name?: string;
    }>
  >;
}) {
  const [open, setOpen] = useState(false);

  const userToken = useAtomValue(userTokenAtom);

  const getPayment = useMutation({
    mutationKey: ["getPayment"],
    mutationFn: () =>
      axiosIn
        .get(`${apiUrl}/users/deposit/get-payment`, {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        })
        .then((res) => res.data)
        .catch((err) => console.log(err.response.data)),
  });

  useEffect(() => {
    if (open) {
      getPayment.mutate();
    }
  }, [open]);

  return (
    <>
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerTrigger asChild>
          <div className="my-3">
            <Label htmlFor="metode-pembayaran">Metode Pembayaran</Label>
            <Input
              className="dark:outline-1 dark:border-white/80 h-12 rounded-md text-start"
              readOnly
              placeholder="Pilih metode pembayaran"
              value={paymentSelected?.name}
            ></Input>
          </div>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle className="text-center">Metode Pembayaran</DrawerTitle>
            <DrawerDescription className="mt-4 text-left">
              <RadioGroup>
                <Accordion
                  type="multiple"
                  className="w-full overflow-y-auto max-h-96"
                >
                  {getPayment.data?.data?.map((item: any) => {
                    return (
                      <>
                        <AccordionItem key={item.type} value={item.type}>
                          <AccordionTrigger>
                            {item.type.replace("_", " ")}
                          </AccordionTrigger>
                          {!getPayment.isPending &&
                            item.data.map((payment: any, index: number) => (
                              <AccordionContent key={payment.id}>
                                <RadioGroup.Option
                                  onClick={(e) =>
                                    setPaymentSelected({
                                      id: payment.id,
                                      name: payment.name,
                                    })
                                  }
                                  value={payment.id}
                                  className="mt-1"
                                  disabled={
                                    amount < payment.minAmount ||
                                    amount > payment.maxAmount
                                  }
                                >
                                  {(state) => {
                                    return (
                                      <div
                                        className={cn(
                                          "w-full inline-flex items-center justify-between gap-5 rounded py-2 px-4 bg-slate-100 relative",
                                          {
                                            "bg-slate-200/50": !state.checked,
                                            "border border-primary":
                                              state.checked,
                                            "bg-slate-100/50": state.disabled,
                                          }
                                        )}
                                      >
                                        <div
                                          className={cn(
                                            "inline-flex justify-between items-center gap-6",
                                            {
                                              "pointer-events-none opacity-30":
                                                state.disabled,
                                            }
                                          )}
                                        >
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
                                              {priceFormat(
                                                Math.ceil(
                                                  amount +
                                                    payment.fees +
                                                    (amount *
                                                      Number(
                                                        payment.feesInPercent
                                                      )) /
                                                      100
                                                )
                                              )}
                                              <span className="text-[10px] text-light ml-2">
                                                {priceFormat(amount)} +{" "}
                                                {priceFormat(
                                                  Math.ceil(
                                                    payment.fees +
                                                      (amount *
                                                        Number(
                                                          payment.feesInPercent
                                                        )) /
                                                        100
                                                  )
                                                )}
                                              </span>
                                            </Label>
                                          </div>
                                        </div>
                                        <div className="justify-self-end">
                                          {state.checked && (
                                            <CheckCircledIcon className="scale-150" />
                                          )}
                                        </div>
                                        <span
                                          className={cn(
                                            "absolute top-0 left-0 bg-red-500 text-white px-4 py-1 text-sm opacity-100 rounded-tl-md",
                                            {
                                              hidden: !state.disabled,
                                            }
                                          )}
                                        >
                                          Tidak Tersedia
                                        </span>
                                      </div>
                                    );
                                  }}
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
    </>
  );
}
