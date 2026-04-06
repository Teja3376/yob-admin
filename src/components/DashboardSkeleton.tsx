import { Skeleton } from "./ui/skeleton";

export const DashboardCardSkeleton = () => {
  return (
    <div className="rounded-lg border p-4 flex items-center justify-between">
      <div className="space-y-2">
        <Skeleton className="h-4 w-24" /> {/* title */}
        <Skeleton className="h-6 w-16" /> {/* value */}
      </div>
      <Skeleton className="h-10 w-10 rounded-full" /> {/* icon */}
    </div>
  );
};
