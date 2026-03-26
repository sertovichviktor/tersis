{/* ─── COVERAGE MAP (Animated Flow) ─── */}
      <section id="coverage" className={`py-24 px-4 sm:px-6 lg:px-8 border-t ${borderColor}`}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 animate-fadeInUp">
            <h2 className={`text-4xl md:text-5xl font-black ${textPrimary} mb-4 tracking-tight uppercase`}>
              {t.coverage.title}
            </h2>
            <p className={`text-lg ${textSecondary} max-w-2xl mx-auto`}>
              {t.coverage.subtitle}
            </p>
          </div>

          <div className={`relative h-[450px] md:h-[600px] rounded-[40px] overflow-hidden border ${borderAccent} bg-[#0B1220] flex items-center justify-center shadow-2xl`}>
            
            {/* SVG КАРТА С АНИМАЦИЕЙ */}
            <svg viewBox="0 0 900 440" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
              <defs>
                <radialGradient id="kaunas-glow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#0052ff" stopOpacity="0.6" />
                  <stop offset="100%" stopColor="#0052ff" stopOpacity="0" />
                </radialGradient>
                
                {/* Эффект движения по линиям */}
                <style>{`
                  @keyframes flow {
                    from { stroke-dashoffset: 100; }
                    to { stroke-dashoffset: 0; }
                  }
                  .flow-line {
                    animation: flow 3s linear infinite;
                  }
                `}</style>

                <filter id="glow">
                  <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
                  <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* МАТЕРИКИ (Полигоны) */}
              <g fill="#1A2333" stroke="#243045" strokeWidth="0.5">
                <polygon points="60,60 160,50 200,80 210,140 180,180 130,200 80,190 50,150 40,100" /> {/* America N */}
                <polygon points="130,210 170,200 200,240 190,310 160,340 130,320 110,270 115,230" /> {/* America S */}
                <polygon points="380,50 460,45 490,70 480,110 450,130 410,125 385,100 375,70" /> {/* Africa */}
                <polygon points="480,45 680,40 760,70 800,110 780,160 700,180 600,170 520,150 510,100 480,120 470,80" /> {/* Europe/Asia */}
                <polygon points="680,260 760,255 790,290 780,330 730,345 685,325 665,295" /> {/* Australia */}
              </g>

              {/* АНИМИРОВАННЫЕ ПУТИ В КАУНАС */}
              <g fill="none" stroke="#0052ff" strokeWidth="1.5" opacity="0.6">
                {/* USA -> Kaunas */}
                <path d="M 150,120 Q 300,50 510,85" strokeDasharray="5,10" className="flow-line" />
                {/* China -> Kaunas */}
                <path d="M 750,130 Q 650,50 510,85" strokeDasharray="5,10" className="flow-line" />
                {/* UAE -> Kaunas */}
                <path d="M 600,180 Q 550,130 510,85" strokeDasharray="5,10" className="flow-line" />
                {/* Brazil -> Kaunas */}
                <path d="M 200,280 Q 350,150 510,85" strokeDasharray="5,10" className="flow-line" />
              </g>

              {/* ХАБ КАУНАС */}
              <g filter="url(#glow)">
                <circle cx="510" cy="85" r="15" fill="url(#kaunas-glow)">
                  <animate attributeName="r" values="10;20;10" dur="2s" repeatCount="indefinite" />
                </circle>
                <circle cx="510" cy="85" r="5" fill="#0052ff" />
                <circle cx="510" cy="85" r="2" fill="#ffffff" />
              </g>

              {/* ПОДПИСЬ */}
              <text x="510" y="65" textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="900" letterSpacing="1" style={{ fontFamily: 'sans-serif' }}>
                KAUNAS HUB
              </text>
            </svg>

            {/* ТЕКСТ ПО УГЛАМ */}
            <div className="absolute bottom-6 left-8 flex flex-col">
              <span className="text-[10px] font-black tracking-[0.3em] text-[#0052ff] uppercase">Network Status</span>
              <span className="text-white text-xs font-bold uppercase tracking-widest">Active Worldwide</span>
            </div>
            
            <div className="absolute bottom-6 right-8 flex flex-col items-end">
              <span className="text-[10px] font-black tracking-[0.3em] text-[#0052ff] uppercase">Consolidation</span>
              <span className="text-white text-xs font-bold uppercase tracking-widest text-right">LIT-CENTER 01</span>
            </div>

          </div>
        </div>
      </section>
