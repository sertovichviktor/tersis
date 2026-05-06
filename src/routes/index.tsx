import React, { useState, useEffect, useCallback, memo } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { Truck, ArrowRight, Menu, X, Maximize2 } from 'lucide-react'
import { translations, type Lang } from '@/lib/i18n'

// === Hero section memoized (isolated from form) ===
const MemoHero = memo(({ t, scrollToSection }: { t: any, scrollToSection: (id: string)=>void }) => (
  <section id="top" className="relative h-screen flex items-center overflow-hidden px-6 bg-[#050a14]">
    <div className="absolute inset-0 pointer-events-none">
      <video autoPlay muted loop playsInline preload="auto" 
             className="w-full h-full object-cover opacity-60">
        <source src="/hero-video.mp4.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-black/60" />
    </div>
    <div className="relative z-10 max-w-4xl">
      <h1 className="text-6xl md:text-8xl font-black uppercase leading-[0.9] text-white">
        {t.hero.title1}<br />
        <span className="text-[#0052ff]">{t.hero.title2}</span>
      </h1>
      <button onClick={() => scrollToSection('contact-section')}
              className="mt-10 bg-[#0052ff] px-10 py-5 font-black uppercase tracking-widest">
        {t.hero.getQuote} <ArrowRight className="inline ml-2" />
      </button>
    </div>
  </section>
))

// === Contact form isolated component ===
const MemoContactForm = memo(({ onSubmit, isSubmitting }: { onSubmit: any, isSubmitting: boolean }) => (
  <section id="contact-section" className="py-24 px-6 bg-[#050a14]">
    <div className="max-w-3xl mx-auto border border-[#1A2C45] p-8 bg-[#0F1A2B]">
      <form onSubmit={onSubmit} className="space-y-6" style={{ contain: 'layout paint' }}>
        <input name="from" required placeholder="From" 
               className="w-full p-4 bg-[#0a1628]" />
        <input name="to" required placeholder="To" 
               className="w-full p-4 bg-[#0a1628]" />
        <input name="email" required placeholder="Email" 
               className="w-full p-4 bg-[#0a1628]" />
        <button type="submit" disabled={isSubmitting}
                className="w-full bg-[#0052ff] py-5 font-black uppercase">
          {isSubmitting ? 'SENT' : 'REQUEST QUOTE'}
        </button>
      </form>
    </div>
  </section>
))

export const Route = createFileRoute('/')({ component: TersisApp })

const serviceIcons = [Truck, Globe, AlertTriangle, Zap, Clock, Truck, FileText, Maximize2]

function TersisApp() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [lang, setLang] = useState<Lang>('en')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const t = translations[lang]

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Scroll function (does not change URL)
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
    setIsMenuOpen(false)
  }

  // Form submit handler
  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault()
    const form = e.currentTarget
    const data = Object.fromEntries(new FormData(form).entries())
    setIsSubmitting(true)
    fetch('/send.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }).finally(() => {
      form.reset()
      setTimeout(() => setIsSubmitting(false), 2000)
    })
  }, [])

  return (
    <div className="bg-[#050a14] text-white min-h-screen">
      {/* NAVIGATION */}
      <nav className="sticky top-0 z-50 bg-[#050a14] border-b border-white/5">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-6 h-20">
          <div onClick={() => scrollToSection('top')}
               className="flex items-center gap-2 cursor-pointer">
            <img src="/logo.png" className="h-10" alt="Logo"/>
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
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
        {isMenuOpen && (
          <div className="md:hidden px-6 pb-6 space-y-3">
            {['services','fleet','about','contact'].map(s => (
              <button key={s} onClick={() => scrollToSection(s)} className="block w-full text-left">
                {t.nav[s as keyof typeof t.nav]}
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* HERO (memoized) */}
      <MemoHero t={t} scrollToSection={scrollToSection} />

      {/* FLEET */}
      <section id="fleet" className="py-24 px-6 bg-[#050a14] border-t border-white/5">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10">
          <div className="p-8 border border-white/5 bg-[#0a1628]">
            <Truck className="text-[#0052ff] mb-4" />
            <h3 className="font-black text-2xl mb-4">{t.fleet.standardClass}</h3>
            <p className="text-gray-400 text-sm">92 m³</p>
          </div>
          <div className="p-8 border border-white/5 bg-[#0a1628]">
            <Maximize2 className="text-[#0052ff] mb-4" />
            <h3 className="font-black text-2xl mb-4">{t.fleet.megaAdvantage}</h3>
            <p className="text-gray-400 text-sm">105 m³</p>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="py-24 px-6 bg-[#050a14] border-t border-white/5 text-center">
        <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-6">
          {t.services.items.map((s, i) => {
            const Icon = serviceIcons[i] || Truck
            return (
              <div key={i} className="p-6 border border-white/5 bg-[#0a1628]">
                <Icon className="text-white mb-2" />
                <p className="text-white text-[11px] uppercase tracking-widest">{s.title}</p>
              </div>
            )
          })}
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-24 px-6 bg-[#050a14] border-t border-white/5 text-center">
        <h2 className="text-4xl font-black mb-8 uppercase">{t.about.title}</h2>
        <p className="max-w-4xl mx-auto text-gray-400 text-lg leading-relaxed mb-12">
          Reliable logistics partner since 2011. License: <span className="text-white font-bold">LIC-009666-EBKR</span>. Own fleet of 27 Euro 6 vehicles.
        </p>
      </section>

      {/* COVERAGE MAP (memoized, static) */}
      <MemoMap />

      {/* CONTACT FORM (memoized) */}
      <MemoContactForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />

      {/* FOOTER */}
      <footer className="py-16 text-center text-gray-600 text-xs uppercase">
        © 2026 TERSIS
      </footer>
    </div>
  )
}
