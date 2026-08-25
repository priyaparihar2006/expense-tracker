import React from 'react';
import { 
  Utensils, 
  Car, 
  ShoppingBag, 
  Receipt, 
  Film, 
  HeartPulse, 
  GraduationCap, 
  Tag 
} from 'lucide-react';
import { getCategoryMeta } from '../data/categories';

const iconMap = {
  Utensils,
  Car,
  ShoppingBag,
  Receipt,
  Film,
  HeartPulse,
  GraduationCap,
  Tag
};

export const CategoryBadge = ({ categoryId, size = 'md', showIcon = true }) => {
  const meta = getCategoryMeta(categoryId);
  const IconComponent = iconMap[meta.icon] || Tag;

  const sizeClasses = {
    sm: 'px-2 py-0.5 text-[9px]',
    md: 'px-2.5 py-1 text-[10px]',
    lg: 'px-3 py-1.5 text-xs'
  };

  const iconSizes = {
    sm: 'w-2.5 h-2.5',
    md: 'w-3 h-3',
    lg: 'w-3.5 h-3.5'
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-md font-bold uppercase tracking-wider ${meta.badgeClass} ${sizeClasses[size] || sizeClasses.md}`}
      id={`badge-${categoryId?.toLowerCase() || 'other'}`}
    >
      {showIcon && <IconComponent className={iconSizes[size] || iconSizes.md} />}
      <span>{meta.name}</span>
    </span>
  );
};
