import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Briefcase, DollarSign, Globe } from "lucide-react";
import Document from "next/document";

type SpvBasicInfoProps = {
  name: string;
  type: string;
  jurisdiction: string;
  currency: string;
  formationDate: string;
};

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

const SpvBasicInfo: React.FC<SpvBasicInfoProps> = ({
  name,
  type,
  jurisdiction,
  currency,
  formationDate,
}) => {
  return (
    <Card className="rounded-2xl shadow-sm p-5">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-3 rounded-xl bg-orange-100 text-orange-600">
          <Briefcase size={20} />
        </div>
        <h2 className="text-lg font-semibold text-gray-900">
          Basic Information
        </h2>
      </div>
      <CardContent className="p-0">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
          <div className="bg-gray-50 rounded-xl p-5 border border-gray-100">
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
              SPV/LLC Name
            </p>

            <div className="flex items-center gap-2 mt-2">
              <p className="font-semibold text-gray-900 text-sm">{name}</p>
            </div>
          </div>

          <div className="bg-gray-50 rounded-xl p-5 border border-gray-100">
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
              SPV TYPE
            </p>

            <div className="flex items-center gap-2 mt-2">
              <p className="font-semibold text-gray-900 text-sm">{type}</p>
            </div>
          </div>

          <div className="bg-gray-50 rounded-xl p-5 border border-gray-100">
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
            JURISDICTION
            </p>

            <div className="flex items-center gap-2 mt-2">
              <p className="font-semibold text-gray-900 text-sm">{jurisdiction}</p>
            </div>
          </div>

          <div className="bg-gray-50 rounded-xl p-5 border border-gray-100">
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
             CURRENCY
            </p>

            <div className="flex items-center gap-2 mt-2">
              <p className="font-semibold text-gray-900 text-sm">{currency}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SpvBasicInfo;
