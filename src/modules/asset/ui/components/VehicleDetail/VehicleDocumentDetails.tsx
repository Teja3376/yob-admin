import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Shield,
  Building2,
  FileText,
  ExternalLink,
} from "lucide-react";

import Link from "next/link";

interface VehicleDocumentDetailsProps {
  vehicle: {
    EvaluationCertificates?: {
      name: string;
      url: string;
    }[];

    InsuranceCertificates?: {
      name: string;
      url: string;
    }[];

    Notarised?: {
      name: string;
      url: string;
    }[];

    omologationDocuments?: {
      name: string;
      url: string;
    }[];

    proofOfOriginDocuments?: {
      name: string;
      url: string;
    }[];

    registrationDocuments?: {
      name: string;
      url: string;
    }[];
  };
}

export default function VehicleDocumentDetails({
  vehicle,
}: VehicleDocumentDetailsProps) {
  const documents = [
    ...(vehicle?.EvaluationCertificates || []).map(
      (doc) => ({
        category: "Evaluation Certificate",
        ...doc,
      })
    ),

    ...(vehicle?.InsuranceCertificates || []).map(
      (doc) => ({
        category: "Insurance Certificate",
        ...doc,
      })
    ),

    ...(vehicle?.Notarised || []).map((doc) => ({
      category: "Notarised Document",
      ...doc,
    })),

    ...(vehicle?.omologationDocuments || []).map(
      (doc) => ({
        category: "Homologation Document",
        ...doc,
      })
    ),

    ...(vehicle?.proofOfOriginDocuments || []).map(
      (doc) => ({
        category: "Proof of Origin",
        ...doc,
      })
    ),

    ...(vehicle?.registrationDocuments || []).map(
      (doc) => ({
        category: "Registration Document",
        ...doc,
      })
    ),
  ];

  return (
    <div className="space-y-6">
      {/* Top Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <InfoCard
          icon={<Shield size={20} />}
          title="Evaluation"
          subtitle={`${vehicle?.EvaluationCertificates?.length || 0} Documents`}
        />

        <InfoCard
          icon={<Building2 size={20} />}
          title="Insurance"
          subtitle={`${vehicle?.InsuranceCertificates?.length || 0} Documents`}
        />

        <InfoCard
          icon={<FileText size={20} />}
          title="Registration"
          subtitle={`${vehicle?.registrationDocuments?.length || 0} Documents`}
        />
      </div>

      {/* Documents */}
      <Card className="rounded-2xl shadow-sm">
        <CardHeader>
          <CardTitle>
            Due Diligence Documents
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          {documents.length > 0 ? (
            documents.map((doc, i) => (
              <div key={`${doc.name}-${i}`}>
                <DocumentRow doc={doc} />

                {i !== documents.length - 1 && (
                  <div className="border-t border-gray-200 mt-4" />
                )}
              </div>
            ))
          ) : (
            <div className="text-sm text-gray-500">
              No documents available.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

function InfoCard({
  icon,
  title,
  subtitle,
}: {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
}) {
  return (
    <div className="flex items-center gap-4 border rounded-2xl p-5 bg-white">
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

function DocumentRow({
  doc,
}: {
  doc: {
    category: string;
    name: string;
    url: string;
  };
}) {
  return (
    <div className="flex items-center justify-between gap-4">
      <div className="flex items-center gap-4 min-w-0">
        <div className="p-3 bg-gray-100 rounded-lg">
          <FileText
            size={18}
            className="text-gray-600"
          />
        </div>

        <div className="min-w-0">
          <p className="font-medium text-gray-900">
            {doc.category}
          </p>

          <p className="text-xs text-gray-500 truncate">
            {doc.name}
          </p>
        </div>
      </div>

      <Link
        href={doc.url}
        target="_blank"
        className="flex items-center gap-1 text-orange-500 text-sm font-medium hover:underline shrink-0"
      >
        View
        <ExternalLink size={14} />
      </Link>
    </div>
  );
}