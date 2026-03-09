import { formatCurrencyWithLocale } from "@/lib/formatCurrency";
import DashboardCard from "@/modules/orders/ui/DashboardCard"
import { Briefcase, Building, DollarSign, ShoppingCart, Users } from "lucide-react"

interface IssuerStatsProps {
    activeSpvCount: number;
    activeAssetCount: number;
    totalOrders: number;
    totalInvestors: number;
    totalAum: number;
    
}

const IssuerStats = ({issuer}:{issuer:IssuerStatsProps}) => {
  return (
   <div className="mt-3 grid grid-cols-5 gap-3 w-full items-stretch auto-rows-fr">
          <DashboardCard
            leftIcon={<Briefcase size={20} className="text-primary" />}
            value={issuer.activeSpvCount || "0"}
            title="Total Active SPVs"
            containerClassName="shadow-sm"
          />
          <DashboardCard
            leftIcon={<Building size={20} className="text-primary" />}
            value={issuer.activeAssetCount || "0"}
            title="Total Active Assets"
            containerClassName="shadow-sm"
          />
          <DashboardCard
            leftIcon={<ShoppingCart size={20} className="text-primary" />}
            value={issuer.totalOrders || "0"}
            title="Total Completed Orders"
            containerClassName="shadow-sm"
          />
          <DashboardCard
            leftIcon={<Users size={20} className="text-primary" />}
            value={issuer.totalInvestors || "0"}
            title="Total Investors"
            containerClassName="shadow-sm"
          />
          <DashboardCard
            leftIcon={<DollarSign size={20} className="text-primary" />}
            value={formatCurrencyWithLocale(issuer.totalAum || 0)}  
            title="Total AUM"
            containerClassName="shadow-sm"
          />
        </div>
  )
}

export default IssuerStats
