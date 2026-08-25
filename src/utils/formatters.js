/**
 * Formats a number as Indian Currency (INR)
 * e.g., 250 -> ₹250, 1250 -> ₹1,250, 25000 -> ₹25,000
 */
export const formatCurrency = (amount) => {
  const num = Number(amount) || 0;
  // Format to standard Indian comma notation without decimals unless there are cents
  const formatted = num.toLocaleString('en-IN', {
    maximumFractionDigits: 2,
    minimumFractionDigits: 0
  });
  return `₹${formatted}`;
};

/**
 * Formats a date string 'YYYY-MM-DD' into 'MMM DD, YYYY'
 * e.g., '2026-08-25' -> 'Aug 25, 2026'
 */
export const formatDate = (dateStr) => {
  if (!dateStr) return '';
  try {
    const [year, month, day] = dateStr.split('-');
    if (!year || !month || !day) return dateStr;
    const date = new Date(Number(year), Number(month) - 1, Number(day));
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  } catch (e) {
    return dateStr;
  }
};

/**
 * Returns today's date in YYYY-MM-DD format
 */
export const getTodayDateString = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};
