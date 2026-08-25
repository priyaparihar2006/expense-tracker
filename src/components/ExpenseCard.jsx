import React from 'react';
import { motion } from 'motion/react';
import { Edit2, Trash2, Calendar } from 'lucide-react';
import { formatCurrency, formatDate } from '../utils/formatters';
import { CategoryBadge } from './CategoryBadge';
import { useExpense } from '../context/ExpenseContext';

export const ExpenseCard = ({ expense }) => {
  const { openEditModal, openDeleteModal } = useExpense();

  return (
    <motion.div
      id={`expense-card-${expense.id}`}
      layout
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.18 }}
      className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs hover:border-slate-300 transition-all flex flex-col justify-between gap-3"
    >
      <div className="flex items-start justify-between gap-2">
        <div className="space-y-1.5 flex-1 min-w-0">
          <h4 className="text-sm font-semibold text-slate-800 truncate">
            {expense.description}
          </h4>
          <div className="flex items-center gap-2 flex-wrap">
            <CategoryBadge categoryId={expense.category} size="sm" />
            <span className="flex items-center gap-1 text-xs text-slate-400 font-medium">
              <Calendar className="w-3 h-3" />
              {formatDate(expense.date)}
            </span>
          </div>
        </div>

        <div className="text-right shrink-0">
          <span className="text-base font-black text-slate-800 tracking-tight">
            {formatCurrency(expense.amount)}
          </span>
        </div>
      </div>

      <div className="pt-3 border-t border-slate-100 flex items-center justify-end space-x-2">
        <button
          id={`expense-card-edit-${expense.id}`}
          onClick={() => openEditModal(expense)}
          className="flex items-center space-x-1.5 px-3 py-1.5 text-xs font-semibold text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors cursor-pointer"
          aria-label={`Edit ${expense.description}`}
        >
          <Edit2 className="w-3.5 h-3.5" />
          <span>Edit</span>
        </button>
        <button
          id={`expense-card-delete-${expense.id}`}
          onClick={() => openDeleteModal(expense)}
          className="flex items-center space-x-1.5 px-3 py-1.5 text-xs font-semibold text-rose-600 hover:text-rose-700 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
          aria-label={`Delete ${expense.description}`}
        >
          <Trash2 className="w-3.5 h-3.5" />
          <span>Delete</span>
        </button>
      </div>
    </motion.div>
  );
};
