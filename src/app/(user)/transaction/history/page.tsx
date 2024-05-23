import { UserPermission } from "@/types/UserPermission";
import AuthLayout from "../../auth/auth-layout";

export default function TransactionHistory() {
  return (
    <AuthLayout roles={[UserPermission.ADMIN, UserPermission.USER]}>
      <h1>Ini history transaction dengan proteksi auth for user</h1>;
    </AuthLayout>
  );
}
