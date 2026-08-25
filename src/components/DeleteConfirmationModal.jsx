import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { AlertTriangle, Trash2, X } from 'lucide-react';
import { formatCurrency, formatDate } from '../utils/formatters';
import { CategoryBadge } from './CategoryBadge';
import { useExpense } from '../context/ExpenseContext';

export const DeleteConfirmationModal = () => {
  const {
    isDeleteOpen,
    deletingExpense,
    closeDeleteModal,
    deleteExpense
  } = useExpense();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isDeleteOpen) {
        closeDeleteModal();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isDeleteOpen, closeDeleteModal]);

  if (!isDeleteOpen || !deletingExpense) return null;

  return (
    <AnimatePresence>
      <div
        id="delete-modal-portal"
        className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
      >
        {/* Backdrop */}
        <motion.div
          id="delete-modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          onClick={closeDeleteModal}
          className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs"
        />

        {/* Modal Dialog Card */}
        <motion.div
          id="delete-confirmation-dialog"
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl border border-slate-200/80 overflow-hidden z-10 my-8 p-6"
        >
          <div className="flex items-start justify-between">
            <div className="w-12 h-12 rounded-2xl bg-rose-50 border border-rose-100 flex items-center justify-center text-rose-600 shrink-0">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <button
              id="delete-modal-close-btn"
              onClick={closeDeleteModal}
              className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition-colors"
              aria-label="Close dialog"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="mt-4">
            <h3 className="text-lg font-bold text-slate-900">
              Delete Expense?
            </h3>
            <p className="text-sm text-slate-500 mt-1">
              Are you sure you want to delete this expense? This action cannot be undone.
            </p>

            {/* Expense summary preview */}
            <div className="mt-4 p-3.5 bg-slate-50 rounded-xl border border-slate-200/70 flex items-center justify-between">
              <div className="space-y-1 pr-2">
                <p className="text-sm font-semibold text-slate-900 truncate max-w-[200px]">
                  {deletingExpense.description}
                </p>
                <div className="flex items-center gap-2">
                  <CategoryBadge categoryId={deletingExpense.category} size="sm" />
                  <span className="text-xs text-slate-400">
                    {formatDate(deletingExpense.date)}
                  </span>
                </div>
              </div>
              <div className="text-right shrink-0">
                <span className="text-base font-bold text-slate-900">
                  {formatCurrency(deletingExpense.amount)}
                </span>
              </div>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-end gap-3">
            <button
              id="delete-cancel-btn"
              type="button"
              onClick={closeDeleteModal}
              className="px-4 py-2.5 text-sm font-semibold text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              id="delete-confirm-btn"
              type="button"
              onClick={() => deleteExpense(deletingExpense.id)}
              className="flex items-center gap-2 px-5 py-2.5 bg-rose-600 hover:bg-rose-700 active:scale-[0.98] text-white text-sm font-semibold rounded-xl shadow-xs hover:shadow-md transition-all cursor-pointer"
            >
              <Trash2 className="w-4 h-4" />
              <span>Delete</span>
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
