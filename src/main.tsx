import { useState, useEffect, useCallback, useRef } from 'react'
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

// Проверь путь к переводам! Обычно это './lib/i18n' или '../lib/i18n'
import { translations, type Lang } from './lib/i18n'

const serviceIcons = [Truck, Globe, AlertTriangle, Zap, Clock, Home, FileText, Shield]

export default function TersisApp() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [lang, setLang] = useState<Lang>('en')
  const [isDark, setIsDark] = useState(true)
  
  // Состояния для формы (как в рабочем коде №1)
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

  // Если вдруг перевод не найден - показываем темный фон, чтобы не было белого экрана
  if (!t) return <div className="min-h-screen bg-[#050a14]" />

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    
    // МГНОВЕННЫЙ СБОР ДАННЫХ (без лагов)
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
        alert('Error! Please try again or contact us via WhatsApp.');
      }
    } catch (error) {
      console.error('Submission error:', error);
      alert('Connection error. Please check your internet.');
    } finally {
      setIsLoading(false);
    }
  }

  // СТИЛИ ИЗ 10 БИЛДА
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
      {/* ─── GRID BACKGROUND ─── */}
      {isDark && (
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'linear-gradient(0deg, transparent 24%, rgba(0, 82, 255, 0.08) 25%, rgba(0, 82, 255, 0.08) 26%, transparent 27%, transparent 74%, rgba(0, 82, 255, 0.08) 75%, rgba(0, 82, 255, 0.08) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(0, 82, 255, 0.08) 25%, rgba(0, 82, 255, 0.08) 26%, transparent 27%, transparent 74%, rgba(0, 82, 255, 0.08) 75%, rgba(0, 82, 255, 0.08) 76%, transparent 77%, transparent)', backgroundSize: '60px 60px' }} />
      )}

      {/* ─── NAVIGATION ─── */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? `${navBg} backdrop-blur-md border-b ${borderColor} shadow-sm` : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-18 py-4">
            <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="flex items-center group">
              <img src="/logo.png" alt="TERSIS" className="h-10 w-10 object-contain transition-transform duration-300 group-hover:scale-110" />
              <span className={`text-2xl font-black ${textPrimary} tracking-tight ml-2`}>TERSIS</span>
            </button>

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
              <button onClick={() => scrollToSection('contact')} className="bg-[#0052ff] text-white px-5 py-2 hover:bg-[#003dd6] transition font-bold text-sm uppercase rounded-md shadow-lg shadow-[#0052ff]/20">
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

      {/* ─── HERO SECTION ─── */}
      <section className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 relative min-h-[90vh] md:h-screen flex items-center overflow-hidden bg-[#050a14]">
        <video autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover z-0 opacity-60">
          <source src="/hero-video.mp4.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/60 z-10" />

        <div className="max-w-7xl mx-auto w-full relative z-20">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="animate-fadeInUp text-left">
              <div className="inline-block mb-6 px-4 py-2 bg-[#0052ff]/20 border border-[#0052ff]/40 rounded-md">
                <p className="text-[#0052ff] text-sm font-bold uppercase tracking-wider">{lang === 'en' ? 'EST. 2011 • Trusted Experience' : 'ĮKURTA 2011 • Patikima patirtis'}</p>
              </div>
              <h1 className="text-4xl sm:text-6xl md:text-7xl font-black text-white mb-6 leading-[1.05] tracking-tight uppercase">
                {t.hero.title1}<br />{t.hero.title2}<br />
                <span className="text-[#0052ff]">{t.hero.title3}</span><br />
                {t.hero.title4}
              </h1>
              <p className="text-lg text-gray-200 mb-10 leading-relaxed max-w-lg font-medium">
                {lang === 'en' 
                  ? 'We operate a fleet of 27+ modern Euro 6 vehicles, specializing in MEGA trailers (105 m³) and standard solutions.' 
                  : 'Valdome 27+ modernių Euro 6 transporto priemonių parką, specializuojamės MEGA puspriekabėmis.'}
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
                  <Truck className="h-10 w-10 text-[#0052ff] mb-4" />
                  <p className="text-4xl md:text-5xl font-black text-white mb-1 leading-none uppercase">27+</p>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">{lang === 'en' ? 'Own Vehicles' : 'Nuosavas transportas'}</p>
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

      {/* ─── FLEET SECTION ─── */}
      <section id="fleet" className={`py-24 px-4 sm:px-6 lg:px-8 border-t ${borderColor}`}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 uppercase">
            <h2 className={`text-4xl md:text-5xl font-black ${textPrimary} mb-4 tracking-tight`}>{t.fleet.title}</h2>
            <p className={`text-lg ${textSecondary}`}>{t.fleet.subtitle}</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {[ 
              { title: t.fleet.standardClass, vol: '92 m³', icon: Truck, items: [[t.fleet.length, '13.6 m'], [t.fleet.height, '2.7 m'], [t.fleet.capacity, '33 Pallets']], foot: t.fleet.standardFooter },
              { title: t.fleet.megaAdvantage, vol: '105 m³', icon: Maximize2, items: [[t.fleet.internalHeight, '3.0 m'], [t.fleet.volume, '105 m³'], [t.fleet.advantage, '+14% Capacity']], foot: t.fleet.megaFooter }
            ].map((card, i) => (
              <div key={i} className={`border ${borderAccent} p-8 ${bgCard} rounded-xl hover:border-[#0052ff]/50 transition-all flex flex-col`}>
                <div className="flex items-center gap-4 mb-8">
                   <card.icon className="h-10 w-10 text-[#0052ff]" />
                   <div>
                     <h3 className={`text-xl font-black ${textPrimary} uppercase`}>{card.title}</h3>
                     <p className="text-[#0052ff] font-bold">{card.vol} {t.fleet.capacity}</p>
                   </div>
                </div>
                <div className="space-y-4 mb-8 flex-grow">{card.items.map(([l, v], idx) => (
                  <div key={idx} className={`flex justify-between border-b ${borderColor} pb-3`}>
                    <span className={`${textMuted} text-xs font-bold uppercase`}>{l}</span>
                    <span className={`${textPrimary} font-black`}>{v}</span>
                  </div>
                ))}</div>
                <p className={`${textMuted} text-xs italic`}>{card.foot}</p>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
             {[ {i:Shield, t:t.fleet.cmrInsured}, {i:Clock, t:t.fleet.realTime}, {i:Truck, t:t.fleet.modernFleet}, {i:Check, t:t.fleet.euro6} ].map((item, idx) => (
               <div key={idx} className={`border ${borderAccent} p-5 text-center ${bgCard} rounded-lg`}><item.i className="h-7 w-7 text-[#0052ff] mx-auto mb-3" /><p className={`font-black ${textPrimary} text-xs uppercase`}>{item.t}</p></div>
             ))}
          </div>
        </div>
      </section>

      {/* ─── ABOUT ─── */}
      <section id="about" className={`py-24 px-4 sm:px-6 lg:px-8 border-t ${borderColor}`}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className={`text-4xl md:text-5xl font-black ${textPrimary} mb-4 uppercase`}>{t.about.title}</h2>
            <p className={`text-lg ${textSecondary} font-bold`}>{lang === 'en' ? 'Your trusted partner since 2011' : 'Jūsų patikimas partneris nuo 2011'}</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[ 
              { icon: Truck, t: 'Own Fleet', s: 'Full Control' }, { icon: Globe, t: 'Optimized', s: 'Routes' },
              { icon: Clock, t: 'Reliability', s: 'Strict' }, { icon: Shield, t: 'Safety', s: 'Guaranteed' },
              { icon: FileText, t: 'Pricing', s: 'Transparent' }, { icon: Handshake, t: 'Partners', s: 'Sea & Air' },
              { icon: Users, t: 'Professional', s: '15+ Years' }, { icon: Check, t: 'Insured', s: '100% CMR' }
            ].map((item, idx) => (
              <div key={idx} className={`border ${borderAccent} p-6 ${bgCard} rounded-xl hover:border-[#0052ff]/50 transition-all group`}>
                <item.icon className="h-10 w-10 text-[#0052ff] mb-4 group-hover:scale-110 transition" />
                <h3 className={`text-lg font-black ${textPrimary} mb-1 uppercase tracking-tight`}>{item.t}</h3>
                <p className={`text-base ${textMuted}`}>{item.s}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── COVERAGE ─── */}
      <section id="coverage" className={`py-24 px-4 sm:px-6 lg:px-8 border-t ${borderColor}`}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 uppercase">
            <h2 className={`text-4xl md:text-5xl font-black ${textPrimary} mb-4`}>{t.coverage.title}</h2>
            <p className="text-lg text-[#0052ff] font-black tracking-widest">Europe • Baltics • Global</p>
          </div>
          <div className="relative h-[400px] md:h-[650px] rounded-[40px] overflow-hidden border border-[#0052ff]/30 shadow-2xl bg-black">
            <img src="/map-hub.jpg.png" alt="Map" className="absolute inset-0 w-full h-full object-cover opacity-90" />
            <svg className="absolute inset-0 w-full h-full z-10" viewBox="0 0 1000 600">
               <defs><radialGradient id="comet-grad"><stop offset="0%" stopColor="#fff" /><stop offset="100%" stopColor="#0052ff" stopOpacity="0" /></radialGradient></defs>
               <path d="M 150,230 Q 300,100 485,205" stroke="url(#comet-grad)" strokeWidth="2" fill="none" strokeDasharray="1, 50">
                  <animate attributeName="stroke-dashoffset" from="300" to="0" dur="3s" repeatCount="indefinite" />
               </path>
               <path d="M 850,380 Q 650,250 485,205" stroke="url(#comet-grad)" strokeWidth="2" fill="none" strokeDasharray="1, 50">
                  <animate attributeName="stroke-dashoffset" from="300" to="0" dur="2.5s" repeatCount="indefinite" />
               </path>
            </svg>
            <div className="absolute bottom-6 left-8 bg-black/40 backdrop-blur-md px-4 py-2 rounded-lg border border-white/10 hidden md:block">
              <p className="text-[10px] font-black text-[#0052ff] uppercase tracking-widest mb-1">Hub Status</p>
              <p className="text-white text-xs font-bold uppercase">Operational / 24-7</p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── CONTACT FORM ─── */}
      <section id="contact" className={`py-24 px-4 sm:px-6 lg:px-8 border-t ${borderColor}`}>
        <div className="max-w-4xl mx-auto">
          <h2 className={`text-4xl md:text-5xl font-black ${textPrimary} text-center mb-12 uppercase`}>{t.contact.title}</h2>
          <div className={`${bgCard} border ${borderAccent} rounded-2xl p-8 md:p-10 shadow-2xl`}>
            <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-5">
              {['from', 'to', 'cargoType', 'weight', 'volume', 'name'].map((key) => (
                <div key={key}>
                  <label className={`block text-xs font-bold ${textSecondary} mb-2 uppercase tracking-widest`}>{(t.contact as any)[key]}</label>
                  <input name={key} type="text" required className={`w-full px-4 py-3 ${inputBg} border ${borderAccent} ${textPrimary} focus:border-[#0052ff] outline-none rounded-lg text-sm font-bold`} placeholder={(t.contact.placeholders as any)[key]} />
                </div>
              ))}
              <div className="md:col-span-2">
                <label className={`block text-xs font-bold ${textSecondary} mb-2 uppercase tracking-widest`}>{t.contact.email}</label>
                <input name="email" type="email" required className={`w-full px-4 py-3 ${inputBg} border ${borderAccent} ${textPrimary} focus:border-[#0052ff] outline-none rounded-lg text-sm font-bold`} placeholder={t.contact.placeholders.email} />
              </div>
              <div className="md:col-span-2">
                <label className={`block text-xs font-bold ${textSecondary} mb-2 uppercase tracking-widest`}>{t.contact.phone}</label>
                <input name="phone" type="tel" required className={`w-full px-4 py-3 ${inputBg} border ${borderAccent} ${textPrimary} focus:border-[#0052ff] outline-none rounded-lg text-sm font-bold`} placeholder={t.contact.placeholders.phone} />
              </div>
              <div className="md:col-span-2">
                <label className={`block text-xs font-bold ${textSecondary} mb-2 uppercase tracking-widest`}>{t.contact.message}</label>
                <textarea name="message" rows={3} className={`w-full px-4 py-3 ${inputBg} border ${borderAccent} ${textPrimary} focus:border-[#0052ff] outline-none resize-none rounded-lg text-sm font-bold`} placeholder={t.contact.placeholders.message} />
              </div>
              <div className="md:col-span-2">
                <button type="submit" disabled={isLoading} className="w-full bg-[#0052ff] text-white py-5 text-base font-black hover:bg-[#003dd6] transition uppercase tracking-widest rounded-lg shadow-lg">
                  {isLoading ? 'SENDING...' : isSubmitted ? t.contact.submitted : 'REQUEST QUOTE IN 24H'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer className={`${bg} border-t ${borderColor} py-16 px-4`}>
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-12">
          <div>
            <div className="flex items-center mb-6">
              <img src="/logo.png" className="h-10 w-10 mr-3" alt="Logo" />
              <span className={`text-xl font-black ${textPrimary}`}>TERSIS</span>
            </div>
            <div className={`space-y-4 ${textSecondary} text-sm`}>
              <div className="flex items-start gap-3"><MapPin className="h-5 w-5 text-[#0052ff]" /><p>Taikos pr. 141-305, Kaunas, LT-51132</p></div>
              <div className="flex items-start gap-3"><Phone className="h-5 w-5 text-[#0052ff]" /><a href="tel:+37065955956">+370 65 955 956</a></div>
              <div className="flex items-start gap-3"><Mail className="h-5 w-5 text-[#0052ff]" /><a href="mailto:info@tersis.lt">info@tersis.lt</a></div>
            </div>
          </div>
          <div>
            <h5 className={`font-black ${textPrimary} mb-6 text-sm uppercase tracking-widest`}>{t.footer.servicesTitle}</h5>
            <ul className={`space-y-2 ${textSecondary} text-sm`}>
              {t.services.items.slice(0, 5).map((svc: any, i: number) => (
                <li key={i}><button onClick={() => scrollToSection('services')} className="hover:text-[#0052ff] transition">{svc.title}</button></li>
              ))}
            </ul>
          </div>
          <div>
            <h5 className={`font-black ${textPrimary} mb-6 text-sm uppercase tracking-widest`}>{t.footer.legalTitle}</h5>
            <div className="space-y-3 text-sm">
              <div className="text-[#0052ff] font-black flex items-center gap-2"><FileText className="h-4 w-4" /> LIC-009666-EBKR</div>
              <div className="text-green-400 font-bold flex items-center gap-2"><Check className="h-4 w-4" /> 100% CMR Insured</div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
