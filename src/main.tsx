import React, { useState, useEffect, useCallback, memo, useRef } from 'react'
import ReactDOM from 'react-dom/client'
import {
  Truck, ArrowRight, Check, Shield, Clock, Menu, X, Phone, Mail, MapPin, 
  Zap, Globe, Lock, AlertTriangle, Handshake, Users, FileText, Maximize2, Sun, Moon, Languages
} from 'lucide-react'

// --- ПОЛНЫЕ ДАННЫЕ (Восстановлено из 10-й версии) ---
const translations: any = {
  en: {
    nav: { services: 'SERVICES', fleet: 'FLEET', about: 'ABOUT', coverage: 'COVERAGE', contact: 'CONTACT' },
    hero: { title1: 'OWN FLEET.', title2: 'DIRECT IMPACT.', title3: 'EUROPEAN', title4: 'LOGISTICS.' },
    fleet: { title: 'FLEET SPECIFICATIONS', subtitle: 'Technical excellence for every shipment', std: 'STANDARD CLASS', mega: 'MEGA ADVANTAGE' },
    services: { title: 'OUR SERVICES', subtitle: 'INTEGRATED TRANSPORT & LOGISTICS SOLUTIONS' },
    about: { title: 'ABOUT TERSIS', subtitle: 'Your trusted European logistics partner since 2011' },
    contact: { from: 'FROM (COUNTRY/CITY)', to: 'TO (COUNTRY/CITY)', cargo: 'CARGO TYPE', weight: 'WEIGHT (KG)', volume: 'VOLUME (M³)', name: 'NAME', email: 'EMAIL', phone: 'PHONE', message: 'MESSAGE (OPTIONAL)' }
  }
};

// --- ИЗОЛЯЦИЯ ТЯЖЕЛЫХ БЛОКОВ ---
const HeroBlock = memo(({ scrollTo }: any) => (
  <section className="relative h-screen flex items-center px-4 sm:px-6 lg:px-8 overflow-hidden bg-dark">
    <div className="absolute inset-0 z-0 pointer-events-none">
      <video autoPlay muted loop playsInline className="w-full h-full object-cover opacity-40">
        <source src="/hero-video.mp4.mp4" type="video/mp4" />
      </video>
    </div>
    <div className="absolute inset-0 bg-black/60 z-10 pointer-events-none" />
    <div className="max-w-7xl mx-auto w-full relative z-20 grid md:grid-cols-2 gap-12 items-center">
      <div className="animate-fadeInUp">
        <div className="inline-block mb-6 px-4 py-2 bg-brand/10 border border-brand/20 rounded text-brand text-[10px] font-bold tracking-widest uppercase">EST. 2011 • TRUSTED EXPERIENCE</div>
        <h1 className="text-5xl md:text-8xl font-black text-white leading-[0.85] uppercase mb-8 tracking-tighter">
          OWN FLEET.<br/>DIRECT IMPACT.<br/><span className="text-brand">EUROPEAN</span><br/>LOGISTICS.
        </h1>
        <div className="flex gap-4">
          <button onClick={() => scrollTo('contact')} className="bg-brand text-white px-8 py-4 rounded font-bold text-xs uppercase tracking-widest hover:bg-blue-700 transition-all shadow-xl">GET QUOTE <ArrowRight size={16} className="inline ml-1"/></button>
          <button onClick={() => scrollTo('fleet')} className="border border-white/20 text-white px-8 py-4 rounded font-bold text-xs uppercase tracking-widest hover:bg-white/5 transition-all">FLEET DETAILS</button>
        </div>
      </div>
      <div className="hidden md:flex flex-col gap-6 items-end">
        <div className="bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-2xl w-64">
          <Truck className="text-brand mb-4" size={32}/><p className="text-4xl font-black text-white">27+</p><p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Own Vehicles</p>
        </div>
        <div className="bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-2xl w-64">
          <FileText className="text-brand mb-4" size={32}/><p className="text-xl font-black text-white uppercase">LIC-009666-EBKR</p><p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">EU Transport License</p>
        </div>
      </div>
    </div>
  </section>
));

const App = () => {
  const [isScrolled, setIsScrolled] = useState(false)
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

  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <div className="min-h-screen bg-dark text-white font-sans antialiased">
      <style>{`
        input:focus, textarea:focus { outline: 2px solid #0052ff !important; transition: none !important; }
        .form-card { background: #0F1A2B; border: 1px solid #1A2C45; contain: layout paint; isolation: isolate; }
        input, textarea { background: #0a1628; border: 1px solid #1A2C45; color: white; transition: border-color 0.1s; }
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; opacity: 1; transform: translateY(0); } }
        .animate-fadeInUp { animation: fadeInUp 0.8s ease-out forwards; }
      `}</style>

      {/* NAV */}
      <nav className={`fixed w-full z-50 p-6 transition-all ${isScrolled ? 'bg-dark/95 backdrop-blur-md border-b border-white/5 h-16' : 'h-20'} flex items-center`}>
        <div className="max-w-7xl mx-auto px-4 w-full flex justify-between items-center">
          <div className="flex items-center gap-2 cursor-pointer group" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
            <img src="/logo.png" className="h-10 transition-transform group-hover:scale-110" />
            <span className="text-2xl font-black tracking-tighter uppercase">TERSIS</span>
          </div>
          <div className="hidden md:flex gap-8 items-center text-[10px] font-bold uppercase tracking-widest text-gray-400">
            {['services', 'fleet', 'about', 'contact'].map(s => <button key={s} onClick={() => scrollTo(s)} className="hover:text-white transition-colors">{s}</button>)}
            <button onClick={() => scrollTo('contact')} className="bg-brand text-white px-5 py-2 rounded font-black">GET QUOTE</button>
          </div>
        </div>
      </nav>

      <HeroBlock scrollTo={scrollTo} />

      {/* FLEET */}
      <section id="fleet" className="py-32 px-8 bg-dark">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-5xl md:text-7xl font-black mb-4 uppercase tracking-tighter">{t.fleet.title}</h2>
          <p className="text-gray-500 font-bold uppercase tracking-widest mb-20">{t.fleet.subtitle}</p>
          <div className="grid md:grid-cols-2 gap-10 text-left">
            <div className="form-card p-10 rounded-[32px]">
              <Truck className="text-brand mb-8" size={40} /><h3 className="text-3xl font-black mb-4 uppercase">{t.fleet.std}</h3>
              <div className="space-y-6 mb-10">
                {[['LENGTH','13.6 m'],['HEIGHT','2.7 m'],['CAPACITY','33 Euro Pallets'],['GPS','Real-time tracking']].map(([l,v])=>(<div key={l} className="flex justify-between border-b border-white/5 pb-4 text-[10px] font-black uppercase tracking-widest"><span className="text-gray-500">{l}</span><span className="text-white">{v}</span></div>))}
              </div>
              <p className="text-gray-500 italic text-xs">{t.fleet.standardFooter}</p>
            </div>
            <div className="form-card p-10 rounded-[32px] border-brand/30">
              <Maximize2 className="text-brand mb-8" size={40} /><h3 className="text-3xl font-black mb-4 uppercase text-brand">{t.fleet.mega}</h3>
              <div className="space-y-6 mb-10">
                {[['INTERNAL HEIGHT','3.0 m'],['VOLUME','105 m³'],['ADVANTAGE','+14% Capacity'],['EURO 6','Compliant']].map(([l,v])=>(<div key={l} className="flex justify-between border-b border-white/5 pb-4 text-[10px] font-black uppercase tracking-widest"><span className="text-gray-500">{l}</span><span className="text-white">{v}</span></div>))}
              </div>
              <p className="text-gray-500 italic text-xs">{t.fleet.megaFooter}</p>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="py-32 px-8 bg-card border-y border-white/5 text-center">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl md:text-7xl font-black mb-20 uppercase tracking-tighter">{t.services.title}</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {t.services.items.map((s:any, i:number) => (
              <div key={i} className="p-8 rounded-[32px] border border-white/5 bg-dark hover:border-brand transition-all group">
                <Globe className="text-brand mb-6 mx-auto group-hover:scale-110 transition-transform" size={32} />
                <h4 className="font-black text-[10px] uppercase tracking-widest text-white">{s.title}</h4>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-32 px-8 bg-dark text-center">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-5xl md:text-7xl font-black mb-16 uppercase tracking-tighter">15+ YEARS EXP.</h2>
          <div className="text-gray-400 text-lg leading-relaxed space-y-8 mb-20">
            <p>TERSIS provides reliable, cost-effective transportation solutions across Europe and worldwide. We specialize in asset-based logistics, operating a modern fleet of 27 vehicles.</p>
            <p className="text-brand font-bold uppercase text-sm tracking-widest border border-brand/20 inline-block px-4 py-2 rounded">License: LIC-009666-EBKR</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-left">
            {['OWN FLEET','CMR INSURED','EU NETWORK','24/7 SUPPORT','SECURE','EXPERT TEAM','FULL DOCS','TRUSTED'].map((l, i) => (
              <div key={i} className="p-8 rounded-[32px] border border-white/5 bg-card"><p className="font-black text-[10px] uppercase text-white">{l}</p></div>
            ))}
          </div>
        </div>
      </section>

      {/* MAP */}
      <section id="coverage" className="py-32 px-8 bg-dark text-center border-t border-white/5">
        <h2 className="text-5xl font-black mb-16 uppercase tracking-tighter">GLOBAL COVERAGE</h2>
        <div className="relative h-[400px] md:h-[650px] rounded-[40px] overflow-hidden bg-black max-w-7xl mx-auto border border-brand/30 shadow-2xl">
          <img src="/map-hub.jpg.png" className="absolute inset-0 w-full h-full object-cover opacity-80 pointer-events-none" />
          <div className="absolute bottom-6 left-8 bg-black/40 backdrop-blur-md px-4 py-2 rounded-lg border border-white/10 text-left hidden md:block"><p className="text-[10px] font-black text-brand uppercase mb-1">Hub Status</p><p className="text-white text-xs font-bold uppercase">Operational</p></div>
        </div>
      </section>

      {/* CONTACT (ВОССТАНОВЛЕНА 1:1) */}
      <section id="contact" className="py-32 px-8 bg-dark" onFocus={() => { isFocusing.current = true }} onBlur={() => { isFocusing.current = false }}>
        <div className="max-w-4xl mx-auto">
          <div className="form-card p-8 md:p-16 rounded-[40px] shadow-2xl">
            <form onSubmit={handleSubmit} className="space-y-8" autoComplete="off">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-white text-left">
                <div className="space-y-2"><label className="text-[11px] font-black text-gray-500 uppercase">{t.contact.from}</label><input name="from" required placeholder="Kaunas, Lithuania" className="w-full px-6 py-4 rounded-xl text-sm outline-none focus:border-brand" /></div>
                <div className="space-y-2"><label className="text-[11px] font-black text-gray-500 uppercase">{t.contact.to}</label><input name="to" required placeholder="Berlin, Germany" className="w-full px-6 py-4 rounded-xl text-sm outline-none focus:border-brand" /></div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-white text-left">
                <div className="space-y-2"><label className="text-[11px] font-black text-gray-500 uppercase">{t.contact.cargo}</label><input name="cargo" placeholder="Electronics, Pallets..." className="w-full px-6 py-4 rounded-xl text-sm outline-none focus:border-brand" /></div>
                <div className="space-y-2"><label className="text-[11px] font-black text-gray-500 uppercase">{t.contact.weight}</label><input name="weight" placeholder="5000" className="w-full px-6 py-4 rounded-xl text-sm outline-none focus:border-brand" /></div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-white text-left">
                <div className="space-y-2"><label className="text-[11px] font-black text-gray-500 uppercase">{t.contact.volume}</label><input name="volume" placeholder="10" className="w-full px-6 py-4 rounded-xl text-sm outline-none focus:border-brand" /></div>
                <div className="space-y-2"><label className="text-[11px] font-black text-gray-500 uppercase">{t.contact.name}</label><input name="name" required placeholder="John Doe" className="w-full px-6 py-4 rounded-xl text-sm outline-none focus:border-brand" /></div>
              </div>
              <div className="text-white text-left space-y-2"><label className="text-[11px] font-black text-gray-500 uppercase">{t.contact.email}</label><input name="email" type="email" required placeholder="john@company.com" className="w-full px-6 py-4 rounded-xl text-sm outline-none focus:border-brand" /></div>
              <button type="submit" disabled={isSubmitted} className="w-full py-6 bg-brand hover:bg-blue-700 text-white font-black rounded-2xl text-xs tracking-[0.3em] uppercase transition-all shadow-xl shadow-brand/20 disabled:opacity-50">
                {isSubmitted ? 'SENT SUCCESS' : 'REQUEST QUOTE IN 24H'}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-24 bg-dark border-t border-white/5 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-16 text-left">
          <div className="space-y-8">
            <div className="flex items-center gap-2"><img src="/logo.png" className="h-8"/><span className="text-xl font-bold uppercase text-white tracking-tighter">TERSIS</span></div>
            <p className="text-gray-500 text-sm leading-relaxed max-w-xs font-medium">Asset-based carrier & international logistics provider since 2011.</p>
          </div>
          <div className="space-y-8">
            <h4 className="text-white font-black text-xs uppercase tracking-widest">Office HQ</h4>
            <div className="text-gray-500 text-sm space-y-3">
              <p className="flex items-start gap-3"><MapPin className="text-brand" size={16}/> Taikos pr. 141-305, Kaunas, Lithuania</p>
              <p className="flex items-start gap-3"><Mail className="text-brand" size={16}/> info@tersis.lt</p>
            </div>
          </div>
          <div className="space-y-8">
            <h4 className="text-white font-black text-xs uppercase tracking-widest">Legal</h4>
            <div className="text-gray-600 text-xs font-bold space-y-2 uppercase">
              <p>License: LIC-009666-EBKR</p>
              <p>100% CMR Insured</p>
              <p>© 2026 TERSIS. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

const rootElement = document.getElementById('root')!
ReactDOM.createRoot(rootElement).render(<App />)
