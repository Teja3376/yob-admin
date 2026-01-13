import { Badge } from "@/components/ui/badge";
import clsx from "clsx";
import React from "react";

const IssuerInfo = ({
  firstName,
  lastName,
  isEmailVerified,
  email,
}: {
  firstName: string;
  lastName: string;
  isEmailVerified: string;
  email: string;
}) => {
  return (
    <div className="w-full rounded-sm shadow-sm p-5 space-y-5 border">
      <h1 className="font-semibold">Issuer Information</h1>
      <div className="grid grid-cols-2 gap-2 gap-y-5">
        <div>
          <p className="text-sm text-muted-foreground">First Name</p>
          <h1 className="font-semibold mt-1">{firstName}</h1>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Last Name</p>
          <h1 className="font-semibold mt-1">{lastName}</h1>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Email</p>
          <h1 className="font-semibold mt-1">{email}</h1>
        </div>

       
      </div>
    </div>
  );
};

export default IssuerInfo;
