import React, { useState, useEffect, useCallback, memo, useRef, useMemo } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import {
  Truck, ArrowRight, Check, Shield, Clock, Menu, X, Phone, Mail, MapPin, 
  Zap, Globe, Lock, AlertTriangle, Handshake, Users, FileText, Home, Maximize2, Sun, Moon, Languages
} from 'lucide-react'
// Исправлен путь импорта для успешного билда в GitHub Actions
import { translations, type Lang } from '../lib/i18n'

export const Route = createFileRoute('/')({
  component: TersisApp,
  head: () => ({
    meta: [
      { title: 'TERSIS | Asset-Based Carrier & International Logistics Hub' },
      { 
        name: 'description', 
        content: 'TERSIS is a reliable European logistics partner since 2011. Operating a fleet of 27+ modern Euro 6 vehicles with MEGA trailers. Worldwide transport solutions via Kaunas hub.' 
      },
      { property: 'og:title', content: 'TERSIS | Asset-Based Carrier & International Logistics' },
      { property: 'og:image', content: 'https://tersis.lt/logo.png' },
    ],
  }),
})

const serviceIcons = [Truck, Globe, AlertTriangle, Zap, Clock, Home, FileText, Shield]

// --- 1. ИЗОЛЯЦИЯ: ГЕРОЙ С ВИДЕО (memo) ---
const MemoHero = memo(({ t, lang, scrollToSection }: any) => (
  <section className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 relative min-h-[90vh] md:h-screen flex items-center overflow-hidden bg-[#050a14]">
    <video autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover z-0 opacity-40 pointer-events-none">
      <source src="/hero-video.mp4.mp4" type="video/mp4" />
    </video>
    <div className="absolute inset-0 bg-black/60 z-10 pointer-events-none" />
    <div className="max-w-7xl mx-auto w-full relative z-20">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div className="animate-fadeInUp text-left">
          <div className="inline-block mb-6 px-4 py-2 bg-[#0052ff]/20 border border-[#0052ff]/40 rounded-md">
            <p className="text-[#0052ff] text-sm font-bold tracking-wider uppercase">{lang === 'en' ? 'EST. 2011 • Trusted Experience' : 'ĮKURTA 2011 • Patikima patirtis'}</p>
          </div>
          <h1 className="text-4xl md:text-7xl lg:text-8xl font-black text-white mb-6 leading-[0.9] uppercase tracking-tighter">
            {t.hero.title1}<br />{t.hero.title2}<br /><span className="text-[#0052ff]">{t.hero.title3}</span><br />{t.hero.title4}
          </h1>
          <p className="text-lg text-gray-200 mb-10 leading-relaxed max-w-lg font-medium">
            {lang === 'en' 
              ? 'We operate a fleet of 27+ modern Euro 6 vehicles, specializing in high-capacity MEGA trailers (105 m³) and delivering reliable standard transport solutions worldwide.' 
              : 'Valdome 27+ modernių Euro 6 transporto priemonių parką, specializuojamės didelio tūrio MEGA puspriekabėmis (105 m³) ir teikiame patikimus standartinio transporto sprendimus visame pasaulyje.'}
          </p>
          <div className="flex flex-wrap gap-4">
            <button onClick={() => scrollToSection('contact')} className="bg-[#0052ff] text-white px-8 py-4 rounded-md font-bold hover:bg-[#003dd6] transition flex items-center gap-2 uppercase shadow-lg shadow-blue-500/20">{t.hero.getQuote} <ArrowRight className="h-4 w-4" /></button>
            <button onClick={() => scrollToSection('fleet')} className="border-2 border-white/20 text-white hover:bg-white/10 px-8 py-4 rounded-md font-bold transition uppercase">{t.hero.fleetDetails}</button>
          </div>
        </div>
        <div className="flex flex-col gap-6 items-start md:items-end">
          <div className="bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-xl w-full max-w-[340px]">
            <Truck className="h-10 w-10 text-[#0052ff] mb-4" /><p className="text-5xl font-black text-white mb-1 uppercase">27+</p><p className="text-xs font-bold text-gray-400 uppercase tracking-widest">{lang === 'en' ? 'Own Vehicles' : 'Nuosavas transportas'}</p>
          </div>
          <div className="bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-xl w-full max-w-[340px]">
            <FileText className="h-8 w-8 text-[#0052ff] mb-4" /><p className="text-xl font-black text-white mb-1 uppercase tracking-tight">LIC-009666-EBKR</p><p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{lang === 'en' ? 'EU Transport License' : 'ES licencija'}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
))

// --- 2. ИЗОЛЯЦИЯ: КАРТА С АНИМАЦИЕЙ ---
const MemoMap = memo(({ t }: any) => (
  <div className="relative h-[400px] md:h-[650px] rounded-[30px] overflow-hidden border border-[#0052ff]/30 shadow-2xl bg-black">
    <img src="/map-hub.jpg.png" className="absolute inset-0 w-full h-full object-cover opacity-90 pointer-events-none" />
    <svg className="absolute inset-0 w-full h-full z-10 pointer-events-none" viewBox="0 0 1000 600" preserveAspectRatio="xMidYMid slice">
      <g fill="none" strokeWidth="2" strokeLinecap="round">
        <path d="M 150,230 Q 300,100 485,205" stroke="rgba(0,82,255,0.5)" strokeDasharray="1, 50"><animate attributeName="stroke-dashoffset" from="300" to="0" dur="3s" repeatCount="indefinite" /></path>
        <path d="M 850,380 Q 650,250 485,205" stroke="rgba(0,82,255,0.5)" strokeDasharray="1, 50"><animate attributeName="stroke-dashoffset" from="300" to="0" dur="2.8s" repeatCount="indefinite" /></path>
      </g>
    </svg>
    <div className="absolute bottom-6 left-8 bg-black/40 backdrop-blur-md px-4 py-2 rounded-lg border border-white/10 text-left hidden md:block"><p className="text-[10px] font-black text-[#0052ff] uppercase mb-1">Hub Status</p><p className="text-white text-xs font-bold uppercase tracking-widest">Operational / 24-7</p></div>
    <div className="absolute bottom-6 right-8 bg-black/40 backdrop-blur-md px-4 py-2 rounded-lg border border-white/10 text-right hidden md:block"><p className="text-[10px] font-black text-[#0052ff] uppercase mb-1">Global Traffic</p><p className="text-white text-xs font-bold uppercase tracking-widest">Connected Worldwide</p></div>
  </div>
))

function TersisApp() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [lang, setLang] = useState<Lang>('en')
  const [isDark, setIsDark] = useState(true)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const isFocusing = useRef(false) // Блокиратор фриза

  const t = useMemo(() => translations[lang], [lang])

  useEffect(() => {
    const handleScroll = () => { if (!isFocusing.current) setIsScrolled(window.scrollY > 50) }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => { document.documentElement.classList.toggle('dark', isDark); document.documentElement.classList.toggle('light', !isDark) }, [isDark])

  const scrollToSection = useCallback((id: string) => {
    const element = document.getElementById(id)
    element?.scrollIntoView({ behavior: 'smooth' })
    setIsMenuOpen(false)
  }, [])

  const handleSubmit = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    setIsSubmitted(true);
    try {
      await fetch('/send.php', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
      form.reset();
      setTimeout(() => setIsSubmitted(false), 3000);
    } catch (error) { setIsSubmitted(false); }
  }, []);

  const bg = isDark ? 'bg-[#050a14]' : 'bg-gray-50'
  const textPrimary = isDark ? 'text-white' : 'text-gray-900'
  const textSecondary = isDark ? 'text-gray-400' : 'text-gray-600'
  const textMuted = isDark ? 'text-gray-500' : 'text-gray-400'
  const bgCard = isDark ? 'bg-[#0a1628]' : 'bg-white'
  const borderColor = isDark ? 'border-[#0052ff]/20' : 'border-gray-200'
  const borderAccent = isDark ? 'border-[#0052ff]/30' : 'border-[#0052ff]/20'
  const navBg = isDark ? 'bg-[#050a14]/95' : 'bg-white/95'

  return (
    <div className={`min-h-screen ${bg} relative transition-colors duration-300 font-sans overflow-x-hidden`}>
      {isDark && (
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'linear-gradient(0deg, transparent 24%, rgba(0, 82, 255, 0.08) 25%, rgba(0, 82, 255, 0.08) 26%, transparent 27%, transparent 74%, rgba(0, 82, 255, 0.08) 75%, rgba(0, 82, 255, 0.08) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(0, 82, 255, 0.08) 25%, rgba(0, 82, 255, 0.08) 26%, transparent 27%, transparent 74%, rgba(0, 82, 255, 0.08) 75%, rgba(0, 82, 255, 0.08) 76%, transparent 77%, transparent)', backgroundSize: '60px 60px' }} />
      )}

      {/* NAVIGATION */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? `${navBg} backdrop-blur-md border-b ${borderColor} shadow-sm h-16` : 'bg-transparent h-20'} flex items-center`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex justify-between items-center text-white">
          <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="flex items-center group">
            <div className="relative h-10 w-10"><img src="https://tersis.lt/logo.png" alt="TERSIS" className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-110" /></div>
            <span className={`text-2xl font-black ${textPrimary} ml-2 tracking-tighter`}>TERSIS</span>
          </button>
          <div className="hidden md:flex items-center space-x-6">
            {['services', 'fleet', 'about', 'coverage', 'contact'].map((s: any) => (
              <button key={s} onClick={() => scrollToSection(s)} className={`${textSecondary} hover:text-[#0052ff] transition text-[11px] font-black uppercase tracking-widest`}>{t.nav[s]}</button>
            ))}
            <div className="flex items-center gap-3 border-l border-white/10 pl-6">
              <button onClick={() => setLang(lang === 'en' ? 'lt' : 'en')} className={`${textSecondary} flex items-center gap-1.5 border ${borderColor} px-3 py-1 rounded text-[10px] font-black uppercase`}><Languages size={14}/> {lang.toUpperCase()}</button>
              <button onClick={() => setIsDark(!isDark)} className={`${textSecondary} p-2 border ${borderColor} rounded hover:bg-white/5`}>{isDark ? <Sun size={14}/> : <Moon size={14}/>}</button>
              <button onClick={() => scrollToSection('contact')} className="bg-[#0052ff] text-white px-5 py-2 hover:bg-[#003dd6] transition font-bold text-xs uppercase rounded-md tracking-wider shadow-lg shadow-blue-500/20">{t.nav.getQuote}</button>
            </div>
          </div>
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className={`md:hidden ${textSecondary}`}>{isMenuOpen ? <X/> : <Menu/>}</button>
        </div>
      </nav>

      <MemoHero t={t} lang={lang} scrollToSection={scrollToSection} />

      {/* FLEET */}
      <section id="fleet" className={`py-24 px-4 border-t ${borderColor}`}>
        <div className="max-w-7xl mx-auto text-center">
          <h2 className={`text-4xl md:text-5xl font-black ${textPrimary} mb-16 uppercase tracking-tight`}>{t.fleet.title}</h2>
          <div className="grid md:grid-cols-2 gap-10">
            <div className={`border border-white/5 p-10 ${bgCard} rounded-3xl flex flex-col text-left`}>
              <div className="flex items-center gap-5 mb-8"><Truck className="h-10 w-10 text-[#0052ff]" /><div><h3 className={`text-2xl font-black ${textPrimary} uppercase tracking-tight`}>{t.fleet.standardClass}</h3><p className="text-[#0052ff] font-bold text-sm tracking-widest">92 m³ {t.fleet.capacity}</p></div></div>
              <div className="space-y-4 mb-8 flex-grow">
                {[[t.fleet.length, '13.6 m'], [t.fleet.height, '2.7 m'], [t.fleet.capacity, '33 Euro Pallets']].map(([l, v], i) => (
                  <div key={i} className="flex justify-between border-b border-white/5 pb-3"><span className={`${textMuted} text-[10px] font-black uppercase tracking-widest`}>{l}</span><span className={`${textPrimary} font-black text-sm`}>{v}</span></div>
                ))}
              </div>
              <p className={`${textMuted} text-xs italic border-t border-white/5 pt-6`}>{t.fleet.standardFooter}</p>
            </div>
            <div className={`border border-[#0052ff]/30 p-10 ${bgCard} rounded-3xl flex flex-col text-left`}>
              <div className="flex items-center gap-5 mb-8"><Maximize2 className="h-10 w-10 text-[#0052ff]" /><div><h3 className={`text-2xl font-black ${textPrimary} uppercase tracking-tight`}>{t.fleet.megaAdvantage}</h3><p className="text-[#0052ff] font-bold text-sm tracking-widest">105 m³ {t.fleet.capacity}</p></div></div>
              <div className="space-y-4 mb-8 flex-grow">
                {[[t.fleet.internalHeight, '3.0 m'], [t.fleet.volume, '105 m³'], [t.fleet.advantage, '+14% Capacity']].map(([l, v], i) => (
                  <div key={i} className="flex justify-between border-b border-white/5 pb-3"><span className={`${textMuted} text-[10px] font-black uppercase tracking-widest`}>{l}</span><span className={`${textPrimary} font-black text-sm`}>{v}</span></div>
                ))}
              </div>
              <p className={`${textMuted} text-xs italic border-t border-white/5 pt-6`}>{t.fleet.megaFooter}</p>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10">
            {[{i:Shield,t:t.fleet.cmrInsured},{i:Clock,t:t.fleet.realTime},{i:Truck,t:t.fleet.modernFleet},{i:Check,t:t.fleet.euro6}].map((x,i)=>(<div key={i} className={`p-5 border border-white/5 ${bgCard} rounded-2xl`}><x.i className="text-blue-500 mx-auto mb-2" size={24}/><p className="text-[10px] font-black uppercase tracking-tighter text-white">{x.t}</p></div>))}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className={`py-24 px-4 border-t ${borderColor} text-center`}>
        <h2 className="text-4xl font-black mb-16 uppercase">{t.services.title}</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {t.services.items.map((s: any, i: number) => {
            const Icon = serviceIcons[i] || Truck
            return (
              <div key={i} className={`p-8 rounded-2xl border border-white/5 ${bgCard} hover:border-blue-500 transition-all group`}>
                <Icon className="text-blue-500 mb-4 mx-auto group-hover:scale-110 transition-transform" size={32} />
                <h4 className="font-black text-[10px] uppercase tracking-widest leading-tight text-white">{s.title.split('/')[0]}</h4>
              </div>
            )
          })}
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className={`py-24 px-4 border-t ${borderColor} text-center bg-[#050a14]`}>
        <div className="max-w-4xl mx-auto">
          <h2 className={`text-4xl md:text-5xl font-black ${textPrimary} mb-10 uppercase`}>{t.about.title}</h2>
          <div className="text-gray-400 text-lg leading-relaxed mb-12 space-y-6">
            <p>{lang === 'en' ? 'TERSIS provides reliable, cost-effective transportation solutions across Europe. Operating since 2011 with a focus on own assets and quality.' : 'TERSIS teikia patikimus transporto sprendimus visoje Europoje. Dirbame nuo 2011 m. orientuodamiesi į kokybę.'}</p>
            <p className="font-bold text-white uppercase text-sm tracking-widest border border-white/10 inline-block px-4 py-2 rounded">License: LIC-009666-EBKR</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
             {['Own Fleet','CMR Insured','EU Network','24/7 Support','Secure','Expert Team','Full Docs','Trusted'].map((l, i) => (
               <div key={i} className={`p-4 ${bgCard} rounded-xl border border-white/5`}><p className="font-black text-[10px] uppercase text-white">{l}</p></div>
             ))}
          </div>
        </div>
      </section>

      <MemoMap t={t} />

      {/* CONTACT FORM (ТВОЙ ДИЗАЙН 1:1) */}
      <section id="contact" className={`py-32 px-4 bg-[#050a14]`} onFocus={() => { isFocusing.current = true }} onBlur={() => { isFocusing.current = false }}>
        <div className="max-w-4xl mx-auto text-center">
           <h2 className={`text-4xl md:text-5xl font-black ${textPrimary} mb-12 uppercase tracking-tight`}>{t.contact.title}</h2>
           <div className="p-8 md:p-12 rounded-[40px] shadow-2xl border border-[#1A2C45]" style={{ background: '#0F1A2B', contain: 'layout paint' }}>
            <form onSubmit={handleSubmit} className="space-y-8 text-left" autoComplete="off">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-white">
                <div><label className="block text-[11px] font-black text-[#8899BB] uppercase tracking-widest mb-3">{t.contact.from}</label><input name="from" required placeholder={t.contact.placeholders.from} className="w-full px-5 py-4 bg-[#0a1628] rounded-xl border border-white/5 outline-none focus:border-blue-500 transition-colors" /></div>
                <div><label className="block text-[11px] font-black text-gray-500 uppercase tracking-widest mb-3">{t.contact.to}</label><input name="to" required placeholder={t.contact.placeholders.to} className="w-full px-5 py-4 bg-[#0a1628] rounded-xl border border-white/5 outline-none focus:border-blue-500 transition-colors" /></div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-white">
                <div><label className="block text-[11px] font-black text-gray-500 uppercase tracking-widest mb-3">{t.contact.cargoType}</label><input name="cargoType" placeholder={t.contact.placeholders.cargoType} className="w-full px-5 py-4 bg-[#0a1628] rounded-xl border border-white/5 outline-none focus:border-blue-500 transition-colors" /></div>
                <div><label className="block text-[11px] font-black text-gray-500 uppercase tracking-widest mb-3">{t.contact.weight}</label><input name="weight" placeholder={t.contact.placeholders.weight} className="w-full px-5 py-4 bg-[#0a1628] rounded-xl border border-white/5 outline-none focus:border-blue-500 transition-colors" /></div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-white">
                <div><label className="block text-[11px] font-black text-gray-500 uppercase tracking-widest mb-3">{t.contact.volume}</label><input name="volume" placeholder={t.contact.placeholders.volume} className="w-full px-5 py-4 bg-[#0a1628] rounded-xl border border-white/5 outline-none focus:border-blue-500 transition-colors" /></div>
                <div><label className="block text-[11px] font-black text-gray-500 uppercase tracking-widest mb-3">{t.contact.name}</label><input name="name" required placeholder={t.contact.placeholders.name} className="w-full px-5 py-4 bg-[#0a1628] rounded-xl border border-white/5 outline-none focus:border-blue-500 transition-colors" /></div>
              </div>
              <div className="text-white"><label className="block text-[11px] font-black text-gray-500 uppercase tracking-widest mb-3">{t.contact.email}</label><input name="email" type="email" required placeholder="john@company.com" className="w-full px-5 py-4 bg-[#0a1628] rounded-xl border border-white/5 outline-none focus:border-blue-500 transition-colors" /></div>
              <button type="submit" disabled={isSubmitted} className="w-full py-6 bg-[#0052ff] hover:bg-[#003dd6] text-white font-black rounded-2xl text-xs tracking-[0.3em] uppercase transition-all disabled:opacity-50">
                {isSubmitted ? t.contact.submitted : 'REQUEST QUOTE IN 24H'}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className={`${bg} border-t ${borderColor} py-20 px-6`}>
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-16 text-left">
          <div className="space-y-6">
            <div className="flex items-center gap-2"><img src="https://tersis.lt/logo.png" alt="Logo" className="h-8" /><span className="text-xl font-bold uppercase text-white tracking-tighter">TERSIS</span></div>
            <p className="text-gray-500 text-sm leading-relaxed">Asset-based carrier & international logistics provider since 2011. Reliable European transport solutions.</p>
          </div>
          <div className="space-y-6"><h4 className="text-white font-black text-xs uppercase tracking-widest">Office HQ</h4><p className="text-gray-500 text-sm">Taikos pr. 141-305, Kaunas, Lithuania<br/>info@tersis.lt | +370 65 955 956</p></div>
          <div className="space-y-6"><h4 className="text-white font-black text-xs uppercase tracking-widest">Legal</h4><p className="text-gray-600 text-xs font-bold uppercase">License: LIC-009666-EBKR<br/>100% CMR Insured<br/>© 2026 TERSIS</p></div>
        </div>
      </footer>
    </div>
  )
}

export default TersisApp
