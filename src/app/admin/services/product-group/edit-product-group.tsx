"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { axiosIn } from "@/lib/axios";
import { apiUrl } from "@/lib/constant";
import { userTokenAtom } from "@/store";
import { Label } from "@radix-ui/react-label";
import { useMutation } from "@tanstack/react-query";
import { useAtomValue } from "jotai";
import { FormEvent, useEffect } from "react";
import toast from "react-hot-toast";

export default function EditProductGroup({
  productGroupId,
  openModal,
  setOpenModal,
  refetch,
}: {
  openModal: boolean;
  setOpenModal: (openModal: boolean) => void;
  productGroupId: string;
  refetch: () => void;
}) {
  const userToken = useAtomValue(userTokenAtom);

  const saveServiceGroup = useMutation({
    mutationKey: ["service-group-save"],
    mutationFn: async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const { productGroupName, desc, services } = e.target as any;

      const response = await axiosIn.post(
        `${apiUrl}/admin/product/product-group/update`,
        {
          id: productGroupId,
          name: productGroupName.value,
          desc: desc.value,
          region: "INDONESIA",
          servicesId: services.value,
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

  const getServices = useMutation({
    mutationKey: ["get-services"],
    mutationFn: async () =>
      axiosIn
        .get(`${apiUrl}/admin/services`, {
          headers: {
            authorization: `Bearer ${userToken}`,
          },
        })
        .then((res) => res.data)
        .catch((err) => toast.error(err)),
  });

  const getProductGroupDetail = useMutation({
    mutationKey: ["get-product-detail"],
    mutationFn: async (productGroupId: string) => {
      return await axiosIn
        .get(`${apiUrl}/admin/product/product-group/${productGroupId}`, {
          headers: {
            authorization: `Bearer ${userToken}`,
          },
        })
        .then((res) => res.data)
        .catch((err) => toast.error(err));
    },
  });

  useEffect(() => {
    if (openModal) {
      getServices.mutate();
      getProductGroupDetail.mutate(productGroupId);
    }

    return () => getServices.reset();
  }, [openModal, productGroupId]);

  if (!openModal) return null;

  return (
    <section id="create-service-group">
      <div
        className="fixed z-50 top-0 right-0 left-0 bottom-0  bg-black/60 inline-flex justify-center items-center p-8"
        onClick={() => setOpenModal(false)}
      >
        <div
          className="md:w-2/3 rounded-lg bg-white h-fit px-5 pb-5 pt-3 flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          <h3 className="text-center text-xl font-bold">Edit Service Group</h3>
          {getProductGroupDetail.isPending && (
            <p className="text-center mt-4">Loading</p>
          )}

          {getProductGroupDetail.isSuccess && (
            <form
              onSubmit={(e) => saveServiceGroup.mutateAsync(e)}
              className="flex flex-col gap-3 mt-4"
            >
              <div>
                <Label htmlFor="name">Name</Label>
                <Input
                  type="text"
                  name="productGroupName"
                  placeholder="Weekly Pass"
                  defaultValue={getProductGroupDetail.data?.data?.name}
                  required
                />
              </div>
              <div>
                <Label htmlFor="desc">Description</Label>
                <Input
                  type="text"
                  name="desc"
                  defaultValue={getProductGroupDetail.data?.data?.desc}
                  placeholder="Weekly Pass Termurah sejagad raya"
                />
              </div>
              <div>
                <Label htmlFor="services">Service</Label>
                <Select
                  name="services"
                  defaultValue={getProductGroupDetail.data?.data?.servicesId}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select service" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {getServices.isSuccess &&
                        getServices.data?.data?.map((item: any) => (
                          <SelectItem key={item.id} value={item.id}>
                            {item.name}
                          </SelectItem>
                        ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
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
        </div>
      </div>
    </section>
  );
}
