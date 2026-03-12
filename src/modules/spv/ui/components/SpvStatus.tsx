import { Badge } from '@/components/ui/badge';
import { CheckCircle, XCircle } from 'lucide-react';


const SpvStatus = ({ status, reason }: { status: string; reason?: string }) => {
  return (
    <div className='flex-1 rounded-lg border p-5 shadow-sm space-y-4'>
        {status === "Active" && (
        <>
          <div className="flex items-center gap-2">
            <CheckCircle className="text-green-600" />
            <h2 className="font-semibold">SPV Approved</h2>
          </div>

          <p className="text-sm text-muted-foreground">
            This SPV has been successfully approved.
          </p>

          <Badge className="bg-green-100 text-green-700">Approved</Badge>
        </>
      )}

      {status === "Rejected" && (
        <>
          <div className="flex items-center gap-2">
            <XCircle className="text-red-600" />
            <h2 className="font-semibold">Application Rejected</h2>
          </div>

          <p className="text-sm text-muted-foreground">
            This SPV has been rejected.{" "}
            {reason && <span className="text-red-700">Because of {reason}</span>}
          </p>

          <Badge className="bg-red-100 text-red-700">Rejected</Badge>
        </>
      )}
    </div>
  )
}

export default SpvStatus
