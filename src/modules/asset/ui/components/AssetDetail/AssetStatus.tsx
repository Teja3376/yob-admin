import LottieAnimation from "@/components/common/LottieAnimation";
import { Badge } from "@/components/ui/badge";
import FailureAnimation from "../../../../../../public/lotteanimation/Failure.json";
import SuccessAnimation from "../../../../../../public/lotteanimation/Success.json";
import { formatDate } from "@/lib/utils";

const AssetStatus = ({
  status,
  reason,
  date,
}: {
  status: string;
  reason?: string;
  date?: string;

}) => {
  return (
    <>
    <div className="flex-1  space-y-4 mt-4">
      {status === "approved" && (
        <>
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-red-100">
                <LottieAnimation
                  animationData={FailureAnimation}
                  style={{ width: 40, height: 40 }}
                />
              </div>

              <div className="flex gap-3">
                <h2 className="text-lg font-semibold text-gray-900">
                  Asset Approved
                </h2>
                <Badge className="bg-green-100 text-green-700">Approved</Badge>
              </div>
            </div>

            <p className="text-sm text-muted-foreground">
              This Asset has been successfully approved.
            </p>
          </div>

          <Badge className="bg-green-100 text-green-700">Approved</Badge>
        </>
      )}

      {status === "rejected" && (
        <div className="bg-red-50/40 border rounded-2xl p-5 shadow-sm">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-red-100">
                <LottieAnimation
                  animationData={FailureAnimation}
                  style={{ width: 40, height: 40 }}
                />
              </div>

              <div className="flex gap-3">
                <h2 className="text-lg font-semibold text-gray-900">
                  Asset Rejected
                </h2>
                <Badge className="bg-red-100 text-red-700">Rejected</Badge>
              </div>
            </div>
            <p className="text-xs text-black whitespace-nowrap border-2 p-2 rounded-lg bg-red-400">
              Updated At {formatDate(date)}
            </p>
          </div>
          <div className="flex flex-1 text-sm text-gray-600 ml-15 ">
            <p>
              This asset has been rejected-
              {reason && (
                <span className="text-red-700 font-medium ml-1">
                  because {reason}
                </span>
              )}
            </p>
          </div>
        </div>
      )}

      {status === "active" && (
        <div className="bg-green-50/40 border rounded-2xl p-5 shadow-sm">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-green-100">
                <LottieAnimation
                  animationData={SuccessAnimation}
                  style={{ width: 40, height: 40 }}
                />
              </div>

              <div className="flex gap-3 items-center">
                <h2 className="text-lg font-semibold text-gray-900">
                  Asset Active
                </h2>
                <Badge className="bg-green-100 text-green-700">Active</Badge>
              </div>
            </div>

            <div className="flex items-center gap-4 mt-3">
              <p className="text-sm text-muted-foreground">
                Updated At {formatDate(date)}
              </p>
            </div>
          </div>

          <div className="flex flex-1 text-sm text-gray-600 ml-15">
            <p>
              This asset is currently active and available for investment.
            </p>
          </div>
        </div>
      )}
    </div>
    </>
  );
};

export default AssetStatus;
