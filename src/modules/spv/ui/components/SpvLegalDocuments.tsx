import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Eye, FileText } from "lucide-react";

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
    <Card>
      <CardHeader>
        <CardTitle>Legal Documents</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {documents.map((doc, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 border rounded-md hover:bg-gray-50"
            >
              <div className="flex items-center gap-3">
                <FileText size={20} className="text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">{doc.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {doc.document?.name}
                  </p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => window.open(doc.document?.url, "_blank")}
              >
                <Eye size={18} />
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default SpvLegalDocuments;
