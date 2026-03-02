import React from 'react'

const FinancialSummary = () => {
  return (
    <div className='border p-4 rounded-md'>
      <h2 className='text-xl font-medium mb-4'>Financial Details</h2>
      <div className='grid grid-cols-2 gap-4'>
        <div className='space-y-4'>
          <div className='space-y-1'>
            <p className='font-medium'>SPV Currency (INR)</p>
            <hr />
          </div>
          <div className='space-y-1'>
            <p className='text-sm text-gray-500'>Tokens Purchased</p>
            <p className='font-medium'>100</p>
          </div>
          <div className='space-y-1'>
            <p className='text-sm text-gray-500'>Token Price</p>
            <p className='font-medium'>1000</p>
          </div>
        </div>
        <div className='space-y-4'>
          <div className='space-y-1'>
            <p className='font-medium'>Investor Currency (EUR)</p>
            <hr />
          </div>
          <div className='space-y-1'>
            <p className='text-sm text-gray-500'>FX Rate</p>
            <p className='font-medium'>0.011245</p>
          </div>
          <div className='space-y-1'>
            <p className='text-sm text-gray-500'>Investor Paid Amount</p>
            <p className='font-medium'>139.95</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FinancialSummary