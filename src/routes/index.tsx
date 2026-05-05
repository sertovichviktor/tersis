import React, { useState, useEffect, useCallback, memo } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import {
  Truck, ArrowRight, Check, Shield, Clock, Menu, X, Phone, Mail, MapPin, 
  Zap, Globe, Lock, AlertTriangle, Handshake, Users, FileText, Home, 
  Maximize2, Sun, Moon, Languages
} from 'lucide-react'
import { translations, type Lang } from '@/lib/i18n'

// --- 1. ИЗОЛЯЦИЯ: ВИДЕО-ФОН (Чтобы клик по форме не вешал его) ---
const MemoHeroBackground = memo(() => (
  <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
    <video
      autoPlay muted loop playsInline preload="auto"
      className="absolute inset-0 w-full h-full object-cover"
    >
      <source src="/hero-video.mp4.mp4" type="video/mp4" />
    </video>
    <div className="absolute inset-0 bg-black/60 z-10" />
  </div>
))

// --- 2. ИЗОЛЯЦИЯ: КАРТА (Анимации комет не будут мешать форме) ---
const MemoCoverageMap = memo(({ t }: any) => (
  <div className="relative h-[400px] md:h-[650px] rounded-[30px] md:rounded-[40px] overflow-hidden border border-[#0052ff]/30 shadow-2xl bg-black">
    <img src="/map-hub.jpg.png" className="absolute inset-0 w-full h-full object-cover opacity-90 pointer-events-none" />
    <svg className="absolute inset-0 w-full h-full z-10 pointer-events-none" viewBox="0 0 1000 600" preserveAspectRatio="xMidYMid slice">
      <g fill="none" strokeWidth="2" strokeLinecap="round">
        <path d="M 150,230 Q 300,100 485,205" stroke="rgba(0,82,255,0.4)" strokeDasharray="1, 50">
          <animate attributeName="stroke-dashoffset" from="300" to="0" dur="3s" repeatCount="indefinite" />
        </path>
        <path d="M 220,480 Q 350,300 485,205" stroke="rgba(0,82,255,0.4)" strokeDasharray="1, 50">
          <animate attributeName="stroke-dashoffset" from="300" to="0" dur="3.5s" repeatCount="indefinite" />
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

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark)
    document.documentElement.classList.toggle('light', !isDark)
  }, [isDark])

  // ОБНОВЛЕННЫЙ handleSubmit (Берет данные напрямую из полей по их name)
  const handleSubmit = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formDataObj = new FormData(form);
    const data = Object.fromEntries(formDataObj.entries());
    setIsSubmitted(true);

    try {
      fetch('/send.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      }).finally(() => {
        form.reset();
        setTimeout(() => setIsSubmitted(false), 3000);
      });
    } catch (error) {
      setIsSubmitted(false);
    }
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    element?.scrollIntoView({ behavior: 'smooth' })
    setIsMenuOpen(false)
  }

  const bg = isDark ? 'bg-[#050a14]' : 'bg-gray-50'
  const textPrimary = isDark ? 'text-white' : 'text-gray-900'
  const textSecondary = isDark ? 'text-gray-400' : 'text-gray-600'
  const borderColor = isDark ? 'border-[#0052ff]/20' : 'border-gray-200'

  return (
    <div className={`min-h-screen ${bg} relative transition-colors duration-300`}>
      {/* ─── NAVIGATION ─── */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-[#050a14]/95 backdrop-blur-md border-b border-white/5 shadow-sm' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-20">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <img src="/logo.png" alt="TERSIS" className="h-10 w-10 object-contain" />
            <span className="text-2xl font-black text-white tracking-tight ml-2">TERSIS</span>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            {(['services', 'fleet', 'about', 'contact'] as const).map((s) => (
              <button key={s} onClick={() => scrollToSection(s)} className="text-gray-400 hover:text-white transition text-xs font-bold uppercase tracking-widest">
                {t.nav[s]}
              </button>
            ))}
            <button onClick={() => setLang(lang === 'en' ? 'lt' : 'en')} className="text-white border border-white/20 px-3 py-1 rounded text-xs font-bold">{lang === 'en' ? 'LT' : 'EN'}</button>
            <button onClick={() => scrollToSection('contact')} className="bg-[#0052ff] text-white px-5 py-2 hover:bg-[#003dd6] font-bold text-xs uppercase rounded-md">{t.nav.getQuote}</button>
          </div>
        </div>
      </nav>

      {/* ─── HERO ─── */}
      <section className="relative h-screen flex items-center bg-[#050a14] overflow-hidden">
        <MemoHeroBackground />
        <div className="max-w-7xl mx-auto w-full relative z-20 px-4 sm:px-6 lg:px-8">
          <div className="animate-fadeInUp text-left">
            <h1 className="text-5xl sm:text-7xl md:text-8xl font-black text-white mb-6 leading-[0.9] uppercase tracking-tighter">
              {t.hero.title1}<br />{t.hero.title2}<br />
              <span className="text-[#0052ff]">{t.hero.title3}</span><br />{t.hero.title4}
            </h1>
            <p className="text-lg text-gray-200 mb-10 leading-relaxed max-w-lg font-medium">
              Reliable asset-based carrier since 2011. Operating 27+ modern Euro 6 vehicles with high-capacity MEGA trailers.
            </p>
            <div className="flex gap-4">
              <button onClick={() => scrollToSection('contact')} className="bg-[#0052ff] text-white px-8 py-4 rounded-lg font-black uppercase tracking-widest hover:bg-[#003dd6] transition-all flex items-center gap-2 shadow-lg shadow-blue-500/20">
                {t.hero.getQuote} <ArrowRight size={20} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ─── FLEET ─── */}
      <section id="fleet" className={`py-24 px-4 sm:px-6 lg:px-8 border-t ${borderColor} bg-[#050a14]`}>
        <div className="max-w-7xl mx-auto">
          <h2 className="text-center text-4xl md:text-5xl font-black text-white mb-16 uppercase tracking-tight">{t.fleet.title}</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-[#0a1628] p-10 rounded-3xl border border-white/5 hover:border-[#0052ff]/30 transition-colors">
              <Truck className="text-[#0052ff] mb-6" size={40} />
              <h3 className="text-2xl font-black text-white mb-4 uppercase">{t.fleet.standardClass}</h3>
              <p className="text-gray-400 text-sm leading-relaxed italic">{t.fleet.standardFooter}</p>
            </div>
            <div className="bg-[#0a1628] p-10 rounded-3xl border border-[#0052ff]/30">
              <Maximize2 className="text-[#0052ff] mb-6" size={40} />
              <h3 className="text-2xl font-black text-[#0052ff] mb-4 uppercase">{t.fleet.megaAdvantage}</h3>
              <p className="text-gray-400 text-sm leading-relaxed italic">{t.fleet.megaFooter}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── COVERAGE ─── */}
      <section id="coverage" className={`py-24 px-4 sm:px-6 lg:px-8 bg-[#050a14]`}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4 uppercase">{t.coverage.title}</h2>
            <p className="text-lg text-[#0052ff] font-black tracking-[0.3em] uppercase">Europe • Baltics • Global</p>
          </div>
          <MemoCoverageMap t={t} />
        </div>
      </section>

      {/* ─── CONTACT FORM (ДИЗАЙН СО СКРИНШОТА ВОССТАНОВЛЕН ПОЛНОСТЬЮ) ─── */}
      <section id="contact" className="py-32 px-4 sm:px-6 lg:px-8 bg-[#050a14]">
        <div className="max-w-4xl mx-auto">
          <div className="p-8 md:p-12 rounded-[32px] border border-white/5" style={{ background: '#0F1A2B' }}>
            <form onSubmit={handleSubmit} className="space-y-8">
              
              {/* Ряд 1 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <label className="block text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] mb-3">FROM (COUNTRY/CITY)</label>
                  <input name="from" required placeholder="Kaunas, Lithuania" className="w-full bg-[#0a1628] border border-white/5 rounded-xl px-5 py-4 text-white text-sm outline-none focus:border-blue-500 transition-colors" />
                </div>
                <div>
                  <label className="block text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] mb-3">TO (COUNTRY/CITY)</label>
                  <input name="to" required placeholder="Berlin, Germany" className="w-full bg-[#0a1628] border border-white/5 rounded-xl px-5 py-4 text-white text-sm outline-none focus:border-blue-500 transition-colors" />
                </div>
              </div>

              {/* Ряд 2 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <label className="block text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] mb-3">CARGO TYPE</label>
                  <input name="cargoType" placeholder="Electronics, Pallets, etc." className="w-full bg-[#0a1628] border border-white/5 rounded-xl px-5 py-4 text-white text-sm outline-none focus:border-blue-500 transition-colors" />
                </div>
                <div>
                  <label className="block text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] mb-3">WEIGHT (KG)</label>
                  <input name="weight" placeholder="5000" className="w-full bg-[#0a1628] border border-white/5 rounded-xl px-5 py-4 text-white text-sm outline-none focus:border-blue-500 transition-colors" />
                </div>
              </div>

              {/* Ряд 3 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <label className="block text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] mb-3">VOLUME (M³)</label>
                  <input name="volume" placeholder="10" className="w-full bg-[#0a1628] border border-white/5 rounded-xl px-5 py-4 text-white text-sm outline-none focus:border-blue-500 transition-colors" />
                </div>
                <div>
                  <label className="block text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] mb-3">NAME</label>
                  <input name="name" required placeholder="John Doe" className="w-full bg-[#0a1628] border border-white/5 rounded-xl px-5 py-4 text-white text-sm outline-none focus:border-blue-500 transition-colors" />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] mb-3">EMAIL</label>
                <input name="email" type="email" required placeholder="john@company.com" className="w-full bg-[#0a1628] border border-white/5 rounded-xl px-5 py-4 text-white text-sm outline-none focus:border-blue-500 transition-colors" />
              </div>

              <div>
                <label className="block text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] mb-3">PHONE</label>
                <input name="phone" required placeholder="+370 123 45678" className="w-full bg-[#0a1628] border border-white/5 rounded-xl px-5 py-4 text-white text-sm outline-none focus:border-blue-500 transition-colors" />
              </div>

              <div>
                <label className="block text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] mb-3">MESSAGE (OPTIONAL)</label>
                <textarea name="message" rows={4} placeholder="Additional details..." className="w-full bg-[#0a1628] border border-white/5 rounded-xl px-5 py-4 text-white text-sm outline-none focus:border-blue-500 transition-colors resize-none" />
              </div>

              <button type="submit" disabled={isSubmitted} className="w-full py-5 bg-[#0052ff] hover:bg-[#003dd6] text-white font-black rounded-2xl text-xs tracking-[0.3em] uppercase transition-all active:scale-[0.98] disabled:opacity-50">
                {isSubmitted ? 'SENT SUCCESSFULLY' : 'REQUEST QUOTE IN 24H'}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer className="py-20 bg-[#050a14] border-t border-white/5 text-center px-4">
        <div className="flex flex-col items-center">
          <img src="/logo.png" alt="TERSIS" className="h-10 mb-6 grayscale opacity-40" />
          <p className="text-gray-600 text-[10px] font-bold uppercase tracking-widest leading-loose">
            © 2026 TERSIS. Asset-Based Carrier & International Logistics.<br />
            All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}
