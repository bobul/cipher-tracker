"use client";

import { ColumnDef } from "@tanstack/table-core";
import { Plaintext } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";

export const columns: ColumnDef<Plaintext>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          ID
          <ArrowUpDown className="ml-2 h-4 w-4" />
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
]