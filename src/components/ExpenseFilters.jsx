import React from 'react';
import { Search, Filter, ArrowUpDown, X } from 'lucide-react';
import { CATEGORIES } from '../data/categories';
import { useExpense } from '../context/ExpenseContext';

export const ExpenseFilters = () => {
  const {
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    sortBy,
    setSortBy,
    resetFilters,
    filteredExpenses,
    expenses
  } = useExpense();

  const isFiltered = searchQuery !== '' || selectedCategory !== 'All' || sortBy !== 'newest';

  return (
    <div
      id="expense-filters-bar"
      className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs mb-6 space-y-3 sm:space-y-0 sm:flex sm:items-center sm:gap-3 sm:flex-wrap"
    >
      {/* Search Input */}
      <div className="relative flex-1 min-w-[220px]">
        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
          <Search className="w-4 h-4" />
        </div>
        <input
          id="expense-search-input"
          type="text"
          placeholder="Search expenses..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-9 pr-8 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition-all"
        />
        {searchQuery && (
          <button
            id="clear-search-btn"
            onClick={() => setSearchQuery('')}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 cursor-pointer"
            aria-label="Clear search"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Category Dropdown */}
      <div className="relative min-w-[150px]">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
          <Filter className="w-3.5 h-3.5" />
        </div>
        <select
          id="expense-category-filter-select"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="w-full pl-8 pr-8 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-700 font-medium focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition-all cursor-pointer appearance-none"
        >
          <option value="All">All Categories</option>
          {CATEGORIES.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-slate-400">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>

      {/* Sort By Dropdown */}
      <div className="relative min-w-[160px]">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
          <ArrowUpDown className="w-3.5 h-3.5" />
        </div>
        <select
          id="expense-sort-select"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="w-full pl-8 pr-8 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-700 font-medium focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition-all cursor-pointer appearance-none"
        >
          <option value="newest">Newest first</option>
          <option value="oldest">Oldest first</option>
          <option value="highest">Highest amount</option>
          <option value="lowest">Lowest amount</option>
        </select>
        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-slate-400">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>

      {/* Reset Filter Button */}
      {isFiltered && (
        <button
          id="reset-filters-btn"
          onClick={resetFilters}
          className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200/80 rounded-xl transition-colors cursor-pointer shrink-0"
        >
          <X className="w-3.5 h-3.5" />
          <span>Reset</span>
        </button>
      )}

      {/* Results Count Badge */}
      <div className="ml-auto text-xs font-medium text-slate-500 hidden md:block">
        Showing <span className="font-bold text-slate-800">{filteredExpenses.length}</span> of {expenses.length}
      </div>
    </div>
  );
};
