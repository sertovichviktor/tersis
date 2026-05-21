import React, { useState, useEffect, useCallback, memo, useRef } from 'react'
import ReactDOM from 'react-dom/client'
import {
  Truck, ArrowRight, Check, Shield, Clock, Menu, X, Phone, Mail, MapPin, 
  Zap, Globe, Lock, AlertTriangle, Handshake, Users, FileText, Home, Maximize2, Sun, Moon, Languages
} from 'lucide-react'

// --- ПОЛНЫЕ ПЕРЕВОДЫ ИЗ ТВОЕЙ ВЕРСИИ №10 ---
const t = {
  nav: { services: 'Services', fleet: 'Fleet', about: 'About', coverage: 'Coverage', contact: 'Contact', getQuote: 'Get Quote' },
  hero: { title1: 'OWN FLEET.', title2: 'DIRECT IMPACT.', title3: 'EUROPEAN', title4: 'LOGISTICS HUB', getQuote: 'Get Quote', fleetDetails: 'Fleet Details' },
  fleet: { 
    title: 'Fleet Specifications', subtitle: 'Modern Euro 6 fleet designed for efficiency',
    standardClass: 'Standard Class', megaAdvantage: 'Mega Advantage',
    length: 'Length', height: 'Height', internalHeight: 'Internal Height', volume: 'Volume',
    capacity: 'Capacity', euroPallets: 'Euro Pallets', idealFor: 'Ideal For',
    generalCargo: 'General Cargo', lightweightCargo: 'High-Volume Cargo',
    specialization: 'Specialization', advantage: 'Advantage',
    standardFooter: 'Reliable solutions for standard palletized goods across Europe.',
    megaFooter: 'Specialized 105m³ trailers providing maximum volume for lightweight cargo.',
    realTime: 'Real-time', tracking: 'Tracking', modernFleet: 'Modern Fleet', euro6: 'Euro 6', compliant: 'Compliant', cmrInsured: 'CMR Insured', fullCoverage: 'Full Coverage'
  },
  services: {
    title: 'Our Services',
    items: [
      { title: 'FTL / LTL Transport', subtitle: 'Full & Partial loads' },
      { title: 'International Logistics', subtitle: 'Global Reach' },
      { title: 'Secure Storage', subtitle: 'Warehousing' },
      { title: 'Express Delivery', subtitle: 'Time Critical' },
      { title: 'Fast Customs', subtitle: 'Brokerage' },
      { title: 'Documentation', subtitle: 'Full compliance' },
      { title: 'Partnership Hub', subtitle: 'Network' },
      { title: 'Expert Team', subtitle: 'Professional handling' }
    ]
  },
  about: { title: 'About Tersis' },
  coverage: { title: 'Global Coverage' },
  contact: { 
    title: 'Request a Quote', subtitle: 'Get a professional offer within 24 hours',
    from: 'FROM (COUNTRY/CITY)', to: 'TO (COUNTRY/CITY)', cargoType: 'CARGO TYPE',
    weight: 'WEIGHT (KG)', volume: 'VOLUME (M³)', name: 'NAME', email: 'EMAIL',
    phone: 'PHONE', message: 'MESSAGE (OPTIONAL)', submitted: 'SENT SUCCESSFULLY',
    placeholders: { from: 'Kaunas, Lithuania', to: 'Berlin, Germany', cargoType: 'Electronics, Pallets, etc.', weight: '5000', volume: '10', name: 'John Doe', email: 'john@company.com', phone: '+370 123 45678', message: 'Additional details...' }
  }
};

// --- ИЗОЛЯЦИЯ ВИДЕО ---
const MemoHero = memo(({ scrollToSection }: any) => (
  <section className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 relative min-h-[90vh] md:h-screen flex items-center overflow-hidden bg-[#050a14]">
    <video autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover z-0 opacity-40 pointer-events-none"><source src="/hero-video.mp4.mp4" type="video/mp4" /></video>
    <div className="absolute inset-0 bg-black/60 z-10 pointer-events-none" />
    <div className="max-w-7xl mx-auto w-full relative z-20">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div className="animate-fadeInUp text-left">
          <div className="inline-block mb-6 px-4 py-2 bg-[#0052ff]/20 border border-[#0052ff]/40 rounded-md"><p className="text-[#0052ff] text-sm font-bold uppercase tracking-wider">EST. 2011 • Trusted Experience</p></div>
          <h1 className="text-4xl md:text-7xl font-black text-white mb-6 leading-none uppercase">{t.hero.title1}<br />{t.hero.title2}<br /><span className="text-[#0052ff]">{t.hero.title3}</span><br />{t.hero.title4}</h1>
          <div className="flex flex-wrap gap-4">
            <button onClick={() => scrollToSection('contact')} className="bg-[#0052ff] text-white px-8 py-4 rounded-md font-bold hover:bg-[#003dd6] transition flex items-center gap-2 uppercase shadow-lg shadow-blue-500/20">{t.hero.getQuote} <ArrowRight className="h-4 w-4" /></button>
            <button onClick={() => scrollToSection('fleet')} className="border-2 border-white/20 text-white hover:bg-white/10 px-8 py-4 rounded-md font-bold transition uppercase">{t.hero.fleetDetails}</button>
          </div>
        </div>
        <div className="flex flex-col gap-6 items-start md:items-end">
          <div className="bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-xl w-full max-w-[340px]">
            <Truck className="h-10 w-10 text-[#0052ff] mb-4" /><p className="text-5xl font-black text-white mb-1">27+</p><p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Own Vehicles</p>
          </div>
          <div className="bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-xl w-full max-w-[340px]">
            <FileText className="h-8 w-8 text-[#0052ff] mb-4" /><p className="text-xl font-black text-white mb-1 uppercase">LIC-009666-EBKR</p><p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">EU Transport License</p>
          </div>
        </div>
      </div>
    </div>
  </section>
))

// --- ИЗОЛЯЦИЯ КАРТЫ ---
const MemoMap = memo(() => (
  <div className="relative h-[400px] md:h-[650px] rounded-[30px] overflow-hidden border border-[#0052ff]/30 shadow-2xl bg-black">
    <img src="/map-hub.jpg.png" className="absolute inset-0 w-full h-full object-cover opacity-90 pointer-events-none" />
    <svg className="absolute inset-0 w-full h-full z-10 pointer-events-none" viewBox="0 0 1000 600" preserveAspectRatio="xMidYMid slice">
      <g fill="none" strokeWidth="2" strokeLinecap="round">
        <path d="M 150,230 Q 300,100 485,205" stroke="rgba(0,82,255,0.5)" strokeDasharray="1, 50"><animate attributeName="stroke-dashoffset" from="300" to="0" dur="3s" repeatCount="indefinite" /></path>
        <path d="M 850,380 Q 650,250 485,205" stroke="rgba(0,82,255,0.5)" strokeDasharray="1, 50"><animate attributeName="stroke-dashoffset" from="300" to="0" dur="2.8s" repeatCount="indefinite" /></path>
      </g>
    </svg>
  </div>
))

const App = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const isFocusing = useRef(false)

  useEffect(() => {
    const handleScroll = () => { if (!isFocusing.current) setIsScrolled(window.scrollY > 50) }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleSubmit = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    setIsSubmitted(true);
    fetch('/send.php', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) })
      .finally(() => { form.reset(); setTimeout(() => setIsSubmitted(false), 3000); });
  }, []);

  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <div className="min-h-screen bg-[#050a14] text-white font-sans antialiased overflow-x-hidden">
      <style>{`
        input:focus, textarea:focus { outline: 2px solid #0052ff !important; transition: none !important; }
        .form-card { background: #0F1A2B; border: 1px solid #1A2C45; contain: layout paint; isolation: isolate; }
        input, textarea { background: #0a1628; border: 1px solid #1A2C45; color: white; transition: border-color 0.1s; }
      `}</style>

      {/* NAV */}
      <nav className={`fixed w-full z-50 transition-all ${isScrolled ? 'bg-[#050a14]/95 backdrop-blur-md border-b border-white/5 h-16' : 'h-20'} flex items-center`}>
        <div className="max-w-7xl mx-auto px-6 w-full flex justify-between items-center">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
            <img src="/logo.png" className="h-10" /><span className="text-2xl font-black uppercase tracking-tighter">TERSIS</span>
          </div>
          <div className="hidden md:flex gap-8 items-center text-[10px] font-bold uppercase tracking-widest text-gray-400">
            {['services', 'fleet', 'about', 'contact'].map(s => <button key={s} onClick={() => scrollTo(s)} className="hover:text-white transition">{(t.nav as any)[s]}</button>)}
            <button onClick={() => scrollTo('contact')} className="bg-[#0052ff] text-white px-5 py-2 rounded font-bold">{t.nav.getQuote}</button>
          </div>
        </div>
      </nav>

      <MemoHero scrollToSection={scrollTo} />

      {/* FLEET */}
      <section id="fleet" className="py-24 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-black mb-16 uppercase tracking-tight">{t.fleet.title}</h2>
          <div className="grid md:grid-cols-2 gap-10">
            <div className="bg-[#0a1628] p-10 rounded-3xl border border-white/5 flex flex-col text-left">
              <Truck className="text-[#0052ff] mb-6" size={40} /><h3 className="text-2xl font-black mb-4 uppercase">{t.fleet.standardClass}</h3>
              <p className="text-gray-400 text-sm mb-6 uppercase font-bold tracking-widest">92 m³ Capacity • 33 Euro Pallets</p>
              <p className="text-gray-500 italic text-xs pt-4 border-t border-white/5">{t.fleet.standardFooter}</p>
            </div>
            <div className="bg-[#0a1628] p-10 rounded-3xl border border-[#0052ff]/30 flex flex-col text-left">
              <Maximize2 className="text-[#0052ff] mb-6" size={40} /><h3 className="text-2xl font-black mb-4 uppercase text-[#0052ff]">{t.fleet.megaAdvantage}</h3>
              <p className="text-gray-400 text-sm mb-6 uppercase font-bold tracking-widest">105 m³ Capacity • 3.0m Height</p>
              <p className="text-gray-500 italic text-xs pt-4 border-t border-white/5">{t.fleet.megaFooter}</p>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10">
            {[{i:Shield,t:t.fleet.cmrInsured},{i:Clock,t:t.fleet.realTime},{i:Truck,t:t.fleet.modernFleet},{i:Check,t:t.fleet.euro6}].map((x,i)=>(<div key={i} className="p-4 border border-white/5 bg-[#0a1628] rounded-xl"><x.i className="text-blue-500 mx-auto mb-2" size={24}/><p className="text-[10px] font-black uppercase">{x.t}</p></div>))}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="py-24 px-6 border-t border-white/5 text-center">
        <h2 className="text-4xl font-black mb-16 uppercase">{t.services.title}</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {t.services.items.map((s, i) => (
            <div key={i} className="p-8 bg-[#0a1628] rounded-2xl border border-white/5 hover:border-blue-500 transition-all">
              <Globe className="text-blue-500 mb-4 mx-auto" size={32} /><h4 className="font-black text-[10px] uppercase tracking-widest">{s.title}</h4>
            </div>
          ))}
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-24 px-6 border-t border-white/5 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-black mb-8 uppercase">15+ Years Experience</h2>
          <p className="text-gray-400 text-lg leading-relaxed mb-12">TERSIS is a reliable logistics partner since 2011. Modern fleet of 27 Euro 6 vehicles. Licensed carrier: <span className="text-white font-bold">LIC-009666-EBKR</span>.</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
             {['Own Fleet','CMR Insured','EU Network','24/7 Tracking','Secure','Expert Team','Documents','Safe'].map((l, i) => (
               <div key={i} className="p-4 bg-[#0a1628] rounded-xl border border-white/5"><p className="font-black text-[10px] uppercase">{l}</p></div>
             ))}
          </div>
        </div>
      </section>

      {/* COVERAGE */}
      <section id="coverage" className="py-24 px-6 border-t border-white/5 text-center uppercase">
        <h2 className="mb-10 text-4xl font-black">{t.coverage.title}</h2>
        <MemoMap />
      </section>

      {/* --- FORM (ВОССТАНОВЛЕНА 1:1 ПО СКРИНШОТУ) --- */}
      <section id="contact" className="py-32 px-6 bg-[#050a14]">
        <div className="max-w-4xl mx-auto" onFocus={() => { isFocusing.current = true }} onBlur={() => { isFocusing.current = false }}>
          <div className="form-card p-8 md:p-12 rounded-[40px] shadow-2xl">
            <form onSubmit={handleSubmit} className="space-y-6" autoComplete="off">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-white">
                <div className="space-y-2"><label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">{t.contact.from}</label><input name="from" required placeholder={t.contact.placeholders.from} className="w-full px-6 py-4 rounded-xl text-sm outline-none focus:border-blue-500" /></div>
                <div className="space-y-2"><label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">{t.contact.to}</label><input name="to" required placeholder={t.contact.placeholders.to} className="w-full px-6 py-4 rounded-xl text-sm outline-none focus:border-blue-500" /></div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-white">
                <div className="space-y-2"><label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">{t.contact.cargoType}</label><input name="cargoType" placeholder={t.contact.placeholders.cargoType} className="w-full px-6 py-4 rounded-xl text-sm outline-none focus:border-blue-500" /></div>
                <div className="space-y-2"><label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">{t.contact.weight}</label><input name="weight" placeholder={t.contact.placeholders.weight} className="w-full px-6 py-4 rounded-xl text-sm outline-none focus:border-blue-500" /></div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-white">
                <div className="space-y-2"><label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">{t.contact.volume}</label><input name="volume" placeholder={t.contact.placeholders.volume} className="w-full px-6 py-4 rounded-xl text-sm outline-none focus:border-blue-500" /></div>
                <div className="space-y-2"><label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">{t.contact.name}</label><input name="name" required placeholder={t.contact.placeholders.name} className="w-full px-6 py-4 rounded-xl text-sm outline-none focus:border-blue-500" /></div>
              </div>
              <div className="space-y-2 text-white"><label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">{t.contact.email}</label><input name="email" type="email" required placeholder={t.contact.placeholders.email} className="w-full px-6 py-4 rounded-xl text-sm outline-none focus:border-blue-500" /></div>
              <div className="space-y-2 text-white"><label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">{t.contact.phone}</label><input name="phone" required placeholder={t.contact.placeholders.phone} className="w-full px-6 py-4 rounded-xl text-sm outline-none focus:border-blue-500" /></div>
              <div className="space-y-2 text-white"><label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">{t.contact.message}</label><textarea name="message" rows={4} placeholder={t.contact.placeholders.message} className="w-full px-6 py-4 rounded-xl text-sm outline-none focus:border-blue-500 resize-none" /></div>
              <button type="submit" disabled={isSubmitted} className="w-full py-6 bg-blue-600 hover:bg-blue-700 text-white font-black rounded-2xl text-xs tracking-[0.3em] uppercase transition-all disabled:opacity-50">
                {isSubmitted ? 'SENT SUCCESS' : 'REQUEST QUOTE IN 24H'}
              </button>
            </form>
          </div>
        </div>
      </section>

      <footer className="py-20 bg-[#050a14] border-t border-white/5 text-center px-4 text-gray-600 text-[10px] font-bold uppercase tracking-widest leading-loose">
        <div className="max-w-7xl mx-auto flex flex-col items-center gap-6 mb-8">
           <img src="/logo.png" className="h-10 opacity-50 grayscale" />
           <p>Taikos pr. 141-305, Kaunas, Lithuania | info@tersis.lt | © 2026 TERSIS</p>
        </div>
      </footer>
    </div>
  )
}

const rootElement = document.getElementById('root')!
ReactDOM.createRoot(rootElement).render(<App />)
