"use client";
import {
  ArrowLeft,
  Banknote,
  Building,
  Coins,
  CopyIcon,
  Currency,
  CurrencyIcon,
  PiggyBank,
  Wallet,
} from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import React from "react";
import { useInvestorDetail } from "../hooks/useInvestorDetail";
import Loading from "@/components/Loader";
import { detailColumns } from "../schemas/detailColumn";
import TableComponent from "@/components/common/TableComponent";
import { handleCopy } from "@/utils/globalFunctions";
import DashboardCard from "@/modules/orders/ui/DashboardCard";
import { formatCurrency } from "@/lib/formatCurrency";
import PageTitle from "@/components/PageTitle";

const InvestorDetailpage = () => {
  const router = useRouter();
  const { investorId } = useParams();
  const {
    data: investorDetail,
    isFetching,
    isError,
    error,
  } = useInvestorDetail(investorId as string);
  const initals =
    investorDetail?.investor?.firstName?.charAt(0) +
    investorDetail?.investor?.lastName?.charAt(0);
  const investedId = `INV-${investorDetail?.investor?._id?.slice(-4)?.toUpperCase() || ""}`;

  if (isFetching) {
    return (
      <div className="flex items-center justify-center mt-20">
        <Loading message="Loading..." />
      </div>
    );
  }
  if (isError) {
    return (
      <div className="flex items-center justify-center mt-20">
        <p className="text-red-500">
          Error loading Investor details: {error?.message || "Unknown error"}
        </p>
      </div>
    );
  }
  return (
    <div className="space-y-4">
      <PageTitle
        title={investorDetail?.investor?.fullName || "Detailed View of Investors"}
        suffix="Investor Details"
      />
      <div className="flex items-center gap-2">
        <ArrowLeft
          onClick={() => router.back()}
          className="cursor-pointer"
          size={20}
        />
        <h1 className="text-2xl font-semibold">Investor Details</h1>
      </div>
      <div className="grid grid-cols-5 gap-2">
        <div className="col-span-2">
          <div className="rounded-md border px-8 py-4 space-y-4 h-full flex flex-col justify-center">
            <div className="flex items-center gap-4">
              <div className="w-30 h-30 bg-primary/80 rounded-full flex items-center justify-center">
                <p className="text-5xl font-semibold text-white">{initals}</p>
              </div>
              <div className="flex flex-col gap-2">
                <p className="text-xl font-semibold">
                  {investorDetail?.investor?.fullName}
                </p>
                <p className="text-sm text-gray-500">
                  {investorDetail?.investor?.email}
                </p>
                <p className="text-sm text-gray-500 flex items-center gap-2">
                  {investedId}{" "}
                  <CopyIcon
                    className="cursor-pointer"
                    size={16}
                    onClick={() => handleCopy(investedId)}
                  />
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <p className="text-sm text-gray-500">Legal Name:</p>
              <p className="text-sm font-semibold text-primary">
                {investorDetail?.investor?.legalName}
              </p>
            </div>
          </div>
        </div>
        <div className="col-span-3">
          <div className="grid grid-cols-2 gap-2">
            <DashboardCard
              leftIcon={<Banknote className="text-primary" size={25} />}
              title="Invested Amount"
              value={formatCurrency(
                investorDetail?.totalPaidAmount,
                investorDetail?.assets?.[0]?.investorPaidCurrency,
              )}
            />
            <DashboardCard
              leftIcon={<Wallet className="text-primary" size={25} />}
              title="Invested Amount in USD"
              value={formatCurrency(investorDetail?.totalPortfolioUSD)}
            />
            <DashboardCard
              title="Total Assets"
              value={investorDetail?.totalAssetCount}
              leftIcon={<Building className="text-primary" size={25} />}
            />
            <DashboardCard
              title="Total Tokens"
              value={investorDetail?.totalTokenCount}
              leftIcon={<Coins className="text-primary" size={25} />}
            />
          </div>
        </div>
      </div>
      <h2 className="text-xl font-semibold">Invested Assets</h2>
      <TableComponent
        columns={detailColumns()}
        data={investorDetail?.assets ?? []}
        model="orders"
      />
    </div>
  );
};

export default InvestorDetailpage;
