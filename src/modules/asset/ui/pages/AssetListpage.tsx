"use client";

import React, { useState } from "react";
import TableComponent from "@/components/common/TableComponent";
import { Search, X, FileText, Check, Clock } from "lucide-react";
import { useGetAllAsset } from "../../hooks/useGetAllAsset";
import { assetTableCols } from "../../schema/assetTableSchema";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";

import Pagination from "@/components/common/Pagination";
import { useRouter } from "next/navigation";
import { useDebounce } from "@/config/useDebounce";
import Loading from "@/components/Loader";
import { useAuthStore1 } from "@/modules/adminauth/state/adminAuthStore";
import PageTitle from "@/components/PageTitle";
import { useGetAssetCount } from "../../hooks/useGetAssetCount";
import DashboardCard from "@/modules/orders/ui/DashboardCard";
import ErrorPage from "@/components/Error";
import { DashboardCardSkeleton } from "@/components/DashboardSkeleton";

type StatusTab = "pending" | "rejected" | "approved";

const AssetListpage = () => {
  const router = useRouter();
  const { hasPermission } = useAuthStore1();
  const [status, setStatus] = useState<StatusTab>("approved");
  const {
    data: assetCount,
    isFetching: isFetchingAssetCount,
    isError: isAssetCountError,
    error: assetCountError,
  } = useGetAssetCount();
  const [searchQuery, setSearchQuery] = useState("");
  const searchTerm = useDebounce(searchQuery, 500);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const canView = hasPermission("assets", "review");
  const cols = assetTableCols(router, status, canView);

  const {
    data,
    isFetching: isLoading,
    isError,
    error,
  } = useGetAllAsset({
    page,
    limit,
    status,
    search: searchTerm,
  });

  const handleTabChange = (value: string) => {
    setStatus(value as StatusTab);
    setPage(1); // Reset to first page when changing tabs
  };

  const onPageChange = (newPage: number) => {
    setPage(newPage);
  };

  const onPageSizeChange = (pageSize: number) => {
    setLimit(pageSize);
    setPage(1);
  };

  if (isLoading && isFetchingAssetCount) {
    return (
      <div className="flex items-center justify-center mt-20">
        <Loading message="Loading Asset List and Count..." />
      </div>
    );
  }

  if (isError && !data) {
    return (
      <ErrorPage
        title="Error Gathering Asset List"
        errorMessage={error?.message || "Assets not found"}
      />
    );
  }
  if (isAssetCountError && !assetCount) {
    return (
      <ErrorPage
        title="Error Gathering Assets Stats"
        errorMessage={assetCountError?.message || "Assets Stats not found"}
      />
    );
  }

  const pagination = data?.pagination;

  return (
    <div className="space-y-6">
      <div className="grid grif-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {isFetchingAssetCount ? (
          Array.from({ length: 4 }).map((_, i) => (
            <DashboardCardSkeleton key={i} />
          ))
        ) : (
          <>
            <DashboardCard
              title="Total Assets"
              value={`${assetCount?.total || "0"}`}
              rightIcon={<FileText size={20} className="text-primary" />}
              rightIconClassName="border-2 border-primary rounded-full p-2 bg-primary/10"
              containerClassName="rounded-lg"
            />

            <DashboardCard
              title="Approved Assets"
              value={`${assetCount?.approved || "0"}`}
              rightIcon={<Check size={20} className="text-green-500" />}
              rightIconClassName="border-2 border-green-500 rounded-full p-2 bg-green-100"
              containerClassName="rounded-lg"
            />

            <DashboardCard
              title="Pending Assets"
              value={`${assetCount?.pending || "0"}`}
              rightIcon={<Clock size={20} className="text-yellow-500" />}
              rightIconClassName="border-2 border-yellow-500 rounded-full p-2 bg-yellow-100"
              containerClassName="rounded-lg"
            />

            <DashboardCard
              title="Rejected Assets"
              value={`${assetCount?.rejected || "0"}`}
              rightIcon={<X size={20} className="text-red-500" />}
              rightIconClassName="border-2 border-red-500 rounded-full p-2 bg-red-100"
              containerClassName="rounded-lg"
            />
          </>
        )}
      </div>
      <PageTitle title={"List of Assets"} suffix="Assets" />

      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">
          Asset Approval List
        </h1>
        <div className="relative flex-1 max-w-md">
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={18}
          />
          <Input
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Tabs */}
      <Tabs value={status} onValueChange={handleTabChange}>
        <TabsList className="bg-transparent border-b border-gray-200 rounded-none p-0 h-auto gap-5">
          <TabsTrigger
            value="approved"
            className="data-[state=active]:border-b-2 data-[state=active]:shadow-none text-black data-[state=active]:border-b-primary data-[state=active]:text-primary data-[state=active]:bg-transparent rounded-none border-b-2 border-transparent"
          >
            Approved
          </TabsTrigger>
          <TabsTrigger
            value="pending"
            className="data-[state=active]:border-b-2 data-[state=active]:shadow-none text-black data-[state=active]:border-b-primary data-[state=active]:text-primary data-[state=active]:bg-transparent rounded-none border-b-2 border-transparent"
          >
            Pending
          </TabsTrigger>
          <TabsTrigger
            value="rejected"
            className="data-[state=active]:border-b-2 data-[state=active]:shadow-none text-black data-[state=active]:border-b-primary data-[state=active]:text-primary data-[state=active]:bg-transparent rounded-none border-b-2 border-transparent"
          >
            Rejected
          </TabsTrigger>
        </TabsList>

        <TabsContent value={status} className="mt-6 space-y-4">
          {isLoading && !data ? (
            <div className="flex items-center justify-center mt-20">
              <Loading message="Loading..." />{" "}
            </div>
          ) : (
            <TableComponent
              data={data?.data || []}
              columns={cols}
              model="asset"
            />
          )}
        </TabsContent>
      </Tabs>
      {pagination && data?.data.length > 0 && (
        <Pagination
          {...pagination}
          currentPage={pagination?.currentPage ?? 1}
          totalPages={pagination?.totalPages ?? 1}
          limit={pagination?.limit ?? limit}
          onPageChange={onPageChange}
          onPageSizeChange={onPageSizeChange}
        />
      )}
    </div>
  );
};

export default AssetListpage;
