"use client";

import React, { useState } from "react";
import TableComponent from "@/components/common/TableComponent";
import {
  LoaderCircle,
  Plus,
  Filter,
  Search,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useGetAllSpv } from "../../hooks/useGetAllSpv";
import { spvTableCols } from "../schemas/spvTableSchema";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Pagination, PaginationContent, PaginationItem } from "@/components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type StatusTab = "Active" | "Rejected" | "Pending";

const SpvListPage = () => {
  const [status, setStatus] = useState<StatusTab>("Pending");
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  // Map UI tabs to API status values
  const getApiStatus = (tab: StatusTab): string => {
    const statusMap: Record<StatusTab, string> = {
      Active: "Approval",
      Rejected: "Rejected",
      Pending: "Pending",
    };
    return statusMap[tab];
  };

  const { data, isLoading, isError, error } = useGetAllSpv({
    page,
    limit,
    status: getApiStatus(status),
  });

  const handleTabChange = (value: string) => {
    setStatus(value as StatusTab);
    setPage(1); // Reset to first page when changing tabs
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center mt-20">
        <LoaderCircle size={40} className="animate-spin text-primary" />
      </div>
    );
  }

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
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <Input
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      
      </div>

      {/* Search Bar */}
 
      
      

      {/* Tabs */}
      <Tabs value={status} onValueChange={handleTabChange}>
        <TabsList className="bg-transparent border-b border-gray-200 rounded-none p-0 h-auto">
        <TabsTrigger
            value="Pending"
            className="data-[state=active]:border-b-2 text-black data-[state=active]:border-b-black data-[state=active]:text-black data-[state=active]:bg-transparent rounded-none border-b-2 border-transparent"
          >
            Pending
          </TabsTrigger>
          <TabsTrigger
            value="Rejected"
            className="data-[state=active]:border-b-2 text-black data-[state=active]:border-b-black data-[state=active]:text-black data-[state=active]:bg-transparent rounded-none border-b-2 border-transparent"
          >
            Rejected
          </TabsTrigger>
         
          <TabsTrigger
            value="Approval"
            className="data-[state=active]:border-b-2 text-black data-[state=active]:border-b-black data-[state=active]:text-black data-[state=active]:bg-transparent rounded-none border-b-2 border-transparent"
          >
            Approved
          </TabsTrigger>
        </TabsList>

        <TabsContent value={status} className="mt-6 space-y-4">
          <TableComponent
            data={data?.data || []}
            columns={spvTableCols()}
            model="spv"
          />

          {/* Pagination */}
          {pagination && (
            <div className="flex items-center justify-between pt-4">
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">Per page</span>
                <Select
                  value={limit.toString()}
                  onValueChange={(value) => {
                    setLimit(Number(value));
                    setPage(1);
                  }}
                >
                  <SelectTrigger className="w-20 h-8">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="10">10</SelectItem>
                    <SelectItem value="20">20</SelectItem>
                    <SelectItem value="50">50</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setPage((p) => Math.max(1, p - 1))}
                      disabled={!pagination.hasPreviousPage}
                      className="h-8 w-8"
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                  </PaginationItem>
                  <PaginationItem>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() =>
                        setPage((p) =>
                          pagination.hasNextPage ? p + 1 : p
                        )
                      }
                      disabled={!pagination.hasNextPage}
                      className="h-8 w-8"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SpvListPage;
