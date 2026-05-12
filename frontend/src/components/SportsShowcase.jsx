import { useRef, useState } from 'react';
import { Target, Crosshair, Radar, TrendingUp, Gauge, Scan } from 'lucide-react';

const sports = [
  {
    id: 'cricket', title: 'Cricket Intelligence', subtitle: 'Precision Ball Tracking',
    image: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?q=80&w=2400&auto=format&fit=crop',
    features: ['Ball Trajectory', 'LBW Prediction', 'No-Ball Detection', 'Wicket Detection', 'Smart Replay', 'Ultra-Edge'],
    icon: Target, color: '#DC2626',
    description: 'AI-powered ball tracking analyzes trajectory, spin, and impact points in real-time for LBW, no-ball, and caught-behind decisions.',
  },
  {
    id: 'football', title: 'Football Referee AI', subtitle: 'Total Match Awareness',
    image: 'https://images.unsplash.com/photo-1701363539457-875b9bc9bbc1?q=80&w=2400&auto=format&fit=crop',
    features: ['Goal-Line Analysis', 'Offside Detection', 'Referee Tracking', 'Player Heatmaps', 'Foul Detection', 'VAR Integration'],
    icon: Crosshair, color: '#EF4444',
    description: 'Multi-camera AI system provides instant offside detection, goal-line technology, and automated foul recognition across the pitch.',
  },
  {
    id: 'tennis', title: 'Tennis Vision System', subtitle: 'Hawk-Eye Precision',
    image: 'https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?q=80&w=2400&auto=format&fit=crop',
    features: ['Ball Tracking', 'Line Detection', 'Serve Speed', 'Bounce Prediction', 'Smart Replay', 'Court Analytics'],
    icon: Radar, color: '#F87171',
    description: 'Sub-millimeter ball tracking with AI-powered line calling, serve analysis, and predictive bounce modeling.',
  },
];

export default function SportsShowcase() {
  const [activeIdx, setActiveIdx] = useState(0);

  return (
    <section id="sports" data-testid="sports-showcase" className="py-24 md:py-32 lg:py-40 px-6 md:px-12 lg:px-24 bg-empire-black relative">
      <div className="section-divider gsap-line-draw origin-left mb-24" />
      <div className="max-w-7xl mx-auto">
        <div className="gsap-heading mb-16">
          <span className="text-xs font-body font-bold uppercase tracking-[0.25em] text-empire-red">// Sports Intelligence</span>
          <h2 data-testid="sports-heading" className="font-heading font-black text-4xl md:text-5xl lg:text-6xl text-white leading-tight tracking-tight mt-4">
            Every Sport.<br /><span className="text-gradient-red">Every Decision.</span>
          </h2>
          <p className="mt-4 text-base md:text-lg font-body text-white/50 max-w-xl leading-relaxed">
            Purpose-built AI models for each sport, trained on millions of professional match frames.
          </p>
        </div>

        <div className="flex gap-2 mb-10 gsap-reveal" data-testid="sport-tabs">
          {sports.map((sport, i) => (
            <button key={sport.id} data-testid={`sport-tab-${sport.id}`} onClick={() => setActiveIdx(i)}
              className={`px-5 py-2.5 rounded-full text-sm font-body font-medium transition-all duration-300 ${
                activeIdx === i ? 'bg-empire-red text-white shadow-lg shadow-empire-red/20' : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white'}`}>
              {sport.title.split(' ')[0]}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Image */}
          <div className="parallax-img-wrap relative min-h-[400px] lg:min-h-[500px] gsap-scale overflow-hidden rounded-2xl">
            <img src={sports[activeIdx].image} alt={sports[activeIdx].title}
              className="absolute inset-0 w-full h-full object-cover gsap-parallax-img transition-opacity duration-500" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-black/30" />
            <div className="absolute top-6 left-6 liquid-glass rounded-xl px-3 py-2 flex items-center gap-2">
              <Scan className="w-4 h-4 text-empire-red" />
              <span className="text-xs font-body font-semibold text-white">AI Tracking Active</span>
            </div>
            <div className="absolute bottom-6 left-6 right-6">
              <div className="liquid-glass rounded-2xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-3 h-3 rounded-full bg-empire-red animate-pulse" />
                  <span className="text-xs font-body font-bold uppercase tracking-wider text-white/80">Live Analysis</span>
                </div>
                <div className="flex gap-4">
                  {[{ l: 'Accuracy', v: '99.7%' }, { l: 'Latency', v: '12ms' }, { l: 'Confidence', v: '98.2%' }].map((m) => (
                    <div key={m.l} className="flex flex-col">
                      <span className="text-lg font-heading font-bold text-white">{m.v}</span>
                      <span className="text-[10px] font-body text-white/50">{m.l}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Details */}
          <div className="flex flex-col justify-center gsap-slide-right">
            <div className="flex items-center gap-3 mb-4">
              {(() => {
                const IconComp = sports[activeIdx].icon;
                return (
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ backgroundColor: `${sports[activeIdx].color}15` }}>
                    <IconComp className="w-6 h-6" style={{ color: sports[activeIdx].color }} />
                  </div>
                );
              })()}
              <div>
                <h3 data-testid={`sport-title-${sports[activeIdx].id}`} className="font-heading font-bold text-2xl md:text-3xl text-white tracking-tight">{sports[activeIdx].title}</h3>
                <p className="text-sm font-body text-white/50">{sports[activeIdx].subtitle}</p>
              </div>
            </div>
            <p className="text-base font-body text-white/60 leading-relaxed mb-6">{sports[activeIdx].description}</p>
            <div className="flex flex-wrap gap-2 mb-8">
              {sports[activeIdx].features.map((f) => (
                <span key={f} className="px-3 py-1.5 rounded-full text-xs font-body font-medium bg-white/5 text-white/70 border border-white/8">{f}</span>
              ))}
            </div>
            <div className="grid grid-cols-3 gap-4">
              {[{ icon: Gauge, label: 'Speed', value: '240fps' }, { icon: TrendingUp, label: 'Accuracy', value: '99.7%' }, { icon: Scan, label: 'Cameras', value: '32 feeds' }].map((s) => (
                <div key={s.label} className="dark-glass rounded-xl p-4 text-center">
                  <s.icon className="w-4 h-4 text-empire-red mx-auto mb-1" />
                  <span className="block font-heading font-bold text-lg text-white">{s.value}</span>
                  <span className="block text-[10px] font-body text-white/40 mt-0.5">{s.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
