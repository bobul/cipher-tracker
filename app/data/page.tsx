import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/utils";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    redirect("/api/auth/signin");
  }
  return (
    'you can view'
  );
}