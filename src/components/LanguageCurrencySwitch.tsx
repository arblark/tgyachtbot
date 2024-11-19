import React from 'react';
import { useApp } from '../contexts/AppContext';
import { Globe, Coins } from 'lucide-react';

export const LanguageCurrencySwitch: React.FC = () => {
  const { language, setLanguage, currency, setCurrency } = useApp();

  return (
    <div className="fixed top-4 left-4 flex gap-2">
      <div className="bg-white rounded-full shadow-lg">
        <button
          onClick={() => setLanguage(language === 'en' ? 'ru' : 'en')}
          className="p-2 flex items-center gap-2 hover:bg-gray-50 rounded-full transition-colors"
        >
          <Globe className="w-5 h-5 text-[#be9b53]" />
          <span className="font-medium uppercase">{language}</span>
        </button>
      </div>

      <div className="bg-white rounded-full shadow-lg">
        <select
          value={currency}
          onChange={(e) => setCurrency(e.target.value as any)}
          className="appearance-none bg-transparent pl-2 pr-8 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-[#be9b53] cursor-pointer"
          style={{ paddingRight: '2.5rem' }}
        >
          <option value="EUR">EUR</option>
          <option value="USD">USD</option>
          <option value="AED">AED</option>
          <option value="RUB">RUB</option>
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2">
          <Coins className="w-5 h-5 text-[#be9b53]" />
        </div>
      </div>
    </div>
  );
};