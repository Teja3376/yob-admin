"use client";

import React, { useState } from "react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { DateRange } from "react-day-picker";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface DateRangePickerProps {
  range?: DateRange;
  onSelect: (range: DateRange | undefined) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
}

const DATE_FORMAT = "dd-MM-yyyy";

const isFutureDate = (date: Date): boolean => {
  const d = new Date(date);
  const t = new Date();
  d.setHours(0, 0, 0, 0);
  t.setHours(0, 0, 0, 0);
  return d.getTime() > t.getTime();
};

export default function DateRangePicker({
  range,
  onSelect,
  placeholder = "Select date range",
  className,
  disabled,
}: DateRangePickerProps) {
  const [open, setOpen] = useState(false);
  const [tempRange, setTempRange] = useState<DateRange | undefined>(range);

  const isSameDay =
    range?.from && range?.to
      ? range.from.getTime() === range.to.getTime()
      : false;

  const label = range?.from
    ? !range.to || isSameDay
      ? `${format(range.from, DATE_FORMAT)} - Select end date`
      : `${format(range.from, DATE_FORMAT)} - ${format(range.to, DATE_FORMAT)}`
    : placeholder;

  const handleApply = () => {
    onSelect(tempRange);
    setOpen(false);
  };

  const handleClear = () => {
    setTempRange(undefined);
    onSelect(undefined);
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          disabled={disabled}
          className={cn(
            "w-[260px] justify-start text-left font-normal rounded-md",
            !range && "text-muted-foreground",
            className
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4 opacity-50" />
          {label}
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-auto p-0" align="start">
        <div className="p-3">
          <Calendar
            mode="range"
            selected={tempRange}
            onSelect={setTempRange}
            numberOfMonths={2}
            captionLayout="dropdown"
            fromYear={1900}
            toYear={2100}
            disabled={(date) => {
              if (isFutureDate(date)) return true;
              if (tempRange?.from && date < tempRange.from) return true;
              return false;
            }}
          />

          <div className="flex justify-end gap-2 mt-3">
            <Button variant="outline" size="sm" onClick={handleClear}>
              Clear
            </Button>

            <Button size="sm" onClick={handleApply}>
              Apply
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}