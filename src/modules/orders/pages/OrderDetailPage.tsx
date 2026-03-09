"use client"
import React from 'react'
import Header from '../components/header'
import FinancialSummary from '../components/financialSummary'
import { ArrowLeft } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import OrderStepper, { OrderStatus } from '../ui/VerticalStepper'
import { useOrderDetail } from '../hooks/useOrderDetail'
import { OrderDetail } from '../types/OrderDetail'
import Loading from '@/components/Loader'
import AssetOrderBreakdown from '../components/AssetOrderBreakdown'
import InvestorOrderBreakdown from '../components/InvestorOrderBreakdown'

const OrderDetailPage = () => {
  const router = useRouter();
  const { orderId } = useParams();
  const { data: orderDetail, isFetching,isError,error } = useOrderDetail(orderId as string);
  console.log(orderDetail);
  if (isFetching) {
    return <div className=' h-screen flex items-center justify-center'>
      <Loading message="Loading order details..." />
    </div>;
  }
  if (isError) {
    return (
      <div className="flex items-center justify-center mt-20">
        <p className="text-red-500">
          Error loading Order Details: {error?.message || "Unknown error"}
        </p>
      </div>
    );
  }

  return (
    <div className='space-y-4'>
      <div className='flex items-center gap-2'>
        <ArrowLeft
          onClick={() => router.back()}
          className="cursor-pointer"
          size={20}
        />
        <h1 className='text-2xl font-semibold'>Order Details</h1>
      </div>
      <Header orderDetail={orderDetail as OrderDetail} />
      <div className='flex gap-4'>
        <FinancialSummary orderDetail={orderDetail as OrderDetail} />
        <OrderStepper currentStatus={orderDetail?.status as OrderStatus} />
      </div>
      <div className='grid grid-cols-2 gap-4'>
        <AssetOrderBreakdown
          tokenValue={orderDetail?.assetValue?.tokenValue || 0}
          assetCurrency={orderDetail?.assetValue?.assetCurrency || ""}
          totalOrderValue={orderDetail?.investorAmount || 0}
          fees={
            orderDetail?.feeBreakup?.map((fee) => {
              const name = fee.name?.toLowerCase() || "";
              let type = "";
              if (name.includes("registration")) type = "registration";
              else if (name.includes("legal")) type = "legal";
              else if (name.includes("reserve")) type = "reserve";
              else if (name.includes("insurance")) type = "insurance";
              else type = fee.name || "other";

              return {
                type,
                value: fee.percentage ?? fee.value,
                status: "active",
                isPercentage: fee.isPercentage,
              };
            }) || []
          }
        />
        <InvestorOrderBreakdown
          tokenValue={orderDetail?.usertokenPrice || 0}
          investorCurrency={orderDetail?.investorCurrency || ""}
          totalOrderValue={orderDetail?.investorPaidAmount || 0}
          fees={
            orderDetail?.feeBreakup?.map((fee) => {
              const name = fee.name?.toLowerCase() || "";
              let type = "";
              if (name.includes("registration")) type = "registration";
              else if (name.includes("legal")) type = "legal";
              else if (name.includes("reserve")) type = "reserve";
              else if (name.includes("insurance")) type = "insurance";
              else type = fee.name || "other";

              return {
                type,
                value: fee.percentage ?? fee.value,
                status: "active",
                isPercentage: fee.isPercentage,
              };
            }) || []
          }
        />
      </div>

    </div>
  );
};

export default OrderDetailPage;