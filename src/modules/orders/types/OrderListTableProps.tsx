export type OrderListTableProps = {
  _id: string;
  issuerName: string;
  spvName: string;
  investorId: string;
  usdAmount: number;
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
  investor: {
    firstName: string;
    lastName: string;
    email: string;
  };
};
