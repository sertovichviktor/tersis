import { useState, useEffect, useCallback, useRef } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import {
  Truck, ArrowRight, Check, Shield, Clock, Menu, X, Phone, Mail, MapPin, 
  Zap, Globe, Lock, AlertTriangle, Handshake, Users, FileText, Home, 
  Maximize2, Sun, Moon, Languages,
} from 'lucide-react'

// ВНИМАНИЕ: Если белый экран - попробуй поменять '../lib/i18n' на './lib/i18n'
import { translations, type Lang } from '../lib/i18n'

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
  
  // ЛОГИКА ФОРМЫ ИЗ РАБОЧЕГО КОДА (БЕЗ ЛАГОВ)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const formRef = useRef<HTMLFormElement>(null)

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
        e.currentTarget.reset(); 
        setTimeout(() => setIsSubmitted(false), 5000);
      } else {
        alert('Error! Try WhatsApp.');
      }
    } catch (error) {
      console.error(error);
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
    <div className={`min-h-screen ${bg} relative overflow-hidden transition-colors duration-300`}>
      {/* GRID OVERLAY */}
      {isDark && (
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'linear-gradient(0deg, transparent 24%, rgba(0, 82, 255, 0.08) 25%, rgba(0, 82, 255, 0.08) 26%, transparent 27%, transparent 74%, rgba(0, 82, 255, 0.08) 75%, rgba(0, 82, 255, 0.08) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(0, 82, 255, 0.08) 25%, rgba(0, 82, 255, 0.08) 26%, transparent 27%, transparent 74%, rgba(0, 82, 255, 0.08) 75%, rgba(0, 82, 255, 0.08) 76%, transparent 77%, transparent)', backgroundSize: '60px 60px' }} />
      )}

      {/* NAVIGATION */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? `${navBg} backdrop-blur-md border-b ${borderColor}` : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex justify-between items-center py-4">
          <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="flex items-center group">
            <img src="/logo.png" alt="TERSIS" className="h-10 w-10 object-contain group-hover:scale-110 transition-transform" />
            <span className={`text-2xl font-black ${textPrimary} ml-2`}>TERSIS</span>
          </button>
          <div className="hidden md:flex items-center space-x-6">
            {(['services', 'fleet', 'about', 'coverage', 'contact'] as const).map((s) => (
              <button key={s} onClick={() => scrollToSection(s)} className={`${textSecondary} hover:text-[#0052ff] transition text-sm font-semibold uppercase`}>{t.nav[s]}</button>
            ))}
          </div>
          <div className="hidden md:flex items-center gap-3">
             <button onClick={() => setLang(lang === 'en' ? 'lt' : 'en')} className={`px-3 py-1.5 rounded-md border ${borderColor} ${textSecondary} text-xs font-bold uppercase`}>{lang === 'en' ? 'LT' : 'EN'}</button>
             <button onClick={() => setIsDark(!isDark)} className={`p-2 rounded-md border ${borderColor} ${textSecondary}`}>{isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}</button>
             <button onClick={() => scrollToSection('contact')} className="bg-[#0052ff] text-white px-5 py-2 hover:bg-[#003dd6] transition font-bold text-sm uppercase rounded-md">{t.nav.getQuote}</button>
          </div>
        </div>
      </nav>

      {/* HERO SECTION (Design Build 10) */}
      <section className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 relative min-h-[90vh] md:h-screen flex items-center overflow-hidden bg-[#050a14]">
        <video autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover z-0 opacity-60"><source src="/hero-video.mp4.mp4" type="video/mp4" /></video>
        <div className="absolute inset-0 bg-black/60 z-10" />
        <div className="max-w-7xl mx-auto w-full relative z-20">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block mb-6 px-4 py-2 bg-[#0052ff]/20 border border-[#0052ff]/40 rounded-md">
                <p className="text-[#0052ff] text-sm font-bold uppercase tracking-wider">{lang === 'en' ? 'EST. 2011 • Trusted Carrier' : 'ĮKURTA 2011 • Patikima patirtis'}</p>
              </div>
              <h1 className="text-4xl sm:text-6xl md:text-7xl font-black text-white mb-6 leading-tight uppercase">{t.hero.title1}<br />{t.hero.title2}<br /><span className="text-[#0052ff]">{t.hero.title3}</span><br />{t.hero.title4}</h1>
              <div className="flex flex-wrap gap-4">
                <button onClick={() => scrollToSection('contact')} className="bg-[#0052ff] text-white px-8 py-4 rounded-md font-bold hover:bg-[#003dd6] transition flex items-center gap-2 uppercase tracking-wide shadow-lg">{t.hero.getQuote} <ArrowRight className="h-4 w-4" /></button>
                <button onClick={() => scrollToSection('fleet')} className="border-2 border-white/20 text-white hover:bg-white/10 px-8 py-4 rounded-md font-bold transition uppercase tracking-wide">{t.hero.fleetDetails}</button>
              </div>
            </div>
            {/* Badges справа */}
            <div className="flex flex-col gap-4 md:gap-6 items-start md:items-end">
               <div className="bg-white/5 backdrop-blur-md border border-white/10 p-6 md:p-8 rounded-xl w-full max-w-[340px]">
                  <Truck className="h-10 w-10 text-[#0052ff] mb-4" />
                  <p className="text-4xl md:text-5xl font-black text-white mb-1 uppercase">27+</p>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Own Vehicles</p>
               </div>
               <div className="bg-white/5 backdrop-blur-md border border-white/10 p-6 md:p-8 rounded-xl w-full max-w-[340px]">
                  <FileText className="h-10 w-10 text-[#0052ff] mb-4" />
                  <p className="text-lg md:text-xl font-black text-white mb-1 uppercase tracking-tight">LIC-009666-EBKR</p>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">EU Transport License</p>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* FLEET SECTION (Full Specs) */}
      <section id="fleet" className={`py-24 px-4 sm:px-6 lg:px-8 border-t ${borderColor}`}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 uppercase">
            <h2 className={`text-4xl md:text-5xl font-black ${textPrimary} mb-4 tracking-tight`}>{t.fleet.title}</h2>
            <p className={`text-lg ${textSecondary}`}>{t.fleet.subtitle}</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {[ 
              { title: t.fleet.standardClass, vol: '92 m³', icon: Truck, items: [[t.fleet.length, '13.6 m'], [t.fleet.height, '2.7 m'], [t.fleet.capacity, '33 Pallets']], footer: t.fleet.standardFooter },
              { title: t.fleet.megaAdvantage, vol: '105 m³', icon: Maximize2, items: [[t.fleet.internalHeight, '3.0 m'], [t.fleet.volume, '105 m³'], [t.fleet.advantage, '+14% Capacity']], footer: t.fleet.megaFooter }
            ].map((card, i) => (
              <div key={i} className={`border ${borderAccent} p-8 ${bgCard} rounded-xl hover:border-[#0052ff]/50 transition-all flex flex-col`}>
                <div className="flex items-center gap-4 mb-8">
                   <card.icon className="h-10 w-10 text-[#0052ff]" />
                   <div><h3 className={`text-xl font-black ${textPrimary} uppercase`}>{card.title}</h3><p className="text-[#0052ff] font-bold">{card.vol} {t.fleet.capacity}</p></div>
                </div>
                <div className="space-y-4 mb-8 flex-grow">{card.items.map(([l, v], idx) => (
                  <div key={idx} className={`flex justify-between border-b ${borderColor} pb-3`}><span className={`${textMuted} text-xs font-bold uppercase`}>{l}</span><span className={`${textPrimary} font-black`}>{v}</span></div>
                ))}</div>
                <p className={`${textMuted} text-xs italic`}>{card.footer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT (8 Icons) */}
      <section id="about" className={`py-24 px-4 sm:px-6 lg:px-8 border-t ${borderColor}`}>
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {[
            { icon: Truck, t: 'Own Fleet', s: 'Full Control' }, { icon: Globe, t: 'Routes', s: 'Optimized' },
            { icon: Clock, t: 'Reliability', s: 'Strict' }, { icon: Shield, t: 'Safety', s: 'Guaranteed' },
            { icon: FileText, t: 'Pricing', s: 'Transparent' }, { icon: Handshake, t: 'Partners', s: 'Global' },
            { icon: Users, t: 'Professional', s: '15+ Years' }, { icon: Check, t: 'CMR', s: '100% Insured' }
          ].map((item, idx) => (
            <div key={idx} className={`border ${borderAccent} p-6 ${bgCard} rounded-xl hover:border-[#0052ff]/50 transition-all group`}>
              <item.icon className="h-10 w-10 text-[#0052ff] mb-4 group-hover:scale-110 transition" />
              <h3 className={`text-lg font-black ${textPrimary} mb-1 uppercase tracking-tight`}>{item.t}</h3>
              <p className={`text-base ${textMuted} uppercase text-[10px] font-bold`}>{item.s}</p>
            </div>
          ))}
        </div>
      </section>

      {/* MAP */}
      <section id="coverage" className={`py-24 px-4 sm:px-6 lg:px-8 border-t ${borderColor}`}>
        <div className="max-w-7xl mx-auto">
          <div className="relative h-[400px] md:h-[650px] rounded-[40px] overflow-hidden border border-[#0052ff]/30 bg-black shadow-2xl">
            <img src="/map-hub.jpg.png" alt="Map" className="absolute inset-0 w-full h-full object-cover opacity-90" />
            <svg className="absolute inset-0 w-full h-full z-10" viewBox="0 0 1000 600">
               <defs><radialGradient id="c"><stop offset="0%" stopColor="#fff" /><stop offset="100%" stopColor="#0052ff" stopOpacity="0" /></radialGradient></defs>
               <path d="M 150,230 Q 300,100 485,205" stroke="url(#c)" strokeWidth="2" fill="none" strokeDasharray="1, 50"><animate attributeName="stroke-dashoffset" from="300" to="0" dur="3s" repeatCount="indefinite" /></path>
               <path d="M 850,380 Q 650,250 485,205" stroke="url(#c)" strokeWidth="2" fill="none" strokeDasharray="1, 50"><animate attributeName="stroke-dashoffset" from="300" to="0" dur="2.5s" repeatCount="indefinite" /></path>
            </svg>
          </div>
        </div>
      </section>

      {/* CONTACT (Рабочая логика) */}
      <section id="contact" className={`py-24 px-4 sm:px-6 lg:px-8 border-t ${borderColor}`}>
        <div className="max-w-4xl mx-auto">
          <div className={`${bgCard} border ${borderAccent} rounded-2xl p-8 md:p-10 shadow-2xl`}>
            <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-5">
              {['from', 'to', 'cargoType', 'weight', 'volume', 'name'].map((key) => (
                <div key={key}>
                  <label className={`block text-xs font-bold ${textSecondary} mb-2 uppercase tracking-widest`}>{(t.contact as any)[key]}</label>
                  <input name={key} type="text" required className={`w-full px-4 py-3 ${inputBg} border ${borderAccent} ${textPrimary} focus:border-[#0052ff] outline-none rounded-lg text-sm font-bold uppercase`} placeholder={(t.contact.placeholders as any)[key]} />
                </div>
              ))}
              <div className="md:col-span-2">
                <label className={`block text-xs font-bold ${textSecondary} mb-2 uppercase tracking-widest`}>{t.contact.email}</label>
                <input name="email" type="email" required className={`w-full px-4 py-3 ${inputBg} border ${borderAccent} ${textPrimary} focus:border-[#0052ff] outline-none rounded-lg text-sm font-bold uppercase`} />
              </div>
              <div className="md:col-span-2">
                <button type="submit" disabled={isLoading} className="w-full bg-[#0052ff] text-white py-5 text-base font-black hover:bg-[#003dd6] transition uppercase tracking-widest rounded-lg">
                  {isLoading ? '...' : isSubmitted ? t.contact.submitted : 'REQUEST QUOTE'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className={`${bg} border-t ${borderColor} py-16 px-4 sm:px-6 lg:px-8`}>
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-12 uppercase font-bold text-xs">
          <div><div className="flex items-center mb-6"><img src="/logo.png" className="h-10 w-10 mr-3" /><span className={`text-xl font-black ${textPrimary}`}>TERSIS</span></div><p className={textSecondary}>Taikos pr. 141-305, Kaunas</p></div>
          <div><h5 className={`font-black ${textPrimary} mb-6 tracking-widest`}>{t.footer.servicesTitle}</h5><div className={`space-y-2 ${textSecondary}`}>{t.services.items.slice(0, 4).map((s:any, i:number) => <p key={i}>{s.title}</p>)}</div></div>
          <div className="text-right"><p className="text-[#0052ff] font-black text-2xl mb-2">LIC-009666-EBKR</p><p className="text-green-400 font-bold tracking-widest">100% CMR Insured</p></div>
        </div>
      </footer>
    </div>
  )
}
