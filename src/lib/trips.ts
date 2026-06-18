import type { Trip } from '@/types'

export const trips: Trip[] = [
  {
    id: 'patagonia',
    destination: 'Patagonia',
    country: 'Chile',
    tagline: 'Edge of the World',
    duration: 12,
    groupSize: 10,
    price: 3200,
    image: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=800',
    highlights: ['Trekking Torres del Paine', 'Wild camping', 'Glacier walks'],
  },
  {
    id: 'oaxaca',
    destination: 'Oaxaca',
    country: 'Mexico',
    tagline: 'Culture, Mezcal & Mountains',
    duration: 8,
    groupSize: 12,
    price: 1800,
    image: 'https://images.unsplash.com/photo-1518638150340-f706e86654de?w=800',
    highlights: ['Hiking Sierra Norte', 'Cooking classes', 'Day of the Dead markets'],
  },
  {
    id: 'azores',
    destination: 'The Azores',
    country: 'Portugal',
    tagline: 'Atlantic Wild',
    duration: 10,
    groupSize: 8,
    price: 2600,
    image: 'https://images.unsplash.com/photo-1559494007-9f5847c49d94?w=800',
    highlights: ['Volcanic crater hikes', 'Whale watching', 'Thermal springs'],
  },
]
