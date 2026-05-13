"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import clsx from "clsx";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Lock,
  Send,
} from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
export function VehicleDetailHeader({
  vehicle,
  onRequestUpdate,
  onApprove,
  onReject,
  approveDisabled,
  canApprove,
  companyId,
  isAlreadyApproved,
  setIsMintingFeeDialogOpen,
}: {
  vehicle: {
    media: {
      imageURL: string;
      gallery: string[];
    };
    brand: string;
    model: string;
    status: "pending" | "approved" | "active" | "rejected";
  };
  onRequestUpdate: () => void;
  onApprove: () => void;
  onReject: () => void;
  approveDisabled: boolean;
  canApprove: boolean;
  companyId: string;
  isAlreadyApproved: boolean;
  setIsMintingFeeDialogOpen: (open: boolean) => void;
}) {
  const router = useRouter();
  const carouselRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const lastScrollY = useRef(0);
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);
  const { media, brand:name, model, status } = vehicle;
 
  const { imageURL:image, gallery: images } = media || {};

  const statusConfig = {
    pending: {
      label: "Approval Pending",
      color: "bg-yellow-100 text-yellow-800",
    },
    approved: { label: "Approved", color: "bg-green-100 text-green-800" },
    active: { label: "Active", color: "bg-blue-100 text-blue-800" },
    rejected: { label: "Rejected", color: "bg-red-100 text-red-800" },
    "listing-ended": {
      label: "listing-ended",
      color: "bg-gray-100 text-gray-800",
    },
    "fully-funded": {
      label: "Fully Funded",
      color: "bg-purple-100 text-purple-800",
    },
  };

  useEffect(() => {
    imageRefs.current = imageRefs.current.slice(0, images?.length || 0);
  }, [images]);

  // Detect scroll direction and pause/resume auto-scroll
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY.current) {
        // Scrolling down
        setIsPaused(true);
      } else if (currentScrollY < lastScrollY.current) {
        // Scrolling up
        setIsPaused(false);
      }
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Auto-scroll functionality
  useEffect(() => {
    if (!images || images.length <= 1 || isPaused) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        const nextIndex = (prevIndex + 1) % images.length;
        scrollToImage(nextIndex);
        return nextIndex;
      });
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(interval);
  }, [images, isPaused]);

  const safeStatus: keyof typeof statusConfig =
    status && status in statusConfig ? status : "pending";
  const config = statusConfig[safeStatus];

  const scrollToImage = (index: number) => {
    setCurrentIndex(index);
  };

  const nextImage = () => {
    if (images?.length) {
      const nextIndex = (currentIndex + 1) % images.length;
      scrollToImage(nextIndex);
    }
  };

  const prevImage = () => {
    if (images?.length) {
      const prevIndex =
        currentIndex === 0 ? images.length - 1 : currentIndex - 1;
      scrollToImage(prevIndex);
    }
  };
  return (
    <div className="relative w-full">
      {/* Hero Image */}
      <div className="relative h-96 w-full overflow-hidden rounded-lg bg-linear-to-b from-slate-200 to-slate-100">
        <div
          ref={carouselRef}
          className="flex h-full w-full transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onWheel={(e) => e.preventDefault()}
        >
          {images?.length ? (
            images.map((img: string, index: number) => (
              <div
                key={index}
                ref={(el) => {
                  imageRefs.current[index] = el;
                }}
                className="min-w-full h-full snap-center relative flex-shrink-0"
              >
                <Image
                  src={img}
                  alt={`Asset Image ${index}`}
                  fill
                  className="object-cover"
                />
              </div>
            ))
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <span>No Image</span>
            </div>
          )}
        </div>

        {/* Navigation Buttons */}
        {images && images.length > 1 && (
          <>
            <Button
              onClick={prevImage}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors z-10"
              aria-label="Previous image"
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>
            <Button
              onClick={nextImage}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors z-10"
              aria-label="Next image"
            >
              <ChevronRight className="h-6 w-6" />
            </Button>

            {/* Indicators */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
              {images.map((_: any, index: number) => (
                <Button
                  key={index}
                  onClick={() => scrollToImage(index)}
                  className={`rounded-full transition-colors w-2 h-2 min-w-0 p-0
        ${index === currentIndex ? "bg-white" : "bg-white/50"}`}
                  aria-label={`Go to image ${index + 1}`}
                />
              ))}
            </div>
          </>
        )}

        {/* Overlay */}
        <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent" />

        {/* Status Badge - Top Right */}
        <div className="absolute right-6 top-6 flex gap-2">
          <Badge
            variant="secondary"
            className={`${config.color} font-semibold`}
          >
            {config.label}
          </Badge>
        </div>

        {/* Content - Bottom Left */}
        <div className="absolute bottom-6 left-6">
          <h1 className="text-4xl font-bold text-white">{name ?? "—"}</h1>
          <p className="mt-2 text-lg text-gray-100">{model ?? ""}</p>
        </div>
      </div>
      {/* Pending Notice */}
      {canApprove && status === "pending" && (
        <div className={clsx("flex gap-2 mt-4")}>
          <Button
            variant="outline"
            className="text-black gap-2"
            onClick={onApprove}
            disabled={approveDisabled}
          >
            Approve
            <Send className="h-4 w-4" />
          </Button>
          <Button
            variant="destructive"
            className="text-black gap-2 text-white"
            onClick={onReject}
            disabled={approveDisabled}
          >
            Reject
          </Button>
        </div>
      )}
      {!isAlreadyApproved && !canApprove && (
        <div className="w-full border-red-500 bg-red-200/30 text-red-500 rounded-md p-4 mt-4 flex items-center gap-2 border">
          <Lock />
          <p className="text-sm ">
            You do not have permission to take action on this Asset.
          </p>
        </div>
      )}
      {isAlreadyApproved && (
        <div className="flex items-center gap-2 mt-2">
          <Button
            variant="outline"
            className="text-black gap-2  "
            onClick={() => router.push(`/spv-list/${companyId}/overview`)}
          >
            Go to DashBoard
            <ArrowRight className="h-4 w-4" />
          </Button>
          {/* <Button onClick={() => setIsMintingFeeDialogOpen(true)}>
          Request Minting Fee
        </Button> */}
        </div>
      )}
    </div>
  );
}
