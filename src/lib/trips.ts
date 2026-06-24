import type { Trip } from '@/types'

export const trips: Trip[] = [
  {
    id: 'new-zealand',
    slug: 'new-zealand-adventure',
    destination: 'New Zealand',
    country: 'New Zealand',
    tagline: 'New Zealand Adventure',
    category: 'Adventure',
    duration: 13,
    groupSize: 12,
    price: 2595,
    difficulty: 'Moderate',
    image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800',
    heroImage: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1920',
    galleryImages: [
      'https://images.unsplash.com/photo-1507699622108-4be3abd695ad?w=1200',
      'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=1200',
      'https://images.unsplash.com/photo-1504893524553-b855bce32c67?w=1200',
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1200',
    ],
    hook: 'New Zealand does not ease you in. From day one it is glowworm caves, Hobbiton, geothermal parks, Maori cultural evenings, glacier valleys, and sunsets over lakes so still they look painted. Thirteen days across both islands with a group of people who will feel like old friends by day three.',
    description:
      "From Auckland to Queenstown via some of the most jaw-dropping landscapes on earth. Waitomo's glowworm caves, Hobbiton, Rotorua's geothermal magic, kayaking on Lake Taupo, the Hooker Valley Track, a Milford Sound cruise. This is New Zealand done properly.",
    highlights: [
      'Waitomo Glowworm Caves',
      'Hobbiton',
      'Milford Sound Cruise',
      'Maori Cultural Evening',
      'Hooker Valley Track',
      'Lake Wanaka Tree',
    ],
    itinerary: [
      {
        day: 1,
        title: 'Welcome to Auckland',
        description:
          "Drop your bags, meet the group, explore the city and discover Auckland's best rooftop bars.",
      },
      {
        day: 2,
        title: 'Waitomo & Hobbiton',
        description:
          'Glowworm caves that look like a Disney film, then Hobbiton. Yes, the actual Hobbiton.',
      },
      {
        day: 3,
        title: 'Rotorua Redwoods & Maori Evening',
        description:
          'A forest walk dedicated to fallen soldiers, then an evening of haka, hangi feast and Maori culture at Mitai Village.',
      },
      {
        day: 4,
        title: 'Heading to Lake Taupo',
        description:
          'The largest freshwater lake in New Zealand. Your accommodation is one minute from the shore.',
      },
      {
        day: 5,
        title: 'Huka Falls & Kayaking',
        description:
          'Chase waterfalls, soak in the Otumeheke thermal stream, then sunset kayak on Lake Taupo.',
      },
      {
        day: 6,
        title: 'Travel to Auckland',
        description:
          'Cross-country bus day. Download Netflix or make friends. Both are excellent options.',
      },
      {
        day: 7,
        title: 'Fly to Christchurch',
        description:
          "Switch islands. Walking tour, botanical gardens, and the city's famous nightlife awaits.",
      },
      {
        day: 8,
        title: 'Lake Tekapo Magic',
        description:
          'One of the clearest night skies on earth. The Church of Good Shepherd at sunset will make you emotional.',
      },
      {
        day: 9,
        title: 'Hooker Valley Track',
        description:
          'Mostly flat, entirely extraordinary. Views that make you question everything you thought was beautiful.',
      },
      {
        day: 10,
        title: 'Lake Wanaka',
        description:
          'Morning swim, bike ride, and the famous Wanaka Tree growing right out of the crystal water.',
      },
      {
        day: 11,
        title: 'Queenstown',
        description: 'Adventure capital of the world. You are staying right in the heart of it.',
      },
      {
        day: 12,
        title: 'Milford Sound Cruise',
        description:
          'Often called the eighth wonder of the world. Cliffs, peaks, waterfalls. Tonight we celebrate.',
      },
      {
        day: 13,
        title: 'Checkout',
        description: 'It is not goodbye. It is see you later.',
      },
    ],
    included: [
      '12 nights shared accommodation',
      '2 lunches and 1 dinner',
      'All guided activities',
      'Private minivan',
      'Public bus',
      'Internal flight Auckland to Christchurch',
      'Tru Leader guide',
    ],
    notIncluded: [
      'International flights',
      'Travel insurance',
      'Personal spending',
      'Most meals',
    ],
    whoItsFor: [
      {
        type: 'Adventure Seeker',
        description:
          'You want landscapes that make you feel genuinely small. New Zealand delivers on every single day.',
      },
      {
        type: 'Solo Traveler',
        description:
          'You will arrive not knowing anyone. By day three you will have people you want to travel with for life.',
      },
      {
        type: 'Nature Lover',
        description: 'Two islands, thirteen days, zero bad views.',
      },
    ],
  },
  {
    id: 'japan',
    slug: 'spirit-of-japan',
    destination: 'Japan',
    country: 'Japan',
    tagline: 'Spirit of Japan',
    category: 'Cultural',
    duration: 7,
    groupSize: 12,
    price: 1595,
    difficulty: 'Easy',
    image: 'https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=800',
    heroImage: 'https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=1920',
    galleryImages: [
      'https://images.unsplash.com/photo-1492571350019-22de08371fd3?w=1200',
      'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=1200',
      'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=1200',
      'https://images.unsplash.com/photo-1513407030348-c983a97b98d8?w=1200',
    ],
    hook: "Japan is the country that makes everyone feel like they have been living wrong. The food, the temples, the bullet trains, the bamboo forests, the sake. Seven days is not enough — but we cram in more than most people see in two weeks. Tokyo, Hakone, Kyoto. A whistlestop tour of one of the world's greatest countries.",
    description:
      'Three cities, seven days, zero wasted moments. Senso-Ji Temple and sake tasting in Tokyo, cable cars and Mount Fuji views in Hakone, the Arashiyama Bamboo Forest and a traditional tea ceremony in Kyoto. Japan in a week, done properly.',
    highlights: [
      'Senso-Ji Temple',
      'Sake Tasting',
      'Arashiyama Bamboo Forest',
      'Samurai Experience',
      'Bullet Train',
      'Fushimi Inari Red Gates',
    ],
    itinerary: [
      {
        day: 1,
        title: 'Welcome to Tokyo',
        description:
          'Land, find the hostel, meet the group. Welcome dinner and your first taste of Japanese nightlife.',
      },
      {
        day: 2,
        title: 'Temples and Sake',
        description:
          'Senso-Ji Temple, a matcha stop, and sake tasting in Shinjuku. Bright lights and 10/10 vibes.',
      },
      {
        day: 3,
        title: 'Yoyogi Park & Meiji Shrine',
        description:
          "Tokyo's green heart, its most iconic shrine, and Omoide Yokocho — Memory Lane. Karaoke if you dare.",
      },
      {
        day: 4,
        title: 'Hakone & Mount Fuji Views',
        description:
          'Ropeway cable car over volcanic valleys, pirate ship cruise on Lake Ashi, and views of Mount Fuji that will make your camera inadequate.',
      },
      {
        day: 5,
        title: 'Kyoto & Bamboo Forest',
        description:
          "Arashiyama Bamboo Forest in the afternoon, Gion's geisha district in the evening, traditional tea ceremony at the Golden Temple.",
      },
      {
        day: 6,
        title: 'Fushimi Inari & Golden Temple',
        description:
          'Ten thousand red torii gates. The Golden Temple at sunrise. A samurai class. Your best day yet.',
      },
      {
        day: 7,
        title: 'Sayonara',
        description: 'Japan has changed you. Everyone says that. They are all correct.',
      },
    ],
    included: [
      '6 nights accommodation — mix of hostel dorms and twin rooms',
      'All guided activities',
      'Public transport — metro, bus and train',
      'Bullet train (Shinkansen)',
      'Tru Leader guide',
    ],
    notIncluded: [
      'International flights',
      'Travel insurance',
      'Meals unless specified',
      'Personal spending',
    ],
    whoItsFor: [
      {
        type: 'Culture Seeker',
        description:
          'You want to understand a country from the inside. Japan will give you more than you can process in seven days.',
      },
      {
        type: 'Food Lover',
        description:
          'Ramen, sushi, yakitori, matcha, sake. You will eat better here than anywhere else on earth.',
      },
      {
        type: 'First Time Solo',
        description:
          'Japan is safe, fascinating, and immediately loveable. The perfect first adventure.',
      },
    ],
  },
  {
    id: 'morocco',
    slug: 'morocco-uncovered',
    destination: 'Morocco',
    country: 'Morocco',
    tagline: 'Morocco Uncovered',
    category: 'Cultural',
    duration: 9,
    groupSize: 12,
    price: 1195,
    difficulty: 'Easy',
    image: 'https://images.unsplash.com/photo-1539020140153-e479b8c22e70?w=800',
    heroImage: 'https://images.unsplash.com/photo-1539020140153-e479b8c22e70?w=1920',
    galleryImages: [
      'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1200',
      'https://images.unsplash.com/photo-1493246507139-91e8fad9978e?w=1200',
      'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?w=1200',
      'https://images.unsplash.com/photo-1534430480872-3498386e7856?w=1200',
    ],
    hook: 'Morocco is the country that hits all five senses at once and somehow makes it feel like poetry. The souks of Marrakech, the silence of the Sahara, a camel ride into camp as the sun drops behind the dunes. Nine days across one of the most photogenic countries on earth with a group of people who will make it even better.',
    description:
      'Marrakech to the Sahara and back. Jardin Majorelle, the souks, Todra Gorge, sandboarding, desert glamping under the stars, Ait Ben Haddou, a traditional cooking class, and the Atlas Mountains. Morocco in nine days — unhurried, unforgettable.',
    highlights: [
      'Sahara Desert Glamping',
      'Sandboarding',
      'Jardin Majorelle',
      'Sunset Camel Ride',
      'Ait Ben Haddou',
      'Traditional Cooking Class',
    ],
    itinerary: [
      {
        day: 1,
        title: 'Welcome to Marrakech',
        description:
          'Traditional riad, rooftop terrace, Atlas mountain views. The adventure starts tonight.',
      },
      {
        day: 2,
        title: 'The Souks & Jardin Majorelle',
        description:
          "Get lost in the medina. Find your way to Yves Saint Laurent's garden. Jemaa el-Fna square at night.",
      },
      {
        day: 3,
        title: 'Road to Boumalne Dades',
        description: 'Monkey Fingers viewpoint, Todra Gorge. The landscapes are getting serious.',
      },
      {
        day: 4,
        title: 'Heading to the Sahara',
        description:
          'The desert gets closer with every hour. The anticipation is half the experience.',
      },
      {
        day: 5,
        title: 'Sahara Desert Day',
        description:
          'Sandboarding down dunes, sunset camel ride into camp, glamping under more stars than you knew existed.',
      },
      {
        day: 6,
        title: 'Ait Ben Haddou',
        description:
          'UNESCO World Heritage Site. You have seen it in Game of Thrones. It is better in person.',
      },
      {
        day: 7,
        title: 'Movie Set Museum & Cooking Class',
        description: 'Hollywood came to Morocco for a reason. Then learn to make tagine the right way.',
      },
      {
        day: 8,
        title: 'Imlil Valley & Atlas Mountains',
        description:
          'The green valley that nobody expects after the desert. A guesthouse with a pool and a view.',
      },
      {
        day: 9,
        title: 'Goodbye Marrakech',
        description: 'One last mint tea. Morocco does not let go easily.',
      },
    ],
    included: [
      'Twin share hotel rooms',
      '1 night desert glamping',
      '7 breakfasts and 6 dinners',
      'All guided activities',
      'Private minivans',
      'Tru Leader guide',
    ],
    notIncluded: [
      'International flights',
      'Travel insurance',
      'Lunches',
      'Personal spending',
    ],
    whoItsFor: [
      {
        type: 'Culture Seeker',
        description:
          'Nine days is not enough to understand Morocco. But it is enough to fall completely in love with it.',
      },
      {
        type: 'Adventure Seeker',
        description:
          'Sandboarding, camel trekking, gorge walks. Morocco has more adventure than it looks.',
      },
      {
        type: 'Solo Traveler',
        description:
          'Warm, colourful, endlessly fascinating. Morocco is the perfect place to find your people.',
      },
    ],
  },
]
