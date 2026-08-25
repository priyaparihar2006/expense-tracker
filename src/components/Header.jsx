import React from 'react';
import { Menu, Plus, Search, Bell, X, Calendar } from 'lucide-react';
import { useExpense } from '../context/ExpenseContext';

export const Header = () => {
  const {
    activeTab,
    openAddModal,
    setMobileMenuOpen,
    searchQuery,
    setSearchQuery,
    setActiveTab
  } = useExpense();

  const getPageInfo = () => {
    switch (activeTab) {
      case 'expenses':
        return {
          title: 'Expenses',
          subtitle: 'Manage, search, filter and track all your recorded expenses'
        };
      case 'analytics':
        return {
          title: 'Analytics',
          subtitle: 'Visual category breakdown and spending distribution analysis'
        };
      case 'dashboard':
      default:
        return {
          title: 'Dashboard',
          subtitle: 'Real-time overview of your spending habits and financial metrics'
        };
    }
  };

  const { title } = getPageInfo();

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    if (activeTab !== 'expenses' && e.target.value.trim() !== '') {
      setActiveTab('expenses');
    }
  };

  return (
    <header className="h-20 bg-white border-b border-slate-200 flex items-center justify-between px-4 sm:px-8 shrink-0 shadow-xs sticky top-0 z-30">
      {/* Left: Mobile Menu Toggle & Search Bar */}
      <div className="flex items-center space-x-3 sm:space-x-4 flex-1 max-w-xl">
        <button
          id="mobile-menu-open-btn"
          onClick={() => setMobileMenuOpen(true)}
          className="lg:hidden p-2 text-slate-500 hover:text-slate-800 rounded-xl hover:bg-slate-100 transition-colors shrink-0"
          aria-label="Open navigation menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="hidden sm:block font-bold text-slate-800 text-lg mr-2 lg:hidden">
          {title}
        </div>

        {/* Global Search Bar from Clean Utility Minimal HTML */}
        <div className="relative w-full max-w-sm sm:max-w-md">
          <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
            <Search className="w-4 h-4" />
          </span>
          <input
            id="global-header-search-input"
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search expenses, tags, or categories..."
            className="block w-full pl-10 pr-8 py-2.5 border border-slate-200 rounded-xl bg-slate-50 text-sm text-slate-800 placeholder:text-slate-400 focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
          />
          {searchQuery && (
            <button
              id="header-clear-search-btn"
              onClick={() => setSearchQuery('')}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 cursor-pointer"
              aria-label="Clear search"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Right: Notification Bell & Add Expense Action */}
      <div className="flex items-center space-x-3 sm:space-x-4 ml-3 shrink-0">
        <button
          id="header-notification-btn"
          className="p-2.5 text-slate-500 hover:bg-slate-100 rounded-xl relative transition-colors cursor-pointer"
          title="Notifications"
          aria-label="Notifications"
        >
          <Bell className="w-5 h-5" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white"></span>
        </button>

        <button
          id="header-add-expense-btn"
          onClick={openAddModal}
          className="bg-indigo-600 hover:bg-indigo-700 active:scale-[0.98] text-white px-3.5 sm:px-5 py-2.5 rounded-xl font-semibold text-xs sm:text-sm flex items-center space-x-2 transition-all shadow-lg shadow-indigo-200 cursor-pointer"
        >
          <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
          <span className="hidden xs:inline sm:inline">Add Expense</span>
          <span className="inline xs:hidden sm:hidden">Add</span>
        </button>
      </div>
    </header>
  );
};
