import React, { useState, useEffect, useCallback, memo, useRef, useMemo } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import {
  Truck, ArrowRight, Check, Shield, Clock, Menu, X, Phone, Mail, MapPin, 
  Zap, Globe, Lock, AlertTriangle, Handshake, Users, FileText, Home, 
  Maximize2, Sun, Moon, Languages
} from 'lucide-react'

// --- ПОЛНЫЕ ПЕРЕВОДЫ (Вшиты, чтобы не было белого экрана!) ---
const translations: any = {
  en: {
    nav: { services: 'SERVICES', fleet: 'FLEET', about: 'ABOUT', coverage: 'COVERAGE', contact: 'CONTACT', getQuote: 'GET QUOTE' },
    hero: { title1: 'OWN FLEET.', title2: 'DIRECT IMPACT.', title3: 'EUROPEAN', title4: 'LOGISTICS.', desc: 'We operate a fleet of 27+ modern Euro 6 vehicles, specializing in high-capacity MEGA trailers (105 m³) and delivering reliable standard transport solutions worldwide.' },
    fleet: { title: 'FLEET SPECIFICATIONS', subtitle: 'Technical excellence for every shipment', std: 'STANDARD CLASS', mega: 'MEGA ADVANTAGE', capacity: 'Capacity', length: 'LENGTH', height: 'HEIGHT', pallets: 'PALLETS', internalHeight: 'INTERNAL HEIGHT', volume: 'VOLUME', advantage: 'ADVANTAGE', standardFooter: 'Reliable solutions for standard palletized goods across Europe.', megaFooter: 'Specialized 105m³ trailers providing maximum volume for lightweight cargo.' },
    services: { title: 'OUR SERVICES', subtitle: 'INTEGRATED TRANSPORT & LOGISTICS SOLUTIONS' },
    about: { title: 'ABOUT TERSIS', subtitle: 'Your trusted European logistics partner since 2011' },
    contact: { title: 'REQUEST A QUOTE', subtitle: 'Get a professional offer within 24 hours', from: 'FROM (COUNTRY/CITY)', to: 'TO (COUNTRY/CITY)', cargoType: 'CARGO TYPE', weight: 'WEIGHT (KG)', volume: 'VOLUME (M³)', name: 'NAME', email: 'EMAIL', phone: 'PHONE', message: 'MESSAGE (OPTIONAL)', submitted: 'SENT SUCCESSFULLY' }
  },
  lt: {
    nav: { services: 'PASLAUGOS', fleet: 'PARKAS', about: 'APIE MUS', coverage: 'GEOGRAFIJA', contact: 'KONTAKTAI', getQuote: 'UŽKLAUSA' },
    hero: { title1: 'SAVAS PARKAS.', title2: 'TIESIOGINĖ ĮTAKA.', title3: 'EUROPOS', title4: 'LOGISTIKA.', desc: 'Valdome 27+ modernių Euro 6 transporto priemonių parką, specializuojamės MEGA puspriekabėmis.' },
    fleet: { title: 'TRANSPORTAS', subtitle: 'Techninis meistriškumas kiekvienam kroviniui', std: 'STANDARTINĖ KLASĖ', mega: 'MEGA PRIVALUMAS', capacity: 'Talpa', length: 'ILGIS', height: 'AUKŠTIS', pallets: 'PALETĖS', internalHeight: 'VIDINIS AUKŠTIS', volume: 'TŪRIS', advantage: 'PRIVALUMAS', standardFooter: 'Patikimi sprendimai standartiniams kroviniams.', megaFooter: 'Maksimalaus tūrio MEGA priekabos lengviems kroviniams.' },
    services: { title: 'PASLAUGOS', subtitle: 'INTEGRUOTI LOGISTIKOS SPRENDIMAI' },
    about: { title: 'APIE TERSIS', subtitle: 'Jūsų patikimas partneris nuo 2011 m.' },
    contact: { title: 'GAUTI PASIŪLYMĄ', subtitle: 'Profesionalus pasiūlymas per 24 valandas', from: 'IŠ (VALSTYBĖ/MIESTAS)', to: 'Į (VALSTYBĖ/MIESTAS)', cargoType: 'KROVINIO TIPAS', weight: 'SVORIS (KG)', volume: 'TŪRIS (M³)', name: 'VARDAS', email: 'EL. PAŠTAS', phone: 'TELEFONAS', message: 'ŽINUTĖ', submitted: 'SIUNTIMAS SĖKMINGAS' }
  }
};

const serviceIcons = [Truck, Globe, Shield, Clock, Zap, FileText, Handshake, Users]

// --- ИЗОЛЯЦИЯ ТЯЖЕЛЫХ БЛОКОВ (memo) ---
const MemoHero = memo(({ t, lang, scrollTo }: any) => (
  <section className="relative h-screen flex items-center px-6 overflow-hidden bg-[#050a14]">
    <div className="absolute inset-0 z-0 pointer-events-none">
      <video autoPlay muted loop playsInline className="w-full h-full object-cover opacity-40">
        <source src="/hero-video.mp4.mp4" type="video/mp4" />
      </video>
    </div>
    <div className="absolute inset-0 bg-black/60 z-10 pointer-events-none" />
    <div className="max-w-7xl mx-auto w-full relative z-20 grid md:grid-cols-2 gap-12 items-center text-left">
      <div className="animate-fadeInUp">
        <div className="inline-block mb-6 px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded text-blue-500 text-[10px] font-bold tracking-widest uppercase">EST. 2011 • TRUSTED EXPERIENCE</div>
        <h1 className="text-6xl md:text-8xl font-black text-white leading-[0.85] uppercase mb-8 tracking-tighter">
          {t.hero.title1}<br/>{t.hero.title2}<br/><span className="text-blue-600">{t.hero.title3}</span><br/>{t.hero.title4}
        </h1>
        <p className="text-gray-300 text-lg mb-10 max-w-lg leading-relaxed">{t.hero.desc}</p>
        <div className="flex gap-4">
          <button onClick={() => scrollTo('contact-section-isolated')} className="bg-blue-600 text-white px-8 py-4 rounded font-bold text-xs uppercase tracking-widest hover:bg-blue-700 transition-all shadow-xl">GET QUOTE <ArrowRight size={16} className="inline ml-1"/></button>
        </div>
      </div>
      <div className="hidden md:flex flex-col gap-6 items-end">
        <div className="bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-2xl w-64 text-center">
          <Truck className="text-blue-600 mb-4 mx-auto" size={32}/><p className="text-4xl font-black text-white">27+</p><p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Own Vehicles</p>
        </div>
        <div className="bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-2xl w-64 text-center">
          <FileText className="text-blue-600 mb-4 mx-auto" size={32}/><p className="text-xl font-black text-white uppercase tracking-tighter">LIC-009666-EBKR</p>
        </div>
      </div>
    </div>
  </section>
));

const MemoMap = memo(() => (
  <div className="relative h-[400px] md:h-[650px] rounded-[40px] overflow-hidden bg-black max-w-7xl mx-auto border border-blue-600/30">
    <img src="/map-hub.jpg.png" className="absolute inset-0 w-full h-full object-cover opacity-80 pointer-events-none" />
    <svg className="absolute inset-0 w-full h-full z-10 pointer-events-none" viewBox="0 0 1000 600" preserveAspectRatio="xMidYMid slice">
      <g fill="none" strokeWidth="2" strokeLinecap="round">
        <path d="M 150,230 Q 300,100 485,205" stroke="rgba(0,82,255,0.5)" strokeDasharray="1, 50"><animate attributeName="stroke-dashoffset" from="300" to="0" dur="3s" repeatCount="indefinite" /></path>
        <path d="M 850,380 Q 650,250 485,205" stroke="rgba(0,82,255,0.5)" strokeDasharray="1, 50"><animate attributeName="stroke-dashoffset" from="300" to="0" dur="2.8s" repeatCount="indefinite" /></path>
      </g>
    </svg>
    <div className="absolute bottom-8 left-8 bg-black/40 backdrop-blur-md px-6 py-3 rounded-xl border border-white/10 text-left hidden md:block">
      <p className="text-[10px] font-black text-blue-600 uppercase mb-1">Hub Status</p>
      <p className="text-white text-xs font-bold uppercase tracking-widest">Operational / 24-7</p>
    </div>
  </div>
));

export const Route = createFileRoute('/')({
  component: TersisApp,
})

function TersisApp() {
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

  const handleSubmit = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitted(true);
    const data = Object.fromEntries(new FormData(e.currentTarget).entries());
    try {
      await fetch('/send.php', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
      (e.target as HTMLFormElement).reset();
      setTimeout(() => setIsSubmitted(false), 4000);
    } catch (err) { setIsSubmitted(false); }
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  }

  return (
    <div className="min-h-screen bg-[#050a14] text-white font-sans antialiased overflow-x-hidden">
      
      {/* NAVIGATION */}
      <nav className={`fixed w-full z-50 p-6 transition-all ${isScrolled ? 'bg-[#050a14]/95 backdrop-blur-md border-b border-white/5 h-16' : 'h-20'} flex items-center`}>
        <div className="max-w-7xl mx-auto px-4 w-full flex justify-between items-center text-white">
          <div className="flex items-center gap-2 cursor-pointer group" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
            <img src="/logo.png" className="h-10 transition-transform group-hover:scale-110" />
            <span className="text-2xl font-black tracking-tighter uppercase ml-2">TERSIS</span>
          </div>
          <div className="hidden md:flex gap-8 items-center text-[10px] font-bold uppercase tracking-widest text-gray-400">
            {['services', 'fleet', 'about', 'contact'].map(s => <button key={s} onClick={() => scrollTo(s === 'contact' ? 'contact-section-isolated' : s)} className="hover:text-white transition-colors">{s}</button>)}
            <button onClick={() => setLang(lang === 'en' ? 'lt' : 'en')} className="border border-white/20 px-3 py-1 rounded text-white">{lang.toUpperCase()}</button>
            <button onClick={() => scrollTo('contact-section-isolated')} className="bg-blue-600 text-white px-5 py-2 rounded font-black hover:bg-blue-700">GET QUOTE</button>
          </div>
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden text-white">{isMenuOpen ? <X size={28}/> : <Menu size={28}/>}</button>
        </div>
      </nav>

      {isMenuOpen && (
        <div className="fixed inset-0 z-[100] bg-[#050a14] flex flex-col p-8 animate-fadeInUp">
          <div className="flex justify-end mb-12"><button onClick={() => setIsMenuOpen(false)} className="text-white"><X size={32}/></button></div>
          {['services','fleet','about','contact'].map(s => <button key={s} onClick={() => scrollTo(s === 'contact' ? 'contact-section-isolated' : s)} className="text-4xl font-black uppercase mb-8 text-left text-white">{s}</button>)}
        </div>
      )}

      <MemoHero t={t} lang={lang} scrollTo={scrollTo} />

      {/* FLEET */}
      <section id="fleet" className="py-24 px-6 bg-[#050a14] border-t border-white/5 text-center">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-black mb-16 uppercase tracking-tight">{t.fleet.title}</h2>
          <div className="grid md:grid-cols-2 gap-10 text-left">
            <div className="p-10 rounded-3xl border border-white/5 bg-[#0a1628]">
              <Truck className="text-blue-600 mb-6" size={40} /><h3 className="text-3xl font-black mb-4 uppercase">{t.fleet.std}</h3>
              <div className="space-y-3 text-[10px] font-black uppercase tracking-widest text-gray-500">
                <div className="flex justify-between border-b border-white/5 pb-2"><span>{t.fleet.length}</span><span className="text-white">13.6 M</span></div>
                <div className="flex justify-between border-b border-white/5 pb-2"><span>{t.fleet.height}</span><span className="text-white">2.7 M</span></div>
                <div className="flex justify-between border-b border-white/5 pb-2"><span>{t.fleet.capacity}</span><span className="text-white">33 PALLETS</span></div>
              </div>
              <p className="text-gray-500 italic text-xs mt-6">{t.fleet.standardFooter}</p>
            </div>
            <div className="p-10 rounded-3xl border border-blue-500/20 bg-[#0a1628]">
              <Maximize2 className="text-blue-600 mb-6" size={40} /><h3 className="text-3xl font-black mb-4 uppercase text-blue-600">{t.fleet.mega}</h3>
              <div className="space-y-3 text-[10px] font-black uppercase tracking-widest text-gray-500">
                <div className="flex justify-between border-b border-white/5 pb-2"><span>{t.fleet.internalHeight}</span><span className="text-white">3.0 M</span></div>
                <div className="flex justify-between border-b border-white/5 pb-2"><span>{t.fleet.volume}</span><span className="text-white">105 M³</span></div>
                <div className="flex justify-between border-b border-white/5 pb-2"><span>{t.fleet.advantage}</span><span className="text-white">+14% CAPACITY</span></div>
              </div>
              <p className="text-gray-500 italic text-xs mt-6">{t.fleet.megaFooter}</p>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="py-24 px-6 bg-[#0a1628] border-y border-white/5 text-center">
        <h2 className="text-5xl font-black mb-16 uppercase text-white tracking-tighter">{t.services.title}</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {['FTL / LTL', 'GLOBAL', 'ADR', 'GROUPAGE', 'EXPRESS', 'WAREHOUSE', 'CUSTOMS', 'INSURANCE'].map((title, i) => {
            const Icon = serviceIcons[i] || Truck;
            return (
              <div key={i} className="p-8 rounded-3xl border border-white/5 bg-[#050a14] hover:border-blue-600 transition-all text-center">
                <Icon className="text-blue-600 mb-4 mx-auto" size={32} />
                <h4 className="font-black text-[10px] uppercase tracking-widest text-white leading-tight">{title}</h4>
              </div>
            )
          })}
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-24 px-6 bg-[#050a14] border-t border-white/5 text-center">
        <div className="max-w-5xl mx-auto text-white">
          <h2 className="text-4xl md:text-5xl font-black mb-10 uppercase tracking-tighter">{t.about.title}</h2>
          <p className="text-gray-400 text-lg md:text-xl leading-relaxed mb-12">TERSIS is a reliable logistics partner since 2011. Modern fleet of 27 Euro 6 vehicles. License: <span className="text-white font-bold">LIC-009666-EBKR</span>.</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
             {['Own Fleet','CMR Insured','EU Network','24/7 Support','Secure','Expert Team','Full Docs','Trusted'].map((l, i) => (
               <div key={i} className="p-6 bg-[#0a1628] rounded-xl border border-white/5 font-black text-[10px] uppercase text-white">{l}</div>
             ))}
          </div>
        </div>
      </section>

      <section className="py-24 px-6 bg-[#050a14] border-t border-white/5 text-center uppercase"><h2 className="mb-10 text-4xl font-black">Our Hub</h2><MemoMap /></section>

      {/* CONTACT (ВОССТАНОВЛЕНА 1:1 ПО СКРИНШОТУ - 9 ПОЛЕЙ) */}
      <section id="contact-section-isolated" className="py-32 px-6 bg-[#050a14]" 
               onFocus={() => { isFocusing.current = true }} 
               onBlur={() => { isFocusing.current = false }}>
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl font-black mb-12 uppercase tracking-tighter text-white">{t.contact.title}</h2>
          <div className="p-8 md:p-16 rounded-[40px] shadow-2xl border border-[#1A2C45] bg-[#0F1A2B]" style={{ contain: 'layout paint' }}>
            <form onSubmit={handleSubmit} className="space-y-8 text-left" autoComplete="off">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-white">
                <div className="space-y-2"><label className="text-[11px] font-black text-gray-500 uppercase tracking-widest">{t.contact.from}</label><input name="from" required placeholder="Kaunas, Lithuania" className="w-full px-6 py-4 bg-[#0a1628] border border-white/5 rounded-xl text-sm outline-none focus:border-blue-600 transition-none" /></div>
                <div className="space-y-2"><label className="text-[11px] font-black text-gray-500 uppercase tracking-widest">{t.contact.to}</label><input name="to" required placeholder="Berlin, Germany" className="w-full px-6 py-4 bg-[#0a1628] border border-white/5 rounded-xl text-sm outline-none focus:border-blue-600 transition-none" /></div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-white">
                <div className="space-y-2"><label className="text-[11px] font-black text-gray-500 uppercase tracking-widest">{t.contact.cargoType}</label><input name="cargoType" placeholder="Electronics..." className="w-full px-6 py-4 bg-[#0a1628] border border-white/5 rounded-xl text-sm outline-none focus:border-blue-600" /></div>
                <div className="space-y-2"><label className="text-[11px] font-black text-gray-500 uppercase tracking-widest">{t.contact.weight}</label><input name="weight" placeholder="5000" className="w-full px-6 py-4 bg-[#0a1628] border border-white/5 rounded-xl text-sm outline-none focus:border-blue-600" /></div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-white">
                <div className="space-y-2"><label className="text-[11px] font-black text-gray-500 uppercase tracking-widest">{t.contact.volume}</label><input name="volume" placeholder="10" className="w-full px-6 py-4 bg-[#0a1628] border border-white/5 rounded-xl text-sm outline-none focus:border-blue-600" /></div>
                <div className="space-y-2"><label className="text-[11px] font-black text-gray-500 uppercase tracking-widest">{t.contact.name}</label><input name="name" required placeholder="John Doe" className="w-full px-6 py-4 bg-[#0a1628] border border-white/5 rounded-xl text-sm outline-none focus:border-blue-600" /></div>
              </div>
              <div className="text-white space-y-2"><label className="block text-[11px] font-black text-gray-500 uppercase tracking-widest">{t.contact.email}</label><input name="email" type="email" required placeholder="john@company.com" className="w-full px-6 py-4 bg-[#0a1628] border border-white/5 rounded-xl text-sm outline-none focus:border-blue-600" /></div>
              <button type="submit" disabled={isSubmitted} className="w-full py-6 bg-blue-600 text-white font-black rounded-2xl uppercase tracking-widest transition-all shadow-xl shadow-blue-600/20">
                {isSubmitted ? t.contact.submitted : 'REQUEST QUOTE IN 24H'}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-24 bg-[#050a14] border-t border-white/5 text-center px-4 text-gray-600 text-[10px] font-bold uppercase tracking-widest leading-loose">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-20 text-left mb-16">
          <div className="space-y-8">
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo({top:0, behavior:'smooth'})}><img src="https://tersis.lt/logo.png" className="h-10"/><span className="text-xl font-bold uppercase text-white tracking-tighter">TERSIS</span></div>
            <p>Asset-based carrier & logistics provider since 2011.</p>
          </div>
          <div><h4 className="text-white font-black text-xs uppercase tracking-widest mb-6">HQ</h4><p>Taikos pr. 141-305, Kaunas, Lithuania<br/>info@tersis.lt | +370 65 955 956</p></div>
          <div><h4 className="text-white font-black text-xs uppercase tracking-widest mb-6">Legal</h4><p>License: LIC-009666-EBKR<br/>© 2026 TERSIS</p></div>
        </div>
      </footer>
    </div>
  )
}
