"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { apiUrl } from "@/lib/constant";
import { userTokenAtom } from "@/store";
import { Label } from "@radix-ui/react-label";
import { useMutation } from "@tanstack/react-query";
import { useAtomValue } from "jotai";
import { FormEvent } from "react";
import toast from "react-hot-toast";

export default function CreateProductGroup({
  serviceId,
  openModal,
  setOpenModal,
  refetch,
}: {
  openModal: boolean;
  setOpenModal: (openModal: boolean) => void;
  serviceId: string;
  refetch: () => void;
}) {
  const userToken = useAtomValue(userTokenAtom);

  const saveServiceGroup = useMutation({
    mutationKey: ["service-group-save"],
    mutationFn: async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const { productGroupName, desc, services } = e.target as any;

      const response = await fetch(
        `${apiUrl}/admin/product/product-group/create`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${userToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: productGroupName.value,
            desc: desc.value,
            region: "INDONESIA",
            servicesId: services.value,
          }),
        }
      );
      const json = await response.json();
      if (json.statusCode == 200) {
        toast.success(json.message);
        refetch();
        setOpenModal(false);
      } else {
        toast.error(json.message);
      }
    },
  });

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
          <h3 className="text-center text-xl font-bold">
            Create Service Group
          </h3>
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
                required
              />
            </div>
            <div>
              <Label htmlFor="desc">Description</Label>
              <Input
                type="text"
                name="desc"
                placeholder="Weekly Pass Termurah sejagad raya"
              />
            </div>
            <div>
              <Label htmlFor="services">ID Service</Label>
              <Input
                type="text"
                name="services"
                placeholder="Weekly Pass"
                value={serviceId}
                readOnly
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
                disabled={saveServiceGroup.isPending}
                onSubmit={(e) => console.log(e)}
              >
                {saveServiceGroup.isPending ? "Saving..." : "Save"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
