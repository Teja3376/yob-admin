import type { ColumnDef } from "@tanstack/react-table";
import type { OrderListTableProps } from "../types/OrderListTableProps";
import { formatDate } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { CopyIcon, Eye } from "lucide-react";
import { useRouter } from "next/navigation";
import { formatCurrency } from "@/lib/formatCurrency";
import { StatusBadge, type OrderStatus } from "@/lib/statusBadge";
import { handleCopy } from "@/utils/globalFunctions";

export const orderListColumn = (
  router: ReturnType<typeof useRouter>,
  canView: boolean,
): ColumnDef<OrderListTableProps>[] => [
  {
    header: "Order ID",
    accessorKey: "_id",
    cell: ({ row }) => {
      const orderId = row.original._id;
      const shortId = orderId?.slice(-4)?.toUpperCase() || "";
      const orderIdFormatted = `ORD-${shortId}`;
      return (
        <div className="flex items-center gap-2">
          <span className="text-gray-900">{orderIdFormatted}</span>
          <CopyIcon
            className="cursor-pointer"
            size={16}
            onClick={() => handleCopy(orderId)}
          />
        </div>
      );
    },
  },
  {
    header: "Issuer Details",
    accessorKey: "issuerName",

    cell: ({ row }) => {
      const issuerName =
        row.original.issuer.firstName + " " + row.original.issuer.lastName;
      const assetName = row.original.asset.name;
      return (
        <div className="flex flex-col leading-tight gap-1">
          <p className="text-gray-900 font-medium">{issuerName || "N/A"}</p>
          <p className="text-gray-900 text-xs truncate">{assetName}</p>
        </div>
      );
    },
  },
  {
    header: "Investor ID",
    accessorKey: "investorId",
    cell: ({ row }) => {
      const investorId = row.original.investorId;
      const shortId = investorId?.slice(-4)?.toUpperCase() || "";
      const investorIdFormatted = `INV-${shortId}`;
      return (
        <div className="flex items-center gap-2">
          <span className="text-gray-900">{investorIdFormatted}</span>
        </div>
      );
    },
  },
  {
    header: "Investment",
    cell: ({ row }) => {
      const {
        investorAmount,
        investorPaidAmount,
        investorCurrency,
        fxRate,
        asset,
      } = row.original;

      const assetCurrency = asset?.currency;

      return (
        <div className="flex flex-col leading-tight gap-1">
          {/* Line 1 */}
          <div className="font-semibold text-gray-900">
            {formatCurrency(investorAmount, assetCurrency)}
          </div>

          {/* Line 2 */}
          <div className="text-xs text-gray-500">
            {formatCurrency(investorPaidAmount, investorCurrency)}
            {" • FX: "}
            {Number(fxRate).toFixed(4)}
            {" • "}
            {investorCurrency}
          </div>
        </div>
      );
    },
  },
  {
    header: "Date",
    accessorKey: "date",
    cell: ({ row }) => {
      const date = row.original.createdAt;
      return (
        <div className="flex items-center gap-2">
          <span className="text-gray-900">{formatDate(date)}</span>
        </div>
      );
    },
  },
  {
    header: "Order Status",
    accessorKey: "status",
    cell: ({ row }) => {
      const status = row.original.status;
      return (
        <div className="flex items-center gap-2">
          <span className="text-gray-900">
            <StatusBadge status={status as OrderStatus} />
          </span>
        </div>
      );
    },
  },
  {
    header: "Actions",
    accessorKey: "actions",
    cell: ({ row }) => {
      const orderId = row.original._id;
      return (
        <div className="flex items-center gap-2">
          <Button
            disabled={!canView}
            variant="ghost"
            size="icon"
            className="cursor-pointer"
            onClick={() => router.push(`/orders/${orderId}`)}
          >
            <Eye size={16} />
          </Button>
        </div>
      );
    },
  },
];
