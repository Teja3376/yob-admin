'use client';

import React, { useState, useEffect } from 'react';
import { format } from "date-fns";
import { DateRange } from "react-day-picker";
import { useRouter } from "next/navigation";

import DashboardCard from "../ui/DashboardCard";
import TableComponent from "@/components/common/TableComponent";
import { orderListColumn } from "../schemas/orderListColumn";
import { useOrderList } from "../hooks/useOrderList";

import { Input } from "@/components/ui/input";
import DateRangePicker from "@/components/common/DateRangePicker";
import AmountRangePicker from "@/components/common/AmountRangePicker";
import { Button } from "@/components/ui/button";
import Loading from "@/components/Loader";
import Pagination from "@/components/common/Pagination";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  ClipboardCheck,
  Clock4,
  DollarSign,
  ShoppingCartIcon,
  XIcon
} from "lucide-react";

import { useDebounce } from '@/config/useDebounce';

const OrderList = () => {
  const router = useRouter();

  // -----------------------
  // State
  // -----------------------
  const [searchQuery, setSearchQuery] = useState('');
  const [status, setStatus] = useState<string | undefined>();
  const [dateRange, setDateRange] = useState<DateRange>();
  const [amountRange, setAmountRange] = useState<{ min?: number; max?: number }>();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  // -----------------------
  // Build Filters
  // -----------------------
  const rawFilters = {
    search: searchQuery || undefined,
    status: status || undefined,
    page,
    limit,
    fromDate: dateRange?.from
      ? format(dateRange.from, "yyyy-MM-dd")
      : undefined,
    toDate: dateRange?.to
      ? format(dateRange.to, "yyyy-MM-dd")
      : undefined,
    minAmount: amountRange?.min,
    maxAmount: amountRange?.max,
  };

  // Debounce everything
  const filters = useDebounce(rawFilters, 500);

  // -----------------------
  // Fetch Data
  // -----------------------
  const { data: orderList, isFetching } = useOrderList(filters);

  // -----------------------
  // Pagination Mapping
  // -----------------------
  const pagination = orderList?.pagination;

  const pageNumber = pagination?.page ?? 1;
  const pageLimit = pagination?.limit ?? 10;
  const totalPages = pagination?.totalPages ?? 1;
  const totalCount = pagination?.total ?? 0;

  const hasPreviousPage = pageNumber > 1;
  const hasNextPage = pageNumber < totalPages;

  const onPageChange = (newPage: number) => {
    setPage(newPage);
  };

  const onPageSizeChange = (newLimit: number) => {
    setLimit(newLimit);
    setPage(1);
  };

  // -----------------------
  // Render
  // -----------------------
  return (
    <div className='space-y-6'>

      <h1 className='text-2xl font-semibold'>Orders</h1>

      {/* Dashboard Cards */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
        <DashboardCard
          title="Total Orders"
          value="100"
          rightIcon={<ShoppingCartIcon className="w-6 h-6 text-blue-500" />}
          rightIconClassName='border-2 border-blue-200 rounded-full p-2 bg-blue-100'
          containerClassName='rounded-lg'
        />
        <DashboardCard
          title="Orders Completed"
          value="80"
          rightIcon={<ClipboardCheck className="w-6 h-6 text-green-500" />}
          rightIconClassName='border-2 border-green-200 rounded-full p-2 bg-green-100'
          containerClassName='rounded-lg'
        />
        <DashboardCard
          title="Order In Progress"
          value="20"
          rightIcon={<Clock4 className="w-6 h-6 text-yellow-500" />}
          rightIconClassName='border-2 border-yellow-200 rounded-full p-2 bg-yellow-100'
          containerClassName='rounded-lg'
        />
        <DashboardCard
          title="Orders Failed"
          value="20"
          rightIcon={<XIcon className="w-6 h-6 text-red-500" />}
          rightIconClassName='border-2 border-red-200 rounded-full p-2 bg-red-100'
          containerClassName='rounded-lg'
        />
      </div>

      <h2 className='text-xl font-semibold'>Orders List</h2>

      {/* Filters */}
      <div className='flex items-center gap-2'>

        <Input
          placeholder='Search'
          className='w-full'
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        <DateRangePicker
          placeholder='Select date range'
          range={dateRange}
          onSelect={setDateRange}
        />

        <AmountRangePicker
          placeholder='Select amount range'
          range={amountRange}
          currency={orderList?.data?.[0]?.asset?.currency || "USD"}
          onChange={setAmountRange}
        />

        <Select
          value={status}
          onValueChange={(value) =>
            setStatus(value === "all" ? undefined : value)
          }
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="payment_success">Payment Success</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="failed">Failed</SelectItem>
          </SelectContent>
        </Select>

        {(searchQuery ||
          status ||
          dateRange?.from ||
          dateRange?.to ||
          amountRange?.min ||
          amountRange?.max) && (
            <Button
              variant="ghost"
              onClick={() => {
                setSearchQuery("");
                setStatus(undefined);
                setDateRange(undefined);
                setAmountRange(undefined);
                setPage(1);
              }}
              className='flex items-center gap-2 border border-gray-200 rounded-md px-3 py-2'
            >
              <XIcon size={16} />
              Clear
            </Button>
          )}
      </div>

      {/* Table */}
      {isFetching ? (
        <Loading message="Loading..." />
      ) : (
        <TableComponent
          columns={orderListColumn(router)}
          data={orderList?.data || []}
          model="order"
        />
      )}

      {/* Pagination */}
      {pagination && orderList?.data?.length > 0 && (
        <Pagination
          page={pageNumber}
          limit={pageLimit}
          currentPage={pageNumber}
          totalPages={totalPages}
          totalCount={totalCount}
          hasNextPage={hasNextPage}
          hasPreviousPage={hasPreviousPage}
          onPageChange={onPageChange}
          onPageSizeChange={onPageSizeChange}
        />
      )}

    </div>
  );
};

export default OrderList;