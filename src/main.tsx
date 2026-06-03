import React, { useState, useEffect, useCallback, useRef, memo } from 'react'
import ReactDOM from 'react-dom/client'
import {
  Truck,
  ArrowRight,
  Check,
  Shield,
  Clock,
  Menu,
  X,
  Phone,
  Mail,
  MapPin,
  Zap,
  Globe,
  Lock,
  AlertTriangle,
  Handshake,
  Users,
  FileText,
  Home,
  Maximize2,
  Sun,
  Moon,
  Languages,
} from 'lucide-react'

// ВНИМАНИЕ: Проверь этот путь! Если файлы лежат в папке src/lib, то путь './lib/i18n'
import { translations, type Lang } from './lib/i18n'

const serviceIcons = [Truck, Globe, AlertTriangle, Zap, Clock, Home, FileText, Shield]

function TersisApp() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [lang, setLang] = useState<Lang>('en')
  const [isDark, setIsDark] = useState(true)
  
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

  // Если переводы не загрузились, показываем заглушку, чтобы не было белого экрана
  if (!t) return <div className="min-h-screen bg-[#050a14]" />

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
        formRef.current?.reset();
        setTimeout(() => setIsSubmitted(false), 5000);
      } else {
        alert('Error! Please try again or contact us via Email.');
      }
    } catch (error) {
      console.error('Submission error:', error);
      alert('Connection error.');
    } finally {
      setIsLoading(false);
    }
  }

  // Стили из твоего идеального дизайна (Билд 10)
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
      {/* Сетка на фоне */}
      {isDark && (
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'linear-gradient(0deg, transparent 24%, rgba(0, 82, 255, 0.08) 25%, rgba(0, 82, 255, 0.08) 26%, transparent 27%, transparent 74%, rgba(0, 82, 255, 0.08) 75%, rgba(0, 82, 255, 0.08) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(0, 82, 255, 0.08) 25%, rgba(0, 82, 255, 0.08) 26%, transparent 27%, transparent 74%, rgba(0, 82, 255, 0.08) 75%, rgba(0, 82, 255, 0.08) 76%, transparent 77%, transparent)', backgroundSize: '60px 60px' }} />
      )}

      {/* NAVIGATION */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? `${navBg} backdrop-blur-md border-b ${borderColor} shadow-sm` : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-18 py-4">
            <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="flex items-center group">
              <div className="relative h-10 w-10">
                <img src="/logo.png" alt="TERSIS" className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-110" />
              </div>
              <span className={`text-2xl font-black ${textPrimary} tracking-tight ml-2`}>TERSIS</span>
            </button>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center space-x-6">
              {(['services', 'fleet', 'about', 'coverage', 'contact'] as const).map((section) => (
                <button key={section} onClick={() => scrollToSection(section)} className={`${textSecondary} hover:text-[#0052ff] transition text-sm font-semibold uppercase tracking-wide`}>
                  {t.nav[section]}
                </button>
              ))}
            </div>

            <div className="hidden md:flex items-center gap-3">
              <button onClick={() => setLang(lang === 'en' ? 'lt' : 'en')} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md border ${borderColor} ${textSecondary} hover:text-[#0052ff] transition text-xs font-bold uppercase`}>
                <Languages className="h-3.5 w-3.5" /> {lang === 'en' ? 'LT' : 'EN'}
              </button>
              <button onClick={() => setIsDark(!isDark)} className={`p-2 rounded-md border ${borderColor} ${textSecondary} hover:text-[#0052ff] transition`}>
                {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </button>
              <button onClick={() => scrollToSection('contact')} className="bg-[#0052ff] text-white px-5 py-2 hover:bg-[#003dd6] transition font-bold text-sm uppercase rounded-md">
                {t.nav.getQuote}
              </button>
            </div>

            <div className="md:hidden flex items-center">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className={textSecondary}>
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* HERO SECTION (Video & Title from Build 10) */}
      <section className="pt-28 pb-20 px-4 relative min-h-[90vh] md:h-screen flex items-center overflow-hidden bg-[#050a14]">
        <video autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover z-0 opacity-60">
          <source src="/hero-video.mp4.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/50 z-10" />

        <div className="max-w-7xl mx-auto w-full relative z-20">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="animate-fadeInUp">
              <div className="inline-block mb-6 px-4 py-2 bg-[#0052ff]/20 border border-[#0052ff]/40 rounded-md">
                <p className="text-[#0052ff] text-sm font-bold uppercase tracking-wider">
                  {lang === 'en' ? 'EST. 2011 • Trusted Experience' : 'ĮKURTA 2011 • Patikima patirtis'}
                </p>
              </div>
              <h1 className="text-4xl sm:text-6xl md:text-7xl font-black text-white mb-6 leading-tight uppercase">
                {t.hero.title1}<br />{t.hero.title2}<br />
                <span className="text-[#0052ff]">{t.hero.title3}</span><br />
                {t.hero.title4}
              </h1>
              <div className="flex flex-wrap gap-4">
                <button onClick={() => scrollToSection('contact')} className="bg-[#0052ff] text-white px-8 py-4 rounded-md text-base font-bold hover:bg-[#003dd6] transition flex items-center gap-2 uppercase">
                  {t.hero.getQuote} <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FLEET SECTION */}
      <section id="fleet" className={`py-24 px-4 border-t ${borderColor}`}>
        <div className="max-w-7xl mx-auto">
          <h2 className={`text-4xl md:text-5xl font-black ${textPrimary} text-center mb-16 uppercase`}>{t.fleet.title}</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className={`border ${borderAccent} p-8 ${bgCard} rounded-xl`}>
              <div className="flex items-center gap-4 mb-6"><Truck className="h-8 w-8 text-[#0052ff]" /><h3 className={`text-xl font-black ${textPrimary} uppercase`}>{t.fleet.standardClass}</h3></div>
              <div className="space-y-4">{[[t.fleet.length, '13.6 m'], [t.fleet.height, '2.7 m'], [t.fleet.capacity, '33 Pallets']].map(([l, v], i) => (
                <div key={i} className="flex justify-between border-b border-white/5 pb-2"><span className={textMuted}>{l}</span><span className={`${textPrimary} font-black`}>{v}</span></div>
              ))}</div>
            </div>
            <div className={`border ${borderAccent} p-8 ${bgCard} rounded-xl`}>
              <div className="flex items-center gap-4 mb-6"><Maximize2 className="h-8 w-8 text-[#0052ff]" /><h3 className={`text-xl font-black ${textPrimary} uppercase`}>{t.fleet.megaAdvantage}</h3></div>
              <div className="space-y-4">{[[t.fleet.internalHeight, '3.0 m'], [t.fleet.volume, '105 m³'], [t.fleet.advantage, '+14%']].map(([l, v], i) => (
                <div key={i} className="flex justify-between border-b border-white/5 pb-2"><span className={textMuted}>{l}</span><span className={`${textPrimary} font-black`}>{v}</span></div>
              ))}</div>
            </div>
          </div>
        </div>
      </section>

      {/* COVERAGE MAP (Comets from Build 10) */}
      <section id="coverage" className={`py-24 px-4 border-t ${borderColor}`}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 uppercase">
            <h2 className={`text-4xl md:text-5xl font-black ${textPrimary} mb-4`}>{t.coverage.title}</h2>
            <p className="text-lg text-[#0052ff] font-black tracking-widest">Europe • Baltics • Global</p>
          </div>
          <div className="relative h-[400px] md:h-[600px] rounded-[40px] overflow-hidden border border-[#0052ff]/30 bg-black">
            <img src="/map-hub.jpg.png" alt="Map" className="absolute inset-0 w-full h-full object-cover opacity-80" />
            <svg className="absolute inset-0 w-full h-full z-10 pointer-events-none" viewBox="0 0 1000 600">
              <defs><radialGradient id="comet-grad"><stop offset="0%" stopColor="#fff" /><stop offset="100%" stopColor="#0052ff" stopOpacity="0" /></radialGradient></defs>
              <path d="M 150,230 Q 300,100 485,205" stroke="url(#comet-grad)" strokeDasharray="1, 50" strokeWidth="2" fill="none">
                <animate attributeName="stroke-dashoffset" from="300" to="0" dur="3s" repeatCount="indefinite" />
              </path>
            </svg>
          </div>
        </div>
      </section>

      {/* CONTACT SECTION (The fix for lags) */}
      <section id="contact" className={`py-24 px-4 border-t ${borderColor}`}>
        <div className="max-w-4xl mx-auto">
          <h2 className={`text-4xl md:text-5xl font-black ${textPrimary} text-center mb-12 uppercase`}>{t.contact.title}</h2>
          <div className={`${bgCard} border ${borderAccent} rounded-2xl p-8 md:p-10 shadow-2xl`}>
            <form ref={formRef} onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-5">
              {['from', 'to', 'cargoType', 'weight', 'volume', 'name'].map((key) => (
                <div key={key}>
                  <label className={`block text-xs font-bold ${textSecondary} mb-2 uppercase`}>{(t.contact as any)[key]}</label>
                  <input name={key} type="text" required className={`w-full px-4 py-3 ${inputBg} border ${borderAccent} ${textPrimary} focus:border-[#0052ff] outline-none rounded-lg text-sm font-bold`} />
                </div>
              ))}
              <div className="md:col-span-2">
                <label className={`block text-xs font-bold ${textSecondary} mb-2 uppercase`}>{t.contact.email}</label>
                <input name="email" type="email" required className={`w-full px-4 py-3 ${inputBg} border ${borderAccent} ${textPrimary} focus:border-[#0052ff] outline-none rounded-lg text-sm font-bold`} />
              </div>
              <div className="md:col-span-2">
                <button type="submit" disabled={isLoading} className="w-full bg-[#0052ff] text-white py-5 text-base font-black hover:bg-[#003dd6] transition uppercase rounded-lg">
                  {isLoading ? '...' : isSubmitted ? t.contact.submitted : 'REQUEST QUOTE'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      <footer className={`${bg} border-t ${borderColor} py-12 text-center`}>
         <div className="max-w-7xl mx-auto px-4">
            <p className={`${textMuted} text-xs uppercase tracking-widest`}>© 2026 TERSIS. All rights reserved.</p>
         </div>
      </footer>
    </div>
  )
}

// РЕНДЕР (Как в твоем рабочем коде)
const rootElement = document.getElementById('root')
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(<TersisApp />)
}

export default TersisApp;
