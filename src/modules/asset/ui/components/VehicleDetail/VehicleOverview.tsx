"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import CountryFormat from "@/lib/formatCountry";
import { formatCurrency } from "@/lib/formatCurrency";
import { vehicleData } from "@/modules/investors/mock/mockInvestors";
import {
  Car,
  Clock,
  DollarSign,
  Gauge,
  Home,
  MapPin,
  ShieldCheck,
  Zap,
} from "lucide-react";

export function VehicleOverview() {
  return (
    <div className="space-y-6">
      <div className="flex gap-6">
        <Card className=" rounded-2xl shadow-sm p-6 w-full">
          <div className="flex items-start  gap-4">
            <div className="p-3 rounded-xl bg-primary/10 text-primary ">
              <Car className="w-6 h-6 " />
            </div>

            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wide">
                Asset Type
              </p>
              <p className="text-xl font-semibold text-gray-900 mt-1">msfnf</p>
            </div>
          </div>

          <p className="text-sm text-gray-500 mt-6 max-w-xl">
            Premium commercial villa investment opportunity in . This asset is
            currently.
          </p>
        </Card>

        <div className="flex flex-col gap-4 w-full">
          <Card className="rounded-2xl shadow-sm p-5">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-primary/10 text-primary">
                <Gauge className="w-5 h-5" />
              </div>

              <div>
                <p className="text-xs text-gray-500 uppercase">Performance</p>
                <p className="text-lg font-semibold mt-1">
                  {/* {stage
                    .split("-")
                    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
                    .join(" ")} */}
                  dnnjs
                </p>
              </div>
            </div>
          </Card>
          <div className="grid grid-cols-2 gap-4">
            <Card className="rounded-2xl shadow-sm p-5">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-primary/10 text-primary">
                  <Zap className="w-5 h-5" />
                </div>

                <div>
                  <p className="text-xs text-gray-500 uppercase">Mileage</p>
                  <p className="text-lg font-semibold mt-1">
                    {vehicleData.mileage}
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
                  <p className="text-xs text-gray-500 uppercase">Car Status</p>
                  <p className="text-lg font-semibold mt-1">
                    {vehicleData.status}
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-10 gap-6 w-full">
        <div className="lg:col-span-6">
          <Card className="rounded-2xl shadow-sm h-full">
            <CardHeader>
              <CardTitle>About the Vehicle</CardTitle>
            </CardHeader>

            <CardContent className="space-y-6">
              <p className="text-gray-600 leading-relaxed text-sm md:text-base h-20 ">
                {vehicleData.description}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div>
                  <h3 className="text-slate-400 font-bold uppercase mb-6">
                    Engine Details
                  </h3>

                  <div className="space-y-5">
                    <div className="flex justify-between border-b pb-3">
                      <span className="text-slate-500">Displacement</span>

                      <span className="font-semibold">
                        {vehicleData.engineDetails.displacement}
                      </span>
                    </div>

                    <div className="flex justify-between border-b pb-3">
                      <span className="text-slate-500">Configuration</span>

                      <span className="font-semibold">
                        {vehicleData.engineDetails.configuration}
                      </span>
                    </div>

                    <div className="flex justify-between border-b pb-3">
                      <span className="text-slate-500">Transmission</span>

                      <span className="font-semibold">
                        {vehicleData.engineDetails.transmission}
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-slate-400 font-bold uppercase mb-6">
                    Exterior & Interior
                  </h3>

                  <div className="space-y-5">
                    <div className="flex justify-between border-b pb-3 gap-4">
                      <span className="text-slate-500">Exterior Color</span>

                      <span className="font-semibold text-right">
                        {vehicleData.exteriorInterior.exteriorColor}
                      </span>
                    </div>

                    <div className="flex justify-between border-b pb-3 gap-4">
                      <span className="text-slate-500">Interior Material</span>

                      <span className="font-semibold text-right">
                        {vehicleData.exteriorInterior.interiorMaterial}
                      </span>
                    </div>

                    <div className="flex justify-between border-b pb-3 gap-4">
                      <span className="text-slate-500">Wheels</span>

                      <span className="font-semibold text-right">
                        {vehicleData.exteriorInterior.wheels}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-4">
          <Card className="rounded-2xl shadow-sm h-full">
            <CardHeader>
              <CardTitle>Asset Overview</CardTitle>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Asset Name</span>
                <span className="font-semibold">
                  {vehicleData.overview.assetName}
                </span>
              </div>

              <div className="flex justify-between gap-4">
                <span className="text-slate-500">VIN Number</span>

                <span className="font-semibold text-right">
                  {vehicleData.overview.vinNumber}
                </span>
              </div>

              <div className="flex justify-between gap-4">
                <span className="text-slate-500">Year of Production</span>

                <span className="font-semibold text-right">
                  {vehicleData.overview.yearOfProduction}
                </span>
              </div>

              <div className="flex justify-between gap-4">
                <span className="text-slate-500">Jurisdiction</span>

                <span className="font-semibold text-right">
                  {vehicleData.overview.jurisdiction}
                </span>
              </div>

              <div className="flex justify-between gap-4">
                <span className="text-slate-500">Custodian</span>

                <span className="font-semibold text-right">
                  {vehicleData.overview.custodian}
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
