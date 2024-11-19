import React, { useState, useEffect, useRef } from 'react';
import WebApp from '@twa-dev/sdk';
import { YachtCard } from './components/YachtCard';
import { ContactForm } from './components/ContactForm';
import { Filters } from './components/Filters';
import { OrdersButton } from './components/OrdersButton';
import { OrdersPanel } from './components/OrdersPanel';
import { BookingForm } from './components/BookingForm';
import { LanguageCurrencySwitch } from './components/LanguageCurrencySwitch';
import { yachts } from './data/yachts';
import { orders } from './data/orders';
import { SortOption, Yacht, BookingDetails } from './types';
import { Ship, X } from 'lucide-react';
import { useApp } from './contexts/AppContext';

function App() {
  const { t } = useApp();
  const [sortBy, setSortBy] = useState<SortOption>('price');
  const [selectedYacht, setSelectedYacht] = useState<Yacht | null>(null);
  const [showOrders, setShowOrders] = useState(false);
  const [bookingDetails, setBookingDetails] = useState<BookingDetails | null>(null);
  const contactFormRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    WebApp.ready();
    WebApp.expand();
  }, []);

  const sortedYachts = [...yachts].sort((a, b) => {
    if (sortBy === 'price') return b.price - a.price;
    if (sortBy === 'length') return b.length - a.length;
    if (sortBy === 'year') return b.year - a.year;
    return b.guests - a.guests;
  });

  const handleBooking = (details: BookingDetails) => {
    setBookingDetails(details);
    setSelectedYacht(null);
    setTimeout(() => {
      contactFormRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <div className="min-h-screen bg-[#f2f2f2] p-4">
      <header className="flex items-center justify-center gap-3 mb-6 mt-16 md:mt-4">
        <Ship className="w-8 h-8 text-[#be9b53]" />
        <h1 className="text-2xl font-bold">{t('luxury.yacht.charter')}</h1>
      </header>

      <LanguageCurrencySwitch />

      <OrdersButton
        onClick={() => setShowOrders(true)}
        ordersCount={orders.length}
      />

      <Filters onSort={setSortBy} activeSort={sortBy} />

      <div className="grid grid-cols-1 gap-4 mb-8">
        {sortedYachts.map((yacht) => (
          <YachtCard
            key={yacht.id}
            yacht={yacht}
            onClick={() => setSelectedYacht(yacht)}
          />
        ))}
      </div>

      {selectedYacht && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-lg w-full max-h-[90vh] overflow-y-auto relative">
            <button
              onClick={() => setSelectedYacht(null)}
              className="absolute right-2 top-2 z-10 p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            <img
              src={selectedYacht.image}
              alt={selectedYacht.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-2xl font-bold mb-2">{selectedYacht.name}</h2>
              <p className="text-gray-600 mb-4">{selectedYacht.description}</p>
              
              <BookingForm yacht={selectedYacht} onBook={handleBooking} />
            </div>
          </div>
        </div>
      )}

      {showOrders && (
        <OrdersPanel
          orders={orders}
          onClose={() => setShowOrders(false)}
        />
      )}

      <div ref={contactFormRef}>
        <ContactForm bookingDetails={bookingDetails} onBookingDetailsClear={() => setBookingDetails(null)} />
      </div>
    </div>
  );
}

export default App;