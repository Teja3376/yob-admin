import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Shield, Building2, FileText, ExternalLink} from "lucide-react";
import Link from "next/link";

interface DocumentDetailsProps {
  data: {
    legalAdivisory: any;
    assetManagementCompany: any;
    brokerage: any;
    documents: any[];
  };
}

export default function DocumentDetails({ data }: DocumentDetailsProps) {
  const legal = data?.legalAdivisory;
  const assetMgmt = data?.assetManagementCompany;
  const brokerage = data?.brokerage;
  const documents = data?.documents || [];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        <InfoCard
          icon={<Shield size={20} />}
          title="Legal Advisory"
          subtitle={legal?.name}
        />

        <InfoCard
          icon={<Building2 size={20} />}
          title="Asset Management"
          subtitle={assetMgmt?.name}
        />

        <InfoCard
          icon={<FileText size={20} />}
          title="Brokerage Agreement"
          subtitle={brokerage?.name}
        />

      </div>
      <Card className="rounded-2xl shadow-sm">
        <CardHeader>
          <CardTitle>Due Diligence Documents</CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          
          {documents.map((doc: any, i: number) => (
            <div key={doc._id}>
              <DocumentRow doc={doc} />
              {i !== documents.length - 1 && (
                <div className="border-t border-gray-200 mt-4" />
              )}
            </div>
          ))}

        </CardContent>
      </Card>
    </div>
  );
}

function InfoCard({ icon, title, subtitle }: any) {
  return (
    <div className="flex items-center gap-4 border rounded-2xl p-5">
      
      <div className="p-3 rounded-xl bg-orange-100 text-orange-600">
        {icon}
      </div>

      <div>
        <p className="font-semibold text-gray-900">
          {title}
        </p>
        <p className="text-sm text-gray-500">
          {subtitle || "-"}
        </p>
      </div>

    </div>
  );
}

function DocumentRow({ doc }: any) {
  const fileUrl = doc?.document?.url;
  const fileName = doc?.document?.name;

  return (
    <div className="flex items-center justify-between">
 
      <div className="flex items-center gap-4">
        
        <div className="p-3 bg-gray-100 rounded-lg">
          <FileText size={18} className="text-gray-600" />
        </div>

        <div>
          <p className="font-medium text-gray-900">
            {doc?.name || fileName}
          </p>

          <p className="text-xs text-gray-500">
            {fileName}
          </p>
        </div>

      </div>
      <Link
        href={fileUrl}
        target="_blank"
        className="flex items-center gap-1 text-orange-500 text-sm font-medium hover:underline"
      >
        View
        <ExternalLink size={14} />
      </Link>

    </div>
  );
}