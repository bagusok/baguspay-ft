"use client";
import AllService from "./all-service";
import BannerHome from "./banner-home";
import FeaturedService from "./featured-service";
import ProductGroup from "./product-group";

export default function Home() {
  return (
    <>
      <BannerHome />
      <div className="py-4"></div>
      <ProductGroup />
      <div className="py-4"></div>
      <FeaturedService />
      <div className="py-4"></div>
      <AllService />
    </>
  );
}
