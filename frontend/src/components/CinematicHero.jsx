import { useEffect, useRef, useState } from 'react';
import { ArrowRight, Instagram, Twitter, Globe, Activity } from 'lucide-react';

const SLIDE_DURATION = 5000;
const FADE_MS = 1200;

const sportsImages = [
  { url: 'https://images.pexels.com/photos/36741130/pexels-photo-36741130.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940', label: 'Cricket' },
  { url: 'https://images.unsplash.com/photo-1539053328711-215a8436a9f7?q=80&w=2400&auto=format&fit=crop', label: 'Football' },
  { url: 'https://images.unsplash.com/photo-1710782914858-9324a4c09c4a?q=80&w=2400&auto=format&fit=crop', label: 'Tennis' },
  { url: 'https://images.unsplash.com/photo-1512719994953-eabf50895df7?q=80&w=2400&auto=format&fit=crop', label: 'Cricket' },
  { url: 'https://images.unsplash.com/photo-1759210720456-c9814f721479?q=80&w=2400&auto=format&fit=crop', label: 'Football' },
];

export default function CinematicHero() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [nextIdx, setNextIdx] = useState(1);
  const [transitioning, setTransitioning] = useState(false);
  const [email, setEmail] = useState('');
  const timerRef = useRef(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let loaded = 0;
    sportsImages.forEach((img) => {
      const i = new Image();
      i.onload = i.onerror = () => { loaded++; if (loaded >= 3) setReady(true); };
      i.src = img.url;
    });
  }, []);

  useEffect(() => {
    if (!ready) return;
    const advance = () => {
      const next = (currentIdx + 1) % sportsImages.length;
      setNextIdx(next);
      setTransitioning(true);
      setTimeout(() => { setCurrentIdx(next); setTransitioning(false); }, FADE_MS);
    };
    timerRef.current = setInterval(advance, SLIDE_DURATION);
    return () => clearInterval(timerRef.current);
  }, [currentIdx, ready]);

  const scrollTo = (id) => document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section id="hero" data-testid="cinematic-hero" className="relative min-h-screen bg-black overflow-hidden flex flex-col">
      {/* Animated BG Images */}
      {sportsImages.map((img, idx) => (
        <div key={idx} className="absolute inset-0 z-0" style={{
          opacity: idx === currentIdx ? (transitioning ? 0 : 1) : idx === nextIdx && transitioning ? 1 : 0,
          transition: `opacity ${FADE_MS}ms ease-in-out`,
        }}>
          <img src={img.url} alt={img.label} className="absolute inset-0 w-full h-full object-cover"
            style={{ animation: idx === currentIdx && !transitioning ? `kenburns ${SLIDE_DURATION + FADE_MS}ms ease-in-out forwards` : 'none' }} />
        </div>
      ))}

      {/* Red-tinted overlay */}
      <div className="absolute inset-0 z-[1] pointer-events-none" style={{
        background: 'linear-gradient(180deg, rgba(10,10,10,0.6) 0%, rgba(153,27,27,0.1) 40%, rgba(10,10,10,0.15) 60%, rgba(10,10,10,0.75) 100%)',
      }} />
      <div className="absolute inset-0 z-[1] bg-gradient-to-r from-black/40 via-transparent to-black/40 pointer-events-none" />

      {/* Slide indicators */}
      <div className="absolute bottom-28 left-1/2 -translate-x-1/2 z-20 flex items-center gap-3">
        {sportsImages.map((img, idx) => (
          <button key={idx} onClick={() => {
            clearInterval(timerRef.current);
            setNextIdx(idx); setTransitioning(true);
            setTimeout(() => { setCurrentIdx(idx); setTransitioning(false); }, FADE_MS);
          }}
            className={`h-1 rounded-full transition-all duration-500 ${idx === currentIdx ? 'w-8 bg-empire-red' : 'w-3 bg-white/20 hover:bg-white/40'}`}
            aria-label={img.label} />
        ))}
      </div>

      {/* Nav */}
      <nav className="relative z-20 px-6 py-6" data-testid="cinematic-nav">
        <div className="liquid-glass rounded-full px-6 py-3 flex items-center justify-between max-w-5xl mx-auto">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-empire-red/20 flex items-center justify-center">
              <Activity className="w-5 h-5 text-empire-red" />
            </div>
            <span className="text-white font-semibold text-lg tracking-tight" style={{ fontFamily: "'Instrument Serif', serif" }}>
              Empire<span className="text-empire-red">AI</span>
            </span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            {[{ l: 'Features', h: '#sports' }, { l: 'Pricing', h: '#pricing' }, { l: 'About', h: '#how-it-works' }].map(({ l, h }) => (
              <button key={l} onClick={() => scrollTo(h)} className="text-white/70 hover:text-white transition-colors text-sm font-medium animated-underline">{l}</button>
            ))}
          </div>
          <div className="flex items-center gap-4">
            <button onClick={() => scrollTo('#contact')} className="text-white/80 text-sm font-medium hidden sm:block hover:text-white transition-colors">Sign Up</button>
            <button onClick={() => scrollTo('#contact')} className="liquid-glass rounded-full px-6 py-2 text-white text-sm font-medium hover:bg-empire-red/10 transition-colors" data-testid="cinematic-login-btn">Contact</button>
          </div>
        </div>
      </nav>

      {/* Hero Content */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 py-12 text-center -translate-y-[5%]">
        <h1 data-testid="cinematic-heading" className="text-5xl md:text-6xl lg:text-7xl text-white mb-8 tracking-tight whitespace-nowrap italic" style={{ fontFamily: "'Instrument Serif', serif" }}>
          Built for the <span className="text-gradient-red">curious</span>
        </h1>
        <div className="max-w-xl w-full space-y-4">
          <form onSubmit={(e) => { e.preventDefault(); if (email) scrollTo('#sports'); }} className="liquid-glass rounded-full pl-6 pr-2 py-2 flex items-center gap-3" data-testid="cinematic-email-form">
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" className="flex-1 bg-transparent border-none outline-none text-white placeholder:text-white/30 text-base" data-testid="cinematic-email-input" />
            <button type="submit" className="bg-empire-red rounded-full p-3 text-white hover:bg-empire-red-light transition-colors flex-shrink-0" data-testid="cinematic-email-submit">
              <ArrowRight className="w-5 h-5" />
            </button>
          </form>
          <p className="text-white/50 text-sm leading-relaxed px-4">AI-powered umpiring for cricket, football, tennis and beyond. Real-time decisions with 99.7% accuracy.</p>
          <div className="flex justify-center">
            <button onClick={() => scrollTo('#how-it-works')} className="liquid-glass rounded-full px-8 py-3 text-white text-sm font-medium hover:bg-empire-red/10 transition-colors" data-testid="cinematic-manifesto-btn">Explore Our Vision</button>
          </div>
        </div>
      </div>

      {/* Social */}
      <div className="relative z-10 flex justify-center gap-4 pb-12" data-testid="cinematic-social">
        {[{ icon: Instagram, label: 'Instagram' }, { icon: Twitter, label: 'Twitter' }, { icon: Globe, label: 'Website' }].map(({ icon: Icon, label }) => (
          <button key={label} aria-label={label} className="liquid-glass rounded-full p-4 text-white/60 hover:text-empire-red hover:bg-empire-red/5 transition-all">
            <Icon className="w-5 h-5" />
          </button>
        ))}
      </div>
    </section>
  );
}
