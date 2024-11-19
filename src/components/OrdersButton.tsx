import React from 'react';
import { ClipboardList } from 'lucide-react';

interface OrdersButtonProps {
  onClick: () => void;
  ordersCount: number;
}

export const OrdersButton: React.FC<OrdersButtonProps> = ({ onClick, ordersCount }) => {
  return (
    <button
      onClick={onClick}
      className="fixed top-4 right-4 bg-white rounded-full w-12 h-12 shadow-lg flex items-center justify-center"
    >
      <div className="relative">
        <ClipboardList className="w-6 h-6 text-[#be9b53]" />
        {ordersCount > 0 && (
          <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
            {ordersCount}
          </div>
        )}
      </div>
    </button>
  );
};