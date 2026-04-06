"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatCurrency, formatCurrencyWithLocale } from "@/lib/formatCurrency";
import { handleCopy, handleViewOnBlockchain } from "@/utils/globalFunctions";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpRight, Copy, Eye } from "lucide-react";
import { unique } from "next/dist/build/utils";
import { useRouter } from "next/navigation";

export type AssetRow = {
  assetName: string;
  assetId: string;
  spvName: string;
  uniqueInvestors?: number;
  totalPropertyValueAfterFees?: number;

  currency: string;
  assetAddress: string;
};

export const assetCols = (router: any): ColumnDef<AssetRow>[] => {
  return [
    {
      accessorKey: "assetId",
      header: "Asset Name",
      size: 130,
      cell: ({ getValue }) => (
        <div className="flex items-center gap-1 p-1">
          <button
            onClick={() =>
              handleCopy(
                getValue<string>(),

                "Asset Name",
              )
            }
            className="cursor-pointer py-1 rounded hover:bg-gray-100 truncate"
          >
            <Copy size={15} />
          </button>
          <p className="font-mono text-xs">{getValue<string>()}</p>
        </div>
      ),
    },
    {
      accessorKey: "assetName",
      header: "Asset Name",
      size: 160,
      cell: ({ getValue }) => (
        <p className="font-medium truncate">{getValue<string>()}</p>
      ),
    },
    {
      accessorKey: "spvName",
      header: "SPV Name",
      size: 220,
      cell: ({ getValue }) => (
        <p className="font-medium">{getValue<string>()}</p>
      ),
    },
    {
      accessorKey: "uniqueInvestors",
      header: "Investors",
      size: 240,
      cell: ({ getValue }) => (
        <p className="font-medium">{getValue<string>()}</p>
      ),
    },
    {
      accessorKey: "totalPropertyValueAfterFees",
      header: "Value",
      size: 240,
      cell: ({ row }) => {
        const value = row.original?.totalPropertyValueAfterFees;
        const currency = row.original?.currency;
        return (
          <p className="font-medium">
            {formatCurrencyWithLocale(value, currency)}
          </p>
        );
      },
    },

    {
      accessorKey: "assetAddress",
      header: "OnChain Address",
      size: 160,
      cell: ({ row }) => {
        const onChainAddress = row.original?.assetAddress;
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
    },

    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        return (
          <Button
            onClick={() => router.push(`/asset-list/${row.original.assetId}`)}
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
