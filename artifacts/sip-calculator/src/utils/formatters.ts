export function formatINR(num: number): string {
  if (num >= 10000000) return "₹" + (num / 10000000).toFixed(2) + " Cr";
  if (num >= 100000) return "₹" + (num / 100000).toFixed(2) + " L";
  if (num >= 1000) return "₹" + num.toLocaleString("en-IN", { maximumFractionDigits: 0 });
  return "₹" + num.toFixed(0);
}

export function formatNumber(num: number): string {
  return num.toLocaleString("en-IN", { maximumFractionDigits: 2 });
}

export function formatPercent(num: number): string {
  return num.toFixed(1) + "%";
}



