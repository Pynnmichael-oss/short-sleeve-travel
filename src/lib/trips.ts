import type { Trip } from '@/types'

export const trips: Trip[] = [
  {
    id: 'patagonia',
    slug: 'patagonia-chile',
    destination: 'Patagonia',
    country: 'Chile',
    tagline: 'Edge of the World',
    category: 'Hiking',
    duration: 12,
    groupSize: 10,
    price: 3200,
    difficulty: 'Challenging',
    image: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=800',
    heroImage: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=1920',
    galleryImages: [
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1200',
      'https://images.unsplash.com/photo-1539635278303-d4002c07eae3?w=1200',
      'https://images.unsplash.com/photo-1527631746610-bca00a040d60?w=1200',
      'https://images.unsplash.com/photo-1520466809213-7b9a56adcd45?w=1200',
    ],
    description:
      'Trek through the raw wilderness of Torres del Paine. Wild camping, glacier walks, and sunsets that make you believe in something bigger.',
    hook: 'Patagonia does not care about your schedule, your comfort zone, or your Instagram feed. It is raw, unpredictable, and completely indifferent to whether you are ready for it. That is exactly why we go. Torres del Paine will make you feel genuinely small in the best possible way — and the people you share that feeling with become friends for life.',
    highlights: [
      'Torres del Paine trek',
      'Wild camping',
      'Glacier Grey',
      'Grey Lake kayaking',
    ],
    itinerary: [
      {
        day: 1,
        title: 'Arrival in Punta Arenas',
        description: 'Land, meet your group, share a meal and a glass of Carmenere. Tonight the adventure feels real.',
      },
      {
        day: 2,
        title: 'Transfer to Puerto Natales',
        description: 'Scenic drive through the pampa. Spot guanacos, condors, and the first glimpse of the towers.',
      },
      {
        day: 3,
        title: 'Trek Base Las Torres',
        description: 'The classic. Six hours up, two hours back. Worth every step.',
      },
      {
        day: 4,
        title: 'Valle del Francés',
        description: 'A full day circuit through hanging glaciers and ancient lenga beech forests.',
      },
      {
        day: 5,
        title: 'Rest Day in Refugio',
        description: 'Optional kayaking on Grey Lake or a slow morning with coffee and a book.',
      },
      {
        day: 6,
        title: 'Glacier Grey',
        description: 'Walk to the edge of the southern ice field. Nothing prepares you for this.',
      },
      {
        day: 7,
        title: 'Wild Camp Night',
        description: 'Sleep under Patagonian stars. No phone signal. No distractions. Just the group and the sky.',
      },
      {
        day: 8,
        title: 'Return Trek',
        description: 'A different route back, different light, different conversation.',
      },
      {
        day: 9,
        title: 'Puerto Natales Free Day',
        description: 'Explore the town, visit the caves, eat the best lamb of your life.',
      },
      {
        day: 10,
        title: 'Transfer to Punta Arenas',
        description: 'Last look at the towers through the rear window.',
      },
      {
        day: 11,
        title: 'Optional Extension',
        description: 'Sea kayaking or a day trip to Tierra del Fuego for those who want more.',
      },
      {
        day: 12,
        title: 'Departure',
        description: 'You leave different than you arrived. Everyone does.',
      },
    ],
    included: [
      'Accommodation (mix of refugios and wild camping)',
      'Most meals',
      'All guided activities',
      'Local transport within the park',
      'Group gear',
    ],
    notIncluded: [
      'International flights',
      'Travel insurance',
      'Personal spending',
      'Alcoholic beverages',
    ],
    whoItsFor: [
      {
        type: 'Solo Traveler',
        description: 'You want to push yourself physically and come home with stories worth telling.',
      },
      {
        type: 'Remote Worker',
        description: 'You have been staring at a screen for too long. Patagonia will reset everything.',
      },
      {
        type: 'Adventure Seeker',
        description: 'You have done the easy trips. This one is different.',
      },
    ],
  },
  {
    id: 'oaxaca',
    slug: 'oaxaca-mexico',
    destination: 'Oaxaca',
    country: 'Mexico',
    tagline: 'Culture, Mezcal & Mountains',
    category: 'Cultural',
    duration: 8,
    groupSize: 12,
    price: 1800,
    difficulty: 'Moderate',
    image: 'https://images.unsplash.com/photo-1518638150340-f706e86654de?w=800',
    heroImage: 'https://images.unsplash.com/photo-1518638150340-f706e86654de?w=1920',
    galleryImages: [
      'https://images.unsplash.com/photo-1518638150340-f706e86654de?w=1200',
      'https://images.unsplash.com/photo-1504387432042-8aca549e4729?w=1200',
      'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=1200',
      'https://images.unsplash.com/photo-1527631746610-bca00a040d60?w=1200',
    ],
    description:
      'Lose yourself in the color, food, and soul of Oaxaca. Hike the Sierra Norte, eat everything, and dance until you forget what day it is.',
    hook: 'Oaxaca is the kind of place that gets under your skin quietly. The mole, the mezcal, the markets, the mountains — none of it is loud about how extraordinary it is. You just look up one afternoon and realize this might be the best trip you have ever taken.',
    highlights: [
      'Sierra Norte hike',
      'Mezcal tasting',
      'Cooking class',
      'Day of the Dead markets',
    ],
    itinerary: [
      {
        day: 1,
        title: 'Arrival in Oaxaca City',
        description: 'Mezcal welcome drinks on a rooftop. The city spreads out below you like a painting.',
      },
      {
        day: 2,
        title: 'Market Day',
        description: 'Benito Juarez market in the morning, cooking class in the afternoon. You will make mole from scratch.',
      },
      {
        day: 3,
        title: 'Sierra Norte Trek',
        description: 'Into the cloud forest above the city. Cool air, pine trees, and villages that feel untouched.',
      },
      {
        day: 4,
        title: 'Mezcal Trail',
        description: 'Visit a family palenque, watch the process, taste things you cannot find anywhere else.',
      },
      {
        day: 5,
        title: 'Monte Alban',
        description: 'Ancient Zapotec ruins at sunrise before the crowds arrive. Genuinely one of the great archaeological sites on earth.',
      },
      {
        day: 6,
        title: 'Day of the Dead Markets',
        description: 'If timing aligns, nothing else compares. If not, the artisan markets of Tlacolula are extraordinary.',
      },
      {
        day: 7,
        title: 'Free Day',
        description: 'Beach day at Puerto Escondido optional, or wander Oaxaca City at your own pace.',
      },
      {
        day: 8,
        title: 'Departure',
        description: 'You leave with a bag full of textiles, a head full of memories, and a group chat that will not stop.',
      },
    ],
    included: [
      'Boutique guesthouse accommodation',
      'Breakfast daily',
      'Cooking class',
      'All guided excursions',
      'Local transport',
    ],
    notIncluded: [
      'International flights',
      'Lunches and dinners (except cooking class)',
      'Travel insurance',
      'Personal spending',
    ],
    whoItsFor: [
      {
        type: 'Food Lover',
        description: 'You travel to eat. Oaxaca is the best decision you will ever make.',
      },
      {
        type: 'Culture Seeker',
        description: 'You want to understand a place, not just visit it.',
      },
      {
        type: 'First Time Solo',
        description: 'Oaxaca is warm, safe, and immediately loveable. Perfect first adventure.',
      },
    ],
  },
  {
    id: 'azores',
    slug: 'azores-portugal',
    destination: 'The Azores',
    country: 'Portugal',
    tagline: 'Atlantic Wild',
    category: 'Beach & Islands',
    duration: 10,
    groupSize: 8,
    price: 2600,
    difficulty: 'Moderate',
    image: 'https://images.unsplash.com/photo-1559494007-9f5847c49d94?w=800',
    heroImage: 'https://images.unsplash.com/photo-1559494007-9f5847c49d94?w=1920',
    galleryImages: [
      'https://images.unsplash.com/photo-1559494007-9f5847c49d94?w=1200',
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200',
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1200',
      'https://images.unsplash.com/photo-1539635278303-d4002c07eae3?w=1200',
    ],
    description:
      'Nine volcanic islands in the middle of the Atlantic. Crater lakes, whale watching, thermal springs, and the kind of quiet that resets everything.',
    hook: 'The Azores exist in a category of their own. Nine volcanic islands dropped in the middle of the Atlantic, technically Europe but feeling like nowhere else on earth. Crater lakes the color of jade. Whales breaching at dawn. Hot springs you soak in while watching the ocean. This is what the world looked like before we got to it.',
    highlights: [
      'Sete Cidades crater lake',
      'Whale watching',
      'Furnas hot springs',
      'Coastal hiking',
    ],
    itinerary: [
      {
        day: 1,
        title: 'Arrival in Ponta Delgada',
        description: 'Welcome dinner overlooking the harbor. The Atlantic air hits different here.',
      },
      {
        day: 2,
        title: 'Sete Cidades',
        description: 'The twin crater lakes. One green, one blue. The hike around the rim takes your breath away twice.',
      },
      {
        day: 3,
        title: 'Whale Watching',
        description: 'Dawn departure. Blue whales, sperm whales, common dolphins. Life-changing is not an overstatement.',
      },
      {
        day: 4,
        title: 'Furnas',
        description: 'Hot springs, volcanic fumaroles, and lunch cooked underground by geothermal heat. Truly extraordinary.',
      },
      {
        day: 5,
        title: 'Flores Island Day Trip',
        description: 'The most remote and beautiful island in the archipelago. Waterfalls and hydrangeas everywhere.',
      },
      {
        day: 6,
        title: 'Coastal Hiking',
        description: 'The eastern coast trail with views of the Atlantic that make you feel genuinely free.',
      },
      {
        day: 7,
        title: 'Free Day',
        description: 'Diving, surfing, or a slow day in Ponta Delgada exploring the old town.',
      },
      {
        day: 8,
        title: 'Faial Island',
        description: 'The volcanic caldera on Faial is one of the most dramatic landscapes in Europe.',
      },
      {
        day: 9,
        title: 'Final Evening',
        description: 'Group dinner. Stories, laughter, and the realization that this one really got you.',
      },
      {
        day: 10,
        title: 'Departure',
        description: 'You will be back. Everyone comes back to the Azores.',
      },
    ],
    included: [
      'Island accommodation',
      'Breakfast daily',
      'Whale watching excursion',
      'All guided hikes',
      'Inter-island ferry transport',
    ],
    notIncluded: [
      'International flights to Ponta Delgada',
      'Travel insurance',
      'Lunches and dinners',
      'Personal spending',
    ],
    whoItsFor: [
      {
        type: 'Nature Lover',
        description: 'You want landscapes that feel genuinely untouched. The Azores will deliver.',
      },
      {
        type: 'Slow Traveler',
        description: 'You are done with rushing. Ten days here will feel like a full reset.',
      },
      {
        type: 'Ocean Person',
        description: 'Whales, surfing, diving, sailing. The Atlantic is yours.',
      },
    ],
  },
]
