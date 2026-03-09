"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatCurrencyWithLocale } from "@/lib/formatCurrency";
import { handleCopy, handleViewOnBlockchain } from "@/utils/globalFunctions";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { Coins, Copy, Eye } from "lucide-react";

export type OrderRow = {
  assetName: string;
  orderId: string;
  spvName: string;

  investorName: string;
  tokens?: number;
  value?: number;
  date?: string;
  status?: string;
};

export const orderCols = (router: any): ColumnDef<OrderRow>[] => {
  return [
    {
      accessorKey: "orderId",
      header: "Order ID",
      cell: ({ getValue }) => (
        <div className="flex items-center gap-1 p-1">
          <button
            onClick={() =>
              handleCopy(
                getValue<string>(),

                "Order ID",
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
      accessorKey: "spvName",
      header: "SPV Name",
      cell: ({ getValue }) => (
        <p className="font-medium truncate">{getValue<string>()}</p>
      ),
    },
    {
      accessorKey: "assetName",
      header: "Asset Name",
      cell: ({ getValue }) => (
        <p className="font-medium">{getValue<string>()}</p>
      ),
    },
    {
      accessorKey: "investorName",
      header: "Investor",

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
            {
                value !== undefined ? <span>{value}</span> : "-"
            }
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
      accessorKey: "date",
      header: "Last Updated",
      cell: ({ getValue }) => (
        <p className="font-mono text-xs">
          {getValue()
            ? format(new Date(getValue<string>()), "MM/dd/yyyy")
            : "-"}
        </p>
      ),
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ getValue }) => (
        <Badge className="font-medium capitalize bg-green-50 text-green-500 border border-green-200 cursor-pointer">
          {getValue<string>()}
        </Badge>
      ),
    },

    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        return (
          <Button
            onClick={() => router.push(`/orders/${row.original.orderId}`)}
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
