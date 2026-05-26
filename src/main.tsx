import React, { useState, useEffect, useCallback, memo, useRef } from 'react'
import ReactDOM from 'react-dom/client'
import {
  Truck, ArrowRight, Check, Shield, Clock, Menu, X, Phone, Mail, MapPin, 
  Zap, Globe, Lock, AlertTriangle, Handshake, Users, FileText, Maximize2, Sun, Moon, Languages
} from 'lucide-react'
import { translations, type Lang } from './lib/i18n' 
import './styles.css'

// --- ИЗОЛЯЦИЯ: ВИДЕО ---
const MemoHero = memo(({ t, lang, scrollTo }: any) => (
  <section className="relative h-screen flex items-center px-4 sm:px-6 lg:px-8 overflow-hidden bg-[#050a14]">
    <div className="absolute inset-0 z-0 pointer-events-none">
      <video autoPlay muted loop playsInline className="w-full h-full object-cover opacity-60">
        <source src="/hero-video.mp4.mp4" type="video/mp4" />
      </video>
    </div>
    <div className="absolute inset-0 bg-black/50 z-10 pointer-events-none" />
    <div className="max-w-7xl mx-auto w-full relative z-20 grid md:grid-cols-2 gap-12 items-center">
      <div className="animate-fadeInUp text-left">
        <div className="inline-block mb-6 px-4 py-2 bg-[#0052ff]/20 border border-[#0052ff]/40 rounded-md">
          <p className="text-[#0052ff] text-xs font-bold tracking-widest uppercase">{lang === 'en' ? 'EST. 2011 • Trusted Experience' : 'ĮKURTA 2011 • Patikima patirtis'}</p>
        </div>
        <h1 className="text-5xl sm:text-7xl md:text-8xl font-black text-white mb-6 leading-[0.9] uppercase tracking-tighter">
          {t.hero.title1}<br />{t.hero.title2}<br /><span className="text-[#0052ff]">{t.hero.title3}</span><br />{t.hero.title4}
        </h1>
        <div className="flex gap-4">
          <button onClick={() => scrollTo('contact')} className="bg-[#0052ff] text-white px-8 py-4 rounded-md font-bold hover:bg-[#003dd6] transition flex items-center gap-2 uppercase shadow-lg shadow-blue-500/20">{t.hero.getQuote} <ArrowRight className="h-4 w-4" /></button>
          <button onClick={() => scrollTo('fleet')} className="border-2 border-white/20 text-white hover:bg-white/10 px-8 py-4 rounded-md font-bold transition uppercase">FLEET DETAILS</button>
        </div>
      </div>
      <div className="hidden md:flex flex-col gap-6 items-start md:items-end">
        <div className="bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-xl w-full max-w-[340px]">
          <Truck className="h-10 w-10 text-[#0052ff] mb-4" /><p className="text-5xl font-black text-white mb-1 uppercase">27+</p><p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Own Vehicles</p>
        </div>
        <div className="bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-xl w-full max-w-[340px]">
          <FileText className="h-8 w-8 text-[#0052ff] mb-4" /><p className="text-xl font-black text-white mb-1 uppercase tracking-tight">LIC-009666-EBKR</p><p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">EU Transport License</p>
        </div>
      </div>
    </div>
  </section>
))

// --- ИЗОЛЯЦИЯ: КАРТА ---
const MemoMap = memo(({ t }: any) => (
  <div className="relative h-[400px] md:h-[650px] rounded-[40px] overflow-hidden border border-[#0052ff]/30 shadow-2xl bg-black max-w-7xl mx-auto">
    <img src="/map-hub.jpg.png" className="absolute inset-0 w-full h-full object-cover opacity-90 pointer-events-none" />
    <svg className="absolute inset-0 w-full h-full z-10 pointer-events-none" viewBox="0 0 1000 600" preserveAspectRatio="xMidYMid slice">
      <g fill="none" strokeWidth="2" strokeLinecap="round">
        <path d="M 150,230 Q 300,100 485,205" stroke="rgba(0,82,255,0.5)" strokeDasharray="1, 50"><animate attributeName="stroke-dashoffset" from="300" to="0" dur="3s" repeatCount="indefinite" /></path>
        <path d="M 850,380 Q 650,250 485,205" stroke="rgba(0,82,255,0.5)" strokeDasharray="1, 50"><animate attributeName="stroke-dashoffset" from="300" to="0" dur="2.8s" repeatCount="indefinite" /></path>
      </g>
    </svg>
    <div className="absolute bottom-6 left-8 bg-black/40 backdrop-blur-md px-4 py-2 rounded-lg border border-white/10 text-left hidden md:block"><p className="text-[10px] font-black text-[#0052ff] uppercase">Hub Status</p><p className="text-white text-xs font-bold uppercase tracking-widest">Operational</p></div>
    <div className="absolute bottom-6 right-8 bg-black/40 backdrop-blur-md px-4 py-2 rounded-lg border border-white/10 text-right hidden md:block"><p className="text-[10px] font-black text-[#0052ff] uppercase">Global Traffic</p><p className="text-white text-xs font-bold uppercase tracking-widest">Connected</p></div>
  </div>
))

const serviceIcons = [Truck, Globe, AlertTriangle, Zap, Clock, Home, FileText, Shield]

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [lang, setLang] = useState<Lang>('en')
  const [isSubmitted, setIsSubmitted] = useState(false)
  const isFocusing = useRef(false)

  const t = translations[lang]

  useEffect(() => {
    const handleScroll = () => { if (!isFocusing.current) setIsScrolled(window.scrollY > 50) }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleSubmit = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitted(true);
    const data = Object.fromEntries(new FormData(e.currentTarget).entries());
    try {
      await fetch('/send.php', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
      form.reset();
      setTimeout(() => setIsSubmitted(false), 3000);
    } catch (e) { setIsSubmitted(false); }
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  }

  return (
    <div className="min-h-screen bg-[#050a14] text-white font-sans antialiased overflow-x-hidden">
      
      {/* NAVIGATION */}
      <nav className={`fixed w-full z-50 transition-all ${isScrolled ? 'bg-[#050a14]/95 backdrop-blur-md border-b border-white/5 h-16' : 'h-20'} flex items-center`}>
        <div className="max-w-7xl mx-auto px-6 w-full flex justify-between items-center">
          <div className="flex items-center gap-2 cursor-pointer group" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
            <img src="/logo.png" className="h-10" />
            <span className="text-2xl font-black tracking-tighter uppercase">TERSIS</span>
          </div>
          <div className="hidden md:flex gap-8 items-center text-[10px] font-bold uppercase tracking-widest text-gray-400">
            {['services', 'fleet', 'about', 'contact'].map(s => <button key={s} onClick={() => scrollTo(s)} className="hover:text-white transition-colors">{(t.nav as any)[s]}</button>)}
            <button onClick={() => setLang(lang === 'en' ? 'lt' : 'en')} className="text-white border border-white/20 px-3 py-1 rounded text-[10px] font-bold uppercase">{lang.toUpperCase()}</button>
          </div>
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden text-white"><Menu/></button>
        </div>
      </nav>

      <MemoHero t={t} lang={lang} scrollToSection={scrollTo} />

      {/* FLEET SECTION */}
      <section id="fleet" className="py-24 px-4 border-t border-white/5 bg-[#050a14]">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-black mb-16 uppercase tracking-tight">{t.fleet.title}</h2>
          <div className="grid md:grid-cols-2 gap-10">
            <div className="bg-[#0a1628] p-10 rounded-3xl border border-white/5 text-left">
              <Truck className="text-blue-500 mb-6" size={40} /><h3 className="text-2xl font-black mb-4 uppercase">Standard Class</h3>
              <p className="text-gray-400 text-sm mb-6 uppercase tracking-widest font-bold">92 m³ Capacity • 33 Euro Pallets • 13.6m</p>
              <p className="text-gray-500 italic text-xs pt-6 border-t border-white/5">Reliable solutions for standard palletized goods across Europe.</p>
            </div>
            <div className="bg-[#0a1628] p-10 rounded-3xl border border-blue-500/20 text-left">
              <Maximize2 className="text-blue-500 mb-6" size={40} /><h3 className="text-2xl font-black mb-4 uppercase text-blue-500">Mega Advantage</h3>
              <p className="text-gray-400 text-sm mb-6 uppercase tracking-widest font-bold">105 m³ Capacity • 3.0m Internal Height</p>
              <p className="text-gray-500 italic text-xs pt-6 border-t border-white/5">Specialized high-volume trailers for maximum efficiency.</p>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="py-24 px-4 border-t border-white/5 bg-[#050a14] text-center">
        <h2 className="text-4xl font-black mb-16 uppercase">{t.services.title}</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {t.services.items.map((s: any, i: number) => {
            const Icon = serviceIcons[i] || Truck;
            return (
              <div key={i} className="p-8 bg-[#0a1628] rounded-2xl border border-white/5 hover:border-blue-500 transition-all">
                <Icon className="text-blue-500 mb-4 mx-auto" size={32} />
                <h4 className="font-black text-[10px] uppercase tracking-widest leading-tight text-white">{s.title}</h4>
              </div>
            )
          })}
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-24 px-4 border-t border-white/5 bg-[#050a14] text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-black mb-10 uppercase">{t.about.title}</h2>
          <p className="text-gray-400 text-lg leading-relaxed mb-12">ETERSIS is a reliable logistics partner since 2011. Modern fleet of 27 Euro 6 vehicles. License: <span className="text-white font-bold">LIC-009666-EBKR</span>.</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
             {['Own Fleet','CMR Insured','EU Network','24/7 Support','Secure','Expert Team','Full Docs','Trusted'].map((l, i) => (
               <div key={i} className="p-4 bg-[#0a1628] rounded-xl border border-white/5"><p className="font-black text-[10px] uppercase text-white">{l}</p></div>
             ))}
          </div>
        </div>
      </section>

      <section className="py-24 px-6 bg-[#050a14] border-t border-white/5 text-center uppercase"><h2 className="mb-10 text-4xl font-black">{t.coverage.title}</h2><MemoMap t={t} /></section>

      {/* --- FORM SECTION (ВОССТАНОВЛЕНА 1:1) --- */}
      <section id="contact" className="py-32 px-6 bg-[#050a14]" onFocus={() => { isFocusing.current = true }} onBlur={() => { isFocusing.current = false }}>
        <div className="max-w-4xl mx-auto">
          <div className="p-8 md:p-12 rounded-[32px] border border-[#1A2C45] shadow-2xl" style={{ background: '#0F1A2B' }}>
            <form onSubmit={handleSubmit} className="space-y-8" autoComplete="off">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-white">
                <div><label className="block text-[11px] font-black text-[#8899BB] uppercase tracking-widest mb-3">FROM (COUNTRY/CITY)</label><input name="from" required placeholder="Kaunas, Lithuania" className="w-full px-5 py-4 bg-[#0a1628] border border-white/5 rounded-xl px-5 py-4 outline-none focus:border-blue-500 transition-colors" /></div>
                <div><label className="block text-[11px] font-black text-[#8899BB] uppercase tracking-widest mb-3">TO (COUNTRY/CITY)</label><input name="to" required placeholder="Berlin, Germany" className="w-full px-5 py-4 bg-[#0a1628] border border-white/5 rounded-xl px-5 py-4 outline-none focus:border-blue-500 transition-colors" /></div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-white">
                <div><label className="block text-[11px] font-black text-gray-500 uppercase tracking-widest mb-3">CARGO TYPE</label><input name="cargoType" placeholder="Electronics, Pallets..." className="w-full bg-[#0a1628] border border-white/5 rounded-xl px-5 py-4 outline-none focus:border-blue-500 transition-colors" /></div>
                <div><label className="block text-[11px] font-black text-gray-500 uppercase tracking-widest mb-3">WEIGHT (KG)</label><input name="weight" placeholder="5000" className="w-full bg-[#0a1628] border border-white/5 rounded-xl px-5 py-4 outline-none focus:border-blue-500 transition-colors" /></div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-white">
                <div><label className="block text-[11px] font-black text-gray-500 uppercase tracking-widest mb-3">VOLUME (M³)</label><input name="volume" placeholder="10" className="w-full bg-[#0a1628] border border-white/5 rounded-xl px-5 py-4 outline-none focus:border-blue-500 transition-colors" /></div>
                <div><label className="block text-[11px] font-black text-gray-500 uppercase tracking-widest mb-3">NAME</label><input name="name" required placeholder="John Doe" className="w-full bg-[#0a1628] border border-white/5 rounded-xl px-5 py-4 outline-none focus:border-blue-500 transition-colors" /></div>
              </div>
              <div className="text-white"><label className="block text-[11px] font-black text-gray-500 uppercase tracking-widest mb-3">EMAIL</label><input name="email" type="email" required placeholder="john@company.com" className="w-full bg-[#0a1628] border border-white/5 rounded-xl px-5 py-4 outline-none focus:border-blue-500 transition-colors" /></div>
              <div className="text-white"><label className="block text-[11px] font-black text-gray-500 uppercase tracking-widest mb-3">PHONE</label><input name="phone" required placeholder="+370 123 45678" className="w-full bg-[#0a1628] border border-white/5 rounded-xl px-5 py-4 outline-none focus:border-blue-500 transition-colors" /></div>
              <button type="submit" disabled={isSubmitted} className="w-full py-6 bg-[#0052ff] hover:bg-[#003dd6] text-white font-black rounded-xl text-xs tracking-[0.3em] uppercase transition-all disabled:opacity-50">
                {isSubmitted ? 'SENT SUCCESS' : 'REQUEST QUOTE IN 24H'}
              </button>
            </form>
          </div>
        </div>
      </section>

      <footer className="py-20 bg-[#050a14] border-t border-white/5 text-center px-4">
        <p className="text-gray-600 text-[10px] font-bold uppercase tracking-widest leading-loose">
          Taikos pr. 141-305, Kaunas, Lithuania | info@tersis.lt<br />
          © 2026 TERSIS. All rights reserved.
        </p>
      </footer>
    </div>
  )
}

const rootElement = document.getElementById('root')!
ReactDOM.createRoot(rootElement).render(<App />)
