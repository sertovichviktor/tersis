
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
    deadline: '',
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
        deadline: '',
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
  const hoverBorder = isDark
    ? 'hover:border-[#0052ff]/60'
    : 'hover:border-[#0052ff]/50'

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
          <div className="flex justify-between items-center h-18">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <img
                src="/logo.png"
                alt="TERSIS"
                className="h-10 w-10 object-contain"
              />
              <span className={`text-2xl font-black ${textPrimary} tracking-tight`}>
                TERSIS
              </span>
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
                title="Switch language"
              >
                <Languages className="h-3.5 w-3.5" />
                {lang === 'en' ? 'LT' : 'EN'}
              </button>
              <button
                onClick={() => setIsDark(!isDark)}
                className={`p-2 rounded-md border ${borderColor} ${textSecondary} hover:text-[#0052ff] hover:border-[#0052ff]/40 transition`}
                title="Toggle theme"
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

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center gap-2">
              <button
                onClick={() => setLang(lang === 'en' ? 'lt' : 'en')}
                className={`px-2 py-1 text-xs font-bold ${textSecondary}`}
              >
                {lang === 'en' ? 'LT' : 'EN'}
              </button>
              <button
                onClick={() => setIsDark(!isDark)}
                className={`p-1.5 ${textSecondary}`}
              >
                {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </button>
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className={textSecondary}
              >
                {isMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div
            className={`md:hidden ${navBg} backdrop-blur-md border-t ${borderColor}`}
          >
            <div className="px-4 py-3 space-y-2">
              {(['services', 'fleet', 'about', 'coverage', 'contact'] as const).map(
                (section) => (
                  <button
                    key={section}
                    onClick={() => scrollToSection(section)}
                    className={`block w-full text-left ${textSecondary} hover:text-[#0052ff] py-2 text-sm font-semibold`}
                  >
                    {t.nav[section]}
                  </button>
                ),
              )}
              <button
                onClick={() => scrollToSection('contact')}
                className="w-full bg-[#0052ff] text-white px-6 py-2.5 rounded-md hover:bg-[#003dd6] font-semibold text-sm mt-2"
              >
                {t.nav.getQuote}
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* ─── HERO SECTION ─── */}
      <section className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 relative min-h-[90vh] md:h-screen flex items-center overflow-hidden bg-[#050a14]">
        {/* VIDEO BACKGROUND */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover z-0"
        >
          <source src="/hero-video.mp4.mp4" type="video/mp4" />
        </video>
        {/* Оверлей для читаемости */}
        <div className="absolute inset-0 bg-black/60 z-10" />

        <div className="max-w-7xl mx-auto w-full relative z-20">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* ЛЕВАЯ ЧАСТЬ */}
            <div className="animate-fadeInUp text-left">
              <div className={`inline-block mb-6 px-4 py-2 bg-[#0052ff]/20 border border-[#0052ff]/40 rounded-md`}>
                <p className="text-[#0052ff] text-sm font-bold tracking-wider">
                  {lang === 'en' ? 'EST. 2011 — 13+ YEARS' : 'ĮKURTA 2011 — 13+ METŲ'}
                </p>
              </div>
              {/* text-white гарантирует видимость в светлой теме */}
              <h1 className="text-4xl sm:text-6xl md:text-7xl font-black text-white mb-6 leading-[1.05] tracking-tight uppercase">
                {t.hero.title1}<br />
                {t.hero.title2}<br />
                <span className="text-[#0052ff]">{t.hero.title3}</span><br />
                {t.hero.title4}
              </h1>
              <p className="text-lg text-gray-200 mb-10 leading-relaxed max-w-lg font-medium">
                {lang === 'en' 
                  ? 'We operate a fleet of 27+ modern Euro 6 vehicles, specializing in high-capacity MEGA trailers (105 m³) and delivering reliable standard transport solutions worldwide.' 
                  : 'Valdome 27+ modernių Euro 6 transporto priemonių parką, specializuojamės didelio tūrio MEGA puspriekabėmis (105 m³) ir teikiame patikimus standartinio transporto sprendimus visame pasaulyje.'
                }
              </p>
              <div className="flex flex-wrap gap-4 mb-12 md:mb-0">
                <button onClick={() => scrollToSection('contact')} className="bg-[#0052ff] text-white px-8 py-4 rounded-md text-base font-bold hover:bg-[#003dd6] transition flex items-center gap-2 uppercase tracking-wide shadow-lg">
                  {t.hero.getQuote} <ArrowRight className="h-4 w-4" />
                </button>
                <button onClick={() => scrollToSection('fleet')} className="border-2 border-white/20 text-white hover:bg-white/10 px-8 py-4 rounded-md text-base font-bold transition uppercase tracking-wide">
                  {t.hero.fleetDetails}
                </button>
              </div>
            </div>

            {/* ПРАВАЯ ЧАСТЬ (Блоки видны и на мобайле, и на десктопе) */}
            <div className="flex flex-col gap-4 md:gap-6 items-start md:items-end">
               <div className="bg-white/5 backdrop-blur-md border border-white/10 p-6 md:p-8 rounded-xl w-full max-w-[340px]">
                  <Truck className="h-8 w-8 md:h-10 md:w-10 text-[#0052ff] mb-4" />
                  <p className="text-4xl md:text-5xl font-black text-white mb-1 leading-none uppercase">27+</p>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                    {lang === 'en' ? 'Own Vehicles' : 'Nuosavas transportas'}
                  </p>
               </div>
               <div className="bg-white/5 backdrop-blur-md border border-white/10 p-6 md:p-8 rounded-xl w-full max-w-[340px]">
                  <FileText className="h-8 w-8 md:h-10 md:w-10 text-[#0052ff] mb-4" />
                  <p className="text-lg md:text-xl font-black text-white mb-1 uppercase tracking-tight">LIC-009666-EBKR</p>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                    {lang === 'en' ? 'EU Transport License' : 'ES transporto licencija'}
                  </p>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── FLEET SPECIFICATIONS ─── */}
      <section id="fleet" className={`py-24 px-4 sm:px-6 lg:px-8 border-t ${borderColor}`}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 animate-fadeInUp">
            <h2 className={`text-4xl md:text-5xl font-black ${textPrimary} mb-4 tracking-tight`}>
              {t.fleet.title}
            </h2>
            <p className={`text-lg ${textSecondary}`}>{t.fleet.subtitle}</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Standard Class */}
            <div
              className={`border ${borderAccent} p-8 ${bgCard} rounded-xl ${hoverBorder} transition-all duration-300 animate-slideIn`}
              style={{ animationDelay: '0.1s' }}
            >
              <div className="flex items-center gap-4 mb-8">
                <div
                  className={`w-14 h-14 ${isDark ? 'bg-[#0052ff]/10' : 'bg-[#0052ff]/5'} flex items-center justify-center border ${borderAccent} rounded-lg`}
                >
                  <Truck className="h-7 w-7 text-[#0052ff]" />
                </div>
                <div>
                  <h3 className={`text-xl font-black ${textPrimary} tracking-tight`}>
                    {t.fleet.standardClass}
                  </h3>
                  <p className="text-[#0052ff] font-bold text-sm">92 m³ {t.fleet.capacity}</p>
                </div>
              </div>
              <div className="space-y-4 mb-8">
                {[
                  [t.fleet.length, '13.6 m'],
                  [t.fleet.height, '2.7 m'],
                  [t.fleet.capacity, `33 ${t.fleet.euroPallets}`],
                  [t.fleet.idealFor, t.fleet.generalCargo],
                ].map(([label, value], i) => (
                  <div
                    key={i}
                    className={`flex justify-between ${i < 3 ? `border-b ${borderColor}` : ''} pb-3`}
                  >
                    <span className={`${textMuted} text-sm uppercase tracking-widest`}>
                      {label}
                    </span>
                    <span className={`${textPrimary} font-bold`}>{value}</span>
                  </div>
                ))}
              </div>
              <div className={`pt-4 border-t ${borderColor}`}>
                <p className={`${textMuted} text-xs`}>{t.fleet.standardFooter}</p>
              </div>
            </div>

            {/* Mega Advantage */}
            <div
              className={`border ${borderAccent} p-8 ${bgCard} rounded-xl ${hoverBorder} transition-all duration-300 animate-slideIn`}
              style={{ animationDelay: '0.2s' }}
            >
              <div className="flex items-center gap-4 mb-8">
                <div
                  className={`w-14 h-14 ${isDark ? 'bg-[#0052ff]/10' : 'bg-[#0052ff]/5'} flex items-center justify-center border ${borderAccent} rounded-lg`}
                >
                  <Maximize2 className="h-7 w-7 text-[#0052ff]" />
                </div>
                <div>
                  <h3 className={`text-xl font-black ${textPrimary} tracking-tight`}>
                    {t.fleet.megaAdvantage}
                  </h3>
                  <p className="text-[#0052ff] font-bold text-sm">105 m³ {t.fleet.capacity}</p>
                </div>
              </div>
              <div className="space-y-4 mb-8">
                {[
                  [t.fleet.internalHeight, '3.0 m'],
                  [t.fleet.volume, '105 m³'],
                  [t.fleet.specialization, t.fleet.lightweightCargo],
                  [t.fleet.advantage, '+14% ' + t.fleet.capacity],
                ].map(([label, value], i) => (
                  <div
                    key={i}
                    className={`flex justify-between ${i < 3 ? `border-b ${borderColor}` : ''} pb-3`}
                  >
                    <span className={`${textMuted} text-sm uppercase tracking-widest`}>
                      {label}
                    </span>
                    <span className={`${textPrimary} font-bold`}>{value}</span>
                  </div>
                ))}
              </div>
              <div className={`pt-4 border-t ${borderColor}`}>
                <p className={`${textMuted} text-xs`}>{t.fleet.megaFooter}</p>
              </div>
            </div>
          </div>

          {/* Fleet badges */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: Shield, title: t.fleet.cmrInsured, sub: t.fleet.fullCoverage },
              { icon: Clock, title: t.fleet.realTime, sub: t.fleet.tracking },
              { icon: Truck, title: t.fleet.modernFleet, sub: '2018-2023' },
              { icon: Check, title: t.fleet.euro6, sub: t.fleet.compliant },
            ].map((item, idx) => (
              <div
                key={idx}
                className={`border ${borderAccent} p-5 text-center ${bgCard} rounded-lg hover:bg-[#0052ff]/5 transition`}
              >
                <item.icon className="h-7 w-7 text-[#0052ff] mx-auto mb-3" />
                <p className={`font-black ${textPrimary} text-xs mb-1 uppercase tracking-wide`}>
                  {item.title}
                </p>
                <p className={`text-xs ${textMuted}`}>{item.sub}</p>
              </div>
            ))}
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
            <p className={`text-lg ${textSecondary}`}>{t.services.subtitle}</p>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-5">
            {t.services.items.map((service, idx) => {
              const Icon = serviceIcons[idx]
              return (
                <div
                  key={idx}
                  className={`border ${borderAccent} p-6 ${bgCard} rounded-xl ${hoverBorder} transition-all duration-300 group`}
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

      {/* ─── ABOUT TERSIS ─── */}
      <section id="about" className={`py-24 px-4 sm:px-6 lg:px-8 border-t ${borderColor}`}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 animate-fadeInUp">
            <h2 className={`text-4xl md:text-5xl font-black ${textPrimary} mb-4 tracking-tight`}>
              {t.about.title}
            </h2>
            <p className={`text-lg ${textSecondary}`}>{t.about.subtitle}</p>
          </div>

          {/* About text */}
          <div className="max-w-3xl mx-auto mb-16 space-y-4">
            <p className={`${textSecondary} text-base leading-relaxed text-center`}>
              {t.about.text1}
            </p>
            <p className={`${textSecondary} text-base leading-relaxed text-center`}>
              {t.about.text2}
            </p>
          </div>

          {/* Feature grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {t.about.features.map((item, idx) => {
              const Icon = aboutIcons[idx]
              return (
                <div
                  key={idx}
                  className={`border ${borderAccent} p-6 ${bgCard} rounded-xl ${hoverBorder} transition-all group`}
                >
                  <Icon className="h-10 w-10 text-[#0052ff] mb-4 group-hover:scale-110 transition" />
                  <h3 className={`text-base font-black ${textPrimary} mb-1 tracking-tight`}>
                    {item.title}
                  </h3>
                  <p className={`text-sm ${textMuted}`}>{item.subtitle}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ─── COVERAGE MAP (FINAL PRO VERSION) ─── */}
<section id="coverage" className={`py-24 px-4 sm:px-6 lg:px-8 border-t ${borderColor}`}>
  <div className="max-w-7xl mx-auto">
    <div className="mb-4">
      <span className="text-xs font-bold tracking-[0.3em] uppercase text-[#0052ff]">
        {lang === 'en' ? 'Global Coverage' : 'Globalus tinklas'}
      </span>
    </div>

    <h2 className={`text-4xl md:text-5xl font-black ${textPrimary} mb-4 tracking-tight uppercase`}>
      {t.coverage.title}
    </h2>

    <p className={`${textSecondary} mb-12 max-w-2xl font-medium leading-relaxed`}>
      {lang === 'en'
        ? 'All routes converge at our Kaunas hub — the strategic centre of our international logistics network.'
        : 'Visi maršrutai susijungia mūsų Kauno centre – strateginėje mūsų tarptautinio logistikos tinklo širdyje.'}
    </p>

    <div className="relative w-full rounded-[40px] overflow-hidden bg-[#0B1220] shadow-2xl border border-white/5">

      <svg viewBox="0 0 900 440" className="w-full h-auto block">
        <defs>
          {/* Glow */}
          <radialGradient id="kaunas-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#1E5EFF" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#1E5EFF" stopOpacity="0" />
          </radialGradient>

          {/* Map depth */}
          <linearGradient id="mapFade" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1A2333" />
            <stop offset="100%" stopColor="#0B1220" />
          </linearGradient>

          {/* Route gradient */}
          <linearGradient id="routeMain" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#1E5EFF" stopOpacity="0" />
            <stop offset="60%" stopColor="#1E5EFF" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#4D8AFF" stopOpacity="1" />
          </linearGradient>
        </defs>

        {/* CONTINENTS */}
        <g fill="url(#mapFade)" stroke="#243045" strokeWidth="0.6">
          <polygon points="60,60 160,50 200,80 210,140 180,180 130,200 80,190 50,150 40,100" />
          <polygon points="130,210 170,200 200,240 190,310 160,340 130,320 110,270 115,230" />
          <polygon points="380,50 460,45 490,70 480,110 450,130 410,125 385,100 375,70" />
          <polygon points="390,140 450,130 480,160 490,230 470,300 430,330 390,310 365,260 360,190 370,150" />
          <polygon points="480,45 680,40 760,70 800,110 780,160 700,180 600,170 520,150 480,120 470,80" />
          <polygon points="640,170 700,165 730,190 720,220 680,230 645,210" />
          <polygon points="680,260 760,255 790,290 780,330 730,345 685,325 665,295" />
        </g>

        {/* ROUTES */}
        <g>
          {[
            "M 100,150 Q 300,100 509,85",
            "M 750,150 Q 600,100 509,85",
            "M 200,350 Q 350,200 509,85",
            "M 750,300 Q 650,200 509,85",
          ].map((d, i) => (
            <path
              key={i}
              d={d}
              fill="none"
              stroke="url(#routeMain)"
              strokeWidth="1.5"
              strokeDasharray="4 8"
            >
              <animate
                attributeName="stroke-dashoffset"
                values="100;0"
                dur={`${2.5 + i * 0.4}s`}
                repeatCount="indefinite"
              />
            </path>
          ))}
        </g>

        {/* KAUNAS */}
        <circle cx="509" cy="85" r="45" fill="url(#kaunas-glow)" />

        <circle cx="509" cy="85" r="10" fill="#1E5EFF">
          <animate attributeName="r" values="10;13;10" dur="2s" repeatCount="indefinite" />
        </circle>

        <circle cx="509" cy="85" r="4" fill="#ffffff" />

        {/* LABEL */}
        <text
          x="509"
          y="50"
          textAnchor="middle"
          fill="#ffffff"
          fontSize="11"
          fontWeight="900"
          letterSpacing="2"
          style={{ filter: 'drop-shadow(0 0 6px #1E5EFF)' }}
        >
          KAUNAS HUB
        </text>

        <line x1="509" y1="75" x2="509" y2="60" stroke="#1E5EFF" strokeWidth="2" />
      </svg>

      {/* FOOT TEXT */}
      <div className="absolute bottom-4 left-6 hidden md:block">
        <span className="text-[10px] font-mono text-[#4D8AFF]/60 tracking-[0.2em] uppercase font-bold">
          Network Coverage
        </span>
      </div>

      <div className="absolute bottom-4 right-6 hidden md:block">
        <span className="text-[10px] font-mono text-[#4D8AFF]/60 tracking-[0.2em] uppercase font-bold">
          27+ Active Routes
        </span>
      </div>
    </div>
  </div>
</section>
      {/* ─── CONTACT / QUOTE ─── */}
      <section id="contact" className={`py-24 px-4 sm:px-6 lg:px-8 border-t ${borderColor}`}>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12 animate-fadeInUp">
            <h2 className={`text-4xl md:text-5xl font-black ${textPrimary} mb-4 tracking-tight`}>
              {t.contact.title}
            </h2>
            <p className={`text-lg ${textSecondary}`}>{t.contact.subtitle}</p>
          </div>

          <div
            className={`${bgCard} border ${borderAccent} rounded-2xl p-8 md:p-10 animate-fadeInUp`}
          >
            <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-5">
              {[
                { key: 'from', type: 'text' },
                { key: 'to', type: 'text' },
                { key: 'cargoType', type: 'text' },
                { key: 'weight', type: 'text' },
                { key: 'volume', type: 'text' },
                { key: 'deadline', type: 'date' },
                { key: 'name', type: 'text' },
                { key: 'email', type: 'email' },
              ].map(({ key, type }) => (
                <div key={key}>
                  <label
                    className={`block text-xs font-bold ${textSecondary} mb-2 uppercase tracking-widest`}
                  >
                    {t.contact[key as keyof typeof t.contact] as string}
                  </label>
                  <input
                    type={type}
                    required
                    value={formData[key as keyof typeof formData]}
                    onChange={(e) =>
                      setFormData({ ...formData, [key]: e.target.value })
                    }
                    className={`w-full px-4 py-3 ${inputBg} border ${borderAccent} ${textPrimary} focus:border-[#0052ff] outline-none transition rounded-lg text-sm`}
                    placeholder={
                      (t.contact.placeholders as Record<string, string>)[key] || ''
                    }
                  />
                </div>
              ))}
              <div className="md:col-span-2">
                <label
                  className={`block text-xs font-bold ${textSecondary} mb-2 uppercase tracking-widest`}
                >
                  {t.contact.phone}
                </label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  className={`w-full px-4 py-3 ${inputBg} border ${borderAccent} ${textPrimary} focus:border-[#0052ff] outline-none transition rounded-lg text-sm`}
                  placeholder={t.contact.placeholders.phone}
                />
              </div>
              <div className="md:col-span-2">
                <label
                  className={`block text-xs font-bold ${textSecondary} mb-2 uppercase tracking-widest`}
                >
                  {t.contact.message}
                </label>
                <textarea
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  rows={3}
                  className={`w-full px-4 py-3 ${inputBg} border ${borderAccent} ${textPrimary} focus:border-[#0052ff] outline-none transition resize-none rounded-lg text-sm`}
                  placeholder={t.contact.placeholders.message}
                />
              </div>
              <div className="md:col-span-2">
                <button
                  type="submit"
                  className="w-full bg-[#0052ff] text-white px-8 py-4 text-base font-black hover:bg-[#003dd6] transition uppercase tracking-wide rounded-lg shadow-lg shadow-[#0052ff]/20"
                >
                  {isSubmitted ? t.contact.submitted : t.contact.submit}
                </button>
                {isSubmitted && (
                  <div className="mt-4 bg-green-500/10 border border-green-500/30 text-green-400 px-4 py-3 text-center text-sm rounded-lg">
                    {t.contact.successMessage}
                  </div>
                )}
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer className={`${bg} border-t ${borderColor} py-16 px-4 sm:px-6 lg:px-8`}>
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-12 mb-12">
            {/* Company info */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <img src="/logo.png" alt="TERSIS" className="h-8 w-8 object-contain" />
                <h4 className={`text-xl font-black ${textPrimary} tracking-tight`}>
                  TERSIS
                </h4>
              </div>
              <div className={`space-y-4 ${textSecondary} text-sm`}>
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-[#0052ff] mt-0.5 flex-shrink-0" />
                  <div>
                    <p className={`font-bold ${textPrimary} uppercase text-xs tracking-widest mb-1`}>
                      {t.footer.address}
                    </p>
                    <p>
                      Taikos pr. 141-305
                      <br />
                      Kaunas, LT-51132
                      <br />
                      Lithuania
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="h-5 w-5 text-[#0052ff] mt-0.5 flex-shrink-0" />
                  <div>
                    <p className={`font-bold ${textPrimary} uppercase text-xs tracking-widest mb-1`}>
                      {t.footer.phone}
                    </p>
                    <p>+370 37 321 321</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Mail className="h-5 w-5 text-[#0052ff] mt-0.5 flex-shrink-0" />
                  <div>
                    <p className={`font-bold ${textPrimary} uppercase text-xs tracking-widest mb-1`}>
                      {t.footer.email}
                    </p>
                    <p>info@tersis.lt</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Services links */}
            <div>
              <h5 className={`font-black ${textPrimary} mb-6 text-sm uppercase tracking-widest`}>
                {t.footer.servicesTitle}
              </h5>
              <ul className={`space-y-2 ${textSecondary} text-sm`}>
                {t.services.items.slice(0, 6).map((svc, i) => (
                  <li key={i}>
                    <button
                      onClick={() => scrollToSection('services')}
                      className="hover:text-[#0052ff] transition"
                    >
                      {svc.title}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h5 className={`font-black ${textPrimary} mb-6 text-sm uppercase tracking-widest`}>
                {t.footer.legalTitle}
              </h5>
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-2 text-[#0052ff] font-black">
                  <FileText className="h-4 w-4" />
                  <span>LIC-009666-EBKR</span>
                </div>
                <div className="flex items-center gap-2 text-green-400 font-bold">
                  <Check className="h-4 w-4" />
                  <span>{t.footer.cmrInsured}</span>
                </div>
                <div className="flex items-center gap-2 text-[#0052ff] font-bold">
                  <Check className="h-4 w-4" />
                  <span>{t.footer.euroCompliant}</span>
                </div>
              </div>
            </div>
          </div>
          <div className={`border-t ${borderColor} pt-8 text-center ${textMuted} text-xs uppercase tracking-widest`}>
            <p>{t.footer.copyright}</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
