"use client";

import { ColumnDef } from "@tanstack/table-core";
import { Ciphertext } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import { deleteCiphertextRecord } from "@/lib/actions";

export const columns: ColumnDef<Ciphertext>[] = [
  {
    accessorKey: "id",
    header: ({column}) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          ID
          <ArrowUpDown className="ml-2 h-4 w-4"/>
        </Button>
      )
    },
  },
  {
    accessorKey: "content",
    header: "Content",
  },
  {
    accessorFn: d => {
      return d.createdAt.toISOString();
    },
    header: "Created At",
  },
  {
    accessorKey: "algorithmId",
    header: "Algorithm ID",
  },
  {
    accessorKey: "plaintextId",
    header: "Plaintext ID",
  },
  {
    accessorKey: "action",
    header: "Action",
    cell: ({row}) => {
      return (
        <Button
          variant="destructive"
          onClick={async () => {
            await deleteCiphertextRecord(row.original.id);
          }}
        >
          Delete
        </Button>
      )
    }
  },
]