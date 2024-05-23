import { apiUrl } from "@/lib/constant";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { cn, generateSignature, parseDate, priceFormat } from "@/lib/utils";
import PaymentFormTemplate from "@/components/payment-template";
import AlertPayment from "@/components/alert-payment";
import RefreshHelper from "./RefreshHelper";

export default async function TransactionDetailPage({
  params: { id },
}: {
  params: { id: string };
}) {
  const getTransaction = await getTransactionDetail(id);
  if (getTransaction.statusCode == 404) return notFound();

  return (
    <div className="bg-gray-100 md:bg-transparent dark:bg-transparent">
      <div className="breadcrumb px-6 md:px-0 bg-white dark:bg-transparent pb-4">
        <h1>Transaction Detail</h1>
      </div>
      <section className="grid grid-flow-row lg:grid-cols-2 gap-5">
        <div className="flex flex-col gap-4 w-full">
          <div className="rounded-xl bg-white md:bg-primary-foreground dark:bg-primary-foreground dark:border-none md:border md:border-gray-200 w-full p-4">
            <AlertPayment data={getTransaction.data} />
            <div className="mt-6 flex flex-col md:flex-row gap-3 justify-between w-full">
              <div className="">
                <h2 className="text-base font-semibold">
                  {getTransaction.data.productName}
                </h2>
                <p className="text-muted-foreground text-sm">
                  {getTransaction.data.productService}
                </p>
              </div>
              <div className="">
                <h2 className="text-sm font-medium">Total Pembayaran</h2>
                <h3 className="text-xl font-semibold">
                  {priceFormat(getTransaction.data.totalPrice)}
                </h3>
              </div>
            </div>
            <hr className="my-3 bg-gray-200" />
            <div className="inline-flex justify-between mb-4 w-full">
              <h3 className="text-base font-medium">
                Bayar dengan {getTransaction.data.paymentName}
              </h3>
              <Image
                src={
                  getTransaction.data.paymentMethod?.image ||
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
            <PaymentFormTemplate data={getTransaction.data} />
          </div>
          <div className="rounded-xl bg-white md:bg-primary-foreground dark:bg-primary-foreground dark:border-none md:border md:border-gray-200 w-full h-fit p-4 flex flex-col gap-3 overflow-x-auto">
            <div className="inline-flex justify-between items-center w-full">
              <h3>ID Transaksi</h3>
              <p className="text-muted-foreground text-sm">
                #{getTransaction.data.id}
              </p>
            </div>
            <div className="inline-flex justify-between items-center w-full">
              <h3>Status Payment</h3>
              <Badge
                variant="outline"
                className={cn("md:border", {
                  "border-orange-500 text-orange-600":
                    getTransaction.data.paidStatus === "PENDING",
                  "border-green-500 text-green-600":
                    getTransaction.data.paidStatus === "PAID",
                  "border-red-500 text-red-600":
                    getTransaction.data.paidStatus === "EXPIRED" ||
                    getTransaction.data.paidStatus === "CANCELED",
                })}
              >
                {getTransaction.data.paidStatus}
              </Badge>
            </div>
            <div className="inline-flex justify-between items-center w-full">
              <h3>Status Order</h3>
              <Badge
                variant="outline"
                className={cn("md:border", {
                  "border-orange-500 text-orange-600":
                    getTransaction.data.orderStatus === "PENDING" ||
                    getTransaction.data.orderStatus === "PROCESS",
                  "border-green-500 text-green-600":
                    getTransaction.data.orderStatus === "SUCCESS",
                  "border-red-500 text-red-600":
                    getTransaction.data.orderStatus === "FAILED" ||
                    getTransaction.data.orderStatus === "CANCELED",
                })}
              >
                {getTransaction.data.orderStatus}
              </Badge>
            </div>
            <div className="inline-flex justify-between items-center w-full">
              <h3>Tanggal Transaksi</h3>
              <p className="text-muted-foreground">
                {parseDate(getTransaction.data.createdAt)}
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <div className="rounded-xl bg-white md:bg-primary-foreground dark:bg-primary-foreground dark:border-none md:border md:border-gray-200 w-full h-fit p-4 flex flex-col gap-3 overflow-x-auto">
            <h3 className="text-lg font-semibold">Detail Produk</h3>
            <hr className="bg-gray-200" />
            <div className="inline-flex justify-between items-center w-full">
              <h3>Nama Product</h3>
              <p className="text-muted-foreground">
                {getTransaction.data.productName}
              </p>
            </div>
            <div className="inline-flex justify-between items-center w-full">
              <h3>Service</h3>
              <p className="text-muted-foreground">
                {getTransaction.data.productService}
              </p>
            </div>
            <div className="inline-flex justify-between items-center w-full">
              <h3>Tujuan</h3>
              <p className="text-muted-foreground">
                {getTransaction.data.inputData}
              </p>
            </div>
          </div>
          <div className="rounded-xl bg-white md:bg-primary-foreground dark:bg-primary-foreground dark:border-none md:border md:border-gray-200 w-full h-fit p-4 flex flex-col gap-3 overflow-x-auto">
            <h3 className="text-lg font-semibold">Detail Pembayaran</h3>
            <hr className="bg-gray-200" />
            <div className="inline-flex justify-between items-center w-full">
              <h3>Harga Produk</h3>
              <p className="text-muted-foreground">
                {priceFormat(getTransaction.data.productPrice)}
              </p>
            </div>
            <div className="inline-flex justify-between items-center w-full">
              <h3>Jumlah</h3>
              <p className="text-muted-foreground">
                {getTransaction.data.productQty}
              </p>
            </div>
            <div className="inline-flex justify-between items-center w-full">
              <h3>Fee Pembayaran</h3>
              <p className="text-muted-foreground">
                {priceFormat(getTransaction.data.fees)}
              </p>
            </div>
            <hr className="bg-gray-200" />
            <div className="inline-flex justify-between items-center w-full">
              <h3>Total</h3>
              <p className="text-lg font-semibold">
                {priceFormat(getTransaction.data.totalPrice)}
              </p>
            </div>
          </div>
        </div>
      </section>
      <RefreshHelper data={getTransaction.data} />
    </div>
  );
}

const getTransactionDetail = async (id: string) => {
  const response = await fetch(`${apiUrl}/transaction/detail/${id}`, {
    cache: "no-store",
    headers: {
      "x-signature": generateSignature(),
    },
  });
  const data = await response.json();
  return data;
};
