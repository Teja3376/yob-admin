"use client";
import { Button } from "@/components/ui/button";
import { handleCopy, handleViewOnBlockchain } from "@/utils/globalFunctions";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpRight, Copy, Eye } from "lucide-react";
import { useRouter } from "next/navigation";

type SpvRow = {
  _id: string;
  issuerId: string;
  spvId: {
    _id: string;
    blockchain?: {
      spvAddress?: string;
    };
  };
  issuername: string;
  spvname: string;
  type?: string;
  status: string;
  createdAt: string;
  updatedAt?: string;
};

export const spvTableCols = (
  router: ReturnType<typeof useRouter>,
  status: string,
): ColumnDef<SpvRow>[] => {
  // Step 1: create base columns
  const columns: ColumnDef<SpvRow>[] = [
    {
      header: "Spv Id",
      accessorKey: "spvId",
      cell: ({ row }) => {
        const shortId = row.original.spvId?._id.slice(-4).toUpperCase();
        const spvIdFormatted = `SPV-${shortId}`;
        return (
          <div className="flex items-center gap-2">
            <span className="font-medium text-gray-900">{spvIdFormatted}</span>
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6"
              onClick={() => handleCopy(spvIdFormatted)}
            >
              <Copy size={14} />
            </Button>
          </div>
        );
      },
    },
    {
      header: "SPV Name",
      accessorKey: "spvname",
      cell: ({ row }) => (
        <span className="font-medium text-gray-900">
          {row.original.spvname}
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

  if (status === "Active") {
    columns.push({
      header: "Onchain Address",
      accessorKey: "blockchain",
      cell: ({ row }) => {
        const onChainAddress = row.original.spvId?.blockchain?.spvAddress;
        const formattedAddress = onChainAddress
          ? `${onChainAddress.slice(0, 6)}...${onChainAddress.slice(-4)}`
          : "-";

        return (
          <div className=" group flex items-center gap-2">
            <span className="group-hover:underline font-medium text-gray-900 cursor-pointer">
              {formattedAddress}
            </span>
            {onChainAddress && (
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6 cursor-pointer"
                onClick={() =>
                  handleViewOnBlockchain(onChainAddress || "-", "spv")
                }
              >
                <ArrowUpRight size={14} />
              </Button>
            )}
          </div>
        );
      },
    });
  }

  columns.push(
    {
      header: "Last Activity",
      accessorKey: "updatedAt",
      cell: ({ row }) => {
        const date = row.original.updatedAt || row.original.createdAt;
        const d = new Date(date);
        const formatted = d.toLocaleDateString("en-US", {
          month: "numeric",
          day: "numeric",
          year: "numeric",
        });
        return <span className="text-sm text-gray-700">{formatted}</span>;
      },
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
              router.push(`/spv-list/${row.original.spvId?._id}`);
            }}
          >
            <Eye size={16} />
          </Button>
        </div>
      ),
    },
  );

  return columns;
};
