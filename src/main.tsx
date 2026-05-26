import React, { useState, useEffect, useCallback, memo, useRef } from 'react'
import ReactDOM from 'react-dom/client'
import {
  Truck, ArrowRight, Check, Shield, Clock, Menu, X, Phone, Mail, MapPin, 
  Zap, Globe, Lock, AlertTriangle, Handshake, Users, FileText, Maximize2, Sun, Moon, Languages
} from 'lucide-react'
import { translations } from './lib/i18n' 
import './styles.css'

const serviceIcons = [Truck, Globe, AlertTriangle, Zap, Clock, Home, FileText, Shield]

const HeroSection = memo(({ t, scrollTo }: any) => (
  <section className="relative h-screen flex items-center px-6 overflow-hidden bg-[#050a14]">
    <div className="absolute inset-0 z-0 pointer-events-none">
      <video autoPlay muted loop playsInline className="w-full h-full object-cover opacity-40">
        <source src="/hero-video.mp4.mp4" type="video/mp4" />
      </video>
    </div>
    <div className="absolute inset-0 bg-black/60 z-10 pointer-events-none" />
    <div className="max-w-7xl mx-auto w-full relative z-20 grid md:grid-cols-2 gap-12 items-center">
      <div className="animate-fadeInUp text-left">
        <div className="inline-block mb-6 px-4 py-2 bg-[#0052ff]/20 border border-[#0052ff]/40 rounded text-[#0052ff] text-xs font-bold tracking-widest uppercase">EST. 2011 • TRUSTED EXPERIENCE</div>
        <h1 className="text-5xl md:text-8xl font-black text-white mb-6 leading-none uppercase tracking-tighter">
          OWN FLEET.<br />DIRECT IMPACT.<br /><span className="text-[#0052ff]">EUROPEAN</span><br />LOGISTICS.
        </h1>
        <div className="flex gap-4">
          <button onClick={() => scrollTo('contact')} className="bg-[#0052ff] text-white px-8 py-4 rounded font-bold text-xs uppercase tracking-widest hover:bg-[#003dd6] transition-all shadow-xl">GET QUOTE <ArrowRight size={16} className="ml-1 inline"/></button>
        </div>
      </div>
      <div className="hidden md:flex flex-col gap-6 items-end">
        <div className="bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-2xl w-64 text-center">
          <Truck className="text-[#0052ff] mb-4 mx-auto" size={32}/><p className="text-4xl font-black text-white">27+</p><p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Own Vehicles</p>
        </div>
        <div className="bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-2xl w-64 text-center">
          <FileText className="text-[#0052ff] mb-4 mx-auto" size={32}/><p className="text-xl font-black text-white uppercase tracking-tight">LIC-009666-EBKR</p>
        </div>
      </div>
    </div>
  </section>
))

const App = () => {
  const [lang, setLang] = useState<'en' | 'lt'>('en');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const isFocusing = useRef(false);
  const t = translations[lang];

  useEffect(() => {
    const handleScroll = () => { if (!isFocusing.current) setIsScrolled(window.scrollY > 50) }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, []);

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

  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <div className="min-h-screen bg-[#050a14] text-white">
      {/* NAV */}
      <nav className={`fixed w-full z-50 p-6 transition-all ${isScrolled ? 'bg-[#050a14]/95 backdrop-blur-md border-b border-white/5 h-16' : 'h-20'} flex items-center`}>
        <div className="max-w-7xl mx-auto px-6 w-full flex justify-between items-center">
          <div className="flex items-center cursor-pointer group" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
            <img src="https://tersis.lt/logo.png" className="h-10" />
            <span className="text-2xl font-black tracking-tighter uppercase ml-2">TERSIS</span>
          </div>
          <div className="hidden md:flex gap-8 items-center text-[10px] font-bold uppercase tracking-widest text-gray-400">
            {['services', 'fleet', 'contact'].map(s => <button key={s} onClick={() => scrollTo(s)} className="hover:text-white transition-colors">{s.toUpperCase()}</button>)}
            <button onClick={() => setLang(lang === 'en' ? 'lt' : 'en')} className="border border-white/20 px-3 py-1 rounded text-white">{lang.toUpperCase()}</button>
          </div>
        </div>
      </nav>

      <HeroSection t={t} lang={lang} scrollTo={scrollTo} />

      {/* FLEET */}
      <section id="fleet" className="py-24 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl md:text-6xl font-black mb-16 uppercase">Fleet Specifications</h2>
          <div className="grid md:grid-cols-2 gap-10">
            <div className="p-10 rounded-3xl border border-white/5 bg-[#0a1628] text-left">
              <Truck className="text-[#0052ff] mb-6" size={40} /><h3 className="text-2xl font-black mb-4 uppercase">Standard Class</h3>
              <p className="text-gray-400 text-sm">92 m³ • 33 Euro Pallets • 13.6 m</p>
            </div>
            <div className="p-10 rounded-3xl border border-[#0052ff]/30 bg-[#0a1628] text-left">
              <Maximize2 className="text-[#0052ff] mb-6" size={40} /><h3 className="text-2xl font-black mb-4 uppercase text-[#0052ff]">Mega Advantage</h3>
              <p className="text-gray-400 text-sm">105 m³ • 3.0 m Height • MEGA</p>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="py-24 px-6 border-t border-white/5 text-center">
        <h2 className="text-4xl font-black mb-16 uppercase">Services</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {serviceIcons.map((Icon, i) => (
            <div key={i} className="p-8 rounded-2xl border border-white/5 bg-[#0a1628] hover:border-[#0052ff] transition-all">
              <Icon className="text-[#0052ff] mb-4 mx-auto" size={32} />
              <h4 className="font-black text-[10px] uppercase">Service {i+1}</h4>
            </div>
          ))}
        </div>
      </section>

      {/* CONTACT (ИЗОЛИРОВАНА) */}
      <section id="contact-section-isolated" className="py-32 px-6 bg-[#050a14]" 
               onFocus={() => { isFocusing.current = true }} 
               onBlur={() => { isFocusing.current = false }}>
        <div className="max-w-4xl mx-auto">
          <div className="p-8 md:p-12 rounded-[32px] border border-[#1A2C45] shadow-2xl bg-[#0F1A2B]">
            <form onSubmit={handleSubmit} className="space-y-6" autoComplete="off">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-white">
                <div><label className="block text-[11px] font-black text-[#8899BB] uppercase tracking-widest mb-3">FROM (COUNTRY/CITY)</label><input name="from" required placeholder="Kaunas, Lithuania" className="w-full px-6 py-4 bg-[#0a1628] border border-white/5 rounded-xl outline-none focus:border-blue-600" /></div>
                <div><label className="block text-[11px] font-black text-[#8899BB] uppercase tracking-widest mb-3">TO (COUNTRY/CITY)</label><input name="to" required placeholder="Berlin, Germany" className="w-full px-6 py-4 bg-[#0a1628] border border-white/5 rounded-xl outline-none focus:border-blue-600" /></div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-white">
                <div><label className="block text-[11px] font-black text-[#8899BB] uppercase tracking-widest mb-3">CARGO TYPE</label><input name="cargoType" placeholder="Electronics..." className="w-full px-6 py-4 bg-[#0a1628] border border-white/5 rounded-xl outline-none focus:border-blue-600" /></div>
                <div><label className="block text-[11px] font-black text-[#8899BB] uppercase tracking-widest mb-3">WEIGHT (KG)</label><input name="weight" placeholder="5000" className="w-full px-6 py-4 bg-[#0a1628] border border-white/5 rounded-xl outline-none focus:border-blue-600" /></div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-white">
                <div><label className="block text-[11px] font-black text-[#8899BB] uppercase tracking-widest mb-3">VOLUME (M³)</label><input name="volume" placeholder="10" className="w-full px-6 py-4 bg-[#0a1628] border border-white/5 rounded-xl outline-none focus:border-blue-600" /></div>
                <div><label className="block text-[11px] font-black text-[#8899BB] uppercase tracking-widest mb-3">NAME</label><input name="name" required placeholder="John Doe" className="w-full px-6 py-4 bg-[#0a1628] border border-white/5 rounded-xl outline-none focus:border-blue-600" /></div>
              </div>
              <div className="text-white space-y-2"><label className="block text-[11px] font-black text-[#8899BB] uppercase tracking-widest">EMAIL</label><input name="email" type="email" required placeholder="john@company.com" className="w-full px-6 py-4 bg-[#0a1628] border border-white/5 rounded-xl outline-none focus:border-blue-600" /></div>
              <button type="submit" disabled={isSubmitted} className="w-full py-6 bg-[#0052ff] text-white font-black rounded-2xl uppercase tracking-widest">
                {isSubmitted ? 'SENT SUCCESS' : 'REQUEST QUOTE IN 24H'}
              </button>
            </form>
          </div>
        </div>
      </section>

      <footer className="py-20 bg-[#050a14] border-t border-white/5 text-center px-4 text-gray-600 text-[10px] font-bold uppercase tracking-widest">
        <p>Taikos pr. 141-305, Kaunas, Lithuania | © 2026 TERSIS</p>
      </footer>
    </div>
  )
}

const rootElement = document.getElementById('root')!
ReactDOM.createRoot(rootElement).render(<App />)
