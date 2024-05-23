import Image from "next/image";

export default function QRISPaymentTemplate({ data }: { data: any }) {
  return (
    <div className="w-full h-full flex flex-col items-center lg:items-start">
      <Image
        src={`https://qrcode.tec-it.com/API/QRCode?data=${data.qrData}&backcolor=%23ffffff&size=medium&quietzone=1&errorcorrection=H`}
        width={250}
        height={250}
        alt="QRIS Payment"
        className="object-cover"
      />
      <p className="text-xs mt-2 italic text-muted-foreground">
        * Scan dengan aplikasi Ewallet Kesayangan Anda
      </p>
    </div>
  );
}
