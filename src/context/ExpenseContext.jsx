import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { loadExpenses, saveExpenses, resetToSampleData, clearAllExpenses } from '../utils/storage';
import {
  calculateTotalSpending,
  calculateTotalExpensesCount,
  calculateAverageExpense,
  calculateTopCategory,
  calculateCategoryBreakdown,
  filterAndSortExpenses
} from '../utils/calculations';
import { useToast } from './ToastContext';

const ExpenseContext = createContext(null);

export const ExpenseProvider = ({ children }) => {
  const { addToast } = useToast();

  // Primary data state initialized from LocalStorage
  const [expenses, setExpenses] = useState(() => loadExpenses());

  // UI & Navigation state
  const [activeTab, setActiveTab] = useState('dashboard');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Filter & Search states
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('newest');

  // Modal states
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingExpense, setEditingExpense] = useState(null);

  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [deletingExpense, setDeletingExpense] = useState(null);

  // Persist to localStorage whenever expenses change
  useEffect(() => {
    saveExpenses(expenses);
  }, [expenses]);

  // Derived statistics (memoized for performance)
  const totalSpending = useMemo(() => calculateTotalSpending(expenses), [expenses]);
  const totalCount = useMemo(() => calculateTotalExpensesCount(expenses), [expenses]);
  const averageExpense = useMemo(() => calculateAverageExpense(expenses), [expenses]);
  const topCategoryInfo = useMemo(() => calculateTopCategory(expenses), [expenses]);
  const categoryBreakdown = useMemo(() => calculateCategoryBreakdown(expenses), [expenses]);

  // Filtered and sorted expenses
  const filteredExpenses = useMemo(() => {
    return filterAndSortExpenses(expenses, {
      searchQuery,
      selectedCategory,
      sortBy
    });
  }, [expenses, searchQuery, selectedCategory, sortBy]);

  // Latest 5 expenses for Dashboard
  const recentExpenses = useMemo(() => {
    return [...expenses]
      .sort((a, b) => {
        const dateComparison = new Date(b.date).getTime() - new Date(a.date).getTime();
        return dateComparison !== 0 ? dateComparison : b.id.localeCompare(a.id);
      })
      .slice(0, 5);
  }, [expenses]);

  // Modal Handlers
  const openAddModal = () => {
    setEditingExpense(null);
    setIsFormOpen(true);
  };

  const openEditModal = (expense) => {
    setEditingExpense(expense);
    setIsFormOpen(true);
  };

  const closeFormModal = () => {
    setIsFormOpen(false);
    setEditingExpense(null);
  };

  const openDeleteModal = (expense) => {
    setDeletingExpense(expense);
    setIsDeleteOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteOpen(false);
    setDeletingExpense(null);
  };

  // CRUD Operations
  const addExpense = (data) => {
    const newExpense = {
      id: `exp-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`,
      description: data.description.trim(),
      amount: Number(data.amount),
      category: data.category,
      date: data.date
    };

    setExpenses((prev) => [newExpense, ...prev]);
    closeFormModal();
    addToast('Expense added successfully', 'success');
  };

  const updateExpense = (id, data) => {
    setExpenses((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              description: data.description.trim(),
              amount: Number(data.amount),
              category: data.category,
              date: data.date
            }
          : item
      )
    );
    closeFormModal();
    addToast('Expense updated successfully', 'success');
  };

  const deleteExpense = (id) => {
    setExpenses((prev) => prev.filter((item) => item.id !== id));
    closeDeleteModal();
    addToast('Expense deleted successfully', 'success');
  };

  const resetSample = () => {
    const samples = resetToSampleData();
    setExpenses(samples);
    setSearchQuery('');
    setSelectedCategory('All');
    setSortBy('newest');
    addToast('Reset to sample expenses', 'info');
  };

  const clearAll = () => {
    const empty = clearAllExpenses();
    setExpenses(empty);
    addToast('All expenses cleared', 'warning');
  };

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setSortBy('newest');
  };

  const value = {
    expenses,
    filteredExpenses,
    recentExpenses,
    activeTab,
    setActiveTab,
    mobileMenuOpen,
    setMobileMenuOpen,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    sortBy,
    setSortBy,
    resetFilters,
    // Statistics
    totalSpending,
    totalCount,
    averageExpense,
    topCategoryInfo,
    categoryBreakdown,
    // Modals
    isFormOpen,
    editingExpense,
    openAddModal,
    openEditModal,
    closeFormModal,
    isDeleteOpen,
    deletingExpense,
    openDeleteModal,
    closeDeleteModal,
    // CRUD
    addExpense,
    updateExpense,
    deleteExpense,
    resetSample,
    clearAll
  };

  return <ExpenseContext.Provider value={value}>{children}</ExpenseContext.Provider>;
};

export const useExpense = () => {
  const context = useContext(ExpenseContext);
  if (!context) {
    throw new Error('useExpense must be used within an ExpenseProvider');
  }
  return context;
};
