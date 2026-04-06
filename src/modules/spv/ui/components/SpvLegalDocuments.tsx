import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, ExternalLink, Eye, FileText, Shield } from "lucide-react";

type Document = {
  name: string;
  url: string;
};

type LegalDocuments = {
  llcOperatingAgreement: Document | null;
  articlesOfAssociation: Document | null;
  memorandumOfAssociation: Document | null;
  otherDocuments: Document | null;
};

type SpvLegalDocumentsProps = {
  legalDocuments: LegalDocuments;
};

const SpvLegalDocuments: React.FC<SpvLegalDocumentsProps> = ({
  legalDocuments,
}) => {
  const documents = [
    {
      name: "LLC Operating Agreement",
      document: legalDocuments.llcOperatingAgreement,
    },
    {
      name: "Articles of Association",
      document: legalDocuments.articlesOfAssociation,
    },
    {
      name: "Memorandum of Association",
      document: legalDocuments.memorandumOfAssociation,
    },
  ].filter((doc) => doc.document);

  return (
    <Card className="rounded-2xl shadow-sm ">
      <div className="flex items-center gap-3 ml-6">
        <div className="p-3 rounded-xl bg-orange-100 text-orange-600">
          <Shield size={20} />
        </div>
        <h2 className="text-lg font-semibold text-gray-900">Legal Documents</h2>
      </div>

      <CardContent>
        <div className="space-y-4">
          {documents.map((doc, index) => (
            <div
              key={index}
              className="
          flex items-center justify-between
          rounded-2xl border border-gray-200
          bg-white p-5
          hover:shadow-sm transition
          hover:bg-gray-50" >
              <div className="flex items-center gap-4 min-w-0">
                <div className="p-3 bg-gray-100 rounded-xl shrink-0">
                  <FileText size={20} className="text-gray-400" />
                </div>
                <div className="min-w-0">
                  <p className="text-base font-semibold text-gray-900 leading-tight truncate">
                    {doc.name}
                  </p>

                  <p className="text-xs uppercase tracking-wide text-gray-400 mt-1 truncate">
                    {doc.document?.name || "No document uploaded"}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1 text-gray-400 ">
                <Button
                  onClick={() => window.open(doc.document?.url, "_blank")}
                  className="hover:text-primary transition bg-white  text-gray-400 p-2 rounded-md hover:bg-gray-50"
                >
                  <ExternalLink size={18} />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default SpvLegalDocuments;
