"use client"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

type MintingFeeDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void

  assetName: string
  location: string
  totalAssetValue: number
  totalTokens: number

  tier: string
  feePercent: number
  calculatedFee: number

  onConfirm: () => void
}

export function MintingFeeDialog({
  open,
  onOpenChange,
  assetName,
  location,
  totalAssetValue,
  totalTokens,
  tier,
  feePercent,
  calculatedFee,
  onConfirm,
}: MintingFeeDialogProps) {
  const formatINR = (value: number) =>
    `₹${value.toLocaleString("en-IN")}`

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md rounded-2xl px-0 py-4">
        <DialogHeader className="px-3">
          <DialogTitle className="text-lg font-semibold">
            Request Token Minting Fee
          </DialogTitle>
        </DialogHeader>
        <hr />

        <div className="space-y-4 text-sm px-3">
          {/* Asset Info */}
          <div className="space-y-1">
            <p>
              <span className="text-muted-foreground">Asset:</span>{" "}
              <span className="font-medium">{assetName}</span>
            </p>
            <p>
              <span className="text-muted-foreground">Location:</span>{" "}
              {location}
            </p>
            <p>
              <span className="text-muted-foreground">
                Total Asset Value:
              </span>{" "}
              {formatINR(totalAssetValue)}
            </p>
            <p>
              <span className="text-muted-foreground">
                Total Tokens to Mint:
              </span>{" "}
              {totalTokens.toLocaleString()}
            </p>
          </div>

          <hr />

          {/* Fee Info */}
          <div className="space-y-1">
            <p>
              <span className="text-muted-foreground">
                Applicable Tier:
              </span>{" "}
              {tier}
            </p>
            <p className="flex justify-between">
              <span className="text-muted-foreground">
                Minting Fee:
              </span>
              <span>
                {feePercent}%{" "}
                <span className="text-muted-foreground">
                  ({formatINR(calculatedFee)})
                </span>
              </span>
            </p>

            <p className="flex justify-between font-semibold text-green-600">
              <span>Calculated Fee Amount:</span>
              <span>{formatINR(calculatedFee)}</span>
            </p>

            <p className="text-xs text-muted-foreground mt-2">
              Fee is determined based on asset valuation tiers.
            </p>
          </div>
        </div>

        <DialogFooter className="flex gap-2 sm:justify-end px-3">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>

          <Button
            className="bg-primary text-white"
            onClick={onConfirm}
          >
            Request Payment
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}