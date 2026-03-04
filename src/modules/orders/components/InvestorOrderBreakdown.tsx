
import { formatCurrency } from "@/lib/formatCurrency";
import { useMemo } from "react";

const InvestorOrderBreakdown = ({
  tokenValue,
  investorCurrency,
  totalOrderValue,
  fees
}: {
  tokenValue: number;
  totalOrderValue:number
  fees: {
    type: string;
    value: number;
    status: string;
    isPercentage: boolean;
  }[];
  investorCurrency: string;
}) => {
  const mergedFees = useMemo(() => {
    const result: Record<string, { percentage: number; amount: number }> = {};

    fees?.forEach((fee) => {
      if (!fee.status) return;

      if (!result[fee.type]) {
        result[fee.type] = {
          percentage: 0,
          amount: 0,
        };
      }

      const amount = fee.isPercentage
        ? (tokenValue * fee.value) / 100
        : fee.value;

      result[fee.type].percentage += fee.value;
      result[fee.type].amount += amount;
    });

    // round values
    Object.keys(result).forEach((key) => {
      result[key].percentage = Number(result[key].percentage.toFixed(2));
      result[key].amount = Number(result[key].amount.toFixed(2));
    });

    return result;
  }, [fees, tokenValue]);


  console.log({ mergedFees, totalOrderValue });
  return (
    <div className="border rounded-md">
      <div className="px-4 py-2 bg-primary/10 rounded-t-md ">
        <h1 className="text-md font-medium">
          Order Breakdown{" "}
          <span className="text-xs text-muted-foreground">
            (Investor Currency-{investorCurrency})
          </span>
        </h1>
        
      </div>
      <hr />
      <div className="text-sm  flex justify-between px-4 py-3">
        <p className="">Token Value</p>
        <p className="font-semibold">
          {formatCurrency(tokenValue, investorCurrency)}
        </p>
      </div>
      <hr />

      {mergedFees?.registration && (
        <div className="text-sm  flex justify-between px-4 py-3">
          <p className="">
            Registration Fee ({mergedFees?.registration?.percentage || 0}%)
          </p>
          <p className="font-semibold">
            {formatCurrency(
              mergedFees?.registration?.amount || 0,
              investorCurrency,
            )}
          </p>
        </div>
      )}
      <hr />

      {mergedFees?.legal && (
        <div className="text-sm  flex justify-between px-4 py-3">
          <p className="">Legal Fee ({mergedFees?.legal?.percentage || 0}%)</p>
          <p className="font-semibold">
            {formatCurrency(
              mergedFees?.legal?.amount || 0,
              investorCurrency,
            )}
          </p>
        </div>
      )}
      <hr />

      {mergedFees?.reserve && (
        <div className="text-sm  flex justify-between px-4 py-3">
          <p className="">Reserve ({mergedFees?.reserve?.percentage || 0}%)</p>
          <p className="font-semibold">
            {formatCurrency(
              mergedFees?.reserve?.amount || 0,
              investorCurrency,
            )}
          </p>
        </div>
      )}
      <hr />

      {mergedFees?.insurance && (
        <div className="text-sm  flex justify-between px-4 py-3">
          <p className="">
            Insurance ({mergedFees?.insurance?.percentage || 0}%)
          </p>
          <p className="font-semibold">
            {formatCurrency(
              mergedFees?.insurance?.amount || 0,
              investorCurrency,
            )}
          </p>
        </div>
      )}
      <hr />
      <div className="text-md flex justify-between p-4">
        <p className="">Total Order Value</p>
        <p className="font-semibold">
          {formatCurrency(totalOrderValue, investorCurrency)}
        </p>
      </div>
    </div>
  );
};

export default InvestorOrderBreakdown;

