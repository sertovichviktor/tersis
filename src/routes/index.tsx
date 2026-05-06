import React, { useState, useEffect, useCallback, memo } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { Truck, ArrowRight, Check, Shield, Clock, Menu, X, Phone, Mail, MapPin, Globe, FileText, Maximize2, Users, Zap, AlertTriangle, Home } from 'lucide-react'
import { translations, type Lang } from '@/lib/i18n'

// --- 1. МЕМОИЗАЦИЯ ГЕРОЯ (Видео больше не будет перезагружаться при клике в форму) ---
const HeroBlock = memo(({ t, scrollToSection }: any) => (
  <section className="relative h-screen flex items-center bg-[#050a14] overflow-hidden px-4 sm:px-6 lg:px-8">
    <div className="absolute inset-0 z-0 pointer-events-none">
      <video autoPlay muted loop playsInline preload="auto" className="w-full h-full object-cover opacity-60">
        <source src="/hero-video.mp4.mp4" type="video/mp4" />
      </video>
    </div>
    <div className="relative z-10 max-w-7xl mx-auto w-full text-left">
      <div className="animate-fadeInUp">
        <h1 className="text-5xl sm:text-7xl md:text-8xl font-black text-white leading-[0.9] uppercase tracking-tighter">
          {t.hero.title1}<br />{t.hero.title2}<br />
          <span className="text-[#0052ff]">{t.hero.title3}</span>
        </h1>
        <button onClick={() => scrollToSection('contact-section-container')} className="mt-8 bg-[#0052ff] text-white px-10 py-5 rounded-xl font-black uppercase tracking-widest hover:bg-[#003dd6] shadow-2xl">
          {t.hero.getQuote} <ArrowRight className="inline ml-2" size={24} />
        </button>
      </div>
    </div>
  </section>
))

// --- 2. МЕМОИЗАЦИЯ КАРТЫ ---
const MapBlock = memo(({ t }: any) => (
  <section id="coverage" className="py-24 px-4 bg-[#050a14] border-t border-white/5 text-center">
    <h2 className="text-4xl md:text-5xl font-black text-white mb-12 uppercase">{t.coverage.title}</h2>
    <div className="relative h-[400px] md:h-[650px] rounded-[40px] overflow-hidden border border-[#0052ff]/30 bg-black">
      <img src="/map-hub.jpg.png" className="absolute inset-0 w-full h-full object-cover opacity-80 pointer-events-none" />
    </div>
  </section>
))

export const Route = createFileRoute('/')({ component: TersisApp })

const serviceIcons = [Truck, Globe, AlertTriangle, Zap, Clock, Home, FileText, Shield]

function TersisApp() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [lang, setLang] = useState<Lang>('en')
  const [isSubmitted, setIsSubmitted] = useState(false)
  const t = translations[lang]

  // Фикс бесконечной петли скролла
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY > 50
      if (isScrolled !== offset) setIsScrolled(offset)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [isScrolled])

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  }

  const handleSubmit = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitted(true);
    const data = Object.fromEntries(new FormData(e.currentTarget));
    fetch('/send.php', { method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(data) })
      .finally(() => { 
        (e.target as HTMLFormElement).reset(); 
        setTimeout(() => setIsSubmitted(false), 3000); 
      });
  }, []);

  return (
    <div className="bg-[#050a14] text-white min-h-screen font-sans overflow-x-hidden">
      
      {/* NAVIGATION */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-[#050a14]/98 border-b border-white/5' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center text-white">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo({top:0, behavior:'smooth'})}>
            <img src="/logo.png" className="h-10" alt="Logo" /><span className="text-2xl font-black tracking-tighter">TERSIS</span>
          </div>
          <div className="hidden md:flex gap-8 items-center font-bold text-xs uppercase tracking-widest">
            {['services','fleet','about','contact'].map(s => (
              <button key={s} onClick={() => scrollToSection(s === 'contact' ? 'contact-section-container' : s)} className="hover:text-[#0052ff] transition-colors">{t.nav[s as keyof typeof t.nav]}</button>
            ))}
            <button onClick={() => setLang(lang === 'en' ? 'lt' : 'en')} className="border border-white/20 px-3 py-1 rounded-md">{lang}</button>
          </div>
        </div>
      </nav>

      {/* HERO (ИЗОЛИРОВАН) */}
      <HeroBlock t={t} scrollToSection={scrollToSection} />

      {/* FLEET SECTION (ПОЛНЫЙ КОНТЕНТ) */}
      <section id="fleet" className="py-24 px-4 sm:px-6 lg:px-8 border-t border-white/5 bg-[#050a14]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-center text-4xl md:text-5xl font-black mb-20 uppercase tracking-tight">{t.fleet.title}</h2>
          <div className="grid md:grid-cols-2 gap-10 text-left">
            <div className="bg-[#0a1628] p-10 rounded-3xl border border-white/5">
              <Truck className="text-[#0052ff] mb-8" size={48} />
              <h3 className="text-3xl font-black mb-4 uppercase">{t.fleet.standardClass}</h3>
              <p className="text-gray-400 text-sm mb-4">92 m³ • 33 Euro Pallets • 13.6m Length</p>
              <p className="text-gray-500 italic text-xs pt-4 border-t border-white/5">{t.fleet.standardFooter}</p>
            </div>
            <div className="bg-[#0a1628] p-10 rounded-3xl border border-blue-500/20">
              <Maximize2 className="text-blue-500 mb-8" size={48} />
              <h3 className="text-3xl font-black text-blue-500 mb-4 uppercase">{t.fleet.megaAdvantage}</h3>
              <p className="text-gray-400 text-sm mb-4">105 m³ • 3.0m Internal Height • MEGA Specialists</p>
              <p className="text-gray-500 italic text-xs pt-4 border-t border-white/5">{t.fleet.megaFooter}</p>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES SECTION */}
      <section id="services" className="py-24 px-4 bg-[#050a14] border-t border-white/5 text-center">
        <h2 className="text-4xl font-black mb-16 uppercase">{t.services.title}</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {t.services.items.slice(0, 8).map((s:any, i:number) => (
            <div key={i} className="p-8 bg-[#0a1628] rounded-[24px] border border-white/5 hover:border-blue-500 transition-all">
              <Globe className="text-blue-500 mb-4 mx-auto" size={32} />
              <h4 className="font-black text-[11px] uppercase tracking-widest leading-tight">{s.title}</h4>
            </div>
          ))}
        </div>
      </section>

      {/* ABOUT SECTION (С ЛИЦЕНЗИЕЙ) */}
      <section id="about" className="py-24 px-4 bg-[#050a14] border-t border-white/5 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-black mb-10 uppercase">{t.about.title}</h2>
          <p className="text-gray-400 text-lg leading-relaxed mb-12">
            Reliable partner since 2011. Modern fleet of 27 Euro 6 vehicles. 
            License: <span className="text-white font-bold">LIC-009666-EBKR</span>.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
             {[{icon:Shield, l:'CMR Insured'}, {icon:Globe, l:'EU Network'}, {icon:Clock, l:'24/7 Support'}, {icon:Users, l:'Expert Team'}].map((item, i) => (
               <div key={i} className="p-6 bg-[#0a1628] rounded-xl border border-white/5">
                 <item.icon className="text-blue-500 mb-2 mx-auto" size={20} />
                 <p className="font-black text-[10px] uppercase tracking-tighter">{item.l}</p>
               </div>
             ))}
          </div>
        </div>
      </section>

      <MapBlock t={t} />

      {/* ─── ФОРМА (ПО ТВОЕМУ СКРИНШОТУ - 1:1) ─── */}
      <section id="contact-section-container" className="py-32 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="p-8 md:p-12 rounded-[32px] border border-[#1A2C45] shadow-2xl" style={{ background: '#0F1A2B' }}>
            <form onSubmit={handleSubmit} className="space-y-6" autoComplete="off">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-white">
                <div>
                  <label className="block text-[11px] font-black text-[#8899BB] uppercase tracking-[0.15em] mb-2.5">FROM (COUNTRY/CITY)</label>
                  <input name="from" required placeholder="Kaunas, Lithuania" autoComplete="one-time-code" className="w-full bg-[#0a1628] border border-white/5 rounded-xl px-5 py-4 outline-none focus:border-blue-500" />
                </div>
                <div>
                  <label className="block text-[11px] font-black text-[#8899BB] uppercase tracking-[0.15em] mb-2.5">TO (COUNTRY/CITY)</label>
                  <input name="to" required placeholder="Berlin, Germany" autoComplete="one-time-code" className="w-full bg-[#0a1628] border border-white/5 rounded-xl px-5 py-4 outline-none focus:border-blue-500" />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-white">
                <div>
                  <label className="block text-[11px] font-black text-[#8899BB] uppercase tracking-[0.15em] mb-2.5">CARGO TYPE</label>
                  <input name="cargoType" placeholder="Electronics, Pallets, etc." autoComplete="one-time-code" className="w-full bg-[#0a1628] border border-white/5 rounded-xl px-5 py-4 outline-none focus:border-blue-500" />
                </div>
                <div>
                  <label className="block text-[11px] font-black text-[#8899BB] uppercase tracking-[0.15em] mb-2.5">WEIGHT (KG)</label>
                  <input name="weight" placeholder="5000" autoComplete="one-time-code" className="w-full bg-[#0a1628] border border-white/5 rounded-xl px-5 py-4 outline-none focus:border-blue-500" />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-white">
                <div>
                  <label className="block text-[11px] font-black text-[#8899BB] uppercase tracking-[0.15em] mb-2.5">VOLUME (M³)</label>
                  <input name="volume" placeholder="10" autoComplete="one-time-code" className="w-full bg-[#0a1628] border border-white/5 rounded-xl px-5 py-4 outline-none focus:border-blue-500" />
                </div>
                <div>
                  <label className="block text-[11px] font-black text-[#8899BB] uppercase tracking-[0.15em] mb-2.5">NAME</label>
                  <input name="name" required placeholder="John Doe" autoComplete="one-time-code" className="w-full bg-[#0a1628] border border-white/5 rounded-xl px-5 py-4 outline-none focus:border-blue-500" />
                </div>
              </div>
              <div>
                <label className="block text-[11px] font-black text-[#8899BB] uppercase tracking-[0.15em] mb-2.5">EMAIL</label>
                <input name="email" type="email" required placeholder="john@company.com" autoComplete="one-time-code" className="w-full bg-[#0a1628] border border-white/5 rounded-xl px-5 py-4 outline-none focus:border-blue-500" />
              </div>
              <div>
                <label className="block text-[11px] font-black text-[#8899BB] uppercase tracking-[0.15em] mb-2.5">PHONE</label>
                <input name="phone" required placeholder="+370 123 45678" autoComplete="one-time-code" className="w-full bg-[#0a1628] border border-white/5 rounded-xl px-5 py-4 outline-none focus:border-blue-500" />
              </div>
              <div>
                <label className="block text-[11px] font-black text-[#8899BB] uppercase tracking-[0.15em] mb-2.5">MESSAGE (OPTIONAL)</label>
                <textarea name="message" rows={4} placeholder="Additional details..." className="w-full bg-[#0a1628] border border-white/5 rounded-xl px-5 py-4 outline-none focus:border-blue-500 resize-none" />
              </div>
              <button type="submit" disabled={isSubmitted} className="w-full py-6 bg-[#0052ff] hover:bg-[#003dd6] text-white font-black rounded-2xl text-xs tracking-[0.3em] uppercase transition-all active:scale-[0.98] disabled:opacity-50">
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
