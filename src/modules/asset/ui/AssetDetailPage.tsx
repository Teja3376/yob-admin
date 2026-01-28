'use client';

// import { AssetDetailHeader } from '@/components/asset-detail-header';
// import { PropertyOverview } from '@/components/property-overview';
// import { FinancialDetails } from '@/components/financial-details';
// import { AmenitiesAndFeatures } from '@/components/amenities-features';
// import { DocumentsAndTenants } from '@/components/documents-tenants';
// import { RiskAndAdditionalInfo } from '@/components/risk-additional-info';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AssetDetailHeader } from '../components/AssetDetail/AssetdetailHeader';
import { PropertyOverview } from '../components/AssetDetail/Propertyoverview';
import { FinancialDetails } from '../components/AssetDetail/FinancialDetails';
import { AmenitiesAndFeatures } from '../components/AssetDetail/AmenitiesAndFeatures';
import { DocumentsAndTenants } from '../components/AssetDetail/DocumentsAndTenants';
import { RiskAndAdditionalInfo } from '../components/AssetDetail/RiskAndAdditionalInfo';

// // Mock data - replace with your actual data source
const assetData = {
  _id: '69786deeac304d3494bcae7e',
  name: 'Raju gari Kota',
  country: 'IN',
  state: 'AP',
  city: 'Bhimavaram',
  landmark: 'Near Rail Way Station',
  status: 'pending',
  class: 'real-estate',
  category: 'commercial',
  style: 'villa',
  stage: 'fully-rented',
  currency: 'USD',
  totalNumberOfSfts: 1000,
  pricePerSft: 200,
  basePropertyValue: 200000,
  totalPropertyValueAfterFees: 220000,
  about:
    'Raju Gari Kota is a culturally rich and historically inspired property that reflects the essence of traditional architecture blended with modern functionality.',
  investmentPerformance: {
    targetCapitalAppreciation: 2,
    numberOfYears: 0,
    netInvestmentMultiplier: 0,
    estimatedSalePriceAsPerLockInPeriod: 0,
    capitalGains: 0,
    capitalGainsTax: 0,
    estimatedReturnsAsPerLockInPeriod: 2,
    interestRateonReserves: 2,
    netRentalYield: 10777.78,
    grossRentalYield: 11111.11,
    irr: 100,
    moic: 217.68336296296295,
    latestPropertyValue: 0,
    latestPropertyValueDate: null,
  },
  rentalInformation: {
    rentPerSft: 10000,
    vacancyRate: 80,
    grossMonthlyRent: 2000000,
    netMonthlyRent: 1940000,
    grossAnnualRent: 24000000,
    netAnnualRent: 23280000,
    expenses: {
      monthlyExpenses: 60000,
      annualExpenses: 720000,
    },
    netCashFlow: 23280000,
  },
  investorRequirementsAndTimeline: {
    investorAcreditation: 'open-to-all',
    kycOrAmlRequirements: 'required-for-all',
    lockupPeriod: 12,
    lockupPeriodType: 'months',
    rentalYield: 0,
    distributionStartDate: '2026-01-15T18:30:00.000Z',
    distributionEndDate: '2026-01-30T18:30:00.000Z',
  },
  amenities: [
    {
      _id: '6978c83f2dc3a8a1479a8cdc',
      name: 'Pet Park & Wash Station',
      description: 'fsfff',
      image:
        'https://storage.googleapis.com/mgm_dev/asset/69786deeac304d3494bcae7e/1769523259501-Gemini_Generated_Image_5wv6ol5wv6ol5wv6.png',
      status: true,
    },
    {
      _id: '6978d2fd2dc3a8a1479a8d86',
      name: 'Swimming Pool',
      description: 'ddsfdsfs',
      image:
        'https://storage.googleapis.com/mgm_dev/asset/69786deeac304d3494bcae7e/1769525928994-Gemini_Generated_Image_5wv6ol5wv6ol5wv6.png',
      status: true,
    },
  ],
  features: [
    {
      _id: '6978c4742dc3a8a1479a8c50',
      name: 'Rooftop Garden 2',
      description: 'qwertyuioplkjhgfdssxcvbnm,',
      image:
        'https://storage.googleapis.com/mgm_dev/asset/69786deeac304d3494bcae7e/1769522288605-Gemini_Generated_Image_xbxa95xbxa95xbxa.png',
      status: true,
    },
  ],
  tenants: [
    {
      _id: '69788f66b4b1606343007210',
      name: 'Ryzer 1',
      rentPerSft: 10000,
      sftsAllocated: 200,
      status: 'active',
      type: 'individual',
      lockInPeriod: 6,
      leasePeriod: 19,
      securityDeposit: 100000,
    },
  ],
  documents: [
    {
      _id: '6978c479dc6a6ae950b83a90',
      name: 'Testing 2',
      description: 'We received a request to verify your account.',
      type: 'asset-document',
      document: {
        name: 'localhost_3000_spv_edit-spv_69734d528a260e9fe062082c_step=basic-information (3).png',
        url: 'https://storage.googleapis.com/mgm_dev/asset/69786deeac304d3494bcae7e/1769522179656-localhost_3000_spv_edit-spv_69734d528a260e9fe062082c_step_basic-information__3_.png',
      },
    },
  ],
  faqs: [
    {
      _id: '6978aadb2dc3a8a1479a8aa7',
      question: 'What is Green Valley SPV Pvt. Ltd.?',
      answer: 'This is the What is Green Valley SPV Pvt. Ltd.',
    },
  ],
  riskFactors: [
    {
      _id: '6978ae2e2dc3a8a1479a8af3',
      name: 'Market Risk 2',
      description: 'description',
    },
  ],
  riskDisclosures: [
    {
      _id: '6978b5ea2dc3a8a1479a8b99',
      name: 'HGHGFHFGYHRTGFBGHTGFHTH',
      description: 'YGTYUJTDGFYHTRBUTRY FTHGBRUBDVDTRBTUYHJB DHGFJN',
    },
  ],
  additionalTaxes: [
    {
      _id: '6978bc0a2dc3a8a1479a8c06',
      name: 'Goods and Services Tax (GST)',
      value: 5,
    },
  ],
  media: {
    imageURL:
      'https://storage.googleapis.com/mgm_dev/asset/69786deeac304d3494bcae7e/1769520903174-yob-admin-seven.vercel.app_issuers_69785fb33a206db4a2e75bdc.png',
  },
};

export default function AssetDetailPage() {
//   const location = `${assetData.city}, ${assetData.state} • ${assetData.landmark}`;

  return (
    <main className="min-h-screen ">
      <div className="mx-auto">
        {/* Header Section */}
        <AssetDetailHeader
        />

        {/* About Section */}
        {/* <div className="mt-8 rounded-lg bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900">About This Property</h2>
          <p className="mt-3 text-gray-600 leading-relaxed">{assetData.about}</p>
        </div> */}

        {/* Tabs for Different Sections */}
        <Tabs defaultValue="overview" className="mt-8">
          <TabsList className="grid w-full grid-cols-4 lg:w-fit text-black ">
            <TabsTrigger value="overview" className="text-black font-semibold  data-[state=active]:text-black data-[state=active]:font-semibold">Overview</TabsTrigger>
            <TabsTrigger value="financial" className="text-black  font-semibold data-[state=active]:text-black data-[state=active]:font-semibold">Financial</TabsTrigger>
            <TabsTrigger value="assets" className="text-black font-semibold  data-[state=active]:text-black data-[state=active]:font-semibold">Assets</TabsTrigger>
            <TabsTrigger value="risk" className="text-black font-semibold  data-[state=active]:text-black data-[state=active]:font-semibold">Risk</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="mt-6 space-y-6">
            <PropertyOverview
            //   class={assetData.class}
              category={assetData.category}
              style={assetData.style}
              stage={assetData.stage}
              currency={assetData.currency}
              totalSfts={assetData.totalNumberOfSfts}
              pricePerSft={assetData.pricePerSft}
              basePropertyValue={assetData.basePropertyValue}
              totalPropertyValueAfterFees={assetData.totalPropertyValueAfterFees}
            />
          </TabsContent>

          {/* Financial Tab */}
          <TabsContent value="financial" className="mt-6">
            <FinancialDetails
              investmentPerformance={assetData.investmentPerformance}
              rentalInformation={assetData.rentalInformation}
              investorRequirementsAndTimeline={assetData.investorRequirementsAndTimeline}
              currency={assetData.currency}
            />
          </TabsContent>

          {/* Assets Tab */}
          <TabsContent value="assets" className="mt-6 space-y-8">
            {/* <AmenitiesAndFeatures
              amenities={assetData.amenities}
              features={assetData.features}
            /> */}
            <DocumentsAndTenants
              documents={assetData.documents}
              tenants={assetData.tenants}
              currency={assetData.currency}
            />
          </TabsContent>

          {/* Risk Tab */}
          <TabsContent value="risk" className="mt-6">
            <RiskAndAdditionalInfo
              riskFactors={assetData.riskFactors}
              riskDisclosures={assetData.riskDisclosures}
              additionalTaxes={assetData.additionalTaxes}
              faqs={assetData.faqs}
            />
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
}
