"use client";

import React, { useState } from "react";
import TableComponent from "@/components/common/TableComponent";
import {
  LoaderCircle,
  Search,
 
} from "lucide-react";
import { useGetAllSpv } from "../../hooks/useGetAllSpv";
import { spvTableCols } from "../../schemas/spvTableSchema";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";

import { useRouter } from "next/navigation";
import Pagination from "@/components/common/Pagination";
import Loading from "@/components/Loader";
import { useAuthStore1 } from "@/modules/adminauth/state/adminAuthStore";

type StatusTab = "Active" | "Rejected" | "Pending";

const SpvListPage = () => {
  const router = useRouter();
  const {hasPermission}=useAuthStore1()
  const [status, setStatus] = useState<StatusTab>("Pending");
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
    const canView = hasPermission("spvs", "review");


  const cols= spvTableCols(router,status,canView);

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

  if (isError) {
    return (
      <div className="flex items-center justify-center mt-20">
        <p className="text-red-500">
          Error loading SPV list: {error?.message || "Unknown error"}
        </p>
      </div>
    );
  }

  const pagination = data?.pagination;

  return (
    <div className="space-y-6">
      {/* Header */}
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

          <TabsTrigger
            value="Active"
            className="data-[state=active]:border-b-2 data-[state=active]:shadow-none text-black data-[state=active]:border-b-primary data-[state=active]:text-primary data-[state=active]:bg-transparent rounded-none border-b-2 border-transparent"
          >
            Approved
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
