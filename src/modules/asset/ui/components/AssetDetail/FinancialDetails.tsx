"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency, formatCurrencyWithLocale } from "@/lib/formatCurrency";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts";


interface FinancialDetailsProps {
  investmentPerformance: {
    irr: number;
    moic: number;
    netRentalYield: number;
    grossRentalYield: number;
    targetCapitalAppreciation: number;
  };
  rentalInformation: {
    rentPerSft: number;
    grossMonthlyRent: number;
    netMonthlyRent: number;
    grossAnnualRent: number;
    netAnnualRent: number;
    vacancyRate: number;
  };
  currency: string;
  data: any;
}

export function FinancialDetails({
  rentalInformation,
  currency,
  data,
}: FinancialDetailsProps) {
  const asset = data;

  const valuationData = [
    {
      name: "Base Value",
      value: asset?.basePropertyValue || 0,
    },
    {
      name: "Fees & Taxes",
      value:
        (asset?.totalPropertyValueAfterFees || 0) -
        (asset?.basePropertyValue || 0),  
    },
    {
      name: "Total Value",
      value: asset?.totalPropertyValueAfterFees || 0,
    }
  ];

  const COLORS = ["#f97316", "#6b7280", "#10b981"];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Card className="rounded-2xl shadow-sm">
          <CardHeader>
            <CardTitle>Valuation Breakdown</CardTitle>
          </CardHeader>

          <CardContent className="flex flex-col items-center gap-6">
            <div className="w-48 h-48">
              <ResponsiveContainer>
                <PieChart>
                  <Pie
                    data={valuationData}
                    innerRadius={60}
                    outerRadius={80}
                    dataKey="value"
                  >
                    {valuationData.map((_, i) => (
                      <Cell key={i} fill={COLORS[i]} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                  
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="w-full space-y-2 text-sm">
              {valuationData.map((item, i) => (
                <div key={i} className="flex justify-between">
                  <div className="flex items-center gap-2">
                    <span
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: COLORS[i] }}
                    />
                    <span className="text-gray-600">{item.name}</span>
                  </div>

                  <span className="font-medium">
                    {formatCurrencyWithLocale(item.value, currency)}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl shadow-sm">
          <CardHeader>
            <CardTitle>Investment Returns</CardTitle>
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="bg-gray-100 rounded-xl p-4">
              <p className="text-xs text-gray-500 uppercase">
                Target Appreciation
              </p>
              <p className="text-2xl font-bold text-orange-500">
                {asset?.investmentPerformance?.targetCapitalAppreciation || 0}%
              </p>
            </div>

            <div className="flex justify-between">
              <div>
                <p className="text-xs text-gray-500">Equity Multiple</p>
                <p className="font-semibold">
                  {asset?.investmentPerformance?.moic?.toFixed(1)}x
                </p>
              </div>

              <div>
                <p className="text-xs text-gray-500">IRR (Projected)</p>
                <p className="font-semibold text-green-600 ">
                  {asset?.investmentPerformance?.irr?.toFixed(2)}%
                </p>
              </div>
            </div>
            <div>
              <p className="text-xs text-gray-500">MOIC</p>
              <p className="font-semibold text-black-600 ">{asset?.investmentPerformance?.moic?.toFixed(1)}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="rounded-2xl shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">
            Rental Information
          </CardTitle>
        </CardHeader>

        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gray-50 rounded-xl p-5 space-y-5">
              <div>
                <p className="text-sm text-gray-500">Rent per SFT</p>
                <p className="text-lg font-semibold">
                  {currency} {rentalInformation?.rentPerSft?.toLocaleString()}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-500">Vacancy Rate</p>
                <p className="text-lg font-semibold">
                  {rentalInformation?.vacancyRate}%
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-500">Gross Annual Rent</p>
                <p className="text-lg font-semibold text-orange-500">
                  {formatCurrency(rentalInformation?.grossAnnualRent, currency)}
                </p>
              </div>
            </div>

            <div className="bg-gray-50 rounded-xl p-5 space-y-5">
              <div>
                <p className="text-sm text-gray-500">Gross Monthly Rent</p>
                <p className="text-lg font-semibold">
                  {formatCurrency(
                    rentalInformation?.grossMonthlyRent,
                    currency,
                  )}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-500">Net Monthly Rent</p>
                <p className="text-lg font-semibold">
                  {formatCurrency(rentalInformation?.netMonthlyRent, currency)}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-500">Net Annual Rent</p>
                <p className="text-lg font-semibold text-orange-500">
                  {formatCurrency(rentalInformation?.netAnnualRent, currency)}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}


const CustomTooltip = ({ active, payload, currency }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0];

    return (
      <div className="bg-white p-2 rounded-md shadow border text-sm">
        <p className="font-medium">{data.name}</p>
        <p>{formatCurrencyWithLocale(data.value, currency)}</p>
      </div>
    );
  }
  return null;
};