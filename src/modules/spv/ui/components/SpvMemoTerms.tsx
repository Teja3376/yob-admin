import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowBigLeftDashIcon, Briefcase, DollarSign, FileText, Shield, ShieldCheck, TrendingUp } from "lucide-react";
import Document from "next/document";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

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
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState<{ title: string; value: string } | null>(null);

  const handleReadFull = (title: string, value: string) => {
    setSelectedDocument({ title, value });
    setDialogOpen(true);
  };
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
            <Button
              className="bg-transparent text-sm font-semibold text-primary hover:text-primary hover:bg-transparent p-0 hover:underline"
              onClick={() => handleReadFull(item.title, item.value)}
            >
              Read Full Document
            </Button>
          </div>
        ))}
      </CardContent>
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="w-[80%] max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{selectedDocument?.title}</DialogTitle>
          </DialogHeader>
          <div className="whitespace-pre-wrap text-sm text-gray-700">
            {selectedDocument?.value}
          </div>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default SpvMemoTerms;
