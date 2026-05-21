import React, { useState, useEffect, useCallback, memo, useRef } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import {
  Truck, ArrowRight, Check, Shield, Clock, Menu, X, Phone, Mail, MapPin, 
  Zap, Globe, Lock, AlertTriangle, Handshake, Users, FileText, Home, 
  Maximize2, Sun, Moon, Languages,
} from 'lucide-react'
import { translations, type Lang } from '../lib/i18n'

export const Route = createFileRoute('/')({
  component: TersisApp,
  head: () => ({
    meta: [
      { title: 'TERSIS | Asset-Based Carrier & International Logistics Hub' },
      { name: 'description', content: 'TERSIS is a reliable European logistics partner since 2011.' },
      { property: 'og:image', content: '/logo.png' },
    ],
  }),
})

const serviceIcons = [Truck, Globe, AlertTriangle, Zap, Clock, Home, FileText, Shield]

// --- 1. ИЗОЛЯЦИЯ: ГЕРОЙ С ВИДЕО ---
const MemoHero = memo(({ t, lang, scrollToSection }: any) => (
  <section className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 relative min-h-[90vh] md:h-screen flex items-center overflow-hidden bg-[#050a14]">
    <video autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover z-0 opacity-40 pointer-events-none">
      <source src="/hero-video.mp4.mp4" type="video/mp4" />
    </video>
    <div className="absolute inset-0 bg-black/60 z-10 pointer-events-none" />
    <div className="max-w-7xl mx-auto w-full relative z-20">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div className="animate-fadeInUp text-left">
          <div className="inline-block mb-6 px-4 py-2 bg-[#0052ff]/20 border border-[#0052ff]/40 rounded-md">
            <p className="text-[#0052ff] text-sm font-bold tracking-wider">{lang === 'en' ? 'EST. 2011 • Trusted Experience' : 'ĮKURTA 2011 • Patikima patirtis'}</p>
          </div>
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black text-white mb-6 leading-[1.05] tracking-tight uppercase">
            {t.hero.title1}<br />{t.hero.title2}<br /><span className="text-[#0052ff]">{t.hero.title3}</span><br />{t.hero.title4}
          </h1>
          <p className="text-lg text-gray-200 mb-10 leading-relaxed max-w-lg font-medium">
            {lang === 'en' ? 'We operate a fleet of 27+ modern Euro 6 vehicles, specializing in high-capacity MEGA trailers (105 m³).' : 'Valdome 27+ modernių Euro 6 transporto priemonių parką, specializuojamės didelio tūrio MEGA puspriekabėmis.'}
          </p>
          <div className="flex flex-wrap gap-4">
            <button onClick={() => scrollToSection('contact')} className="bg-[#0052ff] text-white px-8 py-4 rounded-md font-bold hover:bg-[#003dd6] transition flex items-center gap-2 uppercase shadow-lg"> {t.hero.getQuote} <ArrowRight className="h-4 w-4" /></button>
          </div>
        </div>
      </div>
    </div>
  </section>
))

// --- 2. ИЗОЛЯЦИЯ: КАРТА С АНИМАЦИЕЙ ---
const MemoMap = memo(({ t }: any) => (
  <section id="coverage" className="py-24 px-4 sm:px-6 lg:px-8 border-t border-[#0052ff]/20">
    <div className="max-w-7xl mx-auto text-center">
      <h2 className="text-4xl md:text-5xl font-black text-white mb-4 uppercase">{t.coverage.title}</h2>
      <p className="text-lg text-[#0052ff] font-black tracking-[0.3em] uppercase mb-16">Europe • Baltics • Global</p>
      <div className="relative h-[400px] md:h-[650px] rounded-[30px] overflow-hidden border border-[#0052ff]/30 shadow-2xl bg-black">
        <img src="/map-hub.jpg.png" className="absolute inset-0 w-full h-full object-cover opacity-90 pointer-events-none" />
        <svg className="absolute inset-0 w-full h-full z-10 pointer-events-none" viewBox="0 0 1000 600" preserveAspectRatio="xMidYMid slice">
          <g fill="none" strokeWidth="2" strokeLinecap="round">
            <path d="M 150,230 Q 300,100 485,205" stroke="rgba(0,82,255,0.5)" strokeDasharray="1, 50"><animate attributeName="stroke-dashoffset" from="300" to="0" dur="3s" repeatCount="indefinite" /></path>
            <path d="M 850,380 Q 650,250 485,205" stroke="rgba(0,82,255,0.5)" strokeDasharray="1, 50"><animate attributeName="stroke-dashoffset" from="300" to="0" dur="2.8s" repeatCount="indefinite" /></path>
          </g>
        </svg>
      </div>
    </div>
  </section>
))

function TersisApp() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [lang, setLang] = useState<Lang>('en')
  const [isDark, setIsDark] = useState(true)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const isFocusing = useRef(false)

  const t = translations[lang]

  useEffect(() => {
    const handleScroll = () => {
      if (isFocusing.current) return
      const offset = window.scrollY > 50
      if (isScrolled !== offset) setIsScrolled(offset)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [isScrolled])

  const scrollToSection = useCallback((id: string) => {
    const element = document.getElementById(id)
    element?.scrollIntoView({ behavior: 'smooth' })
    setIsMenuOpen(false)
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

  const bg = isDark ? 'bg-[#050a14]' : 'bg-gray-50'
  const bgCard = isDark ? 'bg-[#0a1628]' : 'bg-white'
  const textPrimary = isDark ? 'text-white' : 'text-gray-900'
  const textSecondary = isDark ? 'text-gray-400' : 'text-gray-600'
  const textMuted = isDark ? 'text-gray-500' : 'text-gray-400'
  const borderColor = isDark ? 'border-[#0052ff]/20' : 'border-gray-200'
  const borderAccent = isDark ? 'border-[#0052ff]/30' : 'border-[#0052ff]/20'
  const inputBg = isDark ? 'bg-[#0a1628]' : 'bg-white'
  const navBg = isDark ? 'bg-[#050a14]/95' : 'bg-white/95'

  return (
    <div className={`min-h-screen ${bg} relative transition-colors duration-300 font-sans`}>
      {/* NAVIGATION */}
      <nav className={`fixed w-full z-50 transition-all ${isScrolled ? `${navBg} backdrop-blur-md border-b ${borderColor} shadow-sm h-16` : 'bg-transparent h-20'} flex items-center`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex justify-between items-center">
          <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="flex items-center group">
            <img src="/logo.png" className="h-10 w-10 object-contain transition-transform group-hover:scale-110" />
            <span className={`text-2xl font-black ${textPrimary} ml-2 tracking-tighter`}>TERSIS</span>
          </button>
          <div className="hidden md:flex items-center space-x-6">
            {['services', 'fleet', 'about', 'coverage', 'contact'].map((s: any) => (
              <button key={s} onClick={() => scrollToSection(s)} className={`${textSecondary} hover:text-[#0052ff] transition text-[11px] font-black uppercase tracking-widest`}>{t.nav[s]}</button>
            ))}
            <button onClick={() => setLang(lang === 'en' ? 'lt' : 'en')} className={`${textSecondary} border ${borderColor} px-3 py-1 rounded text-[10px] font-black`}>{lang.toUpperCase()}</button>
            <button onClick={() => scrollToSection('contact')} className="bg-[#0052ff] text-white px-5 py-2 hover:bg-[#003dd6] transition font-bold text-xs uppercase rounded-md tracking-wider">{t.nav.getQuote}</button>
          </div>
        </div>
      </nav>

      <MemoHero t={t} lang={lang} scrollToSection={scrollToSection} />

      {/* FLEET */}
      <section id="fleet" className={`py-24 px-4 border-t ${borderColor}`}>
        <div className="max-w-7xl mx-auto">
          <h2 className={`text-4xl md:text-5xl font-black ${textPrimary} text-center mb-16 uppercase tracking-tight`}>{t.fleet.title}</h2>
          <div className="grid md:grid-cols-2 gap-10">
            <div className={`border border-white/5 p-10 ${bgCard} rounded-3xl flex flex-col hover:border-[#0052ff]/40 transition-all`}>
              <Truck className="h-10 w-10 text-[#0052ff] mb-6" />
              <h3 className={`text-2xl font-black ${textPrimary} uppercase mb-4`}>{t.fleet.standardClass}</h3>
              <p className="text-gray-400 text-sm mb-6 uppercase font-bold tracking-widest">92 m³ Capacity • 33 Euro Pallets</p>
              <p className={`${textMuted} text-xs italic border-t border-white/5 pt-6`}>{t.fleet.standardFooter}</p>
            </div>
            <div className={`border border-[#0052ff]/30 p-10 ${bgCard} rounded-3xl flex flex-col hover:border-[#0052ff]/60 transition-all`}>
              <Maximize2 className="h-10 w-10 text-[#0052ff] mb-6" />
              <h3 className={`text-2xl font-black ${textPrimary} uppercase mb-4`}>{t.fleet.megaAdvantage}</h3>
              <p className="text-gray-400 text-sm mb-6 uppercase font-bold tracking-widest">105 m³ Capacity • 3.0m Internal Height</p>
              <p className={`${textMuted} text-xs italic border-t border-white/5 pt-6`}>{t.fleet.megaFooter}</p>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className={`py-24 px-4 border-t ${borderColor}`}>
        <div className="max-w-7xl mx-auto text-center">
          <h2 className={`text-4xl md:text-5xl font-black ${textPrimary} mb-16 uppercase`}>{t.services.title}</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {t.services.items.map((service, idx) => {
              const Icon = serviceIcons[idx] || Truck
              return (
                <div key={idx} className={`border border-white/5 p-8 ${bgCard} rounded-3xl group hover:border-[#0052ff]/60 transition-all`}>
                  <Icon className="h-10 w-10 text-[#0052ff] mb-4 mx-auto group-hover:scale-110 transition" />
                  <h3 className={`text-xs font-black ${textPrimary} mb-1 uppercase tracking-widest leading-tight`}>{service.title}</h3>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className={`py-24 px-4 border-t ${borderColor} text-center`}>
        <div className="max-w-4xl mx-auto">
          <h2 className={`text-4xl md:text-5xl font-black ${textPrimary} mb-10 uppercase`}>{t.about.title}</h2>
          <p className="text-gray-400 text-lg leading-relaxed mb-12">ETERSIS is a reliable logistics partner since 2011, operating a fleet of 27 Euro 6 vehicles. License: <span className="text-white font-bold">LIC-009666-EBKR</span>.</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {[ 
              { icon: Truck, t: 'Own Fleet' }, { icon: Shield, t: 'CMR Insured' },
              { icon: Globe, t: 'EU Network' }, { icon: Clock, t: '24/7 Support' },
              { icon: Lock, t: 'Secure' }, { icon: Users, t: 'Expert Team' },
              { icon: FileText, t: 'Docs' }, { icon: Handshake, t: 'Trusted' }
            ].map((item, idx) => (
              <div key={idx} className={`border border-white/5 p-6 ${bgCard} rounded-2xl`}>
                <item.icon className="h-6 w-6 text-[#0052ff] mb-3 mx-auto" />
                <h3 className={`text-[10px] font-black ${textPrimary} uppercase tracking-tighter`}>{item.t}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      <MemoMap t={t} />

      {/* --- FORM SECTION (ВОССТАНОВЛЕНА 1:1) --- */}
      <section id="contact" className={`py-32 px-4 bg-[#050a14]`} onFocus={() => { isFocusing.current = true }} onBlur={() => { isFocusing.current = false }}>
        <div className="max-w-4xl mx-auto">
          <div className="p-8 md:p-12 rounded-[32px] border border-[#1A2C45] shadow-2xl" style={{ background: '#0F1A2B' }}>
            <form onSubmit={handleSubmit} className="space-y-8" autoComplete="off">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-white">
                <div>
                  <label className="block text-[11px] font-black text-[#8899BB] uppercase tracking-[0.15em] mb-2.5">FROM (COUNTRY/CITY)</label>
                  <input name="from" required placeholder="Kaunas, Lithuania" className={`w-full px-5 py-4 bg-[#0a1628] rounded-xl border border-white/5 outline-none focus:border-[#0052ff] transition-colors`} />
                </div>
                <div>
                  <label className="block text-[11px] font-black text-[#8899BB] uppercase tracking-[0.15em] mb-2.5">TO (COUNTRY/CITY)</label>
                  <input name="to" required placeholder="Berlin, Germany" className={`w-full px-5 py-4 bg-[#0a1628] rounded-xl border border-white/5 outline-none focus:border-[#0052ff] transition-colors`} />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-white">
                <div>
                  <label className="block text-[11px] font-black text-[#8899BB] uppercase tracking-[0.15em] mb-2.5">CARGO TYPE</label>
                  <input name="cargoType" placeholder="Electronics, Pallets..." className={`w-full px-5 py-4 bg-[#0a1628] rounded-xl border border-white/5 outline-none focus:border-[#0052ff] transition-colors`} />
                </div>
                <div>
                  <label className="block text-[11px] font-black text-[#8899BB] uppercase tracking-[0.15em] mb-2.5">WEIGHT (KG)</label>
                  <input name="weight" placeholder="5000" className={`w-full px-5 py-4 bg-[#0a1628] rounded-xl border border-white/5 outline-none focus:border-[#0052ff] transition-colors`} />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-white">
                <div>
                  <label className="block text-[11px] font-black text-[#8899BB] uppercase tracking-[0.15em] mb-2.5">VOLUME (M³)</label>
                  <input name="volume" placeholder="10" className={`w-full px-5 py-4 bg-[#0a1628] rounded-xl border border-white/5 outline-none focus:border-[#0052ff] transition-colors`} />
                </div>
                <div>
                  <label className="block text-[11px] font-black text-[#8899BB] uppercase tracking-[0.15em] mb-2.5">NAME</label>
                  <input name="name" required placeholder="John Doe" className={`w-full px-5 py-4 bg-[#0a1628] rounded-xl border border-white/5 outline-none focus:border-[#0052ff] transition-colors`} />
                </div>
              </div>
              <div>
                <label className="block text-[11px] font-black text-[#8899BB] uppercase tracking-[0.15em] mb-2.5">EMAIL</label>
                <input name="email" type="email" required placeholder="john@company.com" className={`w-full px-5 py-4 bg-[#0a1628] rounded-xl border border-white/5 outline-none focus:border-[#0052ff] transition-colors`} />
              </div>
              <div>
                <label className="block text-[11px] font-black text-[#8899BB] uppercase tracking-[0.15em] mb-2.5">PHONE</label>
                <input name="phone" required placeholder="+370 123 45678" className={`w-full px-5 py-4 bg-[#0a1628] rounded-xl border border-white/5 outline-none focus:border-[#0052ff] transition-colors`} />
              </div>
              <div>
                <label className="block text-[11px] font-black text-[#8899BB] uppercase tracking-[0.15em] mb-2.5">MESSAGE (OPTIONAL)</label>
                <textarea name="message" rows={4} placeholder="Additional details..." className={`w-full px-5 py-4 bg-[#0a1628] rounded-xl border border-white/5 outline-none focus:border-[#0052ff] transition-colors resize-none`} />
              </div>
              <button type="submit" disabled={isSubmitted} className="w-full py-6 bg-[#0052ff] hover:bg-[#003dd6] text-white font-black rounded-2xl text-xs tracking-[0.3em] uppercase transition-all disabled:opacity-50">
                {isSubmitted ? 'SENT SUCCESS' : 'REQUEST QUOTE IN 24H'}
              </button>
            </form>
          </div>
        </div>
      </section>

      <footer className="py-20 bg-[#050a14] border-t border-white/5 text-center text-gray-600 text-[10px] font-bold uppercase tracking-[0.3em]">
        <div className="max-w-7xl mx-auto flex flex-col items-center gap-8 mb-12">
          <div className="flex items-center"><img src="/logo.png" alt="Logo" className="h-10 w-10 object-contain grayscale opacity-50" /><span className="text-2xl font-black ml-3">TERSIS</span></div>
          <p className="max-w-md mx-auto">Taikos pr. 141-305, Kaunas, Lithuania | info@tersis.lt | +370 65 955 956</p>
        </div>
        <p>© 2026 TERSIS. ALL RIGHTS RESERVED.</p>
      </footer>
    </div>
  )
}
