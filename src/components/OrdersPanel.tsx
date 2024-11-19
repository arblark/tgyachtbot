import React from 'react';
import { X, Calendar as CalendarIcon } from 'lucide-react';
import { Order, Yacht } from '../types';
import { yachts } from '../data/yachts';
import WebApp from '@twa-dev/sdk';
import { useApp } from '../contexts/AppContext';

interface OrdersPanelProps {
  orders: Order[];
  onClose: () => void;
}

export const OrdersPanel: React.FC<OrdersPanelProps> = ({ orders, onClose }) => {
  const { t, formatPrice } = useApp();

  const getYachtDetails = (yachtId: string): Yacht | undefined => {
    return yachts.find(yacht => yacht.id === yachtId);
  };

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleAddToCalendar = (order: Order) => {
    const yacht = getYachtDetails(order.yachtId);
    if (!yacht) return;

    const event = {
      title: `${t('yacht.charter')}: ${yacht.name}`,
      description: `${yacht.length}m ${t('yacht.charter.in')} ${yacht.location}`,
      startDate: order.startDate,
      endDate: order.endDate
    };

    WebApp.sendData(JSON.stringify({
      type: 'addToCalendar',
      event
    }));
  };

  const getStatusClass = (status: Order['status']) => {
    switch (status) {
      case 'confirmed':
        return 'text-green-600';
      case 'pending':
        return 'text-yellow-600';
      default:
        return 'text-blue-600';
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-start justify-end">
      <div className="bg-white w-full max-w-md h-full overflow-y-auto">
        <div className="sticky top-0 bg-white z-10 p-4 border-b flex items-center justify-between">
          <h2 className="text-xl font-bold">{t('your.orders')}</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <div className="p-4 space-y-4">
          {orders.length === 0 ? (
            <p className="text-gray-500 text-center py-8">{t('no.orders')}</p>
          ) : (
            orders.map(order => {
              const yacht = getYachtDetails(order.yachtId);
              if (!yacht) return null;

              return (
                <div key={order.id} className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center gap-4 mb-3">
                    <img
                      src={yacht.image}
                      alt={yacht.name}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                    <div>
                      <h3 className="font-bold">{yacht.name}</h3>
                      <p className="text-sm text-gray-600">{yacht.location}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-2 text-sm">
                    <p>
                      <span className="text-gray-600">{t('order.date')}:</span>{' '}
                      {formatDate(order.orderDate)}
                    </p>
                    <p>
                      <span className="text-gray-600">{t('charter.period')}:</span>{' '}
                      {formatDate(order.startDate)} - {formatDate(order.endDate)}
                    </p>
                    <p>
                      <span className="text-gray-600">{t('status')}:</span>{' '}
                      <span className={`capitalize ${getStatusClass(order.status)}`}>
                        {t(`status.${order.status}`)}
                      </span>
                    </p>
                    <p>
                      <span className="text-gray-600">{t('total')}:</span>{' '}
                      {formatPrice(order.totalPrice)}
                    </p>
                  </div>

                  <button
                    onClick={() => handleAddToCalendar(order)}
                    className="mt-4 w-full bg-[#be9b53] text-white py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-[#a88947] transition-colors"
                  >
                    <CalendarIcon className="w-4 h-4" />
                    {t('add.to.calendar')}
                  </button>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};