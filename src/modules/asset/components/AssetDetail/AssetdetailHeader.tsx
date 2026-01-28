'use client';

import { AlertCircle, Edit2, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';

interface AssetDetailHeaderProps {
  name?: string;
  location?: string;
  status?: 'pending' | 'approved' | 'active';
  stage?: string;
  imageUrl?: string;
}

export function AssetDetailHeader(props: AssetDetailHeaderProps) {
  const { name, location, status, imageUrl } = props;
  const statusConfig = {
    pending: { label: 'Approval Pending', color: 'bg-yellow-100 text-yellow-800' },
    approved: { label: 'Approved', color: 'bg-green-100 text-green-800' },
    active: { label: 'Active', color: 'bg-blue-100 text-blue-800' },
  };

  const safeStatus: keyof typeof statusConfig =
    status && status in statusConfig ? status : 'pending';
  const config = statusConfig[safeStatus];

  return (
    <div className="relative w-full">
      {/* Hero Image */}
      <div className="relative h-96 w-full overflow-hidden rounded-lg bg-gradient-to-b from-slate-200 to-slate-100">
        <Image
          src={imageUrl || "/placeholder.svg"}
          alt={name || "Asset Image"}
          className="h-full w-full object-cover"
          width={1000}
          height={1000}
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

        {/* Status Badge - Top Right */}
        <div className="absolute right-6 top-6 flex gap-2">
          <Badge variant="secondary" className={`${config.color} font-semibold`}>
            {config.label}
          </Badge>
        </div>

        {/* Content - Bottom Left */}
        <div className="absolute bottom-6 left-6">
          <h1 className="text-4xl font-bold text-white">{name ?? '—'}</h1>
          <p className="mt-2 text-lg text-gray-100">{location ?? ''}</p>
        </div>
      </div>
      {/* Pending Notice */}
      {status === 'pending' && (
        <div className="mt-4 rounded-lg border border-yellow-200 bg-yellow-50 p-4 flex gap-3">
          <AlertCircle className="h-5 w-5 text-yellow-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-yellow-900">Awaiting Approval</p>
            <p className="text-sm text-yellow-800 mt-1">
              This asset is currently pending approval from the administrative team.
              You can request updates or modifications before final approval.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
