"use client";
import AlertDeposit from "@/components/alert-deposit";
import PaymentFormTemplate from "@/components/payment-template";
import { axiosIn } from "@/lib/axios";
import { apiUrl } from "@/lib/constant";
import { priceFormat } from "@/lib/utils";
import { userTokenAtom } from "@/store";
import { useQuery } from "@tanstack/react-query";
import { useAtomValue } from "jotai";
import Image from "next/image";
import toast from "react-hot-toast";

export default function DepositDetailTemplate({ id }: { id: string }) {
  const userToken = useAtomValue(userTokenAtom);

  const getDepositDetail = useQuery({
    queryKey: ["getDepositDetail", id],
    queryFn: () =>
      axiosIn(`${apiUrl}/user/deposit/${id}`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      })
        .then((res) => res.data.data)
        .catch((err) => toast.error(err.response.data.message)),
  });

  if (getDepositDetail.isLoading) return <div>Loading...</div>;

  if (getDepositDetail.isError) return <div>Error...</div>;

  return (
    <div className="bg-gray-100 md:bg-transparent dark:bg-transparent">
      <div className="breadcrumb px-4 md:px-0 bg-white dark:bg-transparent md:pb-4">
        <h1>Deposit Detail</h1>
      </div>
      <section className="grid grid-flow-row lg:grid-cols-2 gap-5">
        <div className="flex flex-col gap-4 w-full">
          <div className="rounded-xl bg-white md:bg-primary-foreground dark:bg-primary-foreground dark:border-none md:border md:border-gray-200 w-full p-4">
            <AlertDeposit data={getDepositDetail.data} />
            <div className="mt-6 flex flex-col md:flex-row gap-3 justify-between w-full">
              <div className="">
                <h2 className="text-base font-semibold">Deposit</h2>
                <p className="text-muted-foreground text-sm">
                  #{getDepositDetail.data.id}
                </p>
              </div>
              <div className="">
                <h2 className="text-sm font-medium">Total Pembayaran</h2>
                <h3 className="text-xl font-semibold">
                  {priceFormat(getDepositDetail.data.total)}
                </h3>
              </div>
            </div>
            <hr className="my-3 bg-gray-200" />
            <div className="inline-flex justify-between mb-4 w-full">
              <h3 className="text-base font-medium">
                Bayar dengan {getDepositDetail.data.paymentName}
              </h3>
              <Image
                src={
                  getDepositDetail.data.paymentMethod?.image ||
                  "https://ucarecdn.com/3cdda27a-c2c0-4855-b449-17a2e58980b0/-/preview/150x150/-/format/auto/"
                }
                alt="payment-image"
                width={70}
                height={70}
                loading="lazy"
                placeholder="blur"
                blurDataURL="data:image/webp;base64,UklGRrgCAABXRUJQVlA4WAoAAAAgAAAAgQAAgQAASUNDUMgBAAAAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADZWUDggygAAAHAKAJ0BKoIAggA+7XaxVSmnJCMgapkwHYlpbt1+/xlmf0AeXVVVVS5tMt011F6ai7gT9vQI2jPfu+mu+G5sP0XoaJL0eH/AnvoUWrPLQy0mUgRFFBtUF1VVVu8AAP7w3tAA7aUgMr/oVE3jkwDFzyc7En1ly6GMZbvFZr3BXZVwY6FCh79myDdzYqi8cduEPIbLqRN4lY2VESStJhkscPDoUCh+szn99tyEPunyaodWnYF1T0+gMhwqpsuazRNFED8su0xGTfCyAAA="
                quality={100}
              />
            </div>
            {getDepositDetail.data.depositStatus == "PENDING" && (
              <PaymentFormTemplate data={getDepositDetail.data} />
            )}
          </div>
        </div>
        <div className="rounded-xl bg-white md:bg-primary-foreground dark:bg-primary-foreground dark:border-none md:border md:border-gray-200 w-full h-fit p-4 flex flex-col gap-3 overflow-x-auto">
          <h3 className="text-lg font-semibold">Detail Pembayaran</h3>
          <hr className="bg-gray-200" />
          <div className="inline-flex justify-between items-center w-full">
            <h3>Jumlah Deposit Masuk</h3>
            <p className="text-muted-foreground">
              {priceFormat(getDepositDetail.data.amount)}
            </p>
          </div>
          <div className="inline-flex justify-between items-center w-full">
            <h3>Fee Pembayaran</h3>
            <p className="text-muted-foreground">
              {priceFormat(getDepositDetail.data.fees)}
            </p>
          </div>
          <hr className="bg-gray-200" />
          <div className="inline-flex justify-between items-center w-full">
            <h3>Total</h3>
            <p className="text-lg font-semibold">
              {priceFormat(getDepositDetail.data.total)}
            </p>
          </div>
        </div>
      </section>
      {/* <RefreshHelper data={getDepositDetail.data} /> */}
    </div>
  );
}
