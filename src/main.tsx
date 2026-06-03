import { useState, useEffect, useCallback, useRef } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import {
  Truck, ArrowRight, Check, Shield, Clock, Menu, X, Phone, Mail, MapPin, 
  Zap, Globe, Lock, AlertTriangle, Handshake, Users, FileText, Home, 
  Maximize2, Sun, Moon, Languages
} from 'lucide-react'

// ПУТЬ ИСПРАВЛЕН: Теперь билд не упадет
import { translations, type Lang } from './lib/i18n'

export const Route = createFileRoute('/')({
  component: TersisApp,
  head: () => ({
    meta: [
      { title: 'TERSIS | Asset-Based Carrier & International Logistics Hub' },
      { 
        name: 'description', 
        content: 'TERSIS is a reliable European logistics partner since 2011. Operating a fleet of 27+ modern Euro 6 vehicles.' 
      },
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
  
  // ЛОГИКА ФОРМЫ (БЕЗ ЛАГОВ)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const t = translations[lang]

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark)
    document.documentElement.classList.toggle('light', !isDark)
  }, [isDark])

  const scrollToSection = useCallback((id: string) => {
    const element = document.getElementById(id)
    element?.scrollIntoView({ behavior: 'smooth' })
    setIsMenuOpen(false)
  }, [])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const formDataObj = new FormData(e.currentTarget);
    const data = Object.fromEntries(formDataObj.entries());

    try {
      const response = await fetch('/send.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setIsSubmitted(true);
        (e.target as HTMLFormElement).reset(); 
        setTimeout(() => setIsSubmitted(false), 5000);
      } else {
        alert('Error! Contact us via WhatsApp.');
      }
    } catch (error) {
      alert('Connection error.');
    } finally {
      setIsLoading(false);
    }
  }

  if (!t) return null;

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
    <div className={`min-h-screen ${bg} relative overflow-hidden transition-colors duration-300 font-sans`}>
      {/* BACKGROUND GRID */}
      {isDark && (
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'linear-gradient(0deg, transparent 24%, rgba(0, 82, 255, 0.08) 25%, rgba(0, 82, 255, 0.08) 26%, transparent 27%, transparent 74%, rgba(0, 82, 255, 0.08) 75%, rgba(0, 82, 255, 0.08) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(0, 82, 255, 0.08) 25%, rgba(0, 82, 255, 0.08) 26%, transparent 27%, transparent 74%, rgba(0, 82, 255, 0.08) 75%, rgba(0, 82, 255, 0.08) 76%, transparent 77%, transparent)', backgroundSize: '60px 60px' }} />
      )}

      {/* NAVIGATION */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? `${navBg} backdrop-blur-md border-b ${borderColor} shadow-sm` : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex justify-between items-center">
          <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="flex items-center group">
            <img src="/logo.png" alt="Logo" className="h-10 w-10 object-contain group-hover:scale-110 transition-transform" />
            <span className={`text-2xl font-black ${textPrimary} ml-2 tracking-tighter`}>TERSIS</span>
          </button>
          <div className="hidden md:flex items-center space-x-6">
            {['services', 'fleet', 'about', 'coverage', 'contact'].map((s) => (
              <button key={s} onClick={() => scrollToSection(s)} className={`${textSecondary} hover:text-[#0052ff] transition text-sm font-bold uppercase tracking-widest`}>
                {t.nav[s as keyof typeof t.nav]}
              </button>
            ))}
          </div>
          <div className="hidden md:flex items-center gap-4">
             <button onClick={() => setLang(lang === 'en' ? 'lt' : 'en')} className={`px-2 py-1 border ${borderColor} rounded text-[10px] font-black ${textSecondary}`}>
               {lang === 'en' ? 'LT' : 'EN'}
             </button>
             <button onClick={() => setIsDark(!isDark)} className={textSecondary}>
               {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
             </button>
             <button onClick={() => scrollToSection('contact')} className="bg-[#0052ff] text-white px-5 py-2 rounded font-black text-xs uppercase tracking-widest hover:bg-[#003dd6]">
               {t.nav.getQuote}
             </button>
          </div>
        </div>
      </nav>

      {/* HERO SECTION (BUILD 10 DESIGN) */}
      <section className="pt-32 pb-20 px-4 relative min-h-screen flex items-center bg-black">
        <video autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover z-0 opacity-40">
          <source src="/hero-video.mp4.mp4" type="video/mp4" />
        </video>
        <div className="max-w-7xl mx-auto w-full relative z-20 grid md:grid-cols-2 gap-12 items-center">
          <div className="animate-fadeInUp">
            <div className="inline-block mb-6 px-4 py-1 bg-[#0052ff]/20 border border-[#0052ff]/40 rounded text-[#0052ff] text-xs font-black uppercase tracking-widest">
              EST. 2011 • Trusted Carrier
            </div>
            <h1 className="text-5xl md:text-8xl font-black text-white mb-6 leading-none uppercase tracking-tighter">
              {t.hero.title1}<br />{t.hero.title2}<br /><span className="text-[#0052ff]">{t.hero.title3}</span><br />{t.hero.title4}
            </h1>
            <div className="flex flex-wrap gap-4">
              <button onClick={() => scrollToSection('contact')} className="bg-[#0052ff] text-white px-10 py-5 rounded font-black uppercase tracking-widest hover:bg-[#003dd6] transition flex items-center gap-3">
                {t.hero.getQuote} <ArrowRight className="h-5 w-5" />
              </button>
              <button onClick={() => scrollToSection('fleet')} className="border-2 border-white/20 text-white hover:bg-white/10 px-10 py-5 rounded font-black uppercase tracking-widest transition">
                {t.hero.fleetDetails}
              </button>
            </div>
          </div>
          {/* BADGES СПРАВА */}
          <div className="flex flex-col gap-6 items-start md:items-end">
             <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-2xl w-full max-w-[340px]">
                <Truck className="h-10 w-10 text-[#0052ff] mb-4" />
                <p className="text-5xl font-black text-white leading-none">27+</p>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-2">Own Vehicles</p>
             </div>
             <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-2xl w-full max-w-[340px]">
                <FileText className="h-10 w-10 text-[#0052ff] mb-4" />
                <p className="text-xl font-black text-white tracking-tighter uppercase leading-none">LIC-009666-EBKR</p>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-2">EU License</p>
             </div>
          </div>
        </div>
      </section>

      {/* FLEET SECTION (BUILD 10 TABLES) */}
      <section id="fleet" className={`py-32 px-4 border-t ${borderColor}`}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className={`text-5xl md:text-6xl font-black ${textPrimary} mb-6 uppercase tracking-tighter`}>{t.fleet.title}</h2>
            <p className={`text-xl ${textSecondary} max-w-2xl mx-auto uppercase font-bold tracking-widest`}>{t.fleet.subtitle}</p>
          </div>
          <div className="grid md:grid-cols-2 gap-10 mb-16">
            {/* Standard */}
            <div className={`border ${borderAccent} p-10 ${bgCard} rounded-2xl flex flex-col`}>
              <div className="flex items-center gap-5 mb-10">
                 <Truck className="h-10 w-10 text-[#0052ff]" />
                 <div><h3 className={`text-2xl font-black ${textPrimary} uppercase`}>{t.fleet.standardClass}</h3><p className="text-[#0052ff] font-bold text-lg uppercase tracking-widest">92 m³ {t.fleet.capacity}</p></div>
              </div>
              <div className="space-y-6 mb-10 font-bold uppercase tracking-widest text-sm">
                {[[t.fleet.length, '13.6 m'], [t.fleet.height, '2.7 m'], [t.fleet.capacity, '33 Pallets']].map(([l, v], i) => (
                  <div key={i} className={`flex justify-between border-b ${borderColor} pb-4`}><span className={textMuted}>{l}</span><span className={textPrimary}>{v}</span></div>
                ))}
              </div>
              <p className={`${textMuted} text-xs italic`}>{t.fleet.standardFooter}</p>
            </div>
            {/* Mega */}
            <div className={`border ${borderAccent} p-10 ${bgCard} rounded-2xl flex flex-col`}>
              <div className="flex items-center gap-5 mb-10">
                 <Maximize2 className="h-10 w-10 text-[#0052ff]" />
                 <div><h3 className={`text-2xl font-black ${textPrimary} uppercase`}>{t.fleet.megaAdvantage}</h3><p className="text-[#0052ff] font-bold text-lg uppercase tracking-widest">105 m³ {t.fleet.capacity}</p></div>
              </div>
              <div className="space-y-6 mb-10 font-bold uppercase tracking-widest text-sm">
                {[[t.fleet.internalHeight, '3.0 m'], [t.fleet.volume, '105 m³'], [t.fleet.advantage, '+14%']].map(([l, v], i) => (
                  <div key={i} className={`flex justify-between border-b ${borderColor} pb-4`}><span className={textMuted}>{l}</span><span className={textPrimary}>{v}</span></div>
                ))}
              </div>
              <p className={`${textMuted} text-xs italic`}>{t.fleet.megaFooter}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT (8 CARDS) */}
      <section id="about" className={`py-32 px-4 border-t ${borderColor}`}>
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { i: Truck, t: 'Own Fleet', s: 'Full Control' }, { i: Globe, t: 'Routes', s: 'Optimized' },
            { i: Clock, t: 'Reliable', s: 'Strict' }, { i: Shield, t: 'Safety', s: 'Guaranteed' },
            { i: FileText, t: 'Pricing', s: 'Transparent' }, { i: Handshake, t: 'Partners', s: 'Global' },
            { i: Users, t: 'Team', s: 'Professional' }, { i: Check, t: 'CMR', s: '100% Insured' }
          ].map((item, idx) => (
            <div key={idx} className={`border ${borderAccent} p-8 ${bgCard} rounded-2xl hover:border-[#0052ff]/50 transition-all group`}>
              <item.i className="h-10 w-10 text-[#0052ff] mb-6 group-hover:scale-110 transition" />
              <h3 className={`text-xl font-black ${textPrimary} mb-2 uppercase tracking-tighter`}>{item.t}</h3>
              <p className={`text-xs ${textMuted} uppercase font-bold tracking-widest`}>{item.s}</p>
            </div>
          ))}
        </div>
      </section>

      {/* MAP SECTION (SVG COMETS) */}
      <section id="coverage" className={`py-32 px-4 border-t ${borderColor}`}>
        <div className="max-w-7xl mx-auto">
          <div className="relative h-[600px] rounded-[40px] overflow-hidden border border-[#0052ff]/30 shadow-2xl bg-black">
            <img src="/map-hub.jpg.png" alt="Map" className="absolute inset-0 w-full h-full object-cover opacity-90" />
            <svg className="absolute inset-0 w-full h-full z-10" viewBox="0 0 1000 600">
              <defs><radialGradient id="c"><stop offset="0%" stopColor="#fff" /><stop offset="100%" stopColor="#0052ff" stopOpacity="0" /></radialGradient></defs>
              <path d="M 150,230 Q 300,100 485,205" stroke="url(#c)" strokeWidth="2" fill="none" strokeDasharray="1, 50"><animate attributeName="stroke-dashoffset" from="300" to="0" dur="3s" repeatCount="indefinite" /></path>
              <path d="M 850,380 Q 650,250 485,205" stroke="url(#c)" strokeWidth="2" fill="none" strokeDasharray="1, 50"><animate attributeName="stroke-dashoffset" from="300" to="0" dur="2.5s" repeatCount="indefinite" /></path>
            </svg>
            <div className="absolute bottom-10 left-10 bg-black/40 backdrop-blur-xl px-6 py-3 rounded-xl border border-white/10 hidden md:block">
              <p className="text-[10px] font-black text-[#0052ff] uppercase tracking-widest mb-1 leading-none">Hub Status</p>
              <p className="text-white text-xs font-bold uppercase tracking-widest">Operational / 24-7</p>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT FORM (BUILD 10 DESIGN + WORKING LOGIC) */}
      <section id="contact" className={`py-32 px-4 border-t ${borderColor}`}>
        <div className="max-w-4xl mx-auto">
          <div className={`${bgCard} border ${borderAccent} rounded-3xl p-10 md:p-16 shadow-2xl`}>
            <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-8">
              {['from', 'to', 'cargoType', 'weight', 'volume', 'name'].map((key) => (
                <div key={key}>
                  <label className={`block text-[10px] font-black ${textSecondary} mb-3 uppercase tracking-widest`}>{(t.contact as any)[key]}</label>
                  <input name={key} type="text" required className={`w-full px-6 py-4 ${inputBg} border ${borderAccent} ${textPrimary} focus:border-[#0052ff] outline-none rounded-xl text-sm font-black uppercase tracking-widest`} />
                </div>
              ))}
              <div className="md:col-span-2">
                <label className={`block text-[10px] font-black ${textSecondary} mb-3 uppercase tracking-widest`}>{t.contact.email}</label>
                <input name="email" type="email" required className={`w-full px-6 py-4 ${inputBg} border ${borderAccent} ${textPrimary} focus:border-[#0052ff] outline-none rounded-xl text-sm font-black uppercase tracking-widest`} />
              </div>
              <div className="md:col-span-2">
                <button type="submit" disabled={isLoading} className="w-full bg-[#0052ff] text-white py-6 text-base font-black hover:bg-[#003dd6] transition uppercase tracking-widest rounded-xl shadow-2xl">
                  {isLoading ? '...' : isSubmitted ? t.contact.submitted : 'REQUEST QUOTE'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className={`${bg} border-t ${borderColor} py-20 px-4`}>
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-20">
          <div><div className="flex items-center mb-8"><img src="/logo.png" className="h-10 w-10 mr-4" /><span className={`text-2xl font-black ${textPrimary}`}>TERSIS</span></div><p className={`${textSecondary} text-xs font-bold uppercase tracking-widest`}>Taikos pr. 141-305, Kaunas, Lithuania</p></div>
          <div><h5 className={`font-black ${textPrimary} mb-10 text-xs uppercase tracking-widest`}>{t.footer.servicesTitle}</h5><div className={`space-y-4 ${textSecondary} text-xs font-bold uppercase`}>{t.services.items.slice(0, 4).map((s:any, i:number) => <p key={i}>{s.title}</p>)}</div></div>
          <div className="text-right"><p className="text-[#0052ff] font-black text-2xl mb-4">LIC-009666-EBKR</p><p className="text-green-500 font-black text-xs tracking-widest">100% CMR INSURED</p></div>
        </div>
      </footer>
    </div>
  )
}
