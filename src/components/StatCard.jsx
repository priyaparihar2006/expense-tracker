import React from 'react';
import { motion } from 'motion/react';

export const StatCard = ({
  id,
  title,
  value,
  subtitle,
  icon: Icon,
  iconColor = 'text-emerald-600',
  iconBg = 'bg-emerald-50',
  badgeText
}) => {
  return (
    <motion.div
      id={id}
      whileHover={{ y: -2, transition: { duration: 0.15 } }}
      className="bg-white p-6 rounded-2xl border border-slate-100 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
    >
      <div className="flex items-start space-x-4">
        <div className={`p-3.5 ${iconBg} ${iconColor} rounded-xl shrink-0`}>
          {Icon && <Icon className="w-6 h-6" />}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-1">
            {title}
          </p>
          <p className="text-2xl font-black text-slate-800 tracking-tight truncate">
            {value}
          </p>
        </div>
      </div>

      {(subtitle || badgeText) && (
        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <span className="truncate">{subtitle}</span>
          {badgeText && (
            <span className="font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded-md text-[10px] uppercase">
              {badgeText}
            </span>
          )}
        </div>
      )}
    </motion.div>
  );
};
