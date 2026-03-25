import React from 'react';
import { Truck, Globe, Box, Shield, Mail, Phone, MapPin, ChevronRight, Star, Clock, Anchor, Cloud } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white font-sans text-slate-900">
      {/* NAVIGATION */}
      <nav className="fixed w-full z-50 bg-white/90 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex flex-col">
              <span className="text-3xl font-black tracking-tighter text-blue-600 leading-none">TERSIS</span>
              <span className="text-[11px] font-bold text-slate-500 mt-1 uppercase tracking-tight">
                EU Transport License: <span className="text-blue-600">LIC-009666-EBKR</span>
              </span>
              <span className="text-[9px] text-slate-400 font-medium uppercase tracking-tighter">
                Asset-Based Carrier | Own Fleet
              </span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#services" className="text-sm font-bold hover:text-blue-600 transition">SERVICES</a>
              <a href="#about" className="text-sm font-bold hover:text-blue-600 transition">ABOUT</a>
              <a href="#map" className="text-sm font-bold hover:text-blue-600 transition">LOGISTICS</a>
              <a href="#contact" className="bg-blue-600 text-white px-6 py-2.5 rounded-full text-sm font-bold hover:bg-blue-700 transition shadow-lg shadow-blue-200">
                GET A QUOTE
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* HERO SECTION WITH VIDEO */}
      <section className="relative h-screen flex items-center justify-center pt-20 overflow-hidden bg-slate-900">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-50 z-0"
        >
          <source src="/hero-video.mp4.mp4" type="video/mp4" />
        </video>
        
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/60 via-transparent to-slate-900/80 z-10"></div>

        <div className="relative z-20 max-w-5xl mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-8xl font-black text-white mb-6 tracking-tight">
            WORLDWIDE <span className="text-blue-500">LOGISTICS</span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-200 mb-10 leading-relaxed max-w-3xl mx-auto font-medium">
            Operating 27+ modern Euro-6 vehicles. Specializing in high-capacity MEGA trailers (105 m³) and standard solutions <span className="text-blue-400 font-bold">worldwide.</span>
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#contact" className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-5 rounded-full font-black text-lg transition-all transform hover:scale-105 shadow-xl shadow-blue-500/20">
              REQUEST A QUOTE
            </a>
            <a href="#services" className="bg-white/10 backdrop-blur-md hover:bg-white/20 text-white border-2 border-white/30 px-10 py-5 rounded-full font-black text-lg transition-all">
              OUR SERVICES
            </a>
          </div>
        </div>
      </section>

      {/* LOGISTICS MAP SECTION (KAUNAS HUB) */}
      <section id="map" className="py-24 bg-slate-900 text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black mb-4 tracking-tight">GLOBAL CONSOLIDATION HUB</h2>
            <p className="text-blue-400 text-lg font-bold uppercase tracking-widest">Kaunas, Lithuania</p>
          </div>

          <div className="relative h-[500px] w-full bg-slate-800/50 rounded-[40px] border border-slate-700 flex items-center justify-center overflow-hidden">
            {/* World Map Background (SVG/Pattern) */}
            <div className="absolute inset-0 opacity-10 scale-110 bg-[url('https://www.transparenttextures.com/patterns/world-map.png')] bg-center"></div>

            {/* Hub Animation */}
            <div className="relative">
              {/* Kaunas Point */}
              <div className="w-6 h-6 bg-blue-500 rounded-full relative z-30 shadow-[0_0_40px_rgba(59,130,246,1)]">
                <div className="absolute inset-0 rounded-full bg-blue-400 animate-ping opacity-75"></div>
              </div>
              <div className="absolute top-8 left-1/2 -translate-x-1/2 whitespace-nowrap bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-black uppercase tracking-widest">
                Kaunas Hub
              </div>

              {/* Dynamic Lines (Arrows to Kaunas) */}
              <svg className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] pointer-events-none z-20">
                <defs>
                  <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="transparent" />
                    <stop offset="100%" stopColor="#3b82f6" />
                  </linearGradient>
                </defs>
                {/* Lines from major global regions */}
                <path d="M 50,100 Q 200,150 390,195" stroke="url(#lineGrad)" strokeWidth="2" fill="none" className="animate-pulse" strokeDasharray="5,5" />
                <path d="M 750,100 Q 600,150 410,195" stroke="url(#lineGrad)" strokeWidth="2" fill="none" className="animate-pulse" strokeDasharray="5,5" />
                <path d="M 400,380 Q 400,300 400,210" stroke="url(#lineGrad)" strokeWidth="2" fill="none" className="animate-pulse" strokeDasharray="5,5" />
              </svg>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 text-center font-bold">
            <div className="p-6 bg-slate-800/30 rounded-2xl border border-slate-700">USA & ASIA CARGO</div>
            <div className="p-6 bg-blue-600 rounded-2xl border border-blue-400 shadow-lg shadow-blue-500/20 text-white">CONSOLIDATION AT KAUNAS</div>
            <div className="p-6 bg-slate-800/30 rounded-2xl border border-slate-700">FINAL DELIVERY (EU)</div>
          </div>
        </div>
      </section>

      {/* QUOTE FORM SECTION */}
      <section id="contact" className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-slate-50 rounded-[40px] p-8 md:p-16 border border-slate-100 shadow-2xl">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-black mb-4 tracking-tight">GET A QUOTE</h2>
              <p className="text-slate-500 font-medium">Professional transport solutions for your business</p>
            </div>
            
            <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-black uppercase text-slate-700 ml-1">Full Name</label>
                <input type="text" className="w-full px-6 py-4 rounded-2xl border-2 border-slate-200 focus:border-blue-600 outline-none transition font-medium" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-black uppercase text-slate-700 ml-1">Email</label>
                <input type="email" className="w-full px-6 py-4 rounded-2xl border-2 border-slate-200 focus:border-blue-600 outline-none transition font-medium" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-black uppercase text-slate-700 ml-1">Origin City</label>
                <input type="text" className="w-full px-6 py-4 rounded-2xl border-2 border-slate-200 focus:border-blue-600 outline-none transition font-medium" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-black uppercase text-slate-700 ml-1">Destination City</label>
                <input type="text" className="w-full px-6 py-4 rounded-2xl border-2 border-slate-200 focus:border-blue-600 outline-none transition font-medium" />
              </div>
              <div className="md:col-span-2 space-y-2">
                <label className="text-sm font-black uppercase text-slate-700 ml-1">Cargo Details</label>
                <textarea rows={4} className="w-full px-6 py-4 rounded-2xl border-2 border-slate-200 focus:border-blue-600 outline-none transition font-medium"></textarea>
              </div>
              <button className="md:col-span-2 bg-blue-600 text-white py-5 rounded-2xl font-black text-lg hover:bg-blue-700 transition transform hover:scale-[1.02] shadow-xl shadow-blue-500/20">
                SEND INQUIRY
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-slate-900 text-white py-16 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex flex-col items-center md:items-start">
              <span className="text-3xl font-black tracking-tighter text-white">TERSIS</span>
              <p className="mt-4 text-slate-400 font-medium text-center md:text-left max-w-xs">
                Asset-based carrier with a modern fleet and global logistics coverage.
              </p>
            </div>
            <div className="text-center md:text-right">
              <p className="text-slate-400 font-bold mb-2">LIC-009666-EBKR</p>
              <p className="text-slate-500 font-medium">
                © 2026 TERSIS. European asset-based carrier | All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
