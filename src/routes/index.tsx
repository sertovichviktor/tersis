import { useState, useEffect, useCallback } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import {
  Truck, ArrowRight, Check, Shield, Clock, Menu, X, Phone, Mail, MapPin, Zap, Globe, Lock, AlertTriangle, Handshake, Users, FileText, Home, Maximize2, Sun, Moon, Languages,
} from 'lucide-react'
import { translations, type Lang } from '@/lib/i18n'

export const Route = createFileRoute('/')({
  component: TersisApp,
})

const serviceIcons = [Truck, Globe, AlertTriangle, Zap, Clock, Home, FileText, Shield]
const aboutIcons = [Lock, Globe, Clock, Shield, FileText, Handshake, Users, Check]

function TersisApp() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [lang, setLang] = useState<Lang>('en')
  const [isDark, setIsDark] = useState(true)
  const [formData, setFormData] = useState({
    from: '', to: '', cargoType: '', weight: '', volume: '', name: '', email: '', phone: '', message: '',
  })
  const [isSubmitted, setIsSubmitted] = useState(false)

  const t = translations[lang]

  useEffect(() => {
    const handleScroll = () => { setIsScrolled(window.scrollY > 50) }
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitted(true)
    setTimeout(() => setIsSubmitted(false), 3000)
  }

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
      {/* ─── NAVIGATION ─── */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? `${navBg} backdrop-blur-md border-b ${borderColor} shadow-sm` : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-18 py-4">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <img src="/logo.png" alt="TERSIS" className="h-10 w-10 object-contain" />
              <span className={`text-2xl font-black ${textPrimary} tracking-tight uppercase`}>TERSIS</span>
            </div>

            {/* Desktop nav */}
            <div className="hidden md:flex items-center space-x-6">
              {['services', 'fleet', 'about', 'coverage', 'contact'].map((section) => (
                <button key={section} onClick={() => scrollToSection(section)} className={`${textSecondary} hover:text-[#0052ff] transition text-sm font-semibold uppercase tracking-wide`}>
                  {t.nav[section as keyof typeof t.nav]}
                </button>
              ))}
            </div>

            {/* Controls */}
            <div className="hidden md:flex items-center gap-3">
              <button onClick={() => setLang(lang === 'en' ? 'lt' : 'en')} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md border ${borderColor} ${textSecondary} hover:text-[#0052ff] transition text-xs font-bold uppercase`}>
                <Languages className="h-3.5 w-3.5" /> {lang === 'en' ? 'LT' : 'EN'}
              </button>
              <button onClick={() => setIsDark(!isDark)} className={`p-2 rounded-md border ${borderColor} ${textSecondary} hover:text-[#0052ff] transition`}>
                {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </button>
              <button onClick={() => scrollToSection('contact')} className="bg-[#0052ff] text-white px-5 py-2 hover:bg-[#003dd6] transition font-bold text-sm uppercase tracking-wide rounded-md">{t.nav.getQuote}</button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center gap-2">
              <button onClick={() => setLang(lang === 'en' ? 'lt' : 'en')} className={`px-2 py-1 text-xs font-bold ${textSecondary}`}>{lang === 'en' ? 'LT' : 'EN'}</button>
              <button onClick={() => setIsDark(!isDark)} className={`p-1.5 ${textSecondary}`}>{isDark ? <Sun size={16} /> : <Moon size={16} />}</button>
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className={textSecondary}>{isMenuOpen ? <X size={26} /> : <Menu size={26} />}</button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className={`md:hidden ${navBg} border-t ${borderColor} px-4 py-6 flex flex-col gap-4 shadow-xl`}>
            {['services', 'fleet', 'about', 'coverage', 'contact'].map((section) => (
              <button key={section} onClick={() => scrollToSection(section)} className={`block w-full text-left ${textSecondary} text-sm font-bold uppercase`}>{t.nav[section as keyof typeof t.nav]}</button>
            ))}
          </div>
        )}
      </nav>

      {/* ─── HERO SECTION ─── */}
      <section className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 relative min-h-[90vh] flex items-center overflow-hidden">
        {/* VIDEO BACKGROUND */}
        <video autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover z-0">
          <source src="/hero-video.mp4.mp4" type="video/mp4" />
        </video>
        {/* Фиксированный темный слой, чтобы текст всегда был виден поверх видео */}
        <div className="absolute inset-0 bg-black/60 z-10" />

        <div className="max-w-7xl mx-auto w-full relative z-20">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="animate-fadeInUp text-white">
              <div className="inline-block mb-6 px-4 py-2 bg-[#0052ff]/20 border border-[#0052ff]/40 rounded-md">
                <p className="text-[#0052ff] text-xs font-black tracking-widest uppercase">WORLDWIDE LOGISTICS SOLUTIONS</p>
              </div>
              {/* Заголовок теперь всегда белый (text-white), чтобы не пропадать в светлой теме */}
              <h1 className="text-5xl sm:text-6xl md:text-7xl font-black text-white mb-6 leading-[1.05] tracking-tight uppercase">
                {t.hero.title1}<br />
                {t.hero.title2}<br />
                <span className="text-[#0052ff]">{t.hero.title3}</span><br />
                {t.hero.title4}
              </h1>
              {/* Пункт 1: Новый текст и светлый цвет */}
              <p className="text-lg text-gray-200 mb-10 leading-relaxed max-w-lg font-medium">
                We operate a fleet of 27+ modern Euro 6 vehicles, specializing in high-capacity MEGA trailers (105 m³) and delivering reliable standard transport solutions worldwide.
              </p>
              <div className="flex flex-wrap gap-4">
                <button onClick={() => scrollToSection('contact')} className="bg-[#0052ff] text-white px-8 py-4 rounded-md text-base font-bold hover:bg-[#003dd6] transition flex items-center gap-2 uppercase tracking-wide shadow-lg shadow-[#0052ff]/30">
                  {t.hero.getQuote} <ArrowRight className="h-4 w-4" />
                </button>
                <button onClick={() => scrollToSection('fleet')} className="border-2 border-white/20 text-white hover:bg-white/10 px-8 py-4 rounded-md text-base font-bold transition uppercase tracking-wide">
                  {t.hero.fleetDetails}
                </button>
              </div>
            </div>

            {/* Пункт 2: Информация справа */}
            <div className="hidden md:flex flex-col gap-6 items-end">
               <div className="bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-xl w-full max-w-[340px]">
                  <Truck className="h-12 w-12 text-[#0052ff] mb-4" />
                  <p className="text-5xl font-black text-white mb-1 uppercase">27+</p>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Modern Vehicles (Own Fleet)</p>
               </div>
               <div className="bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-xl w-full max-w-[340px]">
                  <FileText className="h-12 w-12 text-[#0052ff] mb-4" />
                  <p className="text-xl font-black text-white mb-1 uppercase tracking-tight leading-none text-left">LIC-009666-EBKR</p>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest text-left mt-2">EU International Transport License</p>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── FLEET ─── */}
      <section id="fleet" className={`py-24 px-4 sm:px-6 lg:px-8 border-t ${borderColor}`}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 animate-fadeInUp">
            <h2 className={`text-4xl md:text-5xl font-black ${textPrimary} mb-4 tracking-tight uppercase`}>{t.fleet.title}</h2>
            <p className={`text-lg ${textSecondary}`}>{t.fleet.subtitle}</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 mb-12 text-left font-bold">
            <div className={`border ${borderAccent} p-8 ${bgCard} rounded-xl hover:border-[#0052ff]/50 transition-all`}>
               <h3 className={`text-xl font-black ${textPrimary} mb-6 tracking-tight`}>{t.fleet.standardClass}</h3>
               <div className="space-y-4 uppercase tracking-widest text-xs">
                  <div className="flex justify-between border-b pb-2"><span>{t.fleet.length}</span><span className={textPrimary}>13.6 m</span></div>
                  <div className="flex justify-between border-b pb-2"><span>{t.fleet.height}</span><span className={textPrimary}>2.7 m</span></div>
                  <div className="flex justify-between"><span>{t.fleet.euroPallets}</span><span className={textPrimary}>33</span></div>
               </div>
            </div>
            <div className={`border ${borderAccent} p-8 ${bgCard} rounded-xl hover:border-[#0052ff]/50 transition-all`}>
               <h3 className={`text-xl font-black ${textPrimary} mb-6 tracking-tight`}>{t.fleet.megaAdvantage}</h3>
               <div className="space-y-4 uppercase tracking-widest text-xs">
                  <div className="flex justify-between border-b pb-2"><span>{t.fleet.internalHeight}</span><span className={textPrimary}>3.0 m</span></div>
                  <div className="flex justify-between border-b pb-2"><span>{t.fleet.volume}</span><span className={textPrimary}>105 m³</span></div>
                  <div className="flex justify-between"><span>WORLDWIDE</span><span className={textPrimary}>ACTIVE</span></div>
               </div>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 uppercase font-black text-[10px] tracking-tighter">
            {[{icon:Shield,t:t.fleet.cmrInsured},{icon:Clock,t:t.fleet.realTime},{icon:Truck,t:t.fleet.modernFleet},{icon:Check,t:t.fleet.euro6}].map((item, idx)=>(
              <div key={idx} className={`border ${borderAccent} p-5 text-center ${bgCard} rounded-lg`}>
                <item.icon className="h-6 w-6 text-[#0052ff] mx-auto mb-3" />
                <p className={textPrimary}>{item.t}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SERVICES ─── */}
      <section id="services" className={`py-24 px-4 sm:px-6 lg:px-8 border-t ${borderColor}`}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 animate-fadeInUp">
            <h2 className={`text-4xl md:text-5xl font-black ${textPrimary} mb-4 tracking-tight uppercase`}>{t.services.title}</h2>
          </div>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-5">
            {t.services.items.map((service, idx) => {
              const Icon = serviceIcons[idx] || Truck
              return (
                <div key={idx} className={`border ${borderAccent} p-6 ${bgCard} rounded-xl hover:border-[#0052ff]/50 transition-all group`}>
                  <Icon className="h-9 w-9 text-[#0052ff] mb-4 group-hover:scale-110 transition" />
                  <h3 className={`text-sm font-black ${textPrimary} mb-1 uppercase tracking-wide`}>{service.title}</h3>
                  <p className={`text-xs ${textMuted} font-semibold uppercase tracking-widest`}>{service.subtitle}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ─── ABOUT ─── */}
      <section id="about" className={`py-24 px-4 sm:px-6 lg:px-8 border-t ${borderColor}`}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className={`text-4xl md:text-5xl font-black ${textPrimary} mb-4 tracking-tight uppercase`}>{t.about.title}</h2>
          </div>
          <div className="max-w-3xl mx-auto mb-16 space-y-4 text-center">
            <p className={`${textSecondary} text-base leading-relaxed`}>{t.about.text1}</p>
            <p className={`${textSecondary} text-base leading-relaxed`}>{t.about.text2}</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 text-left">
            {t.about.features.map((item, idx) => {
              const Icon = aboutIcons[idx] || Handshake
              return (
                <div key={idx} className={`border ${borderAccent} p-6 ${bgCard} rounded-xl group transition-all`}>
                  <Icon className="h-10 w-10 text-[#0052ff] mb-4 group-hover:scale-110 transition" />
                  <h3 className={`text-base font-black ${textPrimary} mb-1 tracking-tight`}>{item.title}</h3>
                  <p className={`text-sm ${textMuted}`}>{item.subtitle}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ─── COVERAGE MAP (ANIMATED) ─── */}
      <section id="coverage" className={`py-24 px-4 sm:px-6 lg:px-8 border-t ${borderColor}`}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 animate-fadeInUp">
            <h2 className={`text-4xl md:text-5xl font-black ${textPrimary} mb-4 tracking-tight uppercase`}>{t.coverage.title}</h2>
            <p className={`text-lg ${textSecondary} font-bold tracking-widest uppercase`}>Consolidation Hub: Kaunas, Lithuania</p>
          </div>

          <div className={`relative h-[450px] md:h-[600px] rounded-[40px] overflow-hidden border ${borderAccent} ${isDark ? 'bg-slate-900' : 'bg-slate-100'} flex items-center justify-center shadow-2xl`}>
            <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/world-map.png')] bg-center bg-no-repeat scale-150"></div>
            <div className="relative z-10 flex flex-col items-center">
              <div className="w-14 h-14 bg-[#0052ff] rounded-full relative shadow-[0_0_60px_rgba(0,82,255,0.7)]">
                <div className="absolute inset-0 rounded-full bg-[#0052ff] animate-ping opacity-50"></div>
                <div className="absolute inset-2 bg-white rounded-full border-4 border-[#0052ff]"></div>
              </div>
              <span className="mt-4 bg-[#0052ff] text-white px-8 py-2 rounded-full text-xs font-black uppercase tracking-widest shadow-xl">KAUNAS HUB</span>
            </div>
            <svg className="absolute inset-0 w-full h-full z-0 pointer-events-none" viewBox="0 0 1000 600" preserveAspectRatio="xMidYMid slice">
              <defs>
                <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stopColor="#0052ff" stopOpacity="0" /><stop offset="50%" stopColor="#0052ff" stopOpacity="1" /><stop offset="100%" stopColor="#0052ff" stopOpacity="0" /></linearGradient>
                <marker id="arrow" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L0,6 L6,3 z" fill="#0052ff" /></marker>
              </defs>
              <path d="M 100,250 Q 300,150 490,280" stroke="url(#lineGrad)" strokeWidth="2" fill="none" strokeDasharray="6 10" markerEnd="url(#arrow)"><animate attributeName="stroke-dashoffset" values="100;0" dur="3s" repeatCount="indefinite" /></path>
              <path d="M 850,200 Q 700,150 510,280" stroke="url(#lineGrad)" strokeWidth="2" fill="none" strokeDasharray="6 10" markerEnd="url(#arrow)"><animate attributeName="stroke-dashoffset" values="100;0" dur="2.8s" repeatCount="indefinite" /></path>
              <path d="M 500,550 Q 500,450 500,330" stroke="url(#lineGrad)" strokeWidth="2" fill="none" strokeDasharray="6 10" markerEnd="url(#arrow)"><animate attributeName="stroke-dashoffset" values="100;0" dur="2.5s" repeatCount="indefinite" /></path>
            </svg>
          </div>
        </div>
      </section>

      {/* ─── CONTACT ─── */}
      <section id="contact" className={`py-24 px-4 sm:px-6 lg:px-8 border-t ${borderColor}`}>
        <div className="max-w-4xl mx-auto">
          <h2 className={`text-center text-4xl font-black ${textPrimary} mb-12 uppercase tracking-tight`}>Get a Quote</h2>
          <div className={`${bgCard} border ${borderAccent} rounded-2xl p-8 md:p-10 shadow-2xl`}>
            <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-5 text-left">
              {[{key:'from'},{key:'to'},{key:'cargoType'},{key:'weight'},{key:'volume'},{key:'name'},{key:'email'}].map(({key}) => (
                <div key={key}>
                  <label className={`block text-xs font-bold ${textSecondary} mb-2 uppercase tracking-widest`}>{(t.contact as any)[key]}</label>
                  <input required className={`w-full px-4 py-3 ${inputBg} border ${borderAccent} ${textPrimary} focus:border-[#0052ff] outline-none transition rounded-lg text-sm`} placeholder={(t.contact.placeholders as any)[key]} />
                </div>
              ))}
              <div className="md:col-span-2">
                 <label className={`block text-xs font-bold ${textSecondary} mb-2 uppercase tracking-widest`}>{t.contact.phone}</label>
                 <input type="tel" required className={`w-full px-4 py-3 ${inputBg} border ${borderAccent} ${textPrimary} focus:border-[#0052ff] outline-none transition rounded-lg text-sm`} placeholder="+370 ..." />
              </div>
              <button type="submit" className="md:col-span-2 bg-[#0052ff] text-white py-5 font-black hover:bg-[#003dd6] transition uppercase tracking-widest rounded-lg">
                {isSubmitted ? 'SENT' : 'SEND REQUEST'}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer className={`${bg} border-t ${borderColor} py-16 px-4`}>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8 text-sm">
          <div className="text-center md:text-left">
            <div className="flex items-center gap-3 mb-2 justify-center md:justify-start">
              <img src="/logo.png" alt="TERSIS" className="h-8 w-8" />
              <h4 className={`text-xl font-black ${textPrimary}`}>TERSIS</h4>
            </div>
            <p className={`${textSecondary} font-bold uppercase`}>Taikos pr. 141-305, Kaunas, LT-51132, Lithuania</p>
            <p className={`${textMuted} mt-4 font-bold tracking-widest uppercase`}>© 2026 TERSIS. European asset-based carrier | All rights reserved.</p>
          </div>
          <div className="flex gap-10">
              <Mail className="text-[#0052ff]" size={22} />
              <Phone className="text-[#0052ff]" size={22} />
              <MapPin className="text-[#0052ff]" size={22} />
          </div>
        </div>
      </footer>
    </div>
  )
}
