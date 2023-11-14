import { Suspense } from "react";
import Loader from "@/components/ui/loader";
import SuspendedCipherTable from "@/components/ui/cipher/suspended-cipher-table";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/utils";

  export default async function Page() {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      redirect("/api/auth/signin");
    }

    return (
      <Suspense fallback={<Loader />}>
        <SuspendedCipherTable />
      </Suspense>
    );
  }