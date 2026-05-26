import React, { useState, useEffect, useCallback, memo, useRef } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import {
  Truck, ArrowRight, Check, Shield, Clock, Menu, X, Phone, Mail, MapPin, 
  Zap, Globe, Lock, AlertTriangle, Handshake, Users, FileText, Maximize2, Sun, Moon, Languages
} from 'lucide-react'

// --- ВШИТЫЕ ПЕРЕВОДЫ (Защита от белого экрана) ---
const localTranslations: any = {
  en: {
    nav: { services: 'SERVICES', fleet: 'FLEET', about: 'ABOUT', coverage: 'COVERAGE', contact: 'CONTACT', getQuote: 'GET QUOTE' },
    hero: { title1: 'OWN FLEET.', title2: 'DIRECT IMPACT.', title3: 'EUROPEAN', title4: 'LOGISTICS.', desc: 'We operate a fleet of 27+ modern Euro 6 vehicles, specializing in high-capacity MEGA trailers (105 m³).' },
    fleet: { title: 'FLEET SPECIFICATIONS', subtitle: 'Technical excellence for every shipment', std: 'STANDARD CLASS', mega: 'MEGA ADVANTAGE' },
    services: { title: 'OUR SERVICES', subtitle: 'INTEGRATED TRANSPORT & LOGISTICS SOLUTIONS' },
    about: { title: 'ABOUT TERSIS', subtitle: 'Your trusted European logistics partner since 2011' },
    contact: { title: 'REQUEST A QUOTE', subtitle: 'Get a professional offer within 24 hours' }
  }
};

const serviceIcons = [Truck, Globe, AlertTriangle, Zap, Clock, Maximize2, FileText, Shield]

// --- ИЗОЛЯЦИЯ: ВИДЕО ---
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
        <div className="inline-block mb-6 px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded text-blue-500 text-[10px] font-bold tracking-widest uppercase">EST. 2011 • TRUSTED EXPERIENCE</div>
        <h1 className="text-6xl md:text-8xl font-black text-white leading-[0.85] uppercase mb-8 tracking-tighter">
          OWN FLEET.<br/>DIRECT IMPACT.<br/><span className="text-blue-600">EUROPEAN</span><br/>LOGISTICS.
        </h1>
        <div className="flex gap-4">
          <button onClick={() => scrollTo('contact')} className="bg-blue-600 text-white px-8 py-4 rounded font-bold text-xs uppercase tracking-widest hover:bg-blue-700 transition-all shadow-xl">GET QUOTE <ArrowRight size={16} className="inline ml-1"/></button>
          <button onClick={() => scrollTo('fleet')} className="border border-white/20 text-white px-8 py-4 rounded font-bold text-xs uppercase tracking-widest hover:bg-white/5 transition-all">FLEET DETAILS</button>
        </div>
      </div>
      <div className="hidden md:flex flex-col gap-6 items-end">
        <div className="bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-2xl w-64 text-center">
          <Truck className="text-blue-600 mb-4 mx-auto" size={32}/><p className="text-4xl font-black text-white">27+</p><p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Own Vehicles</p>
        </div>
        <div className="bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-2xl w-64 text-center">
          <FileText className="text-blue-600 mb-4 mx-auto" size={32}/><p className="text-xl font-black text-white uppercase">LIC-009666-EBKR</p><p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">EU License</p>
        </div>
      </div>
    </div>
  </section>
));

export const Route = createFileRoute('/')({
  component: TersisApp,
})

function TersisApp() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const isFocusing = useRef(false)
  const t = localTranslations.en // Используем вшитые переводы для теста

  useEffect(() => {
    const handleScroll = () => { if (!isFocusing.current) setIsScrolled(window.scrollY > 50) }
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
    <div className="min-h-screen bg-[#050a14] text-white font-sans antialiased overflow-x-hidden">
      
      {/* NAVIGATION */}
      <nav className={`fixed w-full z-50 p-6 transition-all ${isScrolled ? 'bg-[#050a14]/95 backdrop-blur-md border-b border-white/5 h-16' : 'h-20'} flex items-center`}>
        <div className="max-w-7xl mx-auto px-4 w-full flex justify-between items-center">
          <div className="flex items-center gap-2 cursor-pointer group" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
            <img src="/logo.png" className="h-10 transition-transform group-hover:scale-110" />
            <span className="text-2xl font-black tracking-tighter uppercase">TERSIS</span>
          </div>
          <div className="hidden md:flex gap-8 items-center text-[10px] font-bold uppercase tracking-widest text-gray-400">
            {['services', 'fleet', 'contact'].map(s => <button key={s} onClick={() => scrollTo(s)} className="hover:text-white transition-colors">{s}</button>)}
            <button onClick={() => scrollTo('contact')} className="bg-blue-600 text-white px-5 py-2 rounded font-black">GET QUOTE</button>
          </div>
        </div>
      </nav>

      <HeroSection t={t} scrollTo={scrollTo} />

      {/* FLEET */}
      <section id="fleet" className="py-32 px-8 bg-[#050a14] border-t border-white/5">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-5xl md:text-7xl font-black mb-4 uppercase tracking-tighter">{t.fleet.title}</h2>
          <p className="text-gray-500 font-bold uppercase tracking-widest mb-20">{t.fleet.subtitle}</p>
          <div className="grid md:grid-cols-2 gap-10 text-left">
            <div className="p-10 rounded-[40px] border border-white/5 bg-[#0a1628]">
              <Truck className="text-blue-600 mb-8" size={40} /><h3 className="text-3xl font-black mb-4 uppercase">{t.fleet.std}</h3>
              <p className="text-gray-400 text-sm mb-10">92 m³ Capacity • 33 Euro Pallets • 13.6m</p>
              <p className="text-gray-500 italic text-xs pt-6 border-t border-white/5">{t.fleet.standardFooter}</p>
            </div>
            <div className="p-10 rounded-[40px] border border-blue-600/20 bg-[#0a1628]">
              <Maximize2 className="text-blue-600 mb-8" size={40} /><h3 className="text-3xl font-black mb-4 uppercase text-blue-500">{t.fleet.mega}</h3>
              <p className="text-gray-400 text-sm mb-10">105 m³ Capacity • 3.0m Internal Height</p>
              <p className="text-gray-500 italic text-xs pt-6 border-t border-white/5">{t.fleet.megaFooter}</p>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES (8 КАРТОЧЕК) */}
      <section id="services" className="py-32 px-8 bg-[#0a1628] border-y border-white/5 text-center">
        <h2 className="text-5xl md:text-7xl font-black mb-20 uppercase tracking-tighter">OUR SERVICES</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {['FTL / LTL', 'GLOBAL', 'SECURE', 'EXPRESS', 'CUSTOMS', 'DOCS', 'PARTNER', 'EXPERTS'].map((title, i) => (
            <div key={i} className="p-8 bg-[#050a14] rounded-3xl border border-white/5 hover:border-blue-600 transition-all group">
              <Globe className="text-blue-600 mb-4 mx-auto group-hover:scale-110 transition-transform" size={32} />
              <h4 className="font-black text-[10px] uppercase tracking-widest text-white">{title}</h4>
            </div>
          ))}
        </div>
      </section>

      {/* MAP */}
      <section id="coverage" className="py-32 px-8 bg-[#050a14] text-center">
        <h2 className="text-5xl font-black mb-16 uppercase tracking-tighter">GLOBAL COVERAGE</h2>
        <div className="relative h-[400px] md:h-[650px] rounded-[40px] overflow-hidden bg-black max-w-7xl mx-auto border border-blue-600/30">
          <img src="/map-hub.jpg.png" className="absolute inset-0 w-full h-full object-cover opacity-80 pointer-events-none" />
        </div>
      </section>

      {/* CONTACT (9 ПОЛЕЙ) */}
      <section id="contact" className="py-32 px-8 bg-[#050a14]" onFocus={() => { isFocusing.current = true }} onBlur={() => { isFocusing.current = false }}>
        <div className="max-w-4xl mx-auto">
          <div className="p-8 md:p-16 rounded-[40px] shadow-2xl border border-[#1A2C45] bg-[#0F1A2B]" style={{ contain: 'layout paint' }}>
            <form onSubmit={handleSubmit} className="space-y-8" autoComplete="off">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-white text-left">
                <div className="space-y-2"><label className="text-[11px] font-black text-gray-500 uppercase tracking-widest">{t.contact.from}</label><input name="from" required placeholder="Kaunas, Lithuania" className="w-full px-6 py-4 rounded-xl text-sm outline-none focus:border-blue-600 bg-[#0a1628]" /></div>
                <div className="space-y-2"><label className="text-[11px] font-black text-gray-500 uppercase tracking-widest">{t.contact.to}</label><input name="to" required placeholder="Berlin, Germany" className="w-full px-6 py-4 rounded-xl text-sm outline-none focus:border-blue-600 bg-[#0a1628]" /></div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-white text-left">
                <div className="space-y-2"><label className="text-[11px] font-black text-gray-500 uppercase tracking-widest">{t.contact.cargoType}</label><input name="cargoType" placeholder="Electronics..." className="w-full px-6 py-4 rounded-xl text-sm outline-none focus:border-blue-600 bg-[#0a1628]" /></div>
                <div className="space-y-2"><label className="text-[11px] font-black text-gray-500 uppercase tracking-widest">{t.contact.weight}</label><input name="weight" placeholder="5000" className="w-full px-6 py-4 rounded-xl text-sm outline-none focus:border-blue-600 bg-[#0a1628]" /></div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-white text-left">
                <div className="space-y-2"><label className="text-[11px] font-black text-gray-500 uppercase tracking-widest">{t.contact.volume}</label><input name="volume" placeholder="10" className="w-full px-6 py-4 rounded-xl text-sm outline-none focus:border-blue-600 bg-[#0a1628]" /></div>
                <div className="space-y-2"><label className="text-[11px] font-black text-gray-500 uppercase tracking-widest">{t.contact.name}</label><input name="name" required placeholder="John Doe" className="w-full px-6 py-4 rounded-xl text-sm outline-none focus:border-blue-600 bg-[#0a1628]" /></div>
              </div>
              <div className="text-white text-left space-y-2"><label className="text-[11px] font-black text-gray-500 uppercase tracking-widest">{t.contact.email}</label><input name="email" type="email" required placeholder="john@company.com" className="w-full px-6 py-4 rounded-xl text-sm outline-none focus:border-blue-600 bg-[#0a1628]" /></div>
              <button type="submit" disabled={isSubmitted} className="w-full py-6 bg-blue-600 text-white font-black rounded-2xl text-xs tracking-[0.3em] uppercase transition-all shadow-xl shadow-blue-600/20 disabled:opacity-50">
                {isSubmitted ? 'SENT SUCCESS' : 'REQUEST QUOTE IN 24H'}
              </button>
            </form>
          </div>
        </div>
      </section>

      <footer className="py-20 bg-[#050a14] border-t border-white/5 text-center px-4 text-gray-600 text-[10px] font-bold uppercase tracking-widest">
        <p>Taikos pr. 141-305, Kaunas, Lithuania | info@tersis.lt | © 2026 TERSIS. All rights reserved.</p>
      </footer>
    </div>
  )
}
