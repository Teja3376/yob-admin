"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { handleCopy, handleViewOnBlockchain } from "@/utils/globalFunctions";
import type { ColumnDef } from "@tanstack/react-table";
import { ArrowUpRight, Copy, Eye } from "lucide-react";
import { useRouter } from "next/navigation";
import { AssetApprovalListItem } from "../hooks/useGetAllAsset";
import { VehicleApprovalListItem } from "../hooks/vehicles/useGetVehicleApprovalList";

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

const currentStatusConfig: Record<string, { label: string; color: string }> = {
  active: {
    label: "Active",
    color:
      "bg-blue-100 text-blue-800 hover:bg-blue-200 uppercase border border-blue-300",
  },
  "fully-funded": {
    label: "Fully Funded",
    color:
      "bg-purple-100 text-purple-800 hover:bg-purple-200 uppercase border border-purple-300",
  },
  "listing-ended": {
    label: "Listing Ended",
    color:
      "bg-gray-100 text-gray-800 hover:bg-gray-200 uppercase border border-gray-300",
  },
  waitlist: {
    label: "Waitlist",
    color:
      "bg-yellow-100 text-yellow-800 hover:bg-yellow-200 uppercase border border-yellow-300",
  },
};

const CurrentStatusBadge = ({ status }: { status: string }) => {
  const s = status || "";

  const config = currentStatusConfig[s] || {
    label: "N/A",
    color: "bg-gray-400 text-white",
  };

  return <Badge className={config.color}>{config.label}</Badge>;
};

export const assetTableCols = (
  router: ReturnType<typeof useRouter>,
  status: string,
  canView: boolean,
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
            onClick={() =>
              handleViewOnBlockchain(onChainAddress || "-", "asset")
            }
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

  columns.push({
    header: "Status",
    accessorKey: "status",
    cell: ({ row }) => <StatusBadge status={row.original.status} />,
  });

  if (status === "rejected") {
    columns.push({
      header: "Rejection Reason",
      accessorKey: "rejectionReason",
      cell: ({ row }) => (
        <span className="text-xs text-red-700 truncate">
          {row.original.rejectionReason || "N/A"}
        </span>
      ),
    });
  }

  if (status === "approved") {
    columns.push({
      header: "Current Status",
      accessorKey: "currentStatus",
      cell: ({ row }) => {
        return <CurrentStatusBadge status={row.original.assetId?.status} />;
      },
    });
  }

  // Step 3: remaining columns
  columns.push({
    header: "Action",
    accessorKey: "action",
    cell: ({ row }) => (
      <Button
        variant="ghost"
        size="icon"
        onClick={() => router.push(`/asset-list/${row.original.assetId?._id}`)}
        disabled={!canView}
      >
        <Eye size={14} />
      </Button>
    ),
  });

  return columns;
};
export const vehicleTableCols = (
  router: ReturnType<typeof useRouter>,
  status: string,
  canView: boolean,
): ColumnDef<VehicleApprovalListItem>[] => {
  // Step 1: base columns
  const columns: ColumnDef<VehicleApprovalListItem>[] = [
    {
      header: "Asset Id",
      accessorKey: "assetId",
      cell: ({ row }) => {
        const assetId = row.original.assetId?._id;
        const shortId = assetId?.slice(-4)?.toUpperCase() || "----";
        const assetIdFormatted = `VEH-${shortId}`;

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
      header: "Vehicle Name",
      accessorKey: "vehicleBrand",
      cell: ({ row }) => (
        <div className="font-medium text-gray-900">
          <p>{row.original.vehicleBrand || "N/A"}</p>
          <p className="text-sm text-gray-500">
            {row.original.vehicleModel || "N/A"}
          </p>
        </div>
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
            onClick={() =>
              handleViewOnBlockchain(onChainAddress || "-", "asset")
            }
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

  columns.push({
    header: "Status",
    accessorKey: "status",
    cell: ({ row }) => <StatusBadge status={row.original.status} />,
  });

  if (status === "rejected") {
    columns.push({
      header: "Rejection Reason",
      accessorKey: "rejectionReason",
      cell: ({ row }) => (
        <span className="text-xs text-red-700 truncate">
          {row.original.rejectionReason || "N/A"}
        </span>
      ),
    });
  }

  if (status === "approved") {
    columns.push({
      header: "Current Status",
      accessorKey: "currentStatus",
      cell: ({ row }) => {
        return <CurrentStatusBadge status={row.original.assetId?.status} />;
      },
    });
  }

  // Step 3: remaining columns
  columns.push({
    header: "Action",
    accessorKey: "action",
    cell: ({ row }) => (
      <Button
        variant="ghost"
        size="icon"
        onClick={() => router.push(`/vehicle/${row.original.assetId?._id}`)}
        disabled={!canView}
      >
        <Eye size={14} />
      </Button>
    ),
  });

  return columns;
};
