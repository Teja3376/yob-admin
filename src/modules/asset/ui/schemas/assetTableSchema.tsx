"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { handleCopy } from "@/utils/globalFunctions";
import type { ColumnDef } from "@tanstack/react-table";
import { Copy, Eye } from "lucide-react";
import { useRouter } from "next/navigation";
import type { AssetApprovalListItem } from "@/modules/asset/hooks/useGetAllAsset";

const StatusBadge = ({ status }: { status: string }) => {
  const s = (status || "").toLowerCase();

  if (s === "approved" || s === "active") {
    return (
      <Badge className="bg-green-500 text-white hover:bg-green-600">Approved</Badge>
    );
  }

  if (s === "rejected") {
    return <Badge className="bg-red-500 text-white hover:bg-red-600">Rejected</Badge>;
  }

  return <Badge className="bg-yellow-500 text-white hover:bg-yellow-600">Pending</Badge>;
};

export const assetTableCols = (): ColumnDef<AssetApprovalListItem>[] => {
  const router = useRouter();
  return [
    {
      header: "Asset Id",
      accessorKey: "assetId",
      cell: ({ row }) => {
        const assetId = row.original.assetId;
        const shortId = assetId?.slice(-4)?.toUpperCase?.() || "----";
        const assetIdFormatted = `AST-${shortId}`;

        return (
          <div className="flex items-center gap-2">
            <span className="font-medium text-gray-900">{assetIdFormatted}</span>
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6"
              onClick={() => handleCopy(assetIdFormatted)}
            >
              <Copy size={14} />
            </Button>
          </div>
        );
      },
    },
    {
      header: "Asset Name",
      accessorKey: "assetName",
      cell: ({ row }) => (
        <span className="font-medium text-gray-900">{row.original.assetName}</span>
      ),
    },
    {
      header: "Issuer Name",
      accessorKey: "issuername",
      cell: ({ row }) => (
        <span className="text-sm text-gray-700">{row.original.issuername || "N/A"}</span>
      ),
    },
    {
      header: "Status",
      accessorKey: "status",
      cell: ({ row }) => <StatusBadge status={row.original.status} />,
    },
  
    
    {
      header: "Action",
      accessorKey: "action",
      cell: ({ row }) => (
        <Button variant="ghost" size="icon" onClick={() => router.push(`/asset-list/${row.original.assetId}`)}  >
          <Eye size={14} />
        </Button>
      ),
    },
  ];
};

