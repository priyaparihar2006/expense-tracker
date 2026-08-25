import React from 'react';
import {
  PieChart,
  ArrowUpRight,
  TrendingDown,
  Layers,
  Sparkles,
  Zap
} from 'lucide-react';
import { CategoryChart } from '../components/CategoryChart';
import { CategoryBadge } from '../components/CategoryBadge';
import { formatCurrency, formatDate } from '../utils/formatters';
import { useExpense } from '../context/ExpenseContext';

export const Analytics = () => {
  const {
    categoryBreakdown,
    totalSpending,
    expenses,
    averageExpense,
    topCategoryInfo
  } = useExpense();

  // Find highest single transaction
  const highestExpense = expenses.length > 0
    ? expenses.reduce((max, curr) => (Number(curr.amount) > Number(max.amount) ? curr : max), expenses[0])
    : null;

  if (expenses.length === 0) {
    return (
      <div className="space-y-6">
        <CategoryChart />
      </div>
    );
  }

  return (
    <div id="analytics-page" className="space-y-6">
      {/* Category Donut & Breakdown Progress */}
      <CategoryChart compact={false} />

      {/* Key Analytical Highlights Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Highest Single Expense */}
        {highestExpense && (
          <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Highest Expense
                </span>
                <span className="p-2 bg-rose-50 text-rose-600 rounded-xl">
                  <ArrowUpRight className="w-4 h-4" />
                </span>
              </div>
              <h4 className="text-xl font-bold text-slate-900">
                {formatCurrency(highestExpense.amount)}
              </h4>
              <p className="text-xs font-semibold text-slate-700 mt-1 truncate">
                {highestExpense.description}
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
              <CategoryBadge categoryId={highestExpense.category} size="sm" />
              <span className="text-[11px] text-slate-400">
                {formatDate(highestExpense.date)}
              </span>
            </div>
          </div>
        )}

        {/* Most Active Category */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Top Spending Category
              </span>
              <span className="p-2 bg-amber-50 text-amber-600 rounded-xl">
                <Sparkles className="w-4 h-4" />
              </span>
            </div>
            <h4 className="text-xl font-bold text-slate-900">
              {topCategoryInfo.category}
            </h4>
            <p className="text-xs font-semibold text-indigo-600 mt-1">
              {formatCurrency(topCategoryInfo.amount)} ({topCategoryInfo.percentage}% of total)
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>Dominant budget share</span>
            <CategoryBadge categoryId={topCategoryInfo.category} size="sm" />
          </div>
        </div>

        {/* Average per Transaction */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Average Transaction
              </span>
              <span className="p-2 bg-blue-50 text-blue-600 rounded-xl">
                <Layers className="w-4 h-4" />
              </span>
            </div>
            <h4 className="text-xl font-bold text-slate-900">
              {formatCurrency(averageExpense)}
            </h4>
            <p className="text-xs text-slate-500 mt-1">
              Across {expenses.length} recorded transactions
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>Overall Total</span>
            <span className="font-bold text-slate-800">{formatCurrency(totalSpending)}</span>
          </div>
        </div>
      </div>

      {/* Complete Category Grid Details */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs space-y-4">
        <div>
          <h3 className="text-base font-bold text-slate-900">
            All Categories Breakdown
          </h3>
          <p className="text-xs text-slate-500">
            Detailed performance and statistics for all 8 categories
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {categoryBreakdown.map((cat) => (
            <div
              key={cat.id}
              className="p-4 rounded-xl border border-slate-100 hover:border-slate-200 bg-slate-50/50 hover:bg-slate-50 transition-all flex flex-col justify-between"
            >
              <div className="flex items-center justify-between mb-3">
                <CategoryBadge categoryId={cat.id} size="sm" />
                <span className="text-xs font-bold text-slate-700">
                  {cat.percentage}%
                </span>
              </div>
              <div>
                <p className="text-lg font-bold text-slate-900">
                  {formatCurrency(cat.amount)}
                </p>
                <p className="text-xs text-slate-400 mt-0.5">
                  {cat.count} {cat.count === 1 ? 'transaction' : 'transactions'}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
