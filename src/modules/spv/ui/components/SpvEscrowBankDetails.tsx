import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type EscrowBankDetails = {
  bankName: string;
  accountType: string;
  accountNumber: string;
  routingNumber?: string;
  ifscCode?: string;
};

type SpvEscrowBankDetailsProps = {
  escrowBankDetails: EscrowBankDetails;
};

const SpvEscrowBankDetails: React.FC<SpvEscrowBankDetailsProps> = ({
  escrowBankDetails,
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Escrow Bank Details</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-6">
          <div>
            <p className="text-sm text-muted-foreground mb-1">Bank Name</p>
            <p className="font-medium">{escrowBankDetails.bankName}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-1">Account Type</p>
            <p className="font-medium">{escrowBankDetails.accountType}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-1">Account Number</p>
            <p className="font-medium">{escrowBankDetails.accountNumber}</p>
          </div>
          {escrowBankDetails.routingNumber && (
            <div>
              <p className="text-sm text-muted-foreground mb-1">
                Routing Number
              </p>
              <p className="font-medium">{escrowBankDetails.routingNumber}</p>
            </div>
          )}
          {
            <div>
              <p className="text-sm text-muted-foreground mb-1">IFSC Code</p>
              <p className="font-medium">{escrowBankDetails.ifscCode}</p>
            </div>
          }
        </div>
      </CardContent>
    </Card>
  );
};

export default SpvEscrowBankDetails;
