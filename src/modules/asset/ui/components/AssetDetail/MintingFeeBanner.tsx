import { LottieAnimation } from "@/components/LottieFile"
import { Button } from "@/components/ui/button"
import mintingFeeAnimation from "../../../../../../public/lottie/Alert1.json"

export function MintingFeeBanner({
  onRequestClick,
  requested,
}: {
  onRequestClick: () => void
  requested?: boolean
}) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-primary bg-primary/5 px-4 py-3 mt-5">
      <div className="text-sm font-medium text-primary flex items-center gap-2">
              <LottieAnimation animationData={mintingFeeAnimation} className="h-10 w-10"/>

        {!requested ? (
          <>
            To activate this asset, request the token minting fee. The issuer will be notified to complete the payment.
          </>
        ) : (
          <>
            Minting fee request sent. Waiting for user to complete the payment.
          </>
        )}
      </div>

      {!requested ? (
        <Button
          size="sm"
          className="bg-orange-500 hover:bg-orange-600 text-white"
          onClick={onRequestClick}
        >
          Request Fee
        </Button>
      ) : (
        <span className="text-xs font-medium text-green-600">
          Requested
        </span>
      )}
    </div>
  )
}