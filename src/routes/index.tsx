import { useState, useEffect, useCallback } from 'react'
import { createFileRoute } from '@tanstack/react-router'
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
    from: '',
    to: '',
    cargoType: '',
    weight: '',
    volume: '',
    name: '',
    email: '',
    phone: '',
    message: '',
  })
  const [isSubmitted, setIsSubmitted] = useState(false)

  const t = translations[lang]

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark)
    document.documentElement.classList.toggle('light', !isDark)
  }, [isDark])

  const scrollToSection = useCallback(
    (id: string) => {
      const element = document.getElementById(id)
      element?.scrollIntoView({ behavior: 'smooth' })
      setIsMenuOpen(false)
    },
    [],
  )

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitted(true)
    setTimeout(() => {
      setFormData({
        from: '',
        to: '',
        cargoType: '',
        weight: '',
        volume: '',
        name: '',
        email: '',
        phone: '',
        message: '',
      })
      setIsSubmitted(false)
    }, 3000)
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
      {/* Subtle grid overlay */}
      {isDark && (
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage:
              'linear-gradient(0deg, transparent 24%, rgba(0, 82, 255, 0.08) 25%, rgba(0, 82, 255, 0.08) 26%, transparent 27%, transparent 74%, rgba(0, 82, 255, 0.08) 75%, rgba(0, 82, 255, 0.08) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(0, 82, 255, 0.08) 25%, rgba(0, 82, 255, 0.08) 26%, transparent 27%, transparent 74%, rgba(0, 82, 255, 0.08) 75%, rgba(0, 82, 255, 0.08) 76%, transparent 77%, transparent)',
            backgroundSize: '60px 60px',
          }}
        />
      )}

      {/* ─── NAVIGATION ─── */}
      <nav
        className={`fixed w-full z-50 transition-all duration-300 ${
          isScrolled
            ? `${navBg} backdrop-blur-md border-b ${borderColor} shadow-sm`
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo + License (Пункт 4) */}
            <div className="flex items-center gap-3">
              <img
                src="/logo.png"
                alt="TERSIS"
                className="h-10 w-10 object-contain"
              />
              <div className="flex flex-col">
                <span className={`text-2xl font-black ${textPrimary} tracking-tight leading-none uppercase italic`}>
                  TERSIS
                </span>
                <span className="text-[#0052ff] text-[10px] font-black mt-1 uppercase tracking-tight">
                  LIC-009666-EBKR
                </span>
                <span className={`${textMuted} text-[8px] font-bold uppercase tracking-tighter`}>
                  Asset-Based Carrier / Own Fleet
                </span>
              </div>
            </div>

            {/* Desktop nav */}
            <div className="hidden md:flex items-center space-x-6">
              {(['services', 'fleet', 'about', 'coverage', 'contact'] as const).map(
                (section) => (
                  <button
                    key={section}
                    onClick={() => scrollToSection(section)}
                    className={`${textSecondary} hover:text-[#0052ff] transition text-sm font-semibold uppercase tracking-wide`}
                  >
                    {t.nav[section]}
                  </button>
                ),
              )}
            </div>

            {/* Controls */}
            <div className="hidden md:flex items-center gap-3">
              <button
                onClick={() => setLang(lang === 'en' ? 'lt' : 'en')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md border ${borderColor} ${textSecondary} hover:text-[#0052ff] hover:border-[#0052ff]/40 transition text-xs font-bold uppercase`}
              >
                <Languages className="h-3.5 w-3.5" />
                {lang === 'en' ? 'LT' : 'EN'}
              </button>
              <button
                onClick={() => setIsDark(!isDark)}
                className={`p-2 rounded-md border ${borderColor} ${textSecondary} hover:text-[#0052ff] hover:border-[#0052ff]/40 transition`}
              >
                {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="bg-[#0052ff] text-white px-5 py-2 hover:bg-[#003dd6] transition font-bold text-sm uppercase tracking-wide rounded-md"
              >
                {t.nav.getQuote}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* ─── HERO SECTION (Пункт 1 и 6) ─── */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Видео фон */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover z-0"
        >
          <source src="/hero-video.mp4.mp4" type="video/mp4" />
        </video>
        <div className={`absolute inset-0 z-10 ${isDark ? 'bg-[#050a14]/75' : 'bg-white/40'}`} />

        <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 relative z-20 text-center md:text-left">
          <div className="max-w-3xl animate-fadeInUp">
            <div
              className={`inline-block mb-6 px-4 py-2 ${
                isDark ? 'bg-[#0052ff]/10 border-[#0052ff]/30' : 'bg-[#0052ff]/5 border-[#0052ff]/20'
              } border rounded-md`}
            >
              <p className="text-[#0052ff] text-sm font-bold tracking-wider uppercase">
                Worldwide Logistics Solutions
              </p>
            </div>
            <h1
              className={`text-5xl sm:text-6xl md:text-8xl font-black ${textPrimary} mb-6 leading-[1.05] tracking-tight uppercase italic`}
            >
              {t.hero.title1}
              <br />
              <span className="text-[#0052ff]">{t.hero.title3}</span> {t.hero.title4}
            </h1>
            <p className={`text-xl ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-10 leading-relaxed max-w-2xl font-medium`}>
              Operating 27+ modern Euro-6 vehicles. Specializing in high-capacity MEGA trailers (105 m³) and standard solutions <span className="text-[#0052ff] font-bold">worldwide</span>.
            </p>
            <div className="flex flex-wrap gap-4 justify-center md:justify-start">
              <button
                onClick={() => scrollToSection('contact')}
                className="bg-[#0052ff] text-white px-8 py-4 rounded-md text-base font-bold hover:bg-[#003dd6] transition flex items-center gap-2 uppercase tracking-wide shadow-xl shadow-[#0052ff]/40"
              >
                {t.hero.getQuote} <ArrowRight className="h-4 w-4" />
              </button>
              <button
                onClick={() => scrollToSection('fleet')}
                className={`border-2 ${isDark ? 'border-white/30 text-white hover:bg-white/10' : 'border-gray-300 text-gray-700 hover:bg-gray-100'} px-8 py-4 rounded-md text-base font-bold transition uppercase tracking-wide`}
              >
                {t.hero.fleetDetails}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ─── FLEET SECTION (Без изменений) ─── */}
      <section id="fleet" className={`py-24 px-4 sm:px-6 lg:px-8 border-t ${borderColor}`}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 animate-fadeInUp">
            <h2 className={`text-4xl md:text-5xl font-black ${textPrimary} mb-4 tracking-tight`}>
              {t.fleet.title}
            </h2>
            <p className={`text-lg ${textSecondary}`}>{t.fleet.subtitle}</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className={`border ${borderAccent} p-8 ${bgCard} rounded-xl hover:border-[#0052ff]/60 transition-all duration-300`}>
              <h3 className={`text-xl font-black ${textPrimary} mb-2`}>{t.fleet.standardClass}</h3>
              <p className="text-[#0052ff] font-bold mb-6 italic">92 m³ Capacity</p>
              <div className="space-y-3">
                <div className={`flex justify-between border-b ${borderColor} pb-2`}>
                   <span className={textMuted}>{t.fleet.length}</span> <span className={textPrimary}>13.6 m</span>
                </div>
                <div className={`flex justify-between border-b ${borderColor} pb-2`}>
                   <span className={textMuted}>{t.fleet.height}</span> <span className={textPrimary}>2.7 m</span>
                </div>
                <div className={`flex justify-between`}>
                   <span className={textMuted}>{t.fleet.euroPallets}</span> <span className={textPrimary}>33</span>
                </div>
              </div>
            </div>
            <div className={`border ${borderAccent} p-8 ${bgCard} rounded-xl hover:border-[#0052ff]/60 transition-all duration-300`}>
              <h3 className={`text-xl font-black ${textPrimary} mb-2`}>{t.fleet.megaAdvantage}</h3>
              <p className="text-[#0052ff] font-bold mb-6 italic">105 m³ Capacity</p>
              <div className="space-y-3">
                <div className={`flex justify-between border-b ${borderColor} pb-2`}>
                   <span className={textMuted}>{t.fleet.internalHeight}</span> <span className={textPrimary}>3.0 m</span>
                </div>
                <div className={`flex justify-between border-b ${borderColor} pb-2`}>
                   <span className={textMuted}>{t.fleet.volume}</span> <span className={textPrimary}>105 m³</span>
                </div>
                <div className={`flex justify-between`}>
                   <span className={textMuted}>{t.fleet.advantage}</span> <span className={textPrimary}>+14% capacity</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── SERVICES ─── */}
      <section id="services" className={`py-24 px-4 sm:px-6 lg:px-8 border-t ${borderColor}`}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 animate-fadeInUp">
            <h2 className={`text-4xl md:text-5xl font-black ${textPrimary} mb-4 tracking-tight`}>
              {t.services.title}
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-5">
            {t.services.items.map((service, idx) => {
              const Icon = serviceIcons[idx] || Truck
              return (
                <div
                  key={idx}
                  className={`border ${borderAccent} p-6 ${bgCard} rounded-xl hover:border-[#0052ff]/60 transition-all duration-300 group`}
                >
                  <Icon className="h-9 w-9 text-[#0052ff] mb-4 group-hover:scale-110 transition" />
                  <h3 className={`text-sm font-black ${textPrimary} mb-1 uppercase tracking-wide`}>
                    {service.title}
                  </h3>
                  <p className={`text-xs ${textMuted} font-semibold uppercase tracking-widest`}>
                    {service.subtitle}
                  </p>
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
            <h2 className={`text-4xl md:text-5xl font-black ${textPrimary} mb-4 tracking-tight`}>
              {t.about.title}
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {t.about.features.map((item, idx) => {
              const Icon = aboutIcons[idx] || Shield
              return (
                <div key={idx} className={`border ${borderAccent} p-6 ${bgCard} rounded-xl transition-all group`}>
                  <Icon className="h-10 w-10 text-[#0052ff] mb-4 group-hover:scale-110 transition" />
                  <h3 className={`text-base font-black ${textPrimary} mb-1 tracking-tight`}>{item.title}</h3>
                  <p className={`text-sm ${textMuted}`}>{item.subtitle}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ─── COVERAGE MAP (Пункт 2 - Анимированный Хаб) ─── */}
      <section id="coverage" className={`py-24 px-4 sm:px-6 lg:px-8 border-t ${borderColor}`}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 animate-fadeInUp">
            <h2 className={`text-4xl md:text-5xl font-black ${textPrimary} mb-4 tracking-tight`}>
              {t.coverage.title}
            </h2>
            <p className={`text-lg ${textSecondary} font-bold uppercase tracking-widest`}>
              Consolidation Hub: Kaunas, Lithuania
            </p>
          </div>

          <div className={`relative h-[550px] rounded-3xl overflow-hidden border ${borderAccent} flex items-center justify-center ${isDark ? 'bg-slate-900' : 'bg-slate-100'}`}>
             <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/world-map.png')] bg-center scale-110"></div>
             
             {/* KAUNAS POINT */}
             <div className="relative z-10 flex flex-col items-center">
                <div className="w-12 h-12 bg-[#0052ff] rounded-full relative shadow-[0_0_50px_rgba(0,82,255,0.6)]">
                    <div className="absolute inset-0 rounded-full bg-[#0052ff] animate-ping opacity-75"></div>
                    <div className="absolute inset-2 bg-white rounded-full border-4 border-[#0052ff]"></div>
                </div>
                <div className="absolute top-16 left-1/2 -translate-x-1/2 whitespace-nowrap">
                   <span className="bg-[#0052ff] text-white px-6 py-2 rounded-full text-xs font-black uppercase tracking-widest italic shadow-xl">
                      Kaunas Hub
                   </span>
                </div>
             </div>

             {/* SVG ARROWS */}
             <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
                <path d="M 100,200 Q 300,250 480,290" stroke="#0052ff" strokeWidth="2" fill="none" strokeDasharray="10,5" className="animate-pulse opacity-40" />
                <path d="M 850,150 Q 650,220 520,290" stroke="#0052ff" strokeWidth="2" fill="none" strokeDasharray="10,5" className="opacity-40" />
                <path d="M 200,500 Q 350,450 490,320" stroke="#0052ff" strokeWidth="2" fill="none" strokeDasharray="10,5" className="opacity-40" />
                <path d="M 900,450 Q 750,400 520,310" stroke="#0052ff" strokeWidth="2" fill="none" strokeDasharray="10,5" className="opacity-40" />
             </svg>
          </div>
        </div>
      </section>

      {/* ─── CONTACT (Пункт 3 - Убран Deadline) ─── */}
      <section id="contact" className={`py-24 px-4 sm:px-6 lg:px-8 border-t ${borderColor}`}>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className={`text-4xl md:text-5xl font-black ${textPrimary} mb-4 tracking-tight uppercase italic`}>
               Get a Quote
            </h2>
          </div>

          <div className={`${bgCard} border ${borderAccent} rounded-2xl p-8 md:p-10 shadow-2xl`}>
            <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-5 text-left">
              {[
                { key: 'from', type: 'text' },
                { key: 'to', type: 'text' },
                { key: 'cargoType', type: 'text' },
                { key: 'weight', type: 'text' },
                { key: 'volume', type: 'text' },
                { key: 'name', type: 'text' },
                { key: 'email', type: 'email' },
              ].map(({ key, type }) => (
                <div key={key}>
                  <label className={`block text-xs font-bold ${textSecondary} mb-2 uppercase tracking-widest`}>
                    {t.contact[key as keyof typeof t.contact] as string}
                  </label>
                  <input
                    type={type} required value={formData[key as keyof typeof formData]}
                    onChange={(e) => setFormData({ ...formData, [key]: e.target.value })}
                    className={`w-full px-4 py-3 ${inputBg} border ${borderAccent} ${textPrimary} focus:border-[#0052ff] outline-none transition rounded-lg text-sm`}
                    placeholder={(t.contact.placeholders as Record<string, string>)[key] || ''}
                  />
                </div>
              ))}
              <div className="md:col-span-2">
                <label className={`block text-xs font-bold ${textSecondary} mb-2 uppercase tracking-widest`}>Phone</label>
                <input type="tel" required value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className={`w-full px-4 py-3 ${inputBg} border ${borderAccent} ${textPrimary} focus:border-[#0052ff] outline-none transition rounded-lg text-sm`}
                  placeholder={t.contact.placeholders.phone} />
              </div>
              <div className="md:col-span-2 pt-4 text-center">
                <button type="submit" className="w-full bg-[#0052ff] text-white py-5 text-base font-black hover:bg-[#003dd6] transition uppercase tracking-widest rounded-lg">
                  {isSubmitted ? t.contact.submitted : t.contact.submit}
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* ─── FOOTER (Пункт 7 - 2026) ─── */}
      <footer className={`${bg} border-t ${borderColor} py-16 px-4`}>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-center md:text-left">
            <div className="flex items-center gap-3 mb-4 justify-center md:justify-start">
              <img src="/logo.png" alt="TERSIS" className="h-8 w-8" />
              <h4 className={`text-xl font-black ${textPrimary}`}>TERSIS</h4>
            </div>
            <p className="text-[#0052ff] font-bold text-xs mb-1 uppercase tracking-tight">LICENSE: LIC-009666-EBKR</p>
            <p className={`${textMuted} text-[10px] uppercase tracking-widest font-bold italic`}>
              © 2026 TERSIS. European asset-based carrier | All rights reserved.
            </p>
          </div>
          <div className="flex gap-6">
              <div className="flex flex-col items-center">
                 <Mail className="h-5 w-5 text-[#0052ff] mb-2" />
                 <span className={`${textMuted} text-[10px] font-bold tracking-tight`}>info@tersis.lt</span>
              </div>
              <div className="flex flex-col items-center">
                 <Phone className="h-5 w-5 text-[#0052ff] mb-2" />
                 <span className={`${textMuted} text-[10px] font-bold tracking-tight`}>+370 37 321 321</span>
              </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
