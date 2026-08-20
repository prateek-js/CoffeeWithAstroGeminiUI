import { UserProfile, ComponentSpecAnnotation } from '../types/astrology';

export const PRESET_PROFILES: UserProfile[] = [
  {
    id: 'user-1',
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
  },
  {
    id: 'user-2',
    name: 'Devon Thorne',
    birthDate: '1992-11-08',
    birthTime: '18:15',
    birthCity: 'London, UK',
    latitude: 51.5074,
    longitude: -0.1278,
    timezone: 'Europe/London (UTC+0)',
    sunSign: 'Scorpio',
    moonSign: 'Taurus',
    ascendant: 'Gemini',
    nakshatra: 'Rohini',
    currentDasha: 'Saturn - Mercury',
    favoriteBrew: 'Midnight Obsidian Turkish Decoction'
  },
  {
    id: 'user-3',
    name: 'Maya Chen',
    birthDate: '1998-07-22',
    birthTime: '06:05',
    birthCity: 'Tokyo, Japan',
    latitude: 35.6762,
    longitude: 139.6503,
    timezone: 'Asia/Tokyo (UTC+9)',
    sunSign: 'Cancer',
    moonSign: 'Pisces',
    ascendant: 'Cancer',
    nakshatra: 'Revati',
    currentDasha: 'Mercury - Ketu',
    favoriteBrew: 'Moonlight Cardamom Latte'
  }
];

export const SAMPLE_COFFEE_CUPS = [
  {
    id: 'cup-turkish-crema',
    title: 'Turkish Sand-Brew Grounds',
    subtitle: 'Classic thick sediment with clear spiral vortex',
    dominantArchetype: 'The Transformation Chalice',
    symbols: ['Crescent Moon', 'Mountain Peak', 'Star Cluster'],
    confidence: 94,
    energy: 'Water & Fire Axis',
    cupImageStyle: 'turkish'
  },
  {
    id: 'cup-espresso-crema',
    title: 'Doppio Crema Marbling',
    subtitle: 'High-pressure golden crema with starlight speckles',
    dominantArchetype: 'The Sovereign Crown',
    symbols: ['Golden Key', 'Falcon / Winged Messenger'],
    confidence: 91,
    energy: 'Solar Fire Dominance',
    cupImageStyle: 'espresso'
  },
  {
    id: 'cup-latte-art-zodiac',
    title: 'Cardamom Microfoam Mandala',
    subtitle: 'Velvety foam patterns revealing sacred geometric arcs',
    dominantArchetype: 'The Harmony Seal',
    symbols: ['Chalice of Hearts', 'Solid Anchor'],
    confidence: 96,
    energy: 'Earth & Air Harmony',
    cupImageStyle: 'latte'
  }
];

export const WIREFRAME_SPEC_CATALOG: Record<string, ComponentSpecAnnotation> = {
  'daily-brew-hero': {
    id: 'daily-brew-hero',
    name: 'Daily Cosmic Brew & Archetype Card',
    uxIntent: 'Anchors the user’s morning routine by translating their real-time astrological transit into a sensory coffee roast ritual with actionable horary timing.',
    figmaLayer: 'Mobile / Home / [Hero] CosmicRoastCard_v4',
    apiBinding: 'GET /api/gemini/predict (cached per diurnal solar day)',
    propsSchema: ['sunSign: ZodiacSign', 'moonPhase: string', 'transitHora: string', 'onBrewAction: () => void'],
    stateMachine: 'Idle -> Steaming Animation -> Ritual Expanded -> Complete',
    responsiveBehavior: 'Mobile: 100% width stacked card; Web: 2-column hero with interactive steam visualizer.'
  },
  'kundli-interactive-chart': {
    id: 'kundli-interactive-chart',
    name: 'North/South Indian Kundli SVG Matrix',
    uxIntent: 'Renders the 12 Bhavas (houses) and planetary degrees with interactive diamond/box quadrant hovering, house lordship details, and Raja Yoga highlights.',
    figmaLayer: 'Web / Chart / [Engine] KundliMatrix_Interactive',
    apiBinding: 'Client-side Ephemeris Engine (Swiss Ephemeris / Vedic algorithm)',
    propsSchema: ['houses: KundliHouse[]', 'planets: PlanetaryPosition[]', 'format: "North" | "South"'],
    stateMachine: 'HouseHovered(idx) -> HighlightAspectLines -> OpenBhavaDrawer',
    responsiveBehavior: 'Mobile: Pinch-to-zoomable SVG with bottom sheet details; Web: Full 480px vector with live side inspector.'
  },
  'coffee-scanner-tasseography': {
    id: 'coffee-scanner-tasseography',
    name: 'AI Coffee Cup Grounds Symbol Detector',
    uxIntent: 'Allows seekers to capture or upload coffee cup grounds and triggers an astrological computer vision interpreter that tags celestial geometries.',
    figmaLayer: 'Mobile / Scanner / [Camera] TasseographyFinder',
    apiBinding: 'POST /api/gemini/coffee-reading with symbol coordinate annotations',
    propsSchema: ['onScanComplete: (result) => void', 'confidenceThreshold: number'],
    stateMachine: 'CameraActive -> ImageSnapped -> AnalyzingGrounds -> SymbolsPinned -> NarrativeReady',
    responsiveBehavior: 'Mobile: Fullscreen viewport camera viewfinder; Web: Drag-and-drop dropzone with polygon canvas editor.'
  },
  'prediction-engine-simulator': {
    id: 'prediction-engine-simulator',
    name: 'Planetary Transit Predictive Timeline',
    uxIntent: 'Empowers users to slide through 2026–2027 astrological transit events, retrogrades, and request customized AI life forecasts across Career, Love, and Wealth.',
    figmaLayer: 'Web / Forecast / [Timeline] TransitEngine_Slider',
    apiBinding: 'POST /api/gemini/predict with category and temporal parameters',
    propsSchema: ['currentDasha: string', 'transits: PlanetaryTransitEvent[]', 'onRunAI: (q) => void'],
    stateMachine: 'BrowsingTimeline -> FilterCategory -> SelectTransitNode -> TriggerAIPrediction',
    responsiveBehavior: 'Mobile: Vertical step timeline cards; Web: Horizontal interactive scrubbable ribbon.'
  },
  'synastry-coffee-blend': {
    id: 'synastry-coffee-blend',
    name: 'Cosmic Synastry & Compatibility Blend Matrix',
    uxIntent: 'Calculates the 36-point Ashta Koota astrological score and synthesizes it into a unique coffee blend profile with planetary aspect overlays.',
    figmaLayer: 'Shared / Synastry / [Score] AshtaKootaBlend_Widget',
    apiBinding: 'Local calculation engine + Gemini blend narrative synthesis',
    propsSchema: ['chartA: UserProfile', 'chartB: UserProfile', 'aspectWeights: object'],
    stateMachine: 'SelectPartners -> ComputeScores -> UnveilBlendCard -> ToggleAspects',
    responsiveBehavior: 'Mobile: Swipeable score cards; Web: Side-by-side radar and breakdown table.'
  },
  'barista-astro-chat': {
    id: 'barista-astro-chat',
    name: 'Barista Astro Conversational Oracle',
    uxIntent: 'Real-time conversational interface blending Vedic precision with warm coffeehouse guidance and one-tap cosmic prompt chips.',
    figmaLayer: 'Shared / Chat / [Assistant] BaristaAstro_Stream',
    apiBinding: 'POST /api/gemini/chat with conversational history context',
    propsSchema: ['messages: ChatMessage[]', 'onSendMessage: (text) => void', 'isStreaming: boolean'],
    stateMachine: 'Idle -> Typing -> AwaitingModelStream -> RenderTokens -> RenderSuggestions',
    responsiveBehavior: 'Mobile: Bottom docking drawer/view with keyboard avoidance; Web: Right persistent sidebar or full screen.'
  }
};

export const DESIGN_TOKENS = {
  colors: [
    { name: 'Espresso Roast (Primary Dark)', value: '#120D0A', hex: '#120D0A', role: 'Background Canvas for Cosmic Dark' },
    { name: 'Warm Crema Amber (Accent)', value: '#D97706', hex: '#D97706', role: 'Primary CTA, Active House, Sunrise' },
    { name: 'Starlight Gold (Celestial)', value: '#FCD34D', hex: '#FCD34D', role: 'Planetary Glyphs, Auspicious Badges' },
    { name: 'Nebula Violet (Mystic)', value: '#8B5CF6', hex: '#8B5CF6', role: 'Rahu/Ketu, Occult Bhavas, Dasha Highlights' },
    { name: 'Frosted Foam Cream', value: '#FAF5EF', hex: '#FAF5EF', role: 'High-contrast text on dark, card surfaces in light' },
    { name: 'Blueprint Indigo (Wireframe)', value: '#2563EB', hex: '#2563EB', role: 'Blueprint wireframe borders and spec callouts' },
    { name: 'Draft Grayscale (Low-Fi)', value: '#9CA3AF', hex: '#9CA3AF', role: 'Low-fidelity layout wireframe boundaries' }
  ],
  typography: [
    { name: 'Display Serif / Brand', family: 'Cinzel / Playfair / Georgia', usage: 'Screen Titles, Zodiac Archetypes, Roast Names' },
    { name: 'Body Sans', family: 'Inter / Plus Jakarta Sans / system-ui', usage: 'Readings, Ephemeris data, Chat, UI Controls' },
    { name: 'Mono Specs', family: 'JetBrains Mono / ui-monospace', usage: 'Planetary degrees, JSON schema, Spec dimensions, Time' }
  ],
  radii: [
    { name: 'Card Container', value: '16px (rounded-2xl)' },
    { name: 'Inner Nested Element', value: '10px (rounded-lg - following Inner = Outer - Padding rule)' },
    { name: 'Pill / Badge / Action', value: '9999px (rounded-full)' }
  ],
  elevation: [
    { name: 'Cosmic Glow Low', value: '0 4px 20px rgba(217, 119, 6, 0.15)' },
    { name: 'Cosmic Glow High', value: '0 10px 35px rgba(139, 92, 246, 0.25)' },
    { name: 'Wireframe Stroke', value: '1.5px dashed or solid #3B82F6' }
  ]
};
