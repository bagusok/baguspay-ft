import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function DirectEwalletTemplate({ data }: { data: any }) {
  return (
    <div className="w-full h-full flex flex-col items-center lg:items-start">
      <Link
        href={data.linkPayment}
        className="inline-flex bg-primary text-primary-foreground font-semibold rounded-lg px-4 py-2 mt-4 lg:mt-0 hover:opacity-75"
      >
        Bayar Sekarang
      </Link>
      <p className="text-xs mt-5 italic text-muted-foreground self-start">
        * Klik Button di atas untuk melakukan pembayaran
      </p>
      <p className="text-xs mt-2 italic text-muted-foreground self-start">
        * Anda akan langsung diarahkan ke aplikasi Ewallet masing-masing
      </p>
    </div>
  );
}
