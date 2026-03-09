"use client";
import { Button } from "@/components/ui/button";
import { formatCurrency, formatCurrencyWithLocale } from "@/lib/formatCurrency";
import { handleCopy, handleViewOnBlockchain } from "@/utils/globalFunctions";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { ArrowUpRight, Coins, Copy, Eye } from "lucide-react";

export type InvestorRow = {
  investorId: string;
  investorName: number;
  spvName: string;
  tokens: number;
  value: number;
  lastInvestDate: string;
};

export const investorCols = (router: any): ColumnDef<InvestorRow>[] => {
  return [
    {
      accessorKey: "investorId",
      header: "Investor ID",
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
      accessorKey: "investorName",
      header: "Investor Name",
      size: 220,
      cell: ({ getValue }) => (
        <p className="font-medium">{getValue<string>()}</p>
      ),
    },
    {
      accessorKey: "tokens",
      header: "Tokens Purchased",
      cell: ({ row }) => {
        const value = row.original?.tokens;
        return (
          <div className="font-medium flex gap-2 items-center">
            {value !== undefined && (
              <>
                <Coins size={15} className="text-primary" />
              </>
            )}
            {value !== undefined ? <span>{value}</span> : "-"}
          </div>
        );
      },
    },
    {
      accessorKey: "value",
      header: "Order Value",
      cell: ({ row }) => {
        const value = row.original?.value;
        return (
          <p className="font-medium">
            {value !== undefined ? formatCurrencyWithLocale(value, "USD") : "-"}
          </p>
        );
      },
    },

    {
      accessorKey: "lastInvestDate",
      header: "Last Invested Date",
      cell: ({ getValue }) => (
        <p className="font-mono text-xs">
          {getValue()
            ? format(new Date(getValue<string>()), "MM/dd/yyyy")
            : "-"}
        </p>
      ),
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        return (
          <Button
            onClick={() => router.push(`/investors/${row.original.investorId}`)}
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
