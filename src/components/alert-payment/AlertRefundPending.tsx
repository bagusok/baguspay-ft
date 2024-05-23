import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ClockIcon } from "@radix-ui/react-icons";

export default function AlertPaymentRefundPending() {
  return (
    <Alert className="bg-orange-100 dark:bg-transparent dark:border dark:border-white">
      <ClockIcon className="h-5 w-5" />
      <AlertTitle className="font-semibold">
        Yah, kami harus merefund pembayaranmu.
      </AlertTitle>
      <AlertDescription className="inline-flex items-center">
        Hubungi admin biar kami proses refundnya.
      </AlertDescription>
    </Alert>
  );
}
