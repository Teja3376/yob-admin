import React from "react";

export type OrderStatus =
  | "Initiated"
  | "In Progress"
  | "Completed"
  | "Failed"
  | "Order Failed";

const normalizeOrderStatus = (status: string): OrderStatus => {
  if (status === "order_failed") return "Order Failed";
  if (status === "initiated") return "Initiated";
  if (status === "in progress") return "In Progress";
  if (status === "completed") return "Completed";
  return status as OrderStatus;
};

export const StatusBadge = ({ status }: { status: string }) => {
  const baseStyle =
    "px-3 py-1 rounded-full text-xs font-medium inline-flex items-center";

  const normalizedStatus = normalizeOrderStatus(status);

  const statusStyles: Record<OrderStatus, string> = {
    Initiated: "bg-gray-50 text-gray-500 border border-gray-200",
    "In Progress": "bg-yellow-50 text-yellow-500 border border-yellow-200",
    Completed: "bg-green-50 text-green-500 border border-green-200",
    Failed: "bg-red-50 text-red-500 border border-red-200",
    "Order Failed": "bg-red-50 text-red-500 border border-red-200",
  };

  return (
    <span className={`${baseStyle} ${statusStyles[normalizedStatus]}`}>
      {normalizedStatus}
    </span>
  );
};