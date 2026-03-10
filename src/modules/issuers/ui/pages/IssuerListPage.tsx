"use client";
import React, { useState } from "react";
import IssuersTable from "../components/IssuersTable";
import { IssuerRow, issuerTableCols } from "../../schemas/issuerTableCols";
import { useGetIssuerList } from "../../hooks/issuer.hook";
import { Check, Clock, Search, Users, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useDebounce } from "@/config/useDebounce";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Loading from "@/components/Loader";
import TableComponent from "@/components/common/TableComponent";
import { useRouter } from "next/navigation";
import Pagination from "@/components/common/Pagination";
import { useAuthStore1 } from "@/modules/adminauth/state/adminAuthStore";
import PageTitle from "@/components/PageTitle";
import DashboardCard from "@/modules/orders/ui/DashboardCard";
import { useGetIssuerCount } from "../../hooks/useGetIssuerCount";

type StatusTab = "pending" | "rejected" | "approved";

const IssuerListPage = () => {
  const router = useRouter();
  const { hasPermission } = useAuthStore1();
  const [searchQuery, setSearchQuery] = useState("");
  const [status, setStatus] = useState<StatusTab>("approved");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const searchTerm = useDebounce(searchQuery, 500);
  const canView = hasPermission("issuers", "review");

  const {
    data: issuerList,
    isFetching: isLoading,
    isError,
    error,
  } = useGetIssuerList(status, page, limit, searchTerm);
  const { data: issuerCount, isFetching: isFetchingIssuerCount } = useGetIssuerCount();
  console.log(issuerCount);
  const pagination = issuerList?.pagination;

  const cols = issuerTableCols(router, canView, status);
  const handleTabChange = (value: string) => {
    setStatus(value as StatusTab);
    setPage(1);
  };

  const onPageChange = (newPage: number) => { 
    setPage(newPage);
  };

  const onPageSizeChange = (pageSize: number) => {
    setLimit(pageSize);
    setPage(1);
  };
  if (isLoading && isFetchingIssuerCount) {
    return (
      <div className="flex items-center justify-center mt-20">
        <Loading message="Loading Issuer List and Count..." />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center mt-20">
        <p className="text-red-500">
          Error loading Issuer list: {error?.message || "Unknown error"}
        </p>
      </div>
    );
  }

  return (
    <div className="w-full space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <DashboardCard
          title="Total Issuers"
          value={`${issuerCount?.total || "0"}`}
          rightIcon={<Users size={20} className="text-primary" />}
          rightIconClassName="border-2 border-primary rounded-full p-2 bg-primary/10"
          containerClassName="rounded-lg"
        />
        <DashboardCard
          title="Approved Issuers"
          value={`${issuerCount?.approved || "0"}`}
          rightIcon={<Check size={20} className="text-green-500" />}
          rightIconClassName="border-2 border-green-500 rounded-full p-2 bg-green-100"
          containerClassName="rounded-lg"
        />
        <DashboardCard
          title="Pending Issuers"
          value={`${issuerCount?.pending || "0"}`}
          rightIcon={<Clock size={20} className="text-yellow-500" />}
          rightIconClassName="border-2 border-yellow-500 rounded-full p-2 bg-yellow-100"
          containerClassName="rounded-lg"
        />
        <DashboardCard
          title="Rejected Issuers"
          value={`${issuerCount?.rejected || "0"}`}
          rightIcon={<X size={20} className="text-red-500" />}
          rightIconClassName="border-2 border-red-500 rounded-full p-2 bg-red-100"
          containerClassName="rounded-lg"
        />

      </div>
      <PageTitle
        title={"List of Issuers"}
        suffix="Issuers"
      />
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Issuer List</h1>
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
          {isLoading && !issuerList ? (
            <div className="flex items-center justify-center mt-20">
              <Loading message="Loading..." />{" "}
            </div>
          ) : (
            <TableComponent
              data={issuerList?.data || []}
              columns={cols}
              model="issuer"
            />
          )}
        </TabsContent>
      </Tabs>
      {pagination && issuerList?.data.length > 0 && (
        <Pagination
          {...pagination}
          currentPage={pagination?.page ?? 1}
          totalPages={pagination?.totalPages ?? 1}
          limit={pagination?.limit ?? limit}
          onPageChange={onPageChange}
          onPageSizeChange={onPageSizeChange}
        />
      )}
    </div>
  );
};

export default IssuerListPage;
