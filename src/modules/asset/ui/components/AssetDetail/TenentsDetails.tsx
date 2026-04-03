import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type Props = {
  tenants: any[];
};

export default function TenantsSection({ tenants }: Props) {
  return (
    <Card className="rounded-2xl shadow-sm">
      <CardHeader>
        <CardTitle>Current Tenants</CardTitle>
      </CardHeader>

      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {tenants?.map((tenant) => {
            const leaseYears = Math.floor(
              (tenant?.leasePeriod || 0) / 12
            );

            return (
              <div
                key={tenant._id}
                className="border rounded-2xl p-5 flex items-start gap-4"
              >
                
                {/* Logo / Avatar */}
                <div className="w-14 h-14 rounded-xl bg-gray-100 flex items-center justify-center">
                  {tenant?.logo ? (
                    <img
                      src={tenant.logo}
                      alt="logo"
                      className="w-full h-full object-cover rounded-xl"
                    />
                  ) : (
                    <span className="text-gray-400 text-sm">
                      N/A
                    </span>
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 space-y-3">
                  
                  {/* Name + Tag */}
                  <div>
                    <p className="font-semibold text-gray-900">
                      {tenant?.name}
                    </p>

                    <span className="inline-block mt-1 text-xs px-2 py-1 rounded-full bg-orange-100 text-orange-600">
                      {tenant?.type === "individual"
                        ? "INDIVIDUAL"
                        : tenant?.type?.toUpperCase()}
                    </span>
                  </div>

                  {/* Info Row */}
                  <div className="flex justify-between text-sm">
                    
                    <div>
                      <p className="text-gray-500">
                        Lease Period
                      </p>
                      <p className="font-medium">
                        {leaseYears} Years
                      </p>
                    </div>

                    <div>
                      <p className="text-gray-500">
                        Area Occupied
                      </p>
                      <p className="font-medium">
                        {tenant?.sftsAllocated?.toLocaleString()} SFT
                      </p>
                    </div>

                  </div>

                </div>
              </div>
            );
          })}

        </div>
      </CardContent>
    </Card>
  );
}