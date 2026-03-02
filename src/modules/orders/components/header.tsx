"use client"
import { StatusBadge } from '@/lib/statusBadge'
import { handleCopy } from '@/utils/globalFunctions'
import { CopyIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React from 'react'

const Header = () => {
    const router = useRouter();
    return (
        <>
            <div className='flex justify-between items-center gap-2 border p-4 rounded-md'>
                <div className='flex flex-col gap-2'>
                    <div className='flex items-center gap-2 text-gray-500'>
                        <p className='text-black'>ORD-1234</p>
                        <CopyIcon className='w-4 h-4' onClick={() => handleCopy('1234')} />

                    </div>
                    <div className='flex items-center gap-2 text-gray-500 text-sm'>
                        <p>
                            Created at:
                        </p>
                        <p className='text-black'>2026-03-02 10:00:00</p>
                    </div>
                    <div className='flex items-center gap-2 text-gray-500 text-sm'>
                        <p>
                            Status:
                        </p>
                        <StatusBadge status="In Progress" />
                    </div>
                </div>
                <div className='flex flex-col gap-2'>
                    <div className='flex items-center gap-2'>
                        <p className='text-gray-500 text-sm'>Issuer Name:</p>
                        <p className='text-primary text-sm hover:underline cursor-pointer' onClick={() => router.push(`/issuers/${'1234'}`)}>Green Energy Pvt Ltd</p>
                    </div>
                    <div className='flex items-center gap-2'>
                        <p className='text-gray-500 text-sm'>SPV Name:</p>
                        <p className='text-primary text-sm hover:underline cursor-pointer' onClick={() => router.push(`/spv/${'1234'}`)}>Green Energy SPV Pvt Ltd</p>
                    </div>
                    <div className='flex items-center gap-2'>
                        <p className='text-gray-500 text-sm'>Investor Name:</p>
                        <p className='text-primary text-sm hover:underline cursor-pointer' onClick={() => router.push(`/issuers/${'1234'}`)}>John Doe</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Header