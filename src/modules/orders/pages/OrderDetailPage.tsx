"use client"
import React from 'react'
import Header from '../components/header'
import FinancialSummary from '../components/financialSummary'
import { ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'

const OrderDetailPage = () => {
    const router = useRouter();
    return (
        <div className='space-y-4'>
            <div className='flex items-center gap-2'>
                <ArrowLeft
                    onClick={() => router.back()}
                    className="cursor-pointer"
                    size={20}
                />
                <h1 className='text-2xl font-semibold'>Order Details</h1>
            </div>
            <Header />
           <div className='grid grid-cols-2'>
           <FinancialSummary />
           </div>
        </div>

    )
}

export default OrderDetailPage