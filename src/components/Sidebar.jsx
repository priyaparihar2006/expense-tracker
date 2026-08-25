import React from 'react';
import {
  LayoutDashboard,
  ReceiptText,
  PieChart,
  PlusCircle,
  RotateCcw,
  Trash2,
  TrendingUp,
  Database,
  X,
  User
} from 'lucide-react';
import { useExpense } from '../context/ExpenseContext';

export const Sidebar = () => {
  const {
    activeTab,
    setActiveTab,
    openAddModal,
    resetSample,
    clearAll,
    expenses,
    mobileMenuOpen,
    setMobileMenuOpen
  } = useExpense();

  const navItems = [
    {
      id: 'nav-dashboard',
      tabKey: 'dashboard',
      label: 'Dashboard',
      icon: LayoutDashboard,
      badge: null
    },
    {
      id: 'nav-expenses',
      tabKey: 'expenses',
      label: 'Expenses',
      icon: ReceiptText,
      badge: expenses.length
    },
    {
      id: 'nav-analytics',
      tabKey: 'analytics',
      label: 'Analytics',
      icon: PieChart,
      badge: null
    }
  ];

  const handleTabClick = (tabKey) => {
    setActiveTab(tabKey);
    setMobileMenuOpen(false);
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {mobileMenuOpen && (
        <div
          id="mobile-nav-backdrop"
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-40 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar Container - Clean Utility Dark Theme (#0F172A) */}
      <aside
        id="app-sidebar"
        className={`fixed top-0 bottom-0 left-0 z-40 w-64 bg-[#0F172A] text-slate-300 flex flex-col justify-between shadow-2xl transition-transform duration-200 ease-in-out lg:translate-x-0 ${
          mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-6 flex flex-col flex-1 overflow-y-auto">
          {/* Logo & Brand */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-indigo-500 rounded-lg flex items-center justify-center shadow-lg shadow-indigo-500/30 text-white">
                <TrendingUp className="w-5 h-5 stroke-[2.5]" />
              </div>
              <span className="text-white font-bold text-xl tracking-tight">FinTrack</span>
            </div>

            {/* Close button on mobile */}
            <button
              id="mobile-sidebar-close"
              onClick={() => setMobileMenuOpen(false)}
              className="lg:hidden p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
              aria-label="Close sidebar"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Quick Add Button */}
          <button
            id="sidebar-add-expense-btn"
            onClick={() => {
              openAddModal();
              setMobileMenuOpen(false);
            }}
            className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm rounded-xl shadow-lg shadow-indigo-500/25 transition-all active:scale-[0.98] mb-6 cursor-pointer"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Add Expense</span>
          </button>

          {/* Navigation Links */}
          <div className="space-y-1">
            <p className="px-3 text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-2">
              Menu
            </p>
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.tabKey;
              return (
                <button
                  key={item.tabKey}
                  id={item.id}
                  onClick={() => handleTabClick(item.tabKey)}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-xl font-medium text-sm transition-colors cursor-pointer ${
                    isActive
                      ? 'bg-white/10 text-white font-semibold shadow-inner'
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Icon className="w-5 h-5" />
                    <span>{item.label}</span>
                  </div>
                  {item.badge !== null && (
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full font-bold ${
                        isActive
                          ? 'bg-indigo-500 text-white'
                          : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Data Controls Section */}
          <div className="mt-8 pt-6 border-t border-slate-800 space-y-1">
            <p className="px-3 text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-2">
              Data Management
            </p>
            <button
              id="sidebar-reset-sample-btn"
              onClick={resetSample}
              className="w-full flex items-center space-x-3 px-4 py-2.5 text-xs font-medium text-slate-400 hover:text-white hover:bg-white/5 rounded-xl transition-colors cursor-pointer"
            >
              <RotateCcw className="w-4 h-4 text-slate-500" />
              <span>Load Sample Data</span>
            </button>
            {expenses.length > 0 && (
              <button
                id="sidebar-clear-all-btn"
                onClick={() => {
                  if (window.confirm('Are you sure you want to clear all expenses?')) {
                    clearAll();
                  }
                }}
                className="w-full flex items-center space-x-3 px-4 py-2.5 text-xs font-medium text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 rounded-xl transition-colors cursor-pointer"
              >
                <Trash2 className="w-4 h-4 text-rose-400" />
                <span>Clear All Records</span>
              </button>
            )}
          </div>
        </div>

        {/* User Card / Local Storage Info */}
        <div className="p-5 border-t border-slate-800 bg-[#0B1120]/70">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-full bg-indigo-200 flex items-center justify-center text-indigo-700 font-bold border-2 border-indigo-500 text-xs">
              FT
            </div>
            <div className="flex-1 overflow-hidden">
              <p className="text-white text-xs font-semibold truncate">Personal Ledger</p>
              <div className="flex items-center gap-1.5 text-slate-400 text-[10px]">
                <Database className="w-2.5 h-2.5 text-emerald-400 shrink-0" />
                <span className="truncate">LocalStorage Active</span>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};
