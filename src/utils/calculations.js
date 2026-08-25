import { CATEGORIES } from '../data/categories';

/**
 * Calculate total sum of expenses
 */
export const calculateTotalSpending = (expenses = []) => {
  return expenses.reduce((sum, item) => sum + (Number(item.amount) || 0), 0);
};

/**
 * Calculate total count of expenses
 */
export const calculateTotalExpensesCount = (expenses = []) => {
  return expenses.length;
};

/**
 * Calculate average expense amount
 */
export const calculateAverageExpense = (expenses = []) => {
  if (!expenses || expenses.length === 0) return 0;
  const total = calculateTotalSpending(expenses);
  return total / expenses.length;
};

/**
 * Determine the top category with the highest spending
 */
export const calculateTopCategory = (expenses = []) => {
  if (!expenses || expenses.length === 0) {
    return { category: 'None', amount: 0, percentage: 0 };
  }

  const categoryTotals = {};
  expenses.forEach((item) => {
    const cat = item.category || 'Other';
    categoryTotals[cat] = (categoryTotals[cat] || 0) + (Number(item.amount) || 0);
  });

  let topCat = 'None';
  let maxAmount = 0;

  Object.entries(categoryTotals).forEach(([cat, amount]) => {
    if (amount > maxAmount) {
      maxAmount = amount;
      topCat = cat;
    }
  });

  const total = calculateTotalSpending(expenses);
  const percentage = total > 0 ? Math.round((maxAmount / total) * 100) : 0;

  return {
    category: topCat,
    amount: maxAmount,
    percentage
  };
};

/**
 * Returns breakdown of spending by category with amounts, percentages, colors, icons
 */
export const calculateCategoryBreakdown = (expenses = []) => {
  const total = calculateTotalSpending(expenses);

  const categoryTotals = {};
  CATEGORIES.forEach((c) => {
    categoryTotals[c.id] = 0;
  });

  expenses.forEach((item) => {
    const cat = item.category || 'Other';
    categoryTotals[cat] = (categoryTotals[cat] || 0) + (Number(item.amount) || 0);
  });

  return CATEGORIES.map((cat) => {
    const amount = categoryTotals[cat.id] || 0;
    const percentage = total > 0 ? Number(((amount / total) * 100).toFixed(1)) : 0;
    const count = expenses.filter((e) => e.category === cat.id).length;

    return {
      id: cat.id,
      name: cat.name,
      amount,
      percentage,
      count,
      color: cat.color,
      bgColor: cat.bgColor,
      textColor: cat.textColor,
      borderColor: cat.borderColor,
      icon: cat.icon
    };
  }).sort((a, b) => b.amount - a.amount);
};

/**
 * Filter and sort expenses
 */
export const filterAndSortExpenses = (
  expenses = [],
  { searchQuery = '', selectedCategory = 'All', sortBy = 'newest' }
) => {
  let result = [...expenses];

  // 1. Filter by Category
  if (selectedCategory && selectedCategory !== 'All') {
    result = result.filter((item) => item.category === selectedCategory);
  }

  // 2. Filter by Search Query (Case-insensitive description match)
  if (searchQuery && searchQuery.trim()) {
    const query = searchQuery.trim().toLowerCase();
    result = result.filter((item) =>
      item.description?.toLowerCase().includes(query)
    );
  }

  // 3. Sort
  result.sort((a, b) => {
    if (sortBy === 'newest') {
      // Sort by date descending, then id
      const dateComparison = new Date(b.date).getTime() - new Date(a.date).getTime();
      return dateComparison !== 0 ? dateComparison : b.id.localeCompare(a.id);
    }
    if (sortBy === 'oldest') {
      const dateComparison = new Date(a.date).getTime() - new Date(b.date).getTime();
      return dateComparison !== 0 ? dateComparison : a.id.localeCompare(b.id);
    }
    if (sortBy === 'highest') {
      return Number(b.amount) - Number(a.amount);
    }
    if (sortBy === 'lowest') {
      return Number(a.amount) - Number(b.amount);
    }
    return 0;
  });

  return result;
};
