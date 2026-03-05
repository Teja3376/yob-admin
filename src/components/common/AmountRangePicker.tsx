"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface AmountRange {
  min?: number;
  max?: number;
}

interface AmountRangePickerProps {
  range?: AmountRange;
  onChange: (range: AmountRange) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  currency?: string; // ISO code (USD, EUR, INR, JPY, etc.)
}

export default function AmountRangePicker({
  range,
  onChange,
  placeholder = "Select amount range",
  className,
  disabled,
  currency = "USD",
}: AmountRangePickerProps) {
  // 🔹 Auto-detect currency symbol
  const symbol =
    new Intl.NumberFormat("en", {
      style: "currency",
      currency,
    })
      .formatToParts(0)
      .find((part) => part.type === "currency")?.value || currency;

  const formatNumber = (value: number) =>
    value.toLocaleString("en-US", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    });

  const label =
    range?.min !== undefined || range?.max !== undefined
      ? `${symbol} ${range?.min !== undefined ? formatNumber(range.min) : 0
        } - ${symbol} ${range?.max !== undefined ? formatNumber(range.max) : "∞"
        }`
      : placeholder;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          disabled={disabled}
          className={cn(
            "w-[200px] justify-start text-left font-normal rounded-md",
            range?.min === undefined &&
              range?.max === undefined &&
              "text-muted-foreground",
            className
          )}
        >
          {label}
        </Button>
      </PopoverTrigger>

      <PopoverContent
        className="w-[300px] p-4 space-y-4 flex gap-2"
        align="start"
      >
        <div className="space-y-2">
          <label className="text-sm font-medium">
            Min Amount
          </label>
          <input
            type="number"
            min={0}
            placeholder="0"
            value={range?.min ?? ""}
            onChange={(e) =>
              onChange({
                ...range,
                min: e.target.value
                  ? Number(e.target.value)
                  : undefined,
              })
            }
            className="w-full border rounded-md px-3 py-2 text-sm"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">
            Max Amount
          </label>
          <input
            type="number"
            min={0}
            placeholder="No limit"
            value={range?.max ?? ""}
            onChange={(e) =>
              onChange({
                ...range,
                max: e.target.value
                  ? Number(e.target.value)
                  : undefined,
              })
            }
            className="w-full border rounded-md px-3 py-2 text-sm"
          />
        </div>
      </PopoverContent>
    </Popover>
  );
}