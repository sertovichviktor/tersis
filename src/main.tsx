import { useState, useEffect, useCallback, memo } from 'react'
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
  Maximize2,
  Sun,
  Moon,
  Languages,
  Home, // <--- Добавил, чтобы не было белого экрана
} from 'lucide-react'
import { translations, type Lang } from './lib/i18n' // <--- Исправил путь для GitHub Actions

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

// --- ИЗОЛИРОВАННАЯ ФОРМА (ЧТОБЫ НЕ ЗАВИСАЛО) ---
const ContactForm = memo(({ t, inputBg, borderAccent, textPrimary, textSecondary }: any) => {
  const [formData, setFormData] = useState({
    from: '', to: '', cargoType: '', weight: '', volume: '', deadline: '', name: '', email: '', phone: '', message: '',
  })
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch('/send.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      if (response.ok) {
        setIsSubmitted(true)
        setFormData({ from: '', to: '', cargoType: '', weight: '', volume: '', deadline: '', name: '', email: '', phone: '', message: '' })
        setTimeout(() => setIsSubmitted(false), 4000)
      }
    } catch (error) {
      alert('Error! Check connection.')
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  return (
    <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-5">
      {([
        { key: 'from', type: 'text' },
        { key: 'to', type: 'text' },
        { key: 'cargoType', type: 'text' },
        { key: 'weight', type: 'text' },
        { key: 'volume', type: 'text' },
        { key: 'name', type: 'text' },
      ] as const).map(({ key, type }) => (
        <div key={key}>
          <label htmlFor={key} className={`block text-xs font-bold ${textSecondary} mb-2 uppercase tracking-widest`}>
            {t.contact[key]}
          </label>
          <input
            id={key} name={key} type={type} required
            value={(formData as any)[key]}
            onChange={handleChange}
            autoComplete="off"
            className={`w-full px-4 py-3 ${inputBg} border ${borderAccent} ${textPrimary} focus:border-[#0052ff] outline-none transition rounded-lg text-sm font-bold`}
            placeholder={(t.contact.placeholders as any)[key]}
          />
        </div>
      ))}
      <div className="md:col-span-2">
        <label htmlFor="email" className={`block text-xs font-bold ${textSecondary} mb-2 uppercase tracking-widest`}>{t.contact.email}</label>
        <input id="email" name="email" type="email" required value={formData.email} onChange={handleChange}
          className={`w-full px-4 py-3 ${inputBg} border ${borderAccent} ${textPrimary} focus:border-[#0052ff] outline-none transition rounded-lg text-sm font-bold`}
          placeholder={t.contact.placeholders.email} />
      </div>
      <div className="md:col-span-2">
        <label htmlFor="phone" className={`block text-xs font-bold ${textSecondary} mb-2 uppercase tracking-widest`}>{t.contact.phone}</label>
        <input id="phone" name="phone" type="tel" required value={formData.phone} onChange={handleChange}
          className={`w-full px-4 py-3 ${inputBg} border ${borderAccent} ${textPrimary} focus:border-[#0052ff] outline-none transition rounded-lg text-sm font-bold`}
          placeholder={t.contact.placeholders.phone} />
      </div>
      <div className="md:col-span-2">
        <label htmlFor="message" className={`block text-xs font-bold ${textSecondary} mb-2 uppercase tracking-widest`}>{t.contact.message}</label>
        <textarea id="message" name="message" value={formData.message} onChange={handleChange} rows={3}
          className={`w-full px-4 py-3 ${inputBg} border ${borderAccent} ${textPrimary} focus:border-[#0052ff] outline-none transition resize-none rounded-lg text-sm font-bold`}
          placeholder={t.contact.placeholders.message} />
      </div>
      <div className="md:col-span-2">
        <button type="submit" className="w-full bg-[#0052ff] text-white py-5 text-base font-black hover:bg-[#003dd6] transition uppercase tracking-widest rounded-lg active:scale-95">
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
    const hash = window.location.hash
    if (hash) {
      setTimeout(() => {
        const element = document.querySelector(hash)
        if (element) element.scrollIntoView({ behavior: 'smooth' })
      }, 500)
    }
  }, [])

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
      {isDark && (
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'linear-gradient(0deg, transparent 24%, rgba(0, 82, 255, 0.08) 25%, rgba(0, 82, 255, 0.08) 26%, transparent 27%, transparent 74%, rgba(0, 82, 255, 0.08) 75%, rgba(0, 82, 255, 0.08) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(0, 82, 255, 0.08) 25%, rgba(0, 82, 255, 0.08) 26%, transparent 27%, transparent 74%, rgba(0, 82, 255, 0.08) 75%, rgba(0, 82, 255, 0.08) 76%, transparent 77%, transparent)', backgroundSize: '60px 60px' }} />
      )}

      <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? `${navBg} backdrop-blur-md border-b ${borderColor} shadow-sm` : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-18">
            <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="flex items-center group">
              <div className="relative h-10 w-10"><img src="https://tersis.lt/logo.png" alt="TERSIS" className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-110" /></div>
              <span className={`text-2xl font-black ${textPrimary} ml-2`}>TERSIS</span>
            </button>
            <div className="hidden md:flex items-center space-x-6">
              {(['services', 'fleet', 'about', 'coverage', 'contact'] as const).map((s) => (
                <button key={s} onClick={() => scrollToSection(s)} className={`${textSecondary} hover:text-[#0052ff] transition text-sm font-semibold uppercase`}>{t.nav[s]}</button>
              ))}
            </div>
            <div className="hidden md:flex items-center gap-3">
              <button onClick={() => setLang(lang === 'en' ? 'lt' : 'en')} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md border ${borderColor} ${textSecondary} hover:text-[#0052ff] transition text-xs font-bold uppercase`}><Languages className="h-3.5 w-3.5" /> {lang === 'en' ? 'LT' : 'EN'}</button>
              <button onClick={() => setIsDark(!isDark)} className={`p-2 rounded-md border ${borderColor} ${textSecondary} hover:text-[#0052ff] transition`}>{isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}</button>
              <button onClick={() => scrollToSection('contact')} className="bg-[#0052ff] text-white px-5 py-2 hover:bg-[#003dd6] transition font-bold text-sm uppercase rounded-md">{t.nav.getQuote}</button>
            </div>
            <div className="md:hidden flex items-center gap-2">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className={textSecondary}>{isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}</button>
            </div>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="pt-28 pb-20 px-4 relative min-h-[90vh] md:h-screen flex items-center overflow-hidden bg-[#050a14]">
        <video autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover z-0 opacity-40"><source src="/hero-video.mp4.mp4" type="video/mp4" /></video>
        <div className="absolute inset-0 bg-black/50 z-10" />
        <div className="max-w-7xl mx-auto w-full relative z-20">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="animate-fadeInUp">
              <div className="inline-block mb-6 px-4 py-2 bg-[#0052ff]/20 border border-[#0052ff]/40 rounded-md"><p className="text-[#0052ff] text-sm font-bold uppercase">{lang === 'en' ? 'EST. 2011 • Trusted Experience' : 'ĮKURTA 2011 • Patikima patirtis'}</p></div>
              <h1 className="text-4xl md:text-7xl font-black text-white mb-6 leading-none uppercase">{t.hero.title1}<br />{t.hero.title2}<br /><span className="text-[#0052ff]">{t.hero.title3}</span><br />{t.hero.title4}</h1>
              <div className="flex flex-wrap gap-4"><button onClick={() => scrollToSection('contact')} className="bg-[#0052ff] text-white px-8 py-4 rounded-md font-bold hover:bg-[#003dd6] transition flex items-center gap-2 uppercase tracking-wide"> {t.hero.getQuote} <ArrowRight className="h-4 w-4" /></button></div>
            </div>
          </div>
        </div>
      </section>

      {/* FLEET */}
      <section id="fleet" className={`py-24 px-4 border-t ${borderColor}`}>
        <div className="max-w-7xl mx-auto">
          <h2 className={`text-4xl md:text-5xl font-black ${textPrimary} text-center mb-16 uppercase`}>{t.fleet.title}</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {[ 
              { title: t.fleet.standardClass, cap: '92 m³', icon: Truck, footer: t.fleet.standardFooter, items: [ [t.fleet.length, '13.6 m'], [t.fleet.height, '2.7 m'], [t.fleet.capacity, '33 Euro'] ] },
              { title: t.fleet.megaAdvantage, cap: '105 m³', icon: Maximize2, footer: t.fleet.megaFooter, items: [ [t.fleet.internalHeight, '3.0 m'], [t.fleet.volume, '105 m³'], [t.fleet.advantage, '+14%'] ] }
            ].map((f, i) => (
              <div key={i} className={`border ${borderAccent} p-8 ${bgCard} rounded-xl flex flex-col`}>
                <div className="flex items-center gap-4 mb-8"><f.icon className="h-8 w-8 text-[#0052ff]" /><div><h3 className={`text-xl font-black ${textPrimary} uppercase`}>{f.title}</h3><p className="text-[#0052ff] font-bold">{f.cap} {t.fleet.capacity}</p></div></div>
                <div className="space-y-4 mb-8 flex-grow">{f.items.map(([l, v], idx) => (<div key={idx} className="flex justify-between border-b border-white/5 pb-2"><span className={textMuted}>{l}</span><span className={`${textPrimary} font-black`}>{v}</span></div>))}</div>
                <p className={`${textMuted} text-xs italic`}>{f.footer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className={`py-24 px-4 border-t ${borderColor}`}>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12 animate-fadeInUp">
            <h2 className={`text-4xl md:text-5xl font-black ${textPrimary} mb-4 uppercase`}>{t.contact.title}</h2>
            <p className={textSecondary}>{t.contact.subtitle}</p>
          </div>
          <div className={`${bgCard} border ${borderAccent} rounded-2xl p-8 md:p-10 shadow-2xl`}>
            {/* ВЫЗОВ ИЗОЛИРОВАННОЙ ФОРМЫ */}
            <ContactForm t={t} inputBg={inputBg} borderAccent={borderAccent} textPrimary={textPrimary} textSecondary={textSecondary} />
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className={`${bg} border-t ${borderColor} py-16 px-4`}>
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-12">
          <div>
            <div className="flex items-center mb-6"><div className="h-10 w-10"><img src="https://tersis.lt/logo.png" alt="TERSIS" className="h-full w-full object-contain" /></div><h4 className={`text-xl font-black ${textPrimary} ml-3`}>TERSIS</h4></div>
            <div className={`space-y-4 ${textSecondary} text-sm`}>
              <div className="flex items-start gap-3"><MapPin className="h-5 w-5 text-[#0052ff]" /><span>Taikos pr. 141-305, Kaunas</span></div>
              <div className="flex items-start gap-3"><Phone className="h-5 w-5 text-[#0052ff]" /><a href="tel:+37065955956" className="hover:text-[#0052ff] transition">+370 65 955 956</a></div>
              <div className="flex items-start gap-3"><Mail className="h-5 w-5 text-[#0052ff]" /><a href="mailto:info@tersis.lt" className="hover:text-[#0052ff] transition">info@tersis.lt</a></div>
            </div>
          </div>
          <div>
            <h5 className={`font-black ${textPrimary} mb-6 text-sm uppercase`}>{t.footer.servicesTitle}</h5>
            <ul className="space-y-2">
              {t.services.items.slice(0, 6).map((svc: any, i: number) => (
                <li key={i}><button onClick={() => scrollToSection('services')} className={`${textSecondary} hover:text-[#0052ff] transition text-sm`}>{svc.title}</button></li>
              ))}
            </ul>
          </div>
          <div><h5 className={`font-black ${textPrimary} mb-6 text-sm uppercase`}>{t.footer.legalTitle}</h5><div className="text-[#0052ff] font-black">LIC-009666-EBKR</div></div>
        </div>
      </footer>
    </div>
  )
}

export default TersisApp
