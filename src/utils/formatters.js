// Indian Rupee Currency and Metric Formatters

export function formatINR(amount, compact = false) {
  if (amount === undefined || amount === null || isNaN(amount)) return '₹0';
  
  const num = Math.abs(amount);
  const sign = amount < 0 ? '-' : '';

  if (compact) {
    if (num >= 10000000) {
      // Crores
      const cr = parseFloat((num / 10000000).toFixed(2));
      return `${sign}₹${cr} Cr`;
    }
    if (num >= 100000) {
      // Lakhs
      const lk = parseFloat((num / 100000).toFixed(2));
      return `${sign}₹${lk}L`;
    }
    if (num >= 1000) {
      // Thousands
      const k = parseFloat((num / 1000).toFixed(1));
      return `${sign}₹${k}K`;
    }
    return `${sign}₹${num}`;
  }

  // Standard Indian comma formatting (e.g. 42,86,420)
  const parts = num.toString().split('.');
  let lastThree = parts[0].substring(parts[0].length - 3);
  const otherNumbers = parts[0].substring(0, parts[0].length - 3);
  if (otherNumbers !== '') {
    lastThree = ',' + lastThree;
  }
  const formattedInt = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ',') + lastThree;
  const formatted = parts.length > 1 ? `${formattedInt}.${parts[1]}` : formattedInt;
  
  return `${sign}₹${formatted}`;
}

export function formatPercent(value, includeSign = true) {
  if (value === undefined || value === null || isNaN(value)) return '0%';
  const sign = includeSign && value > 0 ? '+' : '';
  return `${sign}${value.toFixed(1)}%`;
}
