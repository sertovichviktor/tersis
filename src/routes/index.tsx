import React, { useState, useEffect, useCallback, memo } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { Truck, ArrowRight, Globe, Shield, Clock, Maximize2, Menu, X, Phone, Mail, MapPin } from 'lucide-react'
import { translations, type Lang } from '@/lib/i18n'

// --- ИЗОЛЯЦИЯ: ВИДЕО (Заморозка) ---
const HeroVideo = memo(({ t, scrollTo }: any) => (
  <section className="relative h-screen flex items-center bg-[#050a14] overflow-hidden px-6">
    <div className="absolute inset-0 z-0 pointer-events-none">
      <video autoPlay muted loop playsInline preload="auto" className="w-full h-full object-cover opacity-60">
        <source src="/hero-video.mp4.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-black/50" />
    </div>
    <div className="relative z-10 max-w-7xl mx-auto w-full">
      <h1 className="text-6xl md:text-8xl font-black text-white leading-[0.9] uppercase mb-8">
        {t.hero.title1}<br/>{t.hero.title2}<br/><span className="text-[#0052ff]">{t.hero.title3}</span>
      </h1>
      <button onClick={() => scrollTo('contact-section')} className="bg-[#0052ff] text-white px-10 py-5 rounded-lg font-black text-sm uppercase tracking-widest hover:bg-[#003dd6] transition-colors shadow-2xl">
        {t.hero.getQuote} <ArrowRight className="inline ml-2" />
      </button>
    </div>
  </section>
))

export const Route = createFileRoute('/')({
  component: TersisApp,
})

function TersisApp() {
  const [lang, setLang] = useState<Lang>('en')
  const [isScrolled, setIsScrolled] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const t = translations[lang]

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY > 50
      if (isScrolled !== offset) setIsScrolled(offset)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [isScrolled])

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

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
      <nav className={`fixed w-full z-50 p-6 transition-all ${isScrolled ? 'bg-[#050a14]/98 border-b border-white/5' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto flex justify-between items-center px-6">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo({top:0, behavior:'smooth'})}>
            <img src="/logo.png" className="h-10" />
            <span className="text-2xl font-black">TERSIS</span>
          </div>
          <div className="hidden md:flex gap-8">
            {['services','fleet','about','contact'].map(s => (
              <button key={s} onClick={() => scrollTo(s === 'contact' ? 'contact-section' : s)} className="text-gray-400 hover:text-white font-bold uppercase text-[10px] tracking-widest">{t.nav[s as keyof typeof t.nav]}</button>
            ))}
            <button onClick={() => setLang(lang === 'en' ? 'lt' : 'en')} className="border border-white/20 px-3 py-1 rounded text-[10px] font-bold uppercase">{lang}</button>
          </div>
        </div>
      </nav>

      <HeroVideo t={t} scrollTo={scrollTo} />

      {/* --- FLEET SECTION --- */}
      <section id="fleet" className="py-24 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-center text-4xl md:text-5xl font-black mb-16 uppercase">{t.fleet.title}</h2>
          <div className="grid md:grid-cols-2 gap-10">
            <div className="bg-[#0a1628] p-10 rounded-3xl border border-white/5 shadow-xl">
              <Truck className="text-blue-500 mb-6" size={40} />
              <h3 className="text-2xl font-black mb-4 uppercase">{t.fleet.standardClass}</h3>
              <p className="text-gray-400 text-sm">92 m³ • 33 Euro Pallets • 13.6 m</p>
              <p className="text-gray-500 italic text-xs mt-6">{t.fleet.standardFooter}</p>
            </div>
            <div className="bg-[#0a1628] p-10 rounded-3xl border border-blue-500/20 shadow-xl">
              <Maximize2 className="text-blue-500 mb-6" size={40} />
              <h3 className="text-2xl font-black mb-4 uppercase text-blue-500">{t.fleet.megaAdvantage}</h3>
              <p className="text-gray-400 text-sm">105 m³ • 3.0 m Height • MEGA High Volume</p>
              <p className="text-gray-500 italic text-xs mt-6">{t.fleet.megaFooter}</p>
            </div>
          </div>
        </div>
      </section>

      {/* --- SERVICES --- */}
      <section id="services" className="py-24 px-6 border-t border-white/5 text-center">
        <h2 className="text-4xl font-black mb-16 uppercase">{t.services.title}</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {t.services.items.slice(0, 8).map((s: any, i: number) => (
            <div key={i} className="p-8 bg-[#0a1628] rounded-2xl border border-white/5 hover:border-blue-500 transition-colors">
              <Globe className="text-blue-500 mb-4 mx-auto" size={32} />
              <h4 className="font-black text-[11px] uppercase tracking-widest leading-tight">{s.title}</h4>
            </div>
          ))}
        </div>
      </section>

      {/* --- FORM SECTION (ВОССТАНОВЛЕН ПО ТВОЕМУ СКРИНШОТУ) --- */}
      <section id="contact-section" className="py-32 px-6 bg-[#050a14]">
        <div className="max-w-4xl mx-auto">
          <div className="p-8 md:p-12 rounded-[32px] border border-[#1A2C45] shadow-2xl" style={{ background: '#0F1A2B' }}>
            <form onSubmit={handleSubmit} className="space-y-8" autoComplete="off">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-white">
                <div>
                  <label className="block text-[11px] font-black text-[#8899BB] uppercase tracking-[0.15em] mb-2.5">FROM (COUNTRY/CITY)</label>
                  <input name="from" required placeholder="Kaunas, Lithuania" className="w-full bg-[#0a1628] border border-white/5 rounded-xl px-5 py-4 text-white text-sm outline-none focus:border-blue-500" />
                </div>
                <div>
                  <label className="block text-[11px] font-black text-[#8899BB] uppercase tracking-[0.15em] mb-2.5">TO (COUNTRY/CITY)</label>
                  <input name="to" required placeholder="Berlin, Germany" className="w-full bg-[#0a1628] border border-white/5 rounded-xl px-5 py-4 text-white text-sm outline-none focus:border-blue-500" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-white">
                <div>
                  <label className="block text-[11px] font-black text-[#8899BB] uppercase tracking-[0.15em] mb-2.5">CARGO TYPE</label>
                  <input name="cargoType" placeholder="Electronics, Pallets..." className="w-full bg-[#0a1628] border border-white/5 rounded-xl px-5 py-4 text-white text-sm outline-none focus:border-blue-500" />
                </div>
                <div>
                  <label className="block text-[11px] font-black text-[#8899BB] uppercase tracking-[0.15em] mb-2.5">WEIGHT (KG)</label>
                  <input name="weight" placeholder="5000" className="w-full bg-[#0a1628] border border-white/5 rounded-xl px-5 py-4 text-white text-sm outline-none focus:border-blue-500" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-white">
                <div>
                  <label className="block text-[11px] font-black text-[#8899BB] uppercase tracking-[0.15em] mb-2.5">VOLUME (M³)</label>
                  <input name="volume" placeholder="10" className="w-full bg-[#0a1628] border border-white/5 rounded-xl px-5 py-4 text-white text-sm outline-none focus:border-blue-500" />
                </div>
                <div>
                  <label className="block text-[11px] font-black text-[#8899BB] uppercase tracking-[0.15em] mb-2.5">NAME</label>
                  <input name="name" required placeholder="John Doe" className="w-full bg-[#0a1628] border border-white/5 rounded-xl px-5 py-4 text-white text-sm outline-none focus:border-blue-500" />
                </div>
              </div>

              <div className="text-white">
                <label className="block text-[11px] font-black text-[#8899BB] uppercase tracking-[0.15em] mb-2.5">EMAIL</label>
                <input name="email" type="email" required placeholder="john@company.com" className="w-full bg-[#0a1628] border border-white/5 rounded-xl px-5 py-4 text-white text-sm outline-none focus:border-blue-500" />
              </div>

              <button type="submit" disabled={isSubmitted} className="w-full py-6 bg-[#0052ff] hover:bg-[#003dd6] text-white font-black rounded-2xl text-xs tracking-[0.3em] uppercase transition-all">
                {isSubmitted ? 'SENT SUCCESS' : 'REQUEST QUOTE IN 24H'}
              </button>
            </form>
          </div>
        </div>
      </section>

      <footer className="py-20 text-center text-gray-600 text-[10px] font-bold uppercase tracking-widest border-t border-white/5">
        © 2026 TERSIS. All rights reserved.
      </footer>
    </div>
  )
}
