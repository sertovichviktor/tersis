import React, { useState, useEffect, useCallback, memo } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import {
  Truck, ArrowRight, Check, Shield, Clock, Menu, X, Phone, Mail, MapPin, 
  Zap, Globe, Lock, AlertTriangle, Handshake, Users, FileText, Home, 
  Maximize2, Sun, Moon, Languages,
} from 'lucide-react'
import { translations, type Lang } from '@/lib/i18n'

// --- ИЗОЛЯЦИЯ: ВИДЕО (Замораживаем, чтобы фокус в форме его не трогал) ---
const MemoHeroBackground = memo(() => (
  <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
    <video
      autoPlay muted loop playsInline preload="auto"
      className="absolute inset-0 w-full h-full object-cover opacity-60"
    >
      <source src="/hero-video.mp4.mp4" type="video/mp4" />
    </video>
    <div className="absolute inset-0 bg-black/50" />
  </div>
))

// --- ИЗОЛЯЦИЯ: КАРТА ---
const MemoCoverageMap = memo(({ t }: any) => (
  <div className="relative h-[400px] md:h-[650px] rounded-[30px] md:rounded-[40px] overflow-hidden border border-[#0052ff]/30 shadow-2xl bg-black">
    <img src="/map-hub.jpg.png" alt="Tersis Global Hub" className="absolute inset-0 w-full h-full object-cover opacity-90 pointer-events-none" />
    <svg className="absolute inset-0 w-full h-full z-10 pointer-events-none" viewBox="0 0 1000 600" preserveAspectRatio="xMidYMid slice">
      <g fill="none" strokeWidth="2" strokeLinecap="round">
        <path d="M 150,230 Q 300,100 485,205" stroke="rgba(0,82,255,0.4)" strokeDasharray="1, 50">
          <animate attributeName="stroke-dashoffset" from="300" to="0" dur="3s" repeatCount="indefinite" />
        </path>
        <path d="M 220,480 Q 350,300 485,205" stroke="rgba(0,82,255,0.4)" strokeDasharray="1, 50">
          <animate attributeName="stroke-dashoffset" from="300" to="0" dur="3.5s" repeatCount="indefinite" />
        </path>
        <path d="M 850,380 Q 650,250 485,205" stroke="rgba(0,82,255,0.4)" strokeDasharray="1, 50">
          <animate attributeName="stroke-dashoffset" from="300" to="0" dur="2.8s" repeatCount="indefinite" />
        </path>
      </g>
    </svg>
  </div>
))

export const Route = createFileRoute('/')({
  component: TersisApp,
  head: () => ({
    meta: [
      { title: 'TERSIS | Asset-Based Carrier & International Logistics' },
      { property: 'og:image', content: '/logo.png' },
    ],
  }),
})

const serviceIcons = [Truck, Globe, AlertTriangle, Zap, Clock, Home, FileText, Shield]

function TersisApp() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [lang, setLang] = useState<Lang>('en')
  const [isDark, setIsDark] = useState(true)
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
    const element = document.getElementById(id)
    element?.scrollIntoView({ behavior: 'smooth' })
    setIsMenuOpen(false)
  }

  return (
    <div className={`min-h-screen ${isDark ? 'bg-[#050a14]' : 'bg-gray-50'} relative transition-colors duration-300`}>
      
      {/* ─── NAVIGATION ─── */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-[#050a14]/95 backdrop-blur-md border-b border-white/5' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-20">
          <div className="flex items-center cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <img src="/logo.png" className="h-10 w-10 object-contain" />
            <span className="text-2xl font-black text-white ml-2">TERSIS</span>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            {['services', 'fleet', 'about', 'contact'].map((s) => (
              <button key={s} onClick={() => scrollToSection(s)} className="text-gray-400 hover:text-white text-xs font-bold uppercase tracking-widest">
                {t.nav[s as keyof typeof t.nav]}
              </button>
            ))}
            <div className="flex items-center gap-4 border-l border-white/10 pl-8">
              <button onClick={() => setLang(lang === 'en' ? 'lt' : 'en')} className="text-white text-xs font-bold uppercase border border-white/20 px-3 py-1 rounded">
                {lang === 'en' ? 'LT' : 'EN'}
              </button>
              <button onClick={() => scrollToSection('contact')} className="bg-[#0052ff] text-white px-5 py-2 hover:bg-[#003dd6] font-bold text-xs uppercase rounded-md">
                {t.nav.getQuote}
              </button>
            </div>
          </div>

          <button className="md:hidden text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden bg-[#050a14] border-t border-white/5 px-6 py-8 space-y-4">
            {['services', 'fleet', 'about', 'contact'].map((s) => (
              <button key={s} onClick={() => scrollToSection(s)} className="block w-full text-left text-gray-400 text-lg font-bold uppercase">{t.nav[s as keyof typeof t.nav]}</button>
            ))}
          </div>
        )}
      </nav>

      {/* ─── HERO ─── */}
      <section className="relative h-screen flex items-center bg-[#050a14] overflow-hidden px-4 sm:px-6 lg:px-8">
        <MemoHeroBackground />
        <div className="max-w-7xl mx-auto w-full relative z-20">
          <div className="animate-fadeInUp">
            <h1 className="text-5xl sm:text-7xl md:text-8xl font-black text-white mb-6 leading-[0.9] uppercase tracking-tighter">
              {t.hero.title1}<br />{t.hero.title2}<br />
              <span className="text-[#0052ff]">{t.hero.title3}</span>
            </h1>
            <p className="text-lg text-gray-200 mb-10 max-w-lg font-medium leading-relaxed">
               Reliable European logistics partner since 2011. Operating a fleet of 27+ Euro 6 vehicles with high-capacity MEGA trailers.
            </p>
            <button onClick={() => scrollToSection('contact')} className="bg-[#0052ff] text-white px-10 py-5 rounded-xl font-black uppercase tracking-widest hover:bg-[#003dd6] transition-all flex items-center gap-3">
              {t.hero.getQuote} <ArrowRight size={22} />
            </button>
          </div>
        </div>
      </section>

      {/* ─── FLEET ─── */}
      <section id="fleet" className="py-24 px-4 sm:px-6 lg:px-8 border-t border-white/5 bg-[#050a14]">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-20 uppercase tracking-tight">{t.fleet.title}</h2>
          <div className="grid md:grid-cols-2 gap-10 text-left">
             <div className="bg-[#0a1628] p-10 rounded-[32px] border border-white/5">
                <Truck className="text-[#0052ff] mb-8" size={48} />
                <h3 className="text-3xl font-black text-white mb-4 uppercase">{t.fleet.standardClass}</h3>
                <p className="text-gray-400 text-sm italic mb-6">{t.fleet.standardFooter}</p>
                <div className="space-y-2 text-xs font-bold text-gray-500 uppercase tracking-widest">
                  <p>• 92 m³ Capacity</p>
                  <p>• 33 Euro Pallets</p>
                  <p>• 13.6m Length</p>
                </div>
             </div>
             <div className="bg-[#0a1628] p-10 rounded-[32px] border border-[#0052ff]/30">
                <Maximize2 className="text-[#0052ff] mb-8" size={48} />
                <h3 className="text-3xl font-black text-[#0052ff] mb-4 uppercase">{t.fleet.megaAdvantage}</h3>
                <p className="text-gray-400 text-sm italic mb-6">{t.fleet.megaFooter}</p>
                <div className="space-y-2 text-xs font-bold text-gray-500 uppercase tracking-widest">
                  <p>• 105 m³ Capacity</p>
                  <p>• 3.0m Internal Height</p>
                  <p>• +14% More Volume</p>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* ─── SERVICES ─── */}
      <section id="services" className="py-24 px-4 bg-[#050a14] border-t border-white/5">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-16 uppercase">{t.services.title}</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {t.services.items.map((s: any, i: number) => {
              const Icon = serviceIcons[i] || Truck;
              return (
                <div key={i} className="p-8 bg-[#0a1628] rounded-[24px] border border-white/5 hover:border-[#0052ff] transition-all">
                  <Icon className="text-[#0052ff] mb-4 mx-auto" size={32} />
                  <h4 className="text-white font-black text-[11px] uppercase tracking-widest">{s.title}</h4>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ─── ABOUT ─── */}
      <section id="about" className="py-24 px-4 bg-[#050a14] border-t border-white/5">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-10 uppercase">{t.about.title}</h2>
          <p className="text-gray-400 text-lg leading-relaxed mb-12">
            Asset-based logistics partner since 2011. Modern fleet of 27 Euro 6 vehicles. 
            EU Licensed: <span className="text-white font-bold">LIC-009666-EBKR</span>.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
             {[{icon: Shield, l: 'CMR Insured'}, {icon: Globe, l: 'EU Network'}, {icon: Clock, l: '24/7 Tracking'}, {icon: Users, l: 'Expert Team'}].map((item, i) => (
               <div key={i} className="p-6 bg-[#0a1628] rounded-2xl border border-white/5">
                 <item.icon className="text-[#0052ff] mb-3 mx-auto" size={24} />
                 <p className="text-white font-black text-[10px] uppercase tracking-widest">{item.l}</p>
               </div>
             ))}
          </div>
        </div>
      </section>

      {/* ─── COVERAGE ─── */}
      <section id="coverage" className="py-24 px-4 bg-[#050a14] border-t border-white/5">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-16 uppercase">{t.coverage.title}</h2>
          <MemoCoverageMap t={t} />
        </div>
      </section>

      {/* ─── CONTACT FORM (ВОССТАНОВЛЕНО ПО ТВОЕМУ СКРИНШОТУ) ─── */}
      <section id="contact" className="py-32 px-4 sm:px-6 lg:px-8 bg-[#050a14]">
        <div className="max-w-4xl mx-auto">
          <div className="p-8 md:p-12 rounded-[32px] border border-[#1A2C45]" style={{ background: '#0F1A2B' }}>
            <form onSubmit={handleSubmit} className="space-y-8">
              
              {/* Row 1: FROM / TO */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <label className="block text-[11px] font-black text-[#8899BB] uppercase tracking-[0.2em] mb-3">FROM (COUNTRY/CITY)</label>
                  <input name="from" required placeholder="Kaunas, Lithuania" className="w-full bg-[#0a1628] border border-white/5 rounded-xl px-5 py-4 text-white text-sm outline-none focus:border-blue-500 transition-colors" />
                </div>
                <div>
                  <label className="block text-[11px] font-black text-[#8899BB] uppercase tracking-[0.2em] mb-3">TO (COUNTRY/CITY)</label>
                  <input name="to" required placeholder="Berlin, Germany" className="w-full bg-[#0a1628] border border-white/5 rounded-xl px-5 py-4 text-white text-sm outline-none focus:border-blue-500 transition-colors" />
                </div>
              </div>

              {/* Row 2: CARGO / WEIGHT */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <label className="block text-[11px] font-black text-[#8899BB] uppercase tracking-[0.2em] mb-3">CARGO TYPE</label>
                  <input name="cargoType" placeholder="Electronics, Pallets, etc." className="w-full bg-[#0a1628] border border-white/5 rounded-xl px-5 py-4 text-white text-sm outline-none focus:border-blue-500 transition-colors" />
                </div>
                <div>
                  <label className="block text-[11px] font-black text-[#8899BB] uppercase tracking-[0.2em] mb-3">WEIGHT (KG)</label>
                  <input name="weight" placeholder="5000" className="w-full bg-[#0a1628] border border-white/5 rounded-xl px-5 py-4 text-white text-sm outline-none focus:border-blue-500 transition-colors" />
                </div>
              </div>

              {/* Row 3: VOLUME / NAME */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <label className="block text-[11px] font-black text-[#8899BB] uppercase tracking-[0.2em] mb-3">VOLUME (M³)</label>
                  <input name="volume" placeholder="10" className="w-full bg-[#0a1628] border border-white/5 rounded-xl px-5 py-4 text-white text-sm outline-none focus:border-blue-500 transition-colors" />
                </div>
                <div>
                  <label className="block text-[11px] font-black text-[#8899BB] uppercase tracking-[0.2em] mb-3">NAME</label>
                  <input name="name" required placeholder="John Doe" className="w-full bg-[#0a1628] border border-white/5 rounded-xl px-5 py-4 text-white text-sm outline-none focus:border-blue-500 transition-colors" />
                </div>
              </div>

              {/* Full Row: EMAIL */}
              <div>
                <label className="block text-[11px] font-black text-[#8899BB] uppercase tracking-[0.2em] mb-3">EMAIL</label>
                <input name="email" type="email" required placeholder="john@company.com" className="w-full bg-[#0a1628] border border-white/5 rounded-xl px-5 py-4 text-white text-sm outline-none focus:border-blue-500 transition-colors" />
              </div>

              {/* Full Row: PHONE */}
              <div>
                <label className="block text-[11px] font-black text-[#8899BB] uppercase tracking-[0.2em] mb-3">PHONE</label>
                <input name="phone" required placeholder="+370 123 45678" className="w-full bg-[#0a1628] border border-white/5 rounded-xl px-5 py-4 text-white text-sm outline-none focus:border-blue-500 transition-colors" />
              </div>

              {/* Full Row: MESSAGE */}
              <div>
                <label className="block text-[11px] font-black text-[#8899BB] uppercase tracking-[0.2em] mb-3">MESSAGE (OPTIONAL)</label>
                <textarea name="message" rows={4} placeholder="Additional details..." className="w-full bg-[#0a1628] border border-white/5 rounded-xl px-5 py-4 text-white text-sm outline-none focus:border-blue-500 transition-colors resize-none" />
              </div>

              <button 
                type="submit" 
                disabled={isSubmitted} 
                className="w-full py-6 bg-[#0052ff] hover:bg-[#003dd6] text-white font-black rounded-2xl text-xs tracking-[0.3em] uppercase transition-all active:scale-[0.98] disabled:opacity-50"
              >
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
            <p className="text-gray-500 text-sm leading-relaxed">Asset-based carrier & logistics provider since 2011.</p>
          </div>
          <div className="space-y-4">
            <h4 className="text-white font-black text-xs uppercase tracking-widest">Address</h4>
            <p className="text-gray-500 text-sm leading-relaxed">Taikos pr. 141-305, Kaunas, LT-51132, Lithuania</p>
          </div>
          <div className="space-y-4">
            <h4 className="text-white font-black text-xs uppercase tracking-widest">Contact</h4>
            <p className="text-gray-500 text-sm">+370 65 955 956 | info@tersis.lt</p>
          </div>
        </div>
        <p className="text-gray-600 text-[10px] font-bold uppercase tracking-widest pt-8 border-t border-white/5">© 2026 TERSIS. All rights reserved.</p>
      </footer>
    </div>
  )
}
