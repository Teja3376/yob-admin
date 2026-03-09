"use client";

import  { useState } from "react";
import {  useRouter } from "next/navigation";
import { useDebounce } from "@/config/useDebounce";
import { Input } from "@/components/ui/input";
import TableComponent from "@/components/common/TableComponent";

import Pagination from "@/components/common/Pagination";
import { LoaderCircle, Search } from "lucide-react";
import useGetIssuerInvestors from "@/modules/issuers/hooks/useGetIssuerInvestors";
import { investorCols } from "@/modules/issuers/schemas/investorCols";
import Loading from "@/components/Loader";

const Investors = ({ issuerId }: { issuerId: string }) => {
  const router = useRouter();

  const [searchQuery, setSearchQuery] = useState("");
  const searchTerm = useDebounce(searchQuery, 500);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const cols = investorCols(router);
  const {
    data,
    isFetching: isLoading,
    isError,
    error,
  } = useGetIssuerInvestors(issuerId as string, page, limit, searchTerm);

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
        <p className="text-red-500 text-xs">
          Error loading Investor list: {error?.message || "Unknown error"}
        </p>
      </div>
    );
  }


  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
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

      {isLoading && !data ? (
        <div className="flex items-center justify-center mt-20">
          <Loading message="Getting Investor List..." />
        </div>
      ) : (
        <TableComponent data={data?.data || []} columns={cols} model="investor" />
      )}
      
        <Pagination
        {...data}
          currentPage={data?.page ?? 1}
          totalPages={data?.totalPages ?? 1}
          limit={data?.limit ?? limit}
          onPageChange={onPageChange}
          onPageSizeChange={onPageSizeChange}
        />
      
    </div>
  );
};

export default Investors;
