import { Badge } from '@/components/ui/badge';
import { CheckCircle, XCircle } from 'lucide-react';


const AssetStatus = ({ status, reason }: { status: string; reason?: string }) => {
  return (
    <div className='flex-1 rounded-lg border p-5 shadow-sm space-y-4 mt-4'>
        {status === "approved" && (
        <>
          <div className="flex items-center gap-2">
            <CheckCircle className="text-green-600" />
            <h2 className="font-semibold">Asset Approved</h2>
          </div>

          <p className="text-sm text-muted-foreground">
            This Asset  has been successfully approved.
          </p>

          <Badge className="bg-green-100 text-green-700">Approved</Badge>
        </>
      )}

      {status === "rejected" && (
        <>
          <div className="flex items-center gap-2">
            <XCircle className="text-red-600" />
            <h2 className="font-semibold">Asset Rejected</h2>
          </div>

          <p className="text-sm text-muted-foreground">
            This Asset has been rejected.{" "}
            {reason && <span className="text-red-700">Because of {reason}</span>}
          </p>

          <Badge className="bg-red-100 text-red-700">Rejected</Badge>
        </>
      )}
    </div>
  )
}

export default AssetStatus
