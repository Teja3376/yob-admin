import { getLocales } from "locale-currency";
export function formatCurrency(
    amount: number | string,
    currency: string = "USD",
    locale: string = "en-US"
  ): string {
    const value = Number(amount);
  
    if (isNaN(value)) return new Intl.NumberFormat(locale, {
      style: "currency",
      currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(0);
  
    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  }

  function normalizeLocale(locale: string): string {
  if (locale.includes("-")) return locale;
  return `en-${locale}`;
}

export function formatCurrencyWithLocale(
  value: string | number | null | undefined,
  currency: string = "USD",
  compact: boolean = false,
  minimumFractionDigits: number = 0,
  maximumFractionDigits: number = 2,
): string {
  const amount = typeof value === "string" ? Number.parseFloat(value) : value;

  if (amount === null || amount === undefined || Number.isNaN(amount)) {
    return formatCurrencyWithLocale(
      0,
      currency,
      compact,
      minimumFractionDigits,
      maximumFractionDigits,
    );
  }

  let locale = getLocales(currency)[0] || "en-US";
  locale = normalizeLocale(locale);

  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    notation: compact ? "compact" : "standard",
    compactDisplay: "short",
    minimumFractionDigits,
    maximumFractionDigits,
  }).format(amount);
}