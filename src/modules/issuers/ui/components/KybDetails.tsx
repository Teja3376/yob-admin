import { Badge } from "@/components/ui/badge";
import clsx from "clsx";
import {
  Briefcase,
  Calendar,
  IdCard,
  MapIcon,
  ShieldCheck,
  ShieldX,
} from "lucide-react";

const KybDetails = ({
  kybStatus,
  submissionDate,
  registrationNo,
  businessName,
  legalAddress,
}: {
  kybStatus: boolean;
  submissionDate: string;
  businessName: string;
  registrationNo: string;
  legalAddress: {
    street: string;
    state: string;
    city: string;
    postCode: string;
    country: string;
  };
}) => {
  const address = [
    legalAddress?.street,
    legalAddress?.state,
    legalAddress?.city,
    legalAddress?.country,
    legalAddress?.postCode,
  ]
    .filter(Boolean)
    .join(", ");

  return (
    <div className="w-full h-full rounded-sm shadow-sm p-5 space-y-5 border">
      <h1 className="font-semibold">Kyb & Compliance</h1>

      <div className="grid grid-cols-[180px_1fr] gap-y-3 items-center">
        <p className="text-gray-600">Kyb Verified</p>
        <div className="flex items-center gap-3">
          {kybStatus ? (
            <ShieldCheck size={15} className="text-green-600" />
          ) : (
            <ShieldX size={15} className="text-red-600" />
          )}
          <p
            className={clsx("font-medium", {
              "text-green-600": kybStatus,
              "text-red-600": !kybStatus,
            })}
          >
            {kybStatus ? "Verified" : "Not Verified"}
          </p>
        </div>
        <p className="text-gray-600">Submission Date</p>
        <div className="flex items-center gap-3">
          <Calendar size={15} className="text-primary" />
          <p className="font-medium">{submissionDate||"-"}</p>
        </div>
        <p className="text-gray-600">Business Name</p>
        <div className="flex items-center gap-3">
          <Briefcase size={15} className="text-primary" />
          <p className="font-medium">{businessName || "-"}</p>
        </div>
        <p className="text-gray-600">Registration No</p>
        <div className="flex items-center gap-3">
          <IdCard size={15} className="text-primary" />
          <p className="font-medium">{registrationNo || "-"}</p>
        </div>
        <p className="text-gray-600">Legal Address</p>
        <div className="flex items-center gap-3">
          <MapIcon size={15} className="text-primary" />
          <p className="font-medium">{address || "-"}</p>
        </div>{" "}
      </div>
    </div>
  );
};

export default KybDetails;
