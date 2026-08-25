import React from 'react';
import { Plus, Download, FileSpreadsheet } from 'lucide-react';
import { ExpenseFilters } from '../components/ExpenseFilters';
import { ExpenseTable } from '../components/ExpenseTable';
import { formatCurrency } from '../utils/formatters';
import { useExpense } from '../context/ExpenseContext';

export const Expenses = () => {
  const {
    filteredExpenses,
    expenses,
    searchQuery,
    selectedCategory,
    openAddModal
  } = useExpense();

  const isFiltered = searchQuery !== '' || selectedCategory !== 'All';

  // Export to CSV helper
  const exportToCSV = () => {
    if (expenses.length === 0) return;
    const headers = ['ID', 'Description', 'Category', 'Date', 'Amount (INR)'];
    const rows = expenses.map((e) => [
      e.id,
      `"${e.description.replace(/"/g, '""')}"`,
      e.category,
      e.date,
      e.amount
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `expense_tracker_export_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const totalFilteredAmount = filteredExpenses.reduce(
    (sum, e) => sum + Number(e.amount || 0),
    0
  );

  return (
    <div id="expenses-page" className="space-y-6">
      {/* Top Controls & Metrics Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h2 className="text-xl font-bold text-slate-900">All Expenses</h2>
          <p className="text-xs text-slate-500">
            {expenses.length} total entries • Total of {formatCurrency(totalFilteredAmount)}
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          {expenses.length > 0 && (
            <button
              id="export-csv-btn"
              onClick={exportToCSV}
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 rounded-xl transition-colors cursor-pointer"
              title="Download CSV spreadsheet"
            >
              <Download className="w-3.5 h-3.5 text-slate-500" />
              <span>Export CSV</span>
            </button>
          )}

          <button
            id="expenses-add-new-btn"
            onClick={openAddModal}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 active:scale-[0.98] text-white text-xs sm:text-sm font-semibold rounded-xl shadow-xs hover:shadow-md transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add Expense</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      {expenses.length > 0 && <ExpenseFilters />}

      {/* Main Expense Table */}
      <ExpenseTable expensesList={filteredExpenses} isFiltered={isFiltered} />
    </div>
  );
};
