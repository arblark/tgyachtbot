import React, { useState } from 'react';
import { Yacht, BookingDetails } from '../types';
import { Calendar, Users } from 'lucide-react';
import { useApp } from '../contexts/AppContext';

interface BookingFormProps {
  yacht: Yacht;
  onBook: (details: BookingDetails) => void;
}

export const BookingForm: React.FC<BookingFormProps> = ({ yacht, onBook }) => {
  const { t } = useApp();
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [guests, setGuests] = useState(1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const start = new Date(startDate);
    const end = new Date(endDate);
    const days = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
    const totalPrice = (yacht.price / 7) * days;

    onBook({
      yacht,
      startDate,
      endDate,
      guests,
      totalPrice
    });
  };

  const today = new Date().toISOString().split('T')[0];

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h3 className="text-xl font-semibold mb-4">{t('book.your.charter')}</h3>

      <div className="space-y-4">
        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-[#be9b53]" />
                {t('start.date')}
              </div>
            </label>
            <input
              type="date"
              min={today}
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              required
              className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#be9b53] focus:border-transparent"
            />
          </div>

          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-[#be9b53]" />
                {t('end.date')}
              </div>
            </label>
            <input
              type="date"
              min={startDate || today}
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              required
              className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#be9b53] focus:border-transparent"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-[#be9b53]" />
              {t('guests')}
            </div>
          </label>
          <input
            type="number"
            min="1"
            max={yacht.guests}
            value={guests}
            onChange={(e) => setGuests(parseInt(e.target.value))}
            required
            className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#be9b53] focus:border-transparent"
          />
          <p className="text-sm text-gray-500 mt-1">{t('maximum.guests')} {yacht.guests}</p>
        </div>
      </div>

      <button
        type="submit"
        className="w-full bg-[#be9b53] text-white py-3 rounded-lg hover:bg-[#a88947] transition-colors"
      >
        {t('book.now')}
      </button>
    </form>
  );
};