'use client';

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Card, CardContent } from '@/components/ui/card';
import { AlertTriangle, HelpCircle, DollarSign } from 'lucide-react';

interface RiskFactor {
  _id: string;
  name: string;
  description: string;
}

interface RiskDisclosure {
  _id: string;
  name: string;
  description: string;
}

interface AdditionalTax {
  _id: string;
  name: string;
  value: number;
}

interface RiskAndAdditionalInfoProps {
  riskFactors: RiskFactor[];
  riskDisclosures: RiskDisclosure[];
  additionalTaxes: AdditionalTax[];
  faqs: Array<{
    _id: string;
    question: string;
    answer: string;
  }>;
}

export function RiskAndAdditionalInfo({
  riskFactors,
  riskDisclosures,
  additionalTaxes,
  faqs,
}: RiskAndAdditionalInfoProps) {
  return (
    <div className="space-y-8">
      {/* Risk Factors */}
      {riskFactors && riskFactors.length > 0 && (
        <div>
          <h2 className="mb-4 flex items-center gap-2 text-md font-medium">
            <AlertTriangle className="h-6 w-6 text-red-600" />
            Risk Factors
          </h2>
          <div className="space-y-4">
            {riskFactors.map((risk) => (
              <Card key={risk._id} className="border-red-100">
                <CardContent className="">
                  <h3 className="font-semibold text-gray-900">{risk.name}</h3>
                  <p className="mt-2 text-sm text-gray-600">{risk.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Risk Disclosures */}
      {riskDisclosures && riskDisclosures.length > 0 && (
        <div>
          <h2 className="mb-4 flex items-center gap-2 text-md font-medium">
            <AlertTriangle className="h-6 w-6 text-red-600" />
            Risk Disclosures
          </h2>
          <div className="rounded-lg border border-red-200 bg-red-50 p-6">
            <div className="space-y-4">
              {riskDisclosures.map((disclosure) => (
                <div key={disclosure._id} className="border-b border-red-100 pb-4 last:border-0">
                  <h3 className="font-semibold text-red-900">{disclosure.name}</h3>
                  <p className="mt-2 text-sm text-red-800">{disclosure.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Additional Taxes */}
      {additionalTaxes && additionalTaxes.length > 0 && (
        <div>
          <h2 className="mb-6 flex items-center gap-2 text-2xl font-bold">
            <DollarSign className="h-6 w-6" />
            Additional Taxes & Fees
          </h2>
          <Card>
            <CardContent className="">
              <div className="space-y-3">
                {additionalTaxes.map((tax) => (
                  <div key={tax._id} className="flex items-center justify-between border-b last:border-0">
                    <span className="text-gray-600">{tax.name}</span>
                    <span className="font-semibold text-gray-900">{tax.value}%</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* FAQs */}
      {faqs && faqs.length > 0 && (
        <div>
          <h2 className="mb-4 flex items-center gap-2 text-md font-medium">
            <HelpCircle className="h-6 w-6" />
            Frequently Asked Questions
          </h2>
          <Accordion type="single" collapsible={true} className="space-y-4 border px-4 rounded-lg">
            {faqs.map((faq) => (
              <AccordionItem key={faq._id} value={faq._id}>
                <AccordionTrigger className="pt-6">
                  <h3 className="font-semibold text-gray-900">{faq.question}</h3>
                </AccordionTrigger>
                <AccordionContent className="mt-3 text-sm text-gray-600">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      )}
    </div>
  );
}
