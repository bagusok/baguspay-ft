import AuthLayout from "@/app/(user)/auth/auth-layout";
import { UserPermission } from "@/types/UserPermission";
import DepositDetailTemplate from "./DepositDetailTemplate";

export default function DepositDetailPage({
  params,
}: {
  params: {
    id: string;
  };
}) {
  return (
    <AuthLayout roles={[UserPermission.ADMIN, UserPermission.USER]}>
      <DepositDetailTemplate id={params.id} />
    </AuthLayout>
  );
}
