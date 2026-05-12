import { Button } from "@/components/ui/button";
import { CardContent, CardHeader, CardTitle, Card } from "@/components/ui/card";
import { formatCurrencyWithLocale } from "@/lib/formatCurrency";
import { ExternalLink } from "lucide-react";

const mockData = {
  tokenInformation: {
    tokenSymbol: "MCL",

    tokenPrice: 250,

    currency: "USD",

    tokenSupply: 100000,

    minimumTokensToBuy: 10,
  },

  blockchain: {
    assetAddress:
      "0x8A7d3F5c6B9e2A4d7F8c1234567890ABCDEF1234",

    orderManagerAddress:
      "0x9F2d7A1b3C4e5D6f7A8B9876543210FEDCBA5678",
  },
};

export function VehicleInvestmentDetails() {
    const data=mockData;
  const token = data?.tokenInformation;
  const blockchain = data?.blockchain;
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card className="rounded-2xl shadow-sm">
        <CardHeader>
          <CardTitle>Tokenomics</CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          <Row label="Token Symbol" value={token?.tokenSymbol} highlight />

          <div className="border-t border-gray-200" />

          <Row
            label="Token Price"
            value={formatCurrencyWithLocale(token?.tokenPrice, token?.currency)}
          />

          <div className="border-t border-gray-200" />

          <Row
            label="Total Supply"
            value={token?.tokenSupply?.toLocaleString()}
          />

          <div className="border-t border-gray-200" />

          <Row
            label="Min. Investment"
            value={`${token?.minimumTokensToBuy} Tokens`}
          />
        </CardContent>
      </Card>

      <Card className="rounded-2xl shadow-sm">
        <CardHeader>
          <CardTitle>Blockchain Details</CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="bg-gray-100 rounded-xl p-4 flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500 uppercase">ASSET ADDRESS</p>

              <p className="text-sm text-orange-600 break-all">
                {blockchain?.assetAddress
                  ? `${blockchain.assetAddress.slice(0, 8)}...${blockchain.assetAddress.slice(-4)}`
                  : "N/A"}
              </p>
            </div>

            <Button className="bg-gray-100 text-gray-500 hover:text-black hover:bg-gray-100">
              <ExternalLink size={16} />
            </Button>
          </div>

          <div className="bg-gray-100 rounded-xl p-4 flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500 uppercase">ORDER MANAGER</p>

              <p className="text-sm text-orange-600 break-all">
                {blockchain?.orderManagerAddress
                  ? `${blockchain.orderManagerAddress.slice(0, 8)}...${blockchain.orderManagerAddress.slice(-4)}`
                  : "N/A"}
              </p>
            </div>

            <Button className="bg-gray-100 text-gray-500 hover:text-black hover:bg-gray-100">
              <ExternalLink size={16} />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function Row({ label, value, highlight }: any) {
  return (
    <div className="flex justify-between items-center">
      <p className="text-gray-500">{label}</p>
      <p
        className={`font-semibold ${
          highlight ? "text-orange-500" : "text-gray-900"
        }`}
      >
        {value || "-"}
      </p>
    </div>
  );
}
