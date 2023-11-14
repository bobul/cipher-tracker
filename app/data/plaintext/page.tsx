import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/utils";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import Loader from "@/components/ui/loader";
import SuspendedPlainTable from "@/components/ui/plain/suspended-plain-table";

export default async function Page(){
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    redirect("/api/auth/signin");
  }

  return (
    <Suspense fallback={<Loader />}>
      <SuspendedPlainTable />
    </Suspense>
  )
}