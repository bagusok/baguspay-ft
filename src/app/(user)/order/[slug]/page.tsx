import ClientOrderPage from "./client-order-page";
import { apiUrl } from "@/lib/constant";
import { notFound } from "next/navigation";
import { Data, ServiceResponse } from "./service-response.type";
import { Metadata } from "next";
import { generateSignature } from "@/lib/utils";

export default async function OrderPage({
  params,
}: {
  params: {
    slug: string;
  };
}) {
  const getData = await getDataService(params.slug);
  // console.log("paamss", getData);
  await generateMetadata({ params });
  return <ClientOrderPage data={getData!.data as Data} />;
}

const getDataService = async (slug: string) => {
  const response = await fetch(`${apiUrl}/ui/services/${slug}`, {
    cache: "no-cache",
    headers: {
      "x-signature": generateSignature(),
    },
  });
  if (response.ok) {
    const json = await response.json();
    // console.log(json);
    return json as ServiceResponse;
  } else {
    return notFound();
  }
};

export async function generateMetadata({ params }) {
  const slug = params.slug;
  const a = await fetch(`${apiUrl}/ui/services/${slug}`, {
    headers: {
      "x-signature": generateSignature(),
    },
  });
  const b = await a.json();
  console.log("data", b);

  const metadata: Metadata = {
    title: b.data?.name || "Order Free Fire",
    description: b.data?.desc,
    // openGraph: {
    //   type: "website",
    //   title: data.data?.metaName,
    //   description: data.data?.metaDesc,
    //   // url: `${apiUrl}/order/${data.data?.slug}`,
    //   siteName: process.env.NEXT_PUBLIC_APP_NAME,
    // },
  };

  return metadata;
}
