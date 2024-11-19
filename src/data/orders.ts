import { Order } from '../types';
import { yachts } from './yachts';

export const orders: Order[] = [
  {
    id: '1',
    yachtId: '1',
    orderDate: '2024-03-10T10:30:00Z',
    startDate: '2024-07-15T12:00:00Z',
    endDate: '2024-07-22T12:00:00Z',
    status: 'confirmed',
    totalPrice: 780000
  },
  {
    id: '2',
    yachtId: '2',
    orderDate: '2024-03-08T15:45:00Z',
    startDate: '2024-08-01T12:00:00Z',
    endDate: '2024-08-08T12:00:00Z',
    status: 'pending',
    totalPrice: 850000
  }
];