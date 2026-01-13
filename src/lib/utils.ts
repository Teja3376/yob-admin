import { clsx, type ClassValue } from "clsx";
import { format, isValid } from "date-fns";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(
  date: string | Date | null | undefined,
  formatStr: string = "yyyy-MM-dd"
): string {
  if (!date) return "-";

  const parsedDate = new Date(date);

  if (!isValid(parsedDate)) return "-";

  return format(parsedDate, formatStr);
}
