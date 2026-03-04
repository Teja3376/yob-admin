"use client"
import { OrderStatus, StatusBadge } from '@/lib/statusBadge'
import { handleCopy } from '@/utils/globalFunctions'
import { CopyIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React from 'react'
import { OrderDetail } from '../types/OrderDetail'
import { formatDate } from '@/lib/utils'

const Header = ({ orderDetail }: { orderDetail: OrderDetail }) => {
    const router = useRouter();
    console.log(orderDetail, 'orderDetail');
    return (
        <>
            <div className='flex justify-between items-center gap-2 border p-4 rounded-md'>
                <div className='flex flex-col gap-2'>
                    <div className='flex items-center gap-2 text-gray-500'>
                        <p className='text-black'>ORD-{orderDetail?._id?.slice(-4)?.toUpperCase()}</p>
                        <CopyIcon className='w-4 h-4 cursor-pointer' onClick={() => handleCopy(orderDetail?._id)} />

                    </div>
                    <div className='flex items-center gap-2 text-gray-500 text-sm'>
                        <p>
                            Created at:
                        </p>
                        <p className='text-black'>{formatDate(orderDetail?.createdAt)}</p>
                    </div>
                    <div className='flex items-center gap-2 text-gray-500 text-sm'>
                        <p>
                            Status:
                        </p>
                        <StatusBadge status={orderDetail?.status as OrderStatus} />
                    </div>
                </div>
                <div className='flex flex-col gap-2'>
                    <div className='flex items-center gap-2'>
                        <p className='text-gray-500 text-sm'>Issuer Name:</p>
                        <p className='text-primary text-sm hover:underline cursor-pointer' onClick={() => router.push(`/issuers/${orderDetail?.issuer?._id}`)}>{orderDetail?.issuer?.firstName} {orderDetail?.issuer?.lastName}</p>
                    </div>
                    <div className='flex items-center gap-2'>
                        <p className='text-gray-500 text-sm'>Asset Name:</p>
                        <p className='text-primary text-sm hover:underline cursor-pointer' onClick={() => router.push(`/asset-list/${orderDetail?.asset?._id}`)}>{orderDetail?.asset?.name}</p>
                    </div>
                    <div className='flex items-center gap-2'>
                        <p className='text-gray-500 text-sm'>Investor Name:</p>
                        <p className='text-primary text-sm hover:underline cursor-pointer' onClick={() => router.push(`/issuers/${'1234'}`)}>{orderDetail?.investor?.name}</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Header