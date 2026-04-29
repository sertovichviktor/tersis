import { useState, useEffect, useCallback, memo } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import {
  Truck, ArrowRight, Check, Shield, Clock, Menu, X, Phone, Mail, MapPin, Zap, Globe, Lock, AlertTriangle, Handshake, Users, FileText, Home, Maximize2, Sun, Moon, Languages,
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
      { name: 'keywords', content: 'logistics Lithuania, transport Europe, MEGA trailers, Tersis Kaunas, asset-based carrier' },
      { property: 'og:title', content: 'TERSIS | Asset-Based Carrier & International Logistics' },
      { property: 'og:description', content: 'Reliable transport solutions since 2011. Own fleet of 27+ vehicles. MEGA trailers specialist.' },
      { property: 'og:image', content: '/logo.png' },
    ],
  }),
})

const serviceIcons = [Truck, Globe, AlertTriangle, Zap, Clock, Home, FileText, Shield]

// --- ИЗОЛИРОВАННАЯ ФОРМА (ЧТОБЫ НЕ ЗАВИСАЛО ПРИ ВВОДЕ) ---
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
    } catch (error) { alert('Error sending request.') }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  return (
    <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-5">
      {[
        { key: 'from', type: 'text' }, { key: 'to', type: 'text' }, { key: 'cargoType', type: 'text' },
        { key: 'weight', type: 'text' }, { key: 'volume', type: 'text' }, { key: 'name', type: 'text' },
      ].map(({ key, type }) => (
        <div key={key}>
          <label htmlFor={key} className={`block text-xs font-bold ${textSecondary} mb-2 uppercase tracking-widest`}>
            {(t.contact as any)[key]}
          </label>
          <input
            id={key} name={key} type={type} required
            value={(formData as any)[key]}
            onChange={handleChange}
            className={`w-full px-4 py-3 ${inputBg} border ${borderAccent} ${textPrimary} focus:border-[#0052ff] outline-none transition rounded-lg text-sm font-bold`}
            placeholder={(t.contact.placeholders as any)[key] || ''}
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
        <button type="submit" className="w-full bg-[#0052ff] text-white py-5 text-base font-black hover:bg-[#003dd6] transition uppercase tracking-widest rounded-lg shadow-lg shadow-[#0052ff]/20 active:scale-95">
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-18">
            <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="flex items-center focus:outline-none group">
              <div className="relative flex items-center justify-center h-10 w-10">
                <img src="/logo.png" alt="TERSIS" className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-110" />
              </div>
              <span className={`text-2xl font-black ${textPrimary} tracking-tight ml-2`}>TERSIS</span>
            </button>
            <div className="hidden md:flex items-center space-x-6">
              {(['services', 'fleet', 'about', 'coverage', 'contact'] as const).map((section) => (
                  <button key={section} onClick={() => scrollToSection(section)} className={`${textSecondary} hover:text-[#0052ff] transition text-sm font-semibold uppercase tracking-wide`}>{t.nav[section]}</button>
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
      </nav>

      <section className="pt-28 pb-20 px-4 relative min-h-[90vh] md:h-screen flex items-center overflow-hidden bg-[#050a14]">
        <video autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover z-0"><source src="/hero-video.mp4.mp4" type="video/mp4" /></video>
        <div className="absolute inset-0 bg-black/60 z-10" />
        <div className="max-w-7xl mx-auto w-full relative z-20">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="animate-fadeInUp text-left">
              <div className={`inline-block mb-6 px-4 py-2 bg-[#0052ff]/20 border border-[#0052ff]/40 rounded-md`}><p className="text-[#0052ff] text-sm font-bold tracking-wider">{lang === 'en' ? 'EST. 2011 • Trusted Experience' : 'ĮKURTA 2011 • Patikima patirtis'}</p></div>
              <h1 className="text-4xl sm:text-6xl md:text-7xl font-black text-white mb-6 leading-[1.05] tracking-tight uppercase">{t.hero.title1}<br />{t.hero.title2}<br /><span className="text-[#0052ff]">{t.hero.title3}</span><br />{t.hero.title4}</h1>
              <p className="text-lg text-gray-200 mb-10 leading-relaxed max-w-lg font-medium">{lang === 'en' ? 'We operate a fleet of 27+ modern Euro 6 vehicles, specializing in high-capacity MEGA trailers (105 m³) and delivering reliable standard transport solutions worldwide.' : 'Valdome 27+ modernių Euro 6 transporto priemonių parką, specializuojamės didelio tūrio MEGA puspriekabėmis (105 m³) ir teikiame patikimus standartinio transporto sprendimus visame pasaulyje.'}</p>
              <div className="flex flex-wrap gap-4"><button onClick={() => scrollToSection('contact')} className="bg-[#0052ff] text-white px-8 py-4 rounded-md text-base font-bold hover:bg-[#003dd6] transition flex items-center gap-2 uppercase shadow-lg">{t.hero.getQuote} <ArrowRight className="h-4 w-4" /></button><button onClick={() => scrollToSection('fleet')} className="border-2 border-white/20 text-white hover:bg-white/10 px-8 py-4 rounded-md text-base font-bold transition uppercase">{t.hero.fleetDetails}</button></div>
            </div>
            <div className="flex flex-col gap-4 md:gap-6 items-start md:items-end">
               <div className="bg-white/5 backdrop-blur-md border border-white/10 p-6 md:p-8 rounded-xl w-full max-w-[340px]"><Truck className="h-8 w-8 md:h-10 md:w-10 text-[#0052ff] mb-4" /><p className="text-4xl md:text-5xl font-black text-white mb-1 leading-none uppercase">27+</p><p className="text-xs font-bold text-gray-400 uppercase tracking-widest">{lang === 'en' ? 'Own Vehicles' : 'Nuosavas transportas'}</p></div>
               <div className="bg-white/5 backdrop-blur-md border border-white/10 p-6 md:p-8 rounded-xl w-full max-w-[340px]"><FileText className="h-8 w-8 md:h-10 md:w-10 text-[#0052ff] mb-4" /><p className="text-lg md:text-xl font-black text-white mb-1 uppercase tracking-tight">LIC-009666-EBKR</p><p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{lang === 'en' ? 'EU Transport License' : 'ES transporto licencija'}</p></div>
            </div>
          </div>
        </div>
      </section>

      <section id="fleet" className={`py-24 px-4 border-t ${borderColor}`}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 animate-fadeInUp"><h2 className={`text-4xl md:text-5xl font-black ${textPrimary} mb-4 uppercase`}>{t.fleet.title}</h2><p className={`text-lg ${textSecondary}`}>{t.fleet.subtitle}</p></div>
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className={`border ${borderAccent} p-6 md:p-8 ${bgCard} rounded-xl hover:border-[#0052ff]/50 transition-all duration-300 flex flex-col`}>
              <div className="flex items-center gap-4 mb-8"><div className={`w-14 h-14 ${isDark ? 'bg-[#0052ff]/10' : 'bg-[#0052ff]/5'} flex items-center justify-center border ${borderAccent} rounded-lg`}><Truck className="h-7 w-7 text-[#0052ff]" /></div><div><h3 className={`text-xl font-black ${textPrimary} tracking-tight uppercase`}>{t.fleet.standardClass}</h3><p className="text-[#0052ff] font-bold text-sm">92 m³ {t.fleet.capacity}</p></div></div>
              <div className="space-y-4 mb-8 flex-grow">{[[t.fleet.length, '13.6 m'], [t.fleet.height, '2.7 m'], [t.fleet.capacity, `33 ${t.fleet.euroPallets}`], [t.fleet.idealFor, t.fleet.generalCargo]].map(([label, value], i) => (<div key={i} className={`flex justify-between items-start gap-4 ${i < 3 ? `border-b ${borderColor}` : ''} pb-3`}><span className={`${textMuted} text-[10px] md:text-sm uppercase font-bold`}>{label}</span><span className={`${textPrimary} font-black text-xs md:text-base text-right`}>{value}</span></div>))}</div>
              <div className={`pt-4 border-t ${borderColor}`}><p className={`${textMuted} text-xs leading-relaxed italic`}>{t.fleet.standardFooter}</p></div>
            </div>
            <div className={`border ${borderAccent} p-6 md:p-8 ${bgCard} rounded-xl hover:border-[#0052ff]/50 transition-all duration-300 flex flex-col`}>
              <div className="flex items-center gap-4 mb-8"><div className={`w-14 h-14 ${isDark ? 'bg-[#0052ff]/10' : 'bg-[#0052ff]/5'} flex items-center justify-center border ${borderAccent} rounded-lg`}><Maximize2 className="h-7 w-7 text-[#0052ff]" /></div><div><h3 className={`text-xl font-black ${textPrimary} tracking-tight uppercase`}>{t.fleet.megaAdvantage}</h3><p className="text-[#0052ff] font-bold text-sm">105 m³ {t.fleet.capacity}</p></div></div>
              <div className="space-y-4 mb-8 flex-grow">{[[t.fleet.internalHeight, '3.0 m'], [t.fleet.volume, '105 m³'], [t.fleet.specialization, t.fleet.lightweightCargo], [t.fleet.advantage, '+14% ' + t.fleet.capacity]].map(([label, value], i) => (<div key={i} className={`flex justify-between items-start gap-4 ${i < 3 ? `border-b ${borderColor}` : ''} pb-3`}><span className={`${textMuted} text-[10px] md:text-sm uppercase font-bold`}>{label}</span><span className={`${textPrimary} font-black text-xs md:text-base text-right`}>{value}</span></div>))}</div>
              <div className={`pt-4 border-t ${borderColor}`}><p className={`${textMuted} text-xs leading-relaxed italic`}>{t.fleet.megaFooter}</p></div>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className={`py-24 px-4 border-t ${borderColor}`}>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12 animate-fadeInUp"><h2 className={`text-4xl md:text-5xl font-black ${textPrimary} mb-4 uppercase`}>{t.contact.title}</h2><p className={`text-lg ${textSecondary}`}>{t.contact.subtitle}</p></div>
          <div className={`${bgCard} border ${borderAccent} rounded-2xl p-8 md:p-10 shadow-2xl`}><ContactForm t={t} inputBg={inputBg} borderAccent={borderAccent} textPrimary={textPrimary} textSecondary={textSecondary} /></div>
        </div>
      </section>

      <footer className={`${bg} border-t ${borderColor} py-16 px-4`}>
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-12">
            <div>
              <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="flex items-center mb-6 text-left group"><div className="relative h-10 w-10"><img src="/logo.png" alt="TERSIS" className="h-full w-full object-contain" /></div><h4 className={`text-xl font-black ${textPrimary} ml-3`}>TERSIS</h4></button>
              <div className={`space-y-4 ${textSecondary} text-sm`}>
                <div className="flex items-start gap-3"><MapPin className="h-5 w-5 text-[#0052ff]" /><span>Taikos pr. 141-305, Kaunas, Lithuania</span></div>
                <div className="flex items-start gap-3"><Phone className="h-5 w-5 text-[#0052ff]" /><a href="tel:+37065955956" className="hover:text-[#0052ff]">+370 65 955 956</a></div>
                <div className="flex items-start gap-3"><Mail className="h-5 w-5 text-[#0052ff]" /><a href="mailto:info@tersis.lt" className="hover:text-[#0052ff]">info@tersis.lt</a></div>
              </div>
            </div>
            <div>
              <h5 className={`font-black ${textPrimary} mb-6 text-sm uppercase`}>{t.footer.servicesTitle}</h5>
              <ul className={`space-y-2 ${textSecondary} text-sm`}>{t.services.items.slice(0, 6).map((svc, i) => (<li key={i}><button onClick={() => scrollToSection('services')} className="hover:text-[#0052ff]">{svc.title}</button></li>))}</ul>
            </div>
            <div><h5 className={`font-black ${textPrimary} mb-6 text-sm uppercase`}>{t.footer.legalTitle}</h5><div className="text-[#0052ff] font-black">LIC-009666-EBKR</div></div>
        </div>
      </footer>
    </div>
  )
}
