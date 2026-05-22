import React, { useState, useEffect, useCallback, memo, useRef } from 'react'
import ReactDOM from 'react-dom/client'
import {
  Truck, ArrowRight, Check, Shield, Clock, Menu, X, Phone, Mail, MapPin, 
  Zap, Globe, Lock, AlertTriangle, Handshake, Users, FileText, Maximize2, Sun, Moon, Languages
} from 'lucide-react'

// --- ПОЛНЫЕ ПЕРЕВОДЫ ---
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
        { title: 'Expert Team', subtitle: '15+ Years Experience' }
      ]
    },
    about: { title: 'About Tersis' },
    coverage: { title: 'Global Coverage' },
    contact: { 
      title: 'Request a Quote', subtitle: 'Get a professional logistics offer within 24 hours',
      from: 'FROM (COUNTRY/CITY)', to: 'TO (COUNTRY/CITY)', cargoType: 'CARGO TYPE',
      weight: 'WEIGHT (KG)', volume: 'VOLUME (M³)', name: 'NAME', email: 'EMAIL',
      phone: 'PHONE', message: 'MESSAGE (OPTIONAL)', submitted: 'SENT SUCCESSFULLY',
      placeholders: { from: 'Kaunas, Lithuania', to: 'Berlin, Germany', cargoType: 'Electronics, Pallets...', weight: '5000', volume: '10', name: 'John Doe', email: 'john@company.com', phone: '+370...', message: 'Additional details...' }
    }
  },
  lt: {
    nav: { services: 'Paslaugos', fleet: 'Parkas', about: 'Apie mus', coverage: 'Geografija', contact: 'Kontaktai', getQuote: 'Gauti pasiūlymą' },
    hero: { title1: 'SAVAS PARKAS.', title2: 'TIESIOGINĖ ĮTAKA.', title3: 'EUROPOS', title4: 'LOGISTIKOS HUBAS', getQuote: 'Užklausa', fleetDetails: 'Parko informacija' },
    fleet: { title: 'Transporto specifikacijos', subtitle: 'Euro 6 standartus atitinkantis transportas', standardClass: 'Standartinė klasė', megaAdvantage: 'Mega privalumas', length: 'Ilgis', height: 'Aukštis', internalHeight: 'Vidinis aukštis', volume: 'Tūris', capacity: 'Talpa', euroPallets: 'Euro paletės', idealFor: 'Tinka', generalCargo: 'Standartiniai kroviniai', lightweightCargo: 'Didelio tūrio kroviniai', specialization: 'Specializacija', advantage: 'Privalumas', standardFooter: 'Patikimi sprendimai standartiniams kroviniams visoje Europoje.', megaFooter: 'Specializuotos 105m³ priekabos maksimaliam tūriui.' },
    services: { title: 'Mūsų paslaugos', items: [{ title: 'FTL / LTL pervežimai', subtitle: 'Pilni ir daliniai' }, { title: 'Tarptautinė logistika', subtitle: 'Visame pasaulyje' }, { title: 'Saugus sandėliavimas', subtitle: 'Sandėliavimo paslaugos' }, { title: 'Skubus pristatymas', subtitle: 'Kritinis laikas' }, { title: 'Muitinės paslaugos', subtitle: 'Tarpininkavimas' }, { title: 'Dokumentacija', subtitle: 'Atitiktis' }, { title: 'Partnerystės hubas', subtitle: 'Tinklas' }, { title: 'Ekspertų komanda', subtitle: '15+ metų patirtis' }] },
    about: { title: 'Apie Tersis' },
    coverage: { title: 'Veiklos geografija' },
    contact: { title: 'Gauti pasiūlymą', subtitle: 'Profesionalus pasiūlymas per 24 valandas', from: 'IŠ (VALSTYBĖ/MIESTAS)', to: 'Į (VALSTYBĖ/MIESTAS)', cargoType: 'KROVINIO TIPAS', weight: 'SVORIS (KG)', volume: 'TŪRIS (M³)', name: 'VARDAS', email: 'EL. PAŠTAS', phone: 'TELEFONAS', message: 'ŽINUTĖ (PAPILDOMAI)', submitted: 'SIUNTIMAS SĖKMINGAS', placeholders: { from: 'Kaunas, Lietuva', to: 'Berlynas, Vokietija', cargoType: 'Elektronika, paletės...', weight: '5000', volume: '10', name: 'Vardas Pavardė', email: 'pastas@imone.lt', phone: '+370...', message: 'Papildoma informacija...' } }
  }
};

// --- ИЗОЛЯЦИЯ ТЯЖЕЛЫХ БЛОКОВ (memo) ---
const HeroBlock = memo(({ t, lang, scrollToSection }: any) => (
  <section className="relative h-screen flex items-center px-4 sm:px-6 lg:px-8 overflow-hidden bg-[#050a14]">
    <div className="absolute inset-0 z-0 pointer-events-none">
      <video autoPlay muted loop playsInline className="w-full h-full object-cover opacity-60">
        <source src="/hero-video.mp4.mp4" type="video/mp4" />
      </video>
    </div>
    <div className="absolute inset-0 bg-black/60 z-10 pointer-events-none" />
    <div className="max-w-7xl mx-auto w-full relative z-20">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div className="animate-fadeInUp text-left">
          <div className="inline-block mb-6 px-4 py-2 bg-[#0052ff]/20 border border-[#0052ff]/40 rounded-md">
            <p className="text-[#0052ff] text-xs font-bold tracking-widest uppercase">{lang === 'en' ? 'EST. 2011 • Trusted Experience' : 'ĮKURTA 2011 • Patikima patirtis'}</p>
          </div>
          <h1 className="text-4xl md:text-7xl lg:text-8xl font-black text-white mb-6 leading-[0.9] uppercase tracking-tighter">
            {t.hero.title1}<br />{t.hero.title2}<br /><span className="text-[#0052ff]">{t.hero.title3}</span><br />{t.hero.title4}
          </h1>
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
            <FileText className="h-8 w-8 text-[#0052ff] mb-4" /><p className="text-xl font-black text-white mb-1 uppercase">LIC-009666-EBKR</p><p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{lang === 'en' ? 'EU Transport License' : 'ES licencija'}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
))

const MapBlock = memo(({ t }: any) => (
  <section id="coverage" className="py-24 px-4 border-t border-white/5 bg-[#050a14]">
    <div className="max-w-7xl mx-auto text-center">
      <h2 className="text-4xl md:text-5xl font-black text-white mb-4 uppercase">{t.coverage.title}</h2>
      <p className="text-lg text-[#0052ff] font-black tracking-[0.3em] uppercase mb-16">Europe • Baltics • Global</p>
      <div className="relative h-[400px] md:h-[650px] rounded-[40px] overflow-hidden border border-[#0052ff]/30 shadow-2xl bg-black">
        <img src="/map-hub.jpg.png" className="absolute inset-0 w-full h-full object-cover opacity-90 pointer-events-none" />
        <svg className="absolute inset-0 w-full h-full z-10 pointer-events-none" viewBox="0 0 1000 600" preserveAspectRatio="xMidYMid slice">
          <path d="M 150,230 Q 300,100 485,205" stroke="rgba(0,82,255,0.5)" strokeWidth="2" fill="none" strokeDasharray="1, 50"><animate attributeName="stroke-dashoffset" from="300" to="0" dur="3s" repeatCount="indefinite" /></path>
          <path d="M 850,380 Q 650,250 485,205" stroke="rgba(0,82,255,0.5)" strokeWidth="2" fill="none" strokeDasharray="1, 50"><animate attributeName="stroke-dashoffset" from="300" to="0" dur="2.8s" repeatCount="indefinite" /></path>
        </svg>
        <div className="absolute bottom-6 left-8 bg-black/40 backdrop-blur-md px-4 py-2 rounded-lg border border-white/10 text-left"><p className="text-[10px] font-black text-[#0052ff] uppercase">Hub Status</p><p className="text-white text-xs font-bold uppercase">Operational</p></div>
        <div className="absolute bottom-6 right-8 bg-black/40 backdrop-blur-md px-4 py-2 rounded-lg border border-white/10 text-right"><p className="text-[10px] font-black text-[#0052ff] uppercase">Global Traffic</p><p className="text-white text-xs font-bold uppercase">Connected</p></div>
      </div>
    </div>
  </section>
))

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [lang, setLang] = useState<'en' | 'lt'>('en')
  const [isDark, setIsDark] = useState(true)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const isFocusing = useRef(false)

  const t = translations[lang]

  useEffect(() => {
    const handleScroll = () => { if (!isFocusing.current) setIsScrolled(window.scrollY > 50) }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark)
    document.documentElement.classList.toggle('light', !isDark)
  }, [isDark])

  const handleSubmit = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    setIsSubmitted(true);
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

  const bg = isDark ? 'bg-[#050a14]' : 'bg-gray-50'
  const textPrimary = isDark ? 'text-white' : 'text-gray-900'
  const textSecondary = isDark ? 'text-gray-400' : 'text-gray-600'
  const bgCard = isDark ? 'bg-[#0a1628]' : 'bg-white'
  const borderColor = isDark ? 'border-[#0052ff]/20' : 'border-gray-200'

  return (
    <div className={`min-h-screen ${bg} ${textPrimary} transition-colors duration-300 font-sans overflow-x-hidden`}>
      
      {/* NAVIGATION */}
      <nav className={`fixed w-full z-50 transition-all ${isScrolled ? 'bg-[#050a14]/95 backdrop-blur-md border-b border-white/5 h-16' : 'h-20'} flex items-center`}>
        <div className="max-w-7xl mx-auto px-6 w-full flex justify-between items-center">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
            <img src="/logo.png" className="h-10" />
            <span className="text-2xl font-black tracking-tighter uppercase">TERSIS</span>
          </div>
          <div className="hidden md:flex gap-8 items-center">
            {['services', 'fleet', 'about', 'contact'].map(s => (
              <button key={s} onClick={() => scrollTo(s)} className="text-[11px] font-black uppercase tracking-widest text-gray-400 hover:text-white transition-colors">{(t.nav as any)[s]}</button>
            ))}
            <div className="flex items-center gap-3 border-l border-white/10 pl-6">
              <button onClick={() => setLang(lang === 'en' ? 'lt' : 'en')} className="flex items-center gap-1.5 border border-white/20 px-3 py-1 rounded text-[10px] font-bold uppercase"><Languages size={14}/> {lang.toUpperCase()}</button>
              <button onClick={() => setIsDark(!isDark)} className="p-2 border border-white/20 rounded hover:bg-white/5">{isDark ? <Sun size={14}/> : <Moon size={14}/>}</button>
              <button onClick={() => scrollTo('contact')} className="bg-[#0052ff] text-white px-5 py-2 rounded font-bold text-xs uppercase tracking-widest">{t.nav.getQuote}</button>
            </div>
          </div>
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden"><Menu/></button>
        </div>
      </nav>

      <HeroBlock t={t} lang={lang} scrollToSection={scrollTo} />

      {/* FLEET */}
      <section id="fleet" className={`py-24 px-4 border-t ${borderColor}`}>
        <div className="max-w-7xl mx-auto text-center">
          <h2 className={`text-4xl md:text-5xl font-black ${textPrimary} mb-16 uppercase tracking-tight`}>{t.fleet.title}</h2>
          <div className="grid md:grid-cols-2 gap-10">
            <div className={`p-10 rounded-3xl border border-white/5 ${bgCard} text-left`}>
              <Truck className="text-[#0052ff] mb-6" size={40} /><h3 className="text-2xl font-black ${textPrimary} mb-4 uppercase">{t.fleet.standardClass}</h3>
              <p className="text-gray-400 text-sm mb-6 uppercase font-bold tracking-widest">92 m³ Capacity • 33 Euro Pallets • 13.6m</p>
              <p className="text-gray-500 italic text-xs pt-6 border-t border-white/5">{t.fleet.standardFooter}</p>
            </div>
            <div className={`p-10 rounded-3xl border border-[#0052ff]/30 ${bgCard} text-left`}>
              <Maximize2 className="text-[#0052ff] mb-6" size={40} /><h3 className="text-2xl font-black ${textPrimary} mb-4 uppercase text-[#0052ff]">{t.fleet.megaAdvantage}</h3>
              <p className="text-gray-400 text-sm mb-6 uppercase font-bold tracking-widest">105 m³ Capacity • 3.0m Height</p>
              <p className="text-gray-500 italic text-xs pt-6 border-t border-white/5">{t.fleet.megaFooter}</p>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10">
            {[{i:Shield,t:t.fleet.cmrInsured},{i:Clock,t:t.fleet.realTime},{i:Truck,t:t.fleet.modernFleet},{i:Check,t:t.fleet.euro6}].map((x,i)=>(<div key={i} className={`p-5 border border-white/5 ${bgCard} rounded-2xl`}><x.i className="text-blue-500 mx-auto mb-2" size={24}/><p className="text-[10px] font-black uppercase">{x.t}</p></div>))}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className={`py-24 px-4 border-t ${borderColor} text-center`}>
        <h2 className="text-4xl font-black mb-16 uppercase">{t.services.title}</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {t.services.items.map((s, i) => {
            const Icon = serviceIcons[i] || Truck
            return (
              <div key={i} className={`p-8 rounded-2xl border border-white/5 ${bgCard} hover:border-blue-500 transition-all group`}>
                <Icon className="text-blue-500 mb-4 mx-auto group-hover:scale-110 transition-transform" size={32} />
                <h4 className="font-black text-[10px] uppercase tracking-widest leading-tight">{s.title}</h4>
              </div>
            )
          })}
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className={`py-24 px-4 border-t ${borderColor} text-center`}>
        <div className="max-w-4xl mx-auto text-white">
          <h2 className="text-4xl font-black mb-8 uppercase">15+ Years Experience</h2>
          <p className="text-gray-400 text-lg leading-relaxed mb-12">TERSIS is a reliable logistics partner since 2011. Modern fleet of 27 Euro 6 vehicles. EU Licensed: <span className="text-white font-bold">LIC-009666-EBKR</span>.</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
             {['Own Fleet','CMR Insured','EU Network','24/7 Support','Secure','Expert Team','Full Docs','Trusted'].map((l, i) => (
               <div key={i} className={`p-4 ${bgCard} rounded-xl border border-white/5`}><p className="font-black text-[10px] uppercase text-white">{l}</p></div>
             ))}
          </div>
        </div>
      </section>

      <MapBlock t={t} />

      {/* CONTACT FORM (ВОССТАНОВЛЕНА 1:1) */}
      <section id="contact" className={`py-32 px-4 bg-[#050a14]`} onFocus={() => { isFocusing.current = true }} onBlur={() => { isFocusing.current = false }}>
        <div className="max-w-4xl mx-auto text-center">
           <h2 className="text-4xl font-black mb-12 uppercase">{t.contact.title}</h2>
           <div className="p-8 md:p-12 rounded-[40px] shadow-2xl border border-[#1A2C45]" style={{ background: '#0F1A2B' }}>
            <form onSubmit={handleSubmit} className="space-y-8 text-left" autoComplete="off">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-white">
                <div><label className="block text-[11px] font-black text-gray-500 uppercase tracking-widest mb-3">{t.contact.from}</label><input name="from" required placeholder={t.contact.placeholders.from} className="w-full px-5 py-4 bg-[#0a1628] rounded-xl border border-white/5 outline-none focus:border-blue-500 transition-colors" /></div>
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
              <div className="text-white"><label className="block text-[11px] font-black text-gray-500 uppercase tracking-widest mb-3">{t.contact.phone}</label><input name="phone" required placeholder={t.contact.placeholders.phone} className="w-full px-5 py-4 bg-[#0a1628] rounded-xl border border-white/5 outline-none focus:border-blue-500 transition-colors" /></div>
              <div className="text-white"><label className="block text-[11px] font-black text-gray-500 uppercase tracking-widest mb-3">{t.contact.message}</label><textarea name="message" rows={4} placeholder={t.contact.placeholders.message} className="w-full px-5 py-4 bg-[#0a1628] rounded-xl border border-white/5 outline-none focus:border-blue-500 transition-colors resize-none" /></div>
              <button type="submit" disabled={isSubmitted} className="w-full py-6 bg-[#0052ff] hover:bg-[#003dd6] text-white font-black rounded-2xl text-xs tracking-[0.3em] uppercase transition-all disabled:opacity-50">
                {isSubmitted ? 'SENT SUCCESS' : 'REQUEST QUOTE IN 24H'}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* FOOTER (ПОЛНЫЙ) */}
      <footer className={`${bg} border-t ${borderColor} py-20 px-6`}>
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-16 text-left">
          <div className="space-y-6">
            <div className="flex items-center gap-2"><img src="/logo.png" className="h-8"/><span className="text-xl font-bold uppercase tracking-tighter">TERSIS</span></div>
            <p className="text-gray-500 text-sm leading-relaxed">Your reliable logistics hub for European transport solutions. Own fleet of 27 Euro 6 vehicles and MEGA trailers specialist.</p>
          </div>
          <div className="space-y-6">
            <h4 className="text-white font-black text-xs uppercase tracking-widest">Office HQ</h4>
            <div className="text-gray-500 text-sm space-y-3">
              <p className="flex items-start gap-3"><MapPin size={16} className="text-[#0052ff]"/> Taikos pr. 141-305, Kaunas, Lithuania</p>
              <p className="flex items-start gap-3"><Phone size={16} className="text-[#0052ff]"/> +370 65 955 956</p>
              <p className="flex items-start gap-3"><Mail size={16} className="text-[#0052ff]"/> info@tersis.lt</p>
            </div>
          </div>
          <div className="space-y-6">
            <h4 className="text-white font-black text-xs uppercase tracking-widest">Legal</h4>
            <div className="text-gray-600 text-xs font-bold space-y-2">
              <p>EU License: LIC-009666-EBKR</p>
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
