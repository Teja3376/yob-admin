"use client";
import { Button } from "@/components/ui/button";
import { handleCopy } from "@/utils/globalFunctions";
import { ColumnDef } from "@tanstack/react-table";
import { Copy, Eye, Pencil } from "lucide-react";
import { useRouter } from "next/navigation";

type SpvRow = {
 
  id: string;
  name: string;
  status: string;
  type: string;
  jurisdiction: string;
  formationDate: string;
};

export const spvTableCols = (): ColumnDef<SpvRow>[] => {
  const router = useRouter();
  return [
    {
      header: "Spv Id",
      accessorKey: "id",
      cell: ({ row }) => {
        console.log(row.original,"row.original");
        // const shortId = row.original.id.slice(-4).toUpperCase();
        return (
          <div className="flex items-center gap-2">
            <span className="font-medium text-gray-900">{row.original.id}</span>
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6"
              onClick={() => handleCopy(row.original.name)}
            >
              <Copy size={14} />
            </Button>
          </div>
        );
      },
    },
    {
      header: "SPV Name",
      accessorKey: "name",
      cell: ({ row }) => (
        <span className="font-medium text-gray-900">{row.original.name}</span>
      ),
    },
    {
      header: "Status",
      accessorKey: "status",
      cell: ({ row }) => (
        <span className="text-sm text-gray-700">{row.original.type || "N/A"}</span>
      ),
    },
    // {
    //   header: "Last Activity",
    //   accessorKey: "updatedAt",
    //   cell: ({ row }) => {
    //     const date = row.original.formationDate;
    //     const d = new Date(date);
    //     const formatted = d.toLocaleDateString("en-US", {
    //       month: "numeric",
    //       day: "numeric",
    //       year: "numeric",
    //     });
    //     return <span className="text-sm text-gray-700">{formatted}</span>;
    //   },
    // },
    {
      header: "Jurisdiction",
      accessorKey: "jurisdiction",
      cell: ({ row }) => (
        <span className="text-sm text-gray-700">{row.original.jurisdiction || "N/A"}</span>
      ),
    },
    {
      header: "Actions",
      accessorKey: "actions",
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => {
              // Handle edit action
              console.log("Edit", row.original.id);
            }}
          >
            <Pencil size={16} />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => {
              router.push(`/spv-list/${row.original.id}`);
            }}
          >
            <Eye size={16} />
          </Button>
        </div>
      ),
    },
  ];
};
