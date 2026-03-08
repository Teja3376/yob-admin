"use client";
import React, { useState } from "react";
import IssuersTable from "../components/IssuersTable";
import { IssuerRow, issuerTableCols } from "../../schemas/issuerTableCols";
import { useGetIssuerList } from "../../hooks/issuer.hook";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useDebounce } from "@/config/useDebounce";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Loading from "@/components/Loader";
import TableComponent from "@/components/common/TableComponent";
import { useRouter } from "next/navigation";
import Pagination from "@/components/common/Pagination";
import { useAuthStore1 } from "@/modules/adminauth/state/adminAuthStore";

type StatusTab = "pending" | "rejected" | "approved";

const IssuerListPage = () => {
  const router = useRouter();
  const { hasPermission } = useAuthStore1();
  const [searchQuery, setSearchQuery] = useState("");
  const [status, setStatus] = useState<StatusTab>("pending");
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
  const pagination = issuerList?.pagination;

  const cols = issuerTableCols(router,canView);
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
          {isLoading && !issuerList ? (
            <div className="flex items-center justify-center mt-20">
              <Loading message="Loading..." />{" "}
            </div>
          ) : (
            <TableComponent
              data={issuerList?.data || []}
              columns={cols}
              model="asset"
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
