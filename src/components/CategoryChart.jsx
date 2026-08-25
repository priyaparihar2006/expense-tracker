import React, { useState } from 'react';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import { formatCurrency } from '../utils/formatters';
import { useExpense } from '../context/ExpenseContext';

// Custom Tooltip component for Recharts
const CustomChartTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-[#0F172A] text-white px-3.5 py-2.5 rounded-xl shadow-xl border border-slate-800 text-xs space-y-1">
        <p className="font-bold text-slate-100">{data.name}</p>
        <p className="text-indigo-300 font-semibold">
          {formatCurrency(data.amount)} ({data.percentage}%)
        </p>
        <p className="text-[10px] text-slate-400">
          {data.count} {data.count === 1 ? 'transaction' : 'transactions'}
        </p>
      </div>
    );
  }
  return null;
};

export const CategoryChart = ({ compact = false }) => {
  const { categoryBreakdown, totalSpending, expenses } = useExpense();
  const [activeIndex, setActiveIndex] = useState(null);

  // Filter categories with actual spending
  const activeCategories = categoryBreakdown.filter((cat) => cat.amount > 0);

  if (expenses.length === 0 || activeCategories.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center flex flex-col items-center justify-center">
        <p className="text-sm font-medium text-slate-500">
          No spending data to visualize yet.
        </p>
      </div>
    );
  }

  return (
    <div
      id="spending-by-category-chart-container"
      className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 flex flex-col justify-between"
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="font-bold text-slate-800 text-lg">Spending Breakdown</h2>
          <p className="text-xs text-slate-500">Distribution by category</p>
        </div>
        <div className="text-right">
          <span className="text-[10px] uppercase font-bold text-slate-400 block">
            Total
          </span>
          <span className="font-black text-slate-800 text-base">
            {formatCurrency(totalSpending)}
          </span>
        </div>
      </div>

      <div className="flex flex-col items-center mb-6 relative">
        {/* Responsive Donut Chart with Recharts */}
        <div className="w-48 h-48 sm:w-52 sm:h-52 relative flex items-center justify-center">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Tooltip content={<CustomChartTooltip />} />
              <Pie
                data={activeCategories}
                dataKey="amount"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={58}
                outerRadius={82}
                paddingAngle={3}
                onMouseEnter={(_, index) => setActiveIndex(index)}
                onMouseLeave={() => setActiveIndex(null)}
              >
                {activeCategories.map((entry) => (
                  <Cell
                    key={`cell-${entry.id}`}
                    fill={entry.color}
                    stroke="#ffffff"
                    strokeWidth={2}
                    className="transition-all duration-200 hover:opacity-90 cursor-pointer"
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>

          {/* Centered Donut Label */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
              {activeIndex !== null ? activeCategories[activeIndex]?.name : 'Total'}
            </span>
            <span className="font-black text-xl text-slate-800 tracking-tight">
              {activeIndex !== null
                ? formatCurrency(activeCategories[activeIndex]?.amount)
                : formatCurrency(totalSpending)}
            </span>
          </div>
        </div>
      </div>

      {/* Category List with Circular Color Dots & Clean Utility Typography */}
      <div className="space-y-3.5 max-h-72 overflow-y-auto pr-1">
        {activeCategories.map((cat) => (
          <div
            key={cat.id}
            id={`category-breakdown-${cat.id.toLowerCase()}`}
            className="flex items-center justify-between p-2 rounded-xl hover:bg-slate-50 transition-colors"
          >
            <div className="flex items-center space-x-3">
              <div
                className="w-3 h-3 rounded-full shrink-0"
                style={{ backgroundColor: cat.color }}
              />
              <span className="text-sm font-medium text-slate-700">
                {cat.name}
              </span>
            </div>
            <div className="text-right">
              <p className="text-sm font-bold text-slate-800">
                {formatCurrency(cat.amount)}
              </p>
              <p className="text-[10px] text-slate-400 font-bold">
                {cat.percentage}%
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
