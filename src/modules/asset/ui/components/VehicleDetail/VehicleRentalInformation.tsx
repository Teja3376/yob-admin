import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function VehicleRentalInformation() {
    return (
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
                  {/* {currency} {rentalInformation?.rentPerSft?.toLocaleString()} */}
                    $ 12.50
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-500">Vacancy Rate</p>
                <p className="text-lg font-semibold">
                  {/* {rentalInformation?.vacancyRate}% */}
                  15%
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-500">Gross Annual Rent</p>
                <p className="text-lg font-semibold text-orange-500">
                  {/* {formatCurrency(rentalInformation?.grossAnnualRent, currency)} */}
                  $ 150,000
                </p>
              </div>
            </div>

            <div className="bg-gray-50 rounded-xl p-5 space-y-5">
              <div>
                <p className="text-sm text-gray-500">Gross Monthly Rent</p>
                <p className="text-lg font-semibold">
                  {/* {formatCurrency(
                    rentalInformation?.grossMonthlyRent,
                    currency,
                  )} */}
                  $ 12,500
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-500">Net Monthly Rent</p>
                <p className="text-lg font-semibold">
                  {/* {formatCurrency(rentalInformation?.netMonthlyRent, currency)} */}
                  $ 10,000
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-500">Net Annual Rent</p>
                <p className="text-lg font-semibold text-orange-500">
                  {/* {formatCurrency(rentalInformation?.netAnnualRent, currency)} */}
                  $ 120,000
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    )
}