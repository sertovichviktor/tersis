import React from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { Truck, Globe, Box, Shield, Mail, Phone, MapPin, ChevronRight, Star, Clock, Anchor, Cloud, CheckCircle2 } from 'lucide-react';

export const Route = createFileRoute('/')({
  component: LandingPage,
});

function LandingPage() {
  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 overflow-x-hidden">
      {/* NAVIGATION */}
      <nav className="fixed w-full z-50 bg-white/80 backdrop-blur-xl border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-24">
            <div className="flex flex-col">
              <span className="text-4xl font-black tracking-tighter text-blue-600 leading-none uppercase italic">TERSIS</span>
              <div className="mt-1 flex flex-col">
                <span className="text-[12px] font-black text-slate-800 tracking-tight uppercase">
                  EU TRANSPORT LICENSE: <span className="text-blue-600">LIC-009666-EBKR</span>
                </span>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none">
                  Asset-Based Carrier | Own Modern Fleet
                </span>
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-10">
              <a href="#services" className="text-xs font-black tracking-[0.2em] text-slate-600 hover:text-blue-600 transition uppercase">Services</a>
              <a href="#map" className="text-xs font-black tracking-[0.2em] text-slate-600 hover:text-blue-600 transition uppercase">Logistics</a>
              <a href="#contact" className="bg-blue-600 text-white px-10 py-4 rounded-full text-xs font-black tracking-[0.2em] hover:bg-blue-700 transition shadow-2xl shadow-blue-200 uppercase">
                Get a Quote
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* HERO SECTION WITH VIDEO */}
      <section className="relative h-screen min-h-[800px] flex items-center justify-center overflow-hidden bg-slate-900">
        <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover z-0 opacity-60">
          <source src="/hero-video.mp4.mp4" type="video/mp4" />
        </video>
        
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 via-slate-900/40 to-slate-900/80 z-10"></div>

        <div className="relative z-20 max-w-7xl mx-auto px-4 w-full">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-blue-600/20 border border-blue-400/30 backdrop-blur-md mb-8">
              <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
              <span className="text-blue-400 text-xs font-black uppercase tracking-[0.3em]">Worldwide Logistics Network</span>
            </div>
            <h1 className="text-7xl md:text-[120px] font-black text-white leading-[0.85] tracking-tighter uppercase italic mb-8">
              Reliable <br/> <span className="text-blue-500">Logistics</span>
            </h1>
            <p className="text-xl md:text-3xl text-slate-200 mb-12 max-w-2xl font-medium leading-tight">
              Operating 27+ modern Euro-6 vehicles. Specializing in high-capacity <span className="text-blue-400 font-bold">MEGA trailers (105 m³)</span> and standard solutions <span className="underline decoration-blue-500 decoration-4 font-black">WORLDWIDE</span>.
            </p>
            <div className="flex flex-wrap gap-6">
              <a href="#contact" className="bg-blue-600 hover:bg-blue-700 text-white px-12 py-6 rounded-2xl font-black text-xl transition-all transform hover:scale-105 shadow-2xl shadow-blue-600/40 uppercase tracking-widest">
                Start Shipping
              </a>
              <a href="#services" className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border-2 border-white/20 px-12 py-6 rounded-2xl font-black text-xl transition-all uppercase tracking-widest">
                Our Fleet
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES PREVIEW (Возвращаем оригинальные блоки) */}
      <section id="services" className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="group p-10 rounded-[40px] bg-slate-50 border border-slate-100 hover:bg-blue-600 transition-all duration-500">
              <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-white transition-colors">
                <Truck className="text-white group-hover:text-blue-600" size={32} />
              </div>
              <h3 className="text-2xl font-black mb-4 group-hover:text-white transition-colors uppercase">MEGA Trailers</h3>
              <p className="text-slate-500 font-bold group-hover:text-blue-100 transition-colors">105 m³ high-capacity solutions for maximum efficiency across all continents.</p>
            </div>
            <div className="group p-10 rounded-[40px] bg-slate-50 border border-slate-100 hover:bg-blue-600 transition-all duration-500">
              <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-white transition-colors">
                <Globe className="text-white group-hover:text-blue-600" size={32} />
              </div>
              <h3 className="text-2xl font-black mb-4 group-hover:text-white transition-colors uppercase">Global Reach</h3>
              <p className="text-slate-500 font-bold group-hover:text-blue-100 transition-colors">From local EU routes to complex worldwide intermodal logistics via our hubs.</p>
            </div>
            <div className="group p-10 rounded-[40px] bg-slate-50 border border-slate-100 hover:bg-blue-600 transition-all duration-500">
              <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-white transition-colors">
                <Shield className="text-white group-hover:text-blue-600" size={32} />
              </div>
              <h3 className="text-2xl font-black mb-4 group-hover:text-white transition-colors uppercase">Asset Based</h3>
              <p className="text-slate-500 font-bold group-hover:text-blue-100 transition-colors">We own the trucks. We own the responsibility. No brokers, just direct service.</p>
            </div>
          </div>
        </div>
      </section>

      {/* LOGISTICS MAP SECTION (НОВАЯ КАРТА) */}
      <section id="map" className="py-32 bg-slate-900 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-end justify-between mb-20 gap-8">
            <div className="max-w-2xl">
              <h2 className="text-5xl md:text-7xl font-black text-white mb-6 uppercase tracking-tighter leading-none italic">
                Our Strategic <span className="text-blue-500">Hub</span>
              </h2>
              <p className="text-xl text-slate-400 font-bold uppercase tracking-widest">Kaunas, Lithuania — The Heart of our Consolidation</p>
            </div>
            <div className="bg-blue-600 px-8 py-4 rounded-2xl text-white font-black text-xl uppercase tracking-widest italic shadow-2xl shadow-blue-500/20">
              Worldwide Connectivity
            </div>
          </div>

          <div className="relative h-[650px] w-full bg-slate-800 rounded-[60px] border border-slate-700 flex items-center justify-center overflow-hidden shadow-3xl">
            {/* World Map Pattern */}
            <div className="absolute inset-0 opacity-[0.15] bg-[url('https://www.transparenttextures.com/patterns/world-map.png')] bg-center bg-no-repeat scale-[1.7]"></div>

            {/* Hub Point */}
            <div className="relative z-30">
              <div className="w-16 h-16 bg-blue-500 rounded-full relative shadow-[0_0_100px_rgba(59,130,246,1)]">
                <div className="absolute inset-0 rounded-full bg-blue-400 animate-ping opacity-75"></div>
                <div className="absolute inset-3 bg-white rounded-full border-8 border-blue-600 shadow-inner"></div>
              </div>
              <div className="absolute top-20 left-1/2 -translate-x-1/2 text-center">
                <h4 className="text-white text-3xl font-black uppercase tracking-tighter italic">KAUNAS HUB</h4>
                <div className="h-1 w-24 bg-blue-500 mx-auto mt-2"></div>
              </div>
            </div>

            {/* Logistics Lines */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none z-20">
              <path d="M 100,200 Q 300,250 480,310" stroke="#3b82f6" strokeWidth="3" fill="none" strokeDasharray="12,6" className="opacity-40" />
              <path d="M 900,150 Q 700,200 520,310" stroke="#3b82f6" strokeWidth="3" fill="none" strokeDasharray="12,6" className="opacity-40" />
              <path d="M 200,550 Q 400,500 500,340" stroke="#3b82f6" strokeWidth="3" fill="none" strokeDasharray="12,6" className="opacity-40" />
              <path d="M 1000,500 Q 750,450 530,330" stroke="#3b82f6" strokeWidth="3" fill="none" strokeDasharray="12,6" className="opacity-40" />
            </svg>

            {/* Info Badge */}
            <div className="absolute bottom-12 right-12 bg-white/10 backdrop-blur-xl p-8 rounded-[32px] border border-white/10 max-w-sm shadow-2xl">
              <p className="text-blue-400 font-black uppercase tracking-[0.2em] mb-3 italic">Operations Center</p>
              <p className="text-slate-300 font-bold leading-relaxed">Cross-docking and cargo consolidation from China, USA and Middle East for global distribution.</p>
            </div>
          </div>
        </div>
      </section>

      {/* QUOTE FORM (Премиальный вид) */}
      <section id="contact" className="py-32 bg-slate-50">
        <div className="max-w-5xl mx-auto px-4">
          <div className="bg-white rounded-[60px] p-12 md:p-24 shadow-2xl border border-slate-100 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/5 rounded-full -mr-32 -mt-32"></div>
            
            <div className="relative z-10">
              <div className="text-center mb-20">
                <h2 className="text-5xl md:text-7xl font-black mb-6 tracking-tighter uppercase italic">Get a <span className="text-blue-600">Quote</span></h2>
                <p className="text-slate-400 font-bold uppercase tracking-[0.4em] text-sm">Direct carrier solutions — Worldwide delivery</p>
              </div>
              
              <form className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="space-y-4">
                  <label className="text-xs font-black uppercase text-slate-500 ml-6 tracking-widest italic">Company Name</label>
                  <input type="text" className="w-full px-10 py-6 rounded-[30px] bg-slate-50 border-none focus:ring-4 focus:ring-blue-600/10 outline-none transition-all font-bold text-lg" placeholder="TERSIS LOGISTICS" />
                </div>
                <div className="space-y-4">
                  <label className="text-xs font-black uppercase text-slate-500 ml-6 tracking-widest italic">Email Address</label>
                  <input type="email" className="w-full px-10 py-6 rounded-[30px] bg-slate-50 border-none focus:ring-4 focus:ring-blue-600/10 outline-none transition-all font-bold text-lg" placeholder="office@tersis.com" />
                </div>
                <div className="space-y-4">
                  <label className="text-xs font-black uppercase text-slate-500 ml-6 tracking-widest italic">Pick-up City</label>
                  <input type="text" className="w-full px-10 py-6 rounded-[30px] bg-slate-50 border-none focus:ring-4 focus:ring-blue-600/10 outline-none transition-all font-bold text-lg" placeholder="Kaunas, LT" />
                </div>
                <div className="space-y-4">
                  <label className="text-xs font-black uppercase text-slate-500 ml-6 tracking-widest italic">Destination City</label>
                  <input type="text" className="w-full px-10 py-6 rounded-[30px] bg-slate-50 border-none focus:ring-4 focus:ring-blue-600/10 outline-none transition-all font-bold text-lg" placeholder="London, UK" />
                </div>
                <div className="md:col-span-2 space-y-4">
                  <label className="text-xs font-black uppercase text-slate-500 ml-6 tracking-widest italic">Cargo Specifications</label>
                  <textarea rows={5} className="w-full px-10 py-8 rounded-[40px] bg-slate-50 border-none focus:ring-4 focus:ring-blue-600/10 outline-none transition-all font-bold text-lg" placeholder="Describe weight, volume and type of goods..."></textarea>
                </div>
                <button className="md:col-span-2 bg-blue-600 text-white py-8 rounded-[30px] font-black text-2xl hover:bg-blue-700 transition-all shadow-2xl shadow-blue-500/40 uppercase tracking-widest italic transform hover:scale-[1.02]">
                  Send Inquiry Now
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-slate-900 text-white py-24 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-12">
            <div>
              <span className="text-5xl font-black tracking-tighter italic text-white uppercase">TERSIS</span>
              <div className="mt-4 space-y-2">
                <p className="text-blue-500 font-black text-sm uppercase tracking-widest underline decoration-2 offset-4">LIC-009666-EBKR</p>
                <p className="text-slate-500 font-bold text-xs uppercase tracking-[0.3em]">Asset-Based Worldwide Carrier</p>
              </div>
            </div>
            <div className="flex flex-col md:items-end gap-4">
              <div className="flex gap-8 text-xs font-black tracking-widest uppercase text-slate-400">
                <a href="#services" className="hover:text-blue-500 transition">Services</a>
                <a href="#map" className="hover:text-blue-500 transition">Logistics</a>
                <a href="#contact" className="hover:text-blue-500 transition">Contact</a>
              </div>
              <p className="text-slate-600 text-[11px] font-bold uppercase tracking-widest mt-6 italic">
                © 2026 TERSIS. European asset-based carrier | All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
