import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { UpdateIcon } from "@radix-ui/react-icons";

export default function AlertPaymentRefundSuccess() {
  return (
    <Alert className="bg-green-100 dark:bg-transparent dark:border dark:border-white">
      <UpdateIcon className="h-5 w-5" />
      <AlertTitle className="font-semibold">
        Yeay, refund pembayaranmu berhasil!
      </AlertTitle>
      <AlertDescription className="inline-flex items-center">
        Kamu bisa beli lagi yang lain yaaa!
      </AlertDescription>
    </Alert>
  );
}
