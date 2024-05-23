import DirectEwalletTemplate from "./DirectEwallet";
import LinkPaymentTemplate from "./LinkPayment";
import QRISPaymentTemplate from "./QRIS";
import RetailOutletTemplate from "./RetailOutlet";
import TransferBankTemplate from "./TransferBank";
import TransferEwalletTemplate from "./TransferEwallet";
import TransferPulsaTemplate from "./TransferPulsa";
import VirtualAccountTemplate from "./VirtualAccount";

export default function PaymentFormTemplate({ data }: { data: any }) {
  const expiry = new Date(data.expiredAt).getTime() - new Date().getTime();

  if (expiry <= 0) {
    return null;
  }

  if (data.paymentMethod.isLinkPayment) {
    return <LinkPaymentTemplate data={data} />;
  } else {
    switch (data.paymentMethod.type) {
      case "SALDO":
        return null;
        break;
      case "TRANSFER_BANK":
        return <TransferBankTemplate data={data} />;
        break;
      case "TRANSFER_PULSA":
        return <TransferPulsaTemplate data={data} />;
        break;
      case "TRANSFER_EWALLET":
        return <TransferEwalletTemplate data={data} />;
        break;
      case "VIRTUAL_ACCOUNT":
        return <VirtualAccountTemplate data={data} />;
        break;
      case "RETAIL_OUTLET":
        return <RetailOutletTemplate data={data} />;
        break;
      case "DIRECT_EWALLET":
        return <DirectEwalletTemplate data={data} />;
        break;
      case "QR_CODE":
        return <QRISPaymentTemplate data={data} />;
        break;
      default:
        return null;
        break;
    }
  }
}
