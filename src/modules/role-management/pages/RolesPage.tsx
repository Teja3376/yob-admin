"use client";

import { useState } from "react";
import useGetAllRoles from "../hooks/useGetAllRoles";
import { useDebounce } from "@/config/useDebounce";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import Loading from "@/components/Loader";
import TableComponent from "@/components/common/TableComponent";
import Pagination from "@/components/common/Pagination";
import { useRouter } from "next/navigation";
import { rolesCols } from "../schemas/rolesCols";

const RolesPage = () => {
  const router = useRouter();
  const cols = rolesCols(router);
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const searchQuery = useDebounce(searchTerm, 500);
  const {
    data,
    isFetching: isRolesLoading,
    isError,
    error,
  } = useGetAllRoles(page, limit, searchQuery);

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
          Error loading Roles list: {error?.message || "Unknown error"}
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
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {isRolesLoading && !data ? (
        <div className="flex items-center justify-center mt-20">
          <Loading message="Getting Roles List..." />
        </div>
      ) : (
        <TableComponent data={data?.data || []} columns={cols} model="role" />
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

export default RolesPage;
