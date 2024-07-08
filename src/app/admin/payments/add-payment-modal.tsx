import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { apiUrl } from "@/lib/constant";
import {
  dataPaymentMethodType,
  dataPaymentProvider,
} from "@/lib/data/select.data";
import { userTokenAtom } from "@/store";
import { useMutation } from "@tanstack/react-query";
import { Formik } from "formik";
import { useAtomValue } from "jotai";
import toast from "react-hot-toast";
import Select from "react-select";
import InputFilePicker from "../_file-picker/file-picker";
import { axiosIn } from "@/lib/axios";

export default function AdminAddPaymentModal({
  productGroupId,
  openModal,
  setOpenModal,
  refetch,
}: {
  productGroupId?: string;
  openModal: boolean;
  setOpenModal: (openModal: boolean) => void;
  refetch: () => void;
}) {
  const userToken = useAtomValue(userTokenAtom);

  const createPaymentMethod = useMutation({
    mutationKey: ["create-payment-method"],
    mutationFn: async (value: any) => {
      console.log(value);

      const response = await axiosIn.post(
        `${apiUrl}/admin/payment-method/create`,
        {
          ...value,
          provider: value.provider.value,
          type: value.type.value,
        },
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.statusCode == 200) {
        toast.success(response.data.message);
        refetch();
        setOpenModal(false);
      } else {
        toast.error(response.data.message);
      }
    },
  });

  const dataPaymentAllowFor = [
    { value: "DEPOSIT", label: "Deposit" },
    { value: "TRANSACTION", label: "Transaction" },
  ];

  if (!openModal) return null;

  return (
    <>
      <section id="create-service-group">
        <div
          className="fixed z-50 top-0 right-0 left-0 bottom-0 bg-black/60 inline-flex justify-center p-8 overflow-y-auto"
          onClick={() => setOpenModal(false)}
        >
          <div
            className="md:w-2/3 w-full rounded-lg bg-white h-fit px-5 pb-5 pt-3 flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-center text-xl font-bold mt-4">Add Payment</h3>
            <Formik
              onSubmit={(e) => createPaymentMethod.mutateAsync(e)}
              initialValues={{
                name: "",
                desc: "",
                image: "",
                type: dataPaymentMethodType[0],
                providerId: "",
                provider: dataPaymentProvider[0],
                fees: 0,
                feesInPercent: "0",
                isAvailable: true,
                minAmount: 0,
                maxAmount: 0,
                cutOffStart: "",
                cutOffEnd: "",
                paymentAllowAccess: ["TRANSACTION"],
              }}
            >
              {({ values, handleChange, handleSubmit, setFieldValue }) => (
                <form
                  onSubmit={handleSubmit}
                  className="flex flex-col gap-3 mt-4"
                >
                  <div className="inline-flex items-center">
                    <Label className="text-sm" htmlFor="name">
                      Is Available
                    </Label>
                    <Switch
                      name="isAvailable"
                      className="ml-3"
                      onCheckedChange={(isChecked) =>
                        setFieldValue("isAvailable", isChecked)
                      }
                      checked={values.isAvailable}
                    />
                  </div>

                  <InputFilePicker
                    className="w-28 h-28 flex-none"
                    name="image"
                    onChange={(e) => setFieldValue("image", e.value)}
                  />
                  <div>
                    <Label className="text-sm" htmlFor="name">
                      Name
                    </Label>
                    <Input
                      id="name"
                      type="text"
                      name="name"
                      placeholder="Weekly Pass"
                      required
                      value={values.name}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <Label className="text-sm" htmlFor="desc">
                      Description
                    </Label>
                    <Textarea
                      name="desc"
                      placeholder="Ini Description"
                      value={values.desc}
                      onChange={handleChange}
                    ></Textarea>
                  </div>

                  <div>
                    <div>
                      <Label className="text-sm" htmlFor="name">
                        Type
                      </Label>
                      <Select
                        name="type"
                        options={dataPaymentMethodType}
                        value={values.type}
                        onChange={(e) => setFieldValue("type", e)}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label className="text-sm" htmlFor="priceFromProvider">
                        Provider ID
                      </Label>
                      <Input
                        type="text"
                        name="providerId"
                        placeholder="BNIVA"
                        value={values.providerId}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div>
                      <Label className="text-sm" htmlFor="name">
                        Provider
                      </Label>

                      <Select
                        options={dataPaymentProvider}
                        name="provider"
                        value={values.provider}
                        onChange={(e) => setFieldValue("provider", e)}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label className="text-sm" htmlFor="name">
                        Fees In Percent
                      </Label>
                      <Input
                        type="text"
                        name="feesInPercent"
                        placeholder="2"
                        value={values.feesInPercent}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div>
                      <Label className="text-sm" htmlFor="name">
                        Fees (IDR)
                      </Label>
                      <Input
                        type="number"
                        name="fees"
                        placeholder="1000"
                        value={values.fees}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label className="text-sm" htmlFor="name">
                        Min Amount
                      </Label>
                      <Input
                        type="number"
                        name="minAmount"
                        placeholder="1000"
                        value={values.minAmount}
                        onChange={handleChange}
                      />
                    </div>
                    <div>
                      <Label className="text-sm" htmlFor="name">
                        Max Amount
                      </Label>
                      <Input
                        type="number"
                        name="maxAmount"
                        placeholder="2000000"
                        value={values.maxAmount}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label className="text-sm" htmlFor="name">
                        Cut Off Time Start
                      </Label>
                      <Input
                        type="time"
                        name="cutOffStart"
                        placeholder="Weekly Pass"
                        value={values.cutOffStart}
                        onChange={handleChange}
                      />
                    </div>
                    <div>
                      <Label className="text-sm" htmlFor="name">
                        Cut Off Time End
                      </Label>
                      <Input
                        type="time"
                        name="cutOffEnd"
                        placeholder="Weekly Pass"
                        value={values.cutOffEnd}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div>
                    <Label className="text-sm" htmlFor="name">
                      Payment Allow For
                    </Label>
                    <Select
                      name="paymentAllowAccess"
                      isMulti
                      defaultValue={dataPaymentAllowFor[1]}
                      options={dataPaymentAllowFor}
                      onChange={(e) => {
                        setFieldValue(
                          "paymentAllowAccess",
                          e.map((a: any) => a.value)
                        );
                      }}
                      value={
                        values?.paymentAllowAccess?.map((a: any) => {
                          return dataPaymentAllowFor[
                            dataPaymentAllowFor.findIndex((b) => b.value == a)
                          ];
                        }) || []
                      }
                      required
                    />
                  </div>

                  <div className="inline-flex gap-3 self-end mt-2">
                    <Button
                      type="button"
                      variant="destructive"
                      onClick={() => setOpenModal(false)}
                    >
                      Close
                    </Button>
                    <Button
                      type="submit"
                      disabled={createPaymentMethod.isPending}
                      onSubmit={(e) => console.log(e)}
                    >
                      {createPaymentMethod.isPending ? "Saving..." : "Save"}
                    </Button>
                  </div>
                </form>
              )}
            </Formik>
          </div>
        </div>
      </section>
    </>
  );
}
