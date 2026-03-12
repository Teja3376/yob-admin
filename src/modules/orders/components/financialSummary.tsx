import { formatCurrency } from "@/lib/formatCurrency";
import React from "react";
import { OrderDetail } from "../types/OrderDetail";
import { formatDate } from "@/lib/utils";
import { OrderStatus } from "../ui/VerticalStepper";

interface FieldItemProps {
  label: string;
  value: React.ReactNode;
}

const FieldItem = ({ label, value }: FieldItemProps) => {
  return (
    <div className="space-y-1">
      <p className="text-sm text-gray-500">{label}</p>
      <p className="font-medium">{value}</p>
    </div>
  );
};

const FinancialSummary = ({ orderDetail }: { orderDetail: OrderDetail }) => {
  const isOrderCompleted = [
    OrderStatus.COMPLETED,
    OrderStatus.TOKEN_TRANSFERRED,
    OrderStatus.SIGNATURE_PENDING,
  ].includes(orderDetail?.status as OrderStatus);
  return (
    <div className="border rounded-md w-full">
      <div className="px-4 py-2 bg-primary/10 rounded-t-md ">
        <h2 className="text-md font-medium">Financial Details:</h2>
      </div>

      <div className="p-4 space-y-4 ">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-4">
            <div className="space-y-1">
              <p className="font-medium">
                Asset Currency ({orderDetail?.asset?.currency})
              </p>
              <hr />
            </div>

            <FieldItem
              label="Tokens Purchased"
              value={orderDetail?.numberOfTokens}
            />
            <FieldItem
              label="Token Price"
              value={formatCurrency(
                orderDetail?.assetValue?.tokenPrice,
                orderDetail?.asset?.currency,
              )}
            />
            <FieldItem
              label="Invested Amount"
              value={formatCurrency(
                orderDetail?.investorAmount,
                orderDetail?.asset?.currency,
              )}
            />
          </div>

          <div className="space-y-4">
            <div className="space-y-1">
              <p className="font-medium">
                Investor Currency ({orderDetail?.investorCurrency})
              </p>
              <hr />
            </div>

            <FieldItem
              label="FX Rate"
              value={orderDetail?.reversefxRate?.toFixed(6)}
            />
            <FieldItem
              label="Investor Paid Amount"
              value={formatCurrency(
                orderDetail?.investorPaidAmount,
                orderDetail?.investorCurrency,
              )}
            />
          </div>
        </div>

        <div className="flex items-center border rounded-md">
          <div className="flex-1  p-4 rounded-md rounded-r-none space-y-1 bg-gray-100">
            <p className="text-sm text-gray-500">USD Normalized Amount</p>
            <p className="text-xl font-semibold text-primary">
              {formatCurrency(orderDetail?.usdAmount)}
            </p>
            <p className="text-xs text-gray-500">
              FX Rate Snapshot: {formatDate(orderDetail?.createdAt)}
            </p>
          </div>
          {isOrderCompleted && (
            <div className="flex-1 p-4 rounded-md rounded-l-none space-y-1 flex-col text-right">
              <p className="text-sm text-gray-500">Ownership</p>
              <p className="text-xl font-semibold text-primary">
                {orderDetail?.ownership?.percentage?.toFixed(2)}%
              </p>
              <p className="text-xs text-gray-500">
                Tokens Owned : {orderDetail?.ownership?.tokensOwned} /{" "}
                {orderDetail?.ownership?.totalTokens}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FinancialSummary;
