import type { ColumnDef } from "@tanstack/react-table";
import { CopyIcon } from "lucide-react";
import { handleCopy } from "@/utils/globalFunctions";
import { AssetProps } from "../types/Assetprops";
import { formatCurrency } from "@/lib/formatCurrency";

export const detailColumns = (): ColumnDef<AssetProps>[] => [
    {
        header: "Asset ID",
        accessorKey: "assetId",
        cell: ({ row }) => {
            const assetId = row.original.assetId;
            const shortId = assetId?.slice(-4)?.toUpperCase() || "";
            const assetIdFormatted = `AST-${shortId}`;
            return (
                <div className="flex items-center gap-2 py-2">
                    <span className="text-gray-900">{assetIdFormatted}</span>
                    <CopyIcon className="cursor-pointer" size={16} onClick={() => handleCopy(assetId)} />
                </div>
            );
        },
    },
    {
        header: "Asset Details",
        accessorKey: "name",

        cell: ({ row }) => {
            const name = row.original.name;
            return (
                <div className="flex flex-col leading-tight gap-1 py-2">
                    <p className="text-gray-900">{name || "N/A"}</p>
                </div>
            )
        }
    },
    {
        header: "Tokens Purchased",
        accessorKey: "totalTokens",
        cell: ({ row }) => {
            const totalTokens = row.original.totalTokens;
            return (
                <div className="flex items-center gap-2 py-2">
                    <span className="text-gray-900">{totalTokens}</span>
                </div>
            )
        }
    },
    {
        header: "Total Invested Amount",
        accessorKey: "totalInvestedAmount",
        cell: ({ row }) => {
            const totalInvestedAmount = row.original.totalInvestorPaidAmount;
            const currency = row.original.investorPaidCurrency;
            return (
                <div className="flex items-center gap-2 py-2">
                    <span className="text-gray-900">{formatCurrency(totalInvestedAmount, currency)}</span>
                </div>
            )
        }
    },
    {
        header: "Total Invested Amount in USD",
        accessorKey: "totalInvestedAmountUSD",
        cell: ({ row }) => {
            const totalInvestedAmountUSD = row.original.totalInvestedAmountUSD;
            return (
                <div className="flex items-center gap-2 py-2">
                    <span className="text-gray-900">{formatCurrency(totalInvestedAmountUSD)}</span>
                </div>
            )
        }
    }
];