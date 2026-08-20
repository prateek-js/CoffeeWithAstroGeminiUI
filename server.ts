import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

let aiClient: GoogleGenAI | null = null;
function getAi(): GoogleGenAI | null {
  if (!aiClient && process.env.GEMINI_API_KEY) {
    aiClient = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }
  return aiClient;
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: "10mb" }));

  // API Routes
  app.get("/api/health", (_req, res) => {
    res.json({
      status: "ok",
      project: "Coffee with Astro",
      hasGeminiKey: Boolean(process.env.GEMINI_API_KEY),
    });
  });

  // AI Prediction Route
  app.post("/api/gemini/predict", async (req, res) => {
    try {
      const { birthDetails, question, category, transitContext } = req.body;
      const ai = getAi();

      if (!ai) {
        // Return structured smart fallback if no API key
        return res.json({
          success: true,
          source: "local-engine",
          prediction: `[Planetary Transit Analysis: ${category || 'General'}]\nBased on your Sun in ${birthDetails?.sunSign || 'Aries'} and Ascendant in ${birthDetails?.ascendant || 'Leo'}, Jupiter's upcoming aspect brings high expansion and auspicious timing for ${category || 'your endeavors'}. Saturn advises structured discipline, while your daily coffee ritual acts as a grounding anchor for mental clarity.`,
          cosmicCoffeePairing: "Ethiopian Yirgacheffe Pour-Over (Bright, Floral, Awakening)",
          auspiciousCoffeeHour: "08:15 AM - 09:30 AM (Sun Hora)",
          astrologicalHighlights: [
            "Jupiter transit 9th house brings luck and mentorship",
            "Venus trine Mercury boosts creative communication",
            "Saturn 10th house rewards patient long-term efforts"
          ],
          affirmation: "I sip the celestial brew of clarity and step into my sovereign cosmic path."
        });
      }

      const prompt = `You are "Barista Astro", the master astrologer and celestial coffee oracle for the "Coffee with Astro" prediction engine.
Analyze the following astrological chart and query:
- User Name: ${birthDetails?.name || 'Cosmic Seeker'}
- Sun Sign: ${birthDetails?.sunSign || 'Aries'}
- Moon Sign: ${birthDetails?.moonSign || 'Scorpio'}
- Ascendant (Lagna): ${birthDetails?.ascendant || 'Leo'}
- Nakshatra: ${birthDetails?.nakshatra || 'Ashwini'}
- Current Dasha: ${birthDetails?.currentDasha || 'Jupiter-Venus'}
- Question / Topic: ${question || 'Comprehensive life path and upcoming cosmic forecast'}
- Category: ${category || 'General Life Path'}
- Transit Notes: ${transitContext || 'Active Jupiter & Saturn transits'}

Provide an engaging, deeply insightful, yet grounded astrological prediction that weaves Vedic/Western astrology wisdom with the grounding coffee ritual archetype.
Respond with a JSON object strictly following this structure:
{
  "prediction": "A detailed, structured 3-paragraph astrological reading and prediction with actionable timing and cosmic insight.",
  "cosmicCoffeePairing": "Specific coffee bean, roast, and preparation method tailored to their current planetary energy",
  "auspiciousCoffeeHour": "Ideal time of day with Astrological Hora (e.g. 08:30 AM - 09:45 AM, Jupiter Hora)",
  "astrologicalHighlights": ["Point 1 about planetary transits", "Point 2 about dasha or house aspects", "Point 3 about karmic advice"],
  "affirmation": "One sentence uplifting cosmic coffee affirmation"
}`;

      const response = await ai.models.generateContent({
        model: "gemini-3.7-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          temperature: 0.7,
        },
      });

      const text = response.text || "{}";
      try {
        const parsed = JSON.parse(text);
        return res.json({ success: true, source: "gemini-3.7-flash", ...parsed });
      } catch {
        return res.json({ success: true, source: "gemini-3.7-flash", prediction: text });
      }
    } catch (err: unknown) {
      const errorMsg = err instanceof Error ? err.message : String(err);
      console.error("Gemini predict error:", errorMsg);
      res.status(500).json({ error: errorMsg });
    }
  });

  // Coffee Grounds / Tasseography Interpretation Route
  app.post("/api/gemini/coffee-reading", async (req, res) => {
    try {
      const { symbolsDetected, userSign, focusArea, notes } = req.body;
      const ai = getAi();

      if (!ai) {
        return res.json({
          success: true,
          source: "local-engine",
          reading: `The coffee grounds reveal symbols of transformation (${(symbolsDetected || ['Crescent Moon', 'Star']).join(', ')}). In alignment with ${userSign || 'your zodiac sign'}, the crescent shape near the cup's rim signals an imminent breakthrough in ${focusArea || 'personal growth'}. The clear space at the bottom indicates resolution of old karmic knots.`,
          dominantSymbol: symbolsDetected?.[0] || "Crescent Moon",
          elementalEnergy: "Fire & Water Balance",
          fortuneScore: 88,
          guidance: "Drink mindfully at dawn, reflect before major agreements, and trust intuitive nudges over rigid calculations."
        });
      }

      const prompt = `You are the master Tasseography (coffee grounds cup reading) and Astrology Oracle for "Coffee with Astro".
Interpret the coffee cup reading with detected symbols:
- Detected Symbols in grounds: ${JSON.stringify(symbolsDetected || ['Crescent Moon', 'Mountain', 'Key'])}
- Seeker Zodiac: ${userSign || 'Cancer'}
- Focus Area: ${focusArea || 'Career & Love'}
- Additional Notes: ${notes || 'Freshly brewed Turkish coffee grounds settled in cup'}

Provide a mystical yet deeply practical interpretation combining coffee cup symbols (Tasseography) and planetary transits.
Return strict JSON:
{
  "reading": "Detailed 2-3 paragraph reading interpreting the placement of the symbols, rim vs base, near vs distant future.",
  "dominantSymbol": "The primary symbol and its esoteric meaning",
  "elementalEnergy": "Dominant elemental current (e.g. Cardinal Fire + Fixed Air)",
  "fortuneScore": 92,
  "guidance": "Concrete daily ritual advice and mindful action"
}`;

      const response = await ai.models.generateContent({
        model: "gemini-3.7-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          temperature: 0.7,
        },
      });

      const text = response.text || "{}";
      try {
        const parsed = JSON.parse(text);
        return res.json({ success: true, source: "gemini-3.7-flash", ...parsed });
      } catch {
        return res.json({ success: true, source: "gemini-3.7-flash", reading: text });
      }
    } catch (err: unknown) {
      const errorMsg = err instanceof Error ? err.message : String(err);
      res.status(500).json({ error: errorMsg });
    }
  });

  // AI Chat Route with Barista Astro
  app.post("/api/gemini/chat", async (req, res) => {
    try {
      const { messages, userProfile } = req.body;
      const ai = getAi();

      if (!ai) {
        const lastMsg = messages?.[messages.length - 1]?.content || "";
        return res.json({
          success: true,
          reply: `☕ *Barista Astro breathes steam and consults the ephemeris...*\n\nAh, ${userProfile?.name || 'seeker'}, with your ${userProfile?.sunSign || 'Sun sign'} energized by the current celestial transits, your question regarding "${lastMsg.slice(0, 60)}..." is very timely. The planets suggest taking a grounded approach—brew a warm cinnamon-dusted mocha to steady your thoughts and look toward upcoming auspicious windows.`,
          suggestedFollowUps: [
            "What coffee ritual aligns with my Moon sign?",
            "How does Saturn transit affect my career this quarter?",
            "What is my lucky day this week?"
          ]
        });
      }

      const conversationHistory = messages?.map((m: { role: string; content: string }) => `${m.role === 'user' ? 'Seeker' : 'Barista Astro'}: ${m.content}`).join("\n\n") || "";

      const systemPrompt = `You are "Barista Astro", the signature AI Astrologer & Coffee Mystic of "Coffee with Astro".
You blend ancient Vedic & Western astrological precision (Kundli, transits, dashas, houses, nakshatras) with warm, cozy, poetic coffeehouse wisdom (roasts, tasting notes, mindful rituals).
User Profile:
- Name: ${userProfile?.name || 'Seeker'}
- Sun: ${userProfile?.sunSign || 'Taurus'}, Moon: ${userProfile?.moonSign || 'Leo'}, Ascendant: ${userProfile?.ascendant || 'Scorpio'}
- Current Transit Highlights: Jupiter expansion, Saturn karmic discipline.

Tone: Warm, empathetic, precise, celestial, cozy, never preachy. Always provide concrete astrological reasoning paired with comforting coffee metaphors or rituals. Keep replies crisp and readable with markdown formatting.`;

      const prompt = `${systemPrompt}\n\nConversation so far:\n${conversationHistory}\n\nProvide the next response from Barista Astro. Include 3 short relevant follow-up questions at the end in a JSON block or bullet points.`;

      const response = await ai.models.generateContent({
        model: "gemini-3.7-flash",
        contents: prompt,
        config: {
          temperature: 0.75,
        },
      });

      const reply = response.text || "May your cup be full and your stars align.";
      return res.json({ success: true, reply });
    } catch (err: unknown) {
      const errorMsg = err instanceof Error ? err.message : String(err);
      res.status(500).json({ error: errorMsg });
    }
  });

  // Vite Middleware in dev or static files in prod
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`☕ Coffee with Astro server running at http://localhost:${PORT}`);
  });
}

startServer();
