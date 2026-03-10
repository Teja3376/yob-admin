import { formatCurrencyWithLocale } from "@/lib/formatCurrency";
import { StatusBadge } from "@/lib/statusBadge";
import { Coins, Eye } from "lucide-react";

export const columns = (router: any) => {
  return [
    {
      header: "Order Id",
      accessorKey: "_id",
      maxWidth: 100,
      cell: ({ getValue }: { getValue: () => string }) => {
        const id = getValue();
        return <span className="font-mono text-xs">{id}</span>;
      },
    },
    {
      header: "Investor",
      accessorKey: "investor",
      cell: (info: any) => {
        const investorEmail = info?.row?.original?.investorEmail;
        const investorName = info?.row?.original?.investorName;
        return (
          <div className="flex flex-col ">
            <span className="truncate">{investorName}</span>
            <span className="text-gray-500 text-sm truncate">
              {investorEmail}
            </span>
          </div>
        );
      },
    },
    {
      header: "Tokens",
      accessorKey: "numberOfTokens",
      cell: ({ row }: { row: any }) => {
        const tokens = row?.original?.numberOfTokens || 0;
        return (
          <div className="flex items-center">
            <Coins size={15} className="text-primary mr-2" />
            {tokens}
          </div>
        );
      },
    },
    {
      header: "Order Value",
      accessorKey: "usdAmount",
      cell: ({ row }: { row: any }) => {
        const tokenValue = row?.original.usdAmount || 0;
        const currency = "USD"

        return (
          <span className="font-semibold">
            {formatCurrencyWithLocale(tokenValue, currency)}
          </span>
        );
      },
    },

    {
      header: "Order Status",
      accessorKey: "status",
      cell: ({ getValue }: { getValue: () => string }) => {
        const status = getValue();

        return <StatusBadge status={status} />;
      },
    },
    {
      header: "Created At",
      accessorKey: "createdAt",
      cell: ({ getValue }: { getValue: () => string }) => {
        const date = new Date(getValue());
        return date.toLocaleDateString("en-US", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        });
      },
    },
    {
      header: "View",
      accessorKey: "action",
      cell: ({ row }: { row: { original: { _id: string } } }) => (
        <Eye
          onClick={() => {
            router.push(`/orders/${row.original._id}`);
          }}
          className="cursor-pointer"
          size={15}
        />
      ),
    },
  ];
};
