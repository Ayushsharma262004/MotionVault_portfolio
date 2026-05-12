import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Activity, Code2, Database, Palette, Zap, Server, Monitor, BarChart3, Shield, Layers, Cpu } from 'lucide-react';

const techStack = [
  {
    category: 'Frontend',
    icon: Monitor,
    color: '#3081FF',
    items: [
      { name: 'React 19', desc: 'Component-based UI framework for building interactive interfaces', tag: 'Core' },
      { name: 'TailwindCSS', desc: 'Utility-first CSS framework for rapid, responsive styling', tag: 'Styling' },
      { name: 'GSAP ScrollTrigger', desc: 'Professional-grade animation library for cinematic scroll effects', tag: 'Animation' },
      { name: 'Shadcn/UI', desc: 'Accessible, composable component library built on Radix UI', tag: 'Components' },
      { name: 'Lucide React', desc: 'Beautiful, consistent icon library with 1000+ icons', tag: 'Icons' },
      { name: 'React Router', desc: 'Client-side routing for seamless page navigation', tag: 'Routing' },
    ],
  },
  {
    category: 'Backend',
    icon: Server,
    color: '#22C55E',
    items: [
      { name: 'FastAPI', desc: 'High-performance Python web framework with automatic API documentation', tag: 'API' },
      { name: 'MongoDB', desc: 'NoSQL database for flexible, scalable data storage', tag: 'Database' },
      { name: 'Motor', desc: 'Async MongoDB driver for non-blocking database operations', tag: 'Driver' },
      { name: 'Pydantic', desc: 'Data validation and serialization using Python type annotations', tag: 'Validation' },
    ],
  },
  {
    category: 'AI & Vision',
    icon: Cpu,
    color: '#FF3B30',
    items: [
      { name: 'Computer Vision', desc: 'Multi-camera object detection and tracking at 240fps', tag: 'Core AI' },
      { name: 'Ball Trajectory Analysis', desc: 'Physics-based prediction models for ball path and bounce', tag: 'Prediction' },
      { name: 'Edge Computing', desc: 'On-premise processing with <12ms latency for real-time decisions', tag: 'Infrastructure' },
      { name: 'Neural Networks', desc: 'Sport-specific deep learning models trained on millions of frames', tag: 'ML' },
    ],
  },
  {
    category: 'Design System',
    icon: Palette,
    color: '#3081FF',
    items: [
      { name: 'Glassmorphism UI', desc: 'Frosted glass effects with backdrop blur and translucent surfaces', tag: 'Visual' },
      { name: 'Outfit + Manrope', desc: 'Premium font pairing for headings and body text', tag: 'Typography' },
      { name: 'Responsive Design', desc: 'Mobile-first approach with breakpoints for all screen sizes', tag: 'Layout' },
      { name: 'Micro-animations', desc: 'Hover effects, scroll reveals, and interactive transitions', tag: 'Motion' },
    ],
  },
];

const metrics = [
  { label: 'API Response Time', value: '<50ms', icon: Zap },
  { label: 'Uptime SLA', value: '99.99%', icon: Shield },
  { label: 'Data Points/sec', value: '10M+', icon: BarChart3 },
  { label: 'Camera Feeds', value: '32+', icon: Layers },
];

export default function TechnologyPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-empire-bg font-body" data-testid="technology-page">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-4 flex items-center gap-4">
          <button
            data-testid="tech-back-btn"
            onClick={() => navigate('/')}
            className="w-9 h-9 rounded-xl bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 text-empire-dark" />
          </button>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-empire-blue flex items-center justify-center">
              <Activity className="w-4 h-4 text-white" />
            </div>
            <span className="font-heading font-bold text-lg text-empire-dark">
              Empire<span className="text-empire-blue">AI</span>
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 md:px-12 lg:px-24 py-16 md:py-24">
        {/* Hero */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-empire-blue/5 text-xs font-body font-semibold uppercase tracking-[0.2em] text-empire-blue mb-6">
            <Code2 className="w-3.5 h-3.5" />
            Our Technology
          </div>
          <h1
            data-testid="tech-heading"
            className="font-heading font-black text-4xl md:text-5xl lg:text-[4.5rem] text-empire-dark leading-none tracking-tighter"
          >
            Built for<br />
            <span className="text-gradient-blue">Performance.</span>
          </h1>
          <p className="mt-6 text-base md:text-lg font-body text-empire-gray max-w-2xl mx-auto leading-relaxed">
            Empire AI is engineered with cutting-edge technologies to deliver real-time sports
            officiating with unmatched accuracy and reliability.
          </p>
        </div>

        {/* Metrics row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-20" data-testid="tech-metrics">
          {metrics.map((m, i) => (
            <div key={i} className="bg-white border border-gray-100 rounded-2xl p-5 text-center shadow-sm">
              <m.icon className="w-5 h-5 text-empire-blue mx-auto mb-2" />
              <div className="font-heading font-bold text-2xl md:text-3xl text-empire-dark tracking-tight">{m.value}</div>
              <p className="text-xs font-body text-empire-gray mt-1">{m.label}</p>
            </div>
          ))}
        </div>

        {/* Tech stack sections */}
        <div className="space-y-16">
          {techStack.map((section, si) => (
            <div key={si} data-testid={`tech-section-${section.category.toLowerCase().replace(/\s/g, '-')}`}>
              <div className="flex items-center gap-3 mb-6">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: `${section.color}15` }}
                >
                  <section.icon className="w-5 h-5" style={{ color: section.color }} />
                </div>
                <h2 className="font-heading font-bold text-2xl text-empire-dark tracking-tight">
                  {section.category}
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {section.items.map((item, ii) => (
                  <div
                    key={ii}
                    className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-heading font-bold text-base text-empire-dark">{item.name}</h3>
                      <span
                        className="text-[10px] font-body font-semibold px-2 py-0.5 rounded-full"
                        style={{ backgroundColor: `${section.color}10`, color: section.color }}
                      >
                        {item.tag}
                      </span>
                    </div>
                    <p className="text-sm font-body text-empire-gray leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-20 text-center glass-card rounded-2xl p-10">
          <h3 className="font-heading font-bold text-2xl md:text-3xl text-empire-dark tracking-tight">
            Ready to See It Live?
          </h3>
          <p className="text-sm font-body text-empire-gray mt-2 max-w-md mx-auto">
            Book a demo to see our technology in action at your venue.
          </p>
          <button
            data-testid="tech-book-demo"
            onClick={() => navigate('/#contact')}
            className="mt-6 px-6 py-3 bg-empire-blue text-white rounded-xl text-sm font-body font-semibold hover:shadow-lg shadow-md transition-all inline-flex items-center gap-2"
          >
            Book a Demo
            <Zap className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
