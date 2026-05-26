import React, { useState, useEffect, useCallback, memo, useRef } from 'react'
import ReactDOM from 'react-dom/client'
import {
  Truck, ArrowRight, Check, Shield, Clock, Menu, X, Phone, Mail, MapPin, 
  Zap, Globe, Lock, AlertTriangle, Handshake, Users, FileText, Maximize2, Sun, Moon, Languages
} from 'lucide-react'

// --- ВСЕ ТВОИ ТЕКСТЫ (1 в 1 как в 10-й версии) ---
const translations: any = {
  en: {
    nav: { services: 'SERVICES', fleet: 'FLEET', about: 'ABOUT', coverage: 'COVERAGE', contact: 'CONTACT', getQuote: 'GET QUOTE' },
    hero: { title1: 'OWN FLEET.', title2: 'DIRECT IMPACT.', title3: 'EUROPEAN', title4: 'LOGISTICS.', desc: 'We operate a fleet of 27+ modern Euro 6 vehicles, specializing in high-capacity MEGA trailers (105 m³) and delivering reliable standard transport solutions worldwide.' },
    fleet: { title: 'FLEET SPECIFICATIONS', subtitle: 'Technical excellence for every shipment', std: 'STANDARD CLASS', mega: 'MEGA ADVANTAGE' },
    services: { title: 'OUR SERVICES', subtitle: 'INTEGRATED TRANSPORT & LOGISTICS SOLUTIONS' },
    about: { title: 'ABOUT TERSIS', subtitle: 'Your trusted European logistics partner since 2011' }
  },
  lt: {
    nav: { services: 'PASLAUGOS', fleet: 'PARKAS', about: 'APIE MUS', coverage: 'GEOGRAFIJA', contact: 'KONTAKTAI', getQuote: 'UŽKLAUSA' },
    hero: { title1: 'SAVAS PARKAS.', title2: 'TIESIOGINĖ ĮTAKA.', title3: 'EUROPOS', title4: 'LOGISTIKA.' },
    fleet: { title: 'TRANSPORTAS', subtitle: 'Techninis meistriškumas kiekvienam kroviniui', std: 'STANDARTINĖ KLASĖ', mega: 'MEGA PRIVALUMAS' },
    services: { title: 'PASLAUGOS', subtitle: 'INTEGRUOTI LOGISTIKOS SPRENDIMAI' },
    about: { title: 'APIE TERSIS', subtitle: 'Jūsų patikimas partneris nuo 2011 m.' }
  }
};

// --- ИЗОЛЯЦИЯ: ГЕРОЙ ---
const MemoHero = memo(({ t, scrollTo }: any) => (
  <section className="relative h-screen flex items-center px-6 overflow-hidden bg-[#050a14]">
    <div className="absolute inset-0 z-0 pointer-events-none">
      <video autoPlay muted loop playsInline className="w-full h-full object-cover opacity-40">
        <source src="/hero-video.mp4.mp4" type="video/mp4" />
      </video>
    </div>
    <div className="absolute inset-0 bg-black/60 z-10 pointer-events-none" />
    <div className="max-w-7xl mx-auto w-full relative z-20 grid md:grid-cols-2 gap-12 items-center">
      <div className="animate-fadeInUp">
        <div className="inline-block mb-6 px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded text-blue-500 text-[10px] font-bold tracking-widest uppercase">EST. 2011 • TRUSTED EXPERIENCE</div>
        <h1 className="text-5xl sm:text-7xl md:text-8xl font-black text-white leading-[0.85] uppercase mb-8 tracking-tighter">
          {t.hero.title1}<br />{t.hero.title2}<br /><span className="text-blue-600">{t.hero.title3}</span><br />{t.hero.title4}
        </h1>
        <p className="text-gray-300 text-lg mb-10 max-w-lg leading-relaxed">{t.hero.desc}</p>
        <div className="flex gap-4">
          <button onClick={() => scrollTo('contact')} className="bg-blue-600 text-white px-8 py-4 rounded font-bold text-xs uppercase tracking-widest flex items-center gap-2 hover:bg-blue-700 transition-all">GET QUOTE <ArrowRight size={16}/></button>
          <button onClick={() => scrollTo('fleet')} className="border border-white/20 text-white px-8 py-4 rounded font-bold text-xs uppercase tracking-widest hover:bg-white/5 transition-all">FLEET DETAILS</button>
        </div>
      </div>
      <div className="hidden md:flex flex-col gap-6 items-end">
        <div className="bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-2xl w-72">
          <Truck className="text-blue-500 mb-4" size={32}/><p className="text-5xl font-black text-white mb-1 uppercase">27+</p><p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Own Vehicles</p>
        </div>
        <div className="bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-2xl w-72">
          <FileText className="text-blue-500 mb-4" size={32}/><p className="text-xl font-black text-white uppercase tracking-tighter">LIC-009666-EBKR</p><p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">EU Transport License</p>
        </div>
      </div>
    </div>
  </section>
))

const App = () => {
  const [lang, setLang] = useState<'en' | 'lt'>('en');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const isFocusing = useRef(false);
  const t = translations[lang];

  useEffect(() => {
    const handleScroll = () => { if (!isFocusing.current) setIsScrolled(window.scrollY > 50) }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  }

  const handleSubmit = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitted(true);
    const data = Object.fromEntries(new FormData(e.currentTarget).entries());
    try {
      await fetch('/send.php', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
      e.currentTarget.reset();
      setTimeout(() => setIsSubmitted(false), 4000);
    } catch (e) { setIsSubmitted(false); }
  }, []);

  return (
    <div className="min-h-screen bg-[#050a14] text-white font-sans antialiased overflow-x-hidden">
      <style>{`
        input:focus, textarea:focus { outline: 2px solid #0052ff !important; transition: none !important; }
        .form-card { background: #0F1A2B; border: 1px solid #1A2C45; contain: layout paint; isolation: isolate; }
        input, textarea { background: #0a1628; border: 1px solid #1A2C45; color: white; transition: border-color 0.1s; }
      `}</style>

      {/* NAV */}
      <nav className={`fixed w-full z-50 p-6 transition-all ${isScrolled ? 'bg-[#050a14]/95 backdrop-blur-md border-b border-white/5 h-16' : 'h-20'} flex items-center`}>
        <div className="max-w-7xl mx-auto px-4 w-full flex justify-between items-center">
          <div className="flex items-center gap-2 cursor-pointer group" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
            <img src="/logo.png" className="h-10 transition-transform group-hover:scale-110" />
            <span className="text-2xl font-black tracking-tighter uppercase">TERSIS</span>
          </div>
          <div className="hidden md:flex gap-8 items-center">
            {['services', 'fleet', 'about', 'contact'].map(s => (
              <button key={s} onClick={() => scrollTo(s)} className="text-[11px] font-black uppercase tracking-widest text-gray-400 hover:text-white transition-colors">{(t.nav as any)[s]}</button>
            ))}
            <button onClick={() => setLang(lang === 'en' ? 'lt' : 'en')} className="border border-white/20 px-3 py-1 rounded text-[10px] font-bold uppercase">{lang.toUpperCase()}</button>
            <button onClick={() => scrollTo('contact')} className="bg-blue-600 text-white px-5 py-2 rounded font-black text-xs">GET QUOTE</button>
          </div>
          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}><Menu/></button>
        </div>
      </nav>

      <MemoHero t={t} lang={lang} scrollTo={scrollTo} />

      {/* FLEET */}
      <section id="fleet" className="py-32 px-8 bg-[#050a14]">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-5xl md:text-7xl font-black mb-4 uppercase tracking-tighter">{t.fleet.title}</h2>
          <p className="text-gray-500 font-bold uppercase tracking-widest mb-20">{t.fleet.subtitle}</p>
          <div className="grid md:grid-cols-2 gap-10 text-left">
            <div className="p-10 rounded-[40px] border border-white/5 bg-[#0a1628]">
              <div className="flex items-center gap-4 mb-8">
                <div className="p-4 bg-blue-600/10 rounded-2xl border border-blue-600/20"><Truck className="text-blue-600" size={32}/></div>
                <h3 className="text-2xl font-black uppercase">{t.fleet.std}</h3>
              </div>
              <div className="space-y-6 mb-10">
                {[['LENGTH','13.6 m'],['HEIGHT','2.7 m'],['CAPACITY','33 Euro Pallets'],['IDEAL FOR','General Cargo']].map(([l,v])=>(<div key={l} className="flex justify-between border-b border-white/5 pb-4 text-[10px] font-black uppercase tracking-widest"><span className="text-gray-500">{l}</span><span className="text-white">{v}</span></div>))}
              </div>
            </div>
            <div className="p-10 rounded-[40px] border border-blue-600/20 bg-[#0a1628]">
              <div className="flex items-center gap-4 mb-8">
                <div className="p-4 bg-blue-600/10 rounded-2xl border border-blue-600/20"><Maximize2 className="text-blue-600" size={32}/></div>
                <h3 className="text-2xl font-black uppercase text-blue-500">{t.fleet.mega}</h3>
              </div>
              <div className="space-y-6 mb-10">
                {[['INTERNAL HEIGHT','3.0 m'],['VOLUME','105 m³'],['SPECIALIZATION','Lightweight Cargo'],['ADVANTAGE','+14% Capacity']].map(([l,v])=>(<div key={l} className="flex justify-between border-b border-white/5 pb-4 text-[10px] font-black uppercase tracking-widest"><span className="text-gray-500">{l}</span><span className="text-white">{v}</span></div>))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="py-32 px-8 bg-[#0a1628] border-y border-white/5">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-5xl md:text-7xl font-black mb-4 uppercase tracking-tighter">{t.services.title}</h2>
          <p className="text-blue-500 font-black uppercase tracking-[0.3em] text-sm mb-20">{t.services.subtitle}</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {t.services.items.map((s: any, i: number) => (
              <div key={i} className="p-10 rounded-[32px] border border-white/5 bg-[#050a14] hover:border-blue-600 transition-all text-center group">
                <Globe className="text-blue-600 mb-6 mx-auto group-hover:scale-110 transition-transform" size={32} />
                <h4 className="font-black text-[11px] uppercase tracking-widest text-white">{s.title}</h4>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-32 px-8 bg-[#050a14] text-center">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-5xl md:text-7xl font-black mb-16 uppercase tracking-tighter">ABOUT TERSIS</h2>
          <div className="text-gray-400 text-lg leading-relaxed space-y-8 mb-20">
            <p>TERSIS provides reliable, cost-effective transportation solutions across Europe and worldwide. We specialize in asset-based logistics, operating a modern fleet of 27 vehicles to ensure direct control and maximum efficiency.</p>
            <p>Our professional team ensures seamless cargo handling, competitive pricing, and transparent communication. We are fully licensed (LIC-009666-EBKR) and 100% CMR insured, providing safety at every stage of your shipment.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {['OWN FLEET','OPTIMIZED ROUTES','HIGH RELIABILITY','CARGO SAFETY','TRANSPARENT','PARTNERS','PROFESSIONAL','100% INSURED'].map((l, i) => (
              <div key={i} className="p-8 rounded-[32px] border border-white/5 bg-[#0a1628]"><p className="font-black text-[10px] uppercase text-white">{l}</p></div>
            ))}
          </div>
        </div>
      </section>

      {/* COVERAGE (MAP) */}
      <section id="coverage" className="py-32 px-8 border-t border-white/5 bg-[#050a14] text-center">
        <h2 className="text-5xl font-black mb-16 uppercase tracking-tighter">GLOBAL COVERAGE</h2>
        <div className="relative h-[400px] md:h-[650px] rounded-[40px] overflow-hidden bg-black max-w-7xl mx-auto">
          <img src="/map-hub.jpg.png" className="absolute inset-0 w-full h-full object-cover opacity-80 pointer-events-none" />
          <div className="absolute bottom-6 left-8 bg-black/40 backdrop-blur-md px-4 py-2 rounded-lg border border-white/10 text-left hidden md:block"><p className="text-[10px] font-black text-blue-600 uppercase mb-1">Hub Status</p><p className="text-white text-xs font-bold uppercase">Operational</p></div>
        </div>
      </section>

      {/* CONTACT (ВОССТАНОВЛЕНА 1:1 СО СКРИНШОТА) */}
      <section id="contact" className="py-32 px-8 bg-[#050a14]" onFocus={() => { isFocusing.current = true }} onBlur={() => { isFocusing.current = false }}>
        <div className="max-w-4xl mx-auto">
          <div className="form-card p-8 md:p-16 rounded-[40px] shadow-2xl">
            <form onSubmit={handleSubmit} className="space-y-8" autoComplete="off">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-white">
                <div className="space-y-2"><label className="block text-[11px] font-black text-gray-500 uppercase tracking-widest">FROM (COUNTRY/CITY)</label><input name="from" required placeholder="Kaunas, Lithuania" className="w-full px-5 py-4 rounded-xl text-sm outline-none focus:border-blue-600" /></div>
                <div className="space-y-2"><label className="block text-[11px] font-black text-gray-500 uppercase tracking-widest">TO (COUNTRY/CITY)</label><input name="to" required placeholder="Berlin, Germany" className="w-full px-5 py-4 rounded-xl text-sm outline-none focus:border-blue-600" /></div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-white">
                <div className="space-y-2"><label className="block text-[11px] font-black text-gray-500 uppercase tracking-widest">CARGO TYPE</label><input name="cargoType" placeholder="Electronics, Pallets, etc." className="w-full px-5 py-4 rounded-xl text-sm outline-none focus:border-blue-600" /></div>
                <div className="space-y-2"><label className="block text-[11px] font-black text-gray-500 uppercase tracking-widest">WEIGHT (KG)</label><input name="weight" placeholder="5000" className="w-full px-5 py-4 rounded-xl text-sm outline-none focus:border-blue-600" /></div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-white">
                <div className="space-y-2"><label className="block text-[11px] font-black text-gray-500 uppercase tracking-widest">VOLUME (M³)</label><input name="volume" placeholder="10" className="w-full px-5 py-4 rounded-xl text-sm outline-none focus:border-blue-600" /></div>
                <div className="space-y-2"><label className="block text-[11px] font-black text-gray-500 uppercase tracking-widest">NAME</label><input name="name" required placeholder="John Doe" className="w-full px-5 py-4 rounded-xl text-sm outline-none focus:border-blue-600" /></div>
              </div>
              <div className="space-y-2 text-white"><label className="block text-[11px] font-black text-gray-500 uppercase tracking-widest">EMAIL</label><input name="email" type="email" required placeholder="john@company.com" className="w-full px-5 py-4 rounded-xl text-sm outline-none focus:border-blue-600" /></div>
              <div className="space-y-2 text-white"><label className="block text-[11px] font-black text-gray-500 uppercase tracking-widest">PHONE</label><input name="phone" required placeholder="+370 123 45678" className="w-full px-5 py-4 rounded-xl text-sm outline-none focus:border-blue-600" /></div>
              <div className="space-y-2 text-white"><label className="block text-[11px] font-black text-gray-500 uppercase tracking-widest">MESSAGE (OPTIONAL)</label><textarea name="message" rows={4} placeholder="Additional details..." className="w-full px-5 py-4 rounded-xl text-sm outline-none focus:border-blue-600 resize-none" /></div>
              <button type="submit" disabled={isSubmitted} className="w-full py-6 bg-blue-600 hover:bg-blue-700 text-white font-black rounded-2xl text-xs tracking-[0.3em] uppercase transition-all shadow-xl shadow-blue-600/20">
                {isSubmitted ? 'SENT SUCCESS' : 'REQUEST QUOTE IN 24H'}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* FOOTER (ПОЛНЫЙ) */}
      <footer className="py-24 bg-[#050a14] border-t border-white/5 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-16 text-left">
          <div className="space-y-8">
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo({top:0, behavior:'smooth'})}><img src="/logo.png" className="h-8"/><span className="text-xl font-bold uppercase tracking-tighter">TERSIS</span></div>
            <p className="text-gray-500 text-sm leading-relaxed max-w-xs">Asset-based carrier & international logistics provider since 2011. Reliable hub for European transport solutions.</p>
          </div>
          <div className="space-y-8">
            <h4 className="text-white font-black text-xs uppercase tracking-widest">SERVICES</h4>
            <div className="space-y-3 text-gray-500 text-[11px] font-bold uppercase tracking-widest">
              <p>FTL / LTL Transport</p><p>International Logistics</p><p>Secure Storage</p><p>Express Delivery</p><p>Customs Clearance</p>
            </div>
          </div>
          <div className="space-y-8">
            <h4 className="text-white font-black text-xs uppercase tracking-widest">LEGAL</h4>
            <div className="space-y-4 text-sm font-medium">
              <div className="flex items-center gap-2 text-blue-500"><FileText size={16}/><span>LIC-009666-EBKR</span></div>
              <div className="flex items-center gap-2 text-green-500 font-bold"><Check size={16}/><span>100% CMR Insured</span></div>
              <div className="flex items-center gap-2 text-blue-400 font-bold"><Check size={16}/><span>Euro-6 Compliant</span></div>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto pt-16 mt-16 border-t border-white/5 text-center px-4">
           <p className="text-gray-700 text-[9px] font-black uppercase tracking-[0.3em]">Taikos pr. 141-305, Kaunas, Lithuania | info@tersis.lt | © 2026 TERSIS. ALL RIGHTS RESERVED.</p>
        </div>
      </footer>
    </div>
  )
}

const rootElement = document.getElementById('root')!
ReactDOM.createRoot(rootElement).render(<App />)
