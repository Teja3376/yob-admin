"use client";

import React, { useState } from "react";
import TableComponent from "@/components/common/TableComponent";
import {
  Clock,
  FileText,
  LoaderCircle,
  Search,
  ShieldCheck,
  Users,
  X,
} from "lucide-react";
import { useGetAllSpv } from "../../hooks/useGetAllSpv";
import { spvTableCols } from "../../schemas/spvTableSchema";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";

import { useRouter } from "next/navigation";
import Pagination from "@/components/common/Pagination";
import Loading from "@/components/Loader";
import { useAuthStore1 } from "@/modules/adminauth/state/adminAuthStore";
import PageTitle from "@/components/PageTitle";
import DashboardCard from "@/modules/orders/ui/DashboardCard";
import { useGetSpvCount } from "../../hooks/useGetSpvCount";
import ErrorPage from "@/components/Error";

type StatusTab = "Active" | "Rejected" | "Pending";

const SpvListPage = () => {
  const router = useRouter();
  const { hasPermission } = useAuthStore1();
  const [status, setStatus] = useState<StatusTab>("Active");
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const canView = hasPermission("spvs", "review");
  const {
    data: spvCount,
    isFetching: isFetchingSpvCount,
    isError: isSpvCountError,
    error: spvCountError,
  } = useGetSpvCount();

  const cols = spvTableCols(router, status, canView);

  // Map UI tabs to API status values
  const getApiStatus = (tab: StatusTab): string => {
    const statusMap: Record<StatusTab, string> = {
      Active: "Active",
      Rejected: "Rejected",
      Pending: "Pending",
    };
    return statusMap[tab];
  };
  const {
    data,
    isFetching: isLoading,
    isError,
    error,
  } = useGetAllSpv({
    page,
    limit,
    status: getApiStatus(status),
    search: searchQuery,
  });
  if (isLoading && isFetchingSpvCount) {
    return (
      <div className="flex items-center justify-center mt-20">
        <Loading message="Loading SPV List and Count..." />
      </div>
    );
  }

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

  if (isError || !data) {
    return (
      <ErrorPage
        title="Error Gathering Spv List"
        errorMessage={error?.message || "Unknown error"}
      />
    );
  }
  if (isSpvCountError|| !spvCount) {
    return (
      <ErrorPage
        title="Error Gathering SPV Count"
        errorMessage={spvCountError?.message || "Unknown error"}
      />
    );
  }

  const pagination = data?.pagination;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <DashboardCard
          title="Total SPVs"
          value={`${spvCount?.total || "0"}`}
          rightIcon={<FileText size={20} className="text-primary" />}
          rightIconClassName=" rounded-full p-2 bg-primary/10"
          containerClassName="rounded-lg"
        />

        <DashboardCard
          title="Active SPVs"
          value={`${spvCount?.active || "0"}`}
          rightIcon={<ShieldCheck size={20} className="text-green-500" />}
          rightIconClassName=" rounded-full p-2 bg-green-100"
          containerClassName="rounded-lg"
        />

        <DashboardCard
          title="Pending SPVs"
          value={`${spvCount?.pending || "0"}`}
          rightIcon={<Clock size={20} className="text-yellow-500" />}
          rightIconClassName=" rounded-full p-2 bg-yellow-100"
          containerClassName="rounded-lg"
        />

        <DashboardCard
          title="Rejected SPVs"
          value={`${spvCount?.rejected || "0"}`}
          rightIcon={<X size={20} className="text-red-500" />}
          rightIconClassName=" rounded-full p-2 bg-red-100"
          containerClassName="rounded-lg"
        />
      </div>

      {/* Header */}
      <PageTitle title={"List of SPVs"} suffix="spvs" />
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">
          Special Purpose Vehicles (SPV) List
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
        <TabsList className="bg-transparent border-b border-gray-200 rounded-none p-0 h-auto gap-5 ">
          <TabsTrigger
            value="Active"
            className="data-[state=active]:border-b-2 data-[state=active]:shadow-none text-black data-[state=active]:border-b-primary data-[state=active]:text-primary data-[state=active]:bg-transparent rounded-none border-b-2 border-transparent"
          >
            Approved
          </TabsTrigger>
          <TabsTrigger
            value="Pending"
            className="data-[state=active]:border-b-2 data-[state=active]:shadow-none text-black data-[state=active]:border-b-primary data-[state=active]:text-primary data-[state=active]:bg-transparent rounded-none border-b-2 border-transparent"
          >
            Pending
          </TabsTrigger>
          <TabsTrigger
            value="Rejected"
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
              model="spv"
            />
          )}

          {/* Pagination */}
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

export default SpvListPage;
