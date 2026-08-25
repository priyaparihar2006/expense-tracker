import React from 'react';
import { ToastProvider } from './context/ToastContext';
import { ExpenseProvider, useExpense } from './context/ExpenseContext';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { ExpenseFormModal } from './components/ExpenseFormModal';
import { DeleteConfirmationModal } from './components/DeleteConfirmationModal';
import { Dashboard } from './pages/Dashboard';
import { Expenses } from './pages/Expenses';
import { Analytics } from './pages/Analytics';

function MainAppContent() {
  const { activeTab } = useExpense();

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col lg:flex-row font-['Plus_Jakarta_Sans',sans-serif]">
      {/* Sidebar Navigation */}
      <Sidebar />

      {/* Main Layout Area */}
      <div className="flex-1 lg:pl-64 flex flex-col min-w-0">
        {/* Top Header */}
        <Header />

        {/* Dynamic Page Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {activeTab === 'dashboard' && <Dashboard />}
          {activeTab === 'expenses' && <Expenses />}
          {activeTab === 'analytics' && <Analytics />}
        </main>

        {/* Global Modals */}
        <ExpenseFormModal />
        <DeleteConfirmationModal />
      </div>
    </div>
  );
}

export default function App() {
  return (
    <ToastProvider>
      <ExpenseProvider>
        <MainAppContent />
      </ExpenseProvider>
    </ToastProvider>
  );
}
