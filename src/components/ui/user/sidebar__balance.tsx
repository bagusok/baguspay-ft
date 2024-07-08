import { priceFormat } from "@/lib/utils";

import Link from "next/link";

export default function SidebarBalance({ data }) {
  return (
    <>
      <div className="w-full my-3 rounded-md border border-slate-200 p-2 inline-flex justify-between items-center">
        <div className="">
          <h3 className="text-sm text-muted-foreground">Saldo</h3>
          <h3 className="text-base font-medium mt-1">
            {priceFormat(data?.balance)}
          </h3>
          <Link href="/user/balance" className="text-xs text-muted-foreground">
            Lihat mutasi saldo &gt;
          </Link>
        </div>
        <div>
          <Link
            href="/user/balance/deposit"
            className="text-xs bg-primary rounded-md px-4 py-1 font-semibold text-primary-foreground hover:opacity-70"
          >
            Deposit
          </Link>
        </div>
      </div>
    </>
  );
}
