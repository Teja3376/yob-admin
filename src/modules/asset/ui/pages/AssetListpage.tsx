"use client";

import React, { useState } from "react";
import TableComponent from "@/components/common/TableComponent";
import { Search, X, FileText, Check, Clock, Building, Car } from "lucide-react";
import { assetTableCols, vehicleTableCols } from "../../schema/assetTableSchema";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";

import Pagination from "@/components/common/Pagination";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebounce } from "@/config/useDebounce";
import Loading from "@/components/Loader";
import { useAuthStore1 } from "@/modules/adminauth/state/adminAuthStore";
import PageTitle from "@/components/PageTitle";
import { useGetAssetCount } from "../../hooks/useGetAssetCount";
import DashboardCard from "@/modules/orders/ui/DashboardCard";
import ErrorPage from "@/components/Error";
import { DashboardCardSkeleton } from "@/components/DashboardSkeleton";
import queryString from "query-string";

import { Button } from "@/components/ui/button";
import { useGetVehicleApprovalList } from "../../hooks/vehicles/useGetVehicleApprovalList";
import { useGetAllAsset } from "../../hooks/useGetAllAsset";

type StatusTab = "pending" | "rejected" | "approved";

export const Classes = [
  {
    name: "Real Estate",
    href: "real-estate",
    icon: Building,
  },
  {
    name: "Luxury Vehicles",
    href: "vehicles",
    icon: Car,
  },
];

const FILTER_STATUS_OPTIONS = [
  // { label: "All", value: "all" },
  {
    label: "Active",
    value: "active",
    className:
      "bg-blue-100 text-blue-800 hover:text-blue-800 hover:bg-blue-200 border border-blue-300",
    active: "bg-blue-500 text-white",
  },
  {
    label: "Listing Ended",
    value: "listing-ended",
    className:
      "bg-gray-100 text-gray-800 hover:bg-gray-200  border border-gray-300",
    active: "bg-gray-500 text-white",
  },
  {
    label: "Fully Funded",
    value: "fully-funded",
    className:
      "bg-purple-100 text-purple-800 hover:bg-purple-200  border border-purple-300",
    active: "bg-purple-500 text-white",
  },
  {
    label: "Waitlist",
    value: "waitlist",
    className:
      "bg-yellow-100 text-yellow-800 hover:text-yellow-800 hover:bg-yellow-100 border border-yellow-300",
    active: "bg-yellow-500 text-white",
  },
];

const AssetListpage = () => {
  const router = useRouter();
  const { hasPermission } = useAuthStore1();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const queryParams = queryString.parse(searchParams.toString());
  const assetClass = (queryParams?.class as string) || "real-estate";
  const [status, setStatus] = useState<StatusTab>("approved");
  const [issuerStatus, setIssuerStatus] = useState<string>("all");
  const {
    data: assetCount,
    isFetching: isFetchingAssetCount,
    isError: isAssetCountError,
    error: assetCountError,
  } = useGetAssetCount();
  const [searchQuery, setSearchQuery] = useState("");
  const searchTerm = useDebounce(searchQuery, 500);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const canView = hasPermission("assets", "review");
  const cols = assetTableCols(router, status, canView);
  const cols2 = vehicleTableCols(router, status, canView);

  const {
    data,
    isFetching: isRealEstateLoading,
    isError: isRealEstateError,
    error,
  } = useGetAllAsset(
    {
      page,
      limit,
      status,
      search: searchTerm,
      issuerStatus,
    },
    {
      enabled: assetClass === "real-estate",
    },
  );
  const {
    data: vehicles,
    isFetching: isVehiclesLoading,
    isError: isVehiclesError,
    error: vehiclesError,
  } = useGetVehicleApprovalList(
    {
      page,
      limit,
      status,
      search: searchTerm,
      issuerStatus,
    },
    { enabled: assetClass === "vehicles" },
  );

  const handleTabChange = (value: string) => {
    setStatus(value as StatusTab);
    setIssuerStatus("all");
    setPage(1); // Reset to first page when changing tabs
  };

  const onPageChange = (newPage: number) => {
    setPage(newPage);
  };

  const onPageSizeChange = (pageSize: number) => {
    setLimit(pageSize);
    setPage(1);
  };

  const isLoading = isRealEstateLoading || isVehiclesLoading;
  if (isLoading && isFetchingAssetCount) {
    return (
      <div className="flex items-center justify-center mt-20">
        <Loading message="Loading Asset List and Count..." />
      </div>
    );
  }

  if (isRealEstateError && !data) {
    return (
      <ErrorPage
        title="Error Gathering Asset List"
        errorMessage={error?.message || "Assets not found"}
      />
    );
  }
  if (isVehiclesError && !vehicles) {
    return (
      <ErrorPage
        title="Error Gathering Asset List"
        errorMessage={vehiclesError?.message || "Assets not found"}
      />
    );
  }
  if (isAssetCountError && !assetCount) {
    return (
      <ErrorPage
        title="Error Gathering Assets Stats"
        errorMessage={assetCountError?.message || "Assets Stats not found"}
      />
    );
  }

  const handleClassChange = (classId: string) => {
    router.push(`${pathname}?class=${classId}`);
  };

  const pagination = data?.pagination || vehicles?.pagination;
  return (
    <div className="space-y-6">
      <div className="grid grif-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {isFetchingAssetCount ? (
          Array.from({ length: 4 }).map((_, i) => (
            <DashboardCardSkeleton key={i} />
          ))
        ) : (
          <>
            <DashboardCard
              title="Total Assets"
              value={`${assetCount?.total || "0"}`}
              rightIcon={<FileText size={20} className="text-primary" />}
              rightIconClassName="border-2 border-primary rounded-full p-2 bg-primary/10"
              containerClassName="rounded-lg"
            />

            <DashboardCard
              title="Approved Assets"
              value={`${assetCount?.approved || "0"}`}
              rightIcon={<Check size={20} className="text-green-500" />}
              rightIconClassName="border-2 border-green-500 rounded-full p-2 bg-green-100"
              containerClassName="rounded-lg"
            />

            <DashboardCard
              title="Pending Assets"
              value={`${assetCount?.pending || "0"}`}
              rightIcon={<Clock size={20} className="text-yellow-500" />}
              rightIconClassName="border-2 border-yellow-500 rounded-full p-2 bg-yellow-100"
              containerClassName="rounded-lg"
            />

            <DashboardCard
              title="Rejected Assets"
              value={`${assetCount?.rejected || "0"}`}
              rightIcon={<X size={20} className="text-red-500" />}
              rightIconClassName="border-2 border-red-500 rounded-full p-2 bg-red-100"
              containerClassName="rounded-lg"
            />
          </>
        )}
      </div>
      <PageTitle title={"List of Assets"} suffix="Assets" />

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

      <div className="flex items-center gap-4">
        {Classes.map((item) => {
          const Icon = item.icon;
          return (
            <Button
              key={item.href}
              onClick={() => handleClassChange(item.href)}
              className={`px-3 py-2 h-15 w-40 gap-2 rounded-lg text-sm font-medium border  ${
                assetClass === item.href
                  ? "bg-primary/10 text-primary border-primary hover:bg-primary/20"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300 border-gray-300"
              }`}
            >
              <span>
                <Icon />
              </span>
              {item.name}
            </Button>
          );
        })}
      </div>

      {/* Tabs */}
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

        {status === "approved" && (
          <div className="flex items-center gap-2 mt-4">
            {/* <span className="text-sm text-gray-500">FILTER STATUS:</span> */}

            {FILTER_STATUS_OPTIONS.map((item) => (
              <button
                key={item.value}
                onClick={() => {
                  setIssuerStatus(item.value);
                  setPage(1);
                }}
                className={`px-3 rounded-full text-sm font-medium py-1 cursor-pointer ${
                  issuerStatus === item.value ? item.active : item.className
                }`}
              >
                {item.label}
              </button>
            ))}

            {issuerStatus !== "all" && (
              <button
                onClick={() => {
                  setIssuerStatus("all");
                  setPage(1);
                }}
                className="px-3 rounded-full text-sm font-medium py-1 cursor-pointer "
              >
                Clear Filter
              </button>
            )}
          </div>
        )}

        <TabsContent value={status} className="mt-6 space-y-4">
          {isLoading && !data ? (
            <div className="flex items-center justify-center mt-20">
              <Loading message="Loading..." />
            </div>
          ) : assetClass === "real-estate" ? (
            <TableComponent
              data={data?.data || []}
              columns={cols}
              model="asset"
            />
          ) : assetClass === "vehicles" ? (
            <TableComponent
              data={vehicles?.data || []}
              columns={cols2}
              model="vehicles"
            />
          ) : null}
        </TabsContent>
      </Tabs>
      {pagination &&  (
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

export default AssetListpage;
