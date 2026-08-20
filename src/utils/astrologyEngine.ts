import {
  UserProfile,
  PlanetaryPosition,
  KundliHouse,
  ZodiacSign,
  CoffeeRoastRitual,
  CoffeeGroundSymbol,
  SynastryScore,
  PlanetaryTransitEvent
} from '../types/astrology';

export const ZODIAC_SIGNS: { name: ZodiacSign; element: 'Fire' | 'Earth' | 'Air' | 'Water'; quality: 'Cardinal' | 'Fixed' | 'Mutable'; ruler: string; symbol: string; color: string }[] = [
  { name: 'Aries', element: 'Fire', quality: 'Cardinal', ruler: 'Mars', symbol: '♈', color: '#EF4444' },
  { name: 'Taurus', element: 'Earth', quality: 'Fixed', ruler: 'Venus', symbol: '♉', color: '#10B981' },
  { name: 'Gemini', element: 'Air', quality: 'Mutable', ruler: 'Mercury', symbol: '♊', color: '#F59E0B' },
  { name: 'Cancer', element: 'Water', quality: 'Cardinal', ruler: 'Moon', symbol: '♋', color: '#38BDF8' },
  { name: 'Leo', element: 'Fire', quality: 'Fixed', ruler: 'Sun', symbol: '♌', color: '#F97316' },
  { name: 'Virgo', element: 'Earth', quality: 'Mutable', ruler: 'Mercury', symbol: '♍', color: '#84CC16' },
  { name: 'Libra', element: 'Air', quality: 'Cardinal', ruler: 'Venus', symbol: '♎', color: '#EC4899' },
  { name: 'Scorpio', element: 'Water', quality: 'Fixed', ruler: 'Mars / Pluto', symbol: '♏', color: '#8B5CF6' },
  { name: 'Sagittarius', element: 'Fire', quality: 'Mutable', ruler: 'Jupiter', symbol: '♐', color: '#EAB308' },
  { name: 'Capricorn', element: 'Earth', quality: 'Cardinal', ruler: 'Saturn', symbol: '♑', color: '#64748B' },
  { name: 'Aquarius', element: 'Air', quality: 'Fixed', ruler: 'Saturn / Uranus', symbol: '♒', color: '#06B6D4' },
  { name: 'Pisces', element: 'Water', quality: 'Mutable', ruler: 'Jupiter / Neptune', symbol: '♓', color: '#6366F1' },
];

export const NAKSHATRAS = [
  'Ashwini', 'Bharani', 'Krittika', 'Rohini', 'Mrigashira', 'Ardra', 'Punarvasu',
  'Pushya', 'Ashlesha', 'Magha', 'Purva Phalguni', 'Uttara Phalguni', 'Hasta',
  'Chitra', 'Swati', 'Vishakha', 'Anuradha', 'Jyeshtha', 'Mula', 'Purva Ashadha',
  'Uttara Ashadha', 'Shravana', 'Dhanishta', 'Shatabhisha', 'Purva Bhadrapada',
  'Uttara Bhadrapada', 'Revati'
];

export const COFFEE_ROAST_PROFILES: Record<ZodiacSign, CoffeeRoastRitual> = {
  Aries: {
    id: 'roast-aries',
    name: 'Red Dragon Espresso Doppio',
    archetype: 'The Catalyst Brew',
    astrologicalSign: 'Aries',
    flavorNotes: ['Dark Cocoa', 'Spiced Cinnamon', 'Smoked Cherry'],
    brewMethod: 'Manual Lever Espresso 9-Bar',
    caffeineIntensity: 'Supercharged',
    auspiciousHour: '06:30 AM - 07:45 AM (Mars Hora)',
    planetaryGovernor: 'Mars',
    chakraAlignment: 'Solar Plexus (Manipura)',
    ritualStep: 'Inhale the dark crema aroma, set 1 singular decisive action for the morning, and drink in 3 sharp sips.',
    quote: 'Fire initiates what patience later harvests.'
  },
  Taurus: {
    id: 'roast-taurus',
    name: 'Velvet Vanilla Mocha Crema',
    archetype: 'The Earthly Luxury Brew',
    astrologicalSign: 'Taurus',
    flavorNotes: ['Madagascar Vanilla', 'Roasted Hazelnut', 'Organic Oat Cream'],
    brewMethod: 'Slow Moka Pot with Froth',
    caffeineIntensity: 'Balanced',
    auspiciousHour: '08:00 AM - 09:15 AM (Venus Hora)',
    planetaryGovernor: 'Venus',
    chakraAlignment: 'Heart & Throat (Anahata)',
    ritualStep: 'Take time to swirl the microfoam, appreciating the tactile warmth of the ceramic mug in both hands.',
    quote: 'True abundance begins in the sensory present.'
  },
  Gemini: {
    id: 'roast-gemini',
    name: 'Citrus Bloom Pour-Over',
    archetype: 'The Alchemical Spark',
    astrologicalSign: 'Gemini',
    flavorNotes: ['Bergamot', 'Jasmine Flower', 'Honey Crisp Apple'],
    brewMethod: 'V60 Chemex Slow Drip',
    caffeineIntensity: 'Potent',
    auspiciousHour: '09:30 AM - 10:45 AM (Mercury Hora)',
    planetaryGovernor: 'Mercury',
    chakraAlignment: 'Third Eye (Ajna)',
    ritualStep: 'Write down 3 divergent ideas on paper before the first drop touches your lips.',
    quote: 'Curiosity is the wind that turns the celestial gears.'
  },
  Cancer: {
    id: 'roast-cancer',
    name: 'Moonlight Cardamom Latte',
    archetype: 'The Nourishing Nectar',
    astrologicalSign: 'Cancer',
    flavorNotes: ['Green Cardamom', 'Sweet Condensed Milk', 'Nutmeg Essence'],
    brewMethod: 'Gentle French Press Infusion',
    caffeineIntensity: 'Gentle',
    auspiciousHour: '07:15 AM - 08:30 AM (Moon Hora)',
    planetaryGovernor: 'Moon',
    chakraAlignment: 'Sacral (Svadhisthana)',
    ritualStep: 'Whisper an intention of protection and emotional peace as the steam rises like morning mist.',
    quote: 'Home is wherever the soul is gently nurtured.'
  },
  Leo: {
    id: 'roast-leo',
    name: 'Golden Sun Honey Gesha',
    archetype: 'The Sovereign Elixir',
    astrologicalSign: 'Leo',
    flavorNotes: ['Golden Honeycomb', 'Blood Orange', 'Caramelized Fig'],
    brewMethod: 'Siphon Vacuum Glass Flask',
    caffeineIntensity: 'Supercharged',
    auspiciousHour: '12:00 PM - 01:15 PM (Sun Hora)',
    planetaryGovernor: 'Sun',
    chakraAlignment: 'Crown & Solar (Sahasrara)',
    ritualStep: 'Stand tall facing natural sunlight, hold your golden brew aloft, and claim your creative authority.',
    quote: 'You do not ask the sun for permission to shine.'
  },
  Virgo: {
    id: 'roast-virgo',
    name: 'Precision Single-Origin Ethiopian',
    archetype: 'The Clarity Extraction',
    astrologicalSign: 'Virgo',
    flavorNotes: ['Dried Apricot', 'Lemongrass', 'Clean Cacao Nibs'],
    brewMethod: 'Aeropress 200°F Inverted Method',
    caffeineIntensity: 'Potent',
    auspiciousHour: '08:45 AM - 10:00 AM (Mercury Hora)',
    planetaryGovernor: 'Mercury',
    chakraAlignment: 'Throat & Root (Vishuddha)',
    ritualStep: 'Measure water and grounds with exact ratio (1:16), finding zen in the mindful calibration.',
    quote: 'Perfection is not absence of flaw, but presence of devotional care.'
  },
  Libra: {
    id: 'roast-libra',
    name: 'Harmony Rose Affogato',
    archetype: 'The Balanced Confection',
    astrologicalSign: 'Libra',
    flavorNotes: ['Rose Water', 'Dark Belgian Chocolate', 'Sweet Pistachio'],
    brewMethod: 'Espresso poured over Gelato Cream',
    caffeineIntensity: 'Balanced',
    auspiciousHour: '10:15 AM - 11:30 AM (Venus Hora)',
    planetaryGovernor: 'Venus',
    chakraAlignment: 'Heart (Anahata)',
    ritualStep: 'Share a cup or send a thoughtful message of appreciation to a partner or collaborator.',
    quote: 'When beauty and balance align, tension dissolves into grace.'
  },
  Scorpio: {
    id: 'roast-scorpio',
    name: 'Midnight Obsidian Turkish Decoction',
    archetype: 'The Deep Transformer',
    astrologicalSign: 'Scorpio',
    flavorNotes: ['Black Truffle', 'Clove', '100% Raw Criollo Cacao'],
    brewMethod: 'Cezve / Ibrik Sand-Brew with Finely Ground Beans',
    caffeineIntensity: 'Supercharged',
    auspiciousHour: '09:00 PM - 10:15 PM (Pluto/Mars Hora)',
    planetaryGovernor: 'Mars / Pluto',
    chakraAlignment: 'Root (Muladhara)',
    ritualStep: 'Allow the dark grounds to settle silently at the bottom; contemplate what you are ready to release.',
    quote: 'In the deepest darkness, the brightest embers are forged.'
  },
  Sagittarius: {
    id: 'roast-sagittarius',
    name: 'Nomad Spiced Cold Brew',
    archetype: 'The Explorer’s Tonic',
    astrologicalSign: 'Sagittarius',
    flavorNotes: ['Star Anise', 'Bourbon Oak', 'Wild Mountain Blackberry'],
    brewMethod: '24-Hour Steeping with Mineral Spring Water',
    caffeineIntensity: 'Potent',
    auspiciousHour: '01:30 PM - 02:45 PM (Jupiter Hora)',
    planetaryGovernor: 'Jupiter',
    chakraAlignment: 'Third Eye & Sacral',
    ritualStep: 'Study a philosophical thought or plan a journey while sipping the wide-horizon brew.',
    quote: 'The horizon is not a boundary, but an invitation.'
  },
  Capricorn: {
    id: 'roast-capricorn',
    name: 'Mountain Peak Dark Roast Espresso',
    archetype: 'The Architect’s Foundation',
    astrologicalSign: 'Capricorn',
    flavorNotes: ['Charred Cedar', 'Black Walnut', 'Molasses Toffee'],
    brewMethod: 'Heavy Cast Iron Drip / Ristretto',
    caffeineIntensity: 'Supercharged',
    auspiciousHour: '06:00 AM - 07:15 AM (Saturn Hora)',
    planetaryGovernor: 'Saturn',
    chakraAlignment: 'Root (Muladhara)',
    ritualStep: 'Review your long-term 5-year milestones; sip with steady, unhurried resolve.',
    quote: 'Empires are built stone by stone, sip by sip.'
  },
  Aquarius: {
    id: 'roast-aquarius',
    name: 'Quantum Nitro Lavender Cold Brew',
    archetype: 'The Visionary Spark',
    astrologicalSign: 'Aquarius',
    flavorNotes: ['Electric Lavender', 'Eucalyptus Honey', 'Crushed Blueberry'],
    brewMethod: 'Nitrogen-Infused Cold Press',
    caffeineIntensity: 'Potent',
    auspiciousHour: '11:00 AM - 12:15 PM (Uranus Hora)',
    planetaryGovernor: 'Saturn / Uranus',
    chakraAlignment: 'Crown (Sahasrara)',
    ritualStep: 'Think outside current conventional models; envision a solution that benefits the collective whole.',
    quote: 'The future belongs to those who see beyond the current paradigm.'
  },
  Pisces: {
    id: 'roast-pisces',
    name: 'Cosmic Dream Chamomile Latte',
    archetype: 'The Mystic Reverie',
    astrologicalSign: 'Pisces',
    flavorNotes: ['Blue Lotus', 'Chamomile Cream', 'Cacao Butter'],
    brewMethod: 'Decaf Botanical Espresso Infusion',
    caffeineIntensity: 'Gentle',
    auspiciousHour: '05:30 PM - 06:45 PM (Neptune Hora)',
    planetaryGovernor: 'Jupiter / Neptune',
    chakraAlignment: 'Crown & Third Eye',
    ritualStep: 'Close eyes, listen to the ambient resonance of water, and trust intuitive dream messages.',
    quote: 'We are all drops of starlight dissolved in the cosmic ocean.'
  }
};

export const TASSEOGRAPHY_SYMBOLS_LIBRARY: Omit<CoffeeGroundSymbol, 'coordinates'>[] = [
  {
    id: 'sym-crescent-moon',
    name: 'Crescent Moon',
    location: 'Rim (Immediate/Now)',
    confidence: 96,
    description: 'A delicate waxing crescent symbol near the upper rim signifies sudden intuitive revelation, emotional renewal, and fertile beginnings.',
    astrologyAspect: 'Moon in 1st House Trine Ascendant',
    iconType: 'Moon'
  },
  {
    id: 'sym-starlight-cluster',
    name: 'Star Cluster',
    location: 'Rim (Immediate/Now)',
    confidence: 92,
    description: 'Multiple luminous crystalline speckles indicate cosmic blessings, creative breakthrough, and synchronicity in upcoming collaborations.',
    astrologyAspect: 'Jupiter conjunct Midheaven (10th)',
    iconType: 'Sparkles'
  },
  {
    id: 'sym-mountain-peak',
    name: 'Mountain Peak',
    location: 'Body (Next 3-6 Mo)',
    confidence: 89,
    description: 'A steep triangular rise along the side of the cup shows a challenging climb yielding great authority, leadership honors, and solid mastery.',
    astrologyAspect: 'Saturn in 10th House (Karma Bhava)',
    iconType: 'Mountain'
  },
  {
    id: 'sym-golden-key',
    name: 'Golden Key',
    location: 'Body (Next 3-6 Mo)',
    confidence: 94,
    description: 'An elongated slender shape with teeth opening a new door represents unlocking secret knowledge, contractual breakthrough, or property gain.',
    astrologyAspect: 'Mercury-Venus Conjunction in 4th/9th',
    iconType: 'Key'
  },
  {
    id: 'sym-winged-bird',
    name: 'Falcon / Winged Messenger',
    location: 'Rim (Immediate/Now)',
    confidence: 91,
    description: 'Wings spreading upward herald urgent favorable news from afar, overseas travel, or a rapid elevation in public status.',
    astrologyAspect: 'Sun in 9th House of Dharma & Expansion',
    iconType: 'Feather'
  },
  {
    id: 'sym-anchor-base',
    name: 'Solid Anchor',
    location: 'Base (Distant/Karmic)',
    confidence: 88,
    description: 'A rooted bottom anchor ensures emotional stability, resolution of ancestral karmas, and long-term financial security.',
    astrologyAspect: 'Rahu-Ketu Karmic Balance Axis',
    iconType: 'Anchor'
  },
  {
    id: 'sym-swirling-spiral',
    name: 'Nebula Spiral',
    location: 'Base (Distant/Karmic)',
    confidence: 85,
    description: 'A swirling vortex pattern in the bottom grounds signals spiritual metamorphosis, shedding of outlived identities, and kundalini awakening.',
    astrologyAspect: '8th House Transformation & Occult Wisdom',
    iconType: 'Compass'
  },
  {
    id: 'sym-heart-chalice',
    name: 'Chalice of Hearts',
    location: 'Handle (Home/Heart)',
    confidence: 95,
    description: 'Forming right near the mug handle, this heart cup signifies deep soulmate resonance, emotional healing in the home, and marital harmony.',
    astrologyAspect: 'Venus in 7th House (Kalatra Bhava)',
    iconType: 'Heart'
  }
];

export const UPCOMING_TRANSITS_2026_2027: PlanetaryTransitEvent[] = [
  {
    id: 'transit-jupiter-leo',
    planet: 'Jupiter (Guru)',
    signFrom: 'Cancer',
    signTo: 'Leo',
    date: 'Oct 2026 - Nov 2027',
    duration: '13 Months',
    category: 'career',
    sentiment: 'favorable',
    title: 'Jupiter Enters Sovereign Leo (Golden Expansion)',
    description: 'Jupiter transits into royal Leo, igniting creative leadership, high-visibility ventures, theatrical breakthroughs, and mentorship opportunities.',
    coffeeRemedy: 'Sip Golden Sun Honey Gesha during Thursday dawn to magnetize Jupiterian abundance.'
  },
  {
    id: 'transit-saturn-aries',
    planet: 'Saturn (Shani)',
    signFrom: 'Pisces',
    signTo: 'Aries',
    date: 'Jun 2027 - Aug 2029',
    duration: '2.5 Years',
    category: 'wealth',
    sentiment: 'intense',
    title: 'Saturn Ingression in Aries (Karmic Re-Structuring)',
    description: 'Saturn asks for disciplined, fearless initiative. Hasty impulses are tempered into enduring legacy through patient craftsmanship.',
    coffeeRemedy: 'Dark roast pour-over on Saturdays with roasted cardamom grounds for grounded focus.'
  },
  {
    id: 'transit-rahu-aquarius',
    planet: 'Rahu (North Node)',
    signFrom: 'Pisces',
    signTo: 'Aquarius',
    date: 'May 2026 - Nov 2027',
    duration: '18 Months',
    category: 'career',
    sentiment: 'transformative',
    title: 'Rahu Shifts to Aquarius (Technological & Collective Leaps)',
    description: 'A potent surge in AI innovations, decentralized networks, unconventional discoveries, and visionary group networks.',
    coffeeRemedy: 'Quantum Nitro Cold Brew infused with rosemary for neural clarity.'
  },
  {
    id: 'transit-venus-libra',
    planet: 'Venus (Shukra)',
    signFrom: 'Virgo',
    signTo: 'Libra',
    date: 'Sep 2026 - Oct 2026',
    duration: '28 Days',
    category: 'love',
    sentiment: 'favorable',
    title: 'Venus in Swakshetra (Own House of Libra - Malavya Yoga)',
    description: 'Unprecedented harmony in romantic bonds, artistic creations, luxury acquisitions, and mutual reconciliation.',
    coffeeRemedy: 'Rose water mocha affogato enjoyed in good company during Friday sunset.'
  }
];

export const DEFAULT_USER_PROFILE: UserProfile = {
  id: 'user-cosmic-seeker-1',
  name: 'Aria Sterling',
  birthDate: '1996-04-14',
  birthTime: '08:42',
  birthCity: 'San Francisco, USA',
  latitude: 37.7749,
  longitude: -122.4194,
  timezone: 'America/Los_Angeles (UTC-7)',
  sunSign: 'Aries',
  moonSign: 'Scorpio',
  ascendant: 'Taurus',
  nakshatra: 'Anuradha',
  currentDasha: 'Jupiter - Venus (Mahadasha - Antardasha)',
  favoriteBrew: 'Red Dragon Espresso Doppio'
};

export const DEFAULT_PLANETARY_POSITIONS: PlanetaryPosition[] = [
  { planet: 'Sun', symbol: '☉', sign: 'Aries', degree: 24.5, minute: 32, house: 12, isRetrograde: false, dignity: 'Exalted', shadbalaScore: 1.48, nakshatra: 'Bharani', pada: 4, karaka: 'Atmakaraka (Soul Purpose)' },
  { planet: 'Moon', symbol: '☽', sign: 'Scorpio', degree: 11.2, minute: 14, house: 7, isRetrograde: false, dignity: 'Debilitated', shadbalaScore: 1.15, nakshatra: 'Anuradha', pada: 3, karaka: 'Amatyakaraka (Mind & Emotion)' },
  { planet: 'Mars', symbol: '♂', sign: 'Aries', degree: 29.1, minute: 8, house: 12, isRetrograde: false, dignity: 'Moolatrikona', shadbalaScore: 1.55, nakshatra: 'Krittika', pada: 1, karaka: 'Bhratrukaraka (Drive & Vitality)' },
  { planet: 'Mercury', symbol: '☿', sign: 'Taurus', degree: 14.8, minute: 45, house: 1, isRetrograde: true, dignity: 'Friendly', shadbalaScore: 1.28, nakshatra: 'Rohini', pada: 2, karaka: 'Matrukaraka (Intellect & Speech)' },
  { planet: 'Jupiter', symbol: '♃', sign: 'Sagittarius', degree: 18.3, minute: 22, house: 8, isRetrograde: false, dignity: 'Own Sign', shadbalaScore: 1.62, nakshatra: 'Purva Ashadha', pada: 2, karaka: 'Putrakaraka (Wisdom & Fortune)' },
  { planet: 'Venus', symbol: '♀', sign: 'Taurus', degree: 6.4, minute: 10, house: 1, isRetrograde: false, dignity: 'Own Sign', shadbalaScore: 1.70, nakshatra: 'Krittika', pada: 3, karaka: 'Gnatikaraka (Grace & Aesthetics)' },
  { planet: 'Saturn', symbol: '♄', sign: 'Pisces', degree: 3.7, minute: 54, house: 11, isRetrograde: false, dignity: 'Friendly', shadbalaScore: 1.34, nakshatra: 'Uttara Bhadrapada', pada: 1, karaka: 'Darakaraka (Discipline & Career)' },
  { planet: 'Rahu', symbol: '☊', sign: 'Aquarius', degree: 12.0, minute: 15, house: 10, isRetrograde: true, dignity: 'Friendly', shadbalaScore: 1.20, nakshatra: 'Shatabhisha', pada: 2, karaka: 'Worldly Ambition & Innovation' },
  { planet: 'Ketu', symbol: '☋', sign: 'Leo', degree: 12.0, minute: 15, house: 4, isRetrograde: true, dignity: 'Friendly', shadbalaScore: 1.18, nakshatra: 'Magha', pada: 4, karaka: 'Spiritual Liberation & Detachment' },
  { planet: 'Ascendant', symbol: 'Asc', sign: 'Taurus', degree: 22.0, minute: 18, house: 1, isRetrograde: false, dignity: 'Own Sign', shadbalaScore: 1.40, nakshatra: 'Rohini', pada: 4, karaka: 'Physical Body & Core Persona' },
];

export const DEFAULT_KUNDLI_HOUSES: KundliHouse[] = [
  { houseNumber: 1, name: 'Lagna (First House)', sanskritName: 'Tanu Bhava', sign: 'Taurus', planets: ['Ascendant', 'Mercury (R)', 'Venus'], lord: 'Venus', significance: 'Self, Vitality, Charisma, Personality', status: 'Raja Yoga' },
  { houseNumber: 2, name: 'Second House', sanskritName: 'Dhana Bhava', sign: 'Gemini', planets: [], lord: 'Mercury', significance: 'Wealth, Speech, Family lineage, Food habits', status: 'Benefic' },
  { houseNumber: 3, name: 'Third House', sanskritName: 'Sahaja Bhava', sign: 'Cancer', planets: [], lord: 'Moon', significance: 'Courage, Siblings, Communication, Writing', status: 'Neutral' },
  { houseNumber: 4, name: 'Fourth House', sanskritName: 'Sukha Bhava', sign: 'Leo', planets: ['Ketu'], lord: 'Sun', significance: 'Mother, Home, Emotional Peace, Real Estate', status: 'Neutral' },
  { houseNumber: 5, name: 'Fifth House', sanskritName: 'Putra Bhava', sign: 'Virgo', planets: [], lord: 'Mercury', significance: 'Intelligence, Creativity, Romance, Past Karma (Purva Punya)', status: 'Benefic' },
  { houseNumber: 6, name: 'Sixth House', sanskritName: 'Ari Bhava', sign: 'Libra', planets: [], lord: 'Venus', significance: 'Daily Work, Health, Overcoming Obstacles, Service', status: 'Benefic' },
  { houseNumber: 7, name: 'Seventh House', sanskritName: 'Yuvati Bhava', sign: 'Scorpio', planets: ['Moon'], lord: 'Mars', significance: 'Partnerships, Marriage, Public Relations', status: 'Benefic' },
  { houseNumber: 8, name: 'Eighth House', sanskritName: 'Randhra Bhava', sign: 'Sagittarius', planets: ['Jupiter'], lord: 'Jupiter', significance: 'Longevity, Occult, Sudden Gains, Deep Transformation', status: 'Raja Yoga' },
  { houseNumber: 9, name: 'Ninth House', sanskritName: 'Dharma Bhava', sign: 'Capricorn', planets: [], lord: 'Saturn', significance: 'Higher Wisdom, Philosophy, Long Journeys, Luck', status: 'Benefic' },
  { houseNumber: 10, name: 'Tenth House', sanskritName: 'Karma Bhava', sign: 'Aquarius', planets: ['Rahu'], lord: 'Saturn', significance: 'Career, Public Status, Leadership, Life Mission', status: 'Raja Yoga' },
  { houseNumber: 11, name: 'Eleventh House', sanskritName: 'Labha Bhava', sign: 'Pisces', planets: ['Saturn'], lord: 'Jupiter', significance: 'Gains, Ambition Fulfillment, Large Networks, Friends', status: 'Benefic' },
  { houseNumber: 12, name: 'Twelfth House', sanskritName: 'Vyaya Bhava', sign: 'Aries', planets: ['Sun', 'Mars'], lord: 'Mars', significance: 'Spiritual Solitude, Overseas, Subconscious, Rest', status: 'Raja Yoga' },
];

export function calculateSynastry(nameA: string, signA: ZodiacSign, nameB: string, signB: ZodiacSign): SynastryScore {
  const indexA = ZODIAC_SIGNS.findIndex(z => z.name === signA);
  const indexB = ZODIAC_SIGNS.findIndex(z => z.name === signB);
  const diff = Math.abs(indexA - indexB);
  const elementA = ZODIAC_SIGNS[indexA]?.element || 'Fire';
  const elementB = ZODIAC_SIGNS[indexB]?.element || 'Earth';

  let harmonyBonus = 0;
  if (elementA === elementB) harmonyBonus = 6;
  else if ((elementA === 'Fire' && elementB === 'Air') || (elementA === 'Air' && elementB === 'Fire')) harmonyBonus = 5;
  else if ((elementA === 'Earth' && elementB === 'Water') || (elementA === 'Water' && elementB === 'Earth')) harmonyBonus = 5;

  const basePoints = 22 + (diff % 7) * 2 + harmonyBonus;
  const total = Math.min(36, Math.max(18, basePoints));
  const percentage = Math.round((total / 36) * 100);

  const blends = [
    { title: 'Velvet Hazelnut Macchiato', profile: 'Silky, Sweet, Deeply Harmonious with warm spiced undertones' },
    { title: 'Spiced Ethiopian Gesha & Dark Truffle', profile: 'Electric, Dynamic, Inspiring and full of visionary banter' },
    { title: 'Cardamom Saffron Espresso Brew', profile: 'Grounding, Mystical, Deeply supportive and comforting' },
    { title: 'Solar Cinnamon Pour-Over', profile: 'Radiant, Passionate, High-octane creative energy' }
  ];

  const selectedBlend = blends[(indexA + indexB) % blends.length];

  return {
    totalScore: total,
    maxScore: 36,
    percentage,
    coffeeBlendName: selectedBlend.title,
    flavorProfile: selectedBlend.profile,
    summary: `${nameA} (${signA}) and ${nameB} (${signB}) form a ${percentage >= 80 ? 'profound cosmic union' : 'growth-oriented dynamic connection'}. The energetic alchemy produces a delicious balance between ${elementA} initiative and ${elementB} receptivity.`,
    categories: [
      { name: 'Varna (Spiritual Ego & Wavelength)', score: Math.round(1 * (percentage / 100)), max: 1, insight: 'Natural mutual respect of intellectual values and creative boundaries.' },
      { name: 'Vashya (Magnetic Attraction & Dominance)', score: Math.round(2 * (percentage / 100)), max: 2, insight: 'Effortless energetic polarity that maintains romantic excitement.' },
      { name: 'Tara (Destiny & Long-term Auspiciousness)', score: Math.round(3 * (percentage / 100)), max: 3, insight: 'Planetary alignments foster steady prosperity and joint good fortune.' },
      { name: 'Yoni (Physical & Intimate Chemistry)', score: Math.round(4 * (percentage / 100)), max: 4, insight: 'Sensory harmony and intuitive understanding of intimate needs.' },
      { name: 'Graha Maitri (Psychological & Mental Friendship)', score: Math.round(5 * (percentage / 100)), max: 5, insight: 'Planetary rulers communicate in natural synchrony over daily rituals.' },
      { name: 'Gana (Temperament & Lifestyle Compatibility)', score: Math.round(6 * (percentage / 100)), max: 6, insight: 'Daily lifestyle habits, morning coffee pacing, and work-life balance mesh well.' },
      { name: 'Bhakoot (Emotional Fulfillment & Family Growth)', score: Math.round(7 * (percentage / 100)), max: 7, insight: 'Deep mutual empathy during stress; shared dreams for sanctuary home.' },
      { name: 'Nadi (Karmic & Genetic Vitality Harmony)', score: Math.round(8 * (percentage / 100)), max: 8, insight: 'Optimal biological constitution and spiritual vibration longevity.' },
    ],
    aspects: [
      { planetA: 'Sun (A)', planetB: 'Jupiter (B)', aspectType: 'Trine', orb: 1.8, nature: 'Harmonious', meaning: 'Inspires generous optimism and mutual life expansion.' },
      { planetA: 'Venus (A)', planetB: 'Mars (B)', aspectType: 'Sextile', orb: 2.3, nature: 'Harmonious', meaning: 'Sparks playful romantic attraction and sensual warmth.' },
      { planetA: 'Moon (A)', planetB: 'Mercury (B)', aspectType: 'Conjunction', orb: 3.1, nature: 'Harmonious', meaning: 'Deep intuitive telepathy and seamless conversational flow.' }
    ]
  };
}

export function generateAstrologyReport(profile: UserProfile, planets: PlanetaryPosition[], houses: KundliHouse[]): string {
  return `# ☕ COFFEE WITH ASTRO — COSMIC BIRTH CHART DOSSIER
**Seeker:** ${profile.name}
**Date & Time:** ${profile.birthDate} at ${profile.birthTime}
**Location:** ${profile.birthCity} (${profile.latitude}°, ${profile.longitude}°)
**Ascendant (Lagna):** ${profile.ascendant} | **Sun:** ${profile.sunSign} | **Moon:** ${profile.moonSign}
**Nakshatra:** ${profile.nakshatra} | **Current Dasha:** ${profile.currentDasha}

---

## 🌟 1. SIGNATURE ASTRO-COFFEE ROAST ARCHETYPE
**Designation:** ${COFFEE_ROAST_PROFILES[profile.sunSign as ZodiacSign]?.name || 'Cosmic Blend'}
**Tasting Notes:** ${(COFFEE_ROAST_PROFILES[profile.sunSign as ZodiacSign]?.flavorNotes || ['Dark Cocoa', 'Honey']).join(', ')}
**Brewing Ritual:** ${COFFEE_ROAST_PROFILES[profile.sunSign as ZodiacSign]?.brewMethod}
**Auspicious Coffee Hour:** ${COFFEE_ROAST_PROFILES[profile.sunSign as ZodiacSign]?.auspiciousHour}
**Ritual Affirmation:** "${COFFEE_ROAST_PROFILES[profile.sunSign as ZodiacSign]?.quote}"

---

## 🪐 2. PLANETARY EPHEMERIS & SHADBALA STRENGTH
${planets.map(p => `- ${p.planet} (${p.symbol}) in ${p.sign} ${p.degree}° | House: ${p.house} | Dignity: ${p.dignity} | Shadbala: ${p.shadbalaScore} Rupas | ${p.karaka}`).join('\n')}

---

## 🏛️ 3. TWELVE HOUSES (KUNDLI BHAVAS)
${houses.map(h => `House ${h.houseNumber} (${h.sanskritName} - ${h.name}): Sign ${h.sign} | Lord: ${h.lord} | Planets: ${h.planets.join(', ') || 'Empty (Aspects applied)'} | Significance: ${h.significance} | Status: ${h.status}`).join('\n')}

---
*Generated by the Coffee with Astro Astrology Prediction Engine.*
`;
}
