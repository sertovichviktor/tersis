import React, { useState, useCallback, memo, useEffect, useRef } from 'react'
import ReactDOM from 'react-dom/client'
import { 
  Truck, ArrowRight, Check, Shield, Clock, Menu, X, Phone, Mail, MapPin, 
  Zap, Globe, Lock, AlertTriangle, Handshake, Users, FileText, Home, Maximize2 
} from 'lucide-react'
// ПРЯМОЙ ПУТЬ БЕЗ @
import { translations } from './lib/i18n' 
import './styles.css'

// --- ИЗОЛЯЦИЯ ТЯЖЕЛЫХ БЛОКОВ ---
const HeroSection = memo(({ t }: any) => (
  <section className="relative h-screen flex items-center px-8 overflow-hidden bg-[#050a14]">
    <div className="absolute inset-0 z-0 pointer-events-none">
      <video autoPlay muted loop playsInline className="w-full h-full object-cover opacity-40">
        <source src="/hero-video.mp4.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-black/50" />
    </div>
    <div className="relative z-10 max-w-5xl">
      <div className="animate-fadeInUp">
        <h1 className="text-6xl md:text-8xl font-black leading-[0.85] uppercase mb-8 tracking-tighter text-white">
          {t.hero.title1}<br/>{t.hero.title2}<br/>
          <span className="text-[#0052ff]">{t.hero.title3}</span>
        </h1>
        <button onClick={() => document.getElementById('contact')?.scrollIntoView({behavior:'smooth'})} className="bg-[#0052ff] text-white px-10 py-5 rounded-xl font-black text-sm uppercase tracking-widest hover:bg-[#003dd6] transition-all flex items-center gap-3 shadow-2xl">
          {t.hero.getQuote} <ArrowRight size={20} />
        </button>
      </div>
    </div>
  </section>
))

const MapSection = memo(() => (
  <section id="coverage" className="py-24 px-6 bg-[#050a14] border-t border-white/5 text-center">
    <div className="relative h-[400px] md:h-[650px] rounded-[40px] overflow-hidden border border-[#0052ff]/30 bg-black max-w-7xl mx-auto">
      <img src="/map-hub.jpg.png" className="absolute inset-0 w-full h-full object-cover opacity-80 pointer-events-none" />
    </div>
  </section>
))

const App = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [lang, setLang] = useState<'en' | 'lt'>('en')
  const [isSubmitted, setIsSubmitted] = useState(false)
  const isFocusing = useRef(false) // Фикс фриза
  
  const t = translations[lang]

  useEffect(() => {
    const handleScroll = () => {
      if (isFocusing.current) return;
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleSubmit = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    setIsSubmitted(true);
    fetch('/send.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }).finally(() => {
      form.reset();
      setTimeout(() => setIsSubmitted(false), 3000);
    });
  }, []);

  return (
    <div className="min-h-screen bg-[#050a14] text-white font-sans">
      {/* NAV */}
      <nav className={`fixed w-full z-50 p-6 transition-all ${isScrolled ? 'bg-[#050a14]/95 backdrop-blur-md border-b border-white/5' : ''}`}>
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo({top:0, behavior:'smooth'})}>
            <img src="/logo.png" className="h-10" />
            <span className="text-2xl font-black uppercase tracking-tighter text-white">TERSIS</span>
          </div>
          <div className="hidden md:flex gap-8 text-[10px] font-bold uppercase tracking-widest text-gray-400">
            {['services', 'fleet', 'about', 'contact'].map(s => (
              <button key={s} onClick={() => document.getElementById(s)?.scrollIntoView({behavior:'smooth'})} className="hover:text-white transition">
                {(t.nav as any)[s]}
              </button>
            ))}
            <button onClick={() => setLang(lang === 'en' ? 'lt' : 'en')} className="text-white border border-white/20 px-3 py-1 rounded">{lang.toUpperCase()}</button>
          </div>
        </div>
      </nav>

      <HeroSection t={t} />

      {/* FLEET */}
      <section id="fleet" className="py-32 px-8 bg-[#050a14] border-t border-white/5">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10">
          <div className="bg-[#0a1628] p-10 rounded-3xl border border-white/5">
            <Truck className="text-[#0052ff] mb-6" size={48} />
            <h3 className="text-3xl font-black mb-4 uppercase">{t.fleet.standardClass}</h3>
            <p className="text-gray-400 text-sm mb-4">92 m³ • 33 Euro Pallets • 13.6m</p>
            <p className="text-gray-500 italic text-xs border-t border-white/5 pt-6">{t.fleet.standardFooter}</p>
          </div>
          <div className="bg-[#0a1628] p-10 rounded-3xl border border-[#0052ff]/20">
            <Maximize2 className="text-[#0052ff] mb-6" size={48} />
            <h3 className="text-3xl font-black mb-4 uppercase text-[#0052ff]">{t.fleet.megaAdvantage}</h3>
            <p className="text-gray-400 text-sm mb-4">105 m³ • 3.0m Internal Height</p>
            <p className="text-gray-500 italic text-xs border-t border-white/5 pt-6">{t.fleet.megaFooter}</p>
          </div>
        </div>
      </section>

      <MapSection />

      {/* CONTACT FORM (ВОССТАНОВЛЕНА 1:1) */}
      <section id="contact" className="py-32 px-8 bg-[#050a14]">
        <div className="max-w-4xl mx-auto">
          <div className="p-8 md:p-12 rounded-[40px] border border-[#1A2C45] shadow-2xl" style={{ background: '#0F1A2B' }}>
            <form onSubmit={handleSubmit} className="space-y-8" autoComplete="off" 
                  onFocus={() => { isFocusing.current = true }} 
                  onBlur={() => { isFocusing.current = false }}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-white">
                <div>
                  <label className="block text-[11px] font-black text-[#8899BB] uppercase tracking-[0.15em] mb-2.5">FROM (COUNTRY/CITY)</label>
                  <input name="from" required placeholder="Kaunas, Lithuania" className="w-full bg-[#0a1628] border border-white/5 rounded-xl px-5 py-4 outline-none focus:border-[#0052ff]" />
                </div>
                <div>
                  <label className="block text-[11px] font-black text-[#8899BB] uppercase tracking-[0.15em] mb-2.5">TO (COUNTRY/CITY)</label>
                  <input name="to" required placeholder="Berlin, Germany" className="w-full bg-[#0a1628] border border-white/5 rounded-xl px-5 py-4 outline-none focus:border-[#0052ff]" />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-white">
                <div>
                  <label className="block text-[11px] font-black text-[#8899BB] uppercase tracking-[0.15em] mb-2.5">CARGO TYPE</label>
                  <input name="cargo" placeholder="Electronics, Pallets..." className="w-full bg-[#0a1628] border border-white/5 rounded-xl px-5 py-4 outline-none focus:border-[#0052ff]" />
                </div>
                <div>
                  <label className="block text-[11px] font-black text-[#8899BB] uppercase tracking-[0.15em] mb-2.5">WEIGHT (KG)</label>
                  <input name="weight" placeholder="5000" className="w-full bg-[#0a1628] border border-white/5 rounded-xl px-5 py-4 outline-none focus:border-[#0052ff]" />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-white">
                <div>
                  <label className="block text-[11px] font-black text-[#8899BB] uppercase tracking-[0.15em] mb-2.5">VOLUME (M³)</label>
                  <input name="volume" placeholder="10" className="w-full bg-[#0a1628] border border-white/5 rounded-xl px-5 py-4 outline-none focus:border-[#0052ff]" />
                </div>
                <div>
                  <label className="block text-[11px] font-black text-[#8899BB] uppercase tracking-[0.15em] mb-2.5">NAME</label>
                  <input name="name" required placeholder="John Doe" className="w-full bg-[#0a1628] border border-white/5 rounded-xl px-5 py-4 outline-none focus:border-[#0052ff]" />
                </div>
              </div>
              <div className="text-white">
                <label className="block text-[11px] font-black text-[#8899BB] uppercase tracking-[0.15em] mb-2.5">EMAIL</label>
                <input name="email" type="email" required placeholder="john@company.com" className="w-full bg-[#0a1628] border border-white/5 rounded-xl px-5 py-4 outline-none focus:border-[#0052ff]" />
              </div>
              <button type="submit" disabled={isSubmitted} className="w-full py-6 bg-[#0052ff] hover:bg-[#003dd6] text-white font-black rounded-2xl text-xs tracking-[0.3em] uppercase transition-all">
                {isSubmitted ? 'SENT SUCCESS' : 'REQUEST QUOTE IN 24H'}
              </button>
            </form>
          </div>
        </div>
      </section>

      <footer className="py-20 bg-[#050a14] border-t border-white/5 text-center px-4 text-gray-600 text-[10px] font-bold uppercase tracking-widest">
        <p>Taikos pr. 141-305, Kaunas, Lithuania | info@tersis.lt | © 2026 TERSIS</p>
      </footer>
    </div>
  )
}

const rootElement = document.getElementById('root')!
ReactDOM.createRoot(rootElement).render(<App />)
