export interface OrderDetail {
    _id: string;
    assetId: string;
    investorId: string;
    issuerId: string;
    numberOfTokens: number;
    investorAmount: number;
    investorPaidAmount: number;
    investorCurrency: string;
    fxRate: number;
    reversefxRate: number;
    status: string;
    transactionHash: string;
    tokenValue: number;
    totalFee: number;
    assetValue: AssetValue;
    feeBreakup: FeeBreakup[];
    usdAmount: number;
    createdAt: string;
    updatedAt: string;
    usertokenPrice: number;
    ownership:{
    percentage: number;
    tokensOwned: number;
    totalTokens: number;
    }
    __v: number;
    asset: Asset;
    issuer: Issuer;
    investor: Investor;
}

export interface Investor {
    _id: string;
    name: string;
    email: string;
}
export interface AssetValue {
    token: number;
    tokenPrice :number;
    assetCurrency: string;
    tokenValue: number;
}

export interface FeeBreakup {
    _id: string;
    type: string;
    name: string;
    value: number;
    percentage: number;
    isPercentage: boolean;
    status: string;
}

export interface Asset {
    _id: string;
    name: string;
    currency: string;
    pricePerSft: number;
    tokenprice: number;
    totalNumberOfSfts: number;
    location: Location;
}

export interface Location {
    city: string;
    state: string;
    country: string;
}

export interface Issuer {
    _id: string;
    email: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    kycStatus: string;
    iskyb: boolean;
    companyName: string;
    companyCountry: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
}