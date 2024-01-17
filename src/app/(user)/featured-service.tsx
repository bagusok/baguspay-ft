import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function FeaturedService() {
  let arr = [1, 2, 3, 4, 5, 6, 7, 1, 1, 1, 1];
  return (
    <section className="w-full overflow-hidden relative">
      <h2 className="text-xl font-bold">Game Terlaris</h2>
      <div className="w-full mt-3 p-4 flex flex-row justify-start gap-4 overflow-x-auto">
        {arr.map((item, index) => (
          <div
            key={index}
            className="bg-card px-4 py-5 rounded-md w-40 flex flex-col items-center flex-none"
          >
            <Image
              src="https://www.apkmirror.com/wp-content/themes/APKMirror/ap_resize/ap_resize.php?src=https%3A%2F%2Fdownloadr2.apkmirror.com%2Fwp-content%2Fuploads%2F2022%2F11%2F43%2F637473239d8f6.png&w=96&h=96&q=100"
              alt="img"
              width={100}
              height={100}
              className="rounded"
            ></Image>

            <h3 className="text-lg font-semibold mt-3">Free Fire</h3>
            <Button className="mt-6 bg-primary rounded-full w-full text-sm">
              Topup
            </Button>
          </div>
        ))}
      </div>
    </section>
  );
}
