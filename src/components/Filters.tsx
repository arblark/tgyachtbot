import React from 'react';
import { SortOption } from '../types';
import { SlidersHorizontal } from 'lucide-react';
import { useApp } from '../contexts/AppContext';

interface FiltersProps {
  onSort: (option: SortOption) => void;
  activeSort: SortOption;
}

export const Filters: React.FC<FiltersProps> = ({ onSort, activeSort }) => {
  const { t } = useApp();
  
  const sortOptions: { label: string; value: SortOption }[] = [
    { label: t('price'), value: 'price' },
    { label: t('length'), value: 'length' },
    { label: t('year'), value: 'year' },
    { label: t('guests.sort'), value: 'guests' },
  ];

  return (
    <div className="bg-white p-4 rounded-xl shadow-lg mb-4">
      <div className="flex items-center gap-2 mb-3">
        <SlidersHorizontal className="w-5 h-5 text-[#be9b53]" />
        <h3 className="font-semibold">{t('sort.by')}</h3>
      </div>
      <div className="flex gap-2 overflow-x-auto pb-2">
        {sortOptions.map((option) => (
          <button
            key={option.value}
            onClick={() => onSort(option.value)}
            className={`px-4 py-2 rounded-lg whitespace-nowrap ${
              activeSort === option.value
                ? 'bg-[#be9b53] text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
};