import React, { useState, useEffect, useCallback, memo, useRef } from 'react'
import ReactDOM from 'react-dom/client'
import {
  Truck, ArrowRight, Check, Shield, Clock, Menu, X, Phone, Mail, MapPin, 
  Zap, Globe, Lock, AlertTriangle, Handshake, Users, FileText, Maximize2, Sun, Moon, Languages
} from 'lucide-react'

const translations: any = {
  en: {
    nav: { services: 'SERVICES', fleet: 'FLEET', about: 'ABOUT', coverage: 'COVERAGE', contact: 'CONTACT' },
    hero: { title1: 'OWN FLEET.', title2: 'DIRECT IMPACT.', title3: 'EUROPEAN', title4: 'LOGISTICS.', desc: 'We operate a fleet of 27+ modern Euro 6 vehicles, specializing in high-capacity MEGA trailers (105 m³) and delivering reliable standard transport solutions worldwide.' },
    fleet: { title: 'FLEET SPECIFICATIONS', subtitle: 'Technical excellence for every shipment', std: 'STANDARD CLASS', mega: 'MEGA ADVANTAGE' },
    services: { title: 'OUR SERVICES', subtitle: 'INTEGRATED TRANSPORT & LOGISTICS SOLUTIONS' },
    about: { title: 'ABOUT TERSIS', subtitle: 'Your trusted European logistics partner since 2011' },
    contact: { title: 'REQUEST A QUOTE', subtitle: 'Get a professional offer within 24 hours' }
  }
};

const HeroSection = memo(({ scrollTo }: any) => (
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
        <h1 className="text-5xl md:text-8xl font-black text-white leading-[0.85] uppercase mb-8 tracking-tighter">
          OWN FLEET.<br/>DIRECT IMPACT.<br/><span className="text-blue-600">EUROPEAN</span><br/>LOGISTICS.
        </h1>
        <p className="text-gray-300 text-lg mb-10 max-w-lg leading-relaxed">{translations.en.hero.desc}</p>
        <div className="flex gap-4">
          <button onClick={() => scrollTo('contact')} className="bg-[#0052ff] text-white px-8 py-4 rounded font-bold text-xs uppercase tracking-widest hover:bg-blue-700 transition-all shadow-xl">GET QUOTE <ArrowRight size={16} className="inline ml-1"/></button>
          <button onClick={() => scrollTo('fleet')} className="border border-white/20 text-white px-8 py-4 rounded font-bold text-xs uppercase tracking-widest hover:bg-white/5 transition-all">FLEET DETAILS</button>
        </div>
      </div>
      <div className="hidden md:flex flex-col gap-6 items-end">
        <div className="bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-2xl w-64">
          <Truck className="text-blue-500 mb-4" size={32}/><p className="text-4xl font-black text-white">27+</p><p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Own Vehicles</p>
        </div>
        <div className="bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-2xl w-64">
          <FileText className="text-blue-500 mb-4" size={32}/><p className="text-xl font-black text-white uppercase">LIC-009666-EBKR</p><p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">EU License</p>
        </div>
      </div>
    </div>
  </section>
));

const App = () => {
  const [lang, setLang] = useState<'en' | 'lt'>('en');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const isFocusing = useRef(false);
  const t = translations[lang];

  useEffect(() => {
    const handleScroll = () => { if (!isFocusing.current) setIsScrolled(window.scrollY > 50) }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, []);

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
    <div className="min-h-screen bg-[#050a14] text-white font-sans antialiased overflow-x-hidden">
      <style>{`
        input:focus, textarea:focus { outline: 2px solid #0052ff !important; transition: none !important; }
        .form-card { background: #0F1A2B; border: 1px solid #1A2C45; contain: layout paint; isolation: isolate; }
        input, textarea { background: #0a1628; border: 1px solid #1A2C45; color: white; transition: border-color 0.1s; }
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fadeInUp { animation: fadeInUp 0.8s ease-out forwards; }
      `}</style>

      {/* NAVIGATION */}
      <nav className={`fixed w-full z-50 p-6 transition-all ${isScrolled ? 'bg-[#050a14]/90 backdrop-blur-md border-b border-white/5 h-16' : 'h-20'} flex items-center`}>
        <div className="max-w-7xl mx-auto px-4 w-full flex justify-between items-center">
          <div className="flex items-center gap-2 cursor-pointer group" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
            <img src="/logo.png" className="h-10 transition-transform group-hover:scale-110" />
            <span className="text-2xl font-black tracking-tighter uppercase ml-2">TERSIS</span>
          </div>
          <div className="hidden md:flex gap-8 items-center text-[10px] font-bold uppercase tracking-widest text-gray-400">
            {['services', 'fleet', 'about', 'contact'].map(s => <button key={s} onClick={() => scrollTo(s)} className="hover:text-white transition-colors uppercase">{s}</button>)}
            <button onClick={() => setLang(lang === 'en' ? 'lt' : 'en')} className="border border-white/10 px-3 py-1 rounded text-white">{lang.toUpperCase()}</button>
            <button onClick={() => scrollTo('contact')} className="bg-[#0052ff] text-white px-5 py-2 rounded font-black">GET QUOTE</button>
          </div>
        </div>
      </nav>

      <HeroSection scrollTo={scrollTo} />

      {/* FLEET */}
      <section id="fleet" className="py-32 px-8 bg-[#050a14] border-t border-white/5 text-center">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl md:text-7xl font-black mb-4 uppercase tracking-tighter">{t.fleet.title}</h2>
          <p className="text-gray-500 font-bold uppercase tracking-widest mb-20">{t.fleet.subtitle}</p>
          <div className="grid md:grid-cols-2 gap-10 text-left">
            <div className="form-card p-10 rounded-[40px]">
              <Truck className="text-blue-600 mb-8" size={40} /><h3 className="text-3xl font-black mb-4 uppercase">{t.fleet.std}</h3>
              <div className="space-y-6 mb-10 text-[10px] font-black uppercase tracking-widest text-gray-500">
                <div className="flex justify-between border-b border-white/5 pb-4"><span>LENGTH</span><span className="text-white">13.6 M</span></div>
                <div className="flex justify-between border-b border-white/5 pb-4"><span>HEIGHT</span><span className="text-white">2.7 M</span></div>
                <div className="flex justify-between border-b border-white/5 pb-4"><span>CAPACITY</span><span className="text-white">33 EURO PALLETS</span></div>
              </div>
              <p className="text-gray-500 italic text-xs leading-relaxed">{t.fleet.standardFooter}</p>
            </div>
            <div className="form-card p-10 rounded-[40px] border-blue-600/20">
              <Maximize2 className="text-blue-600 mb-8" size={40} /><h3 className="text-3xl font-black mb-4 uppercase text-blue-500">{t.fleet.mega}</h3>
              <div className="space-y-6 mb-10 text-[10px] font-black uppercase tracking-widest text-gray-500">
                <div className="flex justify-between border-b border-white/5 pb-4"><span>INTERNAL HEIGHT</span><span className="text-white">3.0 M</span></div>
                <div className="flex justify-between border-b border-white/5 pb-4"><span>VOLUME</span><span className="text-white">105 M³</span></div>
                <div className="flex justify-between border-b border-white/5 pb-4"><span>ADVANTAGE</span><span className="text-white">+14% CAPACITY</span></div>
              </div>
              <p className="text-gray-500 italic text-xs leading-relaxed">{t.fleet.megaFooter}</p>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="py-32 px-8 bg-[#0a1628] border-y border-white/5 text-center">
        <h2 className="text-5xl md:text-7xl font-black mb-4 uppercase tracking-tighter text-white">{t.services.title}</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {t.services.items.map((s: any, i: number) => (
            <div key={i} className="p-10 rounded-3xl border border-white/5 bg-[#050a14] hover:border-[#0052ff] transition-all group">
              <Globe className="text-blue-500 mb-6 mx-auto group-hover:scale-110 transition-transform" size={32} />
              <h4 className="font-black text-[10px] uppercase tracking-widest text-white leading-tight">{s.title}</h4>
            </div>
          ))}
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-32 px-8 bg-[#050a14] text-center border-b border-white/5">
        <div className="max-w-5xl mx-auto text-white">
          <h2 className="text-5xl md:text-7xl font-black mb-16 uppercase tracking-tighter">ABOUT TERSIS</h2>
          <div className="text-gray-400 text-lg md:text-xl leading-relaxed space-y-8 mb-20">
            <p>TERSIS provides reliable, cost-effective transportation solutions across Europe and worldwide. We specialize in asset-based logistics, operating a modern fleet of 27 vehicles.</p>
            <p className="font-bold text-white uppercase text-sm border border-white/10 inline-block px-4 py-2 rounded tracking-widest">License: LIC-009666-EBKR</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
             {['Own Fleet','CMR Insured','EU Network','24/7 Support','Secure','Expert Team','Full Docs','Trusted'].map((l, i) => (
               <div key={i} className="p-4 bg-[#0a1628] rounded-xl border border-white/5 font-black text-[10px] uppercase text-white">{l}</div>
             ))}
          </div>
        </div>
      </section>

      {/* CONTACT FORM (ВОССТАНОВЛЕНА 1:1 ПО СКРИНШОТУ) */}
      <section id="contact" className="py-32 px-8 bg-[#050a14]" onFocus={() => { isFocusing.current = true }} onBlur={() => { isFocusing.current = false }}>
        <div className="max-w-4xl mx-auto">
          <div className="form-card p-8 md:p-16 shadow-2xl">
            <form onSubmit={handleSubmit} className="space-y-8 text-left" autoComplete="off">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-white">
                <div className="space-y-2"><label className="text-[11px] font-black text-gray-500 uppercase tracking-widest">FROM (COUNTRY/CITY)</label><input name="from" required placeholder="Kaunas, Lithuania" className="w-full px-6 py-4 rounded-xl text-sm outline-none focus:border-blue-600" /></div>
                <div className="space-y-2"><label className="text-[11px] font-black text-gray-500 uppercase tracking-widest">TO (COUNTRY/CITY)</label><input name="to" required placeholder="Berlin, Germany" className="w-full px-6 py-4 rounded-xl text-sm outline-none focus:border-blue-600" /></div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-white">
                <div className="space-y-2"><label className="text-[11px] font-black text-gray-500 uppercase tracking-widest">CARGO TYPE</label><input name="cargoType" placeholder="Electronics, Pallets..." className="w-full px-6 py-4 rounded-xl text-sm outline-none focus:border-blue-600" /></div>
                <div className="space-y-2"><label className="text-[11px] font-black text-gray-500 uppercase tracking-widest">WEIGHT (KG)</label><input name="weight" placeholder="5000" className="w-full px-6 py-4 rounded-xl text-sm outline-none focus:border-blue-600" /></div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-white">
                <div className="space-y-2"><label className="text-[11px] font-black text-gray-500 uppercase tracking-widest">VOLUME (M³)</label><input name="volume" placeholder="10" className="w-full px-6 py-4 rounded-xl text-sm outline-none focus:border-blue-600" /></div>
                <div className="space-y-2"><label className="block text-[11px] font-black text-gray-500 uppercase tracking-widest">NAME</label><input name="name" required placeholder="John Doe" className="w-full px-6 py-4 rounded-xl text-sm outline-none focus:border-blue-600" /></div>
              </div>
              <div className="text-white space-y-2"><label className="block text-[11px] font-black text-gray-500 uppercase tracking-widest">EMAIL ADDRESS</label><input name="email" type="email" required placeholder="john@company.com" className="w-full px-6 py-4 rounded-xl text-sm outline-none focus:border-blue-600" /></div>
              <button type="submit" disabled={isSubmitted} className="w-full py-6 bg-blue-600 hover:bg-blue-700 text-white font-black rounded-2xl text-xs tracking-[0.3em] uppercase transition-all shadow-xl shadow-blue-600/20 disabled:opacity-50">
                {isSubmitted ? 'SENT SUCCESSFULLY' : 'REQUEST QUOTE IN 24H'}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-24 bg-[#050a14] border-t border-white/5 text-center px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-20 text-left">
          <div className="space-y-8">
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo({top:0, behavior:'smooth'})}><img src="/logo.png" className="h-10"/><span className="text-xl font-bold uppercase text-white tracking-tighter">TERSIS</span></div>
            <p className="text-gray-500 text-sm leading-relaxed max-w-xs">Asset-based carrier & international logistics provider since 2011.</p>
          </div>
          <div><h4 className="text-white font-black text-xs uppercase tracking-widest mb-6">HQ</h4><p className="text-gray-500 text-sm">Taikos pr. 141-305, Kaunas<br/>info@tersis.lt | +370 65 955 956</p></div>
          <div><h4 className="text-white font-black text-xs uppercase tracking-widest mb-6">Legal</h4><p className="text-gray-600 text-xs font-bold uppercase">License: LIC-009666-EBKR<br/>© 2026 TERSIS. All rights reserved.</p></div>
        </div>
      </footer>
    </div>
  )
}

const rootElement = document.getElementById('root')!
ReactDOM.createRoot(rootElement).render(<App />)
