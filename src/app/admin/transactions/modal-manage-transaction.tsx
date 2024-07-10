import { Input } from "@/components/ui/input";
import { axiosIn } from "@/lib/axios";
import { apiUrl } from "@/lib/constant";
import { userTokenAtom } from "@/store";
import { Label } from "@radix-ui/react-dropdown-menu";
import { useMutation } from "@tanstack/react-query";
import { useAtomValue } from "jotai";
import Select from "react-select";
import { useEffect, useState } from "react";
import { Button } from "react-day-picker";
import toast from "react-hot-toast";

export default function ModalManageTransaction({
  openModal,
  setOpenModal,
  transactionId,
  refetch,
}: {
  openModal: boolean;
  setOpenModal: (value: boolean) => void;
  transactionId: string;
  refetch: () => void;
}) {
  const userToken = useAtomValue(userTokenAtom);

  const getTransaction = useMutation({
    mutationKey: ["getTransaction", transactionId],
    mutationFn: () =>
      axiosIn
        .get(`${apiUrl}/admin/transactions/${transactionId}`, {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        })
        .then((res) => res.data)
        .catch((err) => err.response.data),
  });

  const [refundStatus, setRefundStatus] = useState(
    getTransaction.data?.data?.refundStatus
  );
  const [paidStatus, setPaidStatus] = useState(
    getTransaction.data?.data?.paidStatus
  );
  const [orderStatus, setOrderStatus] = useState(
    getTransaction.data?.data?.orderStatus
  );

  const [isRefunded, setIsRefunded] = useState(
    getTransaction.data?.data?.isRefunded
  );

  const updateTransactionStatus = useMutation({
    mutationKey: ["updateTransactionStatus", transactionId],
    mutationFn: () => {
      return axiosIn
        .post(
          `${apiUrl}/admin/transactions/update-status`,
          {
            id: transactionId,
            refundStatus,
            paidStatus,
            orderStatus,
            isRefunded,
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
      getTransaction.mutate();
    }
  }, [openModal]);

  const dataRefundStatus = [
    { value: "NONE", label: "NONE" },
    { value: "PENDING", label: "PENDING" },
    { value: "PROCESS", label: "PROCESS" },
    { value: "SUCCESS", label: "SUCCESS" },
  ];

  const dataPaidStatus = [
    {
      value: "PENDING",
      label: "PENDING",
    },
    {
      value: "PAID",
      label: "PAID",
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

  const dataOrderStatus = [
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
      value: "FAILED",
      label: "FAILED",
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
          <h1 className="font-semibold text-center">Manage Transaction</h1>
          {getTransaction.isPending && <div>Loading...</div>}
          {getTransaction.isError && <div>Error</div>}
          {getTransaction.isSuccess && (
            <>
              <div className="mt-4">
                <Label className="text-sm">Transaction ID</Label>
                <Input
                  value={getTransaction.data?.data?.id}
                  className="text-sm w-full opacity-75"
                  readOnly
                />
              </div>
              <div className="mt-4">
                <Label className="text-sm">Product Name</Label>
                <Input
                  value={getTransaction.data?.data?.productName}
                  className="text-sm w-full opacity-75"
                  readOnly
                />
              </div>

              <div className="grid grid-cols-3 gap-3 mt-4">
                <div>
                  <Label className="text-sm">Payment Method</Label>
                  <Input
                    value={getTransaction.data?.data?.paymentMethod.name}
                    className="text-sm w-full opacity-75"
                    readOnly
                  />
                </div>
                <div>
                  <Label className="text-sm">Fees</Label>
                  <Input
                    value={getTransaction.data?.data?.fees}
                    className="text-sm w-full opacity-75"
                    readOnly
                  />
                </div>
                <div>
                  <Label className="text-sm">Profit</Label>
                  <Input
                    value={getTransaction.data?.data?.profit}
                    className="text-sm w-full opacity-75"
                    readOnly
                  />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-3 mt-4">
                <div>
                  <Label className="text-sm">Product Price</Label>
                  <Input
                    value={getTransaction.data?.data?.price}
                    className="text-sm w-full opacity-75"
                    readOnly
                  />
                </div>
                <div>
                  <Label className="text-sm">Qty</Label>
                  <Input
                    value={getTransaction.data?.data?.productQty}
                    className="text-sm w-full opacity-75"
                    readOnly
                  />
                </div>
                <div>
                  <Label className="text-sm">Total Price</Label>
                  <Input
                    value={getTransaction.data?.data?.totalPrice}
                    className="text-sm w-full opacity-75"
                    readOnly
                  />
                </div>
              </div>
              <div className="mt-7 w-full">
                <h3 className="text-sm font-semibold text-center">
                  Manage Transaction Status
                </h3>
                <Label className="text-xs italic text-red-500 mt-4">
                  * Please be careful when changing the status, Please read the
                  intruction on the manual documentation to avoid any error or
                  bug
                </Label>
              </div>
              <div className="grid grid-cols-2 gap-3 mt-2">
                <div>
                  <Label className="text-sm">Is Refunded</Label>
                  <Select
                    defaultValue={{
                      value: getTransaction.data.data.isRefunded,
                      label: getTransaction.data.data.isRefunded
                        ? "TRUE"
                        : "FALSE",
                    }}
                    options={[
                      {
                        value: true,
                        label: "TRUE",
                      },
                      {
                        value: false,
                        label: "FALSE",
                      },
                    ]}
                    onChange={(e: any) => setIsRefunded(e.value)}
                  />
                </div>
                <div>
                  <Label className="text-sm">Refund Status</Label>
                  <Select
                    defaultValue={dataRefundStatus.find(
                      (x) => x.value == getTransaction.data.data.refundStatus
                    )}
                    options={dataRefundStatus}
                    onChange={(e: any) => setRefundStatus(e.value)}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 mt-4">
                <div>
                  <Label className="text-sm">Paid Status</Label>
                  <Select
                    defaultValue={dataPaidStatus.find(
                      (x) => x.value == getTransaction.data.data.paidStatus
                    )}
                    options={dataPaidStatus}
                    onChange={(e: any) => setPaidStatus(e.value)}
                  />
                </div>
                <div>
                  <Label className="text-sm">Order Status</Label>
                  <Select
                    defaultValue={dataOrderStatus.find(
                      (x) => x.value == getTransaction?.data?.data?.orderStatus
                    )}
                    options={dataOrderStatus}
                    onChange={(e: any) => setOrderStatus(e.value)}
                  />
                </div>
              </div>
              <div className="mt-4 w-full inline-flex justify-end gap-3">
                <button
                  type="button"
                  className="px-4 py-1 text-sm bg-primary rounded text-primary-foreground hover:opacity-75 disabled:opacity-70"
                  onClick={() => {
                    updateTransactionStatus.mutate();
                  }}
                  disabled={updateTransactionStatus.isPending}
                >
                  {updateTransactionStatus.isPending ? "Loading..." : "Submit"}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
