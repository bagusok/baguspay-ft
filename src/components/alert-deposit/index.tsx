import AlertPaymentCanceled from "../alert-payment/AlertCanceled";
import AlertPaymentExpired from "../alert-payment/AlertExpired";
import AlertPaymentPending from "../alert-payment/AlertPending";
import AlertPaymentSuccess from "../alert-payment/AlertSuccess";

export default function AlertDeposit({ data }: { data: any }) {
  const expiryInTs = new Date(data.expiredAt).getTime();

  switch (data.depositStatus) {
    case "PENDING":
      return <AlertPaymentPending targetTime={expiryInTs} />;
      break;
    case "SUCCESS":
      return <AlertPaymentSuccess />;
      break;
    case "EXPIRED":
      return <AlertPaymentExpired />;
      break;
    case "CANCELED":
      return <AlertPaymentCanceled />;
      break;
    default:
      return null;
      break;
  }
}
