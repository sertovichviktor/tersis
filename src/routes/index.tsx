import { useState, useEffect, useCallback } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import {
  Truck, ArrowRight, Check, Shield, Clock, Menu, X, Phone, Mail, MapPin, Zap, Globe, Lock, AlertTriangle, Handshake, Users, FileText, Home, Maximize2, Sun, Moon, Languages,
} from 'lucide-react'
import { translations, type Lang } from '@/lib/i18n'

export const Route = createFileRoute('/')({
  component: TersisApp,
  head: () => ({
    meta: [
      { title: 'TERSIS | Asset-Based Carrier & International Logistics Hub' },
      { name: 'description', content: 'TERSIS is a reliable European logistics partner since 2011. Operating a fleet of 27+ modern Euro 6 vehicles. Worldwide transport solutions via Kaunas hub.' },
      { property: 'og:image', content: '/logo.png' },
    ],
  }),
})

const serviceIcons = [Truck, Globe, AlertTriangle, Zap, Clock, Home, FileText, Shield]
const aboutIcons = [Lock, Globe, Clock, Shield, FileText, Handshake, Users, Check]

function TersisApp() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [lang, setLang] = useState<Lang>('en')
  const [isDark, setIsDark] = useState(true)
  const [formData, setFormData] = useState({
    from: '', to: '', cargoType: '', weight: '', volume: '', name: '', email: '', phone: '', message: '',
  })
  const [isSubmitted, setIsSubmitted] = useState(false)

  const t = translations[lang]

  useEffect(() => {
    const handleScroll = () => { setIsScrolled(window.scrollY > 50) }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark)
    document.documentElement.classList.toggle('light', !isDark)
  }, [isDark])

  const scrollToSection = useCallback((id: string) => {
    const element = document.getElementById(id)
    element?.scrollIntoView({ behavior: 'smooth' })
    setIsMenuOpen(false)
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitted(true)
    setTimeout(() => setIsSubmitted(false), 3000)
  }

  const bg = isDark ? 'bg-[#050a14]' : 'bg-gray-50'
  const bgCard = isDark ? 'bg-[#0a1628]' : 'bg-white'
  const textPrimary = isDark ? 'text-white' : 'text-gray-900'
  const textSecondary = isDark ? 'text-gray-400' : 'text-gray-600'
  const textMuted = isDark ? 'text-gray-500' : 'text-gray-400'
  const borderColor = isDark ? 'border-[#0052ff]/20' : 'border-gray-200'
  const borderAccent = isDark ? 'border-[#0052ff]/30' : 'border-[#0052ff]/20'
  const inputBg = isDark ? 'bg-[#0a1628]' : 'bg-white'
  const navBg = isDark ? 'bg-[#050a14]/95' : 'bg-white/95'

  return (
    <div className={`min-h-screen ${bg} relative overflow-hidden transition-colors duration-300`}>
      {/* ─── NAVIGATION ─── */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? `${navBg} backdrop-blur-md border-b ${borderColor} shadow-sm` : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-18 py-4">
            {/* Logo Enlarged + Scroll to Top */}
            <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="flex items-center gap-3 group focus:outline-none">
              <div className={`p-1.5 rounded-xl transition-all duration-500 ${isDark ? 'bg-white/10 backdrop-blur-md border border-white/20' : 'bg-slate-900 shadow-lg'} group-hover:scale-105`}>
                <img src="/logo.png" alt="TERSIS" className="h-12 w-12 md:h-14 md:w-14 object-contain" />
              </div>
              <span className={`text-2xl md:text-3xl font-black ${textPrimary} tracking-tighter uppercase`}>TERSIS</span>
            </button>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-6">
              {['services', 'fleet', 'about', 'coverage', 'contact'].map((s) => (
                <button key={s} onClick={() => scrollToSection(s)} className={`${textSecondary} hover:text-[#0052ff] transition text-sm font-semibold uppercase tracking-wide`}>{t.nav[s as keyof typeof t.nav]}</button>
              ))}
            </div>

            {/* Right Controls */}
            <div className="hidden md:flex items-center gap-3">
              <button onClick={() => setLang(lang === 'en' ? 'lt' : 'en')} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md border ${borderColor} ${textSecondary} hover:text-[#0052ff] transition text-xs font-bold uppercase`}><Languages size={14} /> {lang === 'en' ? 'LT' : 'EN'}</button>
              <button onClick={() => setIsDark(!isDark)} className={`p-2 rounded-md border ${borderColor} ${textSecondary} hover:text-[#0052ff]`}>{isDark ? <Sun size={16} /> : <Moon size={16} />}</button>
              <button onClick={() => scrollToSection('contact')} className="bg-[#0052ff] text-white px-5 py-2 hover:bg-[#003dd6] transition font-bold text-sm uppercase tracking-wide rounded-md">{t.nav.getQuote}</button>
            </div>

            <div className="md:hidden flex items-center gap-2">
              <button onClick={() => setLang(lang === 'en' ? 'lt' : 'en')} className={`px-2 py-1 text-xs font-bold ${textSecondary}`}>{lang === 'en' ? 'LT' : 'EN'}</button>
              <button onClick={() => setIsDark(!isDark)} className={`p-1.5 ${textSecondary}`}>{isDark ? <Sun size={16} /> : <Moon size={16} />}</button>
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className={textSecondary}>{isMenuOpen ? <X size={28} /> : <Menu size={28} />}</button>
            </div>
          </div>
        </div>
        {isMenuOpen && (
          <div className={`md:hidden ${navBg} border-t ${borderColor} px-4 py-6 flex flex-col gap-4 shadow-xl`}>
            {['services', 'fleet', 'about', 'coverage', 'contact'].map((s) => (
              <button key={s} onClick={() => scrollToSection(s)} className={`block w-full text-left ${textSecondary} text-sm font-bold uppercase`}>{t.nav[s as keyof typeof t.nav]}</button>
            ))}
            <button onClick={() => scrollToSection('contact')} className="w-full bg-[#0052ff] text-white py-3 rounded-md font-bold uppercase text-xs tracking-widest">GET A QUOTE</button>
          </div>
        )}
      </nav>

      {/* ─── HERO SECTION ─── */}
      <section className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 relative min-h-[90vh] flex items-center overflow-hidden">
        <video autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover z-0 opacity-70">
          <source src="/hero-video.mp4.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/60 z-10" />
        <div className="max-w-7xl mx-auto w-full relative z-20">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="animate-fadeInUp text-white">
              <div className="inline-block mb-6 px-4 py-2 bg-[#0052ff]/20 border border-[#0052ff]/40 rounded-md">
                <p className="text-[#0052ff] text-xs font-black tracking-widest uppercase">{lang === 'en' ? 'EST. 2011 • Trusted Experience' : 'ĮKURTA 2011 • Patikima patirtis'}</p>
              </div>
              <h1 className="text-5xl sm:text-6xl md:text-[80px] font-black text-white mb-6 leading-[1.0] tracking-tight uppercase">OWN FLEET.<br /><span className="text-[#0052ff]">EUROPEAN</span><br />LOGISTICS.</h1>
              <p className="text-lg text-gray-200 mb-10 leading-relaxed max-w-lg font-medium">
                {lang === 'en' ? 'We operate a fleet of 27+ modern Euro 6 vehicles, specializing in high-capacity MEGA trailers (105 m³) and delivering reliable standard transport solutions worldwide.' : 'Valdome 27+ modernių Euro 6 transporto priemonių parką, specializuojamės didelio tūrio MEGA puspriekabėmis (105 m³) ir teikiame patikimus standartinio transporto sprendimus visame pasaulyje.'}
              </p>
              <button onClick={() => scrollToSection('contact')} className="bg-[#0052ff] text-white px-10 py-5 rounded-md text-base font-bold hover:bg-[#003dd6] transition flex items-center gap-2 uppercase tracking-wide shadow-lg">{t.hero.getQuote} <ArrowRight size={18} /></button>
            </div>
            <div className="hidden md:flex flex-col gap-6 items-end">
               <div className="bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-2xl w-full max-w-[340px] text-white">
                  <Truck className="text-[#0052ff] mb-4" size={40} /><p className="text-5xl font-black mb-1">27+</p><p className="text-xs font-bold text-gray-400 uppercase tracking-widest">{lang === 'en' ? 'Own Vehicles' : 'Savas parkas'}</p>
               </div>
               <div className="bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-2xl w-full max-w-[340px] text-white text-left">
                  <FileText className="text-[#0052ff] mb-4" size={40} /><p className="text-xl font-black mb-1 uppercase tracking-tight leading-none">LIC-009666-EBKR</p><p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{lang === 'en' ? 'EU Transport License' : 'ES transporto licencija'}</p>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── FLEET ─── */}
      <section id="fleet" className={`py-24 px-4 sm:px-6 lg:px-8 border-t ${borderColor}`}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 animate-fadeInUp"><h2 className={`text-4xl md:text-5xl font-black ${textPrimary} mb-4 tracking-tight uppercase`}>{t.fleet.title}</h2><p className={`text-lg ${textSecondary}`}>{t.fleet.subtitle}</p></div>
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className={`border ${borderAccent} p-6 md:p-8 ${bgCard} rounded-xl hover:border-[#0052ff]/50 transition-all flex flex-col`}>
              <div className="flex items-center gap-4 mb-8">
                <div className={`w-14 h-14 ${isDark ? 'bg-[#0052ff]/10' : 'bg-[#0052ff]/5'} flex items-center justify-center border ${borderAccent} rounded-lg`}><Truck className="h-7 w-7 text-[#0052ff]" /></div>
                <div><h3 className={`text-xl font-black ${textPrimary} tracking-tight uppercase`}>{t.fleet.standardClass}</h3><p className="text-[#0052ff] font-bold text-sm">92 m³ {t.fleet.capacity}</p></div>
              </div>
              <div className="space-y-4 mb-8 flex-grow">
                {[ [t.fleet.length, '13.6 m'], [t.fleet.height, '2.7 m'], [t.fleet.capacity, `33 ${t.fleet.euroPallets}`], [t.fleet.idealFor, t.fleet.generalCargo] ].map(([l, v], i) => (
                  <div key={i} className="flex justify-between items-start gap-4 border-b border-white/5 pb-3 last:border-0"><span className={`${textMuted} text-[10px] md:text-sm uppercase tracking-widest font-bold flex-shrink-0`}>{l}</span><span className={`${textPrimary} font-black text-right`}>{v}</span></div>
                ))}
              </div>
              <p className={`${textMuted} text-xs italic border-t ${borderColor} pt-4`}>{t.fleet.standardFooter}</p>
            </div>
            <div className={`border ${borderAccent} p-6 md:p-8 ${bgCard} rounded-xl hover:border-[#0052ff]/50 transition-all flex flex-col`}>
              <div className="flex items-center gap-4 mb-8">
                <div className={`w-14 h-14 ${isDark ? 'bg-[#0052ff]/10' : 'bg-[#0052ff]/5'} flex items-center justify-center border ${borderAccent} rounded-lg`}><Maximize2 className="h-7 w-7 text-[#0052ff]" /></div>
                <div><h3 className={`text-xl font-black ${textPrimary} tracking-tight uppercase`}>{t.fleet.megaAdvantage}</h3><p className="text-[#0052ff] font-bold text-sm">105 m³ {t.fleet.capacity}</p></div>
              </div>
              <div className="space-y-4 mb-8 flex-grow">
                {[ [t.fleet.internalHeight, '3.0 m'], [t.fleet.volume, '105 m³'], [t.fleet.specialization, t.fleet.lightweightCargo], ['Advantage', '+14% capacity'] ].map(([l, v], i) => (
                  <div key={i} className="flex justify-between items-start gap-4 border-b border-white/5 pb-3 last:border-0"><span className={`${textMuted} text-[10px] md:text-sm uppercase tracking-widest font-bold flex-shrink-0`}>{l}</span><span className={`${textPrimary} font-black text-right`}>{v}</span></div>
                ))}
              </div>
              <p className={`${textMuted} text-xs italic border-t ${borderColor} pt-4`}>{t.fleet.megaFooter}</p>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 uppercase font-black text-xs tracking-tight">
            {[ {icon:Shield,t:t.fleet.cmrInsured,s:t.fleet.fullCoverage}, {icon:Clock,t:t.fleet.realTime,s:t.fleet.tracking}, {icon:Truck,t:t.fleet.modernFleet,s:'2018-2023'}, {icon:Check,t:t.fleet.euro6,s:t.fleet.compliant} ].map((item, idx) => (
              <div key={idx} className={`border ${borderAccent} p-5 text-center ${bgCard} rounded-lg`}><item.icon className="h-7 w-7 text-[#0052ff] mx-auto mb-3" /><p className={textPrimary}>{item.t}</p><p className={textMuted}>{item.s}</p></div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SERVICES ─── */}
      <section id="services" className={`py-24 px-4 sm:px-6 lg:px-8 border-t ${borderColor}`}>
        <div className="max-w-7xl mx-auto text-center">
          <h2 className={`text-4xl md:text-5xl font-black ${textPrimary} mb-4 tracking-tight uppercase`}>{t.services.title}</h2>
          <p className="text-lg md:text-xl text-[#0052ff] font-black tracking-[0.2em] uppercase mb-16">Integrated Transport & Logistics Solutions</p>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-5">
            {t.services.items.map((svc, idx) => {
              const Icon = serviceIcons[idx] || Truck
              let displayTitle = svc.title;
              if (displayTitle.includes('Groupage') || displayTitle.includes('Grupinių')) displayTitle = displayTitle.split('/')[0].trim();
              return ( <div key={idx} className={`border ${borderAccent} p-6 ${bgCard} rounded-xl hover:border-[#0052ff]/60 transition-all group text-left`}><Icon className="h-9 w-9 text-[#0052ff] mb-4 group-hover:scale-110 transition" /><h3 className={`text-sm font-black ${textPrimary} mb-1 uppercase tracking-wide`}>{displayTitle}</h3><p className={`text-xs ${textMuted} font-semibold uppercase tracking-widest`}>{svc.subtitle}</p></div> )
            })}
          </div>
        </div>
      </section>

      {/* ─── ABOUT ─── */}
      <section id="about" className={`py-24 px-4 sm:px-6 lg:px-8 border-t ${borderColor}`}>
        <div className="max-w-7xl mx-auto text-center">
          <h2 className={`text-4xl md:text-5xl font-black ${textPrimary} mb-4 tracking-tight uppercase`}>{t.about.title}</h2>
          <p className="text-lg text-[#0052ff] font-black tracking-[0.2em] uppercase mb-12">Your trusted logistics partner since 2011</p>
          <div className="max-w-4xl mx-auto mb-16 space-y-6 text-gray-500 font-medium leading-relaxed">
            <p className="text-lg">{lang === 'en' ? 'TERSIS provides reliable, cost-effective transportation solutions worldwide. We operate a modern fleet of 27 vehicles ensuring direct control and maximum efficiency.' : 'TERSIS teikia patikimus ir ekonomiškus transporto sprendimus visame pasaulyje. Valdome 27 modernių automobilių parką, užtikrinantį tiesioginę kontrolę.'}</p>
            <p className="text-lg">{lang === 'en' ? 'Our professional team (15+ years experience) ensures seamless cargo handling and 100% safety with LIC-009666-EBKR.' : 'Mūsų profesionali komanda (15+ metų patirtis) užtikrina sklandų krovinių tvarkymą ir 100% saugumą.'}</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {t.about.features.map((f, idx) => {
              const Icon = aboutIcons[idx] || Shield
              return ( <div key={idx} className={`border ${borderAccent} p-6 ${bgCard} rounded-xl group transition-all text-left`}><Icon className="h-10 w-10 text-[#0052ff] mb-4 group-hover:scale-110 transition" /><h3 className={`text-base font-black ${textPrimary} mb-1 tracking-tight`}>{f.title}</h3><p className={`text-sm ${textMuted}`}>{f.subtitle}</p></div> )
            })}
          </div>
        </div>
      </section>

      {/* ─── COVERAGE MAP ─── */}
      <section id="coverage" className={`py-24 px-4 sm:px-6 lg:px-8 border-t ${borderColor}`}>
        <div className="max-w-7xl mx-auto text-center">
          <h2 className={`text-4xl md:text-5xl font-black ${textPrimary} mb-4 tracking-tight uppercase`}>{t.coverage.title}</h2>
          <p className="text-lg md:text-xl text-[#0052ff] font-black tracking-[0.3em] uppercase mb-16">Europe • Baltics • Global</p>
          <div className="relative h-[400px] md:h-[650px] rounded-[40px] overflow-hidden border border-[#0052ff]/30 shadow-2xl bg-black">
            <img src="/map-hub.jpg.png" alt="Tersis Global Hub" className="absolute inset-0 w-full h-full object-cover opacity-90" />
            <svg className="absolute inset-0 w-full h-full z-10 pointer-events-none" viewBox="0 0 1000 600" preserveAspectRatio="xMidYMid slice">
              <defs><radialGradient id="comet-grad"><stop offset="0%" stopColor="#fff" stopOpacity="1" /><stop offset="100%" stopColor="#0052ff" stopOpacity="0" /></radialGradient></defs>
              <g fill="none" strokeWidth="2" strokeLinecap="round">
                <path d="M 150,230 Q 300,100 485,205" stroke="url(#comet-grad)" strokeDasharray="1, 50"><animate attributeName="stroke-dashoffset" from="300" to="0" dur="3s" repeatCount="indefinite" /></path>
                <path d="M 220,480 Q 350,300 485,205" stroke="url(#comet-grad)" strokeDasharray="1, 50"><animate attributeName="stroke-dashoffset" from="300" to="0" dur="3.5s" repeatCount="indefinite" /></path>
                <path d="M 850,380 Q 650,250 485,205" stroke="url(#comet-grad)" strokeDasharray="1, 50"><animate attributeName="stroke-dashoffset" from="300" to="0" dur="2.8s" repeatCount="indefinite" /></path>
                <path d="M 820,130 Q 650,80 485,205" stroke="url(#comet-grad)" strokeDasharray="1, 50"><animate attributeName="stroke-dashoffset" from="300" to="0" dur="3.2s" repeatCount="indefinite" /></path>
              </g>
            </svg>
          </div>
        </div>
      </section>

      {/* ─── CONTACT ─── */}
      <section id="contact" className={`py-24 px-4 sm:px-6 lg:px-8 border-t ${borderColor}`}>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12"><h2 className={`text-4xl md:text-5xl font-black ${textPrimary} mb-4 tracking-tight uppercase text-white`}>Get a Quote</h2><p className={`text-lg ${textSecondary}`}>{t.contact.subtitle}</p></div>
          <div className={`${bgCard} border ${borderAccent} rounded-2xl p-8 md:p-10 shadow-2xl`}>
            <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-5 text-left font-bold uppercase tracking-tight">
              {[{k:'from'},{k:'to'},{k:'cargoType'},{k:'weight'},{k:'volume'},{k:'name'}].map(({k})=>(
                <div key={k}><label className={`block text-xs font-bold ${textSecondary} mb-2 uppercase tracking-widest`}>{(t.contact as any)[k]}</label><input required value={(formData as any)[k]} onChange={(e)=>setFormData({...formData,[k]:e.target.value})} className={`w-full px-4 py-3 ${inputBg} border ${borderAccent} ${textPrimary} focus:border-[#0052ff] outline-none transition rounded-lg text-sm`} placeholder={(t.contact.placeholders as any)[k]} /></div>
              ))}
              <div className="md:col-span-2"><label className={`block text-xs font-bold ${textSecondary} mb-2 uppercase tracking-widest`}>EMAIL</label><input type="email" required value={formData.email} onChange={(e)=>setFormData({...formData,email:e.target.value})} className={`w-full px-4 py-3 ${inputBg} border ${borderAccent} ${textPrimary} focus:border-[#0052ff] outline-none transition rounded-lg text-sm`} placeholder="OFFICE@TERSIS.LT" /></div>
              <div className="md:col-span-2"><label className={`block text-xs font-bold ${textSecondary} mb-2 uppercase tracking-widest`}>PHONE</label><input type="tel" required value={formData.phone} onChange={(e)=>setFormData({...formData,phone:e.target.value})} className={`w-full px-4 py-3 ${inputBg} border ${borderAccent} ${textPrimary} focus:border-[#0052ff] outline-none transition rounded-lg text-sm`} placeholder="+370..." /></div>
              <div className="md:col-span-2"><label className={`block text-xs font-bold ${textSecondary} mb-2 uppercase tracking-widest`}>MESSAGE</label><textarea value={formData.message} onChange={(e)=>setFormData({...formData,message:e.target.value})} rows={3} className={`w-full px-4 py-3 ${inputBg} border ${borderAccent} ${textPrimary} focus:border-[#0052ff] outline-none transition rounded-lg text-sm`} placeholder="ADDITIONAL DETAILS..." /></div>
              <button type="submit" className="md:col-span-2 bg-[#0052ff] text-white py-5 font-black hover:bg-[#003dd6] transition uppercase tracking-widest rounded-lg shadow-xl">{isSubmitted ? 'SENT' : 'REQUEST QUOTE IN 24H'}</button>
            </form>
          </div>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer className={`${bg} border-t ${borderColor} py-16 px-4 text-sm font-bold uppercase`}>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-center md:text-left space-y-2">
            <div className="flex items-center gap-3 mb-2 justify-center md:justify-start"><img src="/logo.png" alt="TERSIS" className="h-10 w-10 object-contain" /><h4 className={`text-xl font-black ${textPrimary}`}>TERSIS</h4></div>
            <p className={textSecondary}><MapPin className="inline h-4 w-4 mr-2 text-[#0052ff]" /> Taikos pr. 141-305, Kaunas, LT-51132, Lithuania</p>
            <p className={textSecondary}><Phone className="inline h-4 w-4 mr-2 text-[#0052ff]" /> +370 37 321 321</p>
            <p className={textSecondary}><Mail className="inline h-4 w-4 mr-2 text-[#0052ff]" /> info@tersis.lt</p>
            <p className={`${textMuted} mt-6 font-black tracking-widest`}>© 2026 TERSIS. European asset-based carrier | All rights reserved.</p>
          </div>
          <div className="hidden md:flex gap-8 text-[#0052ff]"><FileText size={40} /><Shield size={40} /><Globe size={40} /></div>
        </div>
      </footer>
    </div>
  )
}
