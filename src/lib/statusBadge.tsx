import React from "react";

export type OrderStatus = "initiated" | "in progress" | "completed" | "failed" | "order_failed";


export const StatusBadge = ({ status }: { status: OrderStatus }) => {
  const baseStyle =
    "px-3 py-1 rounded-full text-xs font-medium inline-flex items-center";

  const statusStyles: Record<OrderStatus, string> = {
    "initiated":
      "bg-gray-50 text-gray-500 border border-gray-200",
    "in progress":
      "bg-yellow-50 text-yellow-500 border border-yellow-200",
    "completed":
      "bg-green-50 text-green-500 border border-green-200",
    "failed":
      "bg-red-50 text-red-500 border border-red-200",
    "order_failed":
      "bg-red-50 text-red-500 border border-red-200",
  };

  return (
    <span className={`${baseStyle} ${statusStyles[status]}`}>
      {status.toLowerCase()}
    </span>
  );
};