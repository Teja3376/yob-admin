import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type MemoAndTerms = {
  investmentMemorandum: string;
  termsAndConditions: string;
  riskFactor: string;
  investmentStrategy: string;
};

type SpvMemoTermsProps = {
  memoAndTerms: MemoAndTerms;
};

const SpvMemoTerms: React.FC<SpvMemoTermsProps> = ({ memoAndTerms }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Memo & Terms</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="font-semibold mb-2">Investment Memorandum</h3>
          <p className="text-sm text-muted-foreground line-clamp-3">
            {memoAndTerms.investmentMemorandum}
          </p>
        </div>
        <div>
          <h3 className="font-semibold mb-2">Terms & Conditions</h3>
          <p className="text-sm text-muted-foreground line-clamp-3">
            {memoAndTerms.termsAndConditions}
          </p>
        </div>
        <div>
          <h3 className="font-semibold mb-2">Risk Factor</h3>
          <p className="text-sm text-muted-foreground line-clamp-3">
            {memoAndTerms.riskFactor}
          </p>
        </div>
        <div>
          <h3 className="font-semibold mb-2">Investment Strategy</h3>
          <p className="text-sm text-muted-foreground line-clamp-3">
            {memoAndTerms.investmentStrategy}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default SpvMemoTerms;
