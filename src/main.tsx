import React, { useState, useEffect, useCallback, memo, useRef } from 'react'
import ReactDOM from 'react-dom/client'
import {
  Truck, ArrowRight, Check, Shield, Clock, Menu, X, Phone, Mail, MapPin, 
  Zap, Globe, Lock, AlertTriangle, Handshake, Users, FileText, Home, Maximize2, Sun, Moon, Languages
} from 'lucide-react'

// --- ПОЛНЫЕ ПЕРЕВОДЫ (Вставил прямо сюда, чтобы билд 100% прошел) ---
const translations = {
  en: {
    nav: { services: 'Services', fleet: 'Fleet', about: 'About', coverage: 'Coverage', contact: 'Contact', getQuote: 'Get Quote' },
    hero: { title1: 'OWN FLEET.', title2: 'DIRECT IMPACT.', title3: 'EUROPEAN', title4: 'LOGISTICS HUB', getQuote: 'Request Quote', fleetDetails: 'Fleet Details' },
    fleet: { 
      title: 'Fleet Specifications', subtitle: 'Modern Euro 6 fleet designed for efficiency',
      standardClass: 'Standard Class', megaAdvantage: 'Mega Advantage',
      length: 'Length', height: 'Height', internalHeight: 'Internal Height', volume: 'Volume',
      capacity: 'Capacity', euroPallets: 'Euro Pallets', idealFor: 'Ideal For',
      generalCargo: 'General Cargo', lightweightCargo: 'High-Volume Cargo',
      specialization: 'Specialization', advantage: 'Advantage',
      standardFooter: 'Reliable solutions for standard palletized goods across Europe.',
      megaFooter: 'Specialized 105m³ trailers providing maximum volume for lightweight cargo.',
      realTime: 'Real-time', tracking: 'GPS Tracking', modernFleet: 'Modern Fleet', euro6: 'Euro 6', compliant: 'Compliant', cmrInsured: 'CMR Insured', fullCoverage: '100% Coverage'
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
        { title: 'Expert Team', subtitle: '15+ Years Exp' }
      ]
    },
    about: { title: 'About Tersis' },
    coverage: { title: 'Global Coverage' },
    contact: { 
      title: 'Request a Quote', subtitle: 'Get a professional logistics offer within 24 hours',
      from: 'From (Country/City)', to: 'To (Country/City)', cargoType: 'Cargo Type',
      weight: 'Weight (kg)', volume: 'Volume (m³)', name: 'Name', email: 'Email',
      phone: 'Phone', message: 'Message (Optional)', submitted: 'SENT SUCCESSFULLY',
      placeholders: { from: 'Kaunas, Lithuania', to: 'Berlin, Germany', cargoType: 'Electronics, Pallets...', weight: '5000', volume: '10', name: 'John Doe', email: 'john@company.com', phone: '+370...', message: 'Additional details...' }
    }
  }
};

// --- ИЗОЛЯЦИЯ: ГЕРОЙ ---
const MemoHero = memo(({ scrollTo }: any) => (
  <section className="relative h-screen flex items-center px-8 overflow-hidden bg-[#050a14]">
    <div className="absolute inset-0 z-0 pointer-events-none">
      <video autoPlay muted loop playsInline className="w-full h-full object-cover opacity-40">
        <source src="/hero-video.mp4.mp4" type="video/mp4" />
      </video>
    </div>
    <div className="absolute inset-0 bg-black/50 z-10 pointer-events-none" />
    <div className="relative z-20 max-w-5xl animate-fadeInUp">
      <div className="inline-block mb-6 px-4 py-2 bg-blue-500/20 border border-blue-500/40 rounded-md text-blue-500 text-xs font-bold uppercase tracking-widest">
        Est. 2011 • Trusted European Carrier
      </div>
      <h1 className="text-6xl md:text-9xl font-black leading-[0.85] uppercase mb-8 tracking-tighter text-white">
        {translations.en.hero.title1}<br/>{translations.en.hero.title2}<br/>
        <span className="text-blue-600">{translations.en.hero.title3}</span>
      </h1>
      <button onClick={() => scrollTo('contact')} className="bg-blue-600 text-white px-10 py-5 rounded-xl font-black text-sm uppercase tracking-widest flex items-center gap-3 hover:bg-blue-700 transition-all shadow-2xl">
        GET QUOTE <ArrowRight size={20} />
      </button>
    </div>
  </section>
));

const App = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const isFocusing = useRef(false)
  const t = translations.en

  useEffect(() => {
    const handleScroll = () => {
      if (isFocusing.current) return
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
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
    <div className="min-h-screen bg-[#050a14] text-white font-sans antialiased">
      <style>{`
        input:focus, textarea:focus { outline: 2px solid #0052ff !important; transition: none !important; }
        .form-card { background: #0F1A2B; border: 1px solid #1A2C45; contain: layout paint; }
        input, textarea { background: #0a1628; border: 1px solid #1A2C45; color: white; }
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fadeInUp { animation: fadeInUp 0.8s ease-out forwards; }
      `}</style>

      {/* NAV */}
      <nav className={`fixed w-full z-50 p-6 transition-all ${isScrolled ? 'bg-[#050a14]/90 backdrop-blur-md border-b border-white/5' : ''}`}>
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo({top:0, behavior:'smooth'})}>
            <img src="/logo.png" className="h-10" />
            <span className="text-2xl font-black uppercase tracking-tighter">TERSIS</span>
          </div>
          <div className="hidden md:flex gap-8 text-[10px] font-bold uppercase tracking-widest text-gray-400">
            {['services', 'fleet', 'about', 'contact'].map(s => (
              <button key={s} onClick={() => scrollTo(s)} className="hover:text-white transition">{(t.nav as any)[s]}</button>
            ))}
          </div>
        </div>
      </nav>

      <MemoHero scrollTo={scrollTo} />

      {/* FLEET */}
      <section id="fleet" className="py-32 px-8 bg-[#050a14]">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-5xl font-black mb-20 uppercase tracking-tighter">{t.fleet.title}</h2>
          <div className="grid md:grid-cols-2 gap-10">
            <div className="form-card p-10 rounded-[32px] text-left">
              <Truck className="text-blue-600 mb-6" size={48} />
              <h3 className="text-3xl font-black mb-4 uppercase">{t.fleet.standardClass}</h3>
              <p className="text-gray-400 mb-8 uppercase text-xs font-bold tracking-widest">92 m³ • 33 Euro Pallets • 13.6m</p>
              <div className="space-y-4 border-t border-white/5 pt-6">{t.fleet.standardFooter}</div>
            </div>
            <div className="form-card p-10 rounded-[32px] border-blue-600/30 text-left">
              <Maximize2 className="text-blue-600 mb-6" size={48} />
              <h3 className="text-3xl font-black mb-4 uppercase">Mega Advantage</h3>
              <p className="text-gray-400 mb-8 uppercase text-xs font-bold tracking-widest">105 m³ • 3.0m Internal Height</p>
              <div className="space-y-4 border-t border-white/5 pt-6">{t.fleet.megaFooter}</div>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="py-32 px-8 bg-[#0a1628] border-y border-white/5">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-5xl font-black mb-20 uppercase">{t.services.title}</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {t.services.items.map((s, i) => (
              <div key={i} className="p-8 bg-[#050a14] rounded-2xl border border-white/5 hover:border-blue-600 transition-all group">
                <Globe className="text-blue-600 mb-4 mx-auto group-hover:scale-110 transition-transform" size={32} />
                <h4 className="font-black text-[10px] uppercase tracking-widest leading-tight">{s.title}</h4>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-32 px-8 bg-[#050a14] text-center">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-5xl font-black mb-12 uppercase">{translations.en.nav.about}</h2>
          <p className="text-gray-400 text-xl leading-relaxed mb-16">
            TERSIS is a reliable logistics partner since 2011. License: <span className="text-white font-bold">LIC-009666-EBKR</span>. Operating 27 Euro 6 vehicles with direct control.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: Truck, t: 'Own Fleet' }, { icon: Shield, t: 'CMR Insured' },
              { icon: Globe, t: 'EU Network' }, { icon: Clock, t: '24/7 Tracking' },
              { icon: Lock, t: 'Secure' }, { icon: Users, t: 'Expert Team' },
              { icon: FileText, t: 'Full Docs' }, { icon: Handshake, t: 'Trusted' }
            ].map((item, i) => (
              <div key={i} className="p-6 bg-[#0a1628] rounded-xl border border-white/5">
                <item.icon className="text-blue-600 mb-3 mx-auto" size={24} />
                <p className="font-black text-[10px] uppercase tracking-tighter">{item.t}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MAP */}
      <section id="coverage" className="py-32 px-8 border-t border-white/5">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-5xl font-black mb-16 uppercase">International Hub</h2>
          <div className="relative h-[400px] md:h-[650px] rounded-[40px] overflow-hidden border border-blue-600/30 bg-black shadow-2xl">
            <img src="/map-hub.jpg.png" className="absolute inset-0 w-full h-full object-cover opacity-80 pointer-events-none" />
          </div>
        </div>
      </section>

      {/* CONTACT (ТВОЙ ДИЗАЙН 1:1) */}
      <section id="contact" className="py-32 px-8 bg-[#050a14]">
        <div className="max-w-4xl mx-auto" onFocus={() => { isFocusing.current = true }} onBlur={() => { isFocusing.current = false }}>
          <div className="form-card p-8 md:p-12 rounded-[40px] shadow-2xl">
            <form onSubmit={handleSubmit} className="space-y-8" autoComplete="off">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">{t.contact.from}</label>
                  <input name="from" required placeholder={t.contact.placeholders.from} className="w-full px-6 py-4 rounded-xl text-sm outline-none focus:border-blue-600" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">{t.contact.to}</label>
                  <input name="to" required placeholder={t.contact.placeholders.to} className="w-full px-6 py-4 rounded-xl text-sm outline-none focus:border-blue-600" />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">{t.contact.cargoType}</label>
                  <input name="cargo" placeholder={t.contact.placeholders.cargoType} className="w-full px-6 py-4 rounded-xl text-sm outline-none focus:border-blue-600" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">{t.contact.weight}</label>
                  <input name="weight" placeholder={t.contact.placeholders.weight} className="w-full px-6 py-4 rounded-xl text-sm outline-none focus:border-blue-600" />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">{t.contact.volume}</label>
                  <input name="volume" placeholder={t.contact.placeholders.volume} className="w-full px-6 py-4 rounded-xl text-sm outline-none focus:border-blue-600" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">{t.contact.name}</label>
                  <input name="name" required placeholder={t.contact.placeholders.name} className="w-full px-6 py-4 rounded-xl text-sm outline-none focus:border-blue-600" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">{t.contact.email}</label>
                <input name="email" type="email" required placeholder={t.contact.placeholders.email} className="w-full px-6 py-4 rounded-xl text-sm outline-none focus:border-blue-600" />
              </div>
              <button 
                type="submit" 
                disabled={isSubmitted}
                className="w-full py-6 bg-blue-600 hover:bg-blue-700 text-white font-black rounded-2xl text-xs tracking-[0.3em] uppercase transition-all disabled:opacity-50"
              >
                {isSubmitted ? 'SUCCESSFULLY SENT' : 'Request Quote IN 24H'}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-20 bg-[#050a14] border-t border-white/5 text-center">
        <div className="flex flex-col items-center gap-6">
          <img src="/logo.png" className="h-10 opacity-50 grayscale" />
          <p className="text-gray-500 text-[10px] font-bold uppercase tracking-widest">Taikos pr. 141-305, Kaunas, Lithuania | info@tersis.lt</p>
          <p className="text-gray-700 text-[9px] uppercase tracking-widest">© 2026 TERSIS. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

const rootElement = document.getElementById('root')!
ReactDOM.createRoot(rootElement).render(<App />)
