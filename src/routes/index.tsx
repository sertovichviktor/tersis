import React, { useState, useEffect, useCallback, memo } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import {
  Truck, ArrowRight, Check, Shield, Clock, Menu, X, Phone, Mail, MapPin, 
  Zap, Globe, Lock, AlertTriangle, Handshake, Users, FileText, Home, Maximize2, Sun, Moon, Languages
} from 'lucide-react'
import { translations, type Lang } from '@/lib/i18n'

// --- 1. ИЗОЛЯЦИЯ: ГЕРОЙ С ВИДЕО ---
const MemoHero = memo(({ t, scrollToSection }: any) => (
  <section className="relative h-screen flex items-center bg-[#050a14] overflow-hidden px-4 sm:px-6 lg:px-8">
    <div className="absolute inset-0 z-0 pointer-events-none">
      <video autoPlay muted loop playsInline preload="auto" className="w-full h-full object-cover opacity-60">
        <source src="/hero-video.mp4.mp4" type="video/mp4" />
      </video>
    </div>
    <div className="absolute inset-0 bg-black/50 z-10 pointer-events-none" />
    <div className="relative z-20 max-w-7xl mx-auto w-full">
      <div className="animate-fadeInUp text-left">
        <div className="inline-block mb-6 px-4 py-2 bg-[#0052ff]/20 border border-[#0052ff]/40 rounded-md">
          <p className="text-[#0052ff] text-xs font-bold tracking-widest uppercase">EST. 2011 • Trusted Experience</p>
        </div>
        <h1 className="text-5xl sm:text-7xl md:text-8xl font-black text-white mb-6 leading-[0.9] uppercase tracking-tighter">
          {t.hero.title1}<br />{t.hero.title2}<br />
          <span className="text-[#0052ff]">{t.hero.title3}</span>
        </h1>
        <button onClick={() => scrollToSection('contact-section-isolated')} className="bg-[#0052ff] text-white px-10 py-5 rounded-xl font-black uppercase tracking-widest hover:bg-[#003dd6] transition-all flex items-center gap-3 shadow-2xl">
          {t.hero.getQuote} <ArrowRight size={22} />
        </button>
      </div>
    </div>
  </section>
))

// --- 2. ИЗОЛЯЦИЯ: КАРТА ---
const MemoMap = memo(() => (
  <div className="relative h-[400px] md:h-[650px] rounded-[30px] md:rounded-[40px] overflow-hidden border border-[#0052ff]/30 shadow-2xl bg-black">
    <img src="/map-hub.jpg.png" alt="Map" className="absolute inset-0 w-full h-full object-cover opacity-80 pointer-events-none" />
    <svg className="absolute inset-0 w-full h-full z-10 pointer-events-none" viewBox="0 0 1000 600" preserveAspectRatio="xMidYMid slice">
      <path d="M 150,230 Q 300,100 485,205" stroke="rgba(0,82,255,0.4)" strokeWidth="2" fill="none" strokeDasharray="1, 50">
        <animate attributeName="stroke-dashoffset" from="300" to="0" dur="3s" repeatCount="indefinite" />
      </path>
    </svg>
  </div>
))

export const Route = createFileRoute('/')({ component: TersisApp })

const serviceIcons = [Truck, Globe, AlertTriangle, Zap, Clock, Home, FileText, Shield]

function TersisApp() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [lang, setLang] = useState<Lang>('en')
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

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    element?.scrollIntoView({ behavior: 'smooth' })
    setIsMenuOpen(false)
  }

  return (
    <div className="min-h-screen bg-[#050a14] text-white overflow-x-hidden">
      
      {/* ─── NAVIGATION ─── */}
      <nav className={`fixed w-full z-50 transition-all ${isScrolled ? 'bg-[#050a14]/95 border-b border-white/5 backdrop-blur-md' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-20">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <img src="/logo.png" className="h-10 w-10 object-contain" />
            <span className="text-2xl font-black text-white ml-2">TERSIS</span>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            {['services', 'fleet', 'about', 'contact'].map((s) => (
              <button key={s} onClick={() => scrollToSection(s === 'contact' ? 'contact-section-isolated' : s)} className="text-gray-400 hover:text-white text-xs font-bold uppercase tracking-widest">
                {t.nav[s as keyof typeof t.nav]}
              </button>
            ))}
            <button onClick={() => setLang(lang === 'en' ? 'lt' : 'en')} className="text-white text-xs font-bold uppercase border border-white/20 px-3 py-1 rounded">
              {lang === 'en' ? 'LT' : 'EN'}
            </button>
          </div>
          <button className="md:hidden text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
        {isMenuOpen && (
          <div className="md:hidden bg-[#050a14] border-t border-white/5 p-8 space-y-4">
            {['services', 'fleet', 'about', 'contact'].map((s) => (
              <button key={s} onClick={() => scrollToSection(s === 'contact' ? 'contact-section-isolated' : s)} className="block w-full text-left text-gray-400 text-lg font-bold uppercase">{t.nav[s as keyof typeof t.nav]}</button>
            ))}
          </div>
        )}
      </nav>

      {/* ─── HERO ─── */}
      <MemoHero t={t} scrollToSection={scrollToSection} />

      {/* ─── FLEET (ПОЛНЫЕ ДАННЫЕ) ─── */}
      <section id="fleet" className="py-24 px-4 sm:px-6 lg:px-8 border-t border-white/5 bg-[#050a14]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-center text-4xl md:text-5xl font-black text-white mb-20 uppercase tracking-tight">{t.fleet.title}</h2>
          <div className="grid md:grid-cols-2 gap-10 text-left">
            <div className="bg-[#0a1628] p-10 rounded-3xl border border-white/5">
              <Truck className="text-[#0052ff] mb-8" size={48} />
              <h3 className="text-3xl font-black text-white mb-4 uppercase">{t.fleet.standardClass}</h3>
              <p className="text-gray-400 text-sm italic mb-6">{t.fleet.standardFooter}</p>
              <div className="space-y-2 text-xs font-bold text-gray-500 uppercase tracking-widest">
                <p>• 92 m³ Capacity</p><p>• 33 Euro Pallets</p><p>• 13.6m Length</p>
              </div>
            </div>
            <div className="bg-[#0a1628] p-10 rounded-3xl border border-[#0052ff]/30">
              <Maximize2 className="text-[#0052ff] mb-8" size={48} />
              <h3 className="text-3xl font-black text-[#0052ff] mb-4 uppercase">{t.fleet.megaAdvantage}</h3>
              <p className="text-gray-400 text-sm italic mb-6">{t.fleet.megaFooter}</p>
              <div className="space-y-2 text-xs font-bold text-gray-500 uppercase tracking-widest">
                <p>• 105 m³ Capacity</p><p>• 3.0m Internal Height</p><p>• MEGA specialization</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── SERVICES (ВСЕ 8 ПУНКТОВ) ─── */}
      <section id="services" className="py-24 px-4 bg-[#050a14] border-t border-white/5">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-16 uppercase">{t.services.title}</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {t.services.items.slice(0,8).map((s: any, i: number) => {
              const Icon = serviceIcons[i] || Truck;
              return (
                <div key={i} className="p-8 bg-[#0a1628] rounded-[24px] border border-white/5 hover:border-[#0052ff] transition-all">
                  <Icon className="text-[#0052ff] mb-4 mx-auto" size={32} />
                  <h4 className="text-white font-black text-[11px] uppercase tracking-widest leading-tight">{s.title}</h4>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ─── ABOUT (ПОЛНЫЙ ТЕКСТ + LIC-009666-EBKR) ─── */}
      <section id="about" className="py-24 px-4 bg-[#050a14] border-t border-white/5 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-black text-white mb-10 uppercase">{t.about.title}</h2>
          <p className="text-gray-400 text-lg leading-relaxed mb-12">
            TERSIS is a reliable logistics partner since 2011. Modern fleet of 27 Euro 6 vehicles. 
            License: <span className="text-white font-bold">LIC-009666-EBKR</span>.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
             {[{icon:Shield, l:'CMR Insured'}, {icon:Globe, l:'EU Network'}, {icon:Clock, l:'24/7 Support'}, {icon:Users, l:'Team'}].map((item, i) => (
               <div key={i} className="p-6 bg-[#0a1628] rounded-xl border border-white/5">
                 <item.icon className="text-[#0052ff] mb-3 mx-auto" size={24} />
                 <p className="text-white font-black text-[10px] uppercase tracking-widest">{item.l}</p>
               </div>
             ))}
          </div>
        </div>
      </section>

      {/* ─── COVERAGE ─── */}
      <section id="coverage" className="py-24 px-4 bg-[#050a14] border-t border-white/5 text-center">
        <h2 className="text-4xl md:text-5xl font-black text-white mb-16 uppercase">{t.coverage.title}</h2>
        <MemoMap />
      </section>

      {/* ─── ФОРМА (ТОЧНО ПО СКРИНШОТУ: 9 ПОЛЕЙ) ─── */}
      <section id="contact-section-isolated" className="py-32 px-4 sm:px-6 lg:px-8 bg-[#050a14]">
        <div className="max-w-4xl mx-auto">
          <div className="p-8 md:p-12 rounded-[32px] border border-[#1A2C45]" style={{ background: '#0F1A2B' }}>
            <form onSubmit={handleSubmit} className="space-y-6" autoComplete="off">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-white">
                <div>
                  <label className="block text-[11px] font-black text-[#8899BB] uppercase tracking-[0.15em] mb-2.5">FROM (COUNTRY/CITY)</label>
                  <input name="from" required placeholder="Kaunas, Lithuania" className="w-full bg-[#0a1628] border border-white/5 rounded-xl px-5 py-4 outline-none focus:border-blue-500" />
                </div>
                <div>
                  <label className="block text-[11px] font-black text-[#8899BB] uppercase tracking-[0.15em] mb-2.5">TO (COUNTRY/CITY)</label>
                  <input name="to" required placeholder="Berlin, Germany" className="w-full bg-[#0a1628] border border-white/5 rounded-xl px-5 py-4 outline-none focus:border-blue-500" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-white">
                <div>
                  <label className="block text-[11px] font-black text-[#8899BB] uppercase tracking-[0.15em] mb-2.5">CARGO TYPE</label>
                  <input name="cargoType" placeholder="Electronics, Pallets, etc." className="w-full bg-[#0a1628] border border-white/5 rounded-xl px-5 py-4 outline-none focus:border-blue-500" />
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
                <label className="block text-[11px] font-black text-[#8899BB] uppercase tracking-[0.15em] mb-2.5">PHONE</label>
                <input name="phone" required placeholder="+370 123 45678" className="w-full bg-[#0a1628] border border-white/5 rounded-xl px-5 py-4 outline-none focus:border-blue-500" />
              </div>

              <div className="text-white">
                <label className="block text-[11px] font-black text-[#8899BB] uppercase tracking-[0.15em] mb-2.5">MESSAGE (OPTIONAL)</label>
                <textarea name="message" rows={4} placeholder="Additional details..." className="w-full bg-[#0a1628] border border-white/5 rounded-xl px-5 py-4 outline-none focus:border-blue-500 resize-none"></textarea>
              </div>

              <button type="submit" disabled={isSubmitted} className="w-full py-6 bg-[#0052ff] hover:bg-[#003dd6] text-white font-black rounded-2xl text-xs tracking-[0.3em] uppercase transition-colors disabled:opacity-50">
                {isSubmitted ? 'SENT SUCCESSFULLY' : 'REQUEST QUOTE IN 24H'}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer className="py-20 bg-[#050a14] border-t border-white/5 text-center px-4 text-gray-600 text-[10px] font-bold uppercase tracking-widest">
        <div className="flex flex-col items-center gap-6 mb-8">
          <img src="/logo.png" className="h-8 grayscale opacity-50" />
          <p>Taikos pr. 141-305, Kaunas, Lithuania | +370 65 955 956 | info@tersis.lt</p>
        </div>
        © 2026 TERSIS. All rights reserved.
      </footer>
    </div>
  )
}
