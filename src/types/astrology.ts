export type WireframeFidelity = 'lo-fi' | 'mid-fi' | 'hi-fi';
export type ViewportMode = 'web' | 'mobile' | 'split';
export type ActiveScreenTab = 
  | 'daily-brew' 
  | 'kundli-chart' 
  | 'coffee-scanner' 
  | 'predictions' 
  | 'synastry' 
  | 'barista-chat' 
  | 'design-specs';

export type ThemeMode = 'cosmic-dark' | 'roasted-mocha' | 'paper-blueprint' | 'starlight-light';

export interface UserProfile {
  id: string;
  name: string;
  birthDate: string;
  birthTime: string;
  birthCity: string;
  latitude: number;
  longitude: number;
  timezone: string;
  sunSign: string;
  moonSign: string;
  ascendant: string;
  nakshatra: string;
  currentDasha: string;
  favoriteBrew: string;
}

export type ZodiacSign = 
  | 'Aries' | 'Taurus' | 'Gemini' | 'Cancer' 
  | 'Leo' | 'Virgo' | 'Libra' | 'Scorpio' 
  | 'Sagittarius' | 'Capricorn' | 'Aquarius' | 'Pisces';

export interface PlanetaryPosition {
  planet: string;
  symbol: string;
  sign: ZodiacSign;
  degree: number;
  minute: number;
  house: number;
  isRetrograde: boolean;
  dignity: 'Exalted' | 'Moolatrikona' | 'Own Sign' | 'Friendly' | 'Neutral' | 'Enemy' | 'Debilitated';
  shadbalaScore: number; // e.g. 1.35 Rupas
  nakshatra: string;
  pada: number;
  karaka: string;
}

export interface KundliHouse {
  houseNumber: number;
  name: string;
  sanskritName: string;
  sign: ZodiacSign;
  planets: string[];
  lord: string;
  significance: string;
  status: 'Benefic' | 'Malefic' | 'Neutral' | 'Raja Yoga';
}

export interface CoffeeRoastRitual {
  id: string;
  name: string;
  archetype: string;
  astrologicalSign: string;
  flavorNotes: string[];
  brewMethod: string;
  caffeineIntensity: 'Gentle' | 'Balanced' | 'Potent' | 'Supercharged';
  auspiciousHour: string;
  planetaryGovernor: string;
  chakraAlignment: string;
  ritualStep: string;
  quote: string;
}

export interface CoffeeGroundSymbol {
  id: string;
  name: string;
  location: 'Rim (Immediate/Now)' | 'Body (Next 3-6 Mo)' | 'Base (Distant/Karmic)' | 'Handle (Home/Heart)';
  confidence: number;
  description: string;
  astrologyAspect: string;
  iconType: string;
  coordinates: { x: number; y: number; r: number };
}

export interface CoffeeReadingResult {
  id: string;
  timestamp: string;
  imagePresetUrl?: string;
  symbols: CoffeeGroundSymbol[];
  dominantSymbol: string;
  fortuneScore: number;
  readingNarrative: string;
  elementalBalance: {
    fire: number;
    earth: number;
    air: number;
    water: number;
  };
  guidance: string;
  affirmation: string;
}

export interface PlanetaryTransitEvent {
  id: string;
  planet: string;
  signFrom: ZodiacSign;
  signTo: ZodiacSign;
  date: string;
  duration: string;
  category: 'career' | 'love' | 'health' | 'wealth' | 'spiritual';
  sentiment: 'favorable' | 'intense' | 'transformative';
  title: string;
  description: string;
  coffeeRemedy: string;
}

export interface SynastryAspect {
  planetA: string;
  planetB: string;
  aspectType: 'Conjunction' | 'Trine' | 'Sextile' | 'Opposition' | 'Square';
  orb: number;
  nature: 'Harmonious' | 'Dynamic' | 'Challenging' | 'Karmic';
  meaning: string;
}

export interface SynastryScore {
  totalScore: number;
  maxScore: number;
  percentage: number;
  coffeeBlendName: string;
  flavorProfile: string;
  summary: string;
  categories: {
    name: string;
    score: number;
    max: number;
    insight: string;
  }[];
  aspects: SynastryAspect[];
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  tags?: string[];
  suggestedFollowUps?: string[];
}

export interface ComponentSpecAnnotation {
  id: string;
  name: string;
  uxIntent: string;
  figmaLayer: string;
  apiBinding: string;
  propsSchema: string[];
  stateMachine: string;
  responsiveBehavior: string;
}
