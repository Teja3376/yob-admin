"use client";

import * as React from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { LoaderCircle } from "lucide-react";

type DataTableProps<TData> = {
  data: TData[];
  columns: ColumnDef<TData, any>[];
  bordered?: boolean;
  isLoading?: boolean;
  emptyStateMessage?: string;
};

export function TableComponent<TData>({
  data,
  columns,
  bordered = false,
  isLoading = false,
  emptyStateMessage = "No data available",
}: DataTableProps<TData>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const hasData = table.getRowModel().rows.length > 0;

  return (
    <div
      className={`w-full bg-white ${bordered ? "border border-gray-200" : ""}`}
    >
      {/* Header (always visible) */}
      <div className="border-b bg-gray-50">
        {table.getHeaderGroups().map((headerGroup) => (
          <div key={headerGroup.id} className="flex w-full">
            {headerGroup.headers.map((header) => (
              <div
                key={header.id}
                style={{ width: header.column.getSize() }}
                className="px-4 py-2 text-sm font-medium text-gray-600 "
              >
                {flexRender(
                  header.column.columnDef.header,
                  header.getContext()
                )}
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Body */}
      <div>
        {/* Loading state */}
        {isLoading && (
          <div className="flex items-center justify-center py-10 text-sm text-gray-500">
            <LoaderCircle size={30} className="animate-spin " />
          </div>
        )}

        {/* Empty state */}
        {!isLoading && !hasData && (
          <div className="flex items-center justify-center py-10 text-sm text-gray-500">
            {emptyStateMessage}
          </div>
        )}

        {/* Data rows */}
        {!isLoading &&
          hasData &&
          table.getRowModel().rows.map((row) => (
            <div
              key={row.id}
              className="flex w-full border-b last:border-b-0 hover:bg-gray-50"
            >
              {row.getVisibleCells().map((cell) => (
                <div
                  key={cell.id}
                  style={{ width: cell.column.getSize() }}
                  className="px-4 py-2 text-sm"
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </div>
              ))}
            </div>
          ))}
      </div>
    </div>
  );
}
