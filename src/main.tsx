import React, { useState, useEffect, useCallback, memo } from 'react'
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
// Исправлен путь для успешного билда в GitHub Actions
import { translations, type Lang } from '../lib/i18n'

export const Route = createFileRoute('/')({
  component: TersisApp,
  head: () => ({
    meta: [
      { title: 'TERSIS | Asset-Based Carrier & International Logistics Hub' },
      { 
        name: 'description', 
        content: 'TERSIS is a reliable European logistics partner since 2011. Operating a fleet of 27+ modern Euro 6 vehicles with MEGA trailers.' 
      },
      { property: 'og:title', content: 'TERSIS | Asset-Based Carrier' },
      { property: 'og:image', content: 'https://tersis.lt/logo.png' },
    ],
  }),
})

const serviceIcons = [Truck, Globe, AlertTriangle, Zap, Clock, Home, FileText, Shield]

// --- ИЗОЛЯЦИЯ: ФОРМА (МЕМОИЗАЦИЯ ДЛЯ 0 ЛАГОВ) ---
const ContactForm = memo(({ t, inputBg, borderAccent, textPrimary, textSecondary }: any) => {
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const data = Object.fromEntries(new FormData(form).entries())
    
    try {
      const response = await fetch('/send.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (response.ok) {
        setIsSubmitted(true)
        form.reset()
        setTimeout(() => setIsSubmitted(false), 4000)
      }
    } catch (error) {
      alert('Error sending request.')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-5" autoComplete="off">
      {([
        { key: 'from', type: 'text' },
        { key: 'to', type: 'text' },
        { key: 'cargoType', type: 'text' },
        { key: 'weight', type: 'text' },
        { key: 'volume', type: 'text' },
        { key: 'name', type: 'text' },
      ] as const).map(({ key, type }) => (
        <div key={key}>
          <label htmlFor={key} className={`block text-[10px] font-black ${textSecondary} mb-2 uppercase tracking-widest`}>
            {t.contact[key]}
          </label>
          <input
            id={key} name={key} type={type} required
            className={`w-full px-4 py-3 ${inputBg} border ${borderAccent} ${textPrimary} focus:border-[#0052ff] outline-none transition-colors rounded-lg text-sm font-bold`}
            placeholder={(t.contact.placeholders as any)[key]}
          />
        </div>
      ))}
      <div className="md:col-span-2">
        <label htmlFor="email" className={`block text-[10px] font-black ${textSecondary} mb-2 uppercase tracking-widest`}>{t.contact.email}</label>
        <input id="email" name="email" type="email" required
          className={`w-full px-4 py-3 ${inputBg} border ${borderAccent} ${textPrimary} focus:border-[#0052ff] outline-none transition-colors rounded-lg text-sm font-bold`}
          placeholder={t.contact.placeholders.email} />
      </div>
      <div className="md:col-span-2">
        <label htmlFor="phone" className={`block text-[10px] font-black ${textSecondary} mb-2 uppercase tracking-widest`}>{t.contact.phone}</label>
        <input id="phone" name="phone" type="tel" required
          className={`w-full px-4 py-3 ${inputBg} border ${borderAccent} ${textPrimary} focus:border-[#0052ff] outline-none transition-colors rounded-lg text-sm font-bold`}
          placeholder={t.contact.placeholders.phone} />
      </div>
      <div className="md:col-span-2">
        <label htmlFor="message" className={`block text-[10px] font-black ${textSecondary} mb-2 uppercase tracking-widest`}>{t.contact.message}</label>
        <textarea id="message" name="message" rows={3}
          className={`w-full px-4 py-3 ${inputBg} border ${borderAccent} ${textPrimary} focus:border-[#0052ff] outline-none transition-colors resize-none rounded-lg text-sm font-bold`}
          placeholder={t.contact.placeholders.message} />
      </div>
      <div className="md:col-span-2">
        <button type="submit" className="w-full bg-[#0052ff] text-white py-5 text-base font-black hover:bg-[#003dd6] transition uppercase tracking-widest rounded-lg">
          {isSubmitted ? t.contact.submitted : 'REQUEST QUOTE IN 24H'}
        </button>
      </div>
    </form>
  )
})

function TersisApp() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [lang, setLang] = useState<Lang>('en')
  const [isDark, setIsDark] = useState(true)

  const t = translations[lang]

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll, { passive: true })
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
      {isDark && (
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'linear-gradient(0deg, transparent 24%, rgba(0, 82, 255, 0.08) 25%, rgba(0, 82, 255, 0.08) 26%, transparent 27%, transparent 74%, rgba(0, 82, 255, 0.08) 75%, rgba(0, 82, 255, 0.08) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(0, 82, 255, 0.08) 25%, rgba(0, 82, 255, 0.08) 26%, transparent 27%, transparent 74%, rgba(0, 82, 255, 0.08) 75%, rgba(0, 82, 255, 0.08) 76%, transparent 77%, transparent)', backgroundSize: '60px 60px' }} />
      )}

      {/* NAVIGATION */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? `${navBg} backdrop-blur-md border-b ${borderColor} shadow-sm` : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-18">
            <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="flex items-center group">
              <div className="relative h-10 w-10"><img src="https://tersis.lt/logo.png" alt="TERSIS" className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-110" /></div>
              <span className={`text-2xl font-black ${textPrimary} ml-2 tracking-tighter`}>TERSIS</span>
            </button>
            <div className="hidden md:flex items-center space-x-6">
              {(['services', 'fleet', 'about', 'coverage', 'contact'] as const).map((s) => (
                <button key={s} onClick={() => scrollToSection(s)} className={`${textSecondary} hover:text-[#0052ff] transition text-[11px] font-black uppercase tracking-widest`}>{t.nav[s]}</button>
              ))}
            </div>
            <div className="hidden md:flex items-center gap-3">
              <button onClick={() => setLang(lang === 'en' ? 'lt' : 'en')} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md border ${borderColor} ${textSecondary} hover:text-[#0052ff] transition text-[10px] font-black uppercase`}><Languages className="h-3.5 w-3.5" /> {lang === 'en' ? 'LT' : 'EN'}</button>
              <button onClick={() => setIsDark(!isDark)} className={`p-2 rounded-md border ${borderColor} ${textSecondary} hover:text-[#0052ff] transition`}>{isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}</button>
              <button onClick={() => scrollToSection('contact')} className="bg-[#0052ff] text-white px-5 py-2 hover:bg-[#003dd6] transition font-bold text-xs uppercase rounded-md tracking-wider">{t.nav.getQuote}</button>
            </div>
            <div className="md:hidden flex items-center gap-2">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className={textSecondary}>{isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}</button>
            </div>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="pt-28 pb-20 px-4 relative min-h-[90vh] md:h-screen flex items-center overflow-hidden bg-[#050a14]">
        <video autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover z-0 opacity-40 pointer-events-none"><source src="/hero-video.mp4.mp4" type="video/mp4" /></video>
        <div className="absolute inset-0 bg-black/50 z-10 pointer-events-none" />
        <div className="max-w-7xl mx-auto w-full relative z-20">
          <div className="animate-fadeInUp">
            <div className="inline-block mb-6 px-4 py-2 bg-[#0052ff]/20 border border-[#0052ff]/40 rounded-md"><p className="text-[#0052ff] text-xs font-black uppercase tracking-[0.2em]">{lang === 'en' ? 'EST. 2011 • Trusted Experience' : 'ĮKURTA 2011 • Patikima patirtis'}</p></div>
            <h1 className="text-4xl md:text-7xl lg:text-8xl font-black text-white mb-6 leading-[0.9] uppercase tracking-tighter">{t.hero.title1}<br />{t.hero.title2}<br /><span className="text-[#0052ff]">{t.hero.title3}</span><br />{t.hero.title4}</h1>
            <div className="flex flex-wrap gap-4"><button onClick={() => scrollToSection('contact')} className="bg-[#0052ff] text-white px-8 py-4 rounded-md font-black hover:bg-[#003dd6] transition flex items-center gap-2 uppercase tracking-[0.2em] shadow-lg"> {t.hero.getQuote} <ArrowRight className="h-5 w-5" /></button></div>
          </div>
        </div>
      </section>

      {/* FLEET */}
      <section id="fleet" className={`py-24 px-4 border-t ${borderColor}`}>
        <div className="max-w-7xl mx-auto">
          <h2 className={`text-4xl md:text-5xl font-black ${textPrimary} text-center mb-16 uppercase tracking-tight`}>{t.fleet.title}</h2>
          <div className="grid md:grid-cols-2 gap-10">
            {[ 
              { title: t.fleet.standardClass, cap: '92 m³', icon: Truck, footer: t.fleet.standardFooter, items: [ [t.fleet.length, '13.6 m'], [t.fleet.height, '2.7 m'], [t.fleet.capacity, '33 Euro Pallets'] ] },
              { title: t.fleet.megaAdvantage, cap: '105 m³', icon: Maximize2, footer: t.fleet.megaFooter, items: [ [t.fleet.internalHeight, '3.0 m'], [t.fleet.volume, '105 m³'], [t.fleet.advantage, '+14% Capacity'] ] }
            ].map((f, i) => (
              <div key={i} className={`border ${borderAccent} p-10 ${bgCard} rounded-3xl flex flex-col hover:border-[#0052ff]/40 transition-all`}>
                <div className="flex items-center gap-5 mb-8"><f.icon className="h-10 w-10 text-[#0052ff]" /><div><h3 className={`text-2xl font-black ${textPrimary} uppercase tracking-tight`}>{f.title}</h3><p className="text-[#0052ff] font-bold text-sm tracking-widest">{f.cap} {t.fleet.capacity}</p></div></div>
                <div className="space-y-4 mb-8 flex-grow">{f.items.map(([l, v], idx) => (<div key={idx} className="flex justify-between border-b border-white/5 pb-3"><span className={`${textMuted} text-[10px] font-black uppercase tracking-widest`}>{l}</span><span className={`${textPrimary} font-black text-sm`}>{v}</span></div>))}</div>
                <p className={`${textMuted} text-xs italic border-t border-white/5 pt-6`}>{f.footer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className={`py-24 px-4 border-t ${borderColor}`}>
        <div className="max-w-7xl mx-auto text-center">
          <h2 className={`text-4xl md:text-5xl font-black ${textPrimary} mb-4 tracking-tight uppercase`}>{t.services.title}</h2>
          <p className="text-lg md:text-xl text-[#0052ff] font-black tracking-[0.2em] uppercase mb-16">Integrated Transport & Logistics Solutions</p>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
            {t.services.items.map((service, idx) => {
              const Icon = serviceIcons[idx] || Truck
              let displayTitle = service.title;
              if (displayTitle.includes('Groupage') || displayTitle.includes('Grupinių')) { displayTitle = displayTitle.split('/')[0].trim(); }
              return (
                <div key={idx} className={`border ${borderAccent} p-8 ${bgCard} rounded-3xl group hover:border-[#0052ff]/60 transition-all`}>
                  <Icon className="h-10 w-10 text-[#0052ff] mb-4 mx-auto group-hover:scale-110 transition" />
                  <h3 className={`text-xs font-black ${textPrimary} mb-1 uppercase tracking-widest`}>{displayTitle}</h3>
                  <p className={`text-[10px] ${textMuted} font-black uppercase tracking-tighter`}>{service.subtitle}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className={`py-24 px-4 border-t ${borderColor}`}>
        <div className="max-w-4xl mx-auto text-center">
          <h2 className={`text-4xl md:text-5xl font-black ${textPrimary} mb-6 tracking-tight uppercase`}>{t.about.title}</h2>
          <p className="text-gray-400 text-lg leading-relaxed mb-12">ETERSIS is a reliable logistics partner since 2011, operating a fleet of 27 Euro 6 vehicles. EU Licensed: <span className="text-white font-bold">LIC-009666-EBKR</span>.</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {[ 
              { icon: Truck, title: 'Own Fleet' }, { icon: Shield, title: 'CMR Insured' },
              { icon: Globe, title: 'EU Network' }, { icon: Clock, title: '24/7 Support' },
              { icon: Lock, title: 'Secure' }, { icon: Users, title: 'Expert Team' },
              { icon: FileText, title: 'Documents' }, { icon: Handshake, title: 'Partners' }
            ].map((item, idx) => (
              <div key={idx} className={`border border-white/5 p-6 ${bgCard} rounded-2xl hover:bg-[#0052ff]/5 transition-colors`}>
                <item.icon className="h-6 w-6 text-[#0052ff] mb-3 mx-auto" />
                <h3 className={`text-[10px] font-black ${textPrimary} uppercase tracking-tighter`}>{item.title}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COVERAGE */}
      <section id="coverage" className={`py-24 px-4 border-t ${borderColor} text-center`}>
        <h2 className={`text-4xl md:text-5xl font-black ${textPrimary} mb-16 uppercase tracking-tight`}>{t.coverage.title}</h2>
        <div className="max-w-7xl mx-auto relative h-[400px] md:h-[650px] rounded-[40px] overflow-hidden border border-[#0052ff]/30 shadow-2xl bg-black">
          <img src="/map-hub.jpg.png" alt="Map" className="absolute inset-0 w-full h-full object-cover opacity-90" />
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className={`py-24 px-4 border-t ${borderColor} bg-[#050a14]`}>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12 animate-fadeInUp">
            <h2 className={`text-4xl md:text-5xl font-black ${textPrimary} mb-4 uppercase tracking-tight`}>{t.contact.title}</h2>
            <p className={`text-lg ${textSecondary}`}>{t.contact.subtitle}</p>
          </div>
          <div className="p-10 rounded-3xl border border-white/5 shadow-2xl" style={{ background: '#0F1A2B' }}>
            <ContactForm t={t} inputBg="#0a1628" borderAccent="border-white/5" textPrimary="text-white" textSecondary="text-gray-400" />
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-20 bg-[#050a14] border-t border-white/5 text-center px-4 text-gray-600 text-[10px] font-bold uppercase tracking-[0.3em]">
        <div className="max-w-7xl mx-auto flex flex-col items-center gap-8 mb-12">
          <div className="flex items-center"><img src="https://tersis.lt/logo.png" alt="Logo" className="h-10 w-10 object-contain grayscale opacity-50" /><span className="text-2xl font-black ml-3">TERSIS</span></div>
          <p className="max-w-md mx-auto text-center leading-relaxed">Asset-based carrier & international logistics provider since 2011. Your reliable hub for European transport solutions.</p>
        </div>
        <p>© 2026 TERSIS. ALL RIGHTS RESERVED.</p>
      </footer>
    </div>
  )
}
