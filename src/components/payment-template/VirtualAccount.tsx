"use client";
import { CopyIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import toast from "react-hot-toast";

export default function VirtualAccountTemplate({ data }: { data: any }) {
  const [paymentCode] = useState(data.paymentNumber);

  return (
    <div className="w-full h-full flex flex-col items-center lg:items-start">
      <p className="text-sm mt-5 italic text-muted-foreground">
        Nomor Virtual ACcount
      </p>
      <div className="w-full relative">
        <input
          type="text"
          className="w-full rounded-md p-4 text-lg font-semibold border border-gray-200"
          value={paymentCode}
          disabled
        />
        <button
          className="absolute top-[35%] right-4 hover:opacity-75"
          onClick={() => {
            navigator.clipboard.writeText(paymentCode);
            toast.success("Kode pembayaran berhasil disalin");
          }}
        >
          <CopyIcon className="w-6 h-6 hover:opacity-70" />
        </button>
      </div>

      <p className="text-xs mt-5 italic text-muted-foreground self-start">
        * Transfer sesuai bank masing-masing
      </p>
    </div>
  );
}
