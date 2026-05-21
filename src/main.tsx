import React, { useState, useCallback, memo } from 'react'
import ReactDOM from 'react-dom/client'
import { Truck, ArrowRight, Check, Shield, Clock, Globe, Maximize2, MapPin, Phone, Mail, Zap, FileText, Handshake, Users } from 'lucide-react'

// --- КОМПОНЕНТЫ-БЛОКИ (Чтобы не лагало) ---
const Hero = memo(() => (
  <section className="relative h-screen flex items-center px-8 overflow-hidden bg-[#050a14]">
    <div className="absolute inset-0 z-0">
      <video autoPlay muted loop playsInline className="w-full h-full object-cover opacity-40">
        <source src="/hero-video.mp4.mp4" type="video/mp4" />
      </video>
    </div>
    <div className="relative z-10 max-w-5xl">
      <div className="inline-block mb-6 px-4 py-2 bg-blue-500/20 border border-blue-500/40 rounded-md text-blue-500 text-xs font-bold tracking-widest uppercase">
        Est. 2011 • Trusted experience
      </div>
      <h1 className="text-6xl md:text-8xl font-black leading-[0.85] uppercase mb-8 tracking-tighter text-white">
        OWN FLEET.<br/>DIRECT IMPACT.<br/><span className="text-blue-600">EUROPEAN</span>
      </h1>
      <button onClick={() => document.getElementById('contact')?.scrollIntoView({behavior:'smooth'})} className="bg-blue-600 text-white px-10 py-5 rounded-xl font-black text-sm uppercase tracking-widest flex items-center gap-3 hover:bg-blue-700 transition-all shadow-2xl">
        GET QUOTE <ArrowRight size={20} />
      </button>
    </div>
  </section>
));

const App = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    setIsSubmitted(true);

    try {
      await fetch('/send.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      form.reset();
      setTimeout(() => setIsSubmitted(false), 4000);
    } catch (e) {
      setIsSubmitted(false);
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#050a14] text-white antialiased">
      {/* СТИЛИ ФОКУСА (чтобы не висло) */}
      <style>{`
        input:focus, textarea:focus { outline: 2px solid #0052ff !important; transition: none !important; }
        input, textarea { background: #0a1628; border: 1px solid #1A2C45; color: white; }
      `}</style>

      {/* NAV */}
      <nav className="fixed w-full z-50 p-6 bg-[#050a14]/80 backdrop-blur-md border-b border-white/5 flex justify-between items-center">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo({top:0, behavior:'smooth'})}>
          <img src="/logo.png" className="h-10" />
          <span className="text-2xl font-black tracking-tighter uppercase">TERSIS</span>
        </div>
        <div className="hidden md:flex gap-8 text-[10px] font-bold uppercase tracking-widest text-gray-400">
           <button onClick={() => document.getElementById('fleet')?.scrollIntoView({behavior:'smooth'})}>Fleet</button>
           <button onClick={() => document.getElementById('services')?.scrollIntoView({behavior:'smooth'})}>Services</button>
           <button onClick={() => document.getElementById('contact')?.scrollIntoView({behavior:'smooth'})} className="text-white">Contact</button>
        </div>
      </nav>

      <Hero />

      {/* FLEET SECTION */}
      <section id="fleet" className="py-32 px-8 bg-[#050a14]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl font-black mb-20 uppercase text-center text-white">Fleet <span className="text-blue-600">Specifications</span></h2>
          <div className="grid md:grid-cols-2 gap-10">
            <div className="bg-[#0a1628] p-10 rounded-[32px] border border-white/5">
              <Truck className="text-blue-600 mb-6" size={48} />
              <h3 className="text-3xl font-black mb-4 uppercase text-white">Standard Class</h3>
              <p className="text-gray-400 text-sm mb-6 uppercase tracking-widest font-bold">92 m³ • 33 Euro Pallets • 13.6m length</p>
              <p className="text-gray-500 italic text-xs border-t border-white/5 pt-6">Reliable transport across entire Europe with modern GPS tracking.</p>
            </div>
            <div className="bg-[#0a1628] p-10 rounded-[32px] border border-blue-600/30">
              <Maximize2 className="text-blue-600 mb-6" size={48} />
              <h3 className="text-3xl font-black mb-4 uppercase text-white">Mega Advantage</h3>
              <p className="text-gray-400 text-sm mb-6 uppercase tracking-widest font-bold">105 m³ • 3.0m Internal Height • High capacity</p>
              <p className="text-gray-500 italic text-xs border-t border-white/5 pt-6">Ideal for high-volume, low-weight cargo requiring extra height.</p>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES (8 ИКОНОК) */}
      <section id="services" className="py-32 px-8 bg-[#0a1628] border-y border-white/5">
        <div className="max-w-7xl mx-auto">
           <h2 className="text-5xl font-black mb-20 uppercase text-center text-white">Logistics <span className="text-blue-600">Services</span></h2>
           <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                {icon: Truck, t: "FTL / LTL"}, {icon: Globe, t: "Worldwide"}, 
                {icon: Shield, t: "Secure"}, {icon: Clock, t: "Express"},
                {icon: Zap, t: "Fast"}, {icon: FileText, t: "Docs"},
                {icon: Handshake, t: "Partner"}, {icon: Users, t: "Experts"}
              ].map((s, i) => (
                <div key={i} className="p-8 bg-[#050a14] rounded-2xl border border-white/5 hover:border-blue-600 transition-all text-center">
                  <s.icon className="text-blue-600 mb-4 mx-auto" size={32} />
                  <h4 className="font-black text-[10px] uppercase tracking-widest text-white">{s.t}</h4>
                </div>
              ))}
           </div>
        </div>
      </section>

      {/* CONTACT FORM (ВОССТАНОВЛЕНА 1:1) */}
      <section id="contact" className="py-32 px-8 bg-[#050a14]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-black mb-12 uppercase text-center text-white">Request <span className="text-blue-600">Quote</span></h2>
          <div className="bg-[#0F1A2B] p-8 md:p-12 rounded-[40px] border border-[#1A2C45] shadow-2xl">
            <form onSubmit={handleSubmit} className="space-y-8" autoComplete="off">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-white">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest text-white">From (Country/City)</label>
                  <input name="from" required placeholder="Kaunas, Lithuania" className="w-full px-6 py-4 rounded-xl text-sm outline-none focus:border-blue-600" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest text-white">To (Country/City)</label>
                  <input name="to" required placeholder="Berlin, Germany" className="w-full px-6 py-4 rounded-xl text-sm outline-none focus:border-blue-600" />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-white">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest text-white">Cargo Type</label>
                  <input name="cargo" placeholder="Electronics, Pallets..." className="w-full px-6 py-4 rounded-xl text-sm outline-none focus:border-blue-600" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest text-white">Weight (KG)</label>
                  <input name="weight" placeholder="5000" className="w-full px-6 py-4 rounded-xl text-sm outline-none focus:border-blue-600" />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-white">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest text-white">Volume (M³)</label>
                  <input name="volume" placeholder="10" className="w-full px-6 py-4 rounded-xl text-sm outline-none focus:border-blue-600" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest text-white">Name</label>
                  <input name="name" required placeholder="John Doe" className="w-full px-6 py-4 rounded-xl text-sm outline-none focus:border-blue-600" />
                </div>
              </div>
              <div className="space-y-2 text-white">
                <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Email Address</label>
                <input name="email" type="email" required placeholder="john@company.com" className="w-full px-6 py-4 rounded-xl text-sm outline-none focus:border-blue-600" />
              </div>
              <button 
                type="submit" 
                disabled={isSubmitted}
                className="w-full py-6 bg-blue-600 hover:bg-blue-700 text-white font-black rounded-2xl text-xs tracking-[0.3em] uppercase transition-all disabled:opacity-50"
              >
                {isSubmitted ? 'SENT SUCCESSFULLY' : 'Request Quote IN 24H'}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-20 bg-[#050a14] border-t border-white/5 text-center">
        <div className="max-w-7xl mx-auto px-8">
          <p className="text-gray-500 text-[10px] font-bold uppercase tracking-widest mb-4 text-white">Taikos pr. 141-305, Kaunas, Lithuania | LIC-009666-EBKR</p>
          <p className="text-gray-700 text-[9px] font-bold uppercase tracking-widest text-white">© 2026 TERSIS. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

const rootElement = document.getElementById('root')!
ReactDOM.createRoot(rootElement).render(<App />)
