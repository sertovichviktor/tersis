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

      {/* NAVIGATION */}
      <nav
        className={`fixed w-full z-50 transition-all duration-300 ${
          isScrolled
            ? `${navBg} backdrop-blur-md border-b ${borderColor} shadow-sm`
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-18">
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
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {isMenuOpen && (
          <div className={`md:hidden ${navBg} backdrop-blur-md border-t ${borderColor}`}>
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

      {/* HERO SECTION */}
      <section className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 relative min-h-[90vh] flex items-center overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover z-0"
        >
          <source src="/hero-video.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-[#050a14]/60 z-10" />

        <div className="max-w-7xl mx-auto w-full relative z-20">
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
        </div>
      </section>

      {/* FLEET SECTION - ИЗМЕНЁННАЯ */}
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

          {/* ТВОИ ИЗМЕНЕНИЯ */}
          <div className="flex flex-col lg:flex-row gap-8 items-start">
            <div className="flex-1">
              <p className={`text-lg ${textSecondary} leading-relaxed`}>
                We operate a fleet of 27+ modern Euro 6 vehicles, specializing in high-capacity MEGA trailers (105 m³) and delivering reliable standard transport solutions worldwide.
              </p>
            </div>

            <div className="flex flex-col gap-4 lg:w-96">
              <div className={`border ${borderAccent} p-6 ${bgCard} rounded-xl`}>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-[#0052ff]/10 flex items-center justify-center rounded-lg">
                    <Truck className="h-7 w-7 text-[#0052ff]" />
                  </div>
                  <div>
                    <p className={`font-black text-2xl ${textPrimary}`}>27+</p>
                    <p className={`text-sm ${textSecondary}`}>Own modern Euro-6 vehicles</p>
                  </div>
                </div>
                <p className={`mt-3 text-sm ${textMuted}`}>
                  Full control, no subcontractors, maximum reliability and punctuality.
                </p>
              </div>

              <div className={`border ${borderAccent} p-6 ${bgCard} rounded-xl`}>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-[#0052ff]/10 flex items-center justify-center rounded-lg">
                    <FileText className="h-7 w-7 text-[#0052ff]" />
                  </div>
                  <div>
                    <p className={`font-black text-2xl ${textPrimary}`}>LIC-009666-EBKR</p>
                    <p className={`text-sm ${textSecondary}`}>European Union License</p>
                  </div>
                </div>
                <p className={`mt-3 text-sm ${textMuted}`}>
                  Valid for international road transport across the EU and beyond.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Остальной код файла остаётся без изменений */}
      {/* Services, About, Coverage, Contact, Footer - без изменений */}

    </div>
  )
}

export default TersisApp
