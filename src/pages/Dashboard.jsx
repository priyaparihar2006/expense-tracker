import React from 'react';
import {
  IndianRupee,
  Receipt,
  Calculator,
  Award,
  ArrowRight
} from 'lucide-react';
import { StatCard } from '../components/StatCard';
import { ExpenseTable } from '../components/ExpenseTable';
import { CategoryChart } from '../components/CategoryChart';
import { formatCurrency } from '../utils/formatters';
import { useExpense } from '../context/ExpenseContext';

export const Dashboard = () => {
  const {
    totalSpending,
    totalCount,
    averageExpense,
    topCategoryInfo,
    recentExpenses,
    setActiveTab,
    expenses
  } = useExpense();

  return (
    <div id="dashboard-page" className="space-y-6">
      {/* 4 Summary Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {/* Total Spending */}
        <StatCard
          id="stat-total-spending"
          title="Total Spending"
          value={formatCurrency(totalSpending)}
          subtitle="All recorded expenditures"
          icon={IndianRupee}
          iconColor="text-emerald-600"
          iconBg="bg-emerald-50"
        />

        {/* Total Expenses */}
        <StatCard
          id="stat-total-expenses"
          title="Total Expenses"
          value={totalCount}
          subtitle="Total transactions logged"
          icon={Receipt}
          iconColor="text-blue-600"
          iconBg="bg-blue-50"
        />

        {/* Average Expense */}
        <StatCard
          id="stat-average-expense"
          title="Average Expense"
          value={formatCurrency(averageExpense)}
          subtitle="Spending per transaction"
          icon={Calculator}
          iconColor="text-indigo-600"
          iconBg="bg-indigo-50"
        />

        {/* Top Category */}
        <StatCard
          id="stat-top-category"
          title="Top Category"
          value={topCategoryInfo.category}
          subtitle={
            topCategoryInfo.amount > 0
              ? `${formatCurrency(topCategoryInfo.amount)} (${topCategoryInfo.percentage}%)`
              : 'No expenses yet'
          }
          icon={Award}
          iconColor="text-amber-600"
          iconBg="bg-amber-50"
          badgeText={topCategoryInfo.amount > 0 ? `${topCategoryInfo.percentage}%` : null}
        />
      </div>

      {/* Main Grid Section: Col 8 Recent Expenses + Col 4 Spending Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Col (8): Recent Expenses Card */}
        <div className="lg:col-span-7 xl:col-span-8 flex flex-col bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between">
            <div>
              <h2 className="font-bold text-slate-800 text-lg">Recent Expenses</h2>
              <p className="text-xs text-slate-500">Latest recorded transactions</p>
            </div>
            {expenses.length > 0 && (
              <button
                id="dashboard-view-all-expenses-btn"
                onClick={() => setActiveTab('expenses')}
                className="text-indigo-600 hover:text-indigo-700 font-semibold text-sm hover:underline flex items-center gap-1 cursor-pointer"
              >
                <span>View All ({expenses.length})</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>

          <div className="p-4 sm:p-6">
            <ExpenseTable expensesList={recentExpenses} isRecentOnly={true} />
          </div>
        </div>

        {/* Right Col (4): Spending Breakdown Donut Chart */}
        <div className="lg:col-span-5 xl:col-span-4">
          <CategoryChart compact={true} />
        </div>
      </div>
    </div>
  );
};
