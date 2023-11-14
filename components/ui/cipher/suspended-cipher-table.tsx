import { getCiphertextData } from "@/lib/actions";
import { DataTable } from "@/components/data-table";
import { columns } from "@/components/ui/cipher/columns";

export default async function SuspendedCipherTable() {
  const data = await getCiphertextData();
  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  )
}