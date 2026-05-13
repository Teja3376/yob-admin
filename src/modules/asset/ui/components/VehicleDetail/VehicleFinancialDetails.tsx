import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrencyWithLocale } from "@/lib/formatCurrency";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

// MOCK DATA
const data = {
  basePropertyValue: 450000,

  totalPropertyValueAfterFees: 520000,

  investmentPerformance: {
    targetCapitalAppreciation: 18,

    moic: 2.4,

    irr: 14.75,
  },
};

export function VehicleFinancialDetails() {
  const asset = data;
  const currency = "USD";

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
    },
  ];

  const COLORS = ["#f97316", "#6b7280", "#10b981"];
  return (
    <div className="flex gap-2 w-full">
      <Card className="rounded-2xl shadow-sm w-full">
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

      <Card className="rounded-2xl shadow-sm w-full">
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
            <p className="font-semibold text-black-600 ">
              {asset?.investmentPerformance?.moic?.toFixed(1)}
            </p>
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
