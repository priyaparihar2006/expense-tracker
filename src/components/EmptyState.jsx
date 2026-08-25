import React from 'react';
import { Receipt, SearchX, Plus, RotateCcw } from 'lucide-react';
import { useExpense } from '../context/ExpenseContext';

export const EmptyState = ({ isFiltered = false }) => {
  const { openAddModal, resetFilters, resetSample } = useExpense();

  if (isFiltered) {
    return (
      <div
        id="empty-filtered-state"
        className="bg-white rounded-2xl border border-slate-200/80 p-8 sm:p-12 text-center flex flex-col items-center justify-center max-w-md mx-auto my-6"
      >
        <div className="w-14 h-14 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 mb-4">
          <SearchX className="w-7 h-7" />
        </div>
        <h3 className="text-lg font-bold text-slate-900 mb-1">
          No matching expenses found
        </h3>
        <p className="text-sm text-slate-500 mb-6 max-w-xs">
          No transactions match your current search query or category filter. Try clearing or adjusting your filters.
        </p>
        <button
          id="empty-state-reset-filter-btn"
          onClick={resetFilters}
          className="flex items-center gap-2 px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs sm:text-sm font-semibold rounded-xl transition-all cursor-pointer"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Reset Filters</span>
        </button>
      </div>
    );
  }

  return (
    <div
      id="empty-expenses-state"
      className="bg-white rounded-2xl border border-slate-200/80 p-8 sm:p-14 text-center flex flex-col items-center justify-center max-w-md mx-auto my-6 shadow-xs"
    >
      <div className="w-16 h-16 rounded-3xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 mb-5 shadow-inner">
        <Receipt className="w-8 h-8" />
      </div>
      <h3 className="text-xl font-bold text-slate-900 mb-2">
        No expenses yet
      </h3>
      <p className="text-sm text-slate-500 mb-6 max-w-xs leading-relaxed">
        Start tracking your spending by adding your first expense.
      </p>
      <div className="flex flex-col sm:flex-row gap-3 w-full justify-center">
        <button
          id="empty-state-add-btn"
          onClick={openAddModal}
          className="flex items-center justify-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 active:scale-[0.98] text-white text-sm font-semibold rounded-xl shadow-xs hover:shadow-md transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>+ Add Expense</span>
        </button>
        <button
          id="empty-state-sample-btn"
          onClick={resetSample}
          className="flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-semibold rounded-xl transition-colors cursor-pointer"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Load Sample Data</span>
        </button>
      </div>
    </div>
  );
};
