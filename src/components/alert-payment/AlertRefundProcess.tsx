import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { RocketIcon } from "@radix-ui/react-icons";

export default function AlertPaymentRefundProcess() {
  return (
    <Alert className="bg-orange-100 dark:bg-transparent dark:border dark:border-white">
      <RocketIcon className="h-5 w-5" />
      <AlertTitle className="font-semibold">Senangnya...</AlertTitle>
      <AlertDescription className="inline-flex items-center">
        Refund pembayaranmu sedang kami proses.
      </AlertDescription>
    </Alert>
  );
}
