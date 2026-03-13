"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { handleCopy } from "@/utils/globalFunctions";
import { ColumnDef } from "@tanstack/react-table";
import { Copy, Eye } from "lucide-react";

export type IssuerRow = {
  _id: string;
  applicationId?: string;
  legalEntityName?: string;
  issuerName?: string;
  email?: string;
  phone?: string;
  status?: string;
  rejectionReason?: string;
  spvCount?: number;
  assetCount?: number;
  investorCount?: number;
};

type IssuerTab = "pending" | "rejected" | "approved";

const IdCell = ({ value }: { value: string }) => (
  <div className="flex items-center gap-1 p-1">
    <button
      onClick={() => handleCopy(value, "Issuer ID")}
      className="cursor-pointer py-1 rounded hover:bg-gray-100"
      type="button"
    >
      <Copy size={15} />
    </button>
    <p className="font-mono text-xs">{value}</p>
  </div>
);

const RejectionBadge = ({ reason }: { reason?: string }) => (
  <Badge className=" text-red-700 font-medium">{reason || "—"}</Badge>
);

const ViewAction = (router: any, canView: boolean): ColumnDef<IssuerRow> => ({
  id: "actions",
  header: "Action",
  cell: ({ row }) => (
    <Button
      onClick={() => router.push(`/issuers/${row.original._id}`)}
      className="cursor-pointer"
      variant="ghost"
      size="sm"
      disabled={!canView}
    >
      <Eye />
    </Button>
  ),
  size: 100,
});

export const issuerTableCols = (
  router: any,
  canView: boolean,
  tab: IssuerTab,
): ColumnDef<IssuerRow>[] => {
  const baseCols: ColumnDef<IssuerRow>[] = [
    {
      accessorKey: "applicationId",
      header: "ID",
      size: 170,
      cell: ({ row }) => (
        <IdCell value={(row.original.applicationId || row.original._id) as string} />
      ),
    },
    {
      accessorKey: "legalEntityName",
      header: "Legal Entity Name",
      size: 240,
      cell: ({ row }) => <p className="font-medium">{row.original.legalEntityName || "—"}</p>,
    },
    {
      accessorKey: "issuerName",
      header: "Issuer Name",
      size: 220,
      cell: ({ row }) => <p className="text-sm">{row.original.issuerName || "—"}</p>,
    },
  ];

  if (tab === "approved") {
    return [
      ...baseCols,
      {
        accessorKey: "spvCount",
        header: "SPV Count",
        size: 120,
        cell: ({ row }) => <p className="text-sm">{row.original.spvCount ?? 0}</p>,
      },
      {
        accessorKey: "assetCount",
        header: "Asset Count",
        size: 120,
        cell: ({ row }) => <p className="text-sm">{row.original.assetCount ?? 0}</p>,
      },
      {
        accessorKey: "investorCount",
        header: "Total Investors",
        size: 140,
        cell: ({ row }) => <p className="text-sm">{row.original.investorCount ?? 0}</p>,
      },
      ViewAction(router, canView),
    ];
  }

  if (tab === "rejected") {
    return [
      ...baseCols,
      {
        accessorKey: "rejectionReason",
        header: "Rejection Reason",
        size: 240,
        cell: ({ row }) => <RejectionBadge reason={row.original.rejectionReason} />,
      },
      ViewAction(router, canView),
    ];
  }

  // pending / awaiting review
  return [...baseCols, ViewAction(router, canView)];
};
