import React from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { Truck, Globe, Box, Shield, Mail, Phone, MapPin, ChevronRight, Star, Clock, Anchor, Cloud } from 'lucide-react';

// ЭТО ВАЖНАЯ ЧАСТЬ ДЛЯ ТВОЕГО ПРОЕКТА:
export const Route = createFileRoute('/')({
  component: LandingPage,
});

function LandingPage() {
  return (
    <div className="min-h-screen bg-white font-sans text-slate-900">
      {/* NAVIGATION */}
      <nav className="fixed w-full z-50 bg-white/90 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-24">
            <div className="flex flex-col">
              <div className="flex items-center">
                <span className="text-3xl font-black tracking-tighter text-blue-600 uppercase">TERSIS</span>
              </div>
              <div className="flex flex-col -mt-1">
                <span className="text-[11px] font-extrabold text-slate-700 tracking-tight uppercase">
                  EU TRANSPORT LICENSE: <span className="text-blue-600 underline">LIC-009666-EBKR</span>
                </span>
                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-[0.2em] leading-none mt-0.5">
                  Asset-Based Carrier | Own Fleet
                </span>
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#services" className="text-xs font-black tracking-widest hover:text-blue-600 transition uppercase">Services</a>
              <a href="#map" className="text-xs font-black tracking-widest hover:text-blue-600 transition uppercase">Logistics Hub</a>
              <a href="#contact" className="bg-blue-600 text-white px-8 py-3 rounded-full text-xs font-black tracking-widest hover:bg-blue-700 transition shadow-xl shadow-blue-200 uppercase">
                Get a Quote
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* HERO SECTION WITH VIDEO */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden bg-slate-900">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover z-0"
        >
          <source src="/hero-video.mp4.mp4" type="video/mp4" />
        </video>
        
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/40 via-transparent to-slate-900/60 z-10"></div>

        <div className="relative z-20 max-w-5xl mx-auto px-4 text-center">
          <div className="inline-block px-4 py-1.5 mb-6 bg-blue-600/20 backdrop-blur-md border border-blue-400/30 rounded-full">
             <span className="text-blue-400 text-xs font-black tracking-[0.3em] uppercase">Worldwide Logistics Solutions</span>
          </div>
          <h1 className="text-6xl md:text-9xl font-black text-white mb-8 tracking-tighter uppercase italic">
            TERSIS
          </h1>
          <p className="text-xl md:text-3xl text-white mb-12 leading-tight font-medium max-w-4xl mx-auto">
            Operating 27+ modern Euro-6 vehicles. Specializing in high-capacity <span className="text-blue-400 font-bold">MEGA trailers (105 m³)</span> and standard solutions <span className="underline decoration-blue-500 font-bold tracking-widest">WORLDWIDE</span>.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <a href="#contact" className="bg-blue-600 hover:bg-blue-700 text-white px-12 py-6 rounded-full font-black text-xl transition-all transform hover:scale-105 shadow-2xl shadow-blue-600/30 uppercase tracking-wider">
              Request a Quote
            </a>
          </div>
        </div>
      </section>

      {/* LOGISTICS MAP SECTION (KAUNAS HUB) */}
      <section id="map" className="py-24 bg-white relative overflow-hidden text-center">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-5xl font-black mb-4 tracking-tighter uppercase">Consolidation Hub</h2>
          <p className="text-blue-600 text-sm font-black uppercase tracking-[0.4em] mb-12">Kaunas, Lithuania — Connecting the World</p>

          <div className="relative h-[600px] w-full bg-slate-900 rounded-[50px] border border-slate-800 flex items-center justify-center overflow-hidden shadow-2xl">
            <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/world-map.png')] bg-center bg-no-repeat scale-125"></div>

            <div className="relative z-30">
              <div className="w-12 h-12 bg-blue-500 rounded-full relative shadow-[0_0_60px_rgba(59,130,246,1)]">
                <div className="absolute inset-0 rounded-full bg-blue-400 animate-ping opacity-75"></div>
                <div className="absolute inset-2 bg-white rounded-full border-4 border-blue-600"></div>
              </div>
              <div className="absolute top-16 left-1/2 -translate-x-1/2">
                <span className="bg-blue-600 text-white px-6 py-2 rounded-full text-lg font-black uppercase tracking-widest">Kaunas</span>
              </div>
            </div>

            <svg className="absolute inset-0 w-full h-full pointer-events-none z-20">
              <path d="M 100,200 Q 300,250 480,290" stroke="#3b82f6" strokeWidth="2" fill="none" strokeDasharray="8,4" className="animate-pulse" />
              <path d="M 800,150 Q 650,220 520,290" stroke="#3b82f6" strokeWidth="2" fill="none" strokeDasharray="8,4" />
              <path d="M 200,500 Q 350,450 490,320" stroke="#3b82f6" strokeWidth="2" fill="none" strokeDasharray="8,4" />
            </svg>
          </div>
        </div>
      </section>

      {/* QUOTE FORM SECTION */}
      <section id="contact" className="py-24 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 bg-white rounded-[40px] p-12 shadow-xl border border-slate-100 text-center">
            <h2 className="text-4xl font-black mb-12 tracking-tighter uppercase">Get a Quote</h2>
            <form className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
              <input type="text" placeholder="Full Name" className="w-full px-8 py-5 rounded-3xl bg-slate-50 border-none focus:ring-2 focus:ring-blue-600 outline-none font-bold shadow-inner" />
              <input type="email" placeholder="Email" className="w-full px-8 py-5 rounded-3xl bg-slate-50 border-none focus:ring-2 focus:ring-blue-600 outline-none font-bold shadow-inner" />
              <input type="text" placeholder="Origin" className="w-full px-8 py-5 rounded-3xl bg-slate-50 border-none focus:ring-2 focus:ring-blue-600 outline-none font-bold shadow-inner" />
              <input type="text" placeholder="Destination" className="w-full px-8 py-5 rounded-3xl bg-slate-50 border-none focus:ring-2 focus:ring-blue-600 outline-none font-bold shadow-inner" />
              <textarea placeholder="Cargo Details" className="md:col-span-2 w-full px-8 py-5 rounded-3xl bg-slate-50 border-none focus:ring-2 focus:ring-blue-600 outline-none font-bold shadow-inner" rows={4}></textarea>
              <button className="md:col-span-2 bg-blue-600 text-white py-6 rounded-3xl font-black text-xl hover:bg-blue-700 transition uppercase shadow-xl shadow-blue-500/30">
                Send Inquiry
              </button>
            </form>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-slate-900 text-w
