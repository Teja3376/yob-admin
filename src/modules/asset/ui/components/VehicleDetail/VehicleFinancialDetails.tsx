"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrencyWithLocale } from "@/lib/formatCurrency";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

interface VehicleFinancialDetailsProps {
  vehicle: {
    currency?: string;
    investmentStats?: {
      startingValue: number;
      targetFinalValue: number;
      appreciationExpectedYearly: number;
      minReturnToInvestors: number;
      investmentPeriod: number;
    };

    rentalInformation?: {
      estRentalPricePerDay: number;
      estRentalPeriodInDays: number;
      estTotalRentalIncome: number;
      totalOperatingCosts: number;
      netRentalIncome: number;
      totalYield: number;
    };

    tokenInformation?: {
      tokenPrice: number;
      tokenSupply: number;
      tokenSymbol: string;
    };
  };
}

export function VehicleFinancialDetails({
  vehicle,
}: VehicleFinancialDetailsProps) {
  const currency = vehicle?.currency|| "USD";

  const startingValue =
    vehicle?.investmentStats?.startingValue || 0;

  const finalValue =
    vehicle?.investmentStats?.targetFinalValue || 0;

  const appreciation =
    finalValue - startingValue;

  const valuationData = [
    {
      name: "Starting Value",
      value: startingValue,
    },
    {
      name: "Expected Appreciation",
      value: appreciation,
    },
    {
      name: "Target Final Value",
      value: finalValue,
    },
  ];

  const COLORS = ["#f97316", "#6b7280", "#10b981"];

  const projectedMOIC =
    startingValue > 0
      ? finalValue / startingValue
      : 0;

  const projectedIRR =
    vehicle?.investmentStats
      ?.appreciationExpectedYearly || 0;

  return (
    <div className="flex flex-col lg:flex-row gap-4 w-full">
      {/* Valuation Breakdown */}
      <Card className="rounded-2xl shadow-sm w-full">
        <CardHeader>
          <CardTitle>
            Valuation Breakdown
          </CardTitle>
        </CardHeader>

        <CardContent className="flex flex-col items-center gap-6">
          <div className="w-56 h-56">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={valuationData}
                  innerRadius={60}
                  outerRadius={85}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {valuationData.map((_, i) => (
                    <Cell
                      key={i}
                      fill={COLORS[i]}
                    />
                  ))}
                </Pie>

                <Tooltip
                  content={
                    <CustomTooltip
                      currency={currency}
                    />
                  }
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="w-full space-y-3 text-sm">
            {valuationData.map((item, i) => (
              <div
                key={i}
                className="flex justify-between items-center"
              >
                <div className="flex items-center gap-2">
                  <span
                    className="w-3 h-3 rounded-full"
                    style={{
                      backgroundColor: COLORS[i],
                    }}
                  />

                  <span className="text-gray-600">
                    {item.name}
                  </span>
                </div>

                <span className="font-semibold">
                  {formatCurrencyWithLocale(
                    item.value,
                    currency
                  )}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Investment Returns */}
      <Card className="rounded-2xl shadow-sm w-full">
        <CardHeader>
          <CardTitle>
            Investment Returns
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Main Highlight */}
          <div className="bg-gray-100 rounded-2xl p-5">
            <p className="text-xs text-gray-500 uppercase tracking-wide">
              Expected Annual Appreciation
            </p>

            <p className="text-3xl font-bold text-orange-500 mt-2">
              {
                vehicle?.investmentStats
                  ?.appreciationExpectedYearly
              }
              %
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-6">
            <div>
              <p className="text-xs text-gray-500 uppercase">
                Minimum ROI
              </p>

              <p className="font-semibold text-lg mt-1">
                {
                  vehicle?.investmentStats
                    ?.minReturnToInvestors
                }
                %
              </p>
            </div>

            <div>
              <p className="text-xs text-gray-500 uppercase">
                Projected IRR
              </p>

              <p className="font-semibold text-lg text-green-600 mt-1">
                {projectedIRR.toFixed(2)}%
              </p>
            </div>

            <div>
              <p className="text-xs text-gray-500 uppercase">
                MOIC
              </p>

              <p className="font-semibold text-lg mt-1">
                {projectedMOIC.toFixed(2)}x
              </p>
            </div>

            <div>
              <p className="text-xs text-gray-500 uppercase">
                Investment Period
              </p>

              <p className="font-semibold text-lg mt-1">
                {
                  vehicle?.investmentStats
                    ?.investmentPeriod
                }{" "}
                Months
              </p>
            </div>
          </div>

          {/* Rental Income */}
          <div className="border-t pt-5 space-y-4">
            <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
              Rental Yield Metrics
            </h3>

            <div className="grid grid-cols-2 gap-5">
              <div>
                <p className="text-xs text-gray-500">
                  Daily Rental
                </p>

                <p className="font-semibold">
                  {formatCurrencyWithLocale(
                    vehicle?.rentalInformation
                      ?.estRentalPricePerDay || 0,
                    currency
                  )}
                </p>
              </div>

              <div>
                <p className="text-xs text-gray-500">
                  Rental Period
                </p>

                <p className="font-semibold">
                  {
                    vehicle?.rentalInformation
                      ?.estRentalPeriodInDays
                  }{" "}
                  Days
                </p>
              </div>

              <div>
                <p className="text-xs text-gray-500">
                  Net Rental Income
                </p>

                <p className="font-semibold text-green-600">
                  {formatCurrencyWithLocale(
                    vehicle?.rentalInformation
                      ?.netRentalIncome || 0,
                    currency
                  )}
                </p>
              </div>

              <div>
                <p className="text-xs text-gray-500">
                  Total Yield
                </p>

                <p className="font-semibold text-orange-500">
                  {
                    vehicle?.rentalInformation
                      ?.totalYield
                  }
                  %
                </p>
              </div>
            </div>
          </div>

          {/* Token Metrics */}
          <div className="border-t pt-5 space-y-4">
            <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
              Tokenization Metrics
            </h3>

            <div className="grid grid-cols-2 gap-5">
              <div>
                <p className="text-xs text-gray-500">
                  Token Symbol
                </p>

                <p className="font-semibold">
                  {
                    vehicle?.tokenInformation
                      ?.tokenSymbol
                  }
                </p>
              </div>

              <div>
                <p className="text-xs text-gray-500">
                  Token Supply
                </p>

                <p className="font-semibold">
                  {
                    vehicle?.tokenInformation
                      ?.tokenSupply
                  }
                </p>
              </div>

              <div>
                <p className="text-xs text-gray-500">
                  Token Price
                </p>

                <p className="font-semibold">
                  {formatCurrencyWithLocale(
                    vehicle?.tokenInformation
                      ?.tokenPrice || 0,
                    currency
                  )}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

const CustomTooltip = ({
  active,
  payload,
  currency,
}: any) => {
  if (
    active &&
    payload &&
    payload.length
  ) {
    const data = payload[0];

    return (
      <div className="bg-white p-3 rounded-xl shadow-lg border text-sm">
        <p className="font-semibold">
          {data.name}
        </p>

        <p className="text-gray-600 mt-1">
          {formatCurrencyWithLocale(
            data.value,
            currency
          )}
        </p>
      </div>
    );
  }

  return null;
};