import React, { useState, useEffect, useCallback } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { 
  Truck, ArrowRight, Check, Shield, Clock, Menu, X, Phone, Mail, MapPin, 
  Zap, Globe, Lock, AlertTriangle, Handshake, Users, FileText, Maximize2 
} from 'lucide-react'
import { translations, type Lang } from '../lib/i18n'

export const Route = createFileRoute('/')({
  component: TersisApp,
})

const serviceIcons = [Truck, Globe, AlertTriangle, Zap, Clock, Home, FileText, Shield]

function TersisApp() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [lang, setLang] = useState<Lang>('en')
  const [isSubmitted, setIsSubmitted] = useState(false)
  const t = translations[lang]

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY > 50
      if (isScrolled !== offset) setIsScrolled(offset)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [isScrolled])

  const handleSubmit = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitted(true);
    const data = Object.fromEntries(new FormData(e.currentTarget));
    fetch('/send.php', { method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(data) })
      .finally(() => { 
        (e.target as HTMLFormElement).reset();
        setTimeout(() => setIsSubmitted(false), 3000); 
      });
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  }

  // ЭТА ФУНКЦИЯ БЛОКИРУЕТ ЗАВИСАНИЕ
  const handleInputInteraction = (e: React.SyntheticEvent) => {
    e.stopPropagation(); // Не даем TanStack Router "услышать" этот клик
  }

  return (
    <div className="min-h-screen bg-[#050a14] text-white font-sans overflow-x-hidden">
      
      {/* ─── NAVIGATION ─── */}
      <nav className={`fixed w-full z-50 transition-all ${isScrolled ? 'bg-[#050a14]/98 border-b border-white/5' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center text-white">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo({top:0, behavior:'smooth'})}>
            <img src="/logo.png" className="h-10" alt="Logo" /><span className="text-2xl font-black tracking-tighter">TERSIS</span>
          </div>
          <div className="hidden md:flex gap-8 items-center text-xs font-bold uppercase tracking-widest">
            {['services','fleet','about','contact'].map(s => (
              <button key={s} onClick={() => scrollToSection(s)} className="hover:text-[#0052ff] transition-colors">{t.nav[s as keyof typeof t.nav]}</button>
            ))}
            <button onClick={() => setLang(lang === 'en' ? 'lt' : 'en')} className="border border-white/20 px-3 py-1 rounded-md">{lang.toUpperCase()}</button>
          </div>
          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>{isMenuOpen ? <X size={28}/> : <Menu size={28}/>}</button>
        </div>
      </nav>

      {/* ─── HERO ─── */}
      <section className="relative h-screen flex items-center px-6 overflow-hidden">
        <div className="absolute inset-0 z-0 pointer-events-none">
          <video autoPlay muted loop playsInline preload="auto" className="w-full h-full object-cover opacity-60">
            <source src="/hero-video.mp4.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-black/60" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto w-full">
          <h1 className="text-5xl md:text-8xl font-black uppercase leading-[0.9] mb-8">
            {t.hero.title1}<br/>{t.hero.title2}<br/><span className="text-[#0052ff]">{t.hero.title3}</span>
          </h1>
          <button onClick={() => scrollToSection('contact')} className="bg-[#0052ff] text-white px-10 py-5 rounded-lg font-black text-sm uppercase tracking-widest hover:bg-[#003dd6] transition-colors">
            {t.hero.getQuote} <ArrowRight className="inline ml-2" size={18} />
          </button>
        </div>
      </section>

      {/* ─── FLEET ─── */}
      <section id="fleet" className="py-24 px-6 border-t border-white/5 bg-[#050a14]">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-black mb-16 uppercase tracking-tight">{t.fleet.title}</h2>
          <div className="grid md:grid-cols-2 gap-10 text-left">
            <div className="bg-[#0a1628] p-10 rounded-3xl border border-white/5">
              <Truck className="text-[#0052ff] mb-8" size={48} />
              <h3 className="text-3xl font-black text-white mb-4 uppercase">{t.fleet.standardClass}</h3>
              <p className="text-gray-400 text-sm italic mb-6">{t.fleet.standardFooter}</p>
              <div className="space-y-2 text-xs font-bold text-gray-500 uppercase tracking-widest">
                <p>• 92 m³ Capacity</p><p>• 33 Euro Pallets</p><p>• 13.6m Length</p>
              </div>
            </div>
            <div className="bg-[#0a1628] p-10 rounded-3xl border border-[#0052ff]/30">
              <Maximize2 className="text-[#0052ff] mb-8" size={48} />
              <h3 className="text-3xl font-black text-[#0052ff] mb-4 uppercase">{t.fleet.megaAdvantage}</h3>
              <p className="text-gray-400 text-sm italic mb-6">{t.fleet.megaFooter}</p>
              <div className="space-y-2 text-xs font-bold text-gray-500 uppercase tracking-widest">
                <p>• 105 m³ Capacity</p><p>• 3.0m Internal Height</p><p>• MEGA specialization</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── ABOUT ─── */}
      <section id="about" className="py-24 px-6 bg-[#050a14] border-t border-white/5 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-10 uppercase">{t.about.title}</h2>
          <p className="text-gray-400 text-lg leading-relaxed mb-12">
            Asset-based logistics partner since 2011. License: <span className="text-white font-bold">LIC-009666-EBKR</span>.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
             {[{icon:Shield, l:'CMR Insured'}, {icon:Globe, l:'EU Network'}, {icon:Clock, l:'24/7 Support'}, {icon:Users, l:'Expert Team'}].map((item, i) => (
               <div key={i} className="p-6 bg-[#0a1628] rounded-xl border border-white/5">
                 <item.icon className="text-[#0052ff] mb-3 mx-auto" size={24} />
                 <p className="text-white font-black text-[10px] uppercase tracking-tighter">{item.l}</p>
               </div>
             ))}
          </div>
        </div>
      </section>

      {/* ─── ФОРМА (ВОССТАНОВЛЕНА 1:1 ПО СКРИНШОТУ - 9 ПОЛЕЙ) ─── */}
      <section id="contact" className="py-32 px-6 bg-[#050a14]">
        <div className="max-w-4xl mx-auto" id="contact-section-container">
          <div className="p-8 md:p-12 rounded-[32px] border border-[#1A2C45] shadow-2xl" style={{ background: '#0F1A2B' }}>
            <form onSubmit={handleSubmit} className="space-y-8" autoComplete="off" onFocus={handleInputInteraction} onClick={handleInputInteraction}>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-white">
                <div>
                  <label className="block text-[11px] font-black text-[#8899BB] uppercase tracking-[0.15em] mb-2.5">FROM (COUNTRY/CITY)</label>
                  <input name="from" required placeholder="Kaunas, Lithuania" className="w-full bg-[#0a1628] border border-white/5 rounded-xl px-5 py-4 outline-none focus:border-blue-500" />
                </div>
                <div>
                  <label className="block text-[11px] font-black text-[#8899BB] uppercase tracking-[0.15em] mb-2.5">TO (COUNTRY/CITY)</label>
                  <input name="to" required placeholder="Berlin, Germany" className="w-full bg-[#0a1628] border border-white/5 rounded-xl px-5 py-4 outline-none focus:border-blue-500" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-white">
                <div>
                  <label className="block text-[11px] font-black text-[#8899BB] uppercase tracking-[0.15em] mb-2.5">CARGO TYPE</label>
                  <input name="cargoType" placeholder="Electronics, Pallets, etc." className="w-full bg-[#0a1628] border border-white/5 rounded-xl px-5 py-4 outline-none focus:border-blue-500" />
                </div>
                <div>
                  <label className="block text-[11px] font-black text-[#8899BB] uppercase tracking-[0.15em] mb-2.5">WEIGHT (KG)</label>
                  <input name="weight" placeholder="5000" className="w-full bg-[#0a1628] border border-white/5 rounded-xl px-5 py-4 outline-none focus:border-blue-500" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-white">
                <div>
                  <label className="block text-[11px] font-black text-[#8899BB] uppercase tracking-[0.15em] mb-2.5">VOLUME (M³)</label>
                  <input name="volume" placeholder="10" className="w-full bg-[#0a1628] border border-white/5 rounded-xl px-5 py-4 outline-none focus:border-blue-500" />
                </div>
                <div>
                  <label className="block text-[11px] font-black text-[#8899BB] uppercase tracking-[0.15em] mb-2.5">NAME</label>
                  <input name="name" required placeholder="John Doe" className="w-full bg-[#0a1628] border border-white/5 rounded-xl px-5 py-4 outline-none focus:border-blue-500" />
                </div>
              </div>

              <div className="text-white">
                <label className="block text-[11px] font-black text-[#8899BB] uppercase tracking-[0.15em] mb-2.5">EMAIL</label>
                <input name="email" type="email" required placeholder="john@company.com" className="w-full bg-[#0a1628] border border-white/5 rounded-xl px-5 py-4 outline-none focus:border-blue-500" />
              </div>

              <div className="text-white">
                <label className="block text-[11px] font-black text-[#8899BB] uppercase tracking-[0.15em] mb-2.5">PHONE</label>
                <input name="phone" required placeholder="+370 123 45678" className="w-full bg-[#0a1628] border border-white/5 rounded-xl px-5 py-4 outline-none focus:border-blue-500" />
              </div>

              <div className="text-white">
                <label className="block text-[11px] font-black text-[#8899BB] uppercase tracking-[0.15em] mb-2.5">MESSAGE (OPTIONAL)</label>
                <textarea name="message" rows={4} placeholder="Additional details..." className="w-full bg-[#0a1628] border border-white/5 rounded-xl px-5 py-4 outline-none focus:border-blue-500 resize-none"></textarea>
              </div>

              <button type="submit" disabled={isSubmitted} className="w-full py-6 bg-[#0052ff] hover:bg-[#003dd6] text-white font-black rounded-2xl text-xs tracking-[0.3em] uppercase transition-colors disabled:opacity-50">
                {isSubmitted ? 'SENT SUCCESSFULLY' : 'REQUEST QUOTE IN 24H'}
              </button>
            </form>
          </div>
        </div>
      </section>

      <footer className="py-20 bg-[#050a14] border-t border-white/5 text-center px-4 text-gray-600 text-[10px] font-bold uppercase tracking-widest leading-loose">
        <p>Taikos pr. 141-305, Kaunas, Lithuania | info@tersis.lt</p>
        <p className="mt-4">© 2026 TERSIS. All rights reserved.</p>
      </footer>
    </div>
  )
}
