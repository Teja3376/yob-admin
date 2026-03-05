export type OrderListTableProps = {
    _id: string;
    issuerName: string;
    spvName: string;
    investorId : string;
    investorAmount: string;
    investorCurrency: string;
    fxRate: string;
    investorPaidAmount: string;
    date: string;
    createdAt: string;
    updatedAt: string;
    status: string;
    asset: {
        name: string;
        currency: string;
    };
    issuer: {
        firstName: string;
        lastName: string;
    };
}