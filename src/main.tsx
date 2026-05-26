import React, { useState, useEffect, useCallback, memo, useRef, useMemo } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import {
  Truck, ArrowRight, Check, Shield, Clock, Menu, X, Phone, Mail, MapPin, 
  Zap, Globe, Lock, AlertTriangle, Handshake, Users, FileText, Home, 
  Maximize2, Sun, Moon, Languages
} from 'lucide-react'

// --- ДАННЫЕ ВШИТЫ (Защита от белого экрана) ---
const translations: any = {
  en: {
    nav: { services: 'SERVICES', fleet: 'FLEET', about: 'ABOUT', coverage: 'COVERAGE', contact: 'CONTACT', getQuote: 'GET QUOTE' },
    hero: { title1: 'OWN FLEET.', title2: 'DIRECT IMPACT.', title3: 'EUROPEAN', title4: 'LOGISTICS.', desc: 'We operate a fleet of 27+ modern Euro 6 vehicles, specializing in high-capacity MEGA trailers.' },
    fleet: { title: 'FLEET SPECIFICATIONS', subtitle: 'Technical excellence for every shipment', std: 'STANDARD CLASS', mega: 'MEGA ADVANTAGE', capacity: 'Capacity' },
    services: { title: 'OUR SERVICES', subtitle: 'INTEGRATED TRANSPORT & LOGISTICS SOLUTIONS', items: [{title:'FTL / LTL Transport', subtitle: 'Full loads'}, {title:'International Logistics', subtitle: 'Global'}, {title:'Secure Storage', subtitle: 'Warehousing'}, {title:'Express Delivery', subtitle: 'Fast'}, {title:'Fast Customs', subtitle: 'Brokerage'}, {title:'Documentation', subtitle: 'Compliance'}, {title:'Partnership Hub', subtitle: 'Network'}, {title:'Expert Team', subtitle: '15+ Years'}] },
    about: { title: 'ABOUT TERSIS', subtitle: 'Your trusted partner since 2011' },
    contact: { title: 'REQUEST A QUOTE', subtitle: 'Get a professional offer within 24 hours', from: 'FROM (COUNTRY/CITY)', to: 'TO (COUNTRY/CITY)', cargoType: 'CARGO TYPE', weight: 'WEIGHT (KG)', volume: 'VOLUME (M³)', name: 'NAME', email: 'EMAIL', phone: 'PHONE', message: 'MESSAGE (OPTIONAL)', submitted: 'SENT SUCCESSFULLY', placeholders: { from: 'Kaunas, Lithuania', to: 'Berlin, Germany', cargoType: 'Electronics...', weight: '5000', volume: '10', name: 'John Doe', email: 'john@company.com', message: 'Details...' } }
  }
};

const serviceIcons = [Truck, Globe, AlertTriangle, Zap, Clock, Home, FileText, Shield]

// --- ИЗОЛЯЦИЯ ТЯЖЕЛЫХ БЛОКОВ ---
const MemoHero = memo(({ t, scrollTo }: any) => (
  <section className="relative h-screen flex items-center px-4 sm:px-6 lg:px-8 overflow-hidden bg-[#050a14]">
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
          {t.hero.title1}<br/>{t.hero.title2}<br/><span className="text-[#0052ff]">{t.hero.title3}</span><br/>{t.hero.title4}
        </h1>
        <p className="text-gray-300 text-lg mb-10 max-w-lg leading-relaxed">{t.hero.desc}</p>
        <div className="flex gap-4">
          <button onClick={() => scrollTo('contact')} className="bg-[#0052ff] text-white px-8 py-4 rounded font-bold text-xs uppercase tracking-widest hover:bg-[#003dd6] transition-all shadow-xl">GET QUOTE <ArrowRight size={16} className="inline ml-1"/></button>
        </div>
      </div>
      <div className="hidden md:flex flex-col gap-6 items-end">
        <div className="bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-2xl w-64 text-center">
          <Truck className="text-[#0052ff] mb-4 mx-auto" size={32}/><p className="text-5xl font-black text-white mb-1 uppercase">27+</p><p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Own Vehicles</p>
        </div>
        <div className="bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-2xl w-64 text-center">
          <FileText className="text-[#0052ff] mb-4 mx-auto" size={32}/><p className="text-xl font-black text-white uppercase tracking-tight">LIC-009666-EBKR</p>
        </div>
      </div>
    </div>
  </section>
))

export const Route = createFileRoute('/')({
  component: TersisApp,
})

function TersisApp() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [lang, setLang] = useState<Lang>('en')
  const [isSubmitted, setIsSubmitted] = useState(false)
  const isFocusing = useRef(false)
  const t = translations.en

  useEffect(() => {
    const handleScroll = () => {
      if (isFocusing.current) return;
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleSubmit = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitted(true);
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    try {
      await fetch('/send.php', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
      form.reset();
      setTimeout(() => setIsSubmitted(false), 4000);
    } catch (error) { setIsSubmitted(false); }
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
        <div className="max-w-7xl mx-auto px-6 w-full flex justify-between items-center text-white">
          <div className="flex items-center gap-2 cursor-pointer group" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
            <img src="https://tersis.lt/logo.png" className="h-10 transition-transform group-hover:scale-110" />
            <span className="text-2xl font-black tracking-tighter uppercase ml-2">TERSIS</span>
          </div>
          <div className="hidden md:flex gap-8 items-center text-[10px] font-bold uppercase tracking-widest text-gray-400">
            {['services', 'fleet', 'about', 'contact'].map(s => <button key={s} onClick={() => scrollTo(s)} className="hover:text-white transition-colors">{s}</button>)}
            <button onClick={() => scrollTo('contact')} className="bg-[#0052ff] text-white px-5 py-2 rounded font-black hover:bg-[#003dd6]">GET QUOTE</button>
          </div>
        </div>
      </nav>

      <MemoHero t={t} scrollTo={scrollTo} />

      {/* FLEET */}
      <section id="fleet" className="py-24 px-6 bg-[#050a14] border-t border-white/5 text-center">
        <h2 className="text-5xl font-black mb-16 uppercase tracking-tight">{t.fleet.title}</h2>
        <div className="grid md:grid-cols-2 gap-10 max-w-7xl mx-auto">
          <div className="p-10 rounded-3xl border border-white/5 bg-[#0a1628] text-left">
            <Truck className="text-[#0052ff] mb-6" size={40} /><h3 className="text-3xl font-black mb-4 uppercase">{t.fleet.std}</h3>
            <p className="text-gray-400 text-sm">92 m³ Capacity • 33 Euro Pallets • 13.6 m</p>
          </div>
          <div className="p-10 rounded-3xl border border-[#0052ff]/30 bg-[#0a1628] text-left">
            <Maximize2 className="text-[#0052ff] mb-6" size={40} /><h3 className="text-3xl font-black mb-4 uppercase text-[#0052ff]">{t.fleet.mega}</h3>
            <p className="text-gray-400 text-sm">105 m³ Capacity • 3.0 m Height</p>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="py-24 px-6 bg-[#0a1628] border-y border-white/5 text-center">
        <h2 className="text-5xl font-black mb-16 uppercase text-white">{t.services.title}</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {t.services.items.map((s:any, i:number) => {
            const Icon = serviceIcons[i] || Truck;
            return (
              <div key={i} className="p-8 rounded-3xl border border-white/5 bg-[#050a14] hover:border-[#0052ff] transition-all group">
                <Icon className="text-[#0052ff] mb-4 mx-auto group-hover:scale-110 transition-transform" size={32} />
                <h4 className="font-black text-[10px] uppercase tracking-widest text-white leading-tight">{s.title}</h4>
              </div>
            )
          })}
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-24 px-6 bg-[#050a14] border-t border-white/5 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-black mb-10 uppercase">{t.about.title}</h2>
          <p className="text-gray-400 text-lg leading-relaxed mb-12">TERSIS is a reliable logistics partner since 2011. License: <span className="text-white font-bold">LIC-009666-EBKR</span>.</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
             {['Own Fleet','CMR Insured','EU Network','24/7 Support','Secure','Expert Team','Full Docs','Trusted'].map((l, i) => (
               <div key={i} className="p-4 bg-[#0a1628] rounded-xl border border-white/5 font-black text-[10px] uppercase text-white">{l}</div>
             ))}
          </div>
        </div>
      </section>

      {/* CONTACT (ВОССТАНОВЛЕНА 1:1) */}
      <section id="contact" className="py-32 px-6 bg-[#050a14]" onFocus={() => { isFocusing.current = true }} onBlur={() => { isFocusing.current = false }}>
        <div className="max-w-4xl mx-auto">
          <div className="p-8 md:p-16 rounded-[40px] shadow-2xl border border-[#1A2C45] bg-[#0F1A2B]" style={{ contain: 'layout paint' }}>
            <form onSubmit={handleSubmit} className="space-y-8 text-left" autoComplete="off">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-white">
                <div><label className="block text-[11px] font-black text-gray-500 uppercase tracking-widest mb-3">FROM (COUNTRY/CITY)</label><input name="from" required placeholder="Kaunas, Lithuania" className="w-full px-6 py-4 bg-[#0a1628] border border-white/5 rounded-xl text-sm outline-none focus:border-blue-500" /></div>
                <div><label className="block text-[11px] font-black text-gray-500 uppercase tracking-widest mb-3">TO (COUNTRY/CITY)</label><input name="to" required placeholder="Berlin, Germany" className="w-full px-6 py-4 bg-[#0a1628] border border-white/5 rounded-xl text-sm outline-none focus:border-blue-600" /></div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-white">
                <div><label className="block text-[11px] font-black text-gray-500 uppercase tracking-widest mb-3">CARGO TYPE</label><input name="cargoType" placeholder="Electronics..." className="w-full px-6 py-4 bg-[#0a1628] border border-white/5 rounded-xl text-sm outline-none focus:border-blue-600" /></div>
                <div><label className="block text-[11px] font-black text-gray-500 uppercase tracking-widest mb-3">WEIGHT (KG)</label><input name="weight" placeholder="5000" className="w-full px-6 py-4 bg-[#0a1628] border border-white/5 rounded-xl text-sm outline-none focus:border-blue-600" /></div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-white">
                <div><label className="block text-[11px] font-black text-gray-500 uppercase tracking-widest mb-3">VOLUME (M³)</label><input name="volume" placeholder="10" className="w-full px-6 py-4 bg-[#0a1628] border border-white/5 rounded-xl text-sm outline-none focus:border-blue-600" /></div>
                <div><label className="block text-[11px] font-black text-gray-500 uppercase tracking-widest mb-3">NAME</label><input name="name" required placeholder="John Doe" className="w-full px-6 py-4 bg-[#0a1628] border border-white/5 rounded-xl text-sm outline-none focus:border-blue-600" /></div>
              </div>
              <div className="text-white space-y-2"><label className="block text-[11px] font-black text-gray-500 uppercase tracking-widest">EMAIL ADDRESS</label><input name="email" type="email" required placeholder="john@company.com" className="w-full px-6 py-4 bg-[#0a1628] border border-white/5 rounded-xl text-sm outline-none focus:border-blue-600" /></div>
              <button type="submit" disabled={isSubmitted} className="w-full py-6 bg-[#0052ff] text-white font-black rounded-2xl uppercase tracking-widest transition-all shadow-xl shadow-blue-600/20 disabled:opacity-50">
                {isSubmitted ? 'SENT SUCCESS' : 'REQUEST QUOTE IN 24H'}
              </button>
            </form>
          </div>
        </div>
      </section>

      <footer className="py-20 bg-[#050a14] border-t border-white/5 text-center px-4 text-gray-600 text-[10px] font-bold uppercase tracking-widest leading-loose">
        <p>Taikos pr. 141-305, Kaunas, Lithuania | info@tersis.lt | © 2026 TERSIS. All rights reserved.</p>
      </footer>
    </div>
  )
}
