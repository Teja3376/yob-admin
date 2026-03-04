import type { ColumnDef } from "@tanstack/react-table";
import type { InvestorListProps } from "../types/InvestorListProps";
import { formatDate } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { CopyIcon, Eye } from "lucide-react";
import { useRouter } from "next/navigation";
import { handleCopy } from "@/utils/globalFunctions";

export const investorColumns = (router: ReturnType<typeof useRouter>): ColumnDef<InvestorListProps>[] => [
    {
        header: "Investor ID",
        accessorKey: "_id",
        cell: ({ row }) => {
            const investorId = row.original._id;
            const shortId = investorId?.slice(-4)?.toUpperCase() || "";
            const investorIdFormatted = `INV-${shortId}`;
            return (
                <div className="flex items-center gap-2">
                    <span className="text-gray-900">{investorIdFormatted}</span>
                    <CopyIcon className="cursor-pointer" size={16} onClick={() => handleCopy(investorId)} />
                </div>
            );
        },
    },
    {
        header: "Investor Details",
        accessorKey: "issuerName",

        cell: ({ row }) => {
            const name = row.original.name;
            const email = row.original.email;
            return (
                <div className="flex flex-col leading-tight gap-1">
                    <p className="text-gray-900 font-medium">{name || "N/A"}</p>
                    <p className="text-gray-900 text-xs truncate">{email}</p>
                </div>
            )
        }
    },
    {
        header: "Investes Asset Count",
        accessorKey: "investedAssetsCount",
        cell: ({ row }) => {
            const investedAssetsCount = row.original.investedAssetsCount;
            return (
                <div className="flex items-center gap-2">
                    <span className="text-gray-900">{investedAssetsCount}</span>
                </div>
            )
        }
    },
    {
        header: "Account Created At",
        accessorKey: "createdAt",
        cell: ({ row }) => {
            const createdAt = row.original.createdAt;
            return (
                <div className="flex items-center gap-2">
                    <span className="text-gray-900">{formatDate(createdAt)}</span>
                </div>
            )
        }
    },
    {
        header: "Actions",
        accessorKey: "actions",
        cell: ({ row }) => {
            const investorId = row.original._id;
            return (
                <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" onClick={() => router.push(`/investors/${investorId}`)}>
                        <Eye size={16} />
                    </Button>

                </div>
            )
        }
    }
];