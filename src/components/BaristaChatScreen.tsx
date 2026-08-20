import React, { useState, useRef, useEffect } from 'react';
import {
  UserProfile,
  WireframeFidelity,
  ThemeMode,
  ChatMessage
} from '../types/astrology';
import { WIREFRAME_SPEC_CATALOG } from '../data/mockData';
import {
  Coffee,
  Sparkles,
  Send,
  RefreshCw,
  User,
  Bot,
  Flame,
  Star,
  Compass,
  CornerDownLeft
} from 'lucide-react';

interface BaristaChatScreenProps {
  profile: UserProfile;
  fidelity: WireframeFidelity;
  themeMode: ThemeMode;
  isInspectorActive: boolean;
  onSelectSpec: (spec: any) => void;
}

export const BaristaChatScreen: React.FC<BaristaChatScreenProps> = ({
  profile,
  fidelity,
  themeMode,
  isInspectorActive,
  onSelectSpec
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-1',
      role: 'assistant',
      content: `☕ **Welcome to the Celestial Coffeehouse, ${profile.name}!**\n\nI am **Barista Astro**, your resident AI astrologer and coffee mystic. With your **${profile.sunSign} Sun** and **${profile.ascendant} Ascendant**, the planetary currents are ripe for insightful breakthroughs today.\n\nHow may I consult the ephemeris and brew your celestial guidance today?`,
      timestamp: '10:00 AM',
      suggestedFollowUps: [
        `What coffee ritual aligns with my ${profile.moonSign} Moon?`,
        'How does the Jupiter transit affect my career this year?',
        'Explain the planetary dignities in my 1st house.'
      ]
    }
  ]);
  const [inputVal, setInputVal] = useState('');
  const [isSending, setIsSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async (customText?: string) => {
    const textToSend = customText || inputVal;
    if (!textToSend.trim() || isSending) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputVal('');
    setIsSending(true);

    try {
      const res = await fetch('/api/gemini/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, userMsg],
          userProfile: profile
        })
      });
      const data = await res.json();
      const assistantReply = data.reply || `☕ The stars illuminate your path regarding "${textToSend}". With your Lagna in ${profile.ascendant}, trust your grounded timing and savor the journey.`;

      setMessages(prev => [
        ...prev,
        {
          id: `bot-${Date.now()}`,
          role: 'assistant',
          content: assistantReply,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          suggestedFollowUps: data.suggestedFollowUps || [
            'What is my auspicious coffee hour tomorrow?',
            'How can I harmonize my current dasha cycle?'
          ]
        }
      ]);
    } catch (err) {
      console.warn('Fallback offline reply:', err);
      setMessages(prev => [
        ...prev,
        {
          id: `bot-${Date.now()}`,
          role: 'assistant',
          content: `☕ *Barista Astro consults the planetary clock...*\n\nYour question touches an important house alignment in your chart (${profile.sunSign} Sun). The transit of Jupiter encourages steady, patient expansion. Pair your morning reflection with a warm cinnamon roast to steady your intuition.`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } finally {
      setIsSending(false);
    }
  };

  const isLoFi = fidelity === 'lo-fi';
  const isMidFi = fidelity === 'mid-fi';

  return (
    <div
      onClick={() => isInspectorActive && onSelectSpec(WIREFRAME_SPEC_CATALOG['barista-astro-chat'])}
      className={`space-y-4 rounded-2xl border p-5 relative animate-in fade-in duration-300 ${
        isInspectorActive ? 'ring-2 ring-amber-400 ring-offset-2 ring-offset-black' : ''
      } ${
        isLoFi
          ? 'border-2 border-dashed border-blue-400 bg-blue-950/20'
          : 'border-amber-500/20 bg-[#140D09]/90 backdrop-blur-sm'
      }`}
    >
      {isInspectorActive && (
        <div className="absolute top-3 right-3 bg-amber-500 text-black font-mono text-[10px] font-bold px-2 py-0.5 rounded shadow">
          Inspect: barista-astro-chat
        </div>
      )}

      {/* Barista Header & Context Strip */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-amber-500/10 pb-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-600 to-amber-900 flex items-center justify-center text-white border border-amber-500/30">
            <Coffee className="w-5 h-5 text-amber-200" />
          </div>
          <div>
            <h2 className="text-base font-serif font-bold text-amber-100 flex items-center gap-2">
              Barista Astro • AI Astrological Oracle
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            </h2>
            <div className="text-xs text-amber-300/70 flex items-center gap-1.5">
              <span>Seeker: {profile.name}</span>
              <span>•</span>
              <span>{profile.sunSign} Sun / {profile.ascendant} Asc</span>
              <span>•</span>
              <span className="text-amber-400 font-mono">{profile.currentDasha}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Message Stream */}
      <div className="h-[420px] overflow-y-auto space-y-3 p-2 rounded-xl bg-black/40 border border-amber-500/10">
        {messages.map(m => (
          <div
            key={m.id}
            className={`flex items-start gap-3 ${m.role === 'user' ? 'flex-row-reverse' : ''}`}
          >
            <div
              className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs shrink-0 ${
                m.role === 'user'
                  ? 'bg-amber-600 text-white font-bold'
                  : 'bg-gradient-to-br from-amber-800 to-amber-950 text-amber-200 border border-amber-500/30'
              }`}
            >
              {m.role === 'user' ? <User className="w-3.5 h-3.5" /> : <Coffee className="w-3.5 h-3.5" />}
            </div>

            <div className={`space-y-1.5 max-w-xl ${m.role === 'user' ? 'items-end' : ''}`}>
              <div
                className={`p-3.5 rounded-2xl text-xs leading-relaxed ${
                  m.role === 'user'
                    ? 'bg-amber-600 text-white rounded-tr-none'
                    : 'bg-[#1C130D] border border-amber-500/20 text-amber-100 rounded-tl-none font-serif'
                }`}
              >
                <div className="whitespace-pre-line">{m.content}</div>
              </div>

              {/* Follow-up suggestions */}
              {m.suggestedFollowUps && m.suggestedFollowUps.length > 0 && (
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {m.suggestedFollowUps.map((q, i) => (
                    <button
                      key={i}
                      onClick={() => handleSendMessage(q)}
                      className="text-[10px] px-2.5 py-1 rounded-full bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/20 transition-colors cursor-pointer text-left"
                    >
                      ✦ {q}
                    </button>
                  ))}
                </div>
              )}

              <span className="text-[10px] font-mono text-amber-400/50 px-1">
                {m.timestamp}
              </span>
            </div>
          </div>
        ))}

        {isSending && (
          <div className="flex items-center gap-2 text-xs text-amber-300 font-serif italic p-3">
            <RefreshCw className="w-4 h-4 animate-spin text-amber-400" />
            <span>Barista Astro is meditating on the planetary transits...</span>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Chat Input Bar */}
      <form
        onSubmit={e => {
          e.preventDefault();
          handleSendMessage();
        }}
        className="flex items-center gap-2"
      >
        <div className="relative flex-1">
          <input
            type="text"
            value={inputVal}
            onChange={e => setInputVal(e.target.value)}
            placeholder="Ask Barista Astro about your transits, Kundli houses, or auspicious coffee hours..."
            className="w-full bg-black/60 border border-amber-500/30 rounded-xl px-4 py-2.5 text-xs text-amber-100 placeholder:text-amber-300/40 focus:outline-none focus:border-amber-400 pr-10"
          />
        </div>
        <button
          type="submit"
          disabled={!inputVal.trim() || isSending}
          className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-white font-medium text-xs shadow-md transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
        >
          {isSending ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
          <span>Send</span>
        </button>
      </form>
    </div>
  );
};
