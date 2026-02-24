"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { handleCopy, handleViewOnBlockchain } from "@/utils/globalFunctions";
import type { ColumnDef } from "@tanstack/react-table";
import { ArrowUpRight, Copy, Eye } from "lucide-react";
import { useRouter } from "next/navigation";
import type { AssetApprovalListItem } from "@/modules/asset/hooks/useGetAllAsset";

const StatusBadge = ({ status }: { status: string }) => {
  const s = (status || "").toLowerCase();

  if (s === "approved" || s === "active") {
    return (
      <Badge className="bg-green-500 text-white hover:bg-green-600">
        Approved
      </Badge>
    );
  }

  if (s === "rejected") {
    return (
      <Badge className="bg-red-500 text-white hover:bg-red-600">Rejected</Badge>
    );
  }

  return (
    <Badge className="bg-yellow-500 text-white hover:bg-yellow-600">
      Pending
    </Badge>
  );
};

export const assetTableCols = (
  router: ReturnType<typeof useRouter>,
  status: string,
): ColumnDef<AssetApprovalListItem>[] => {
  // Step 1: base columns
  const columns: ColumnDef<AssetApprovalListItem>[] = [
    {
      header: "Asset Id",
      accessorKey: "assetId",
      cell: ({ row }) => {
        const assetId = row.original.assetId?._id;
        const shortId = assetId?.slice(-4)?.toUpperCase() || "----";
        const assetIdFormatted = `AST-${shortId}`;

        return (
          <div className="flex items-center gap-2">
            <span className="font-medium text-gray-900">
              {assetIdFormatted}
            </span>

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
        <span className="font-medium text-gray-900">
          {row.original.assetName}
        </span>
      ),
    },
    {
      header: "Issuer Name",
      accessorKey: "issuername",
      cell: ({ row }) => (
        <span className="text-sm text-gray-700">
          {row.original.issuername || "N/A"}
        </span>
      ),
    },
  ];

  // Step 2: Add Onchain column ONLY for Approved (Active)
  if (status === "approved") {
    columns.push({
      header: "Onchain Address",
      accessorKey: "blockchain",
      cell: ({ row }) => {
        const onChainAddress = row.original.assetId?.blockchain?.assetAddress;

        const formattedAddress = onChainAddress
          ? `${onChainAddress.slice(0, 6)}...${onChainAddress.slice(-4)}`
          : "-";

        return (
          <div
            onClick={() => handleViewOnBlockchain(onChainAddress || "-", "asset")}
            className="group flex items-center gap-2"
          >
            <span className="group-hover:underline cursor-pointer font-medium text-gray-900">
              {formattedAddress}
            </span>

            {onChainAddress && (
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6 cursor-pointer"
              >
                <ArrowUpRight size={14} />
              </Button>
            )}
          </div>
        );
      },
    });
  }

  // Step 3: remaining columns
  columns.push(
    {
      header: "Status",
      accessorKey: "status",
      cell: ({ row }) => <StatusBadge status={row.original.status} />,
    },
    {
      header: "Action",
      accessorKey: "action",
      cell: ({ row }) => (
        <Button
          variant="ghost"
          size="icon"
          onClick={() => router.push(`/asset-list/${row.original.assetId?._id}`)}
        >
          <Eye size={14} />
        </Button>
      ),
    },
  );

  return columns;
};
