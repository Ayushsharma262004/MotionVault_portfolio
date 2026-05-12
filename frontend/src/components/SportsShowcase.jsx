import { useRef, useEffect, useState } from 'react';
import { Target, Crosshair, Radar, TrendingUp, Gauge, Scan } from 'lucide-react';

const sports = [
  {
    id: 'cricket',
    title: 'Cricket Intelligence',
    subtitle: 'Precision Ball Tracking',
    image: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?q=80&w=2400&auto=format&fit=crop',
    features: ['Ball Trajectory', 'LBW Prediction', 'No-Ball Line Detection', 'Wicket Detection', 'Smart Replay', 'Ultra-Edge Waveform'],
    icon: Target,
    color: '#3081FF',
    description: 'AI-powered ball tracking analyzes trajectory, spin, and impact points in real-time for LBW, no-ball, and caught-behind decisions.',
  },
  {
    id: 'football',
    title: 'Football Referee AI',
    subtitle: 'Total Match Awareness',
    image: 'https://images.unsplash.com/photo-1518605368461-1ee7c510808a?q=80&w=2400&auto=format&fit=crop',
    features: ['Goal-Line Analysis', 'Offside Detection', 'Referee Tracking', 'Player Heatmaps', 'Smart Foul Detection', 'VAR Integration'],
    icon: Crosshair,
    color: '#22C55E',
    description: 'Multi-camera AI system provides instant offside detection, goal-line technology, and automated foul recognition across the pitch.',
  },
  {
    id: 'tennis',
    title: 'Tennis Vision System',
    subtitle: 'Hawk-Eye Precision',
    image: 'https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?q=80&w=2400&auto=format&fit=crop',
    features: ['Ball Tracking', 'Line Detection', 'Serve Speed', 'Bounce Prediction', 'Smart Replay', 'Court Analytics'],
    icon: Radar,
    color: '#FF3B30',
    description: 'Sub-millimeter ball tracking with AI-powered line calling, serve analysis, and predictive bounce modeling for perfect officiating.',
  },
];

export default function SportsShowcase() {
  const sectionRef = useRef(null);
  const [activeIdx, setActiveIdx] = useState(0);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="sports"
      ref={sectionRef}
      data-testid="sports-showcase"
      className="py-24 md:py-32 lg:py-40 px-6 md:px-12 lg:px-24 bg-white"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className={`mb-16 gsap-heading`}>
          <span className="text-xs font-body font-bold uppercase tracking-[0.2em] text-empire-blue">
            // Sports Intelligence
          </span>
          <h2
            data-testid="sports-heading"
            className="font-heading font-black text-4xl md:text-5xl lg:text-6xl text-empire-dark leading-tight tracking-tight mt-4"
          >
            Every Sport.<br />Every Decision.
          </h2>
          <p className="mt-4 text-base md:text-lg font-body text-empire-gray max-w-xl leading-relaxed">
            Purpose-built AI models for each sport, trained on millions of professional match frames.
          </p>
        </div>

        {/* Sport tabs */}
        <div className="flex gap-2 mb-10" data-testid="sport-tabs">
          {sports.map((sport, i) => (
            <button
              key={sport.id}
              data-testid={`sport-tab-${sport.id}`}
              onClick={() => setActiveIdx(i)}
              className={`px-4 py-2 rounded-full text-sm font-body font-medium transition-all duration-300 ${
                activeIdx === i
                  ? 'bg-empire-dark text-white shadow-md'
                  : 'bg-gray-100 text-empire-gray hover:bg-gray-200'
              }`}
            >
              {sport.title.split(' ')[0]}
            </button>
          ))}
        </div>

        {/* Sport cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Image side */}
          <div
            className={`relative rounded-3xl overflow-hidden min-h-[400px] lg:min-h-[500px] transition-all duration-500 ${
              isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <img
              src={sports[activeIdx].image}
              alt={sports[activeIdx].title}
              className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            {/* AI overlay mockup */}
            <div className="absolute top-6 left-6 glass-heavy rounded-xl px-3 py-2 flex items-center gap-2">
              <Scan className="w-4 h-4 text-empire-blue" />
              <span className="text-xs font-body font-semibold text-empire-dark">AI Tracking Active</span>
            </div>
            <div className="absolute bottom-6 left-6 right-6">
              <div className="glass-heavy rounded-2xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: sports[activeIdx].color }}
                  />
                  <span className="text-xs font-body font-bold uppercase tracking-wider text-empire-dark">
                    Live Analysis
                  </span>
                </div>
                <div className="flex gap-4">
                  {[
                    { label: 'Accuracy', value: '99.7%' },
                    { label: 'Latency', value: '12ms' },
                    { label: 'Confidence', value: '98.2%' },
                  ].map((m) => (
                    <div key={m.label} className="flex flex-col">
                      <span className="text-lg font-heading font-bold text-empire-dark">{m.value}</span>
                      <span className="text-[10px] font-body text-empire-gray">{m.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Details side */}
          <div className="flex flex-col justify-center">
            <div className="flex items-center gap-3 mb-4">
              {(() => {
                const IconComp = sports[activeIdx].icon;
                return (
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center"
                    style={{ backgroundColor: `${sports[activeIdx].color}15` }}
                  >
                    <IconComp className="w-6 h-6" style={{ color: sports[activeIdx].color }} />
                  </div>
                );
              })()}
              <div>
                <h3
                  data-testid={`sport-title-${sports[activeIdx].id}`}
                  className="font-heading font-bold text-2xl md:text-3xl text-empire-dark tracking-tight"
                >
                  {sports[activeIdx].title}
                </h3>
                <p className="text-sm font-body text-empire-gray">{sports[activeIdx].subtitle}</p>
              </div>
            </div>

            <p className="text-base font-body text-empire-gray leading-relaxed mb-6">
              {sports[activeIdx].description}
            </p>

            {/* Feature tags */}
            <div className="flex flex-wrap gap-2 mb-8">
              {sports[activeIdx].features.map((f) => (
                <span
                  key={f}
                  className="px-3 py-1.5 rounded-full text-xs font-body font-medium bg-gray-100 text-empire-dark/80 border border-gray-200/50"
                >
                  {f}
                </span>
              ))}
            </div>

            {/* Mini stats */}
            <div className="grid grid-cols-3 gap-4">
              {[
                { icon: Gauge, label: 'Processing Speed', value: '240fps' },
                { icon: TrendingUp, label: 'Accuracy Rate', value: '99.7%' },
                { icon: Scan, label: 'Camera Support', value: '32 feeds' },
              ].map((s) => (
                <div key={s.label} className="glass-card rounded-xl p-4 text-center">
                  <s.icon className="w-4 h-4 text-empire-blue mx-auto mb-1" />
                  <span className="block font-heading font-bold text-lg text-empire-dark">{s.value}</span>
                  <span className="block text-[10px] font-body text-empire-gray mt-0.5">{s.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
