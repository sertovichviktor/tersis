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
      <section className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 relative min-h-[90vh] flex items-center">
        {/*
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
        
        <div className="absolute inset-0 bg-black/50 z-10" />

        <div className="max-w-7xl mx-auto w-full relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="animate-fadeInUp">
              <div
                className={`inline-block mb-6 px-4 py-2 ${
                  isDark ? 'bg-[#0052ff]/10 border-[#0052ff]/30' : 'bg-[#0052ff]/5 border-[#0052ff]/20'
                } border rounded-md`}
              >
                <p className="text-[#0052ff] text-sm font-bold tracking-wider">
                  {t.hero.badge}
                </p>
              </div>
              <h1
                className={`text-5xl sm:text-6xl md:text-7xl font-black ${textPrimary} mb-6 leading-[1.05] tracking-tight`}
              >
                {t.hero.title1}
                <br />
                {t.hero.title2}
                <br />
                <span className="text-[#0052ff]">{t.hero.title3}</span>
                <br />
                {t.hero.title4}
              </h1>
              <p className={`text-lg ${textSecondary} mb-10 leading-relaxed max-w-lg`}>
                {t.hero.subtitle}
              </p>
              <div className="flex flex-wrap gap-4">
                <button
                  onClick={() => scrollToSection('contact')}
                  className="bg-[#0052ff] text-white px-8 py-4 rounded-md text-base font-bold hover:bg-[#003dd6] transition flex items-center gap-2 uppercase tracking-wide shadow-lg shadow-[#0052ff]/20"
                >
                  {t.hero.getQuote} <ArrowRight className="h-4 w-4" />
                </button>
                <button
                  onClick={() => scrollToSection('fleet')}
                  className={`border-2 ${isDark ? 'border-white/20 text-white hover:bg-white/5' : 'border-gray-300 text-gray-700 hover:bg-gray-100'} px-8 py-4 rounded-md text-base font-bold transition uppercase tracking-wide`}
                >
                  {t.hero.fleetDetails}
                </button>
              </div>
            </div>

            {/* Hero stats card */}
            <{/* Hero stats card */}
            <div className="hidden md:block relative h-[480px]">
              {/* ... тут много кода внутри ... */}
            </div>
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

      {/* ─── COVERAGE MAP ─── */}
      <section id="coverage" className={`py-24 px-4 sm:px-6 lg:px-8 border-t ${borderColor}`}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 animate-fadeInUp">
            <h2 className={`text-4xl md:text-5xl font-black ${textPrimary} mb-4 tracking-tight`}>
              {t.coverage.title}
            </h2>
            <p className={`text-lg ${textSecondary}`}>{t.coverage.subtitle}</p>
          </div>

          <div
            className={`relative rounded-2xl overflow-hidden border ${borderAccent} ${bgCard}`}
          >
            <div className="relative">
              <img
                src="/map-bg.png"
                alt="TERSIS coverage across Europe"
                className={`w-full h-auto ${isDark ? 'invert brightness-90 opacity-70' : 'opacity-80'}`}
              />
              {/* Overlay gradient */}
              <div
                className={`absolute inset-0 ${
                  isDark
                    ? 'bg-gradient-to-t from-[#050a14] via-transparent to-[#050a14]/50'
                    : 'bg-gradient-to-t from-gray-50 via-transparent to-gray-50/50'
                }`}
              />
              {/* Map caption */}
              <div className="absolute bottom-6 left-6 right-6">
                <div className="flex flex-wrap gap-4 justify-center">
                  {[
                    { label: lang === 'en' ? 'Lithuania' : 'Lietuva', main: true },
                    { label: lang === 'en' ? 'Baltics' : 'Baltijos šalys' },
                    { label: lang === 'en' ? 'Western Europe' : 'Vakarų Europa' },
                    { label: lang === 'en' ? 'Eastern Europe' : 'Rytų Europa' },
                  ].map((region, i) => (
                    <div
                      key={i}
                      className={`px-4 py-2 rounded-lg backdrop-blur-md ${
                        region.main
                          ? 'bg-[#0052ff]/90 text-white'
                          : isDark
                            ? 'bg-white/10 text-white'
                            : 'bg-black/10 text-gray-900'
                      } text-sm font-bold`}
                    >
                      {region.label}
                    </div>
                  ))}
                </div>
              </div>
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
