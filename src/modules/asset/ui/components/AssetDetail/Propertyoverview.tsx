"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import CountryFormat from "@/lib/formatCountry";
import { formatCurrency } from "@/lib/formatCurrency";
import {
  MapPin,
  DollarSign,
  Home,
  Zap,
  Clock,
  ShieldCheck,
} from "lucide-react";
import Image from "next/image";

interface PropertyOverviewProps {
  //   class: string;
  category: string;
  style: string;
  stage: string;
  currency: string;
  totalSfts: number;
  pricePerSft: number;
  basePropertyValue: number;
  totalPropertyValueAfterFees: number;
  companyName: string;
  jurisdiction: string;
  description: string;
  issuerName: string;
  projectsCount: number;
  estimatedReturnsAsPerLockInPeriod: number;
  images?: string[];
}

export function PropertyOverview({
  category,
  style,
  stage,
  currency,
  totalSfts,
  pricePerSft,
  basePropertyValue,
  totalPropertyValueAfterFees,
  companyName,
  jurisdiction,
  description,
  issuerName,
  projectsCount,
  estimatedReturnsAsPerLockInPeriod,
  images,
}: PropertyOverviewProps) {

  return (
    <div className="space-y-6">
      <div className="flex gap-6">
        <Card className=" rounded-2xl shadow-sm p-6 w-full">
          <div className="flex items-start  gap-4">
            <div className="p-3 rounded-xl bg-primary/10 text-primary ">
              <Home className="w-6 h-6 " />
            </div>

            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wide">
                Asset Type
              </p>
              <p className="text-xl font-semibold text-gray-900 mt-1">
                {style.charAt(0).toUpperCase() + style.slice(1)} — {category}
              </p>
            </div>
          </div>

          <p className="text-sm text-gray-500 mt-6 max-w-xl">
            Premium commercial villa investment opportunity in . This asset is
            currently {stage.replace("-", " ")}.
          </p>
        </Card>

        <div className="flex flex-col gap-4 w-full">
          <Card className="rounded-2xl shadow-sm p-5">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-primary/10 text-primary">
                <Zap className="w-5 h-5" />
              </div>

              <div>
                <p className="text-xs text-gray-500 uppercase">
                  Property Status
                </p>
                <p className="text-lg font-semibold mt-1">
                  {stage
                    .split("-")
                    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
                    .join(" ")}
                </p>
              </div>
            </div>
          </Card>
          <div className="grid grid-cols-2 gap-4">
            <Card className="rounded-2xl shadow-sm p-5">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-primary/10 text-primary">
                  <DollarSign className="w-5 h-5" />
                </div>

                <div>
                  <p className="text-xs text-gray-500 uppercase">Price / SFT</p>
                  <p className="text-lg font-semibold mt-1">
                    {formatCurrency(pricePerSft, currency)}
                  </p>
                </div>
              </div>
            </Card>

            <Card className="rounded-2xl shadow-sm p-5">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-primary/10 text-primary">
                  <MapPin className="w-5 h-5" />
                </div>

                <div>
                  <p className="text-xs text-gray-500 uppercase">Total Area</p>
                  <p className="text-lg font-semibold mt-1">
                    {totalSfts.toLocaleString()} SFT
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
              <CardTitle>About the Property</CardTitle>
            </CardHeader>

            <CardContent className="space-y-6">
              <p className="text-gray-600 leading-relaxed text-sm md:text-base h-20 ">
                {description}
              </p>

              <div className="flex flex-col md:flex-row justify-between gap-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-orange-100 text-orange-600">
                    <ShieldCheck size={20} />
                  </div>

                  <div>
                    <p className="font-semibold text-gray-900">
                      Verified Issuer
                    </p>
                    <p className="text-sm text-gray-600">
                      {issuerName} is a verified developer with {projectsCount}{" "}
                      completed projects.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-green-100 text-green-600">
                    <Clock size={20} />
                  </div>

                  <div>
                    <p className="font-semibold text-gray-900">
                      Lock-in Period
                    </p>
                    <p className="text-sm text-gray-600">
                      {estimatedReturnsAsPerLockInPeriod || "_"}% estimated returns as per lock-in period.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-4">
          <Card className="rounded-2xl shadow-sm h-full">
            <CardHeader>
              <CardTitle>Company Overview</CardTitle>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Company Name</span>
                <span className="font-semibold">{companyName}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-600">Jurisdiction</span>
                <span className="font-semibold">
                  <CountryFormat code={jurisdiction} />
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Card className="w-full rounded-2xl shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg font-semibold">Gallery</CardTitle>

          <Button className="text-orange-500 text-sm font-medium hover:underline bg-white hover:bg-white">
            View All
          </Button>
        </CardHeader>

        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {images?.slice(0, 3).map((img, index) => (
              <div
                key={index}
                className="w-full h-64 rounded-xl overflow-hidden bg-gray-100"
              >
                <Image
                  src={img}
                  alt={`Gallery ${index}`}
                  width={200}
                  height={200}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
