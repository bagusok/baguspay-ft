import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CrossCircledIcon } from "@radix-ui/react-icons";

export default function AlertPaymentRefundFailed() {
  return (
    <Alert className="bg-red-100 dark:bg-transparent dark:border dark:border-white">
      <CrossCircledIcon className="h-5 w-5" />
      <AlertTitle className="font-semibold">
        Sayang sekali, refund pembayaranmu gagal.
      </AlertTitle>
      <AlertDescription className="inline-flex items-center">
        Tenang aja, kamu bisa hubungi CS kami untuk bantuan lebih lanjut.
      </AlertDescription>
    </Alert>
  );
}
