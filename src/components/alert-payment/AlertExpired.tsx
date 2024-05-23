import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ClockIcon } from "@radix-ui/react-icons";

export default function AlertPaymentExpired() {
  return (
    <Alert className="bg-red-100 dark:bg-transparent dark:border dark:border-white">
      <ClockIcon className="h-5 w-5" />
      <AlertTitle className="font-semibold">
        Yah, batas waktu pembayaran habis!
      </AlertTitle>
      <AlertDescription className="inline-flex items-center">
        Tenang, kamu bisa buat lagi kok!
      </AlertDescription>
    </Alert>
  );
}
