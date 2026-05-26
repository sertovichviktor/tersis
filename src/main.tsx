import React, { useState, useEffect, useCallback, memo, useRef } from 'react'
import ReactDOM from 'react-dom/client'
import {
  Truck, ArrowRight, Check, Shield, Clock, Menu, X, Phone, Mail, MapPin, 
  Zap, Globe, Lock, AlertTriangle, Handshake, Users, FileText, Maximize2, Sun, Moon, Languages
} from 'lucide-react'

// --- ДАННЫЕ (Восстановлено из версии №10) ---
const translations = {
  en: {
    nav: { services: 'SERVICES', fleet: 'FLEET', about: 'ABOUT', coverage: 'COVERAGE', contact: 'CONTACT', getQuote: 'GET QUOTE' },
    hero: { title1: 'OWN FLEET.', title2: 'DIRECT IMPACT.', title3: 'EUROPEAN', title4: 'LOGISTICS.', desc: 'We operate a fleet of 27+ modern Euro 6 vehicles, specializing in high-capacity MEGA trailers (105 m³) and delivering reliable standard transport solutions worldwide.' },
    fleet: { title: 'FLEET SPECIFICATIONS', subtitle: 'Technical excellence for every shipment', std: 'STANDARD CLASS', mega: 'MEGA ADVANTAGE' },
    services: { title: 'OUR SERVICES', subtitle: 'INTEGRATED TRANSPORT & LOGISTICS SOLUTIONS' },
    contact: { title: 'REQUEST A QUOTE', subtitle: 'Get a professional offer within 24 hours' }
  }
}

// --- ИЗОЛЯЦИЯ: ВИДЕО-ГЕРОЙ ---
const MemoHero = memo(({ scrollTo }: any) => (
  <section className="relative h-screen flex items-center px-6 overflow-hidden bg-[#050a14]">
    <div className="absolute inset-0 z-0 pointer-events-none">
      <video autoPlay muted loop playsInline preload="auto" className="w-full h-full object-cover opacity-60">
        <source src="/hero-video.mp4.mp4" type="video/mp4" />
      </video>
    </div>
    <div className="absolute inset-0 bg-black/40 z-10 pointer-events-none" />
    <div className="max-w-7xl mx-auto w-full relative z-20 grid md:grid-cols-2 gap-12 items-center">
      <div className="animate-fadeInUp">
        <div className="inline-block mb-6 px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded text-blue-500 text-[10px] font-bold tracking-widest uppercase">EST. 2011 • TRUSTED EXPERIENCE</div>
        <h1 className="text-5xl md:text-8xl font-black text-white leading-[0.85] uppercase mb-8 tracking-tighter">
          OWN FLEET.<br/>DIRECT IMPACT.<br/><span className="text-blue-600">EUROPEAN</span><br/>LOGISTICS.
        </h1>
        <p className="text-gray-300 text-base md:text-lg mb-10 max-w-lg leading-relaxed">We operate a fleet of 27+ modern Euro 6 vehicles, specializing in high-capacity MEGA trailers (105 m³) and delivering reliable standard transport solutions worldwide.</p>
        <div className="flex gap-4">
          <button onClick={() => scrollTo('contact')} className="bg-blue-600 text-white px-8 py-4 rounded-lg font-bold text-xs uppercase tracking-widest flex items-center gap-2 hover:bg-blue-700 transition-all shadow-xl">GET QUOTE <ArrowRight size={16}/></button>
          <button onClick={() => scrollTo('fleet')} className="border border-white/20 text-white px-8 py-4 rounded-lg font-bold text-xs uppercase tracking-widest hover:bg-white/5 transition-all">FLEET DETAILS</button>
        </div>
      </div>
      <div className="hidden md:flex flex-col gap-6 items-end">
        <div className="bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-2xl w-64">
          <Truck className="text-blue-500 mb-4" size={32}/><p className="text-4xl font-black text-white">27+</p><p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Own Vehicles</p>
        </div>
        <div className="bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-2xl w-64">
          <FileText className="text-blue-500 mb-4" size={32}/><p className="text-xl font-black text-white uppercase tracking-tighter">LIC-009666-EBKR</p><p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">EU Transport License</p>
        </div>
      </div>
    </div>
  </section>
))

// --- ИЗОЛЯЦИЯ: КАРТА ---
const MemoMap = memo(() => (
  <div className="relative h-[400px] md:h-[650px] rounded-[30px] md:rounded-[40px] overflow-hidden border border-[#0052ff]/30 shadow-2xl bg-black">
    <img src="/map-hub.jpg.png" className="absolute inset-0 w-full h-full object-cover opacity-90 pointer-events-none" />
    <svg className="absolute inset-0 w-full h-full z-10 pointer-events-none" viewBox="0 0 1000 600" preserveAspectRatio="xMidYMid slice">
      <path d="M 150,230 Q 300,100 485,205" stroke="rgba(0,82,255,0.5)" strokeWidth="2" fill="none" strokeDasharray="1, 50"><animate attributeName="stroke-dashoffset" from="300" to="0" dur="3s" repeatCount="indefinite" /></path>
      <path d="M 850,380 Q 650,250 485,205" stroke="rgba(0,82,255,0.5)" strokeWidth="2" fill="none" strokeDasharray="1, 50"><animate attributeName="stroke-dashoffset" from="300" to="0" dur="3.5s" repeatCount="indefinite" /></path>
    </svg>
    <div className="absolute bottom-6 left-8 bg-black/40 backdrop-blur-md px-4 py-2 rounded-lg border border-white/10 text-left hidden md:block"><p className="text-[10px] font-black text-[#0052ff] uppercase mb-1">Hub Status</p><p className="text-white text-xs font-bold uppercase tracking-widest">Operational / 24-7</p></div>
    <div className="absolute bottom-6 right-8 bg-black/40 backdrop-blur-md px-4 py-2 rounded-lg border border-white/10 text-right hidden md:block"><p className="text-[10px] font-black text-[#0052ff] uppercase mb-1">Global Traffic</p><p className="text-white text-xs font-bold uppercase tracking-widest">Connected Worldwide</p></div>
  </div>
))

const App = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const isFocusing = useRef(false)
  const t = translations.en

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
      (e.target as HTMLFormElement).reset();
      setTimeout(() => setIsSubmitted(false), 4000);
    } catch (e) { setIsSubmitted(false); }
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
    setIsMenuOpen(false)
  }

  return (
    <div className="min-h-screen bg-[#050a14] text-white font-sans antialiased overflow-x-hidden">
      
      {/* NAVIGATION */}
      <nav className={`fixed w-full z-50 transition-all ${isScrolled ? 'bg-[#050a14]/95 backdrop-blur-md border-b border-white/5 h-16' : 'h-20'} flex items-center`}>
        <div className="max-w-7xl mx-auto px-6 w-full flex justify-between items-center">
          <div className="flex items-center gap-2 cursor-pointer group" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
            <img src="https://tersis.lt/logo.png" className="h-10 transition-transform group-hover:scale-110" />
            <span className="text-2xl font-black tracking-tighter uppercase">TERSIS</span>
          </div>
          <div className="hidden md:flex gap-8 items-center text-[10px] font-bold uppercase tracking-widest text-gray-400">
            {['services','fleet','about','contact'].map(s => <button key={s} onClick={() => scrollTo(s)} className="hover:text-white transition-colors">{(t.nav as any)[s]}</button>)}
            <button className="bg-blue-600 text-white px-5 py-2 rounded font-black ml-4" onClick={() => scrollTo('contact')}>GET QUOTE</button>
          </div>
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden text-white"><Menu/></button>
        </div>
      </nav>

      {/* MOBILE MENU */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-[100] bg-[#050a14] flex flex-col p-8 animate-fadeInUp">
          <div className="flex justify-end mb-12"><button onClick={() => setIsMenuOpen(false)}><X size={32}/></button></div>
          {['services','fleet','about','contact'].map(s => <button key={s} onClick={() => scrollTo(s)} className="text-4xl font-black uppercase mb-8 text-left">{(t.nav as any)[s]}</button>)}
        </div>
      )}

      <MemoHero scrollToSection={scrollTo} />

      {/* FLEET */}
      <section id="fleet" className="py-24 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-5xl md:text-7xl font-black mb-4 uppercase tracking-tighter">{t.fleet.title}</h2>
          <p className="text-gray-500 font-bold uppercase tracking-widest mb-20">{t.fleet.subtitle}</p>
          <div className="grid md:grid-cols-2 gap-10 text-left">
            <div className="p-10 rounded-[40px] border border-white/5 bg-[#0a1628]">
              <Truck className="text-blue-600 mb-8" size={40} /><h3 className="text-3xl font-black mb-4 uppercase">{t.fleet.std}</h3>
              <div className="space-y-6 mb-10">
                {[['LENGTH','13.6 m'],['HEIGHT','2.7 m'],['CAPACITY','33 Euro Pallets'],['IDEAL FOR','General Cargo']].map(([l,v])=>(<div key={l} className="flex justify-between border-b border-white/5 pb-4 text-[10px] font-black uppercase tracking-widest"><span className="text-gray-500">{l}</span><span className="text-white">{v}</span></div>))}
              </div>
            </div>
            <div className="p-10 rounded-[40px] border border-blue-600/30 bg-[#0a1628]">
              <Maximize2 className="text-blue-600 mb-8" size={40} /><h3 className="text-3xl font-black mb-4 uppercase text-blue-600">{t.fleet.mega}</h3>
              <div className="space-y-6 mb-10">
                {[['INTERNAL HEIGHT','3.0 m'],['VOLUME','105 m³'],['SPECIALIZATION','Lightweight Cargo'],['ADVANTAGE','+14% Capacity']].map(([l,v])=>(<div key={l} className="flex justify-between border-b border-white/5 pb-4 text-[10px] font-black uppercase tracking-widest"><span className="text-gray-500">{l}</span><span className="text-white">{v}</span></div>))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="py-24 px-6 bg-[#0a1628] border-y border-white/5 text-center">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl md:text-7xl font-black mb-4 uppercase tracking-tighter">{t.services.title}</h2>
          <p className="text-blue-500 font-black uppercase tracking-[0.3em] text-sm mb-20">{t.services.subtitle}</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              {icon: Truck, t: 'FTL / LTL TRANSPORT', s: 'FULL & PARTIAL LOADS'},
              {icon: Globe, t: 'MULTIMODAL', s: 'SEA & AIR'},
              {icon: AlertTriangle, t: 'OVERSIZED & ADR', s: 'SPECIAL CARGO'},
              {icon: Zap, t: 'GROUPAGE', s: 'CONSOLIDATION'},
              {icon: Clock, t: 'EXPRESS DELIVERY', s: 'URGENT FREIGHT'},
              {icon: Home, t: 'WAREHOUSING', s: '3PL SOLUTIONS'},
              {icon: FileText, t: 'CUSTOMS CLEARANCE', s: 'FULL CLEARANCE'},
              {icon: Shield, t: 'CARGO INSURANCE', s: 'CMR COVERAGE'}
            ].map((s, i) => (
              <div key={i} className="p-8 rounded-[32px] border border-white/5 bg-[#050a14] hover:border-blue-600 transition-all group">
                <s.icon className="text-blue-600 mb-6 mx-auto group-hover:scale-110 transition-transform" size={32} />
                <h4 className="font-black text-[10px] uppercase tracking-widest text-white mb-2">{s.t}</h4>
                <p className="text-gray-600 text-[9px] font-bold uppercase tracking-widest">{s.s}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-24 px-6 bg-[#050a14] text-center">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-5xl md:text-7xl font-black mb-16 uppercase tracking-tighter">15+ Years Experience</h2>
          <div className="text-gray-400 text-lg leading-relaxed space-y-8 mb-20">
            <p>TERSIS provides reliable, cost-effective transportation solutions across Europe and worldwide. We specialize in asset-based logistics, operating a modern fleet of 27 vehicles.</p>
            <p className="text-white font-bold uppercase text-sm border border-white/10 inline-block px-4 py-2 rounded tracking-widest">License: LIC-009666-EBKR</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
             {['Own Fleet','CMR Insured','EU Network','24/7 Support','Secure','Expert Team','Full Docs','Trusted'].map((l, i) => (
               <div key={i} className="p-4 bg-[#0a1628] rounded-xl border border-white/5"><p className="font-black text-[10px] uppercase text-white">{l}</p></div>
             ))}
          </div>
        </div>
      </section>

      <section className="py-24 px-6"><MemoMap /></section>

      {/* --- CONTACT FORM (1:1 ВОССТАНОВЛЕНА ИЗ СКРИНШОТА) --- */}
      <section id="contact" className="py-32 px-4 bg-[#050a14]" onFocus={() => { isFocusing.current = true }} onBlur={() => { isFocusing.current = false }}>
        <div className="max-w-4xl mx-auto">
          <div className="p-8 md:p-16 rounded-[40px] shadow-2xl border border-[#1A2C45]" style={{ background: '#0F1A2B' }}>
            <form onSubmit={handleSubmit} className="space-y-8" autoComplete="off">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-white">
                <div><label className="block text-[11px] font-black text-gray-500 uppercase tracking-widest mb-3">FROM (COUNTRY/CITY)</label><input name="from" required placeholder="Kaunas, Lithuania" className="w-full px-6 py-4 bg-[#0a1628] rounded-xl border border-white/5 outline-none focus:border-blue-600 transition-colors" /></div>
                <div><label className="block text-[11px] font-black text-gray-500 uppercase tracking-widest mb-3">TO (COUNTRY/CITY)</label><input name="to" required placeholder="Berlin, Germany" className="w-full px-6 py-4 bg-[#0a1628] rounded-xl border border-white/5 outline-none focus:border-blue-600 transition-colors" /></div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-white">
                <div><label className="block text-[11px] font-black text-gray-500 uppercase tracking-widest mb-3">CARGO TYPE</label><input name="cargoType" placeholder="Electronics, Pallets..." className="w-full px-6 py-4 bg-[#0a1628] rounded-xl border border-white/5 outline-none focus:border-blue-600 transition-colors" /></div>
                <div><label className="block text-[11px] font-black text-gray-500 uppercase tracking-widest mb-3">WEIGHT (KG)</label><input name="weight" placeholder="5000" className="w-full px-6 py-4 bg-[#0a1628] rounded-xl border border-white/5 outline-none focus:border-blue-600 transition-colors" /></div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-white">
                <div><label className="block text-[11px] font-black text-gray-500 uppercase tracking-widest mb-3">VOLUME (M³)</label><input name="volume" placeholder="10" className="w-full px-6 py-4 bg-[#0a1628] rounded-xl border border-white/5 outline-none focus:border-blue-600 transition-colors" /></div>
                <div><label className="block text-[11px] font-black text-gray-500 uppercase tracking-widest mb-3">NAME</label><input name="name" required placeholder="John Doe" className="w-full px-6 py-4 bg-[#0a1628] rounded-xl border border-white/5 outline-none focus:border-blue-600 transition-colors" /></div>
              </div>
              <div className="text-white"><label className="block text-[11px] font-black text-gray-500 uppercase tracking-widest mb-3">EMAIL</label><input name="email" type="email" required placeholder="john@company.com" className="w-full px-6 py-4 bg-[#0a1628] rounded-xl border border-white/5 outline-none focus:border-blue-600 transition-colors" /></div>
              <div className="text-white"><label className="block text-[11px] font-black text-gray-500 uppercase tracking-widest mb-3">PHONE</label><input name="phone" required placeholder="+370 123 45678" className="w-full px-6 py-4 bg-[#0a1628] rounded-xl border border-white/5 outline-none focus:border-blue-600 transition-colors" /></div>
              <div className="text-white"><label className="block text-[11px] font-black text-gray-500 uppercase tracking-widest mb-3">MESSAGE (OPTIONAL)</label><textarea name="message" rows={4} placeholder="Additional details..." className="w-full px-6 py-4 bg-[#0a1628] rounded-xl border border-white/5 outline-none focus:border-blue-600 transition-colors resize-none" /></div>
              <button type="submit" disabled={isSubmitted} className="w-full py-6 bg-[#0052ff] hover:bg-[#003dd6] text-white font-black rounded-2xl text-xs tracking-[0.3em] uppercase transition-all shadow-xl shadow-blue-600/20 disabled:opacity-50">
                {isSubmitted ? 'SENT SUCCESS' : 'REQUEST QUOTE IN 24H'}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-24 bg-[#050a14] border-t border-white/5 text-center px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-16 text-left mb-16">
          <div><div className="flex items-center gap-2 mb-6"><img src="https://tersis.lt/logo.png" className="h-8"/><span className="text-xl font-bold uppercase tracking-tighter">TERSIS</span></div><p className="text-gray-500 text-sm">Asset-based carrier & logistics provider since 2011.</p></div>
          <div><h4 className="text-white font-black text-xs uppercase tracking-widest mb-6">Office HQ</h4><p className="text-gray-500 text-sm">Taikos pr. 141-305, Kaunas, Lithuania<br/>info@tersis.lt | +370 65 955 956</p></div>
          <div><h4 className="text-white font-black text-xs uppercase tracking-widest mb-6">Legal</h4><p className="text-gray-600 text-xs font-bold uppercase">License: LIC-009666-EBKR<br/>100% CMR Insured</p></div>
        </div>
        <p className="text-gray-700 text-[10px] font-bold uppercase tracking-[0.3em] pt-8 border-t border-white/5">© 2026 TERSIS. ALL RIGHTS RESERVED.</p>
      </footer>
    </div>
  )
}

const rootElement = document.getElementById('root')!
ReactDOM.createRoot(rootElement).render(<App />)
