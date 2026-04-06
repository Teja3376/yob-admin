import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Landmark } from "lucide-react";

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
  const formatAccount = (acc: string) => {
    if (!acc) return "•••• •••• •••• 0000";
    return `•••• •••• •••• ${acc.slice(-4)}`;
  };
  return (
    <Card className="rounded-2xl shadow-sm p-6">
      <div className="flex items-center gap-3">
        <div className="p-3 rounded-xl bg-orange-100 text-orange-600">
          <Landmark size={20} />
        </div>
        <h2 className="text-lg font-semibold text-gray-900">Escrow Bank</h2>
      </div>

      <CardContent className="p-0">
        <div
          className="rounded-2xl p-6 text-white bg-linear-to-br from-[#0f1c3f] to-[#0a1228] shadow-lg">
          <div className="flex justify-between items-start mb-6">
            <h3 className="text-lg font-semibold">
              {escrowBankDetails?.bankName || "HDFC"}
            </h3>

            <div className="w-12 h-8 rounded-md bg-white/10" />
          </div>
          <div className="mb-6">
            <p className="text-xs text-gray-300 uppercase tracking-wide">
              Account Number
            </p>
            <p className="text-lg tracking-widest mt-2">
              {formatAccount(escrowBankDetails?.accountNumber)}
            </p>
          </div>
          <div className="flex justify-between">
            <div>
              <p className="text-xs text-gray-300 uppercase">IFSC Code</p>
              <p className="font-semibold mt-1">
                {escrowBankDetails?.ifscCode || "HDFC0001234"}
              </p>
            </div>

            <div>
              <p className="text-xs text-gray-300 uppercase">Type</p>
              <p className="font-semibold mt-1">
                {escrowBankDetails?.accountType || "Current"}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SpvEscrowBankDetails;
