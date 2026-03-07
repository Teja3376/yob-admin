'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, DollarSign, Home, Zap } from 'lucide-react';

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
}

export function PropertyOverview({
//   class: _assetClass,
  category,
  style,
  stage,
  currency,
  totalSfts,
  pricePerSft,
  basePropertyValue,
  totalPropertyValueAfterFees,
}: PropertyOverviewProps) {
  const metrics = [
    {
      icon: Home,
      label: 'Asset Type',
      value: `${style.charAt(0).toUpperCase() + style.slice(1)} - ${category}`,
    },
    {
      icon: Zap,
      label: 'Property Status',
      value: stage.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
    },
    {
      icon: DollarSign,
      label: 'Price per SFT',
      value: `${currency} ${pricePerSft.toLocaleString()}`,
    },
    {
      icon: MapPin,
      label: 'Total Area',
      value: `${totalSfts.toLocaleString()} SFT`,
    },
  ];

  return (
    <div className="space-y-6">
        
      {/* Quick Metrics */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {metrics.map((metric) => {
          const Icon = metric.icon;
          return (
            <Card key={metric.label}>
              <CardContent className="">
                <div className="flex items-start gap-4">
                  <div className="rounded-lg bg-blue-100 p-3">
                    <Icon className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">{metric.label}</p>
                    <p className="mt-1 text-md font-medium text-gray-900">{metric.value}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Valuation Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Property Valuation</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b pb-4">
              <span className="text-gray-600">Base Property Value</span>
              <span className="font-semibold">
                {currency} {basePropertyValue.toLocaleString()}
              </span>
            </div>
            <div className="flex items-center justify-between pt-2">
              <span className="text-gray-600">Total Value (After Fees)</span>
              <span className="text-lg font-bold text-blue-600">
                {currency} {totalPropertyValueAfterFees.toLocaleString()}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
