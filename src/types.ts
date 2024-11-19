export interface Yacht {
  id: string;
  name: string;
  length: number;
  guests: number;
  cabins: number;
  crew: number;
  price: number;
  location: string;
  year: number;
  image: string;
  description: string;
}

export type SortOption = 'price' | 'length' | 'year' | 'guests';

export interface Order {
  id: string;
  yachtId: string;
  orderDate: string;
  startDate: string;
  endDate: string;
  status: 'pending' | 'confirmed' | 'completed';
  totalPrice: number;
}

export interface CalendarEvent {
  title: string;
  description: string;
  startDate: string;
  endDate: string;
}

export interface BookingDetails {
  yacht: Yacht;
  startDate: string;
  endDate: string;
  guests: number;
  totalPrice: number;
}