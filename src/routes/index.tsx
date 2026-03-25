import { useState, useEffect, useCallback } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import {
  Truck,
  ArrowRight,
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
      {/* ─── NAVIGATION ─── */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? `${navBg} backdrop-blur-md border-b ${borderColor} shadow-sm` : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center gap-4">
              <img src="/logo.png" alt="TERSIS" className="h-10 w-10 object-contain" />
              <div className="flex flex-col">
                <span className={`text-2xl font-black ${textPrimary} tracking-tight leading-none`}>TERSIS</span>
                <span className="text-[#0052ff] text-[10px] font-black mt-1 uppercase tracking-wider leading-none">LIC-009666-EBKR</span>
                <span className={`${textMuted} text-[8px] font-bold uppercase tracking-tight`}>Asset-Based Carrier / Own Fleet</span>
              </div>
            </div>

            <div className="hidden md:flex items-center space-x-6">
              {['services', 'fleet', 'about', 'coverage', 'contact'].map((section) => (
                <button key={section} onClick={() => scrollToSection(section)} className={`${textSecondary} hover:text-[#0052ff] transition text-xs font-bold uppercase tracking-widest`}>
                  {t.nav[section as keyof typeof t.nav]}
                </button>
              ))}
              <button onClick={() => setLang(lang === 'en' ? 'lt' : 'en')} className={`px-2 py-1 rounded border ${borderColor} ${textSecondary} text-[10px] font-bold`}>
                {lang === 'en' ? 'LT' : 'EN'}
              </button>
              <button onClick={() => setIsDark(!isDark)} className={`p-1.5 rounded border ${borderColor} ${textSecondary}`}>
                {isDark ? <Sun className="h-3.5 w-3.5" /> : <Moon className="h-3.5 w-3.5" />}
              </button>
              <button onClick={() => scrollToSection('contact')} className="bg-[#0052ff] text-white px-5 py-2 hover:bg-[#003dd6] transition font-bold text-xs uppercase tracking-widest rounded-md">
                {t.nav.getQuote}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* ─── HERO SECTION ─── */}
      <section className="relative h-screen flex items-center overflow-hidden bg-[#050a14]">
        {/* VIDEO BACKGROUND */}
        <video autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover z-0">
          <source src="/hero-video.mp4.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/60 z-10" />

        <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 relative z-20">
          <div className="max-w-3xl animate-fadeInUp">
            <div className="inline-block mb-6 px-4 py-2 bg-[#0052ff]/20 border border-[#0052ff]/40 rounded-md">
              <p className="text-[#0052ff] text-xs font-black tracking-[0.2em] uppercase">{t.hero.badge}</p>
            </div>
            <h1 className="text-5xl sm:text-7xl font-black text-white mb-6 leading-[1.05] tracking-tight uppercase italic">
              {t.hero.title1}<br />
              <span className="text-[#0052ff]">{t.hero.title3}</span> {t.hero.title4}
            </h1>
            <p className="text-lg text-gray-300 mb-10 leading-relaxed max-w-2xl font-medium">
              Operating 27+ modern Euro-6 vehicles. Specializing in high-capacity MEGA trailers (105 m³) and standard solutions <span className="text-[#0052ff] font-bold tracking-widest uppercase italic">Worldwide</span>.
            </p>
            <div className="flex flex-wrap gap-4">
              <button onClick={() => scrollToSection('contact')} className="bg-[#0052ff] text-white px-8 py-4 rounded-md text-sm font-black hover:bg-[#003dd6] transition flex items-center gap-2 uppercase tracking-widest shadow-xl shadow-[#0052ff]/40">
                {t.hero.getQuote} <ArrowRight className="h-4 w-4" />
              </button>
              <button onClick={() => scrollToSection('fleet')} className="border-2 border-white/30 text-white hover:bg-white/10 px-8 py-4 rounded-md text-sm font-black transition uppercase tracking-widest">
                {t.hero.fleetDetails}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ─── FLEET (Оставил без изменений стиль) ─── */}
      <section id="fleet" className={`py-24 px-4 sm:px-6 lg:px-8 border-t ${borderColor}`}>
        <div className="max-w-7xl mx-auto text-center">
            <h2 className={`text-4xl md:text-5xl font-black ${textPrimary} mb-4 tracking-tight`}>{t.fleet.title}</h2>
            <p className={`text-lg ${textSecondary} mb-16`}>{t.fleet.subtitle}</p>
            <div className="grid md:grid-cols-2 gap-8">
                {/* Карточки флота */}
                <div className={`border ${borderAccent} p-8 ${bgCard} rounded-xl text-left`}>
                    <h3 className={`text-xl font-black ${textPrimary} mb-2 tracking-tight`}>{t.fleet.standardClass}</h3>
                    <p className="text-[#0052ff] font-bold mb-6 italic tracking-wider">92 m³ Capacity</p>
                    <div className="space-y-3 text-sm font-bold uppercase tracking-widest text-slate-500">
                        <div className="flex justify-between border-b pb-2"><span>Length</span> <span className={textPrimary}>13.6 m</span></div>
                        <div className="flex justify-between border-b pb-2"><span>Height</span> <span className={textPrimary}>2.7 m</span></div>
                        <div className="flex justify-between"><span>Pallets</span> <span className={textPrimary}>33</span></div>
                    </div>
                </div>
                <div className={`border ${borderAccent} p-8 ${bgCard} rounded-xl text-left`}>
                    <h3 className={`text-xl font-black ${textPrimary} mb-2 tracking-tight`}>{t.fleet.megaAdvantage}</h3>
                    <p className="text-[#0052ff] font-bold mb-6 italic tracking-wider">105 m³ Capacity</p>
                    <div className="space-y-3 text-sm font-bold uppercase tracking-widest text-slate-500">
                        <div className="flex justify-between border-b pb-2"><span>Internal Height</span> <span className={textPrimary}>3.0 m</span></div>
                        <div className="flex justify-between border-b pb-2"><span>Volume</span> <span className={textPrimary}>105 m³</span></div>
                        <div className="flex justify-between"><span>Advantage</span> <span className={textPrimary}>+14% Space</span></div>
                    </div>
                </div>
            </div>
        </div>
      </section>

      {/* ─── LOGISTICS MAP (НОВАЯ АНИМИРОВАННАЯ) ─── */}
      <section id="coverage" className={`py-24 px-4 sm:px-6 lg:px-8 border-t ${borderColor}`}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 animate-fadeInUp">
            <h2 className={`text-4xl md:text-5xl font-black ${textPrimary} mb-4 tracking-tight uppercase italic`}>
              {t.coverage.title}
            </h2>
            <p className={`text-lg ${textSecondary} font-bold tracking-widest uppercase`}>Consolidation Hub: Kaunas, Lithuania</p>
          </div>

          <div className={`relative h-[600px] rounded-3xl overflow-hidden border ${borderAccent} ${isDark ? 'bg-slate-900' : 'bg-slate-100'} flex items-center justify-center`}>
            {/* World Map Pattern */}
            <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/world-map.png')] bg-center bg-no-repeat scale-125"></div>
            
            {/* HUB - KAUNAS */}
            <div className="relative z-10 flex flex-col items-center">
              <div className="w-12 h-12 bg-[#0052ff] rounded-full relative shadow-[0_0_50px_rgba(0,82,255,0.6)]">
                <div className="absolute inset-0 rounded-full bg-[#0052ff] animate-ping opacity-75"></div>
                <div className="absolute inset-2 bg-white rounded-full border-4 border-[#0052ff]"></div>
              </div>
              <span className="mt-4 bg-[#0052ff] text-white px-6 py-2 rounded-full text-sm font-black uppercase tracking-widest italic shadow-xl">KAUNAS HUB</span>
            </div>

            {/* ANIMATED ARROWS (SVG) */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
                <defs>
                    <marker id="arrow" markerWidth="10" markerHeight="10" refX="0" refY="3" orient="auto" markerUnits="strokeWidth">
                        <path d="M0,0 L0,6 L9,3 z" fill="#0052ff" />
                    </marker>
                </defs>
                {/* Линии к центру */}
                <path d="M 100,200 Q 300,250 480,290" stroke="#0052ff" strokeWidth="2" fill="none" strokeDasharray="10,5" className="animate-pulse" />
                <path d="M 800,100 Q 650,200 520,290" stroke="#0052ff" strokeWidth="2" fill="none" strokeDasharray="10,5" />
                <path d="M 200,500 Q 350,400 490,320" stroke="#0052ff" strokeWidth="2" fill="none" strokeDasharray="10,5" />
                <path d="M 900,500 Q 700,450 520,310" stroke="#0052ff" strokeWidth="2" fill="none" strokeDasharray="10,5" />
            </svg>
            
            <div className="absolute bottom-8 text-center w-full">
                <p className={`${textMuted} text-xs font-black uppercase tracking-[0.3em]`}>Direct Assets & Consolidation Worldwide</p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── CONTACT / QUOTE (Удален Deadline) ─── */}
      <section id="contact" className={`py-24 px-4 sm:px-6 lg:px-8 border-t ${borderColor}`}>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12 animate-fadeInUp text-3xl font-black">GET A QUOTE</div>
          <div className={`${bgCard} border ${borderAccent} rounded-2xl p-8 md:p-10 shadow-2xl`}>
            <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-5">
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
              <div className="md:col-span-2 pt-4">
                <button type="submit" className="w-full bg-[#0052ff] text-white py-5 text-base font-black hover:bg-[#003dd6] transition uppercase tracking-[0.2em] rounded-lg">
                  {isSubmitted ? t.contact.submitted : t.contact.submit}
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* ─── FOOTER (2026) ─── */}
      <footer className={`${bg} border-t ${borderColor} py-16 px-4`}>
        <div className="max-w-7xl mx-auto text-center md:text-left flex flex-col md:flex-row justify-between items-center gap-8">
          <div>
            <div className="flex items-center gap-3 mb-2 justify-center md:justify-start">
              <img src="/logo.png" alt="TERSIS" className="h-8 w-8" />
              <h4 className={`text-xl font-black ${textPrimary}`}>TERSIS</h4>
            </div>
            <p className="text-[#0052ff] font-bold text-xs mb-1">LICENSE: LIC-009666-EBKR</p>
            <p className={`${textMuted} text-[10px] uppercase tracking-widest font-bold`}>© 2026 TERSIS. European asset-based carrier | All rights reserved.</p>
          </div>
          <div className="flex gap-6">
              <Mail className="text-[#0052ff]" />
              <Phone className="text-[#0052ff]" />
              <MapPin className="text-[#0052ff]" />
          </div>
        </div>
      </footer>
    </div>
  )
}
