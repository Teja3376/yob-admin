import InvestorDetailpage from '@/modules/investors/pages/InvestorDetailpage'
import { Metadata } from 'next';
export const metadata: Metadata = {
  title: "Profile of Investor",
};

const InvestorDetailRoute = () => {
  return (
    <InvestorDetailpage />
  )
}

export default InvestorDetailRoute