import React, { useState, useEffect, useCallback, memo } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import {
  Truck, ArrowRight, Check, Shield, Clock, Menu, X,
  Phone, Mail, MapPin, Globe, AlertTriangle,
  Handshake, Users, FileText, Home, Maximize2,
  Sun, Moon, Languages
} from 'lucide-react'
import { translations, type Lang } from '@/lib/i18n'

/* ================= HERO VIDEO ================= */
const HeroBg = memo(() => (
  <div className="absolute inset-0 z-0 pointer-events-none">
    <video
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      className="w-full h-full object-cover opacity-60"
    >
      <source src="/hero-video.mp4.mp4" type="video/mp4" />
    </video>
    <div className="absolute inset-0 bg-black/60" />
  </div>
))

/* ================= MAP (БЕЗ SVG АНИМАЦИИ) ================= */
const CoverageMap = memo(() => (
  <div className="relative h-[500px] md:h-[650px] rounded-[30px] overflow-hidden border border-[#0052ff]/20">
    <img
      src="/map-hub.jpg.png"
      className="absolute inset-0 w-full h-full object-cover opacity-90"
    />
  </div>
))

export const Route = createFileRoute('/')({
  component: App,
})

function App() {
  const [menu, setMenu] = useState(false)
  const [lang, setLang] = useState<Lang>('en')
  const [isDark, setIsDark] = useState(true)
  const [submitted, setSubmitted] = useState(false)

  const t = translations[lang]

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark)
  }, [isDark])

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setMenu(false)
  }

  const handleSubmit = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const data = Object.fromEntries(new FormData(form))

    try {
      await fetch('/send.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      setSubmitted(true)
      form.reset()
      setTimeout(() => setSubmitted(false), 3000)
    } catch {
      alert('Error sending form')
    }
  }, [])

  return (
    <div className="min-h-screen bg-[#050a14] text-white">

      {/* ================= NAV ================= */}
      <nav className="sticky top-0 z-50 bg-[#050a14] border-b border-white/5">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-6 h-20">

          <div className="flex items-center gap-2 cursor-pointer" onClick={() => scrollTo('hero')}>
            <img src="/logo.png" className="h-10" />
            <span className="font-black text-xl tracking-tight">TERSIS</span>
          </div>

          <div className="hidden md:flex gap-6 text-xs uppercase tracking-widest text-gray-400">
            {(['services','fleet','about','coverage','contact'] as const).map(s => (
              <button key={s} onClick={() => scrollTo(s)} className="hover:text-white">
                {t.nav[s]}
              </button>
            ))}
          </div>

          <div className="hidden md:flex gap-3 items-center">
            <button onClick={() => setLang(lang === 'en' ? 'lt' : 'en')} className="text-xs font-bold">
              <Languages size={14}/> {lang === 'en' ? 'LT' : 'EN'}
            </button>
            <button onClick={() => setIsDark(!isDark)}>
              {isDark ? <Sun size={16}/> : <Moon size={16}/>}
            </button>
          </div>

          <button className="md:hidden" onClick={() => setMenu(!menu)}>
            {menu ? <X /> : <Menu />}
          </button>
        </div>

        {menu && (
          <div className="md:hidden px-6 pb-6 space-y-3">
            {(['services','fleet','about','coverage','contact'] as const).map(s => (
              <button key={s} onClick={() => scrollTo(s)} className="block w-full text-left">
                {t.nav[s]}
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* ================= HERO ================= */}
      <section id="hero" className="relative h-screen flex items-center px-6">
        <HeroBg />
        <div className="relative z-20 max-w-5xl">
          <h1 className="text-6xl md:text-8xl font-black uppercase leading-[0.9]">
            {t.hero.title1}<br />
            {t.hero.title2}<br />
            <span className="text-[#0052ff]">{t.hero.title3}</span>
          </h1>

          <p className="text-gray-300 mt-6 max-w-lg">
            Asset-based logistics with 27+ Euro 6 vehicles.
          </p>

          <button
            onClick={() => scrollTo('contact')}
            className="mt-10 bg-[#0052ff] px-10 py-5 font-black uppercase tracking-widest"
          >
            {t.hero.getQuote} <ArrowRight className="inline ml-2" />
          </button>
        </div>
      </section>

      {/* ================= FLEET ================= */}
      <section id="fleet" className="py-24 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10">

          <div className="p-10 bg-[#0a1628] border border-white/5">
            <Truck className="text-[#0052ff] mb-6" />
            <h3 className="text-2xl font-black">{t.fleet.standardClass}</h3>
            <p className="text-gray-400 mt-2">92 m³</p>
          </div>

          <div className="p-10 bg-[#0a1628] border border-white/5">
            <Maximize2 className="text-[#0052ff] mb-6" />
            <h3 className="text-2xl font-black">{t.fleet.megaAdvantage}</h3>
            <p className="text-gray-400 mt-2">105 m³</p>
          </div>

        </div>
      </section>

      {/* ================= SERVICES ================= */}
      <section id="services" className="py-24 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-6">
          {t.services.items.map((s, i) => (
            <div key={i} className="p-6 bg-[#0a1628] border border-white/5">
              <p className="text-xs font-black uppercase">{s.title}</p>
              <p className="text-gray-500 text-[10px] mt-2">{s.subtitle}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ================= ABOUT ================= */}
      <section id="about" className="py-24 px-6 border-t border-white/5 text-center">
        <h2 className="text-4xl font-black mb-6">{t.about.title}</h2>
        <p className="text-gray-400 max-w-3xl mx-auto mb-12">
          Reliable European logistics partner since 2011.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[Truck, Globe, Clock, Shield, FileText, Handshake, Users, Check].map((Icon, i) => (
            <div key={i} className="p-6 bg-[#0a1628] border border-white/5">
              <Icon className="text-[#0052ff] mb-3 mx-auto"/>
            </div>
          ))}
        </div>
      </section>

      {/* ================= COVERAGE ================= */}
      <section id="coverage" className="py-24 px-6 border-t border-white/5">
        <CoverageMap />
      </section>

      {/* ================= CONTACT (🔥 FIX) ================= */}
      <section
        id="contact"
        className="py-24 px-6"
        style={{
          contain: 'layout paint style',
          isolation: 'isolate',
        }}
      >
        <div className="max-w-3xl mx-auto bg-[#0F1A2B] border border-[#1A2C45] p-10">
          <form onSubmit={handleSubmit} className="space-y-6">

            <input name="from" placeholder="From" required className="w-full p-4 bg-[#0a1628]" />
            <input name="to" placeholder="To" required className="w-full p-4 bg-[#0a1628]" />
            <input name="email" placeholder="Email" required className="w-full p-4 bg-[#0a1628]" />

            <textarea name="message" rows={3} className="w-full p-4 bg-[#0a1628]" />

            <button
              type="submit"
              disabled={submitted}
              className="w-full bg-[#0052ff] py-5 font-black uppercase"
            >
              {submitted ? 'SENT' : 'REQUEST QUOTE'}
            </button>

          </form>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="py-16 text-center text-gray-600 text-xs uppercase border-t border-white/5">
        © 2026 TERSIS
      </footer>

    </div>
  )
}
