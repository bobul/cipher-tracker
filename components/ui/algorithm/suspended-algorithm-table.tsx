import { getAlgorithmData } from "@/lib/actions";
import { DataTable } from "@/components/data-table";
import { columns } from "@/components/ui/algorithm/columns";

export default async function SuspendedAlgorithmTable() {
  const data = await getAlgorithmData();
  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  )
}