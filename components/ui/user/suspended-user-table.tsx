import { getUsersData } from "@/lib/actions";
import { DataTable } from "@/components/data-table";
import { columns } from "@/components/ui/user/columns";

export default async function SuspendedUserTable() {
  const data = await getUsersData();
  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  )
}