import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, IndianRupee, Tag, Calendar, FileText, Check, AlertCircle } from 'lucide-react';
import { CATEGORIES } from '../data/categories';
import { getTodayDateString } from '../utils/formatters';
import { useExpense } from '../context/ExpenseContext';

export const ExpenseFormModal = () => {
  const {
    isFormOpen,
    editingExpense,
    closeFormModal,
    addExpense,
    updateExpense
  } = useExpense();

  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('Food');
  const [date, setDate] = useState(getTodayDateString());
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  // Sync state when editingExpense changes or modal opens
  useEffect(() => {
    if (editingExpense) {
      setDescription(editingExpense.description || '');
      setAmount(String(editingExpense.amount || ''));
      setCategory(editingExpense.category || 'Food');
      setDate(editingExpense.date || getTodayDateString());
    } else {
      setDescription('');
      setAmount('');
      setCategory('Food');
      setDate(getTodayDateString());
    }
    setErrors({});
    setTouched({});
  }, [editingExpense, isFormOpen]);

  // Handle ESC key to close modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isFormOpen) {
        closeFormModal();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isFormOpen, closeFormModal]);

  const validate = () => {
    const newErrors = {};

    if (!description.trim()) {
      newErrors.description = 'Description is required';
    } else if (description.trim().length < 2) {
      newErrors.description = 'Description must be at least 2 characters';
    }

    const numAmount = Number(amount);
    if (!amount || isNaN(numAmount)) {
      newErrors.amount = 'Please enter a valid amount';
    } else if (numAmount <= 0) {
      newErrors.amount = 'Amount must be greater than ₹0';
    }

    if (!category) {
      newErrors.category = 'Please select a category';
    }

    if (!date) {
      newErrors.date = 'Please select a valid date';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setTouched({ description: true, amount: true, category: true, date: true });

    if (!validate()) return;

    const payload = {
      description,
      amount: Number(amount),
      category,
      date
    };

    if (editingExpense) {
      updateExpense(editingExpense.id, payload);
    } else {
      addExpense(payload);
    }
  };

  if (!isFormOpen) return null;

  const isEditing = Boolean(editingExpense);

  return (
    <AnimatePresence>
      <div
        id="expense-modal-portal"
        className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
      >
        {/* Backdrop */}
        <motion.div
          id="expense-modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          onClick={closeFormModal}
          className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs"
        />

        {/* Modal Dialog Card */}
        <motion.div
          id="expense-form-dialog"
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200/80 overflow-hidden z-10 my-8"
        >
          {/* Modal Header */}
          <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                {isEditing ? 'Edit Expense' : 'Add New Expense'}
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                {isEditing
                  ? 'Update the details of your recorded transaction'
                  : 'Record a new spending entry to track your finances'}
              </p>
            </div>
            <button
              id="expense-modal-close-btn"
              onClick={closeFormModal}
              className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition-colors"
              aria-label="Close dialog"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Form Content */}
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            {/* Description */}
            <div className="space-y-1.5">
              <label
                htmlFor="expense-description-input"
                className="block text-xs font-semibold uppercase tracking-wider text-slate-700"
              >
                Description <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <FileText className="w-4 h-4" />
                </div>
                <input
                  id="expense-description-input"
                  type="text"
                  placeholder="e.g., Grocery Shopping, Uber ride, Coffee"
                  value={description}
                  onChange={(e) => {
                    setDescription(e.target.value);
                    if (errors.description) setErrors((prev) => ({ ...prev, description: null }));
                  }}
                  className={`w-full pl-10 pr-4 py-2.5 bg-slate-50/70 border rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition-all ${
                    errors.description ? 'border-rose-400 ring-2 ring-rose-500/10' : 'border-slate-200'
                  }`}
                  autoFocus
                />
              </div>
              {errors.description && (
                <p className="text-xs text-rose-500 flex items-center gap-1 mt-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  {errors.description}
                </p>
              )}
            </div>

            {/* Amount & Date in 2 columns */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Amount */}
              <div className="space-y-1.5">
                <label
                  htmlFor="expense-amount-input"
                  className="block text-xs font-semibold uppercase tracking-wider text-slate-700"
                >
                  Amount (₹) <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <IndianRupee className="w-4 h-4" />
                  </div>
                  <input
                    id="expense-amount-input"
                    type="number"
                    step="any"
                    min="0"
                    placeholder="0.00"
                    value={amount}
                    onChange={(e) => {
                      setAmount(e.target.value);
                      if (errors.amount) setErrors((prev) => ({ ...prev, amount: null }));
                    }}
                    className={`w-full pl-10 pr-4 py-2.5 bg-slate-50/70 border rounded-xl text-sm font-semibold text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition-all ${
                      errors.amount ? 'border-rose-400 ring-2 ring-rose-500/10' : 'border-slate-200'
                    }`}
                  />
                </div>
                {errors.amount && (
                  <p className="text-xs text-rose-500 flex items-center gap-1 mt-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    {errors.amount}
                  </p>
                )}
              </div>

              {/* Date */}
              <div className="space-y-1.5">
                <label
                  htmlFor="expense-date-input"
                  className="block text-xs font-semibold uppercase tracking-wider text-slate-700"
                >
                  Date <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <Calendar className="w-4 h-4" />
                  </div>
                  <input
                    id="expense-date-input"
                    type="date"
                    value={date}
                    onChange={(e) => {
                      setDate(e.target.value);
                      if (errors.date) setErrors((prev) => ({ ...prev, date: null }));
                    }}
                    className={`w-full pl-10 pr-4 py-2.5 bg-slate-50/70 border rounded-xl text-sm text-slate-900 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition-all ${
                      errors.date ? 'border-rose-400 ring-2 ring-rose-500/10' : 'border-slate-200'
                    }`}
                  />
                </div>
                {errors.date && (
                  <p className="text-xs text-rose-500 flex items-center gap-1 mt-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    {errors.date}
                  </p>
                )}
              </div>
            </div>

            {/* Category Dropdown */}
            <div className="space-y-1.5">
              <label
                htmlFor="expense-category-select"
                className="block text-xs font-semibold uppercase tracking-wider text-slate-700"
              >
                Category <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Tag className="w-4 h-4" />
                </div>
                <select
                  id="expense-category-select"
                  value={category}
                  onChange={(e) => {
                    setCategory(e.target.value);
                    if (errors.category) setErrors((prev) => ({ ...prev, category: null }));
                  }}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50/70 border border-slate-200 rounded-xl text-sm text-slate-900 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition-all cursor-pointer appearance-none"
                >
                  {CATEGORIES.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-slate-400">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="pt-4 mt-6 border-t border-slate-100 flex items-center justify-end gap-3">
              <button
                id="expense-form-cancel-btn"
                type="button"
                onClick={closeFormModal}
                className="px-4 py-2.5 text-sm font-semibold text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                id="expense-form-submit-btn"
                type="submit"
                className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 active:scale-[0.98] text-white text-sm font-semibold rounded-xl shadow-xs hover:shadow-md transition-all cursor-pointer"
              >
                <Check className="w-4 h-4" />
                <span>{isEditing ? 'Save Changes' : 'Add Expense'}</span>
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
