import { Input } from "@/components/ui/input";
import { axiosIn } from "@/lib/axios";
import { apiUrl } from "@/lib/constant";
import { userTokenAtom } from "@/store";
import { Label } from "@radix-ui/react-dropdown-menu";
import { useMutation } from "@tanstack/react-query";
import { useAtomValue } from "jotai";
import Select from "react-select";
import { useCallback, useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";

export default function ModalManageDeposit({
  openModal,
  setOpenModal,
  depositId,
  refetch,
}: {
  openModal: boolean;
  setOpenModal: (value: boolean) => void;
  depositId: string;
  refetch: () => void;
}) {
  const userToken = useAtomValue(userTokenAtom);

  const getDeposit = useMutation({
    mutationKey: ["getDeposit", depositId],
    mutationFn: () =>
      axiosIn
        .get(`${apiUrl}/admin/deposit/${depositId}`, {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        })
        .then((res) => {
          setAmount(res.data.data.amount);
          setFees(res.data.data.fees);
          return res.data;
        })
        .catch((err) => err.response.data),
  });

  const [depositStatus, setdepositStatus] = useState(
    getDeposit.data?.data?.depositStatus
  );

  const [amount, setAmount] = useState<number>(getDeposit.data?.data?.amount);
  const [fees, setFees] = useState<number>(getDeposit.data?.data?.fees);
  const total = useMemo<number>(
    () => Number(amount) + Number(fees),
    [amount, fees]
  );

  const updateDepositStatus = useMutation({
    mutationKey: ["updateDepositStatus", depositId],
    mutationFn: () => {
      return axiosIn
        .post(
          `${apiUrl}/admin/deposit/update-status`,
          {
            id: depositId,
            depositStatus,
            amount,
            fees,
            total,
          },
          {
            headers: {
              Authorization: `Bearer ${userToken}`,
            },
          }
        )
        .then((res) => {
          if (res.data.statusCode == 200) {
            toast.success(res.data.message);
            refetch();
            setOpenModal(false);
          } else {
            toast.error(res.data.message);
          }
        })
        .catch((err) => {
          toast.error(err.response.data.message);
        });
    },
  });

  useEffect(() => {
    if (openModal) {
      getDeposit.mutate();
    }
  }, [openModal]);

  const dataDepositStatus = [
    {
      value: "PENDING",
      label: "PENDING",
    },
    {
      value: "PROCESS",
      label: "PROCESS",
    },
    {
      value: "SUCCESS",
      label: "SUCCESS",
    },
    {
      value: "CANCELED",
      label: "CANCELED",
    },
    {
      value: "EXPIRED",
      label: "EXPIRED",
    },
  ];

  if (!openModal) return null;

  return (
    <section id="create-service-group">
      <div
        className="fixed z-50 top-0 right-0 left-0 bottom-0 bg-black/60 inline-flex justify-center p-8 overflow-y-auto"
        onClick={() => setOpenModal(false)}
      >
        <div
          className="md:w-2/3 w-full rounded-lg bg-white h-fit px-5 pb-5 pt-3 flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          <h1 className="font-semibold text-center">Manage Deposit</h1>
          {getDeposit.isPending && <div>Loading...</div>}
          {getDeposit.isError && <div>Error</div>}
          {getDeposit.isSuccess && (
            <>
              <div className="mt-4">
                <Label className="text-sm">Deposit ID</Label>
                <Input
                  value={getDeposit.data?.data?.id}
                  className="text-sm w-full opacity-75"
                  readOnly
                />
              </div>

              <div className="grid grid-cols-3 gap-3 mt-4">
                <div>
                  <Label className="text-sm">Payment Method</Label>
                  <Input
                    value={getDeposit.data?.data?.paymentName}
                    className="text-sm w-full opacity-75"
                    readOnly
                  />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-3 mt-4">
                <div>
                  <Label className="text-sm">Amount</Label>
                  <Input
                    type="number"
                    value={amount}
                    className="text-sm w-full opacity-75"
                    onChange={(e) => setAmount(Number(e.target.value))}
                    defaultValue={amount}
                  />
                </div>
                <div>
                  <Label className="text-sm">Fees</Label>
                  <Input
                    type="number"
                    value={fees}
                    className="text-sm w-full opacity-75"
                    onChange={(e) => setFees(Number(e.target.value))}
                    defaultValue={fees}
                  />
                </div>
                <div>
                  <Label className="text-sm">Total</Label>
                  <Input
                    defaultValue={getDeposit.data?.data?.total}
                    value={total}
                    className="text-sm w-full opacity-75"
                    readOnly
                  />
                </div>
              </div>
              <div className="mt-7 w-full">
                <h3 className="text-sm font-semibold text-center">
                  Manage Deposit Status
                </h3>
                <Label className="text-xs italic text-red-500 mt-4">
                  * Please be careful when changing the status, Please read the
                  intruction on the manual documentation to avoid any error or
                  bug
                </Label>
              </div>
              <div className="grid grid-cols-2 gap-3 mt-4">
                <div>
                  <Label className="text-sm">Deposit Status</Label>
                  <Select
                    defaultValue={dataDepositStatus.find(
                      (x) => x.value == getDeposit.data.data.depositStatus
                    )}
                    options={dataDepositStatus}
                    onChange={(e: any) => setdepositStatus(e.value)}
                  />
                </div>
              </div>
              <div className="mt-4 w-full inline-flex justify-end gap-3">
                <button
                  type="button"
                  className="px-4 py-1 text-sm bg-primary rounded text-primary-foreground hover:opacity-75 disabled:opacity-70"
                  onClick={() => {
                    updateDepositStatus.mutate();
                  }}
                  disabled={updateDepositStatus.isPending}
                >
                  {updateDepositStatus.isPending ? "Loading..." : "Submit"}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
