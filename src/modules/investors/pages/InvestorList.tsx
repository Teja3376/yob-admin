"use client"
import React, { useState } from 'react'
import { investorColumns } from '../schemas/listcolumn'
import { useRouter } from 'next/navigation'
import TableComponent from '@/components/common/TableComponent'
import { useInvestorList } from '../hooks/useInvestorList'
import Loading from '@/components/Loader'
import Pagination from '@/components/common/Pagination'
import { Input } from '@/components/ui/input'
import DateRangePicker from '@/components/common/DateRangePicker'
import { DateRange } from 'react-day-picker'
import { format } from 'date-fns'
import { useDebounce } from '@/config/useDebounce'
import { Button } from '@/components/ui/button'
import { XIcon } from 'lucide-react'
import { useAuthStore1 } from '@/modules/adminauth/state/adminAuthStore'

const InvestorList = () => {
    const router = useRouter();
     const{hasPermission}=useAuthStore1()
      const canView=hasPermission("investors","review")
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [searchQuery, setSearchQuery] = useState('');
    const [dateRange, setDateRange] = useState<DateRange>();
    const isValidRange =
        dateRange?.from &&
        dateRange?.to &&
        dateRange.from.getTime() !== dateRange.to.getTime();

    const rawFilters = {
        search: searchQuery || undefined,
        page,
        limit,
        ...(isValidRange && {
            fromDate: format(dateRange.from!, "yyyy-MM-dd"),
            toDate: format(dateRange.to!, "yyyy-MM-dd"),
        }),
    };

    const filters = useDebounce(rawFilters, 1000)
    const { data: investorList, isFetching,isError,error } = useInvestorList(filters);

    const pagination = investorList?.pagination;

    const pageNumber = pagination?.page ?? 1;
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
    const clearFilters = () => {
        setSearchQuery('');
        setDateRange(undefined);
    }

    if (isFetching) {
        return (
            <div className="flex items-center justify-center mt-20">
                <Loading message="Loading..." />
            </div>
        )
    }
    if (isError) {
    return (
      <div className="flex items-center justify-center mt-20">
        <p className="text-red-500">
          Error loading Investor list: {error?.message || "Unknown error"}
        </p>
      </div>
    );
  }

    return (
        <div className='space-y-4'>
            <h1 className='text-2xl font-semibold'>Investors</h1>
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
                {((searchQuery || dateRange?.from || dateRange?.to) && (
                    <Button variant="outline" onClick={clearFilters}>
                        <XIcon size={16} />
                        Clear
                    </Button>
                ))}
            </div>
            <TableComponent columns={investorColumns(router,canView)} data={investorList?.data ?? []} model="investor" />
            {pagination && investorList?.data?.length > 0 && (
                <Pagination
                    limit={limit}
                    currentPage={pageNumber}
                    totalPages={totalPages}
                    hasNextPage={hasNextPage}
                    hasPreviousPage={hasPreviousPage}
                    onPageChange={onPageChange}
                    onPageSizeChange={onPageSizeChange}
                />)}
        </div>
    )
}

export default InvestorList