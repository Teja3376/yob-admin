'use client';

import { AlertCircle, Edit2, MoveUpRightIcon, Send, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';

interface AssetDetailHeaderProps {
  name?: string;
  location?: string;
  status?: 'pending' | 'approved' | 'active';
  stage?: string;
  imageUrl?: string;
  onRequestUpdate?: () => void;
  onApprove?: () => void;
  approveDisabled?: boolean;
}

export function AssetDetailHeader(props: AssetDetailHeaderProps) {
  const { name, location, status, imageUrl, onRequestUpdate, onApprove, approveDisabled } = props;
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
      <>
      <div className="flex gap-2 mt-4">
        <Button variant="primary" className="text-white gap-2" onClick={onRequestUpdate}>
          <Edit2 className="h-4 w-4" />
          Request to update
        </Button>
        <Button
          variant="outline"
          className="text-black gap-2"
          onClick={onApprove}
          disabled={approveDisabled}
        >
          Approve
          <Send className="h-4 w-4" />
        </Button>
      </div>
      </>
    </div>
  );
}
