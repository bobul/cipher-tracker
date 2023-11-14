import { getPlaintextData } from "@/lib/actions";
import { DataTable } from "@/components/data-table";
import { columns } from "@/components/ui/plain/columns";

export default async function SuspendedPlainTable() {
  const data = await getPlaintextData();
  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  )
}