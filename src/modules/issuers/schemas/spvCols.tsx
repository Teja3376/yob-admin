"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatCurrency, formatCurrencyWithLocale } from "@/lib/formatCurrency";
import { handleCopy, handleViewOnBlockchain } from "@/utils/globalFunctions";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpRight, Copy, Eye } from "lucide-react";
import { useRouter } from "next/navigation";

export type SPVRow = {
  spvId: string;
  uniqueInvestors: number;
  spvName: string;

  aum?: number;

  Currency: string;
  spvAddress: string;
};

export const spvCols = (router:any): ColumnDef<SPVRow>[] => {
  return [
    {
      accessorKey: "spvId",
      header: "SPV ID",
      size: 170,
      cell: ({ getValue }) => (
        <div className="flex items-center gap-1 p-1">
          <button
            onClick={() =>
              handleCopy(
                getValue<string>(),

                "Spv ID",
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
      accessorKey: "aum",
      header: "AUM",
      size: 160,
      cell: ({ row }) => {
        const aum = row.original?.aum;
        const currency = row.original?.Currency;
        return (
          <p className="font-medium">
            {formatCurrencyWithLocale(aum, currency)}
          </p>
        );
      },
    },
    {
      accessorKey: "spvAddress",
      header: "OnChain Address",
      size: 160,
      cell: ({ row }) => {
        const onChainAddress = row.original?.spvAddress;
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
            onClick={() => router.push(`/spv-list/${row.original.spvId}`)}
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
