import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrencyWithLocale } from "@/lib/formatCurrency";

interface VehicleRentalInformationProps {
  vehicle: {
    currency: string;
    rentalInformation?: {
      estRentalPricePerDay: number;
      estRentalPeriodInDays: number;
      estTotalRentalIncome: number;
      totalOperatingCosts: number;
      netRentalIncome: number;
      totalYield: number;
    };
  };
}

export function VehicleRentalInformation({
  vehicle,
}: VehicleRentalInformationProps) {
  const currency =vehicle?.currency || "USD";

  const rental = vehicle?.rentalInformation;

  const grossMonthlyIncome =
    (rental?.estTotalRentalIncome || 0) / 12;

  const netMonthlyIncome =
    (rental?.netRentalIncome || 0) / 12;

  return (
    <Card className="rounded-2xl shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">
          Rental Information
        </CardTitle>
      </CardHeader>

      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Left */}
          <div className="bg-gray-50 rounded-xl p-5 space-y-5">
            <div>
              <p className="text-sm text-gray-500">
                Daily Rental Price
              </p>

              <p className="text-lg font-semibold">
                {formatCurrencyWithLocale(
                  rental?.estRentalPricePerDay || 0,
                  currency
                )}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">
                Rental Period
              </p>

              <p className="text-lg font-semibold">
                {rental?.estRentalPeriodInDays || 0} Days
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">
                Gross Rental Income
              </p>

              <p className="text-lg font-semibold text-orange-500">
                {formatCurrencyWithLocale(
                  rental?.estTotalRentalIncome || 0,
                  currency
                )}
              </p>
            </div>
          </div>

          {/* Right */}
          <div className="bg-gray-50 rounded-xl p-5 space-y-5">
            <div>
              <p className="text-sm text-gray-500">
                Gross Monthly Income
              </p>

              <p className="text-lg font-semibold">
                {formatCurrencyWithLocale(
                  grossMonthlyIncome,
                  currency
                )}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">
                Operating Costs
              </p>

              <p className="text-lg font-semibold text-red-500">
                {formatCurrencyWithLocale(
                  rental?.totalOperatingCosts || 0,
                  currency
                )}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">
                Net Rental Income
              </p>

              <p className="text-lg font-semibold text-green-600">
                {formatCurrencyWithLocale(
                  rental?.netRentalIncome || 0,
                  currency
                )}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">
                Net Monthly Income
              </p>

              <p className="text-lg font-semibold">
                {formatCurrencyWithLocale(
                  netMonthlyIncome,
                  currency
                )}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">
                Total Yield
              </p>

              <p className="text-lg font-semibold text-orange-500">
                {rental?.totalYield || 0}%
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}