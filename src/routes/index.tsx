import React, { useState, useEffect, useCallback, memo } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import {
  Truck, ArrowRight, Check, Shield, Clock, Menu, X, Phone, Mail, MapPin, 
  Zap, Globe, Lock, AlertTriangle, Handshake, Users, FileText, Home, Maximize2
} from 'lucide-react'
import { translations, type Lang } from '@/lib/i18n'

// --- ИЗОЛЯЦИЯ: ВИДЕО (Чтобы не вешало сайт при фокусе) ---
const MemoHeroVideo = memo(() => (
  <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
    <video autoPlay muted loop playsInline preload="auto" className="absolute inset-0 w-full h-full object-cover opacity-60">
      <source src="/hero-video.mp4.mp4" type="video/mp4" />
    </video>
    <div className="absolute inset-0 bg-black/40" />
  </div>
))

// --- ИЗОЛЯЦИЯ: КАРТА ---
const MemoMap = memo(() => (
  <div className="relative h-[400px] md:h-[650px] rounded-[30px] md:rounded-[40px] overflow-hidden border border-[#0052ff]/30 shadow-2xl bg-black">
    <img src="/map-hub.jpg.png" className="absolute inset-0 w-full h-full object-cover opacity-80 pointer-events-none" />
    <svg className="absolute inset-0 w-full h-full z-10 pointer-events-none" viewBox="0 0 1000 600" preserveAspectRatio="xMidYMid slice">
      <path d="M 150,230 Q 300,100 485,205" stroke="rgba(0,82,255,0.4)" strokeWidth="2" fill="none" strokeDasharray="1, 50">
        <animate attributeName="stroke-dashoffset" from="300" to="0" dur="3s" repeatCount="indefinite" />
      </path>
    </svg>
  </div>
))

export const Route = createFileRoute('/')({ component: TersisApp })

const serviceIcons = [Truck, Globe, AlertTriangle, Zap, Clock, Home, FileText, Shield]

function TersisApp() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [lang, setLang] = useState<Lang>('en')
  const [isSubmitted, setIsSubmitted] = useState(false)
  const t = translations[lang]

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleSubmit = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    setIsSubmitted(true);
    fetch('/send.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }).finally(() => {
      form.reset();
      setTimeout(() => setIsSubmitted(false), 3000);
    });
  }, []);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  }

  return (
    <div className="min-h-screen bg-[#050a14] text-white overflow-x-hidden">
      
      {/* ─── NAVIGATION ─── */}
      <nav className={`fixed w-full z-50 transition-all ${isScrolled ? 'bg-[#050a14]/98 border-b border-white/5 backdrop-blur-md' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center h-20">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo({top:0, behavior:'smooth'})}>
            <img src="/logo.png" className="h-10" />
            <span className="text-2xl font-black tracking-tighter">TERSIS</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            {['services', 'fleet', 'about', 'contact'].map((s) => (
              <button key={s} onClick={() => scrollToSection(s)} className="text-gray-400 hover:text-white text-xs font-bold uppercase tracking-widest transition-colors">{t.nav[s as keyof typeof t.nav]}</button>
            ))}
            <button onClick={() => setLang(lang === 'en' ? 'lt' : 'en')} className="border border-white/20 px-3 py-1 rounded text-xs font-bold uppercase">{lang}</button>
            <button onClick={() => scrollToSection('contact')} className="bg-[#0052ff] px-6 py-2.5 rounded-lg font-bold text-xs uppercase tracking-widest hover:bg-[#003dd6] transition-colors">{t.nav.getQuote}</button>
          </div>
          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>{isMenuOpen ? <X size={28}/> : <Menu size={28}/>}</button>
        </div>
        {isMenuOpen && <div className="md:hidden bg-[#050a14] p-8 space-y-4 border-t border-white/5">
          {['services', 'fleet', 'about', 'contact'].map(s => <button key={s} onClick={() => scrollToSection(s)} className="block w-full text-left text-gray-400 text-lg font-bold uppercase">{t.nav[s as keyof typeof t.nav]}</button>)}
        </div>}
      </nav>

      {/* ─── HERO ─── */}
      <section className="relative h-screen flex items-center px-6">
        <MemoHeroVideo />
        <div className="relative z-10 max-w-7xl mx-auto w-full">
          <div className="animate-fadeInUp">
            <h1 className="text-5xl md:text-8xl font-black leading-[0.9] uppercase mb-8">
              {t.hero.title1}<br/>{t.hero.title2}<br/><span className="text-[#0052ff]">{t.hero.title3}</span>
            </h1>
            <p className="text-lg text-gray-300 mb-10 max-w-lg font-medium leading-relaxed">
              Asset-based logistics partner since 2011. Reliable transport solutions with own fleet of 27+ vehicles.
            </p>
            <button onClick={() => scrollToSection('contact')} className="bg-[#0052ff] px-10 py-5 rounded-xl font-black text-sm uppercase tracking-[0.2em] flex items-center gap-3 hover:bg-[#003dd6] shadow-2xl">
              {t.hero.getQuote} <ArrowRight size={20} />
            </button>
          </div>
        </div>
      </section>

      {/* ─── FLEET (ПОЛНЫЙ КОНТЕНТ) ─── */}
      <section id="fleet" className="py-24 px-6 bg-[#050a14] border-t border-white/5">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-black mb-20 uppercase">{t.fleet.title}</h2>
          <div className="grid md:grid-cols-2 gap-10 text-left">
            <div className="bg-[#0a1628] p-10 rounded-3xl border border-white/5">
              <Truck className="text-[#0052ff] mb-6" size={40} />
              <h3 className="text-2xl font-black mb-4 uppercase">{t.fleet.standardClass}</h3>
              <p className="text-gray-400 text-sm mb-6">92 m³ • 33 Euro Pallets • 13.6 m</p>
              <p className="text-gray-500 italic text-xs border-t border-white/5 pt-6">{t.fleet.standardFooter}</p>
            </div>
            <div className="bg-[#0a1628] p-10 rounded-3xl border border-[#0052ff]/20">
              <Maximize2 className="text-blue-500 mb-6" size={40} />
              <h3 className="text-2xl font-black mb-4 uppercase text-blue-500">{t.fleet.megaAdvantage}</h3>
              <p className="text-gray-400 text-sm mb-6">105 m³ • 3.0 m Height • High Volume</p>
              <p className="text-gray-500 italic text-xs border-t border-white/5 pt-6">{t.fleet.megaFooter}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── SERVICES ─── */}
      <section id="services" className="py-24 px-6 bg-[#050a14] border-t border-white/5">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl font-black mb-16 uppercase">{t.services.title}</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {t.services.items.map((s:any, i:number) => {
              const Icon = serviceIcons[i] || Truck;
              return (
                <div key={i} className="p-8 bg-[#0a1628] rounded-2xl border border-white/5 hover:border-[#0052ff] transition-colors">
                  <Icon className="text-blue-500 mb-4 mx-auto" size={32} />
                  <h4 className="font-black text-[11px] uppercase tracking-widest">{s.title}</h4>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ─── ABOUT (LIC-009666-EBKR) ─── */}
      <section id="about" className="py-24 px-6 bg-[#050a14] border-t border-white/5 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-black mb-8 uppercase">{t.about.title}</h2>
          <p className="text-gray-400 text-lg leading-relaxed mb-12">
            European asset-based carrier since 2011. License: <span className="text-white font-bold">LIC-009666-EBKR</span>. 
            Direct control and maximum efficiency for your international logistics.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
             {[{icon: Shield, l: 'CMR Insured'}, {icon: Globe, l: 'EU Network'}, {icon: Clock, l: '24/7 Support'}, {icon: Users, l: 'Team'}].map((item, i) => (
               <div key={i} className="p-6 bg-[#0a1628] rounded-xl border border-white/5">
                 <item.icon className="text-blue-500 mb-2 mx-auto" size={20} />
                 <p className="font-black text-[10px] uppercase tracking-tighter">{item.l}</p>
               </div>
             ))}
          </div>
        </div>
      </section>

      <section className="py-24 px-6 bg-[#050a14]"><MemoMap /></section>

      {/* ─── FORM (ТВОЙ ДИЗАЙН ИЗ СКРИНШОТА) ─── */}
      <section id="contact" className="py-32 px-6 bg-[#050a14]">
        <div className="max-w-4xl mx-auto" id="contact-container">
          <div className="form-card p-8 md:p-12 rounded-3xl shadow-2xl">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2.5">FROM (COUNTRY/CITY)</label>
                  <input name="from" required placeholder="Kaunas, Lithuania" className="w-full bg-[#0a1628] border border-white/5 rounded-xl px-5 py-4 text-sm outline-none focus:border-blue-500 transition-colors" />
                </div>
                <div>
                  <label className="block text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2.5">TO (COUNTRY/CITY)</label>
                  <input name="to" required placeholder="Berlin, Germany" className="w-full bg-[#0a1628] border border-white/5 rounded-xl px-5 py-4 text-sm outline-none focus:border-blue-500 transition-colors" />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2.5">CARGO TYPE</label>
                  <input name="cargoType" placeholder="Electronics, Pallets, etc." className="w-full bg-[#0a1628] border border-white/5 rounded-xl px-5 py-4 text-sm outline-none focus:border-blue-500 transition-colors" />
                </div>
                <div>
                  <label className="block text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2.5">WEIGHT (KG)</label>
                  <input name="weight" placeholder="5000" className="w-full bg-[#0a1628] border border-white/5 rounded-xl px-5 py-4 text-sm outline-none focus:border-blue-500 transition-colors" />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2.5">VOLUME (M³)</label>
                  <input name="volume" placeholder="10" className="w-full bg-[#0a1628] border border-white/5 rounded-xl px-5 py-4 text-sm outline-none focus:border-blue-500 transition-colors" />
                </div>
                <div>
                  <label className="block text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2.5">NAME</label>
                  <input name="name" required placeholder="John Doe" className="w-full bg-[#0a1628] border border-white/5 rounded-xl px-5 py-4 text-sm outline-none focus:border-blue-500 transition-colors" />
                </div>
              </div>
              <div>
                <label className="block text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2.5">EMAIL</label>
                <input name="email" type="email" required placeholder="john@company.com" className="w-full bg-[#0a1628] border border-white/5 rounded-xl px-5 py-4 text-sm outline-none focus:border-blue-500 transition-colors" />
              </div>
              <div>
                <label className="block text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2.5">PHONE</label>
                <input name="phone" required placeholder="+370 123 45678" className="w-full bg-[#0a1628] border border-white/5 rounded-xl px-5 py-4 text-sm outline-none focus:border-blue-500 transition-colors" />
              </div>
              <div>
                <label className="block text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2.5">MESSAGE (OPTIONAL)</label>
                <textarea name="message" rows={4} placeholder="Additional details..." className="w-full bg-[#0a1628] border border-white/5 rounded-xl px-5 py-4 text-sm outline-none focus:border-blue-500 transition-colors resize-none" />
              </div>
              <button type="submit" disabled={isSubmitted} className="w-full py-5 bg-[#0052ff] hover:bg-[#003dd6] text-white font-black rounded-xl text-xs tracking-[0.3em] uppercase transition-all disabled:opacity-50">
                {isSubmitted ? 'SENT SUCCESSFULLY' : 'REQUEST QUOTE IN 24H'}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer className="py-20 bg-[#050a14] border-t border-white/5 text-center px-4">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-12 text-left mb-16">
          <div>
            <div className="flex items-center mb-6"><img src="/logo.png" className="h-8"/><span className="text-white text-xl font-bold ml-2">TERSIS</span></div>
            <p className="text-gray-500 text-sm leading-relaxed max-w-xs">Asset-based carrier since 2011. European MEGA trailer specialist.</p>
          </div>
          <div>
            <h4 className="text-white font-black text-xs uppercase tracking-widest mb-6">HQ Address</h4>
            <p className="text-gray-500 text-sm leading-relaxed">Taikos pr. 141-305, Kaunas, LT-51132, Lithuania</p>
          </div>
          <div>
            <h4 className="text-white font-black text-xs uppercase tracking-widest mb-6">Contact Info</h4>
            <p className="text-gray-500 text-sm leading-relaxed">+370 65 955 956<br/>info@tersis.lt</p>
          </div>
        </div>
        <p className="text-gray-600 text-[10px] font-bold uppercase tracking-[0.3em] pt-8 border-t border-white/5">© 2026 TERSIS. All rights reserved.</p>
      </footer>
    </div>
  )
}
