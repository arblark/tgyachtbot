import React, { useState, useEffect } from 'react';
import { Send } from 'lucide-react';
import WebApp from '@twa-dev/sdk';
import { BookingDetails } from '../types';
import { useApp } from '../contexts/AppContext';

interface ContactFormProps {
  bookingDetails: BookingDetails | null;
  onBookingDetailsClear: () => void;
}

export const ContactForm: React.FC<ContactFormProps> = ({ bookingDetails, onBookingDetailsClear }) => {
  const { t } = useApp();
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (bookingDetails) {
      const { yacht, startDate, endDate, guests, totalPrice } = bookingDetails;
      const bookingMessage = `${t('book.your.charter')}:\n\n` +
        `${yacht.name}\n` +
        `${t('start.date')}: ${new Date(startDate).toLocaleDateString()}\n` +
        `${t('end.date')}: ${new Date(endDate).toLocaleDateString()}\n` +
        `${t('guests')}: ${guests}\n` +
        `${t('total')}: €${totalPrice.toLocaleString()}\n\n` +
        `${t('enter.message')}`;
      
      setMessage(bookingMessage);
    }
  }, [bookingDetails, t]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      WebApp.sendData(JSON.stringify({
        type: 'contact',
        message: message
      }));
      setMessage('');
      if (bookingDetails) {
        onBookingDetailsClear();
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-white rounded-xl shadow-lg">
      <h3 className="text-xl font-bold mb-4">{t('contact.manager')}</h3>
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder={t('enter.message')}
        className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#be9b53] focus:border-transparent"
        rows={6}
      />
      <button
        type="submit"
        className="mt-4 w-full bg-[#be9b53] text-white py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-[#a88947] transition-colors"
      >
        <Send className="w-4 h-4" />
        {t('send.message')}
      </button>
    </form>
  );
};