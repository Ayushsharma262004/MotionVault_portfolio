import { Camera, Cpu, Brain, CheckCircle, BarChart3 } from 'lucide-react';

const steps = [
  { icon: Camera, title: 'Cameras Capture Motion', description: 'Ultra-high-speed cameras capture every angle at 240fps with sub-millisecond synchronization.', detail: '32+ camera feeds' },
  { icon: Cpu, title: 'AI Detects Players & Ball', description: 'Computer vision models identify and track every player, the ball, and key field markers in real-time.', detail: 'Object detection' },
  { icon: Brain, title: 'Real-Time Processing', description: 'Edge computing nodes process data locally with <12ms latency, running proprietary neural networks.', detail: '<12ms latency' },
  { icon: CheckCircle, title: 'Automated Decisions', description: 'AI referee engine applies sport-specific rules to generate instant, accurate decisions.', detail: '99.7% accuracy' },
  { icon: BarChart3, title: 'Live Match Analytics', description: 'Comprehensive dashboard delivers real-time statistics, replays, and predictive insights.', detail: 'Real-time dashboard' },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" data-testid="how-it-works-section" className="py-24 md:py-32 lg:py-40 px-6 md:px-12 lg:px-24 bg-empire-dark relative overflow-hidden">
      {/* Red glow orb */}
      <div className="absolute top-1/3 right-0 w-[500px] h-[500px] rounded-full bg-empire-red/5 blur-[150px] gsap-parallax" />

      <div className="max-w-5xl mx-auto relative z-10">
        <div className="section-divider gsap-line-draw origin-left mb-24" />
        <div className="text-center mb-20 gsap-heading">
          <span className="text-xs font-body font-bold uppercase tracking-[0.25em] text-empire-red">// How It Works</span>
          <h2 data-testid="how-it-works-heading" className="font-heading font-black text-4xl md:text-5xl lg:text-6xl text-white leading-tight tracking-tight mt-4">
            From Camera<br />to <span className="text-gradient-red">Decision.</span>
          </h2>
        </div>

        <div className="space-y-0">
          {steps.map((step, i) => (
            <div key={i} data-testid={`how-step-${i}`}
              className={`flex items-start gap-6 md:gap-10 py-10 border-b border-white/5 last:border-0 ${i % 2 === 0 ? 'gsap-slide-left' : 'gsap-slide-right'}`}>
              <div className="flex flex-col items-center flex-shrink-0">
                <div className="w-14 h-14 rounded-2xl bg-empire-red/10 border border-empire-red/20 flex items-center justify-center">
                  <step.icon className="w-6 h-6 text-empire-red" />
                </div>
                {i < steps.length - 1 && <div className="w-px h-full bg-gradient-to-b from-empire-red/20 to-transparent mt-3 min-h-[40px]" />}
              </div>
              <div className="pt-2">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-[10px] font-body font-bold uppercase tracking-wider text-empire-red">Step {i + 1}</span>
                  <span className="text-[10px] font-body font-semibold text-white/30 bg-white/5 px-2 py-0.5 rounded-full">{step.detail}</span>
                </div>
                <h3 className="font-heading font-bold text-xl md:text-2xl text-white tracking-tight mb-2">{step.title}</h3>
                <p className="text-sm font-body text-white/50 leading-relaxed max-w-md">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
