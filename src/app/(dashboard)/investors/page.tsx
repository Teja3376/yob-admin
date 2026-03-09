import InvestorList from '@/modules/investors/pages/InvestorList'
import { Metadata } from 'next';
export const metadata: Metadata = {
  title: "List of Investors",
};

const InvestorsRoute = () => {
  return (
    <InvestorList />
  )
}

export default InvestorsRoute