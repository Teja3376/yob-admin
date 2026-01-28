'use client';

import { Button } from '@/components/ui/button';
import { FileText, Download, Users } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

interface Document {
  _id: string;
  name: string;
  description: string;
  type: string;
  document: {
    name: string;
    url: string;
  };
}

interface Tenant {
  _id: string;
  name: string;
  rentPerSft: number;
  sftsAllocated: number;
  status: string;
  leasePeriod: number;
  lockInPeriod: number;
  type: string;
}

interface DocumentsAndTenantsProps {
  documents: Document[];
  tenants: Tenant[];
  currency: string;
}

export function DocumentsAndTenants({
  documents,
  tenants,
  currency,
}: DocumentsAndTenantsProps) {
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-8">
      {/* Tenants */}
      {tenants && tenants.length > 0 && (
        <div>
          <h2 className="mb-4 flex items-center gap-2 text-md font-medium">
            <Users className="h-6 w-6" />
            Tenants
          </h2>
          <div className="grid gap-4">
            {tenants.map((tenant) => (
              <Accordion type="single" collapsible={true} key={tenant._id} className="border rounded-lg p-4">
                <AccordionItem value={tenant._id}>
                  <AccordionTrigger>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          {tenant.name}
                        </h3>
                        <p className="mt-1 text-sm text-gray-600">
                          {tenant.type.charAt(0).toUpperCase() + tenant.type.slice(1)}
                        </p>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="flex items-end justify-between md:justify-end md:gap-8">
                      <div>
                        <p className="text-sm text-gray-600">Status</p>
                        <div className="mt-1">
                          <span
                            className={`inline-block px-3 py-1 text-xs font-semibold rounded ${getStatusColor(
                              tenant.status,
                            )}`}
                          >
                            {tenant.status.charAt(0).toUpperCase() + tenant.status.slice(1)}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 grid grid-cols-2 gap-4 border-t pt-6 md:grid-cols-4">
                    <div>
                      <p className="text-sm text-gray-600">Rent per SFT</p>
                      <p className="mt-1 font-semibold">
                        {currency} {tenant.rentPerSft.toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">SFTs Allocated</p>
                      <p className="mt-1 font-semibold">{tenant.sftsAllocated} SFT</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Lease Period</p>
                      <p className="mt-1 font-semibold">{tenant.leasePeriod} months</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Lock-in Period</p>
                      <p className="mt-1 font-semibold">{tenant.lockInPeriod} months</p>
                    </div>
                  </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            ))}
          </div>
        </div>
      )}

      {/* Documents */}
      {documents && documents.length > 0 && (
        <div>
            <h2 className="mb-6 flex items-center gap-2 text-md font-medium">
            <FileText className="h-6 w-6" />
            Documents
          </h2>
          <Accordion type="single" collapsible={true} className="space-y-4">
            {documents.map((doc) => (
              <div key={doc._id} className="rounded-lg border bg-white px-4">
                <AccordionItem value={doc._id} className="border-b-0">
                  <AccordionTrigger>
                    <div className="flex flex-col items-start gap-1">
                      <h3 className="font-semibold text-gray-900">{doc.name}</h3>
                      <p className="text-xs text-gray-500">{doc.type}</p>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="text-sm text-gray-600">{doc.description}</p>
                    <p className="mt-2 text-xs text-gray-500">File: {doc.document.name}</p>
                    <div className="mt-4">
                      <Button
                        variant="outline"
                        size="sm"
                        className="gap-2 whitespace-nowrap bg-transparent"
                        onClick={() => window.open(doc.document.url, '_blank')}
                      >
                        <Download className="h-4 w-4" />
                        Download
                      </Button>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </div>
            ))}
          </Accordion>
        </div>
      )}
    </div>
  );
}
