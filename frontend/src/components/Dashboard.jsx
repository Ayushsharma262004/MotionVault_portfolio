import { useRef, useEffect, useState } from 'react';
import { Gauge, Activity, Target, Flame, Clock, ShieldCheck, TrendingUp, Zap } from 'lucide-react';

const dashboardPanels = [
  {
    title: 'Ball Speed',
    value: '147.3',
    unit: 'km/h',
    icon: Gauge,
    change: '+2.1%',
    color: '#3081FF',
  },
  {
    title: 'AI Confidence',
    value: '98.7',
    unit: '%',
    icon: ShieldCheck,
    change: 'High',
    color: '#22C55E',
  },
  {
    title: 'Decisions Made',
    value: '342',
    unit: 'today',
    icon: Target,
    change: '+18',
    color: '#3081FF',
  },
  {
    title: 'Response Time',
    value: '11.2',
    unit: 'ms',
    icon: Zap,
    change: '-0.8ms',
    color: '#22C55E',
  },
];

const timelineEvents = [
  { time: '14:23', event: 'LBW Appeal - Not Out', confidence: '97.2%', sport: 'Cricket' },
  { time: '14:21', event: 'No Ball Detected', confidence: '99.8%', sport: 'Cricket' },
  { time: '14:18', event: 'Boundary Confirmed', confidence: '99.9%', sport: 'Cricket' },
  { time: '14:15', event: 'Wicket - Bowled', confidence: '100%', sport: 'Cricket' },
  { time: '14:12', event: 'Wide Ball Called', confidence: '95.4%', sport: 'Cricket' },
];

const heatmapData = Array.from({ length: 35 }, () => Math.random());

export default function Dashboard() {
  const sectionRef = useRef(null);
  const [isInView, setIsInView] = useState(false);
  const [liveValue, setLiveValue] = useState(147.3);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsInView(true); },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isInView) return;
    const interval = setInterval(() => {
      setLiveValue((v) => +(v + (Math.random() - 0.5) * 2).toFixed(1));
    }, 2000);
    return () => clearInterval(interval);
  }, [isInView]);

  return (
    <section
      id="dashboard"
      ref={sectionRef}
      data-testid="dashboard-section"
      className="py-24 md:py-32 lg:py-40 px-6 md:px-12 lg:px-24 bg-white relative overflow-hidden"
    >
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-empire-blue/3 blur-[120px]" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className={`text-center mb-16 gsap-heading`}>
          <span className="text-xs font-body font-bold uppercase tracking-[0.2em] text-empire-green">
            // Live Dashboard
          </span>
          <h2
            data-testid="dashboard-heading"
            className="font-heading font-black text-4xl md:text-5xl lg:text-6xl text-empire-dark leading-tight tracking-tight mt-4"
          >
            Real-Time<br />Intelligence.
          </h2>
          <p className="mt-4 text-base md:text-lg font-body text-empire-gray max-w-xl mx-auto leading-relaxed">
            A command center for match officials with live AI analytics, decision logs, and player tracking.
          </p>
        </div>

        {/* Dashboard grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5 gsap-stagger">
          {/* Stat cards */}
          {dashboardPanels.map((panel, i) => (
            <div
              key={i}
              data-testid={`dashboard-panel-${i}`}
              className={`bg-white border border-gray-100 rounded-2xl p-5 shadow-sm panel-shine transition-all duration-500 ${
                isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div className="flex items-center justify-between mb-3">
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: `${panel.color}10` }}
                >
                  <panel.icon className="w-4 h-4" style={{ color: panel.color }} />
                </div>
                <span
                  className="text-xs font-body font-semibold px-2 py-0.5 rounded-full"
                  style={{ backgroundColor: `${panel.color}10`, color: panel.color }}
                >
                  {panel.change}
                </span>
              </div>
              <div className="font-heading font-bold text-3xl text-empire-dark tracking-tight">
                {i === 0 ? liveValue : panel.value}
                <span className="text-sm font-body font-normal text-empire-gray ml-1">{panel.unit}</span>
              </div>
              <p className="text-xs font-body text-empire-gray mt-1">{panel.title}</p>
            </div>
          ))}

          {/* Decision Timeline */}
          <div
            data-testid="dashboard-timeline"
            className={`md:col-span-2 bg-white border border-gray-100 rounded-2xl p-5 shadow-sm transition-all duration-500 ${
              isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
            style={{ transitionDelay: '400ms' }}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-heading font-bold text-lg text-empire-dark">Decision Log</h3>
              <div className="flex items-center gap-1.5 text-xs font-body text-empire-green font-semibold">
                <Activity className="w-3 h-3" />
                Live
              </div>
            </div>
            <div className="space-y-2.5">
              {timelineEvents.map((evt, i) => (
                <div key={i} className="flex items-center gap-3 py-1.5 border-b border-gray-50 last:border-0">
                  <span className="text-[11px] font-body text-empire-gray w-10 flex-shrink-0">{evt.time}</span>
                  <span className="text-sm font-body font-medium text-empire-dark flex-1">{evt.event}</span>
                  <span className="text-[11px] font-body font-semibold text-empire-green">{evt.confidence}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Heatmap */}
          <div
            data-testid="dashboard-heatmap"
            className={`md:col-span-2 bg-white border border-gray-100 rounded-2xl p-5 shadow-sm transition-all duration-500 ${
              isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
            style={{ transitionDelay: '500ms' }}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-heading font-bold text-lg text-empire-dark">Impact Heatmap</h3>
              <div className="flex items-center gap-1.5">
                <Flame className="w-3.5 h-3.5 text-empire-red" />
                <span className="text-xs font-body text-empire-gray">Ball Impact Zones</span>
              </div>
            </div>
            {/* Simple heatmap grid */}
            <div className="grid grid-cols-7 gap-1.5">
              {heatmapData.map((v, i) => (
                <div
                  key={i}
                  className="aspect-square rounded-lg transition-colors duration-300"
                  style={{
                    backgroundColor:
                      v > 0.8 ? '#FF3B30' :
                      v > 0.6 ? '#FF6B35' :
                      v > 0.4 ? '#FFB84D' :
                      v > 0.2 ? '#3081FF20' : '#F0F2F5',
                  }}
                />
              ))}
            </div>
            <div className="flex items-center justify-between mt-3">
              <span className="text-[10px] font-body text-empire-gray">Low</span>
              <div className="flex gap-1">
                {['#F0F2F5', '#3081FF20', '#FFB84D', '#FF6B35', '#FF3B30'].map((c) => (
                  <div key={c} className="w-4 h-2 rounded-sm" style={{ backgroundColor: c }} />
                ))}
              </div>
              <span className="text-[10px] font-body text-empire-gray">High</span>
            </div>
          </div>

          {/* Match Stats */}
          <div
            data-testid="dashboard-match-stats"
            className={`bg-white border border-gray-100 rounded-2xl p-5 shadow-sm transition-all duration-500 ${
              isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
            style={{ transitionDelay: '600ms' }}
          >
            <h3 className="font-heading font-bold text-lg text-empire-dark mb-4">Match Stats</h3>
            <div className="space-y-3">
              {[
                { label: 'Overs Bowled', value: 34, max: 50 },
                { label: 'Run Rate', value: 72, max: 100 },
                { label: 'Boundaries', value: 45, max: 100 },
              ].map((s) => (
                <div key={s.label}>
                  <div className="flex justify-between mb-1">
                    <span className="text-xs font-body text-empire-gray">{s.label}</span>
                    <span className="text-xs font-body font-semibold text-empire-dark">{s.value}%</span>
                  </div>
                  <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full bg-empire-blue transition-all duration-1000"
                      style={{ width: isInView ? `${s.value}%` : '0%' }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Camera Feed Status */}
          <div
            data-testid="dashboard-cameras"
            className={`bg-white border border-gray-100 rounded-2xl p-5 shadow-sm transition-all duration-500 ${
              isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
            style={{ transitionDelay: '700ms' }}
          >
            <h3 className="font-heading font-bold text-lg text-empire-dark mb-4">Camera Feeds</h3>
            <div className="grid grid-cols-4 gap-2">
              {Array.from({ length: 8 }).map((_, i) => (
                <div
                  key={i}
                  className="aspect-square rounded-lg bg-gray-100 flex items-center justify-center relative overflow-hidden"
                >
                  <span className="text-[9px] font-body font-semibold text-empire-gray">C{i + 1}</span>
                  <div className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-empire-green" />
                </div>
              ))}
            </div>
            <div className="mt-3 flex items-center gap-1.5">
              <Clock className="w-3 h-3 text-empire-gray" />
              <span className="text-[10px] font-body text-empire-gray">All feeds synchronized</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
