import React from "react";

const IssuerApplicationInfo = ({
  applicationId,
  legalEntityName,
  countryOfIncorporation,
  email,
}: {
  applicationId: string;
  legalEntityName: string;
  countryOfIncorporation: string;
  email: string;
}) => {
  return (
    <div className="w-full rounded-sm shadow-sm p-5 space-y-5 border">
      <h1 className="font-semibold">Application Information</h1>
      <div className="grid grid-cols-2 gap-2 gap-y-5">
        <div>
          <p className="text-sm text-muted-foreground">Application ID</p>
          <h1 className="font-semibold mt-1">{applicationId}</h1>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Legal Entity Name</p>
          <h1 className="font-semibold mt-1">{legalEntityName}</h1>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">
            Country of Incorporation
          </p>
          <h1 className="font-semibold mt-1">{countryOfIncorporation}</h1>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Email</p>
          <h1 className="font-semibold mt-1">{email}</h1>
        </div>
      </div>
    </div>
  );
};

export default IssuerApplicationInfo;
