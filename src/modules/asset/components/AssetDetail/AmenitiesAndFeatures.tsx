'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';

interface AmenityItem {
  _id: string;
  name: string;
  description: string;
  image: string;
  status: boolean;
}

interface FeatureItem {
  _id: string;
  name: string;
  description: string;
  image: string;
  status: boolean;
}

interface AmenitiesAndFeaturesProps {
  amenities: AmenityItem[];
  features: FeatureItem[];
}

export function AmenitiesAndFeatures({
  amenities,
  features,
}: AmenitiesAndFeaturesProps) {
  return (
    <div className="space-y-8">
      {/* Amenities */}
      {amenities && amenities.length > 0 && (
        <div>
          <h2 className="mb-6 text-xl font-semibold">Amenities</h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {amenities.map((amenity) => (
              <Card key={amenity._id} className="overflow-hidden">
                <div className="h-40 overflow-hidden bg-gray-200">
                  <Image
                    src={ "https://placehold.co/600x400"}
                    alt={amenity.name}
                    width={100}
                    height={100}
                    className="object-cover"
                  />
                </div>
                <CardContent className="pt-4">
                  <h3 className="font-semibold text-gray-900">{amenity.name}</h3>
                  <p className="mt-2 text-sm text-gray-600">{amenity.description}</p>
                  {amenity.status && (
                    <div className="mt-3">
                      <span className="inline-block bg-yellow-100 px-3 py-1 text-xs font-semibold text-yellow-800 rounded">
                        Inactive
                      </span>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Features */}
      {features && features.length > 0 && (
        <div>
          <h2 className="mb-6 text-xl font-semibold">Key Features</h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <Card key={feature._id} className="overflow-hidden">
                <div className="h-40 overflow-hidden bg-gray-200">
                  <Image
                    src={ "https://placehold.co/600x400"}
                    alt={feature.name}
                    width={100}
                    height={100}
                    className="object-cover"
                  />
                </div>
                <CardContent className="pt-4">
                  <h3 className="font-semibold text-gray-900">{feature.name}</h3>
                  <p className="mt-2 text-sm text-gray-600">{feature.description}</p>
                  {feature.status && (
                    <div className="mt-3">
                      <span className="inline-block bg-green-100 px-3 py-1 text-xs font-semibold text-green-800 rounded">
                        Active
                      </span>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
