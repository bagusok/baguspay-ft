import { FaPlus } from "react-icons/fa";
import Link from "next/link";
import BalanceMutatiopn from "./BalanceMutation";
import AuthLayout from "../../auth/auth-layout";
import { UserPermission } from "@/types/UserPermission";
import GetBalance from "./GetBalance";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { SlashIcon } from "@radix-ui/react-icons";

export default function UserBalance() {
  return (
    <>
      <AuthLayout roles={[UserPermission.ADMIN, UserPermission.USER]}>
        <section className="grid grid-flow-row md:grid-flow-col md:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-8 relative bg-gray-100 md:bg-background pt-2">
          <div
            id="balance-info"
            className="rounded-lg bg-white md:bg-primary-foreground dark:bg-primary-foreground dark:border-none md:border md:border-gray-200 w-full p-4 h-fit sticky top-16 z-10 md:z-0"
          >
            <div className="inline-flex justify-between items-center w-full">
              <div className="flex-col gap-2">
                <GetBalance />
              </div>
              <div className="inline-flex gap-3">
                <div className="flex flex-col items-center cursor-pointer">
                  <Link
                    href="/user/balance/deposit"
                    className="bg-primary hover:opacity-65 p-1 rounded-sm"
                  >
                    <FaPlus className="fill-white" />
                  </Link>
                  <span className="text-xs mt-1">Topup</span>
                </div>
              </div>
            </div>
          </div>
          <div className="">
            <BalanceMutatiopn />
          </div>
        </section>
      </AuthLayout>
    </>
  );
}
