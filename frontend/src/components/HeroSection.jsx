import { useEffect, useRef, useState } from 'react';
import { ArrowRight, Play, Zap, Globe, Shield, Eye } from 'lucide-react';

const rotatingTexts = [
  'Wide Ball Detection',
  'No Ball Detection',
  'LBW Prediction',
  'Goal Line Analysis',
  'AI Referee Vision',
  'Smart Match Analytics',
  'Real-Time Ball Tracking',
];

export default function HeroSection() {
  const heroRef = useRef(null);
  const [currentText, setCurrentText] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setCurrentText((p) => (p + 1) % rotatingTexts.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="hero"
      ref={heroRef}
      data-testid="hero-section"
      className="relative min-h-screen flex flex-col justify-center overflow-hidden pt-24 pb-16"
    >
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-[#F0F4FF] via-[#FAFAFA] to-[#F0F2F5]" />
        {/* Decorative orbs */}
        <div className="absolute top-20 right-[15%] w-[500px] h-[500px] rounded-full bg-empire-blue/5 blur-[100px] animate-glow-pulse" />
        <div className="absolute bottom-20 left-[10%] w-[400px] h-[400px] rounded-full bg-empire-green/5 blur-[80px] animate-glow-pulse" style={{ animationDelay: '1.5s' }} />
        <div className="absolute top-[40%] left-[40%] w-[300px] h-[300px] rounded-full bg-empire-blue/3 blur-[60px]" />
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: 'linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-24 flex flex-col items-center text-center">
        {/* Overline */}
        <div
          data-testid="hero-overline"
          className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
          style={{ transitionDelay: '200ms' }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-light text-xs font-body font-semibold uppercase tracking-[0.2em] text-empire-dark/70 mb-8">
            <Zap className="w-3.5 h-3.5 text-empire-blue" />
            The Future of Umpiring
          </div>
        </div>

        {/* Main headline */}
        <h1
          data-testid="hero-headline"
          className={`font-heading font-black text-empire-dark leading-none tracking-tighter transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{ transitionDelay: '400ms' }}
        >
          <span className="block text-5xl md:text-6xl lg:text-[5.5rem]">Intelligent</span>
          <span className="block text-5xl md:text-6xl lg:text-[5.5rem] text-gradient-blue mt-1">
            Officiating.
          </span>
        </h1>

        {/* Subheading */}
        <p
          data-testid="hero-subheading"
          className={`mt-6 text-base md:text-lg font-body font-normal text-empire-gray max-w-2xl leading-relaxed transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{ transitionDelay: '600ms' }}
        >
          Empire AI transforms cricket, football, tennis, and competitive sports using
          real-time AI-powered umpiring, smart analytics, and automated referee systems.
        </p>

        {/* Rotating text */}
        <div
          className={`mt-5 h-8 overflow-hidden transition-all duration-700 ${
            isVisible ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ transitionDelay: '700ms' }}
        >
          <div
            className="transition-transform duration-500 ease-out"
            style={{ transform: `translateY(-${currentText * 32}px)` }}
          >
            {rotatingTexts.map((text, i) => (
              <div
                key={i}
                className="h-8 flex items-center justify-center text-sm font-body font-semibold text-empire-blue"
              >
                {text}
              </div>
            ))}
          </div>
        </div>

        {/* CTAs */}
        <div
          data-testid="hero-ctas"
          className={`flex flex-wrap items-center justify-center gap-4 mt-8 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{ transitionDelay: '800ms' }}
        >
          <button
            data-testid="hero-watch-demo"
            className="px-6 py-3 text-sm font-body font-semibold text-white bg-empire-blue rounded-full hover:scale-[1.03] active:scale-95 transition-all duration-200 shadow-lg glow-blue flex items-center gap-2"
          >
            Watch Demo
            <Play className="w-4 h-4 fill-current" />
          </button>
          <button
            data-testid="hero-explore-tech"
            className="px-6 py-3 text-sm font-body font-semibold text-empire-dark glass-card rounded-full flex items-center gap-2 hover:scale-[1.03] active:scale-95 transition-all duration-200"
          >
            Explore Technology
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Stats */}
        <div
          data-testid="hero-stats"
          className={`grid grid-cols-2 md:grid-cols-4 gap-4 mt-16 w-full max-w-3xl transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{ transitionDelay: '1000ms' }}
        >
          {[
            { icon: Eye, value: '99.7%', label: 'Decision Accuracy' },
            { icon: Zap, value: '<50ms', label: 'Response Time' },
            { icon: Globe, value: '120+', label: 'Stadiums Worldwide' },
            { icon: Shield, value: '15M+', label: 'Decisions Processed' },
          ].map((stat, i) => (
            <div
              key={i}
              className="glass-card rounded-2xl p-5 flex flex-col items-center text-center"
            >
              <stat.icon className="w-5 h-5 text-empire-blue mb-2" />
              <span className="font-heading font-bold text-2xl md:text-3xl text-empire-dark tracking-tight">
                {stat.value}
              </span>
              <span className="text-xs font-body text-empire-gray mt-1">{stat.label}</span>
            </div>
          ))}
        </div>

        {/* Scroll indicator */}
        <div className="mt-16 scroll-indicator" data-testid="scroll-indicator">
          <div className="w-6 h-10 rounded-full border-2 border-empire-dark/20 flex items-start justify-center pt-2">
            <div className="w-1.5 h-1.5 rounded-full bg-empire-blue animate-bounce" />
          </div>
        </div>
      </div>
    </section>
  );
}
