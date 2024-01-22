"use client";

import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function AdminServices() {
  const router = useRouter();

  return (
    <>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
        <div
          className="rounded-md bg-slate-100 shadow-sm p-3 inline-flex hover:opacity-65"
          onClick={() => router.push("/admin/services/this-uuid")}
        >
          <Image
            src="https://www.apkmirror.com/wp-content/themes/APKMirror/ap_resize/ap_resize.php?src=https%3A%2F%2Fdownloadr2.apkmirror.com%2Fwp-content%2Fuploads%2F2022%2F11%2F43%2F637473239d8f6.png&w=96&h=96&q=100"
            alt="img"
            width={100}
            height={100}
            className="rounded object-cover h-20 w-20 flex-none"
          />
          <div>
            <h3 className="txet-base font-semibold ml-3">Free Fire</h3>
            <div className="inline-flex mt-2 gap-2 ml-3">
              <Badge variant="outline" className="bg-green-400">
                Active
              </Badge>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
