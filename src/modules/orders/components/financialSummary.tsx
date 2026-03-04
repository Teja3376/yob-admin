import { formatCurrency } from '@/lib/formatCurrency'
import React from 'react'
import { OrderDetail } from '../types/OrderDetail';
import { formatDate } from '@/lib/utils';

interface FieldItemProps {
  label: string;
  value: React.ReactNode;
}

const FieldItem = ({ label, value }: FieldItemProps) => {
  return (
    <div className="space-y-1">
      <p className="text-sm text-gray-500">{label}</p>
      <p className="font-medium">{value}</p>
    </div>
  );
};

const FinancialSummary = ({ orderDetail }: { orderDetail: OrderDetail }) => {
  console.log(orderDetail, 'orderDetail');
  return (
    <div className="border rounded-md w-full">
      <div className="px-4 py-2 bg-primary/10 rounded-t-md ">
        <h2 className="text-md font-medium">Financial Details:</h2>
      </div>

      <div className="p-4 space-y-4 ">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-4">
          <div className="space-y-1">
            <p className="font-medium">Asset Currency ({orderDetail?.asset?.currency})</p>
            <hr />
          </div>

          <FieldItem label="Tokens Purchased" value={orderDetail?.numberOfTokens} />
          <FieldItem label="Token Price" value={formatCurrency(orderDetail?.assetValue?.tokenPrice, orderDetail?.asset?.currency)} />
          <FieldItem label="Invested Amount" value={formatCurrency(orderDetail?.investorAmount, orderDetail?.asset?.currency)} />
        </div>

        <div className="space-y-4">
          <div className="space-y-1">
            <p className="font-medium">Investor Currency ({orderDetail?.investorCurrency})</p>
            <hr />
          </div>

          <FieldItem label="FX Rate" value={orderDetail?.reversefxRate?.toFixed(6)} />
          <FieldItem label="Investor Paid Amount" value={formatCurrency(orderDetail?.investorPaidAmount, orderDetail?.investorCurrency)} />
        </div>
      </div>

      <div className="border p-4 rounded-md space-y-1 bg-gray-50">
        <p className='text-sm text-gray-500'>USD Normalized Amount</p>
        <p className='text-xl font-semibold text-primary'>{formatCurrency(150.00)}</p>
        <p className="text-xs text-gray-500">FX Rate Snapshot: {formatDate(orderDetail?.createdAt)}</p>
      </div>
      </div>
    </div>
  );
};

export default FinancialSummary