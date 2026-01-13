import { Badge } from "@/components/ui/badge";
import React from "react";

const AssetInfo = ({
  assetDescription,
  assetCategory,
}: {
  assetDescription: string;
  assetCategory: string;
}) => {
  return (
    <div className="w-full rounded-sm shadow-sm p-5 space-y-5 border">
      <h1 className="font-semibold">Asset Information</h1>
      <div className="space-y-5">
        <div>
          <p className="text-sm text-muted-foreground">Asset Category</p>
          <Badge className="font-semibold cursor-pointer bg-foreground/10 text-black border border-foreground mt-1">
            {assetCategory}
          </Badge>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Asset Description</p>
          <h1 className="text-sm mt-1">{assetDescription}</h1>
        </div>
      </div>
    </div>
  );
};

export default AssetInfo;
