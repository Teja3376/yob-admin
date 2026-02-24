"use client";

import React, { useState } from "react";
import TableComponent from "@/components/common/TableComponent";
import { LoaderCircle, Search, ChevronLeft, ChevronRight } from "lucide-react";
import { useGetAllAsset } from "../hooks/useGetAllAsset";
import { assetTableCols } from "../schema/assetTableSchema";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";

import Pagination from "@/components/common/Pagination";
import { useRouter } from "next/navigation";

type StatusTab = "pending" | "rejected" | "approved";

const AssetListpage = () => {
  const router=useRouter()
  const [status, setStatus] = useState<StatusTab>("pending");
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const cols=assetTableCols(router,status)

  const {
    data,
    isFetching: isLoading,
    isError,
    error,
  } = useGetAllAsset({
    page,
    limit,
    status,
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

  // if (isLoading) {
  //   return (
  //     <div className="flex items-center justify-center mt-20">
  //       <LoaderCircle size={40} className="animate-spin text-primary" />
  //     </div>
  //   );
  // }

  if (isError) {
    return (
      <div className="flex items-center justify-center mt-20">
        <p className="text-red-500">
          Error loading Asset list: {error?.message || "Unknown error"}
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

          <TabsTrigger
            value="approved"
            className="data-[state=active]:border-b-2 data-[state=active]:shadow-none text-black data-[state=active]:border-b-primary data-[state=active]:text-primary data-[state=active]:bg-transparent rounded-none border-b-2 border-transparent"
          >
            Approved
          </TabsTrigger>
        </TabsList>

        <TabsContent value={status} className="mt-6 space-y-4">
          {isLoading && !data ? (
            <div className="flex items-center justify-center mt-20">
              <LoaderCircle size={40} className="animate-spin text-primary" />
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
          currentPage={pagination?.currentPage ?? 1}
          totalPages={pagination?.totalPages ?? 1}
          totalCount={pagination?.totalCount ?? 0}
          hasNextPage={pagination?.hasNextPage ?? false}
          hasPreviousPage={pagination?.hasPreviousPage ?? false}
          limit={pagination?.limit ?? limit}
          page={pagination?.page ?? page}
          onPageChange={onPageChange}
          onPageSizeChange={onPageSizeChange}
        />
      )}
    </div>
  );
};

export default AssetListpage;
