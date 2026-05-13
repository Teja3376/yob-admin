"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Car, Gauge, ShieldCheck, Zap } from "lucide-react";

interface VehicleOverviewProps {
  vehicle: any;
}

export function VehicleOverview({
  vehicle,
}: VehicleOverviewProps) {
  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Asset Type */}
        <Card className="rounded-2xl shadow-sm p-6 w-full">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-xl bg-primary/10 text-primary">
              <Car className="w-6 h-6" />
            </div>

            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wide">
                Asset Type
              </p>

              <p className="text-xl font-semibold text-gray-900 mt-1">
                {`${vehicle.brand} ${vehicle.model} ${vehicle.trim || ""}`}
              </p>
            </div>
          </div>

          <p className="text-sm text-gray-500 mt-6 max-w-xl leading-relaxed">
            {vehicle.carDescription}
          </p>
        </Card>

        {/* Right Stats */}
        <div className="flex flex-col gap-4 w-full">
          {/* Performance */}
          <Card className="rounded-2xl shadow-sm p-5">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-primary/10 text-primary">
                <Gauge className="w-5 h-5" />
              </div>

              <div>
                <p className="text-xs text-gray-500 uppercase">
                  Performance
                </p>

                <p className="text-lg font-semibold mt-1">
                  {vehicle.horsePower} HP
                </p>
              </div>
            </div>
          </Card>

          {/* Mileage + Status */}
          <div className="grid grid-cols-2 gap-4">
            <Card className="rounded-2xl shadow-sm p-5">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-primary/10 text-primary">
                  <Zap className="w-5 h-5" />
                </div>

                <div>
                  <p className="text-xs text-gray-500 uppercase">
                    Mileage
                  </p>

                  <p className="text-lg font-semibold mt-1">
                    {vehicle.km?.toLocaleString()} KM
                  </p>
                </div>
              </div>
            </Card>

            <Card className="rounded-2xl shadow-sm p-5">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-primary/10 text-primary">
                  <ShieldCheck className="w-5 h-5" />
                </div>

                <div>
                  <p className="text-xs text-gray-500 uppercase">
                    Car Status
                  </p>

                  <p className="text-lg font-semibold mt-1 capitalize">
                    {vehicle.status}
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/* Main Section */}
      <div className="grid grid-cols-1 lg:grid-cols-10 gap-6 w-full">
        {/* About Vehicle */}
        <div className="lg:col-span-6">
          <Card className="rounded-2xl shadow-sm h-full">
            <CardHeader>
              <CardTitle>About the Vehicle</CardTitle>
            </CardHeader>

            <CardContent className="space-y-6">
              <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                {vehicle.carDescription}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {/* Engine */}
                <div>
                  <h3 className="text-slate-400 font-bold uppercase mb-6">
                    Engine Details
                  </h3>

                  <div className="space-y-5">
                    <div className="flex justify-between border-b pb-3">
                      <span className="text-slate-500">
                        Displacement
                      </span>

                      <span className="font-semibold">
                        {vehicle.engineDisplacement} CC
                      </span>
                    </div>

                    <div className="flex justify-between border-b pb-3">
                      <span className="text-slate-500">
                        Configuration
                      </span>

                      <span className="font-semibold">
                        {`V${vehicle.cylinders} Twin Turbo`}
                      </span>
                    </div>

                    <div className="flex justify-between border-b pb-3">
                      <span className="text-slate-500">
                        Horsepower
                      </span>

                      <span className="font-semibold">
                        {vehicle.horsePower} HP
                      </span>
                    </div>
                  </div>
                </div>

                {/* Exterior */}
                <div>
                  <h3 className="text-slate-400 font-bold uppercase mb-6">
                    Exterior & Interior
                  </h3>

                  <div className="space-y-5">
                    <div className="flex justify-between border-b pb-3 gap-4">
                      <span className="text-slate-500">
                        Exterior Color
                      </span>

                      <span className="font-semibold text-right">
                        {vehicle.exteriorColor}
                      </span>
                    </div>

                    <div className="flex justify-between border-b pb-3 gap-4">
                      <span className="text-slate-500">
                        Interior Material
                      </span>

                      <span className="font-semibold text-right">
                        {vehicle.interiorColor}
                      </span>
                    </div>

                    <div className="flex justify-between border-b pb-3 gap-4">
                      <span className="text-slate-500">
                        Body Type
                      </span>

                      <span className="font-semibold text-right capitalize">
                        {vehicle.bodyType}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Asset Overview */}
        <div className="lg:col-span-4">
          <Card className="rounded-2xl shadow-sm h-full">
            <CardHeader>
              <CardTitle>Asset Overview</CardTitle>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="flex justify-between gap-4">
                <span className="text-gray-600">Asset Name</span>

                <span className="font-semibold text-right">
                  {`${vehicle.brand} ${vehicle.model}`}
                </span>
              </div>

              <div className="flex justify-between gap-4">
                <span className="text-slate-500">VIN Number</span>

                <span className="font-semibold text-right break-all">
                  {vehicle.vinNumber}
                </span>
              </div>

              <div className="flex justify-between gap-4">
                <span className="text-slate-500">
                  Year of Production
                </span>

                <span className="font-semibold text-right">
                  {vehicle.year}
                </span>
              </div>

              <div className="flex justify-between gap-4">
                <span className="text-slate-500">
                  Investment Period
                </span>

                <span className="font-semibold text-right">
                  {vehicle.investmentStats?.investmentPeriod} Months
                </span>
              </div>

              <div className="flex justify-between gap-4">
                <span className="text-slate-500">
                  Expected Appreciation
                </span>

                <span className="font-semibold text-right">
                  {
                    vehicle.investmentStats
                      ?.appreciationExpectedYearly
                  }
                  % Yearly
                </span>
              </div>

              <div className="flex justify-between gap-4">
                <span className="text-slate-500">
                  Minimum ROI
                </span>

                <span className="font-semibold text-right">
                  {
                    vehicle.investmentStats
                      ?.minReturnToInvestors
                  }
                  %
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}