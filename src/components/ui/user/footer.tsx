import { dataFooterInfo, dataFooterLink } from "@/lib/data/footer.data";
import Image from "next/image";
import Link from "next/link";

export default function UserFooter() {
  return (
    <div className="bg-background mt-20 pt-5 pb-24 md:pb-3 w-full px-2">
      <div className="flex flex-col md:flex-row md:gap-10 md:justify-between">
        <div
          id="footer-info"
          className="flex flex-col justify-center md:justify-normal gap-7 md:w-1/3"
        >
          {dataFooterInfo?.map((item, index) => {
            if (item.type == "text") {
              return (
                <div key={index}>
                  <h2 className="text-xl font-semibold text-center md:text-start">
                    {item.title}
                  </h2>
                  <p className="mt-3 text-xs text-muted-foreground text-justify">
                    {item?.description}
                  </p>
                </div>
              );
            } else if (item.type == "button") {
              return (
                <div key={index}>
                  <h2 className="text-base font-semibold text-center md:text-start">
                    {item.title}
                  </h2>
                  <div className="flex gap-2 mt-3 justify-center md:justify-normal">
                    {item?.child?.map((item, index) => {
                      return (
                        <a key={index} href={item.url}>
                          <Image
                            src={item.image}
                            alt={item.title}
                            width={100}
                            height={100}
                            className="w-auto h-10"
                          />
                        </a>
                      );
                    })}
                  </div>
                </div>
              );
            }
          })}
        </div>
        <div
          id="footer-link"
          className="flex md:w-auto flex-wrap mt-10 md:mt-0"
        >
          {dataFooterLink?.map((item, index) => {
            return (
              <div key={index} className="flex flex-col gap-2 w-1/2 mb-6">
                <h2 className="text-base font-semibold">{item.title}</h2>
                {item?.child?.map((item, index) => {
                  return (
                    <Link
                      key={index}
                      href={item.url}
                      className="text-sm font-medium text-muted-foreground"
                    >
                      {item.title}
                    </Link>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
      <div id="copyright" className="mt-16">
        <p className="text-sm text-muted-foreground text-start">
          Copyright &copy; 2023{" "}
          <a href="/" className="text-primary hover:underline">
            Topup Receh
          </a>
        </p>
      </div>
    </div>
  );
}
