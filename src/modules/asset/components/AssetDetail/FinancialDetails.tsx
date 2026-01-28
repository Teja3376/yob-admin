'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, Percent, Calendar } from 'lucide-react';

interface FinancialDetailsProps {
  investmentPerformance: {
    irr: number;
    moic: number;
    netRentalYield: number;
    grossRentalYield: number;
    targetCapitalAppreciation: number;
    estimatedReturnsAsPerLockInPeriod: number;
  };
  rentalInformation: {
    rentPerSft: number;
    grossMonthlyRent: number;
    netMonthlyRent: number;
    grossAnnualRent: number;
    netAnnualRent: number;
    vacancyRate: number;
  };
  investorRequirementsAndTimeline: {
    lockupPeriod: number;
    lockupPeriodType: string;
    distributionStartDate: string;
    distributionEndDate: string;
  };
  currency: string;
}

export function FinancialDetails({
  investmentPerformance,
  rentalInformation,
  investorRequirementsAndTimeline,
  currency,
}: FinancialDetailsProps) {
  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Financial Performance</h2>

      {/* Key Returns */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="">
            <div className="flex items-start gap-4">
              <div className="rounded-lg bg-green-100 p-3">
                <TrendingUp className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Internal Rate of Return (IRR)</p>
                <p className="mt-1 text-3xl font-bold text-green-600">
                  {investmentPerformance.irr}%
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="">
            <div className="flex items-start gap-4">
              <div className="rounded-lg bg-purple-100 p-3">
                <Percent className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Multiple on Invested Capital (MOIC)</p>
                <p className="mt-1 text-3xl font-bold text-purple-600">
                  {investmentPerformance.moic.toFixed(2)}x
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="">
            <div className="flex items-start gap-4">
              <div className="rounded-lg bg-blue-100 p-3">
                <Calendar className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Net Rental Yield</p>
                <p className="mt-1 text-3xl font-bold text-blue-600">
                  {investmentPerformance.netRentalYield.toFixed(2)}%
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Rental Information */}
      <Card>
        <CardHeader>
          <CardTitle>Rental Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-600">Rent per SFT</p>
                <p className="text-lg font-semibold">
                  {currency} {rentalInformation.rentPerSft.toLocaleString()}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Vacancy Rate</p>
                <p className="text-lg font-semibold">{rentalInformation.vacancyRate}%</p>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-600">Gross Monthly Rent</p>
                <p className="text-lg font-semibold">
                  {currency} {rentalInformation.grossMonthlyRent.toLocaleString()}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Net Monthly Rent</p>
                <p className="text-lg font-semibold text-green-600">
                  {currency} {rentalInformation.netMonthlyRent.toLocaleString()}
                </p>
              </div>
            </div>
          </div>
          <div className="my-6 border-t ">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Gross Annual Rent</p>
                <p className="mt-1 text-lg font-semibold">
                  {currency} {rentalInformation.grossAnnualRent.toLocaleString()}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Net Annual Rent</p>
                <p className="mt-1 text-lg font-semibold text-green-600">
                  {currency} {rentalInformation.netAnnualRent.toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Investment Timeline */}
      <Card>
        <CardHeader>
          <CardTitle>Investment Timeline</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Lock-up Period</span>
              <span className="font-semibold">
                {investorRequirementsAndTimeline.lockupPeriod}{' '}
                {investorRequirementsAndTimeline.lockupPeriodType}
              </span>
            </div>
            <div className="flex flex-col gap-2 border-t pt-4">
              <div>
                <p className="text-sm text-gray-600">Distribution Start Date</p>
                <p className="mt-1 font-semibold">
                  {formatDate(investorRequirementsAndTimeline.distributionStartDate)}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Distribution End Date</p>
                <p className="mt-1 font-semibold">
                  {formatDate(investorRequirementsAndTimeline.distributionEndDate)}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
