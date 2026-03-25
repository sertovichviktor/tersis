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
    from: '', to: '', cargoType: '', weight: '', volume: '', name: '', email: '', phone: '', message: '',
  })
  const [isSubmitted, setIsSubmitted] = useState(false)

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitted(true)
    setTimeout(() => { setIsSubmitted(false) }, 3000)
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
      {/* NAVIGATION */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? `${navBg} backdrop-blur-md border-b ${borderColor} shadow-sm` : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo + License */}
            <div className="flex items-center gap-3">
              <img src="/logo.png" alt="TERSIS" className="h-10 w-10 object-contain" />
              <div className="flex flex-col">
                <span className={`text-2xl font-black ${textPrimary} tracking-tight leading-none uppercase`}>TERSIS</span>
                <span className="text-[#0052ff] text-[11px] font-black mt-1 uppercase leading-none tracking-tight">LIC-009666-EBKR</span>
                <span className={`${textMuted} text-[8px] font-bold uppercase tracking-tighter leading-none mt-0.5`}>Asset-Based Carrier / Own Fleet</span>
              </div>
            </div>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center space-x-6">
              {['services', 'fleet', 'about', 'coverage', 'contact'].map((s) => (
                <button key={s} onClick={() => scrollToSection(s)} className={`${textSecondary} hover:text-[#0052ff] transition text-xs font-bold uppercase tracking-widest`}>
                  {t.nav[s as keyof typeof t.nav]}
                </button>
              ))}
              <div className="flex items-center gap-2 ml-4">
                <button onClick={() => setLang(lang === 'en' ? 'lt' : 'en')} className={`px-2 py-1 rounded border ${borderColor} ${textSecondary} text-[10px] font-bold`}>{lang === 'en' ? 'LT' : 'EN'}</button>
                <button onClick={() => setIsDark(!isDark)} className={`p-1.5 rounded border ${borderColor} ${textSecondary}`}>{isDark ? <Sun size={14} /> : <Moon size={14} />}</button>
              </div>
            </div>

            {/* Mobile Toggle */}
            <button className={`md:hidden ${textSecondary}`} onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className={`md:hidden ${navBg} border-b ${borderColor} px-4 py-6 flex flex-col gap-4`}>
            {['services', 'fleet', 'about', 'coverage', 'contact'].map((s) => (
              <button key={s} onClick={() => scrollToSection(s)} className={`${textSecondary} text-sm font-bold uppercase tracking-widest`}>{t.nav[s as keyof typeof t.nav]}</button>
            ))}
            <div className="flex justify-between items-center pt-4 border-t border-gray-700">
               <button onClick={() => setLang(lang === 'en' ? 'lt' : 'en')} className={`px-4 py-2 rounded border ${borderColor} ${textSecondary} text-sm font-bold`}>{lang === 'en' ? 'LT' : 'EN'}</button>
               <button onClick={() => setIsDark(!isDark)} className={`p-3 rounded border ${borderColor} ${textSecondary}`}>{isDark ? <Sun size={20} /> : <Moon size={20} />}</button>
            </div>
          </div>
        )}
      </nav>

      {/* HERO SECTION */}
      <section className="relative h-screen flex items-center overflow-hidden bg-[#050a14]">
        <video autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover z-0">
          <source src="/hero-video.mp4.mp4" type="video/mp4" />
        </video>
        {/* Фиксированный оверлей для читаемости на видео */}
        <div className="absolute inset-0 bg-black/50 z-10" />

        <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 relative z-20">
          <div className="max-w-3xl animate-fadeInUp">
            <div className="inline-block mb-6 px-4 py-2 bg-[#0052ff]/20 border border-[#0052ff]/40 rounded-md">
              <p className="text-[#0052ff] text-xs font-black tracking-[0.2em] uppercase">Worldwide Logistics Solutions</p>
            </div>
            <h1 className="text-5xl sm:text-7xl font-black text-white mb-6 leading-[1.05] tracking-tight uppercase">
              {t.hero.title1}<br />
              {t.hero.title2}<br />
              <span className="text-[#0052ff]">{t.hero.title3}</span> {t.hero.title4}
            </h1>
            <p className="text-xl text-gray-200 mb-10 leading-relaxed max-w-2xl font-medium">
              Operating 27+ modern Euro-6 vehicles. Specializing in high-capacity MEGA trailers (105 m³) and standard solutions <span className="text-[#0052ff] font-bold">worldwide</span>.
            </p>
            <div className="flex flex-wrap gap-4">
              <button onClick={() => scrollToSection('contact')} className="bg-[#0052ff] text-white px-8 py-4 rounded-md text-sm font-black hover:bg-[#003dd6] transition flex items-center gap-2 uppercase tracking-widest shadow-xl">
                {t.hero.getQuote} <ArrowRight size={18} />
              </button>
              <button onClick={() => scrollToSection('fleet')} className="border-2 border-white/30 text-white hover:bg-white/10 px-8 py-4 rounded-md text-sm font-black transition uppercase tracking-widest">
                {t.hero.fleetDetails}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FLEET SECTION */}
      <section id="fleet" className={`py-24 px-4 sm:px-6 lg:px-8 border-t ${borderColor}`}>
        <div className="max-w-7xl mx-auto text-center">
            <h2 className={`text-4xl md:text-5xl font-black ${textPrimary} mb-4 tracking-tight`}>{t.fleet.title}</h2>
            <p className={`text-lg ${textSecondary} mb-16`}>{t.fleet.subtitle}</p>
            <div className="grid md:grid-cols-2 gap-8">
                <div className={`border ${borderAccent} p-8 ${bgCard} rounded-xl text-left`}>
                    <div className="flex items-center gap-4 mb-6">
                        <Truck className="text-[#0052ff]" size={32} />
                        <h3 className={`text-xl font-black ${textPrimary} tracking-tight`}>{t.fleet.standardClass}</h3>
                    </div>
                    <div className="space-y-3 text-sm font-bold uppercase tracking-widest text-slate-500">
                        <div className="flex justify-between border-b pb-2"><span>Length</span> <span className={textPrimary}>13.6 m</span></div>
                        <div className="flex justify-between border-b pb-2"><span>Capacity</span> <span className={textPrimary}>33 Pallets</span></div>
                    </div>
                </div>
                <div className={`border ${borderAccent} p-8 ${bgCard} rounded-xl text-left`}>
                    <div className="flex items-center gap-4 mb-6">
                        <Maximize2 className="text-[#0052ff]" size={32} />
                        <h3 className={`text-xl font-black ${textPrimary} tracking-tight`}>{t.fleet.megaAdvantage}</h3>
                    </div>
                    <div className="space-y-3 text-sm font-bold uppercase tracking-widest text-slate-500">
                        <div className="flex justify-between border-b pb-2"><span>Height</span> <span className={textPrimary}>3.0 m</span></div>
                        <div className="flex justify-between border-b pb-2"><span>Volume</span> <span className={textPrimary}>105 m³</span></div>
                    </div>
                </div>
            </div>
        </div>
      </section>

      {/* COVERAGE MAP (Анимированный хаб) */}
      <section id="coverage" className={`py-24 px-4 sm:px-6 lg:px-8 border-t ${borderColor}`}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className={`text-4xl md:text-5xl font-black ${textPrimary} mb-4 tracking-tight`}>{t.coverage.title}</h2>
            <p className={`text-lg ${textSecondary} font-bold tracking-widest uppercase`}>Consolidation Hub: Kaunas, Lithuania</p>
          </div>

          <div className={`relative h-[550px] rounded-3xl overflow-hidden border ${borderAccent} ${isDark ? 'bg-[#0a1628]' : 'bg-slate-200'} flex items-center justify-center`}>
            {/* World Background Pattern */}
            <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/world-map.png')] bg-center bg-no-repeat scale-125"></div>
            
            <svg className="absolute inset-0 w-full h-full pointer-events-none z-10" viewBox="0 0 800 500">
              {/* Каунас Хаб */}
              <circle cx="400" cy="250" r="10" fill="#0052ff">
                <animate attributeName="r" values="8;12;8" dur="2s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="1;0.5;1" dur="2s" repeatCount="indefinite" />
              </circle>
              {/* Лучи и дуги */}
              <g stroke="#0052ff" strokeWidth="2" fill="none" opacity="0.4">
                <path d="M 100 150 Q 250 150 400 250" strokeDasharray="5,5">
                    <animate attributeName="stroke-dashoffset" from="50" to="0" dur="3s" repeatCount="indefinite" />
                </path>
                <path d="M 700 100 Q 550 150 400 250" strokeDasharray="5,5" />
                <path d="M 200 450 Q 300 350 400 250" strokeDasharray="5,5" />
                <path d="M 600 450 Q 500 350 400 250" strokeDasharray="5,5" />
              </g>
              {/* Капли-точки */}
              <circle cx="100" cy="150" r="4" fill="#0052ff" />
              <circle cx="700" cy="100" r="4" fill="#0052ff" />
              <circle cx="200" cy="450" r="4" fill="#0052ff" />
              <circle cx="600" cy="450" r="4" fill="#0052ff" />
            </svg>
            <div className="absolute z-20 text-center">
               <span className="bg-[#0052ff] text-white px-6 py-2 rounded-full text-xs font-black uppercase tracking-widest shadow-2xl">KAUNAS HUB</span>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT FORM (Без Deadline) */}
      <section id="contact" className={`py-24 px-4 sm:px-6 lg:px-8 border-t ${borderColor}`}>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12 font-black text-4xl uppercase tracking-tighter">Get a Quote</div>
          <div className={`${bgCard} border ${borderAccent} rounded-2xl p-8 md:p-10 shadow-2xl`}>
            <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-5 text-left">
              {[
                { key: 'from' }, { key: 'to' }, { key: 'cargoType' }, { key: 'weight' }, { key: 'volume' }, { key: 'name' }, { key: 'email' },
              ].map(({ key }) => (
                <div key={key}>
                  <label className={`block text-xs font-bold ${textSecondary} mb-2 uppercase tracking-widest`}>
                    {t.contact[key as keyof typeof t.contact] as string}
                  </label>
                  <input required value={formData[key as keyof typeof formData]} onChange={(e) => setFormData({ ...formData, [key]: e.target.value })}
                    className={`w-full px-4 py-3 ${inputBg} border ${borderAccent} ${textPrimary} focus:border-[#0052ff] outline-none transition rounded-lg text-sm`}
                    placeholder={(t.contact.placeholders as any)[key]} />
                </div>
              ))}
              <div className="md:col-span-2">
                 <label className={`block text-xs font-bold ${textSecondary} mb-2 uppercase tracking-widest`}>Phone</label>
                 <input type="tel" required value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className={`w-full px-4 py-3 ${inputBg} border ${borderAccent} ${textPrimary} focus:border-[#0052ff] outline-none transition rounded-lg text-sm`}
                  placeholder="+370 ..." />
              </div>
              <button type="submit" className="md:col-span-2 bg-[#0052ff] text-white py-5 font-black hover:bg-[#003dd6] transition uppercase tracking-widest rounded-lg">
                {isSubmitted ? 'SENT' : 'SEND REQUEST'}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className={`${bg} border-t ${borderColor} py-16 px-4`}>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-center md:text-left">
            <div className="flex items-center gap-3 mb-2 justify-center md:justify-start">
              <img src="/logo.png" alt="TERSIS" className="h-8 w-8" />
              <h4 className={`text-xl font-black ${textPrimary}`}>TERSIS</h4>
            </div>
            <p className="text-[#0052ff] font-bold text-[11px] mb-1">LICENSE: LIC-009666-EBKR</p>
            <p className={`${textSecondary} text-[10px] font-bold uppercase`}>Taikos pr. 141-305, Kaunas, LT-51132, Lithuania</p>
            <p className={`${textMuted} text-[10px] mt-4 font-bold tracking-widest`}>© 2026 TERSIS. European asset-based carrier | All rights reserved.</p>
          </div>
          <div className="flex gap-10">
              <div className="flex flex-col items-center">
                 <Mail className="h-6 w-6 text-[#0052ff] mb-2" />
                 <span className={`${textMuted} text-[10px] font-bold tracking-tighter`}>info@tersis.lt</span>
              </div>
              <div className="flex flex-col items-center">
                 <Phone className="h-6 w-6 text-[#0052ff] mb-2" />
                 <span className={`${textMuted} text-[10px] font-bold tracking-tighter`}>+370 37 321 321</span>
              </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
