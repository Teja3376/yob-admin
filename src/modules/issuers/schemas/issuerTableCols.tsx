"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { handleCopy } from "@/utils/globalFunctions";
import { ColumnDef } from "@tanstack/react-table";
import { Copy, Eye } from "lucide-react";
import { useRouter } from "next/navigation";

export type IssuerRow = {
  _id: string;
  legalEntityName: string;
  applicationId: string;

  email?: string;
  phone?: string;

  assetCategory: string;
  shortAssetDescription: string;
  status: "active" | "inactive" | "pending";
};

export const issuerTableCols = (): ColumnDef<IssuerRow>[] => {
  const router = useRouter();
  return [
    {
      accessorKey: "applicationId",
      header: "Application ID",
      size: 170,
      cell: ({ getValue }) => (
        <div className="flex items-center gap-1 p-1">
          <button
            onClick={() =>
              handleCopy(
                getValue<string>(),

                "Application ID"
              )
            }
            className="cursor-pointer py-1 rounded hover:bg-gray-100"
          >
            <Copy size={15} />
          </button>
          <p className="font-mono text-xs">{getValue<string>()}</p>
        </div>
      ),
    },
    {
      accessorKey: "legalEntityName",
      header: "Legal Entity Name",
      size: 220,
      cell: ({ getValue }) => (
        <p className="font-medium">{getValue<string>()}</p>
      ),
    },
    {
      id: "contactDetails",
      header: "Contact Details",
      size: 240,
      cell: ({ row }) => {
        const { email, phone } = row.original || {};
        console.log(row.original);
        return (
          <div className="flex flex-col text-xs justify-center">
            {email && <p>{email}</p>}
            {phone && <p className="text-gray-500">{phone}</p>}
          </div>
        );
      },
    },
    {
      accessorKey: "assetCategory",
      header: "Asset Category",
      size: 160,
    },
    
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ getValue }) => {
        const status = getValue<string>();
        const statusStyles: Record<string, string> = {
          approved: "bg-green-100 text-green-700",
          rejected: "bg-red-100 text-red-700",
          pending: "bg-yellow-100 text-yellow-700",
        };
        return (
          <Badge
            className={`inline-flex rounded px-2 py-0.5 text-xs font-medium cursor-pointer capitalize ${
              statusStyles[status] ?? "bg-gray-100 text-gray-600"
            }`}
          >
            {" "}
            {status}{" "}
          </Badge>
        );
      },
      size: 120,
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        return (
          <Button
            onClick={() => router.push(`/issuers/${row.original._id}`)}
            className="cursor-pointer"
            variant="ghost"
            size="sm"
          >
            <Eye />
          </Button>
        );
      },
      size: 100,
    },
  ];
};
