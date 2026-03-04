"use client"
import React from 'react'
import { investorColumns } from '../schemas/investorColumns'
import { mockInvestors } from '../mock/mockInvestors'
import { useRouter } from 'next/navigation'
import TableComponent from '@/components/common/TableComponent'

const InvestorList = () => {
    const router = useRouter()
  return (
    <div className='space-y-4'>
    <h1 className='text-2xl font-semibold'>Investors</h1>
    <TableComponent columns={investorColumns(router)} data={mockInvestors} model="investor" />
    </div>
  )
}

export default InvestorList