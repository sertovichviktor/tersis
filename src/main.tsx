import React, { useState, useCallback, memo, useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import { Truck, ArrowRight, Check, Shield, Clock, Globe, Maximize2, MapPin, Phone, Mail, Menu, X, Zap, AlertTriangle, FileText, Home } from 'lucide-react'
import { translations } from './lib/i18n' // Убедись, что этот файл на месте

// --- 1. ИЗОЛЯЦИЯ: ВИДЕО (Чтобы оно "спало", пока ты в форме) ---
const HeroSection = memo(() => (
  <section className="relative h-screen flex items-center px-6 overflow-hidden bg-[#050a14]">
    <div className="absolute inset-0 z-0 pointer-events-none">
      <video autoPlay muted loop playsInline className="w-full h-full object-cover opacity-60">
        <source src="/hero-video.mp4.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-black/40" />
    </div>
    <div className="relative z-10 max-w-7xl mx-auto w-full">
      <div className="animate-fadeInUp">
        <h1 className="text-5xl md:text-8xl font-black text-white leading-[0.9] uppercase mb-8 tracking-tighter">
          {translations.en.hero.title1}<br/>{translations.en.hero.title2}<br/>
          <span className="text-[#0052ff]">{translations.en.hero.title3}</span>
        </h1>
        <button onClick={() => document.getElementById('contact')?.scrollIntoView({behavior:'smooth'})} className="bg-[#0052ff] text-white px-10 py-5 rounded-xl font-black text-sm uppercase tracking-widest hover:bg-[#003dd6] transition-all flex items-center gap-3 shadow-2xl">
          GET QUOTE <ArrowRight size={20} />
        </button>
      </div>
    </div>
  </section>
))

// --- 2. ИЗОЛЯЦИЯ: КАРТА ---
const MapSection = memo(() => (
  <section id="coverage" className="py-24 px-6 bg-[#050a14] border-t border-white/5 text-center">
    <h2 className="text-4xl font-black text-white mb-12 uppercase">International Hub</h2>
    <div className="relative h-[400px] md:h-[650px] rounded-[40px] overflow-hidden border border-[#0052ff]/30 bg-black shadow-2xl">
      <img src="/map-hub.jpg.png" className="absolute inset-0 w-full h-full object-cover opacity-80 pointer-events-none" />
    </div>
  </section>
))

const serviceIcons = [Truck, Globe, AlertTriangle, Zap, Clock, Home, FileText, Shield]

const App = () => {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const t = translations.en

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
    <div className="bg-[#050a14] text-white min-h-screen font-sans">
      {/* NAV */}
      <nav className="fixed w-full z-50 p-6 bg-[#050a14]/80 backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo({top:0, behavior:'smooth'})}>
            <img src="/logo.png" className="h-10" />
            <span className="text-2xl font-black tracking-tighter uppercase">TERSIS</span>
          </div>
          <div className="hidden md:flex gap-8 text-xs font-bold uppercase tracking-widest text-gray-400">
            <button onClick={() => document.getElementById('fleet')?.scrollIntoView({behavior:'smooth'})}>Fleet</button>
            <button onClick={() => document.getElementById('services')?.scrollIntoView({behavior:'smooth'})}>Services</button>
            <button onClick={() => document.getElementById('contact')?.scrollIntoView({behavior:'smooth'})} className="text-white">Contact</button>
          </div>
        </div>
      </nav>

      <HeroSection />

      {/* FLEET */}
      <section id="fleet" className="py-24 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10">
          <div className="bg-[#0a1628] p-10 rounded-3xl border border-white/5">
            <Truck className="text-[#0052ff] mb-6" size={48} />
            <h3 className="text-3xl font-black mb-4 uppercase">{t.fleet.standardClass}</h3>
            <p className="text-gray-400 text-sm mb-6">92 m³ • 33 Euro Pallets • 13.6m length</p>
            <p className="text-gray-500 italic text-xs pt-4 border-t border-white/5">{t.fleet.standardFooter}</p>
          </div>
          <div className="bg-[#0a1628] p-10 rounded-3xl border border-blue-500/20">
            <Maximize2 className="text-blue-500 mb-6" size={48} />
            <h3 className="text-3xl font-black mb-4 uppercase text-blue-500">{t.fleet.megaAdvantage}</h3>
            <p className="text-gray-400 text-sm mb-6">105 m³ • 3.0m Internal Height • MEGA</p>
            <p className="text-gray-500 italic text-xs pt-4 border-t border-white/5">{t.fleet.megaFooter}</p>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="py-24 px-6 border-t border-white/5 text-center">
        <h2 className="text-4xl font-black mb-16 uppercase">{t.services.title}</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {t.services.items.slice(0,8).map((s:any, i:number) => {
            const Icon = serviceIcons[i] || Truck;
            return (
              <div key={i} className="p-8 bg-[#0a1628] rounded-2xl border border-white/5 hover:border-blue-500 transition-all">
                <Icon className="text-blue-500 mb-4 mx-auto" size={32} />
                <h4 className="font-black text-[11px] uppercase tracking-widest leading-tight">{s.title}</h4>
              </div>
            )
          })}
        </div>
      </section>

      <MapSection />

      {/* CONTACT FORM (ТВОЙ ДИЗАЙН 1:1) */}
      <section id="contact" className="py-32 px-6 bg-[#050a14]">
        <div className="max-w-4xl mx-auto">
          <div className="p-8 md:p-12 rounded-[32px] border border-[#1A2C45] shadow-2xl" style={{ background: '#0F1A2B' }}>
            <form onSubmit={handleSubmit} className="space-y-6" autoComplete="off">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-white">
                <div>
                  <label className="block text-[11px] font-black text-[#8899BB] uppercase tracking-[0.15em] mb-2.5">FROM (COUNTRY/CITY)</label>
                  <input name="from" required placeholder="Kaunas, Lithuania" className="w-full bg-[#0a1628] border border-white/5 rounded-xl px-5 py-4 outline-none focus:border-blue-500 transition-colors" />
                </div>
                <div>
                  <label className="block text-[11px] font-black text-[#8899BB] uppercase tracking-[0.15em] mb-2.5">TO (COUNTRY/CITY)</label>
                  <input name="to" required placeholder="Berlin, Germany" className="w-full bg-[#0a1628] border border-white/5 rounded-xl px-5 py-4 outline-none focus:border-blue-500 transition-colors" />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-white">
                <div>
                  <label className="block text-[11px] font-black text-[#8899BB] uppercase tracking-[0.15em] mb-2.5">CARGO TYPE</label>
                  <input name="cargoType" placeholder="Electronics, Pallets..." className="w-full bg-[#0a1628] border border-white/5 rounded-xl px-5 py-4 outline-none focus:border-blue-500" />
                </div>
                <div>
                  <label className="block text-[11px] font-black text-[#8899BB] uppercase tracking-[0.15em] mb-2.5">WEIGHT (KG)</label>
                  <input name="weight" placeholder="5000" className="w-full bg-[#0a1628] border border-white/5 rounded-xl px-5 py-4 outline-none focus:border-blue-500" />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-white">
                <div>
                  <label className="block text-[11px] font-black text-[#8899BB] uppercase tracking-[0.15em] mb-2.5">VOLUME (M³)</label>
                  <input name="volume" placeholder="10" className="w-full bg-[#0a1628] border border-white/5 rounded-xl px-5 py-4 outline-none focus:border-blue-500" />
                </div>
                <div>
                  <label className="block text-[11px] font-black text-[#8899BB] uppercase tracking-[0.15em] mb-2.5">NAME</label>
                  <input name="name" required placeholder="John Doe" className="w-full bg-[#0a1628] border border-white/5 rounded-xl px-5 py-4 outline-none focus:border-blue-500" />
                </div>
              </div>
              <div className="text-white">
                <label className="block text-[11px] font-black text-[#8899BB] uppercase tracking-[0.15em] mb-2.5">EMAIL</label>
                <input name="email" type="email" required placeholder="john@company.com" className="w-full bg-[#0a1628] border border-white/5 rounded-xl px-5 py-4 outline-none focus:border-blue-500" />
              </div>
              <div className="text-white">
                <label className="block text-[11px] font-black text-[#8899BB] uppercase tracking-[0.15em] mb-2.5">MESSAGE (OPTIONAL)</label>
                <textarea name="message" rows={4} placeholder="Additional details..." className="w-full bg-[#0a1628] border border-white/5 rounded-xl px-5 py-4 outline-none focus:border-blue-500 resize-none"></textarea>
              </div>
              <button type="submit" disabled={isSubmitted} className="w-full py-6 bg-[#0052ff] hover:bg-[#003dd6] text-white font-black rounded-2xl text-xs tracking-[0.3em] uppercase transition-all">
                {isSubmitted ? 'SENT SUCCESSFULLY' : 'REQUEST QUOTE IN 24H'}
              </button>
            </form>
          </div>
        </div>
      </section>

      <footer className="py-20 bg-[#050a14] border-t border-white/5 text-center px-4 text-gray-600 text-[10px] font-bold uppercase tracking-widest">
        <p>Taikos pr. 141-305, Kaunas, Lithuania | info@tersis.lt</p>
        <p className="mt-4">© 2026 TERSIS. All rights reserved.</p>
      </footer>
    </div>
  )
}

const rootElement = document.getElementById('root')!
ReactDOM.createRoot(rootElement).render(<App />)
