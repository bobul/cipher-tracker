import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/utils";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import Loader from "@/components/ui/loader";
import SuspendedUserTable from "@/components/ui/user/suspended-user-table";

export default async function Page(){
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    redirect("/api/auth/signin");
  }

  return (
    <Suspense fallback={<Loader />}>
      <SuspendedUserTable />
    </Suspense>
  )
}