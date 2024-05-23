import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ArchiveIcon } from "@radix-ui/react-icons";

export default function AlertPaymentSuccess() {
  return (
    <Alert className="bg-green-100 dark:bg-transparent dark:border dark:border-white">
      <ArchiveIcon className="h-5 w-5" />
      <AlertTitle className="font-semibold">
        Yeay, pembayaranmu berhasil!
      </AlertTitle>
      <AlertDescription className="inline-flex items-center">
        Kamu bisa memantau status pengiriman pesananmu dibawah yaaaa....
      </AlertDescription>
    </Alert>
  );
}
