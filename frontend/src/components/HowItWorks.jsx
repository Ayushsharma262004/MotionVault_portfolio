import { useRef, useEffect, useState } from 'react';
import { Camera, Cpu, Brain, CheckCircle, BarChart3 } from 'lucide-react';

const steps = [
  {
    icon: Camera,
    title: 'Cameras Capture Motion',
    description: 'Ultra-high-speed cameras positioned around the venue capture every angle at 240fps with sub-millisecond synchronization.',
    detail: '32+ camera feeds',
  },
  {
    icon: Cpu,
    title: 'AI Detects Players & Ball',
    description: 'Computer vision models identify and track every player, the ball, and key field markers in real-time across all camera feeds.',
    detail: 'Object detection',
  },
  {
    icon: Brain,
    title: 'Real-Time Processing Engine',
    description: 'Edge computing nodes process data locally with <12ms latency, running proprietary neural networks optimized for sports physics.',
    detail: '<12ms latency',
  },
  {
    icon: CheckCircle,
    title: 'Automated Decision System',
    description: 'AI referee engine applies sport-specific rules to generate instant, accurate decisions with confidence scoring.',
    detail: '99.7% accuracy',
  },
  {
    icon: BarChart3,
    title: 'Live Match Analytics',
    description: 'Comprehensive dashboard delivers real-time statistics, visual replays, and predictive insights to officials and broadcasters.',
    detail: 'Real-time dashboard',
  },
];

export default function HowItWorks() {
  const sectionRef = useRef(null);
  const [isInView, setIsInView] = useState(false);
  const [activeStep, setActiveStep] = useState(-1);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsInView(true);
      },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isInView) return;
    const timers = steps.map((_, i) =>
      setTimeout(() => setActiveStep(i), 300 * (i + 1))
    );
    return () => timers.forEach(clearTimeout);
  }, [isInView]);

  return (
    <section
      id="how-it-works"
      ref={sectionRef}
      data-testid="how-it-works-section"
      className="py-24 md:py-32 lg:py-40 px-6 md:px-12 lg:px-24 bg-empire-bg"
    >
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className={`text-center mb-20 transition-all duration-700 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span className="text-xs font-body font-bold uppercase tracking-[0.2em] text-empire-blue">
            // How It Works
          </span>
          <h2
            data-testid="how-it-works-heading"
            className="font-heading font-black text-4xl md:text-5xl lg:text-6xl text-empire-dark leading-tight tracking-tight mt-4"
          >
            From Camera<br />to Decision.
          </h2>
          <p className="mt-4 text-base md:text-lg font-body text-empire-gray max-w-xl mx-auto leading-relaxed">
            Five stages of AI-powered officiating, each completed in under 50 milliseconds.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-6 md:left-1/2 md:-translate-x-px top-0 bottom-0 w-0.5 bg-gray-200 hidden md:block" />
          <div
            className="absolute left-6 md:left-1/2 md:-translate-x-px top-0 w-0.5 timeline-line hidden md:block transition-all duration-1000"
            style={{ height: isInView ? '100%' : '0%' }}
          />

          <div className="space-y-8 md:space-y-0">
            {steps.map((step, i) => {
              const isLeft = i % 2 === 0;
              const isActive = i <= activeStep;
              return (
                <div
                  key={i}
                  data-testid={`how-step-${i}`}
                  className={`relative flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-0 ${
                    i > 0 ? 'md:mt-16' : ''
                  } transition-all duration-600 ${isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
                  style={{ transitionDelay: `${i * 150}ms` }}
                >
                  {/* Left content */}
                  <div className={`md:w-1/2 ${isLeft ? 'md:pr-12 md:text-right' : 'md:order-2 md:pl-12'}`}>
                    <div className={`glass-card rounded-2xl p-6 ${isLeft ? '' : ''}`}>
                      <div className={`flex items-center gap-3 mb-3 ${isLeft ? 'md:flex-row-reverse' : ''}`}>
                        <div className="w-10 h-10 rounded-xl bg-empire-blue/10 flex items-center justify-center flex-shrink-0">
                          <step.icon className="w-5 h-5 text-empire-blue" />
                        </div>
                        <div>
                          <span className="text-[10px] font-body font-bold uppercase tracking-wider text-empire-blue">
                            Step {i + 1}
                          </span>
                          <h3 className="font-heading font-bold text-lg text-empire-dark tracking-tight">
                            {step.title}
                          </h3>
                        </div>
                      </div>
                      <p className={`text-sm font-body text-empire-gray leading-relaxed ${isLeft ? 'md:text-right' : ''}`}>
                        {step.description}
                      </p>
                      <div className={`mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-empire-blue/5 text-xs font-body font-semibold text-empire-blue ${isLeft ? 'md:float-right' : ''}`}>
                        {step.detail}
                      </div>
                    </div>
                  </div>

                  {/* Center node */}
                  <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-white border-2 border-empire-blue items-center justify-center z-10 shadow-md">
                    <div
                      className={`w-3 h-3 rounded-full transition-all duration-500 ${
                        isActive ? 'bg-empire-blue scale-100' : 'bg-gray-300 scale-50'
                      }`}
                    />
                  </div>

                  {/* Empty right side */}
                  <div className={`hidden md:block md:w-1/2 ${isLeft ? 'md:order-2' : ''}`} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
