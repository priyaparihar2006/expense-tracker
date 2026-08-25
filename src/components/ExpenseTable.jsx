import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Edit2, Trash2 } from 'lucide-react';
import { formatCurrency, formatDate } from '../utils/formatters';
import { CategoryBadge } from './CategoryBadge';
import { ExpenseCard } from './ExpenseCard';
import { EmptyState } from './EmptyState';
import { useExpense } from '../context/ExpenseContext';

export const ExpenseTable = ({ expensesList, isFiltered = false, isRecentOnly = false }) => {
  const { openEditModal, openDeleteModal } = useExpense();

  if (!expensesList || expensesList.length === 0) {
    return <EmptyState isFiltered={isFiltered} />;
  }

  return (
    <div id="expense-table-container" className="w-full">
      {/* Mobile Card Layout */}
      <div className="md:hidden space-y-3">
        <AnimatePresence>
          {expensesList.map((expense) => (
            <ExpenseCard key={expense.id} expense={expense} />
          ))}
        </AnimatePresence>
      </div>

      {/* Desktop Table View */}
      <div className="hidden md:block bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse" id="expenses-data-table">
            <thead className="bg-slate-50 border-b border-slate-100">
              <tr className="text-[11px] uppercase tracking-widest text-slate-400 font-bold">
                <th className="py-4 px-6">Description</th>
                <th className="py-4 px-6">Category</th>
                <th className="py-4 px-6">Date</th>
                <th className="py-4 px-6 text-right">Amount</th>
                <th className="py-4 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {expensesList.map((expense) => (
                <motion.tr
                  key={expense.id}
                  id={`expense-row-${expense.id}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15 }}
                  className="hover:bg-slate-50/80 transition-colors group"
                >
                  {/* Description */}
                  <td className="py-4 px-6 font-semibold text-slate-700">
                    <span className="block truncate max-w-xs xl:max-w-md" title={expense.description}>
                      {expense.description}
                    </span>
                  </td>

                  {/* Category */}
                  <td className="py-4 px-6 whitespace-nowrap text-sm text-slate-500">
                    <CategoryBadge categoryId={expense.category} size="md" />
                  </td>

                  {/* Date */}
                  <td className="py-4 px-6 text-slate-500 whitespace-nowrap text-sm font-medium">
                    {formatDate(expense.date)}
                  </td>

                  {/* Amount */}
                  <td className="py-4 px-6 text-right whitespace-nowrap">
                    <span className="font-black text-slate-800 tracking-tight text-base">
                      {formatCurrency(expense.amount)}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="py-4 px-6 text-right whitespace-nowrap">
                    <div className="flex items-center justify-end space-x-1 opacity-80 group-hover:opacity-100">
                      <button
                        id={`table-edit-${expense.id}`}
                        onClick={() => openEditModal(expense)}
                        className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors cursor-pointer"
                        title="Edit expense"
                        aria-label={`Edit ${expense.description}`}
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        id={`table-delete-${expense.id}`}
                        onClick={() => openDeleteModal(expense)}
                        className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                        title="Delete expense"
                        aria-label={`Delete ${expense.description}`}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
