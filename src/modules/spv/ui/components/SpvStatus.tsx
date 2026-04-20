import { formatDate } from "@/lib/utils";
import { Building, Building2, CheckCircle, CircleAlert, XCircle } from "lucide-react";

type SpvStatusProps = {
  data: any;
};

const SpvStatus = ({ data }: SpvStatusProps) => {
  return (
    <div className="relative">
      <div className="h-24 bg-slate-900 rounded-t-3xl relative">

        {data?.status === "Pending" && (
          <div className="flex gap-3 absolute top-3 right-3 px-3 py-1 rounded-full bg-yellow-100 text-yellow-800 text-md font-medium">
            <CircleAlert /> SPV Pending
          </div>
        )}
        {data?.status === "Active" && (
          <div className="flex gap-3 absolute top-3 right-3 px-3 py-1 rounded-full bg-green-100 text-green-800 text-md font-medium">
            <CheckCircle /> SPV Approved
          </div>
        )}
        {data?.status === "Rejected" && (

          <div className="flex gap-3 absolute top-3 right-3 px-3 py-1 rounded-full bg-red-100 text-red-800 text-md font-medium">
            <XCircle /> SPV Rejected
          </div>
        )}
      </div>

      <div className="relative mb-6 rounded-b-2xl border border-gray-200 bg-white px-6 pb-12 shadow-sm">
        <div className="absolute -top-8 left-6 h-20 w-20 rounded-2xl bg-white border-4  flex items-center justify-center shadow-md">
          <div className="p-2 rounded-lg bg-orange-100">
            <Building2 size={32} className="text-orange-600" />
          </div>
        </div>

        <div className="flex items-start justify-between pl-24">
          <div className="flex-1">
            <h2 className="text-xl font-bold text-gray-900">{data?.name}</h2>
            <p className="text-sm text-gray-500 mt-1">{data?.spvDescription}</p>
          </div>

          <div className="flex gap-8 ml-8">
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                Formation Date
              </p>
              <p className="text-sm font-semibold text-gray-900 mt-1">
                {formatDate(data?.formationDate)}
              </p>
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                Jurisdiction
              </p>
              <p className="text-sm font-semibold text-gray-900 mt-1">
                {data?.jurisdiction}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpvStatus;
