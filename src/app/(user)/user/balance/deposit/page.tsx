"use client";
import TopupHistory from "./DepositHistory";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import SelectPaymentDeposit from "./SelectPaymentDeposit";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { axiosIn } from "@/lib/axios";
import { apiUrl } from "@/lib/constant";
import { userTokenAtom } from "@/store";
import { useAtomValue } from "jotai";
import toast from "react-hot-toast";
import { redirect, useRouter } from "next/navigation";
import AuthLayout from "@/app/(user)/auth/auth-layout";
import { UserPermission } from "@/types/UserPermission";
import DepositHistory from "./DepositHistory";

export default function UserBalanceDeposit() {
  const [amount, setAmount] = useState("");
  const [paymentSelected, setPaymentSelected] = useState<{
    id?: string;
    name?: string;
  }>({});

  const userToken = useAtomValue(userTokenAtom);
  const router = useRouter();

  const createDeposit = useMutation({
    mutationKey: ["createDeposit"],
    mutationFn: () =>
      axiosIn
        .post(
          `${apiUrl}/user/deposit`,
          {
            amount: Number(amount) ?? 0,
            paymentMethodId: paymentSelected.id,
            paymentName: paymentSelected.name,
          },
          {
            headers: {
              Authorization: `Bearer ${userToken}`,
            },
          }
        )
        .then((res) => {
          toast.success(res.data.message);
          router.push(`/user/balance/deposit/${res.data.data.id}`);
        })
        .catch((err) => toast.error(err.response.data.message)),
  });

  return (
    <>
      <AuthLayout roles={[UserPermission.ADMIN, UserPermission.USER]}>
        <section className="grid grid-flow-row md:grid-flow-col md:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-8 relative bg-gray-100 md:bg-background pt-2">
          <div
            id="balance-info"
            className="rounded-lg bg-white md:bg-primary-foreground dark:bg-primary-foreground dark:border-none md:border md:border-gray-200 w-full p-4 h-fit sticky top-16 z-10 md:z-0"
          >
            <form action="">
              <div id="form-group">
                <Label htmlFor="topup-amount">Jumlah Topup</Label>
                <Input
                  type="number"
                  name="topup-amount"
                  id="topup-amount"
                  className="bg-background"
                  placeholder="50000"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </div>
              <SelectPaymentDeposit
                paymentSelected={paymentSelected}
                setPaymentSelected={setPaymentSelected}
                amount={Number(amount)}
              />
              <Button
                type="button"
                className="w-full text-sm disabled:opacity-70"
                onClick={() => createDeposit.mutate()}
                disabled={
                  !amount ||
                  !paymentSelected.name ||
                  !paymentSelected.id ||
                  createDeposit.isPending
                }
              >
                {createDeposit.isPending ? "Loading..." : "Deposit"}
              </Button>
            </form>
          </div>
          <div className="lg:col-span-2 overflow-x-scroll px-3 bg-background">
            <DepositHistory />
          </div>
        </section>
      </AuthLayout>
    </>
  );
}
