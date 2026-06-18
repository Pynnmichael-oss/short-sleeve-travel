import type { Trip } from '@/types'

export const trips: Trip[] = [
  {
    id: 'patagonia',
    destination: 'Patagonia',
    country: 'Chile',
    tagline: 'Edge of the World',
    category: 'Hiking',
    duration: 12,
    groupSize: 10,
    price: 3200,
    image: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=800',
    description:
      'Trek through the raw wilderness of Torres del Paine. Wild camping, glacier walks, and sunsets that make you believe in something bigger.',
    highlights: [
      'Torres del Paine trek',
      'Wild camping',
      'Glacier Grey',
      'Grey Lake kayaking',
    ],
  },
  {
    id: 'oaxaca',
    destination: 'Oaxaca',
    country: 'Mexico',
    tagline: 'Culture, Mezcal & Mountains',
    category: 'Cultural',
    duration: 8,
    groupSize: 12,
    price: 1800,
    image: 'https://images.unsplash.com/photo-1518638150340-f706e86654de?w=800',
    description:
      'Lose yourself in the color, food, and soul of Oaxaca. Hike the Sierra Norte, eat everything, and dance until you forget what day it is.',
    highlights: [
      'Sierra Norte hike',
      'Mezcal tasting',
      'Cooking class',
      'Day of the Dead markets',
    ],
  },
  {
    id: 'azores',
    destination: 'The Azores',
    country: 'Portugal',
    tagline: 'Atlantic Wild',
    category: 'Beach & Islands',
    duration: 10,
    groupSize: 8,
    price: 2600,
    image: 'https://images.unsplash.com/photo-1559494007-9f5847c49d94?w=800',
    description:
      'Nine volcanic islands in the middle of the Atlantic. Crater lakes, whale watching, thermal springs, and the kind of quiet that resets everything.',
    highlights: [
      'Sete Cidades crater lake',
      'Whale watching',
      'Furnas hot springs',
      'Coastal hiking',
    ],
  },
]
