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