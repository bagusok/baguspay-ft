"use client";

import SelectPaymentMethod from "@/app/(user)/order/[slug]/select-payment-method";
import { Button } from "@/components/ui/button";
import { axiosIn } from "@/lib/axios";
import { apiUrl } from "@/lib/constant";
import { userTokenAtom } from "@/store";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useAtomValue } from "jotai";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export default function SelectPaymentInquiry({ data }: { data: any }) {
  const [paymentDetail, setPaymentDetail] = useState<any>({});
  const [paymentSelected, setPaymentSelected] = useState("");

  const userToken = useAtomValue(userTokenAtom);
  const router = useRouter();

  const getPaymentMethod = useQuery({
    queryKey: ["paymentMethod-inquiry", data?.id],
    queryFn: async () =>
      axiosIn
        .post(
          `${apiUrl}/ui/payment-method-inquiry`,
          {
            inquiryId: data?.id,
          },
          {
            headers: {
              ...(userToken && { Authorization: `Bearer ${userToken}` }),
            },
          }
        )
        .then((res) => res.data)
        .catch((err) => console.error(err)),
  });

  const payInquiry = useMutation({
    mutationKey: ["pay-inquiry", data?.id],
    mutationFn: async () =>
      axiosIn
        .post(
          `${apiUrl}/transaction/inquiry/pay`,
          {
            inquiryId: data.id,
            paymentMethodId: paymentSelected,
            paymentName: paymentDetail?.name,
            totalPrice: paymentDetail?.total,
          },
          {
            headers: {
              ...(userToken && { Authorization: `Bearer ${userToken}` }),
            },
          }
        )
        .then((res) => {
          toast.success("Sukses Membuat Transaksi");
          router.push(`/transaction/history/${res.data.data.id}`);
        })
        .catch((err) => {
          toast.error("Gagal Membuat Transaksi");
          console.log(err);
        }),
  });

  return (
    <>
      <h2 className="mt-3 mb-1 text-sm">Pilih Metode Pembayaran</h2>
      <SelectPaymentMethod
        setPaymentDetail={setPaymentDetail}
        paymentDetail={paymentDetail}
        isLoading={getPaymentMethod.isPending}
        data={getPaymentMethod.data?.data}
        selectedItem={paymentSelected}
        setSelectedItem={setPaymentSelected}
        defaultSelectedItem={getPaymentMethod.data?.selected}
      />

      <div className="inline-flex justify-center mb-4 w-full mt-4">
        <Button
          onClick={(e) => payInquiry.mutate()}
          disabled={payInquiry.isPending}
        >
          {payInquiry.isPending ? "Loading" : "Bayar Sekarang"}
        </Button>
      </div>
    </>
  );
}
