import { apiUrl } from "@/lib/constant";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { cn, generateSignature, parseDate, priceFormat } from "@/lib/utils";
import PaymentFormTemplate from "@/components/payment-template";
import AlertPayment from "@/components/alert-payment";
import { Button } from "@/components/ui/button";
import SelectPaymentInquiry from "./SelectPaymentInquiry";

export default async function InquiryDetailPage({
  params: { id },
}: {
  params: { id: string };
}) {
  const getInquiry = await getInquiryDetail(id);
  if (getInquiry.statusCode == 404) return notFound();

  return (
    <div className="bg-gray-100 md:bg-transparent dark:bg-transparent">
      <div className="breadcrumb px-4 md:px-0 bg-white dark:bg-transparent pb-4">
        <h1>Inquiry Detail</h1>
      </div>
      <section className="grid grid-flow-row lg:grid-cols-2 gap-5">
        <div className="flex flex-col gap-4 w-full">
          <div className="rounded-xl bg-white md:bg-primary-foreground dark:bg-primary-foreground dark:border-none md:border md:border-gray-200 w-full p-4">
            <AlertPayment data={getInquiry.data} />
            <div className="mt-6 flex gap-3 justify-between w-full">
              <div className="">
                <h2 className="text-base font-semibold">
                  {getInquiry.data.product.name}
                </h2>
                <p className="text-muted-foreground text-sm">
                  {getInquiry.data.product.productGroup.Services.name}
                </p>
              </div>
              <div className="">
                <h2 className="text-sm font-medium">Total Tagihan</h2>
                <h3 className="text-xl font-semibold">
                  {priceFormat(getInquiry.data.totalPrice)}
                </h3>
              </div>
            </div>
            <hr className="my-3 bg-gray-200" />
            <SelectPaymentInquiry data={getInquiry.data} />
          </div>
          <div className="rounded-xl bg-white md:bg-primary-foreground dark:bg-primary-foreground dark:border-none md:border md:border-gray-200 w-full h-fit p-4 flex flex-col gap-3 overflow-x-auto">
            <h3 className="text-lg font-semibold">Detail Customer</h3>
            <hr className="bg-gray-200" />

            <div className="inline-flex justify-between items-center w-full">
              <h3 className="capitalize">Nama Customer</h3>
              <p className="text-muted-foreground">
                {getInquiry.data.customerName}
              </p>
            </div>
            <div className="inline-flex justify-between items-center w-full">
              <h3 className="capitalize">Customer ID</h3>
              <p className="text-muted-foreground">
                {getInquiry.data.customerNumber}
              </p>
            </div>

            {Object.keys(getInquiry.data.inquiryData).map((key, index) => {
              if (!Array.isArray(getInquiry.data.inquiryData[key])) {
                return (
                  <div
                    key={index}
                    className="inline-flex justify-between items-center w-full"
                  >
                    <h3 className="capitalize">{key.replaceAll("_", " ")}</h3>
                    <p className="text-muted-foreground">
                      {getInquiry.data.inquiryData[key]}
                    </p>
                  </div>
                );
              }
            })}
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <div className="rounded-xl bg-white md:bg-primary-foreground dark:bg-primary-foreground dark:border-none md:border md:border-gray-200 w-full h-fit p-4 flex flex-col gap-3 overflow-x-auto">
            <h3 className="text-lg font-semibold">Detail Tagihan</h3>
            <hr className="bg-gray-200" />
            {getInquiry.data.inquiryData.detail.map(
              (item: any, index: number) => {
                return (
                  <ul key={index}>
                    <li
                      key={index}
                      className="inline-flex justify-start items-center w-full"
                    >
                      <h3 className="capitalize font-semibold">
                        Periode ({item.periode})
                      </h3>
                    </li>
                    {Object.keys(item).map((key, index) => {
                      if (key !== "periode") {
                        return (
                          <li
                            key={index}
                            className="inline-flex justify-between items-center w-full"
                          >
                            <h3 className="capitalize">
                              {key.replaceAll("_", " ")}
                            </h3>
                            <p className="text-muted-foreground">
                              {priceFormat(item[key])}
                            </p>
                          </li>
                        );
                      }
                    })}
                  </ul>
                );
              }
            )}
            <hr className="bg-gray-200" />
            <div className="inline-flex justify-between items-center w-full">
              <h3>Total</h3>
              <p className="text-lg font-semibold">
                {priceFormat(getInquiry.data.totalPrice)}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

const getInquiryDetail = async (id: string) => {
  const response = await fetch(`${apiUrl}/transaction/inquiry/detail/${id}`, {
    cache: "no-store",
    headers: {
      "x-signature": generateSignature(),
    },
  });
  const data = await response.json();
  console.log(data);
  return data;
};
