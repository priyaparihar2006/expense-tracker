import { SAMPLE_EXPENSES } from '../data/sampleExpenses';

export const STORAGE_KEY = 'expenseTrackerExpenses';

/**
 * Load expenses from LocalStorage.
 * If no data exists in localStorage, initialize with sample data.
 */
export const loadExpenses = () => {
  try {
    const rawData = localStorage.getItem(STORAGE_KEY);
    if (rawData === null) {
      // First time loading: initialize with sample expenses
      saveExpenses(SAMPLE_EXPENSES);
      return SAMPLE_EXPENSES;
    }
    const parsed = JSON.parse(rawData);
    if (Array.isArray(parsed)) {
      return parsed;
    }
    return [];
  } catch (error) {
    console.error('Error loading expenses from LocalStorage:', error);
    return SAMPLE_EXPENSES;
  }
};

/**
 * Save expenses array to LocalStorage.
 */
export const saveExpenses = (expenses) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(expenses));
  } catch (error) {
    console.error('Error saving expenses to LocalStorage:', error);
  }
};

/**
 * Reset expenses to sample default dataset
 */
export const resetToSampleData = () => {
  saveExpenses(SAMPLE_EXPENSES);
  return SAMPLE_EXPENSES;
};

/**
 * Clear all expenses
 */
export const clearAllExpenses = () => {
  saveExpenses([]);
  return [];
};
