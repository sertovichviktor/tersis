import React, { useState, useEffect, useCallback, memo } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { Truck, ArrowRight, Check, Shield, Clock, Menu, X, Phone, Mail, MapPin, Globe, FileText, Maximize2, Users } from 'lucide-react'
import { translations, type Lang } from '@/lib/i18n'

// --- ИЗОЛЯЦИЯ: ВИДЕО ---
const HeroBlock = memo(({ t, scrollTo }: any) => (
  <section id="top" className="relative h-screen flex items-center px-6 overflow-hidden bg-[#050a14]">
    <div className="absolute inset-0 pointer-events-none z-0">
      <video autoPlay muted loop playsInline preload="auto" className="w-full h-full object-cover opacity-50">
        <source src="/hero-video.mp4.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-black/60" />
    </div>
    <div className="relative z-10 max-w-7xl mx-auto w-full">
      <h1 className="text-6xl md:text-8xl font-black uppercase leading-[0.9] text-white">
        {t.hero.title1}<br />
        <span className="text-[#0052ff]">{t.hero.title2}</span>
      </h1>
      <button onClick={() => scrollTo('contact-section-container')} className="mt-10 bg-[#0052ff] px-10 py-5 rounded-lg font-black text-sm uppercase tracking-widest text-white hover:bg-[#003dd6]">
        {t.hero.getQuote} <ArrowRight className="inline ml-2" size={20} />
      </button>
    </div>
  </section>
))

// --- ИЗОЛЯЦИЯ: КАРТА (Статичная, без анимаций комет) ---
const CoverageMap = memo(() => (
  <div className="relative h-[400px] md:h-[650px] rounded-[40px] overflow-hidden bg-black border border-white/5 shadow-2xl">
    <img src="/map-hub.jpg.png" className="absolute inset-0 w-full h-full object-cover opacity-80 pointer-events-none" />
  </div>
))

export const Route = createFileRoute('/')({ component: TersisApp })

const serviceIcons = [Truck, Globe, Shield, Clock, Users, Maximize2, MapPin, Phone]

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

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
    setIsMenuOpen(false)
  }

  const handleSubmit = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const data = Object.fromEntries(new FormData(form))
    setIsSubmitted(true)
    fetch('/send.php', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data),
    }).finally(() => {
      form.reset()
      setTimeout(() => setIsSubmitted(false), 3000)
    })
  }, [])

  return (
    <div className="bg-[#050a14] text-white min-h-screen font-sans">
      {/* ─── NAVIGATION ─── */}
      <nav className={`fixed w-full z-50 transition-all ${isScrolled ? 'bg-[#050a14]/98 border-b border-white/5' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto flex justify-between items-center px-6 h-20 text-white">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo({top:0, behavior:'smooth'})}>
            <img src="/logo.png" className="h-10" alt="Logo" /><span className="font-black text-2xl tracking-tighter">TERSIS</span>
          </div>
          <div className="hidden md:flex gap-8 items-center">
            {['services','fleet','about','contact'].map(s => (
              <button key={s} onClick={() => scrollToSection(s === 'contact' ? 'contact-section-container' : s)} className="text-gray-400 hover:text-white text-xs font-bold uppercase tracking-widest">
                {t.nav[s as keyof typeof t.nav]}
              </button>
            ))}
            <button onClick={() => setLang(lang === 'en' ? 'lt' : 'en')} className="border border-white/20 px-3 py-1 rounded text-xs font-bold uppercase">{lang}</button>
          </div>
          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>{isMenuOpen ? <X size={28}/> : <Menu size={28}/>}</button>
        </div>
      </nav>

      <HeroBlock t={t} scrollTo={scrollToSection} />

      {/* ─── FLEET (ВСЕ ПАРАМЕТРЫ НА МЕСТЕ) ─── */}
      <section id="fleet" className="py-24 px-6 border-t border-white/5 bg-[#050a14]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-center text-4xl font-black mb-16 uppercase">{t.fleet.title}</h2>
          <div className="grid md:grid-cols-2 gap-10">
            <div className="p-10 bg-[#0a1628] rounded-3xl border border-white/5">
              <Truck className="text-blue-500 mb-6" size={40} />
              <h3 className="text-2xl font-black mb-4 uppercase">{t.fleet.standardClass}</h3>
              <p className="text-gray-400 text-sm mb-4">92 m³ • 33 Euro Pallets • 13.6m length</p>
              <p className="text-gray-500 italic text-xs pt-4 border-t border-white/5">{t.fleet.standardFooter}</p>
            </div>
            <div className="p-10 bg-[#0a1628] rounded-3xl border border-blue-500/20">
              <Maximize2 className="text-blue-500 mb-6" size={40} />
              <h3 className="text-2xl font-black mb-4 uppercase text-blue-500">{t.fleet.megaAdvantage}</h3>
              <p className="text-gray-400 text-sm mb-4">105 m³ • 3.0m Internal Height • MEGA Specialist</p>
              <p className="text-gray-500 italic text-xs pt-4 border-t border-white/5">{t.fleet.megaFooter}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── SERVICES ─── */}
      <section id="services" className="py-24 px-6 border-t border-white/5 text-center bg-[#050a14]">
        <h2 className="text-4xl font-black mb-16 uppercase">{t.services.title}</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {t.services.items.slice(0, 8).map((s:any, i:number) => (
            <div key={i} className="p-8 bg-[#0a1628] rounded-2xl border border-white/5 hover:border-blue-500 transition-colors">
              <Globe className="text-blue-500 mb-4 mx-auto" size={32} />
              <h4 className="font-black text-[11px] uppercase tracking-widest leading-tight">{s.title}</h4>
            </div>
          ))}
        </div>
      </section>

      {/* ─── ABOUT ─── */}
      <section id="about" className="py-24 px-6 border-t border-white/5 text-center bg-[#050a14]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-black mb-10 uppercase">{t.about.title}</h2>
          <p className="text-gray-400 text-lg leading-relaxed mb-12">
            Reliable partner since 2011. Modern fleet of 27 Euro 6 vehicles. 
            License: <span className="text-white font-bold">LIC-009666-EBKR</span>.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
             {[{icon:Shield, l:'CMR Insured'}, {icon:Globe, l:'EU Network'}, {icon:Clock, l:'24/7 Support'}, {icon:Users, l:'Expert Team'}].map((item, i) => (
               <div key={i} className="p-6 bg-[#0a1628] rounded-xl border border-white/5">
                 <item.icon className="text-blue-500 mb-2 mx-auto" size={20} />
                 <p className="font-black text-[10px] uppercase tracking-tighter">{item.l}</p>
               </div>
             ))}
          </div>
        </div>
      </section>

      <section className="py-24 px-6 bg-[#050a14] border-t border-white/5 text-center">
        <h2 className="text-4xl font-black mb-12 uppercase">Our Coverage</h2>
        <CoverageMap />
      </section>

      {/* ─── ФОРМА (ВОССТАНОВЛЕНО 1:1 ПО СКРИНШОТУ) ─── */}
      <section id="contact-section-container" className="py-32 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="p-8 md:p-12 rounded-[32px] border border-[#1A2C45] shadow-2xl" style={{ background: '#0F1A2B' }}>
            <form onSubmit={handleSubmit} className="space-y-8" autoComplete="off">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-white">
                <div>
                  <label className="block text-[11px] font-black text-[#8899BB] uppercase tracking-[0.15em] mb-2.5">FROM (COUNTRY/CITY)</label>
                  <input name="from" required placeholder="Kaunas, Lithuania" autoComplete="one-time-code" className="w-full bg-[#0a1628] border border-white/5 rounded-xl px-5 py-4 outline-none focus:border-blue-500" />
                </div>
                <div>
                  <label className="block text-[11px] font-black text-[#8899BB] uppercase tracking-[0.15em] mb-2.5">TO (COUNTRY/CITY)</label>
                  <input name="to" required placeholder="Berlin, Germany" autoComplete="one-time-code" className="w-full bg-[#0a1628] border border-white/5 rounded-xl px-5 py-4 outline-none focus:border-blue-500" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-white">
                <div>
                  <label className="block text-[11px] font-black text-[#8899BB] uppercase tracking-[0.15em] mb-2.5">CARGO TYPE</label>
                  <input name="cargoType" placeholder="Electronics, Pallets..." autoComplete="one-time-code" className="w-full bg-[#0a1628] border border-white/5 rounded-xl px-5 py-4 outline-none focus:border-blue-500" />
                </div>
                <div>
                  <label className="block text-[11px] font-black text-[#8899BB] uppercase tracking-[0.15em] mb-2.5">WEIGHT (KG)</label>
                  <input name="weight" placeholder="5000" autoComplete="one-time-code" className="w-full bg-[#0a1628] border border-white/5 rounded-xl px-5 py-4 outline-none focus:border-blue-500" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-white">
                <div>
                  <label className="block text-[11px] font-black text-[#8899BB] uppercase tracking-[0.15em] mb-2.5">VOLUME (M³)</label>
                  <input name="volume" placeholder="10" autoComplete="one-time-code" className="w-full bg-[#0a1628] border border-white/5 rounded-xl px-5 py-4 outline-none focus:border-blue-500" />
                </div>
                <div>
                  <label className="block text-[11px] font-black text-[#8899BB] uppercase tracking-[0.15em] mb-2.5">NAME</label>
                  <input name="name" required placeholder="John Doe" autoComplete="one-time-code" className="w-full bg-[#0a1628] border border-white/5 rounded-xl px-5 py-4 outline-none focus:border-blue-500" />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-black text-[#8899BB] uppercase tracking-[0.15em] mb-2.5">EMAIL</label>
                <input name="email" type="email" required placeholder="john@company.com" autoComplete="one-time-code" className="w-full bg-[#0a1628] border border-white/5 rounded-xl px-5 py-4 outline-none focus:border-blue-500" />
              </div>

              <div>
                <label className="block text-[11px] font-black text-[#8899BB] uppercase tracking-[0.15em] mb-2.5">PHONE</label>
                <input name="phone" required placeholder="+370 123 45678" autoComplete="one-time-code" className="w-full bg-[#0a1628] border border-white/5 rounded-xl px-5 py-4 outline-none focus:border-blue-500" />
              </div>

              <div>
                <label className="block text-[11px] font-black text-[#8899BB] uppercase tracking-[0.15em] mb-2.5">MESSAGE (OPTIONAL)</label>
                <textarea name="message" rows={4} placeholder="Additional details..." className="w-full bg-[#0a1628] border border-white/5 rounded-xl px-5 py-4 outline-none focus:border-blue-500 resize-none" />
              </div>

              <button type="submit" disabled={isSubmitted} className="w-full py-5 bg-[#0052ff] hover:bg-[#003dd6] text-white font-black rounded-2xl text-xs tracking-[0.3em] uppercase transition-colors">
                {isSubmitted ? 'SENT SUCCESS' : 'REQUEST QUOTE IN 24H'}
              </button>
            </form>
          </div>
        </div>
      </section>

      <footer className="py-20 text-center text-gray-600 text-[10px] font-bold uppercase tracking-widest border-t border-white/5">
        <p>Taikos pr. 141-305, Kaunas, Lithuania | info@tersis.lt</p>
        <p className="mt-4">© 2026 TERSIS. All rights reserved.</p>
      </footer>
    </div>
  )
}
