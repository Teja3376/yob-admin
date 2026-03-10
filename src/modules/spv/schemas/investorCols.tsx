import { Badge } from "@/components/ui/badge";
import { formatCurrencyWithLocale } from "@/lib/formatCurrency";
import { handleCopy } from "@/utils/globalFunctions";

import { Coins, Copy } from "lucide-react";
export const Investorcolumns = (router: any, currency: string) => {
  return [
    {
      header: "Investor Id",
      accessorKey: "investorId",
      cell: (info: any) => {
        const id = info.getValue();
        return (
          <div className="flex gap-2">
            <span className="truncate uppercase font-mono text-xs font-medium">{id}</span>
            <Copy
              onClick={() => handleCopy(id)}
              size={14}
              className="text-gray-500 cursor-pointer"
            />
          </div>
        );
      },
    },
    {
      header: "Investor",
      accessorKey: "investor",
      cell: ( info : any) => {
        const name = info?.row?.original?.name;
        const email = info?.row?.original?.email;
        return (
          <div className="flex flex-col">
            <span>{name}</span>
            <span className="text-gray-500 text-sm">{email}</span>
          </div>
        );
      },
    },
    {
      header: "Investment",
      accessorKey: "totalInvested",
      cell: (info: any) => {
        const value = formatCurrencyWithLocale(info.getValue() || 0, currency);
        return <span className="font-medium">{value}</span>;
      },
    },
    {
      header: "Tokens",
      accessorKey: "totalTokens",
      cell: (info: any) => {
        const value = info.getValue() || 0;
        return <div className="flex items-center"><Coins size={15} className="text-primary mr-2"/>{value}</div>;
      },
    },
    {
      header: "Ownership %",
      accessorKey: "ownershipPercent",
      cell: (info: any) => {
        const value = Number(info?.getValue() || 0).toFixed(2);
        console.log("ownership", value);
        return (
          <Badge className="bg-blue-50 text-blue-600 border border-blue-300 rounded-full px-2 w-20 text-center cursor-pointer">
            {value}%
          </Badge>
        );
      },
    },
  ];
};
