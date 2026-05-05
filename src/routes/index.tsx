import React, { useState, useEffect, useCallback, memo } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import {
  Truck, ArrowRight, Check, Shield, Clock, Menu, X, Phone, Mail, MapPin, 
  Zap, Globe, Lock, AlertTriangle, Handshake, Users, FileText, Home, 
  Maximize2, Sun, Moon, Languages
} from 'lucide-react'
import { translations, type Lang } from '@/lib/i18n'

// --- 1. ИЗОЛЯЦИЯ ВИДЕО (Замораживаем, чтобы фокус в форме его не трогал) ---
const MemoHeroBackground = memo(() => (
  <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
    <video
      autoPlay muted loop playsInline preload="auto"
      className="absolute inset-0 w-full h-full object-cover opacity-60"
    >
      <source src="/hero-video.mp4.mp4" type="video/mp4" />
    </video>
    <div className="absolute inset-0 bg-black/60 z-10" />
  </div>
))

// --- 2. ИЗОЛЯЦИЯ КАРТЫ (SVG-анимации "замерзают", когда ты не скроллишь) ---
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
      { title: 'TERSIS | Asset-Based Carrier & International Logistics Hub' },
      { name: 'description', content: 'TERSIS is a reliable European logistics partner since 2011.' },
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

  const borderAccent = isDark ? 'border-[#0052ff]/30' : 'border-[#0052ff]/20'

  return (
    <div className={`min-h-screen ${isDark ? 'bg-[#050a14]' : 'bg-gray-50'} relative overflow-hidden transition-colors duration-300`}>
      
      {/* ─── NAVIGATION ─── */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-[#050a14]/95 backdrop-blur-md border-b border-white/5 shadow-sm' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-20">
          <div className="flex items-center cursor-pointer group" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <img src="/logo.png" className="h-10 w-10 object-contain transition-transform group-hover:scale-110" />
            <span className="text-2xl font-black text-white tracking-tight ml-2">TERSIS</span>
          </div>
          
          <div className="hidden md:flex items-center space-x-6">
            {(['services', 'fleet', 'about', 'coverage', 'contact'] as const).map((s) => (
              <button key={s} onClick={() => scrollToSection(s)} className="text-gray-400 hover:text-white transition text-xs font-bold uppercase tracking-widest">
                {t.nav[s]}
              </button>
            ))}
            <div className="flex items-center gap-3 ml-4 border-l border-white/10 pl-6">
              <button onClick={() => setLang(lang === 'en' ? 'lt' : 'en')} className="text-white text-xs font-bold border border-white/20 px-3 py-1 rounded hover:bg-white/5 transition">
                {lang === 'en' ? 'LT' : 'EN'}
              </button>
              <button onClick={() => scrollToSection('contact')} className="bg-[#0052ff] text-white px-5 py-2 hover:bg-[#003dd6] font-bold text-xs uppercase rounded-md transition-all shadow-lg shadow-blue-500/20">
                {t.nav.getQuote}
              </button>
            </div>
          </div>

          <button className="md:hidden text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden bg-[#050a14]/98 backdrop-blur-xl border-t border-white/5 px-6 py-8 space-y-4">
            {(['services', 'fleet', 'about', 'coverage', 'contact'] as const).map((s) => (
              <button key={s} onClick={() => scrollToSection(s)} className="block w-full text-left text-gray-300 text-lg font-bold uppercase tracking-widest">{t.nav[s]}</button>
            ))}
          </div>
        )}
      </nav>

      {/* ─── HERO ─── */}
      <section className="relative h-screen flex items-center bg-[#050a14] overflow-hidden px-4 sm:px-6 lg:px-8">
        <MemoHeroBackground />
        <div className="max-w-7xl mx-auto w-full relative z-20">
          <div className="animate-fadeInUp text-left">
            <div className="inline-block mb-6 px-4 py-2 bg-[#0052ff]/20 border border-[#0052ff]/40 rounded-md">
              <p className="text-[#0052ff] text-xs font-bold tracking-widest uppercase">EST. 2011 • Asset-Based Carrier</p>
            </div>
            <h1 className="text-5xl sm:text-7xl md:text-8xl font-black text-white mb-6 leading-[0.9] uppercase tracking-tighter">
              {t.hero.title1}<br />{t.hero.title2}<br />
              <span className="text-[#0052ff]">{t.hero.title3}</span>
            </h1>
            <p className="text-lg text-gray-200 mb-10 max-w-lg font-medium leading-relaxed">
              Operating a modern fleet of 27+ Euro 6 vehicles specializing in high-capacity MEGA trailers (105 m³).
            </p>
            <div className="flex gap-4">
              <button onClick={() => scrollToSection('contact')} className="bg-[#0052ff] text-white px-10 py-5 rounded-xl font-black uppercase tracking-widest hover:bg-[#003dd6] transition-all flex items-center gap-3 shadow-2xl shadow-blue-500/40">
                {t.hero.getQuote} <ArrowRight size={24} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ─── FLEET SPECIFICATIONS (ПОЛНЫЙ КОД) ─── */}
      <section id="fleet" className="py-24 px-4 sm:px-6 lg:px-8 border-t border-white/5 bg-[#050a14]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4 uppercase tracking-tight">{t.fleet.title}</h2>
            <p className="text-gray-400 text-lg uppercase tracking-widest font-bold">Modern Euro 6 Standards</p>
          </div>
          <div className="grid md:grid-cols-2 gap-10">
             {/* Standard Card */}
             <div className={`p-10 rounded-[32px] border ${borderAccent} bg-[#0a1628] hover:border-[#0052ff]/40 transition-all group`}>
                <div className="w-16 h-16 bg-[#0052ff]/10 rounded-2xl flex items-center justify-center mb-8 border border-white/5">
                   <Truck className="text-[#0052ff]" size={32} />
                </div>
                <h3 className="text-3xl font-black text-white mb-4 uppercase">{t.fleet.standardClass}</h3>
                <p className="text-blue-500 font-bold mb-8 uppercase tracking-widest text-sm">92 m³ Capacity</p>
                <div className="space-y-4 mb-8 text-gray-400 font-bold uppercase text-[10px] tracking-[0.2em]">
                  <div className="flex justify-between border-b border-white/5 pb-3"><span>Length</span><span className="text-white">13.6 m</span></div>
                  <div className="flex justify-between border-b border-white/5 pb-3"><span>Height</span><span className="text-white">2.7 m</span></div>
                  <div className="flex justify-between border-b border-white/5 pb-3"><span>Pallets</span><span className="text-white">33 Euro Pallets</span></div>
                </div>
                <p className="text-gray-500 italic text-sm">{t.fleet.standardFooter}</p>
             </div>
             {/* MEGA Card */}
             <div className={`p-10 rounded-[32px] border border-[#0052ff]/30 bg-[#0a1628] hover:border-[#0052ff]/60 transition-all`}>
                <div className="w-16 h-16 bg-[#0052ff]/10 rounded-2xl flex items-center justify-center mb-8 border border-blue-500/20">
                   <Maximize2 className="text-[#0052ff]" size={32} />
                </div>
                <h3 className="text-3xl font-black text-white mb-4 uppercase">{t.fleet.megaAdvantage}</h3>
                <p className="text-blue-500 font-bold mb-8 uppercase tracking-widest text-sm">105 m³ Capacity</p>
                <div className="space-y-4 mb-8 text-gray-400 font-bold uppercase text-[10px] tracking-[0.2em]">
                  <div className="flex justify-between border-b border-white/5 pb-3"><span>Internal Height</span><span className="text-white">3.0 m</span></div>
                  <div className="flex justify-between border-b border-white/5 pb-3"><span>Total Volume</span><span className="text-white">105 m³</span></div>
                  <div className="flex justify-between border-b border-white/5 pb-3"><span>Extra Capacity</span><span className="text-white">+14% More Space</span></div>
                </div>
                <p className="text-gray-500 italic text-sm">{t.fleet.megaFooter}</p>
             </div>
          </div>
        </div>
      </section>

      {/* ─── SERVICES (ВСЕ 8 ПУНКТОВ) ─── */}
      <section id="services" className="py-24 px-4 bg-[#050a14] border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-center text-4xl md:text-5xl font-black text-white mb-20 uppercase tracking-tight">{t.services.title}</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {t.services.items.map((s, i) => {
              const Icon = serviceIcons[i] || Truck;
              return (
                <div key={i} className="p-8 bg-[#0a1628] rounded-[24px] border border-white/5 hover:border-[#0052ff] transition-all group text-center">
                  <Icon className="text-[#0052ff] mb-4 mx-auto group-hover:scale-110 transition-transform" size={32} />
                  <h4 className="text-white font-black text-[11px] uppercase tracking-widest leading-tight">{s.title}</h4>
                  <p className="text-gray-500 text-[9px] mt-2 font-bold uppercase">{s.subtitle}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ─── ABOUT (ПОЛНЫЙ ТЕКСТ + ГРИД) ─── */}
      <section id="about" className="py-24 px-4 bg-[#050a14] border-t border-white/5">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-10 uppercase tracking-tight">{t.about.title}</h2>
          <div className="space-y-6 mb-16">
            <p className="text-gray-400 text-lg leading-relaxed font-medium">
              TERSIS provides reliable, cost-effective transportation solutions across Europe and worldwide. 
              We specialize in asset-based logistics, operating a modern fleet of 27 Euro 6 vehicles.
            </p>
            <div className="inline-block px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-lg">
              <p className="text-blue-500 text-sm font-black uppercase tracking-widest">License: LIC-009666-EBKR</p>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
             {[
               { icon: Truck, l: 'Own Fleet' }, { icon: Shield, l: 'CMR Insured' }, 
               { icon: Globe, l: 'EU Network' }, { icon: Clock, l: '24/7 Support' },
               { icon: Lock, l: 'Secure Cargo' }, { icon: Users, l: 'Expert Team' },
               { icon: FileText, l: 'Full Docs' }, { icon: Handshake, l: 'Trusted' }
             ].map((item, i) => (
               <div key={i} className="p-6 bg-[#0a1628] rounded-2xl border border-white/5 hover:bg-[#0052ff]/5 transition-colors">
                 <item.icon className="text-[#0052ff] mb-3 mx-auto" size={24} />
                 <p className="text-white font-black text-[10px] uppercase tracking-widest leading-none">{item.l}</p>
               </div>
             ))}
          </div>
        </div>
      </section>

      {/* ─── COVERAGE MAP ─── */}
      <section id="coverage" className="py-24 px-4 bg-[#050a14] border-t border-white/5 text-center">
        <h2 className="text-4xl md:text-5xl font-black text-white mb-16 uppercase tracking-tight">{t.coverage.title}</h2>
        <MemoCoverageMap t={t} />
      </section>

      {/* ─── CONTACT FORM (ВОССТАНОВЛЕНО 1:1 СО СКРИНШОТА) ─── */}
      <section id="contact" className="py-32 px-4 sm:px-6 lg:px-8 bg-[#050a14]">
        <div className="max-w-4xl mx-auto">
          <div className="p-8 md:p-12 rounded-[32px] border border-[#1A2C45]" style={{ background: '#0F1A2B' }}>
            <form onSubmit={handleSubmit} className="space-y-8">
              
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

              <div>
                <label className="block text-[11px] font-black text-[#8899BB] uppercase tracking-[0.2em] mb-3">EMAIL</label>
                <input name="email" type="email" required placeholder="john@company.com" className="w-full bg-[#0a1628] border border-white/5 rounded-xl px-5 py-4 text-white text-sm outline-none focus:border-blue-500 transition-colors" />
              </div>

              <div>
                <label className="block text-[11px] font-black text-[#8899BB] uppercase tracking-[0.2em] mb-3">PHONE</label>
                <input name="phone" required placeholder="+370 123 45678" className="w-full bg-[#0a1628] border border-white/5 rounded-xl px-5 py-4 text-white text-sm outline-none focus:border-blue-500 transition-colors" />
              </div>

              <div>
                <label className="block text-[11px] font-black text-[#8899BB] uppercase tracking-[0.2em] mb-3">MESSAGE (OPTIONAL)</label>
                <textarea name="message" rows={4} placeholder="Additional details..." className="w-full bg-[#0a1628] border border-white/5 rounded-xl px-5 py-4 text-white text-sm outline-none focus:border-blue-500 transition-colors resize-none" />
              </div>

              <button 
                type="submit" 
                disabled={isSubmitted} 
                className="w-full py-6 bg-[#0052ff] hover:bg-[#003dd6] text-white font-black rounded-2xl text-sm tracking-[0.3em] uppercase transition-all active:scale-[0.98] disabled:opacity-50"
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
            <div className="flex items-center mb-6"><img src="/logo.png" className="h-10"/><span className="text-white text-xl font-bold ml-2 tracking-tight">TERSIS</span></div>
            <p className="text-gray-500 text-sm leading-relaxed max-w-xs font-medium">Asset-based carrier since 2011. Your reliable logistics hub for MEGA trailers in Europe.</p>
          </div>
          <div className="space-y-4">
            <h4 className="text-white font-black text-xs uppercase tracking-widest">Office HQ</h4>
            <div className="text-gray-500 text-sm space-y-2 leading-relaxed font-medium">
              <p className="flex items-center gap-2"><MapPin size={14} className="text-[#0052ff]"/> Taikos pr. 141-305, Kaunas, Lithuania</p>
              <p className="flex items-center gap-2"><Phone size={14} className="text-[#0052ff]"/> +370 65 955 956</p>
              <p className="flex items-center gap-2"><Mail size={14} className="text-[#0052ff]"/> info@tersis.lt</p>
            </div>
          </div>
          <div className="space-y-4">
            <h4 className="text-white font-black text-xs uppercase tracking-widest">Legal</h4>
            <div className="text-gray-600 text-xs font-bold space-y-2">
              <p>EU License: LIC-009666-EBKR</p>
              <p>100% CMR Insured</p>
              <p>Euro 6 Fleet Standard</p>
            </div>
          </div>
        </div>
        <p className="text-gray-700 text-[10px] font-bold uppercase tracking-[0.3em] pt-8 border-t border-white/5">© 2026 TERSIS. All rights reserved.</p>
      </footer>
    </div>
  )
}
