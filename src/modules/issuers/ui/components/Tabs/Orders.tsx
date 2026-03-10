"use client";

import React, { useState } from "react";
import TableComponent from "@/components/common/TableComponent";
import { Input } from "@/components/ui/input";
import Pagination from "@/components/common/Pagination";
import { useRouter } from "next/navigation";
import { LoaderCircle, Search } from "lucide-react";
import { spvCols } from "@/modules/issuers/schemas/spvCols";
import { useDebounce } from "@/config/useDebounce";
import useGetIssuerOrders from "@/modules/issuers/hooks/useGetIssuerOrders";
import { orderCols } from "@/modules/issuers/schemas/orderCols";
import Loading from "@/components/Loader";

const Orders = ({ issuerId }: { issuerId: string }) => {
  const router = useRouter();

  const [searchQuery, setSearchQuery] = useState("");
  const searchTerm = useDebounce(searchQuery, 500);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const cols = orderCols(router);
  const {
    data,
    isFetching: isLoading,
    isError,
    error,
  } = useGetIssuerOrders(issuerId as string, page, limit, searchTerm);

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
        <p className="text-red-500 text-xs">
          Error loading Order list: {error?.message || "Unknown error"}
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
          <Loading message="Getting Order List..." />
        </div>
      ) : (
        <TableComponent data={data?.data || []} columns={cols} model="order" />
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

export default Orders;
