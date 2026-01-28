import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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
    <Card>
      <CardHeader>
        <CardTitle>Basic Information</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <p className="text-sm text-muted-foreground mb-1">SPV/LLC Name</p>
            <p className="font-medium">{name}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-1">SPV Type</p>
            <p className="font-medium">{type}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-1">Jurisdiction</p>
            <p className="font-medium">{jurisdiction}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-1">Currency</p>
            <p className="font-medium">{currency}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-1">Formation Date</p>
            <p className="font-medium">{formatDate(formationDate)}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SpvBasicInfo;
