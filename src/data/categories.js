export const CATEGORIES = [
  {
    id: 'Food',
    name: 'Food',
    icon: 'Utensils',
    color: '#059669', // emerald-600
    bgColor: 'bg-emerald-50',
    textColor: 'text-emerald-700',
    borderColor: 'border-emerald-200',
    badgeClass: 'bg-emerald-100 text-emerald-700'
  },
  {
    id: 'Transport',
    name: 'Transport',
    icon: 'Car',
    color: '#3B82F6', // blue-500
    bgColor: 'bg-blue-50',
    textColor: 'text-blue-700',
    borderColor: 'border-blue-200',
    badgeClass: 'bg-blue-100 text-blue-700'
  },
  {
    id: 'Shopping',
    name: 'Shopping',
    icon: 'ShoppingBag',
    color: '#8B5CF6', // purple-500
    bgColor: 'bg-purple-50',
    textColor: 'text-purple-700',
    borderColor: 'border-purple-200',
    badgeClass: 'bg-purple-100 text-purple-700'
  },
  {
    id: 'Bills',
    name: 'Bills',
    icon: 'Receipt',
    color: '#4F46E5', // indigo-600
    bgColor: 'bg-indigo-50',
    textColor: 'text-indigo-700',
    borderColor: 'border-indigo-200',
    badgeClass: 'bg-indigo-100 text-indigo-700'
  },
  {
    id: 'Entertainment',
    name: 'Entertainment',
    icon: 'Film',
    color: '#E11D48', // rose-600
    bgColor: 'bg-rose-50',
    textColor: 'text-rose-700',
    borderColor: 'border-rose-200',
    badgeClass: 'bg-rose-100 text-rose-700'
  },
  {
    id: 'Health',
    name: 'Health',
    icon: 'HeartPulse',
    color: '#F59E0B', // amber-500
    bgColor: 'bg-amber-50',
    textColor: 'text-amber-700',
    borderColor: 'border-amber-200',
    badgeClass: 'bg-amber-100 text-amber-700'
  },
  {
    id: 'Education',
    name: 'Education',
    icon: 'GraduationCap',
    color: '#0284C7', // sky-600
    bgColor: 'bg-sky-50',
    textColor: 'text-sky-700',
    borderColor: 'border-sky-200',
    badgeClass: 'bg-sky-100 text-sky-700'
  },
  {
    id: 'Other',
    name: 'Other',
    icon: 'Tag',
    color: '#64748B', // slate-500
    bgColor: 'bg-slate-100',
    textColor: 'text-slate-700',
    borderColor: 'border-slate-200',
    badgeClass: 'bg-slate-100 text-slate-700'
  }
];

export const CATEGORY_MAP = CATEGORIES.reduce((acc, cat) => {
  acc[cat.id] = cat;
  return acc;
}, {});

export const getCategoryMeta = (categoryId) => {
  return CATEGORY_MAP[categoryId] || {
    id: categoryId,
    name: categoryId || 'Other',
    icon: 'Tag',
    color: '#64748B',
    bgColor: 'bg-slate-100',
    textColor: 'text-slate-700',
    borderColor: 'border-slate-200',
    badgeClass: 'bg-slate-100 text-slate-700'
  };
};
