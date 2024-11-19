import React from 'react';
import { motion } from 'framer-motion';
import { Yacht } from '../types';
import { Anchor, Users, Bed, Calendar, Ruler } from 'lucide-react';
import { useApp } from '../contexts/AppContext';

interface YachtCardProps {
  yacht: Yacht;
  onClick: () => void;
}

export const YachtCard: React.FC<YachtCardProps> = ({ yacht, onClick }) => {
  const { formatPrice, t } = useApp();

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer"
      onClick={onClick}
    >
      <div className="relative h-48">
        <img
          src={yacht.image}
          alt={yacht.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
          <h3 className="text-white text-xl font-bold">{yacht.name}</h3>
        </div>
      </div>
      <div className="p-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-2">
            <Ruler className="w-4 h-4 text-[#be9b53]" />
            <span>{yacht.length}m</span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-[#be9b53]" />
            <span>{yacht.guests} {t('guests.label')}</span>
          </div>
          <div className="flex items-center gap-2">
            <Bed className="w-4 h-4 text-[#be9b53]" />
            <span>{yacht.cabins} {t('cabins')}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-[#be9b53]" />
            <span>{yacht.year}</span>
          </div>
        </div>
        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Anchor className="w-4 h-4 text-[#be9b53]" />
            <span>{yacht.location}</span>
          </div>
          <span className="text-[#be9b53] font-bold">
            {formatPrice(yacht.price)}/week
          </span>
        </div>
      </div>
    </motion.div>
  );
};