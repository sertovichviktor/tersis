import React, { useState, useEffect, useCallback, memo } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import {
  Truck, ArrowRight, Check, Shield, Clock, Menu, X, Phone, Mail, MapPin, 
  Zap, Globe, Lock, AlertTriangle, Handshake, Users, FileText, Home, Maximize2
} from 'lucide-react'
// ИСПРАВЛЕН ПУТЬ:
import { translations, type Lang } from '../lib/i18n'

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
        {t.hero.title1}<br /><span className="text-[#0052ff]">{t.hero.title2}</span>
      </h1>
      <button onClick={() => scrollTo('contact')} className="mt-10 bg-[#0052ff] px-10 py-5 rounded-lg font-black text-sm uppercase text-white hover:bg-[#003dd6]">
        {t.hero.getQuote} <ArrowRight className="inline ml-2" />
      </button>
    </div>
  </section>
))

export const Route = createFileRoute('/')({ component: TersisApp })

function TersisApp() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [lang, setLang] = useState<Lang>('en')
  const [isSubmitted, setIsSubmitted] = useState(false)
  const t = translations[lang]

  useEffect(() => {
    const onScroll = () => {
      const offset = window.scrollY > 50
      if (isScrolled !== offset) setIsScrolled(offset)
    }
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [isScrolled])

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
    setIsMenuOpen(false)
  }

  const handleSubmit = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitted(true)
    const data = Object.fromEntries(new FormData(e.currentTarget))
    fetch('/send.php', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data),
    }).finally(() => {
      (e.target as HTMLFormElement).reset()
      setTimeout(() => setIsSubmitted(false), 3000)
    })
  }, [])

  return (
    <div className="bg-[#050a14] text-white min-h-screen">
      <nav className={`fixed w-full z-50 transition-all ${isScrolled ? 'bg-[#050a14]/98 border-b border-white/5' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto flex justify-between items-center px-6 h-20">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo({top:0, behavior:'smooth'})}>
            <img src="/logo.png" className="h-10" /><span className="font-black text-2xl tracking-tighter">TERSIS</span>
          </div>
          <div className="hidden md:flex gap-8 items-center">
            {['services','fleet','about','contact'].map(s => (
              <button key={s} onClick={() => scrollToSection(s)} className="text-gray-400 hover:text-white text-xs font-bold uppercase tracking-widest">{t.nav[s as keyof typeof t.nav]}</button>
            ))}
            <button onClick={() => setLang(lang === 'en' ? 'lt' : 'en')} className="border border-white/20 px-3 py-1 rounded text-[10px] font-black uppercase text-white">{lang}</button>
          </div>
        </div>
      </nav>

      <HeroBlock t={t} scrollTo={scrollToSection} />

      {/* ФОРМА (ВСЕ ПОЛЯ ИЗ СКРИНШОТА) */}
      <section id="contact" className="py-32 px-6 bg-[#050a14]">
        <div className="max-w-4xl mx-auto">
          <div className="p-8 md:p-12 rounded-[32px] border border-[#1A2C45] shadow-2xl" style={{ background: '#0F1A2B' }}>
            <form onSubmit={handleSubmit} className="space-y-6" autoComplete="off">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <label className="block text-[11px] font-black text-[#8899BB] uppercase mb-2.5">FROM (COUNTRY/CITY)</label>
                  <input name="from" required placeholder="Kaunas, Lithuania" className="w-full bg-[#0a1628] border border-white/5 rounded-xl px-5 py-4 text-white outline-none focus:border-blue-500" />
                </div>
                <div>
                  <label className="block text-[11px] font-black text-[#8899BB] uppercase mb-2.5">TO (COUNTRY/CITY)</label>
                  <input name="to" required placeholder="Berlin, Germany" className="w-full bg-[#0a1628] border border-white/5 rounded-xl px-5 py-4 text-white outline-none focus:border-blue-500" />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <label className="block text-[11px] font-black text-[#8899BB] uppercase mb-2.5">CARGO TYPE</label>
                  <input name="cargoType" placeholder="Electronics..." className="w-full bg-[#0a1628] border border-white/5 rounded-xl px-5 py-4 text-white outline-none focus:border-blue-500" />
                </div>
                <div>
                  <label className="block text-[11px] font-black text-[#8899BB] uppercase mb-2.5">WEIGHT (KG)</label>
                  <input name="weight" placeholder="5000" className="w-full bg-[#0a1628] border border-white/5 rounded-xl px-5 py-4 text-white outline-none focus:border-blue-500" />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <label className="block text-[11px] font-black text-[#8899BB] uppercase mb-2.5">VOLUME (M³)</label>
                  <input name="volume" placeholder="10" className="w-full bg-[#0a1628] border border-white/5 rounded-xl px-5 py-4 text-white outline-none focus:border-blue-500" />
                </div>
                <div>
                  <label className="block text-[11px] font-black text-[#8899BB] uppercase mb-2.5">NAME</label>
                  <input name="name" required placeholder="John Doe" className="w-full bg-[#0a1628] border border-white/5 rounded-xl px-5 py-4 text-white outline-none focus:border-blue-500" />
                </div>
              </div>
              <div>
                <label className="block text-[11px] font-black text-[#8899BB] uppercase mb-2.5">EMAIL</label>
                <input name="email" type="email" required placeholder="john@company.com" className="w-full bg-[#0a1628] border border-white/5 rounded-xl px-5 py-4 text-white outline-none focus:border-blue-500" />
              </div>
              <button type="submit" disabled={isSubmitted} className="w-full py-6 bg-[#0052ff] text-white font-black rounded-2xl text-xs uppercase tracking-[0.3em]">
                {isSubmitted ? 'SENT SUCCESS' : 'REQUEST QUOTE IN 24H'}
              </button>
            </form>
          </div>
        </div>
      </section>

      <footer className="py-20 text-center text-gray-600 text-[10px] font-bold uppercase tracking-widest border-t border-white/5">
        © 2026 TERSIS. All rights reserved.
      </footer>
    </div>
  )
}
