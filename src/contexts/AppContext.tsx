import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'ru';
type Currency = 'EUR' | 'USD' | 'AED' | 'RUB';

interface AppContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  currency: Currency;
  setCurrency: (curr: Currency) => void;
  formatPrice: (price: number) => string;
  t: (key: string) => string;
}

const translations = {
  en: {
    'luxury.yacht.charter': 'Luxury Yacht Charter',
    'book.now': 'Book Now',
    'book.your.charter': 'Book Your Charter',
    'start.date': 'Start Date',
    'end.date': 'End Date',
    'guests': 'Number of Guests',
    'maximum.guests': 'Maximum',
    'contact.manager': 'Contact Manager',
    'enter.message': 'Enter your message...',
    'send.message': 'Send Message',
    'your.orders': 'Your Orders',
    'no.orders': 'No orders yet',
    'order.date': 'Order Date',
    'charter.period': 'Charter Period',
    'status': 'Status',
    'status.pending': 'Pending',
    'status.confirmed': 'Confirmed',
    'status.completed': 'Completed',
    'total': 'Total',
    'add.to.calendar': 'Add to Calendar',
    'sort.by': 'Sort by',
    'price': 'Price',
    'length': 'Length',
    'year': 'Year',
    'guests.sort': 'Guests',
    'cabins': 'cabins',
    'guests.label': 'guests',
    'yacht.charter': 'Yacht Charter',
    'yacht.charter.in': 'yacht charter in'
  },
  ru: {
    'luxury.yacht.charter': 'Аренда Элитных Яхт',
    'book.now': 'Забронировать',
    'book.your.charter': 'Забронировать яхту',
    'start.date': 'Дата начала',
    'end.date': 'Дата окончания',
    'guests': 'Количество гостей',
    'maximum.guests': 'Максимум',
    'contact.manager': 'Связаться с менеджером',
    'enter.message': 'Введите сообщение...',
    'send.message': 'Отправить сообщение',
    'your.orders': 'Ваши заказы',
    'no.orders': 'Заказов пока нет',
    'order.date': 'Дата заказа',
    'charter.period': 'Период аренды',
    'status': 'Статус',
    'status.pending': 'В обработке',
    'status.confirmed': 'Подтвержден',
    'status.completed': 'Завершен',
    'total': 'Итого',
    'add.to.calendar': 'Добавить в календарь',
    'sort.by': 'Сортировать по',
    'price': 'Цене',
    'length': 'Длине',
    'year': 'Году',
    'guests.sort': 'Гостям',
    'cabins': 'кают',
    'guests.label': 'гостей',
    'yacht.charter': 'Аренда яхты',
    'yacht.charter.in': 'аренда яхты в'
  }
};

const currencyRates = {
  EUR: 1,
  USD: 1.09,
  AED: 4,
  RUB: 98.5
};

const currencySymbols = {
  EUR: '€',
  USD: '$',
  AED: 'AED',
  RUB: '₽'
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');
  const [currency, setCurrency] = useState<Currency>('EUR');

  const formatPrice = (priceInEUR: number) => {
    const convertedPrice = priceInEUR * currencyRates[currency];
    const symbol = currencySymbols[currency];
    
    if (currency === 'RUB') {
      return `${Math.round(convertedPrice).toLocaleString()} ${symbol}`;
    }
    
    return currency === 'AED' 
      ? `${symbol} ${Math.round(convertedPrice).toLocaleString()}`
      : `${symbol}${Math.round(convertedPrice).toLocaleString()}`;
  };

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['en']] || key;
  };

  return (
    <AppContext.Provider value={{
      language,
      setLanguage,
      currency,
      setCurrency,
      formatPrice,
      t
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}