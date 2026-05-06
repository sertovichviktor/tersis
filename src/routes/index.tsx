import React, { useState, useEffect, useCallback, memo } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { Truck, ArrowRight, Check, Shield, Clock, Menu, X, Phone, Mail, MapPin, Globe, FileText, Maximize2 } from 'lucide-react'
import { translations, type Lang } from '@/lib/i18n'

// --- 1. ИЗОЛЯЦИЯ: ВИДЕО (Замораживаем) ---
const HeroBlock = memo(({ t, scrollToSection }: any) => (
  <section className="relative h-screen flex items-center bg-[#050a14] overflow-hidden px-6">
    <div className="absolute inset-0 z-0 pointer-events-none">
      <video autoPlay muted loop playsInline preload="auto" className="w-full h-full object-cover opacity-60">
        <source src="/hero-video.mp4.mp4" type="video/mp4" />
      </video>
    </div>
    <div className="relative z-10 max-w-7xl mx-auto w-full">
      <h1 className="text-6xl md:text-8xl font-black text-white leading-[0.85] uppercase mb-8">
        {t.hero.title1}<br/>{t.hero.title2}<br/><span className="text-[#0052ff]">{t.hero.title3}</span>
      </h1>
      <button onClick={() => scrollToSection('contact')} className="bg-[#0052ff] text-white px-10 py-5 rounded-lg font-black text-sm uppercase tracking-widest hover:bg-[#003dd6] transition-colors shadow-2xl">
        {t.hero.getQuote}
      </button>
    </div>
  </section>
))

// --- 2. ИЗОЛЯЦИЯ: КАРТА ---
const MapBlock = memo(() => (
  <div className="relative h-[400px] md:h-[600px] rounded-[40px] overflow-hidden border border-white/5 bg-black">
    <img src="/map-hub.jpg.png" className="w-full h-full object-cover opacity-50 pointer-events-none" />
  </div>
))

export const Route = createFileRoute('/')({ component: TersisApp })

function TersisApp() {
  const [lang, setLang] = useState<Lang>('en')
  const [isScrolled, setIsScrolled] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const t = translations[lang]

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
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

  const scrollToSection = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <div className="min-h-screen bg-[#050a14] text-white">
      {/* NAVIGATION */}
      <nav className={`fixed w-full z-50 p-6 transition-all ${isScrolled ? 'bg-[#050a14]/98 border-b border-white/5' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo({top:0, behavior:'smooth'})}>
            <img src="/logo.png" className="h-10" /><span className="text-2xl font-black">TERSIS</span>
          </div>
          <button onClick={() => setLang(lang === 'en' ? 'lt' : 'en')} className="border border-white/20 px-4 py-1 rounded text-xs font-bold uppercase">{lang}</button>
        </div>
      </nav>

      <HeroBlock t={t} scrollToSection={scrollToSection} />

      {/* ОСТАЛЬНЫЕ СЕКЦИИ (Fleet, About...) */}
      <section className="py-24 px-6 bg-[#050a14] border-t border-white/5 text-center text-gray-400">
        <h2 className="text-4xl font-black text-white mb-8 uppercase">{t.fleet.title}</h2>
        <p>Asset-based carrier with own fleet of 27 Euro 6 vehicles.</p>
      </section>

      <section className="py-24 px-6 bg-[#050a14] border-t border-white/5"><MapBlock /></section>

      {/* --- ФИНАЛЬНАЯ ФОРМА (ПО ТВОЕМУ СКРИНШОТУ) --- */}
      <section id="contact" className="py-32 px-6 bg-[#050a14]">
        <div className="max-w-4xl mx-auto" id="contact-section-container">
          <div className="p-8 md:p-12 rounded-3xl border border-white/5" style={{ background: '#0F1A2B' }}>
            <form onSubmit={handleSubmit} className="space-y-8">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <label className="block text-[10px] font-black text-gray-500 uppercase tracking-widest mb-3">FROM (COUNTRY/CITY)</label>
                  <input name="from" required placeholder="Kaunas, Lithuania" className="w-full bg-[#0a1628] border border-white/5 rounded-xl px-5 py-4 text-white text-sm outline-none focus:border-blue-500" />
                </div>
                <div>
                  <label className="block text-[10px] font-black text-gray-500 uppercase tracking-widest mb-3">TO (COUNTRY/CITY)</label>
                  <input name="to" required placeholder="Berlin, Germany" className="w-full bg-[#0a1628] border border-white/5 rounded-xl px-5 py-4 text-white text-sm outline-none focus:border-blue-500" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <label className="block text-[10px] font-black text-gray-500 uppercase tracking-widest mb-3">CARGO TYPE</label>
                  <input name="cargoType" placeholder="Electronics, Pallets, etc." className="w-full bg-[#0a1628] border border-white/5 rounded-xl px-5 py-4 text-white text-sm outline-none focus:border-blue-500" />
                </div>
                <div>
                  <label className="block text-[10px] font-black text-gray-500 uppercase tracking-widest mb-3">WEIGHT (KG)</label>
                  <input name="weight" placeholder="5000" className="w-full bg-[#0a1628] border border-white/5 rounded-xl px-5 py-4 text-white text-sm outline-none focus:border-blue-500" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <label className="block text-[10px] font-black text-gray-500 uppercase tracking-widest mb-3">VOLUME (M³)</label>
                  <input name="volume" placeholder="10" className="w-full bg-[#0a1628] border border-white/5 rounded-xl px-5 py-4 text-white text-sm outline-none focus:border-blue-500" />
                </div>
                <div>
                  <label className="block text-[10px] font-black text-gray-500 uppercase tracking-widest mb-3">NAME</label>
                  <input name="name" required placeholder="John Doe" className="w-full bg-[#0a1628] border border-white/5 rounded-xl px-5 py-4 text-white text-sm outline-none focus:border-blue-500" />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-black text-gray-500 uppercase tracking-widest mb-3">EMAIL</label>
                <input name="email" type="email" required placeholder="john@company.com" className="w-full bg-[#0a1628] border border-white/5 rounded-xl px-5 py-4 text-white text-sm outline-none focus:border-blue-500" />
              </div>

              <div>
                <label className="block text-[10px] font-black text-gray-500 uppercase tracking-widest mb-3">PHONE</label>
                <input name="phone" required placeholder="+370 123 45678" className="w-full bg-[#0a1628] border border-white/5 rounded-xl px-5 py-4 text-white text-sm outline-none focus:border-blue-500" />
              </div>

              <div>
                <label className="block text-[10px] font-black text-gray-500 uppercase tracking-widest mb-3">MESSAGE (OPTIONAL)</label>
                <textarea name="message" rows={4} placeholder="Additional details..." className="w-full bg-[#0a1628] border border-white/5 rounded-xl px-5 py-4 text-white text-sm outline-none focus:border-blue-500 resize-none" />
              </div>

              <button type="submit" disabled={isSubmitted} className="w-full py-5 bg-[#0052ff] hover:bg-[#003dd6] text-white font-black rounded-xl text-xs tracking-[0.3em] uppercase transition-colors disabled:opacity-50">
                {isSubmitted ? 'SENT SUCCESSFULLY' : 'REQUEST QUOTE IN 24H'}
              </button>
            </form>
          </div>
        </div>
      </section>

      <footer className="py-20 bg-[#050a14] border-t border-white/5 text-center px-4">
        <p className="text-gray-600 text-[10px] font-bold uppercase tracking-widest">© 2026 TERSIS. All rights reserved.</p>
      </footer>
    </div>
  )
}
