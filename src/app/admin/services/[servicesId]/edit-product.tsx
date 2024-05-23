"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { apiUrl } from "@/lib/constant";
import { userTokenAtom } from "@/store";
import { Label } from "@radix-ui/react-label";
import { useMutation } from "@tanstack/react-query";
import { useAtomValue } from "jotai";

import toast from "react-hot-toast";
import { Formik } from "formik";
import { Select } from "@radix-ui/react-select";
import {
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { useEffect } from "react";
import { axiosIn } from "@/lib/axios";

export default function EditProduct({
  productId,
  openModal,
  setOpenModal,
  refetch,
}: {
  productId: string;
  openModal: boolean;
  setOpenModal: (openModal: boolean) => void;
  refetch: () => void;
}) {
  const userToken = useAtomValue(userTokenAtom);

  const getProductDetail = useMutation({
    mutationKey: ["get-product-detail"],
    mutationFn: async () => {
      return axiosIn
        .get(`${apiUrl}/admin/products/${productId}`, {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        })
        .then((res) => res.data.data)
        .catch((err) => console.log(err));
    },
  });

  const saveServiceGroup = useMutation({
    mutationKey: ["edit-product"],
    mutationFn: async (value: any) => {
      const response = await axiosIn.post(
        `${apiUrl}/admin/products/update`,
        {
          id: productId,
          ...value,
        },
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
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

  useEffect(() => {
    if (openModal) {
      getProductDetail.mutate();
    }
  }, [openModal]);

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
            <h3 className="text-center text-xl font-bold mt-4">Edit Product</h3>
            {getProductDetail.isPending && (
              <div className="h-32 w-full inline-flex items-center text-center">
                <p className="text-center text-base">PLease Wait ...</p>
              </div>
            )}
            {getProductDetail.isSuccess && (
              <Formik
                onSubmit={(e) => saveServiceGroup.mutateAsync(e)}
                initialValues={{
                  name: getProductDetail.data?.name || "",
                  desc: getProductDetail.data?.desc || "",
                  isAvailable: getProductDetail.data?.isAvailable || false,
                  priceFromProvider:
                    getProductDetail.data?.priceFromProvider || 0,
                  profit: getProductDetail.data?.profit || 0,
                  profitInPercent: getProductDetail.data?.profitInPercent || 0,
                  stock: getProductDetail.data?.stock || 0,
                  type: getProductDetail.data?.type || "GAME_DIRECT",
                  typeResponse: getProductDetail.data?.typeResponse || "DIRECT",
                  h2hProvider:
                    getProductDetail.data?.h2hProvider || "DIGIFLAZZ",
                  idProductProvider:
                    getProductDetail.data?.idProductProvider || "",
                  productId: productId,
                  cutOffStart: getProductDetail.data?.cutOffStart || "00:00",
                  cutOffEnd: getProductDetail.data?.cutOffEnd || "00:00",
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

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <Label className="text-sm" htmlFor="priceFromProvider">
                          Price From Provider
                        </Label>
                        <Input
                          type="number"
                          name="priceFromProvider"
                          placeholder="10000"
                          value={values.priceFromProvider}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div>
                        <Label className="text-sm" htmlFor="name">
                          Profit IDR
                        </Label>
                        <Input
                          type="number"
                          name="profit"
                          placeholder="1000"
                          value={values.profit}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <Label className="text-sm" htmlFor="name">
                          Profit In Percent
                        </Label>
                        <Input
                          type="number"
                          name="profitInPercent"
                          placeholder="2"
                          value={values.profitInPercent}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div>
                        <Label className="text-sm" htmlFor="name">
                          Stock
                        </Label>
                        <Input
                          type="number"
                          name="stock"
                          placeholder="9999"
                          value={values.stock}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <Label className="text-sm" htmlFor="name">
                          Type
                        </Label>
                        <Select
                          name="type"
                          value={values.type}
                          onValueChange={(value) =>
                            setFieldValue("type", value)
                          }
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select a type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectItem value="GAME_DIRECT">
                                GAME DIRECT
                              </SelectItem>
                              <SelectItem value="GAME_VOUCHER">
                                GAME VOUCHER
                              </SelectItem>
                              <SelectItem value="TAGIHAN">TAGIHAN</SelectItem>
                              <SelectItem value="PULSA">PULSA</SelectItem>
                              <SelectItem value="PAKET_DATA">
                                PAKET DATA
                              </SelectItem>
                              <SelectItem value="E_MONEY">E MONEY</SelectItem>
                              <SelectItem value="AKUN_PREMIUM">
                                AKUN PREMIUM
                              </SelectItem>
                              <SelectItem value="SMM">SMM</SelectItem>
                              <SelectItem value="LAINNYA">LAINNYA</SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label className="text-sm" htmlFor="name">
                          Type Response
                        </Label>
                        <Select
                          name="typeResponse"
                          value={values.typeResponse}
                          onValueChange={(value) =>
                            setFieldValue("typeResponse", value)
                          }
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select a type response" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectItem value="DIRECT">DIRECT</SelectItem>
                              <SelectItem value="DIRECT_RETURN">
                                DIRECT RETURN
                              </SelectItem>
                              <SelectItem value="MANUAL">MANUAL</SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div>
                      <Label className="text-sm" htmlFor="name">
                        H2H Provider
                      </Label>
                      <Select
                        name="h2hProvider"
                        value={values.h2hProvider}
                        onValueChange={(value) =>
                          setFieldValue("h2hProvider", value)
                        }
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select a type response" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectItem value="DIGIFLAZZ">DIGIFLAZZ</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label className="text-sm" htmlFor="name">
                        ID Product From Provider
                      </Label>
                      <Input
                        type="text"
                        name="idProductProvider"
                        placeholder="DIGI123"
                        value={values.idProductProvider}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div>
                      <Input
                        type="text"
                        name="productId"
                        readOnly
                        value={values.productId}
                      />
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
                        disabled={saveServiceGroup.isPending}
                        onSubmit={(e) => console.log(e)}
                      >
                        {saveServiceGroup.isPending ? "Saving..." : "Save"}
                      </Button>
                    </div>
                  </form>
                )}
              </Formik>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
