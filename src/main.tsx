import React, { useState, useEffect, useCallback, memo, useRef } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import {
  Truck, ArrowRight, Check, Shield, Clock, Menu, X, Phone, Mail, MapPin, 
  Zap, Globe, Lock, AlertTriangle, Handshake, Users, FileText, Home, 
  Maximize2, Sun, Moon, Languages,
} from 'lucide-react'
import { translations, type Lang } from '@/lib/i18n'

// --- 1. ИЗОЛЯЦИЯ: ВИДЕО (Замораживаем, чтобы не вешало сайт при фокусе) ---
const MemoHero = memo(({ t, lang, scrollToSection }: any) => (
  <section className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 relative min-h-[90vh] md:h-screen flex items-center overflow-hidden bg-[#050a14]">
    <video autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none opacity-60">
      <source src="/hero-video.mp4.mp4" type="video/mp4" />
    </video>
    <div className="absolute inset-0 bg-black/60 z-10 pointer-events-none" />
    <div className="max-w-7xl mx-auto w-full relative z-20">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div className="animate-fadeInUp text-left">
          <div className="inline-block mb-6 px-4 py-2 bg-[#0052ff]/20 border border-[#0052ff]/40 rounded-md">
            <p className="text-[#0052ff] text-sm font-bold tracking-wider">
              {lang === 'en' ? 'EST. 2011 • Trusted Experience' : 'ĮKURTA 2011 • Patikima patirtis'}
            </p>
          </div>
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black text-white mb-6 leading-[1.05] tracking-tight uppercase">
            {t.hero.title1}<br />{t.hero.title2}<br />
            <span className="text-[#0052ff]">{t.hero.title3}</span><br />{t.hero.title4}
          </h1>
          <p className="text-lg text-gray-200 mb-10 leading-relaxed max-w-lg font-medium">
            {lang === 'en' 
              ? 'We operate a fleet of 27+ modern Euro 6 vehicles, specializing in high-capacity MEGA trailers (105 m³) and delivering reliable standard transport solutions worldwide.' 
              : 'Valdome 27+ modernių Euro 6 transporto priemonių parką, specializuojamės didelio tūrio MEGA puspriekabėmis (105 m³) ir teikiame patikimus standartinio transporto spредimus visame pasaulyje.'}
          </p>
          <div className="flex flex-wrap gap-4">
            <button onClick={() => scrollToSection('contact')} className="bg-[#0052ff] text-white px-8 py-4 rounded-md text-base font-bold hover:bg-[#003dd6] transition flex items-center gap-2 uppercase tracking-wide shadow-lg">
              {t.hero.getQuote} <ArrowRight className="h-4 w-4" />
            </button>
            <button onClick={() => scrollToSection('fleet')} className="border-2 border-white/20 text-white hover:bg-white/10 px-8 py-4 rounded-md text-base font-bold transition uppercase tracking-wide">
              {t.hero.fleetDetails}
            </button>
          </div>
        </div>
        <div className="flex flex-col gap-4 md:gap-6 items-start md:items-end">
           <div className="bg-white/5 backdrop-blur-md border border-white/10 p-6 md:p-8 rounded-xl w-full max-w-[340px]">
              <Truck className="h-8 w-8 md:h-10 md:w-10 text-[#0052ff] mb-4" />
              <p className="text-4xl md:text-5xl font-black text-white mb-1 leading-none uppercase">27+</p>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">{lang === 'en' ? 'Own Vehicles' : 'Nuosavas transportas'}</p>
           </div>
           <div className="bg-white/5 backdrop-blur-md border border-white/10 p-6 md:p-8 rounded-xl w-full max-w-[340px]">
              <FileText className="h-8 w-8 md:h-10 md:w-10 text-[#0052ff] mb-4" />
              <p className="text-lg md:text-xl font-black text-white mb-1 uppercase tracking-tight">LIC-009666-EBKR</p>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{lang === 'en' ? 'EU Transport License' : 'ES transporto licencija'}</p>
           </div>
        </div>
      </div>
    </div>
  </section>
))

// --- 2. ИЗОЛЯЦИЯ: КАРТА ---
const MemoMap = memo(({ t }: any) => (
  <div className="relative h-[400px] md:h-[650px] rounded-[30px] md:rounded-[40px] overflow-hidden border border-[#0052ff]/30 shadow-2xl bg-black">
    <img src="/map-hub.jpg.png" alt="Tersis Global Hub" className="absolute inset-0 w-full h-full object-cover opacity-90 pointer-events-none" />
    <svg className="absolute inset-0 w-full h-full z-10 pointer-events-none" viewBox="0 0 1000 600" preserveAspectRatio="xMidYMid slice">
      <path d="M 150,230 Q 300,100 485,205" stroke="rgba(0,82,255,0.4)" strokeWidth="2" fill="none" strokeDasharray="1, 50">
        <animate attributeName="stroke-dashoffset" from="300" to="0" dur="3s" repeatCount="indefinite" />
      </path>
      <path d="M 220,480 Q 350,300 485,205" stroke="rgba(0,82,255,0.4)" strokeWidth="2" fill="none" strokeDasharray="1, 50">
        <animate attributeName="stroke-dashoffset" from="300" to="0" dur="3.5s" repeatCount="indefinite" />
      </path>
    </svg>
  </div>
))

export const Route = createFileRoute('/')({
  component: TersisApp,
  head: () => ({
    meta: [
      { title: 'TERSIS | Asset-Based Carrier & International Logistics Hub' },
      { property: 'og:image', content: '/logo.png' },
    ],
  }),
})

const serviceIcons = [Truck, Globe, AlertTriangle, Zap, Clock, Home, FileText, Shield]

function TersisApp() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [lang, setLang] = useState<Lang>('en')
  const [isDark, setIsDark] = useState(true)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const isFocusing = useRef(false); // Блокировщик ререндера

  const t = translations[lang]

  useEffect(() => {
    const handleScroll = () => {
      if (isFocusing.current) return;
      const offset = window.scrollY > 50;
      if (isScrolled !== offset) setIsScrolled(offset);
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [isScrolled])

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark)
  }, [isDark])

  const scrollToSection = useCallback((id: string) => {
    const element = document.getElementById(id)
    element?.scrollIntoView({ behavior: 'smooth' })
    setIsMenuOpen(false)
  }, [])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    setIsSubmitted(true);

    try {
      await fetch('/send.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      form.reset();
      setTimeout(() => setIsSubmitted(false), 3000);
    } catch (error) {
      console.error(error);
      setIsSubmitted(false);
    }
  };

  const textPrimary = isDark ? 'text-white' : 'text-gray-900'
  const textSecondary = isDark ? 'text-gray-400' : 'text-gray-600'
  const borderColor = isDark ? 'border-[#0052ff]/20' : 'border-gray-200'
  const bgCard = isDark ? 'bg-[#0a1628]' : 'bg-white'

  return (
    <div className={`min-h-screen ${isDark ? 'bg-[#050a14]' : 'bg-gray-50'} relative transition-colors duration-300 overflow-x-hidden`}>
      
      {/* NAVIGATION */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-[#050a14]/95 backdrop-blur-md border-b border-white/5' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-20">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo({top:0, behavior:'smooth'})}>
            <img src="/logo.png" className="h-10" alt="Logo" /><span className="text-white text-2xl font-black">TERSIS</span>
          </div>
          <div className="hidden md:flex gap-8 items-center">
            {['services', 'fleet', 'about', 'contact'].map(s => (
              <button key={s} onClick={() => scrollToSection(s)} className="text-gray-400 hover:text-white text-xs font-bold uppercase tracking-widest">{t.nav[s as keyof typeof t.nav]}</button>
            ))}
            <button onClick={() => setLang(lang === 'en' ? 'lt' : 'en')} className="text-white border border-white/20 px-3 py-1 rounded text-xs font-bold">{lang.toUpperCase()}</button>
          </div>
        </div>
      </nav>

      {/* HERO (Мемоизирован) */}
      <MemoHero t={t} lang={lang} scrollToSection={scrollToSection} />

      {/* FLEET SECTION (ВЕСЬ ТВОЙ ТЕКСТ ТУТ) */}
      <section id="fleet" className={`py-24 px-4 sm:px-6 lg:px-8 border-t ${borderColor}`}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className={`text-4xl md:text-5xl font-black ${textPrimary} mb-4 uppercase tracking-tight`}>{t.fleet.title}</h2>
            <p className={`text-lg ${textSecondary}`}>{t.fleet.subtitle}</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className={`border border-white/5 p-10 ${bgCard} rounded-3xl`}>
              <Truck className="h-10 w-10 text-[#0052ff] mb-6" />
              <h3 className={`text-2xl font-black ${textPrimary} uppercase mb-4`}>{t.fleet.standardClass}</h3>
              <p className="text-gray-400 text-sm mb-6">92 m³ Capacity • 33 Euro Pallets • 13.6m Length</p>
              <p className="text-gray-500 italic text-xs border-t border-white/5 pt-6">{t.fleet.standardFooter}</p>
            </div>
            <div className={`border border-[#0052ff]/30 p-10 ${bgCard} rounded-3xl`}>
              <Maximize2 className="h-10 w-10 text-[#0052ff] mb-6" />
              <h3 className={`text-2xl font-black ${textPrimary} uppercase mb-4`}>{t.fleet.megaAdvantage}</h3>
              <p className="text-gray-400 text-sm mb-6">105 m³ Capacity • 3.0m Internal Height • MEGA Specialists</p>
              <p className="text-gray-500 italic text-xs border-t border-white/5 pt-6">{t.fleet.megaFooter}</p>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES (ВСЕ 8 ПУНКТОВ) */}
      <section id="services" className={`py-24 px-4 sm:px-6 lg:px-8 border-t ${borderColor}`}>
        <div className="max-w-7xl mx-auto">
          <h2 className={`text-center text-4xl md:text-5xl font-black ${textPrimary} mb-16 uppercase`}>{t.services.title}</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {t.services.items.map((service, idx) => {
              const Icon = serviceIcons[idx] || Truck
              return (
                <div key={idx} className={`border border-white/5 p-8 ${bgCard} rounded-2xl hover:border-[#0052ff] transition-all group`}>
                  <Icon className="h-8 w-8 text-[#0052ff] mb-4 mx-auto group-hover:scale-110 transition" />
                  <h3 className={`text-[11px] font-black ${textPrimary} uppercase tracking-widest text-center`}>{service.title}</h3>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ABOUT (ПОЛНЫЙ ТЕКСТ) */}
      <section id="about" className={`py-24 px-4 sm:px-6 lg:px-8 border-t ${borderColor} text-center`}>
        <div className="max-w-4xl mx-auto">
          <h2 className={`text-4xl md:text-5xl font-black ${textPrimary} mb-10 uppercase`}>{t.about.title}</h2>
          <p className="text-gray-400 text-lg leading-relaxed mb-12">
            ETERSIS is a reliable logistics partner since 2011, operating a fleet of 27 Euro 6 vehicles. 
            Licensed carrier: <span className="text-white font-bold">LIC-009666-EBKR</span>.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
             {[{icon:Shield, l:'CMR Insured'}, {icon:Globe, l:'EU Network'}, {icon:Clock, l:'24/7 Support'}, {icon:Users, l:'Team'}].map((item, i) => (
               <div key={i} className="p-6 bg-[#0a1628] rounded-xl border border-white/5">
                 <item.icon className="text-blue-500 mb-2 mx-auto" size={20} />
                 <p className="font-black text-[10px] uppercase text-white">{item.l}</p>
               </div>
             ))}
          </div>
        </div>
      </section>

      {/* COVERAGE */}
      <section id="coverage" className="py-24 px-4 text-center">
        <h2 className="text-4xl font-black text-white mb-16 uppercase">{t.coverage.title}</h2>
        <MemoMap t={t} />
      </section>

      {/* --- КОНТАКТНАЯ ФОРМА (ВОССТАНОВЛЕНА 1:1) --- */}
      <section id="contact" className="py-32 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="p-8 md:p-12 rounded-[32px] border border-[#1A2C45] shadow-2xl" style={{ background: '#0F1A2B' }}>
            <form 
              onSubmit={handleSubmit} 
              className="space-y-6" 
              autoComplete="off"
              onFocus={() => { isFocusing.current = true }} 
              onBlur={() => { isFocusing.current = false }}
            >
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
                  <input name="cargoType" placeholder="Electronics..." className="w-full bg-[#0a1628] border border-white/5 rounded-xl px-5 py-4 outline-none focus:border-blue-500 transition-colors" />
                </div>
                <div>
                  <label className="block text-[11px] font-black text-[#8899BB] uppercase tracking-[0.15em] mb-2.5">WEIGHT (KG)</label>
                  <input name="weight" placeholder="5000" className="w-full bg-[#0a1628] border border-white/5 rounded-xl px-5 py-4 outline-none focus:border-blue-500 transition-colors" />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-white">
                <div>
                  <label className="block text-[11px] font-black text-[#8899BB] uppercase tracking-[0.15em] mb-2.5">VOLUME (M³)</label>
                  <input name="volume" placeholder="10" className="w-full bg-[#0a1628] border border-white/5 rounded-xl px-5 py-4 outline-none focus:border-blue-500 transition-colors" />
                </div>
                <div>
                  <label className="block text-[11px] font-black text-[#8899BB] uppercase tracking-[0.15em] mb-2.5">NAME</label>
                  <input name="name" required placeholder="John Doe" className="w-full bg-[#0a1628] border border-white/5 rounded-xl px-5 py-4 outline-none focus:border-blue-500 transition-colors" />
                </div>
              </div>
              <div>
                <label className="block text-[11px] font-black text-[#8899BB] uppercase tracking-[0.15em] mb-2.5">EMAIL</label>
                <input name="email" type="email" required placeholder="john@company.com" className="w-full bg-[#0a1628] border border-white/5 rounded-xl px-5 py-4 outline-none focus:border-blue-500 transition-colors" />
              </div>
              <div>
                <label className="block text-[11px] font-black text-[#8899BB] uppercase tracking-[0.15em] mb-2.5">PHONE</label>
                <input name="phone" required placeholder="+370 123 45678" className="w-full bg-[#0a1628] border border-white/5 rounded-xl px-5 py-4 outline-none focus:border-blue-500 transition-colors" />
              </div>
              <div>
                <label className="block text-[11px] font-black text-[#8899BB] uppercase tracking-[0.15em] mb-2.5">MESSAGE (OPTIONAL)</label>
                <textarea name="message" rows={4} placeholder="Additional details..." className="w-full bg-[#0a1628] border border-white/5 rounded-xl px-5 py-4 outline-none focus:border-blue-500 transition-colors resize-none" />
              </div>
              <button type="submit" disabled={isSubmitted} className="w-full py-6 bg-[#0052ff] hover:bg-[#003dd6] text-white font-black rounded-2xl text-xs tracking-[0.3em] uppercase transition-all disabled:opacity-50">
                {isSubmitted ? 'SENT SUCCESS' : 'REQUEST QUOTE IN 24H'}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-20 bg-[#050a14] border-t border-white/5 text-center px-4">
        <div className="flex flex-col items-center">
          <img src="/logo.png" className="h-10 mb-6 grayscale opacity-40" />
          <p className="text-gray-500 text-[10px] font-bold uppercase tracking-widest">© 2026 TERSIS. European Logistics Carrier.</p>
          <p className="text-gray-700 text-[9px] mt-2">info@tersis.lt | Kaunas, Lithuania</p>
        </div>
      </footer>
    </div>
  )
}
