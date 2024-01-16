import { Button } from "@/components/ui/button";
import { Tab } from "@headlessui/react";
import Image from "next/image";
import Link from "next/link";

export default function AllService() {
  let arr = [1, 2, 3, 4, 5, 6, 7, 1, 1, 1, 1];
  return (
    <section className="w-full overflow-hidden relative">
      <h2 className="text-xl font-bold mb-5">All Products</h2>
      <Tab.Group>
        <Tab.List className="w-full inline-flex justify-start gap-4 overflow-x-auto">
          <Tab className="px-8 py-1 rounded-2xl bg-card text-base font-semibold border border-slate-200 ui-selected:border-slate-400 ui-not-selected:opacity-40 dark:border-none">
            Tab 1
          </Tab>
          <Tab className="px-8 py-1 rounded-2xl bg-card text-base font-semibold border border-slate-200 ui-selected:border-slate-400 ui-not-selected:opacity-40 dark:border-none">
            Tab 2
          </Tab>
          <Tab className="px-8 py-1 rounded-2xl bg-card text-base font-semibold border border-slate-200 ui-selected:border-slate-400 ui-not-selected:opacity-40 dark:border-none ">
            Tab 3
          </Tab>
        </Tab.List>
        <Tab.Panels as="div" className="mt-4">
          <Tab.Panel>
            <div className="w-full mt-3 p-4  grid grid-cols-2 md:grid-cols-5 lg:grid-cols-6 gap-5">
              {arr.map((item, index) => (
                <div
                  key={index}
                  className="bg-card px-4 py-5 rounded-md flex flex-col items-center shadow-md"
                >
                  <Image
                    src="https://www.apkmirror.com/wp-content/themes/APKMirror/ap_resize/ap_resize.php?src=https%3A%2F%2Fdownloadr2.apkmirror.com%2Fwp-content%2Fuploads%2F2022%2F11%2F43%2F637473239d8f6.png&w=96&h=96&q=100"
                    alt="img"
                    width={100}
                    height={100}
                    className="rounded"
                  ></Image>

                  <h3 className="text-lg font-semibold mt-3">Free Fire</h3>
                  <Link href="/order/free-fire" className="w-full">
                    <Button className="mt-6 bg-green-200/80 border border-green-600 text-black rounded-full w-full text-sm">
                      Topup
                    </Button>
                  </Link>
                </div>
              ))}
            </div>
          </Tab.Panel>
          <Tab.Panel>
            <div className="w-full mt-3 p-4  grid grid-cols-2 md:grid-cols-5 lg:grid-cols-6 gap-5">
              {arr.map((item, index) => (
                <div
                  key={index}
                  className="bg-card px-4 py-5 rounded-md flex flex-col items-center shadow-md"
                >
                  <Image
                    src="https://www.apkmirror.com/wp-content/themes/APKMirror/ap_resize/ap_resize.php?src=https%3A%2F%2Fdownloadr2.apkmirror.com%2Fwp-content%2Fuploads%2F2022%2F11%2F43%2F637473239d8f6.png&w=96&h=96&q=100"
                    alt="img"
                    width={100}
                    height={100}
                    className="rounded"
                  ></Image>

                  <h3 className="text-lg font-semibold mt-3">Free Fire</h3>
                  <Button className="mt-6 bg-green-200/80 border border-green-600 text-black rounded-full w-full text-sm">
                    Topup
                  </Button>
                </div>
              ))}
            </div>
          </Tab.Panel>
          <Tab.Panel>Content 3</Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </section>
  );
}
