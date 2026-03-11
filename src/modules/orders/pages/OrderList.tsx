"use client";

import { useState } from "react";
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



import { ClipboardCheck, Clock4, ShoppingCartIcon, XIcon } from "lucide-react";

import { useDebounce } from "@/config/useDebounce";
import { useOrderCount } from "../hooks/useOrderCount";
import { useAuthStore1 } from "@/modules/adminauth/state/adminAuthStore";
import PageTitle from "@/components/PageTitle";
import clsx from "clsx";

const OrderList = () => {
  const router = useRouter();
  const{hasPermission}=useAuthStore1()
  const canView=hasPermission("orders","review")

  // -----------------------
  // State
  // -----------------------
  const [searchQuery, setSearchQuery] = useState("");
  const [status, setStatus] = useState<string | undefined>("");
  const [dateRange, setDateRange] = useState<DateRange>();
  const [amountRange, setAmountRange] = useState<{
    min?: number;
    max?: number;
  }>();
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
    toDate: dateRange?.to ? format(dateRange.to, "yyyy-MM-dd") : undefined,
  };

  // Debounce everything
  const filters = useDebounce(rawFilters, 500);

  // -----------------------
  // Fetch Data
  // -----------------------
  const { data: orderList, isFetching, isError, error } = useOrderList(filters);
  const {
    data: orderCount,
    isFetching: isFetchingOrderCount,
    isError: isOrderCountError,
    error: orderError,
  } = useOrderCount();

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

  if (isFetchingOrderCount&&isFetching) {
    return (
      <div className="flex items-center justify-center mt-20">
        <Loading message="Loading..." />
      </div>
    );
  }

  if (isError || isOrderCountError) {
    return (
      <div className="flex items-center justify-center mt-20">
        <p className="text-red-500">
          Error loading Orders list:{" "}
          {error?.message || orderError?.message || "Unknown error"}
        </p>
      </div>
    );
  }

   const ORDER_STATUSES = [
    { label: "All", value: "" },
    { label: "Pending", value: "pending" },
    { label: "Completed", value: "completed" },
    { label: "Failed", value: "failed" },
  ];
  return (
    <div className="space-y-6">
      <PageTitle title={"List of Orders"} suffix="Orders" />
      <h1 className="text-2xl font-semibold">Orders</h1>

      {/* Dashboard Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <DashboardCard
          title="Total Orders"
          value={orderCount?.totalOrders || "0"}
          rightIcon={<ShoppingCartIcon className="w-6 h-6 text-blue-500" />}
          rightIconClassName="border-2 border-blue-200 rounded-full p-2 bg-blue-100"
          containerClassName="rounded-lg"
        />
        <DashboardCard
          title="Orders Completed"
          value={orderCount?.completed || "0"}
          rightIcon={<ClipboardCheck className="w-6 h-6 text-green-500" />}
          rightIconClassName="border-2 border-green-200 rounded-full p-2 bg-green-100"
          containerClassName="rounded-lg"
        />
        <DashboardCard
          title="Order In Progress"
          value={orderCount?.order_pending || "0"}
          rightIcon={<Clock4 className="w-6 h-6 text-yellow-500" />}
          rightIconClassName="border-2 border-yellow-200 rounded-full p-2 bg-yellow-100"
          containerClassName="rounded-lg"
        />
        <DashboardCard
          title="Orders Failed"
          value={orderCount?.order_failed || "0"}
          rightIcon={<XIcon className="w-6 h-6 text-red-500" />}
          rightIconClassName="border-2 border-red-200 rounded-full p-2 bg-red-100"
          containerClassName="rounded-lg"
        />
      </div>

      <h2 className="text-xl font-semibold">Orders List</h2>

      {/* Filters */}
      <div className="flex items-center gap-2">
        <Input
          placeholder="Search"
          className="w-full"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        <DateRangePicker
          placeholder="Select date range"
          range={dateRange}
          onSelect={setDateRange}
        />

        {/* <AmountRangePicker
          placeholder="Select amount range"
          range={amountRange}
          currency={orderList?.data?.[0]?.asset?.currency || "USD"}
          onChange={setAmountRange}
        /> */}

        {/* <Select
          value={status}
          onValueChange={(value) =>
            setStatus(value === "all" ? undefined : value)
          }
        >
          <SelectTrigger className="w-45">
            <SelectValue placeholder="Select status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="failed">Failed</SelectItem>
          </SelectContent>
        </Select> */}
          {ORDER_STATUSES.map((item) => {
            const isActive = status === item.value;
            return (
              <Button
                key={item.value}
                onClick={() => {
                  setStatus(item.value);
                  setPage(1);
                }}
                className={clsx(
                  "px-4 py-0! text-xs font-medium rounded-full border transition-all",
                  isActive
                    ? "bg-primary text-white border-primary shadow-sm hover:bg-primary"
                    : "bg-white text-muted-foreground border-gray-200 hover:border-primary! hover:text-white!",
                )}
              >
                {item.label}
              </Button>
            );
          })}

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
            className="flex items-center gap-2 border border-gray-200 rounded-md px-3 py-2"
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
          columns={orderListColumn(router,canView)}
          data={orderList?.data || []}
          model="order"
        />
      )}

      {/* Pagination */}
      {pagination && orderList?.data?.length > 0 && (
        <Pagination
          limit={pageLimit}
          currentPage={pageNumber}
          totalPages={totalPages}
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
