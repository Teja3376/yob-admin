import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowBigLeftDashIcon, Briefcase, DollarSign, FileText, Shield, ShieldCheck, TrendingUp } from "lucide-react";
import Document from "next/document";

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
  const items = [
          {
            title: "Investment Memorandum",
            value: memoAndTerms.investmentMemorandum,
            icon: <FileText/>,
          },
          {
            title: "Terms & Conditions",
            value: memoAndTerms.termsAndConditions,
            icon: <ShieldCheck/>,
          },
          {
            title: "Risk Factor",
            value: memoAndTerms.riskFactor,
            icon: <Shield/>,
          },
          {
            title: "Investment Strategy",
            value: memoAndTerms.investmentStrategy,
            icon: <TrendingUp/>,
          },
        ];
  return (
    <Card className="rounded-2xl shadow-sm">
      <div className="flex items-center gap-3 mb-3 ml-6">
        <div className="p-3 rounded-xl bg-orange-100 text-primary">
          <FileText size={22} />
        </div>
        <h2 className="text-lg font-semibold text-gray-900">Memo & Terms</h2>
      </div>
      <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {items.map((item) => (
          <div
            key={item.title}
            className="rounded-xl border border-slate-200 bg-gray-50 p-4 shadow-sm transition hover:shadow-md hover:border-orange-100 hover:bg-white"
          >
            <div className="flex items-center gap-2 mb-3 ">
              <span className="h-12 w-12 grid place-items-center rounded-xl bg-[#ffff] text-primary text-xs shadow-md p-2">
                {item.icon}
              </span>
              <h3 className="text-base font-semibold">{item.title}</h3>
            </div>
            <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
              {item.value}
            </p>
            <button className="text-sm font-semibold text-primary hover:text-orange-700">
              Read Full Document
            </button>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default SpvMemoTerms;
