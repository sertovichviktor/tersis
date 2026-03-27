
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
  head: () => ({
    meta: [
      { title: 'TERSIS | Asset-Based Carrier & International Logistics Hub' },
      { 
        name: 'description', 
        content: 'TERSIS is a reliable European logistics partner since 2011. Operating a fleet of 27+ modern Euro 6 vehicles with MEGA trailers. Worldwide transport solutions via Kaunas hub.' 
      },
      { name: 'keywords', content: 'logistics, transport Europe, MEGA trailers, Tersis, asset-based carrier, Kaunas hub' },
      { property: 'og:title', content: 'TERSIS | International Logistics & Transport' },
      { property: 'og:image', content: '/logo.png' },
    ],
  }),
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
            {/* Logo Section - Золотая середина: заметно, но аккуратно */}
            <button 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="flex items-center focus:outline-none group"
            >
              {/* Контейнер h-10 держит высоту шапки */}
              <div className="relative flex items-center justify-center h-10 w-10">
                <img
                  src="/logo.png"
                  alt="TERSIS"
                  /* scale-[2.0] — это и есть средний размер. 
                     Если захочешь еще чуть меньше, ставь 1.8. Если чуть больше — 2.2 */
                  className="h-full w-full object-contain transform scale-[2.0] transition-transform duration-300" 
                />
              </div>
              
              {/* ml-3 дает аккуратный зазор между лого и текстом */}
              <span className={`text-2xl font-black ${textPrimary} tracking-tight ml-3`}>
                TERSIS
              </span>
            </button>

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
                  {lang === 'en' ? 'EST. 2011 • Trusted Experience' : 'ĮKURTA 2011 • Patikima patirtis'}
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
{/* ─── FLEET SPECIFICATIONS (Restored Font Sizes & Fixed Spacing) ─── */}
      <section id="fleet" className={`py-24 px-4 sm:px-6 lg:px-8 border-t ${borderColor}`}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 animate-fadeInUp">
            <h2 className={`text-4xl md:text-5xl font-black ${textPrimary} mb-4 tracking-tight uppercase`}>
              {t.fleet.title}
            </h2>
            <p className={`text-lg ${textSecondary}`}>{t.fleet.subtitle}</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Standard Class Card */}
            <div className={`border ${borderAccent} p-6 md:p-8 ${bgCard} rounded-xl hover:border-[#0052ff]/50 transition-all duration-300 flex flex-col`}>
              <div className="flex items-center gap-4 mb-8">
                <div className={`w-14 h-14 ${isDark ? 'bg-[#0052ff]/10' : 'bg-[#0052ff]/5'} flex items-center justify-center border ${borderAccent} rounded-lg`}>
                  <Truck className="h-7 w-7 text-[#0052ff]" />
                </div>
                <div>
                  <h3 className={`text-xl font-black ${textPrimary} tracking-tight uppercase`}>{t.fleet.standardClass}</h3>
                  <p className="text-[#0052ff] font-bold text-sm">92 m³ {t.fleet.capacity}</p>
                </div>
              </div>
              
              <div className="space-y-4 mb-8 flex-grow">
                {[
                  [t.fleet.length, '13.6 m'],
                  [t.fleet.height, '2.7 m'],
                  [t.fleet.capacity, `33 ${t.fleet.euroPallets}`],
                  [t.fleet.idealFor, t.fleet.generalCargo],
                ].map(([label, value], i) => (
                  <div key={i} className={`flex justify-between items-start gap-4 ${i < 3 ? `border-b ${borderColor}` : ''} pb-3`}>
                    <span className={`${textMuted} text-[10px] md:text-sm uppercase tracking-widest font-bold flex-shrink-0`}>{label}</span>
                    <span className={`${textPrimary} font-black text-xs md:text-base text-right`}>{value}</span>
                  </div>
                ))}
              </div>

              <div className={`pt-4 border-t ${borderColor}`}>
                <p className={`${textMuted} text-xs leading-relaxed italic`}>{t.fleet.standardFooter}</p>
              </div>
            </div>

            {/* Mega Advantage Card */}
            <div className={`border ${borderAccent} p-6 md:p-8 ${bgCard} rounded-xl hover:border-[#0052ff]/50 transition-all duration-300 flex flex-col`}>
              <div className="flex items-center gap-4 mb-8">
                <div className={`w-14 h-14 ${isDark ? 'bg-[#0052ff]/10' : 'bg-[#0052ff]/5'} flex items-center justify-center border ${borderAccent} rounded-lg`}>
                  <Maximize2 className="h-7 w-7 text-[#0052ff]" />
                </div>
                <div>
                  <h3 className={`text-xl font-black ${textPrimary} tracking-tight uppercase`}>{t.fleet.megaAdvantage}</h3>
                  <p className="text-[#0052ff] font-bold text-sm">105 m³ {t.fleet.capacity}</p>
                </div>
              </div>

              <div className="space-y-4 mb-8 flex-grow">
                {[
                  [t.fleet.internalHeight, '3.0 m'],
                  [t.fleet.volume, '105 m³'],
                  [t.fleet.specialization, t.fleet.lightweightCargo],
                  [t.fleet.advantage, '+14% ' + t.fleet.capacity],
                ].map(([label, value], i) => (
                  <div key={i} className={`flex justify-between items-start gap-4 ${i < 3 ? `border-b ${borderColor}` : ''} pb-3`}>
                    <span className={`${textMuted} text-[10px] md:text-sm uppercase tracking-widest font-bold flex-shrink-0`}>{label}</span>
                    <span className={`${textPrimary} font-black text-xs md:text-base text-right`}>{value}</span>
                  </div>
                ))}
              </div>

              <div className={`pt-4 border-t ${borderColor}`}>
                <p className={`${textMuted} text-xs leading-relaxed italic`}>{t.fleet.megaFooter}</p>
              </div>
            </div>
          </div>

          {/* ВЕРНУЛ ОРИГИНАЛЬНЫЙ РАЗМЕР ТЕКСТА text-xs ТУТ */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: Shield, title: t.fleet.cmrInsured, sub: t.fleet.fullCoverage },
              { icon: Clock, title: t.fleet.realTime, sub: t.fleet.tracking },
              { icon: Truck, title: t.fleet.modernFleet, sub: '2018-2023' },
              { icon: Check, title: t.fleet.euro6, sub: t.fleet.compliant },
            ].map((item, idx) => (
              <div key={idx} className={`border ${borderAccent} p-5 text-center ${bgCard} rounded-lg hover:bg-[#0052ff]/5 transition`}>
                <item.icon className="h-7 w-7 text-[#0052ff] mx-auto mb-3" />
                <p className={`font-black ${textPrimary} text-xs mb-1 uppercase tracking-wide`}>{item.title}</p>
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
            <h2 className={`text-4xl md:text-5xl font-black ${textPrimary} mb-4 tracking-tight uppercase`}>
              {t.services.title}
            </h2>
            {/* ПУНКТ 1: Новая фраза, синяя, жирная, прямая */}
            <p className="text-lg md:text-xl text-[#0052ff] font-black tracking-[0.2em] uppercase">
              Integrated Transport & Logistics Solutions
            </p>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-5">
            {t.services.items.map((service, idx) => {
              const Icon = serviceIcons[idx] || Truck
              
              {/* ПУНКТ 2: Убираем / LTL только если в заголовке есть Groupage или Grupinių */}
              let displayTitle = service.title;
              if (displayTitle.includes('Groupage') || displayTitle.includes('Grupinių')) {
                displayTitle = displayTitle.split('/')[0].trim();
              }

              return (
                <div
                  key={idx}
                  className={`border ${borderAccent} p-6 ${bgCard} rounded-xl hover:border-[#0052ff]/60 transition-all duration-300 group`}
                >
                  <Icon className="h-9 w-9 text-[#0052ff] mb-4 group-hover:scale-110 transition" />
                  <h3 className={`text-sm font-black ${textPrimary} mb-1 uppercase tracking-wide`}>
                    {displayTitle}
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
      {/* ─── ABOUT TERSIS (Refined Texts & 15+ Years Experience) ─── */}
      <section id="about" className={`py-24 px-4 sm:px-6 lg:px-8 border-t ${borderColor}`}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 animate-fadeInUp">
            <h2 className={`text-4xl md:text-5xl font-black ${textPrimary} mb-4 tracking-tight uppercase`}>
              {t.about.title}
            </h2>
            <p className={`text-lg ${textSecondary} font-bold`}>
              {lang === 'en' 
                ? 'Your trusted European logistics partner since 2011' 
                : 'Jūsų patikimas Europos logistikos partneris nuo 2011 m.'}
            </p>
          </div>

          {/* Основной текст - Чистый английский без повторов */}
          <div className="max-w-4xl mx-auto mb-16 space-y-6 text-center">
            <p className={`${textSecondary} text-lg leading-relaxed`}>
              {lang === 'en' 
                ? 'TERSIS provides reliable, cost-effective transportation solutions across Europe and worldwide. We specialize in asset-based logistics, operating a modern fleet of 27 vehicles to ensure direct control and maximum efficiency.' 
                : 'TERSIS teikia patikimus ir ekonomiškus transporto sprendimus Europoje bei visame pasaulyje. Mes specializuojamės nuosavo transporto logistikoje, valdydami 27 modernių automobilių parką, užtikrinantį tiesioginę kontrolę ir maksimalų efektyvumą.'}
            </p>
            <p className={`${textSecondary} text-lg leading-relaxed font-medium`}>
              {lang === 'en'
                ? 'Our professional team ensures seamless cargo handling, competitive pricing, and transparent communication. We are fully licensed (LIC-009666-EBKR) and 100% CMR insured, providing safety at every stage of your shipment.'
                : 'Mūsų profesionali komanda užtikrina sklandų krovinių tvarkymą, konkurencingą kainodarą ir skaidrų bendravimą. Esame pilnai licencijuoti (LIC-009666-EBKR) ir 100% apdrausti CMR draudimu, užtikrindami saugumą kiekviename pervežimo etape.'}
            </p>
          </div>

          {/* Сетка преимуществ (Адаптивная: 1 колонка моб / 2 планшет / 4 десктоп) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { icon: Truck, title: lang === 'en' ? 'Own Fleet' : 'Savas parkas', sub: lang === 'en' ? 'Full Control, No Subcontractors' : 'Pilna kontrolė, jokių subrangovų' },
              { icon: Globe, title: lang === 'en' ? 'Optimized Routes' : 'Optimizuoti maršrutai', sub: lang === 'en' ? 'Efficient Logistics Schemes' : 'Efektyvios logistikos schemos' },
              { icon: Clock, title: lang === 'en' ? 'High Reliability' : 'Aukštas patikimumas', sub: lang === 'en' ? 'Strict Punctuality' : 'Griežtas punktualumas' },
              { icon: Shield, title: lang === 'en' ? 'Cargo Safety' : 'Krovinių saugumas', sub: lang === 'en' ? 'Guaranteed Protection' : 'Garantuota apsauga' },
              { icon: FileText, title: lang === 'en' ? 'Transparent Pricing' : 'Skaidri kainodara', sub: lang === 'en' ? 'No Hidden Fees' : 'Jokių pasлėptų mokesčių' },
              { icon: Handshake, title: lang === 'en' ? 'Sea & Air Partners' : 'Jūros ir oro partneriai', sub: lang === 'en' ? 'Long-term Partnerships' : 'Ilgalaikė partnerystė' },
              { icon: Users, title: lang === 'en' ? 'Professional Team' : 'Profesionali komanda', sub: lang === 'en' ? '15+ Years Experience' : '15+ metų patirtis' }, // ОБНОВЛЕНО НА 15+
              { icon: Check, title: lang === 'en' ? '100% CMR Insured' : '100% CMR draudimas', sub: lang === 'en' ? 'Risk-Free Shipping' : 'Siuntimas be rizikos' },
            ].map((item, idx) => {
              const Icon = item.icon
              return (
                <div key={idx} className={`border ${borderAccent} p-6 ${bgCard} rounded-xl hover:border-[#0052ff]/50 transition-all group`}>
                  <Icon className="h-10 w-10 text-[#0052ff] mb-4 group-hover:scale-110 transition" />
                  <h3 className={`text-lg font-black ${textPrimary} mb-1 tracking-tight uppercase`}>{item.title}</h3>
                  <p className={`text-base ${textMuted}`}>{item.sub}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ─── COVERAGE MAP (High-Visibility Straight Text) ─── */}
      <section id="coverage" className={`py-24 px-4 sm:px-6 lg:px-8 border-t ${borderColor}`}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 animate-fadeInUp">
            <h2 className={`text-4xl md:text-5xl font-black ${textPrimary} mb-4 tracking-tight uppercase`}>
              {t.coverage.title}
            </h2>
            {/* ФРАЗА СТРОГО ПРЯМАЯ (без italic), ЖИРНАЯ И СИНЯЯ */}
            <p className="text-lg md:text-xl text-[#0052ff] font-black tracking-[0.3em] uppercase">
              Europe • Baltics • Global
            </p>
          </div>

          <div className="relative h-[400px] md:h-[650px] rounded-[30px] md:rounded-[40px] overflow-hidden border border-[#0052ff]/30 shadow-2xl bg-black">
            
            <img 
              src="/map-hub.jpg.png" 
              alt="Tersis Global Hub" 
              className="absolute inset-0 w-full h-full object-cover opacity-90"
            />

            <svg 
              className="absolute inset-0 w-full h-full z-10 pointer-events-none" 
              viewBox="0 0 1000 600" 
              preserveAspectRatio="xMidYMid slice"
            >
              <defs>
                <radialGradient id="comet-grad">
                  <stop offset="0%" stopColor="#fff" stopOpacity="1" />
                  <stop offset="100%" stopColor="#0052ff" stopOpacity="0" />
                </radialGradient>
              </defs>

              <g fill="none" strokeWidth="2" strokeLinecap="round">
                <path d="M 150,230 Q 300,100 485,205" stroke="url(#comet-grad)" strokeDasharray="1, 50">
                  <animate attributeName="stroke-dashoffset" from="300" to="0" dur="3s" repeatCount="indefinite" />
                </path>
                <path d="M 220,480 Q 350,300 485,205" stroke="url(#comet-grad)" strokeDasharray="1, 50">
                  <animate attributeName="stroke-dashoffset" from="300" to="0" dur="3.5s" repeatCount="indefinite" />
                </path>
                <path d="M 850,380 Q 650,250 485,205" stroke="url(#comet-grad)" strokeDasharray="1, 50">
                  <animate attributeName="stroke-dashoffset" from="300" to="0" dur="2.8s" repeatCount="indefinite" />
                </path>
                <path d="M 820,130 Q 650,80 485,205" stroke="url(#comet-grad)" strokeDasharray="1, 50">
                  <animate attributeName="stroke-dashoffset" from="300" to="0" dur="3.2s" repeatCount="indefinite" />
                </path>
              </g>
            </svg>

            <div className="absolute bottom-6 left-8 bg-black/40 backdrop-blur-md px-4 py-2 rounded-lg border border-white/10 hidden md:block">
              <p className="text-[10px] font-black text-[#0052ff] uppercase tracking-widest leading-none mb-1">Hub Status</p>
              <p className="text-white text-xs font-bold uppercase tracking-widest">Operational / 24-7</p>
            </div>
            
            <div className="absolute bottom-6 right-8 bg-black/40 backdrop-blur-md px-4 py-2 rounded-lg border border-white/10 hidden md:block text-right">
              <p className="text-[10px] font-black text-[#0052ff] uppercase tracking-widest leading-none mb-1">Global Traffic</p>
              <p className="text-white text-xs font-bold uppercase tracking-widest">Connected Worldwide</p>
            </div>
          </div>
        </div>
      </section>
      {/* ─── CONTACT / QUOTE (Balanced Layout) ─── */}
      <section id="contact" className={`py-24 px-4 sm:px-6 lg:px-8 border-t ${borderColor}`}>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12 animate-fadeInUp">
            <h2 className={`text-4xl md:text-5xl font-black ${textPrimary} mb-4 tracking-tight uppercase`}>
              {t.contact.title}
            </h2>
            <p className={`text-lg ${textSecondary}`}>{t.contact.subtitle}</p>
          </div>

          <div
            className={`${bgCard} border ${borderAccent} rounded-2xl p-8 md:p-10 shadow-2xl animate-fadeInUp`}
          >
            <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-5">
              {/* ПЕРВЫЕ 6 ПОЛЕЙ (ПО 2 В РЯД) */}
              {[
                { key: 'from', type: 'text' },
                { key: 'to', type: 'text' },
                { key: 'cargoType', type: 'text' },
                { key: 'weight', type: 'text' },
                { key: 'volume', type: 'text' },
                { key: 'name', type: 'text' },
              ].map(({ key, type }) => (
                <div key={key}>
                  <label className={`block text-xs font-bold ${textSecondary} mb-2 uppercase tracking-widest`}>
                    {t.contact[key as keyof typeof t.contact] as string}
                  </label>
                  <input
                    type={type}
                    required
                    value={(formData as any)[key]}
                    onChange={(e) => setFormData({ ...formData, [key]: e.target.value })}
                    className={`w-full px-4 py-3 ${inputBg} border ${borderAccent} ${textPrimary} focus:border-[#0052ff] outline-none transition rounded-lg text-sm font-bold`}
                    placeholder={(t.contact.placeholders as any)[key] || ''}
                  />
                </div>
              ))}

              {/* ПОЛЕ EMAIL (НА ВСЮ ШИРИНУ, ЧТОБЫ НЕ БЫЛО ПУСТОТЫ) */}
              <div className="md:col-span-2">
                <label className={`block text-xs font-bold ${textSecondary} mb-2 uppercase tracking-widest`}>
                  {t.contact.email}
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className={`w-full px-4 py-3 ${inputBg} border ${borderAccent} ${textPrimary} focus:border-[#0052ff] outline-none transition rounded-lg text-sm font-bold`}
                  placeholder={t.contact.placeholders.email}
                />
              </div>

              {/* ПОЛЕ PHONE (НА ВСЮ ШИРИНУ) */}
              <div className="md:col-span-2">
                <label className={`block text-xs font-bold ${textSecondary} mb-2 uppercase tracking-widest`}>
                  {t.contact.phone}
                </label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className={`w-full px-4 py-3 ${inputBg} border ${borderAccent} ${textPrimary} focus:border-[#0052ff] outline-none transition rounded-lg text-sm font-bold`}
                  placeholder={t.contact.placeholders.phone}
                />
              </div>

              {/* ПОЛЕ MESSAGE (НА ВСЮ ШИРИНУ) */}
              <div className="md:col-span-2">
                <label className={`block text-xs font-bold ${textSecondary} mb-2 uppercase tracking-widest`}>
                  {t.contact.message}
                </label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={3}
                  className={`w-full px-4 py-3 ${inputBg} border ${borderAccent} ${textPrimary} focus:border-[#0052ff] outline-none transition resize-none rounded-lg text-sm font-bold`}
                  placeholder={t.contact.placeholders.message}
                />
              </div>

              <div className="md:col-span-2">
                <button
                  type="submit"
                  className="w-full bg-[#0052ff] text-white py-5 text-base font-black hover:bg-[#003dd6] transition uppercase tracking-widest rounded-lg shadow-lg shadow-[#0052ff]/20"
                >
                  {isSubmitted ? t.contact.submitted : 'REQUEST QUOTE IN 24H'}
                </button>
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
              <button 
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="flex items-center focus:outline-none mb-6 group text-left"
              >
                <div className="relative flex items-center justify-center h-10 w-10">
                  <img
                    src="/logo.png"
                    alt="TERSIS"
                    className="h-full w-full object-contain transform scale-[2.0] transition-transform duration-300" 
                  />
                </div>
                <h4 className={`text-xl font-black ${textPrimary} tracking-tight ml-4`}>
                  TERSIS
                </h4>
              </button>
              
              <div className={`space-y-4 ${textSecondary} text-sm`}>
                {/* Address */}
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

                {/* Phone (Кликабельный с правильным номером) */}
                <div className="flex items-start gap-3">
                  <Phone className="h-5 w-5 text-[#0052ff] mt-0.5 flex-shrink-0" />
                  <div>
                    <p className={`font-bold ${textPrimary} uppercase text-xs tracking-widest mb-1`}>
                      {t.footer.phone}
                    </p>
                    <a 
                      href="tel:+37065955956" 
                      className="hover:text-[#0052ff] transition-colors cursor-pointer block"
                    >
                      +370 65 955 956
                    </a>
                  </div>
                </div>

                {/* Email with Mailto */}
                <div className="flex items-start gap-3">
                  <Mail className="h-5 w-5 text-[#0052ff] mt-0.5 flex-shrink-0" />
                  <div>
                    <p className={`font-bold ${textPrimary} uppercase text-xs tracking-widest mb-1`}>
                      {t.footer.email}
                    </p>
                    <a 
                      href="mailto:info@tersis.lt" 
                      className="hover:text-[#0052ff] transition-colors cursor-pointer block"
                    >
                      info@tersis.lt
                    </a>
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
            <p>© 2026 TERSIS. European asset-based carrier | All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
