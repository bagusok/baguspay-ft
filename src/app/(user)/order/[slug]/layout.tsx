import { Metadata } from "next";

export default function OrderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

// export const metadata: Metadata = {
//   title: "Order Free Fire",
//   description: "Order",
// };
