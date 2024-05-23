import AlertPaymentCanceled from "./AlertCanceled";
import AlertPaymentExpired from "./AlertExpired";
import AlertPaymentPending from "./AlertPending";
import AlertPaymentRefundFailed from "./AlertRefundFailed";
import AlertPaymentRefundPending from "./AlertRefundPending";
import AlertPaymentRefundProcess from "./AlertRefundProcess";
import AlertPaymentRefundSuccess from "./AlertRefundSuccess";
import AlertPaymentSuccess from "./AlertSuccess";
import AlertPaymentSucces from "./AlertSuccess";

export default function AlertPayment({ data }: { data: any }) {
  const expiryInTs = new Date(data.expiredAt).getTime();

  if (data.isRefunded) {
    switch (data.refundStatus) {
      case "PROCESS":
        return <AlertPaymentRefundProcess />;
        break;
      case "SUCCESS":
        return <AlertPaymentRefundSuccess />;
        break;
      case "FAILED":
        return <AlertPaymentRefundFailed />;
        break;
      case "PENDING":
        return <AlertPaymentRefundPending />;
        break;
      default:
        return null;
        break;
    }
  } else {
    switch (data.paidStatus) {
      case "PENDING":
        return <AlertPaymentPending targetTime={expiryInTs} />;
        break;
      case "PAID":
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
}
