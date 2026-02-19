import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const token = cookies().get("mandirlok_token")?.value;

  if (!token) {
    // Not logged in → redirect to login page
    redirect("/login");
  }

  return <>{children}</>;
}