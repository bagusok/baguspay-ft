"use client";

import { Badge } from "@/components/ui/badge";
import { axiosIn } from "@/lib/axios";
import { apiUrl } from "@/lib/constant";
import { cn } from "@/lib/utils";
import { userTokenAtom } from "@/store";
import { useQuery } from "@tanstack/react-query";
import { useAtomValue } from "jotai";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function AdminServices() {
  const router = useRouter();
  const userToken = useAtomValue(userTokenAtom);
  const getService = useQuery({
    queryKey: ["getService", userToken],
    queryFn: async () => {
      return axiosIn
        .get(`${apiUrl}/admin/services`, {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        })
        .then((res) => res.data);
    },
  });

  return (
    <>
      <div className="mb-4 w-full inline-flex justify-end">
        <Link
          href="/admin/services/create-service"
          className="px-5 py-2 bg-primary text-primary-foreground text-sm rounded-md hover:opacity-75"
        >
          Add Service
        </Link>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
        {/* @ts-ignore */}
        {getService.data?.data.map((item, index) => (
          <div
            key={item.id}
            className="rounded-md bg-slate-100 shadow-sm p-3 inline-flex hover:opacity-65"
            onClick={() => router.push(`/admin/services/${item.id}`)}
          >
            <Image
              src={item.imgLogo}
              alt="img"
              width={100}
              height={100}
              className="rounded object-cover h-20 w-20 flex-none"
            />
            <div>
              <h3 className="txet-base font-semibold ml-3">{item.name}</h3>
              <div className="inline-flex mt-2 gap-2 ml-3">
                <Badge
                  variant="outline"
                  className={cn({
                    "bg-green-500": item.isAvailable,
                    "bg-red-500": !item.isAvailable,
                  })}
                >
                  {item.isAvailable ? "Available" : "Not Available"}
                </Badge>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
