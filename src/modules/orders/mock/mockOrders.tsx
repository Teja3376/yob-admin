import { OrderListTableProps } from "../types/OrderListTableProps";

export const mockOrders: OrderListTableProps[] = [
    {
      orderId: "9a7f3c21b5e4",
      issuerName: "Alpha Capital Pvt Ltd",
      spvName: "Green Energy SPV I",
      investorId: "INV-1001",
      orderValue: "12450.00",            // INR
      investorCurrency: "EUR",
      fxRate: "0.011245",
      investorPaid: "139.95",            // 12450 × 0.011245
      usdNormalizedValue: "150.00",
      date: "2026-03-01",
      orderStatus: "Completed",
      actions: null,
    },
    {
      orderId: "7c92ab14ef33",
      issuerName: "Zenith Holdings Ltd",
      spvName: "Infra Growth SPV II",
      investorId: "INV-1002",
      orderValue: "25000.00",            // USD Base
      investorCurrency: "USD",
      fxRate: "1.000000",
      investorPaid: "25000.00",
      usdNormalizedValue: "25000.00",
      date: "2026-02-27",
      orderStatus: "Completed",
      actions: null,
    },
    {
      orderId: "3de81fa44b99",
      issuerName: "Nova Assets LLP",
      spvName: "Tech Venture SPV I",
      investorId: "INV-1003",
      orderValue: "8500.00",             // GBP
      investorCurrency: "USD",
      fxRate: "1.270000",
      investorPaid: "10795.00",
      usdNormalizedValue: "10795.00",
      date: "2026-02-25",
      orderStatus: "Payment Pending",
      actions: null,
    },
    {
      orderId: "6ff19c882ac1",
      issuerName: "Apex Global Finance",
      spvName: "Real Estate SPV IV",
      investorId: "INV-1004",
      orderValue: "500000.00",           // INR
      investorCurrency: "USD",
      fxRate: "0.012000",
      investorPaid: "6000.00",
      usdNormalizedValue: "6000.00",
      date: "2026-02-20",
      orderStatus: "Initiated",
      actions: null,
    },
    {
      orderId: "c14ab9e7f002",
      issuerName: "Vertex Investment Group",
      spvName: "Healthcare SPV III",
      investorId: "INV-1005",
      orderValue: "10000.00",            // EUR
      investorCurrency: "USD",
      fxRate: "1.080000",
      investorPaid: "10800.00",
      usdNormalizedValue: "10800.00",
      date: "2026-02-18",
      orderStatus: "Cancelled",
      actions: null,
    },
  ];