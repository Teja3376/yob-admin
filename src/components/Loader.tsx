import { cn } from "@/lib/utils";

function Loading({
  color = "bg-transparent",
  message,
}: {
  color?: string;
  message?: string;
}) {
  return (
    <div className={cn(" flex items-center justify-center", color)}>
      <div className=" bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#FF6B00] mx-auto mb-4" />
          <p className="text-gray-600">{message || "Loading..."}</p>
        </div>
      </div>
    </div>
  );
}
export default Loading;
