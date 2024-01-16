"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";

export default function BannerHome() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["getMainBanner"],
    queryFn: () =>
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/banner`).then((res) =>
        res.json()
      ),
  });

  if (isLoading || isError) return <BannerIsLoading />;
  if (isError) return <div>Something went wrong</div>;

  return (
    <section
      id="banner"
      className="w-full grid grid-flow-col md:grid-cols-3 gap-2 h-44 lg:h-80"
    >
      <div
        id="main-banner"
        className="rounded-md bg-slate-100 md:col-span-2 lg:col-span-2 overflow-hidden"
      >
        <Swiper
          className="h-full"
          spaceBetween={50}
          slidesPerView={1}
          onSlideChange={() => console.log("slide change")}
          onSwiper={(swiper) => console.log(swiper)}
          autoplay={true}
          modules={[Pagination]}
          pagination={{ clickable: true }}
          loop={true}
          breakpoints={
            {
              // when window width is >= 640px
              640: {
                slidesPerView: 1,
                spaceBetween: 20,
              },
              // when window width is >= 768px
              768: {
                slidesPerView: 1,
                spaceBetween: 40,
              },
              // when window width is >= 1024px
              1024: {
                slidesPerView: 1,
                spaceBetween: 50,
              },
            } as any
          }
        >
          {data?.data?.map((item: any, index: number) => (
            <SwiperSlide key={index} className="h-full">
              <Image
                src={item.img}
                alt="image"
                width={1000}
                height={600}
                className="object-center object-cover h-full rounded-md"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div
        id="sub-banner"
        className="hidden md:grid grid-flow-row grid-rows-2 gap-2"
      >
        <div className="w-full h-full bg-slate-100 rounded-md">
          {data?.data?.length >= 2 && (
            <Image
              src={data?.data?.[data.data.length - 1]?.img}
              alt="image"
              width={1000}
              height={600}
              className="object-cover object-center min-w-full h-full rounded-md"
            />
          )}
        </div>
        <div className="w-full h-full bg-slate-100 rounded-md">
          {data?.data?.length >= 2 && (
            <Image
              src={data?.data?.[data.data.length - 2]?.img}
              alt="image"
              width={1000}
              height={600}
              className="object-cover object-center min-w-full h-full rounded-md"
            />
          )}
        </div>
      </div>
    </section>
  );
}

const BannerIsLoading = () => (
  <section
    id="banner"
    className="w-full grid grid-flow-col md:grid-cols-3 gap-2 h-44 lg:h-80"
  >
    <div
      id="main-banner"
      className="rounded-md bg-slate-200 md:col-span-2 lg:col-span-2 overflow-hidden animate-pulse"
    ></div>
    <div
      id="sub-banner"
      className="hidden md:grid grid-flow-row grid-rows-2 gap-2"
    >
      <div className="w-full h-full bg-slate-200 rounded-md animate-pulse"></div>
      <div className="w-full h-full bg-slate-200 rounded-md animate-pulse"></div>
    </div>
  </section>
);
