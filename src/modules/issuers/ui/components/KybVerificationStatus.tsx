import { Badge } from "@/components/ui/badge";
import clsx from "clsx";
import { CheckCircle, CircleAlert } from "lucide-react";
import React from "react";

const KybVerificationStatus = ({
  isKybVerified = false,
}: {
  isKybVerified?: boolean;
}) => {
  return (
    <div className="w-full rounded-sm shadow-sm p-5 space-y-5 border ">
      <div className="flex items-center gap-2">
        {isKybVerified ? (
          <CheckCircle className="text-green-500" />
        ) : (
          <CircleAlert className="text-red-500" />
        )}
        <h1 className="font-semibold">KYB Verification</h1>
      </div>
      <p>
        {isKybVerified
          ? "KYB verification is completed"
          : "KYB verification is pending ."}
      </p>
      <Badge className={clsx(isKybVerified ? "bg-green-500" : "bg-red-500")}>
        {isKybVerified ? "Verified" : "Not Verified"}
      </Badge>
    </div>
  );
};

export default KybVerificationStatus;
