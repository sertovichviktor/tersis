// index.tsx (patched)
import React, { useState, useEffect, useCallback, memo } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { Truck, ArrowRight, Menu, X, Maximize2 } from 'lucide-react'
import { translations, type Lang } from '@/lib/i18n'

// Memoized hero section (video is pointer-events:none)
const Hero = memo(({ t, scrollTo }: any) => (
  <section id="top" className="relative h-screen flex items-center px-6 overflow-hidden bg-[#050a14]">
    <div className="absolute inset-0 pointer-events-none">
      <video autoPlay muted loop playsInline preload="auto" className="w-full h-full object-cover opacity-50">
        <source src="/hero-video.mp4.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-black/60" />
    </div>
    <div className="relative z-10 max-w-4xl">
      <h1 className="text-6xl md:text-8xl font-black uppercase leading-[0.9] text-white">
        {t.hero.title1}<br />
        <span className="text-[#0052ff]">{t.hero.title2}</span>
      </h1>
      <button
        onClick={() => scrollTo('contact')}
        className="mt-10 bg-[#0052ff] px-10 py-5 font-black uppercase tracking-widest text-white"
      >
        {t.hero.getQuote} <ArrowRight className="inline ml-2" />
      </button>
    </div>
  </section>
))

const coverageMap = memo(() => (
  <section id="coverage" className="py-24 px-6 bg-[#050a14] border-t border-[#0052ff]/30">
    <h2 className="text-4xl font-black text-center text-white mb-12">International Coverage</h2>
    <div className="relative h-[400px] md:h-[650px] rounded-[40px] overflow-hidden bg-black">
      <img 
        src="/map-hub.jpg.png" 
        alt="Coverage Map" 
        className="absolute inset-0 w-full h-full object-cover opacity-80 pointer-events-none" 
      />
    </div>
  </section>
))

export const Route = createFileRoute('/')({ component: TersisApp })

const serviceIcons = [Truck, /*...other icons...*/, Shield]

function TersisApp() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [lang, setLang] = useState<Lang>('en')
  const [isSubmitted, setIsSubmitted] = useState(false)
  const t = translations[lang]

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setIsMenuOpen(false)
  }

  const handleSubmit = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const data = Object.fromEntries(new FormData(form))
    setIsSubmitted(true)
    await fetch('/send.php', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data),
    })
    form.reset()
    setTimeout(() => setIsSubmitted(false), 3000)
  }, [])

  return (
    <div className="bg-[#050a14] text-white min-h-screen">
      {/* NAV */}
      <nav className={`sticky top-0 z-50 bg-[#050a14] border-b border-white/5`}>
        <div className="max-w-7xl mx-auto flex justify-between items-center px-6 h-20">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => scrollToSection('top')}>
            <img src="/logo.png" className="h-10" alt="Tersis Logo" />
            <span className="font-black text-xl">TERSIS</span>
          </div>
          <div className="hidden md:flex gap-6 text-xs uppercase tracking-widest text-gray-400">
            {['services','fleet','about','contact'].map(s => (
              <button key={s} onClick={() => scrollToSection(s)}>
                {t.nav[s as keyof typeof t.nav]}
              </button>
            ))}
          </div>
          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-[#050a14] border-t border-white/5 px-6 pb-6">
            {['services','fleet','about','contact'].map(s => (
              <button key={s} onClick={() => scrollToSection(s)} className="block w-full text-left mb-2">
                {t.nav[s as keyof typeof t.nav]}
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* HERO */}
      <Hero t={t} scrollTo={scrollToSection} />

      {/* FLEET */}
      <section id="fleet" className="py-24 px-6 border-t border-white/5">
        <h2 className="text-center text-4xl font-black mb-12">Fleet</h2>
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10">
          <div className="p-8 bg-[#0a1628] border border-white/5">
            <Truck className="text-[#0052ff] mb-4" size={40} />
            <h3 className="font-black text-2xl mb-2">{t.fleet.standardClass}</h3>
            <p className="text-gray-400">92 m³</p>
          </div>
          <div className="p-8 bg-[#0a1628] border border-white/5">
            <Maximize2 className="text-[#0052ff] mb-4" size={40} />
            <h3 className="font-black text-2xl mb-2">{t.fleet.megaAdvantage}</h3>
            <p className="text-gray-400">105 m³</p>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="py-24 px-6 border-t border-white/5 text-center">
        <h2 className="text-4xl font-black mb-12">{t.services.title}</h2>
        <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-6">
          {t.services.items.map((s, i) => {
            const Icon = serviceIcons[i] || Truck;
            return (
              <div key={i} className="p-6 bg-[#0a1628] border border-white/5">
                <Icon className="text-[#0052ff] mb-2" size={24} />
                <p className="text-xs font-black uppercase tracking-widest">{s.title}</p>
              </div>
            )
          })}
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-24 px-6 border-t border-white/5">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-black mb-8">{t.about.title}</h2>
          <p className="text-gray-400 text-lg leading-relaxed">
            Reliable logistics partner since 2011. License: <span className="text-white font-bold">LIC-009666-EBKR</span>.
          </p>
        </div>
      </section>

      {/* COVERAGE MAP */}
      <coverageMap />

      {/* CONTACT FORM */}
      <section id="contact-section" className="py-32 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="p-8 rounded-3xl border border-white/5 bg-[#0F1A2B]">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Input grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[10px] font-black text-gray-500 uppercase">FROM</label>
                  <input name="from" required placeholder="City, Country" className="w-full px-5 py-4 bg-[#0a1628] text-white text-sm rounded-xl border border-white/5 focus:border-[#0052ff]" />
                </div>
                <div>
                  <label className="block text-[10px] font-black text-gray-500 uppercase">TO</label>
                  <input name="to" required placeholder="City, Country" className="w-full px-5 py-4 bg-[#0a1628] text-white text-sm rounded-xl border border-white/5 focus:border-[#0052ff]" />
                </div>
              </div>
              {/* More fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[10px] font-black text-gray-500 uppercase">NAME</label>
                  <input name="name" required placeholder="Full Name" className="w-full px-5 py-4 bg-[#0a1628] text-white text-sm rounded-xl border border-white/5 focus:border-[#0052ff]" />
                </div>
                <div>
                  <label className="block text-[10px] font-black text-gray-500 uppercase">EMAIL</label>
                  <input name="email" type="email" required placeholder="email@example.com" className="w-full px-5 py-4 bg-[#0a1628] text-white text-sm rounded-xl border border-white/5 focus:border-[#0052ff]" />
                </div>
              </div>
              <div>
                <label className="block text-[10px] font-black text-gray-500 uppercase">MESSAGE (OPTIONAL)</label>
                <textarea name="message" rows={3} placeholder="Details..." className="w-full px-5 py-4 bg-[#0a1628] text-white text-sm rounded-xl border border-white/5 focus:border-[#0052ff] resize-none"></textarea>
              </div>
              <button
                type="submit"
                disabled={isSubmitted}
                className="w-full bg-[#0052ff] py-5 font-black uppercase tracking-widest disabled:opacity-50"
              >
                {isSubmitted ? 'SENT SUCCESS' : 'REQUEST QUOTE'}
              </button>
            </form>
          </div>
        </div>
      </section>

      <footer className="py-20 text-center text-gray-500 text-xs uppercase">
        © 2026 TERSIS. All rights reserved.
      </footer>
    </div>
  )
}
