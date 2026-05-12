import { useEffect, useRef, useCallback, useState } from 'react';
import { ArrowRight, Instagram, Twitter, Globe, Activity } from 'lucide-react';

const SLIDE_DURATION = 5000;
const FADE_MS = 1200;

const sportsImages = [
  {
    url: 'https://images.pexels.com/photos/36741130/pexels-photo-36741130.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    label: 'Cricket',
  },
  {
    url: 'https://images.unsplash.com/photo-1539053328711-215a8436a9f7?q=80&w=2400&auto=format&fit=crop',
    label: 'Football',
  },
  {
    url: 'https://images.unsplash.com/photo-1710782914858-9324a4c09c4a?q=80&w=2400&auto=format&fit=crop',
    label: 'Tennis',
  },
  {
    url: 'https://images.unsplash.com/photo-1512719994953-eabf50895df7?q=80&w=2400&auto=format&fit=crop',
    label: 'Cricket',
  },
  {
    url: 'https://images.unsplash.com/photo-1759210720456-c9814f721479?q=80&w=2400&auto=format&fit=crop',
    label: 'Football',
  },
];

export default function CinematicHero() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [nextIdx, setNextIdx] = useState(1);
  const [transitioning, setTransitioning] = useState(false);
  const [email, setEmail] = useState('');
  const timerRef = useRef(null);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  // Preload images
  useEffect(() => {
    let loaded = 0;
    sportsImages.forEach((img) => {
      const i = new Image();
      i.onload = () => {
        loaded++;
        if (loaded === sportsImages.length) setImagesLoaded(true);
      };
      i.onerror = () => {
        loaded++;
        if (loaded === sportsImages.length) setImagesLoaded(true);
      };
      i.src = img.url;
    });
  }, []);

  // Auto-advance slideshow
  useEffect(() => {
    if (!imagesLoaded) return;

    const advance = () => {
      const next = (currentIdx + 1) % sportsImages.length;
      setNextIdx(next);
      setTransitioning(true);

      setTimeout(() => {
        setCurrentIdx(next);
        setTransitioning(false);
      }, FADE_MS);
    };

    timerRef.current = setInterval(advance, SLIDE_DURATION);
    return () => clearInterval(timerRef.current);
  }, [currentIdx, imagesLoaded]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      const el = document.querySelector('#sports');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToSection = (id) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      data-testid="cinematic-hero"
      className="relative min-h-screen bg-black overflow-hidden flex flex-col"
    >
      {/* Animated Background Images */}
      {sportsImages.map((img, idx) => (
        <div
          key={idx}
          className="absolute inset-0 w-full h-full z-0"
          style={{
            opacity: idx === currentIdx ? (transitioning ? 0 : 1) :
                     idx === nextIdx && transitioning ? 1 : 0,
            transition: `opacity ${FADE_MS}ms ease-in-out`,
          }}
        >
          <img
            src={img.url}
            alt={img.label}
            className="absolute inset-0 w-full h-full object-cover"
            style={{
              animation: idx === currentIdx && !transitioning
                ? `kenburns ${SLIDE_DURATION + FADE_MS}ms ease-in-out forwards`
                : 'none',
              transform: 'scale(1)',
            }}
          />
        </div>
      ))}

      {/* Dark cinematic overlays */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-black/50 via-black/20 to-black/70 pointer-events-none" />
      <div className="absolute inset-0 z-[1] bg-gradient-to-r from-black/30 via-transparent to-black/30 pointer-events-none" />

      {/* Sport label indicator */}
      <div className="absolute bottom-28 left-1/2 -translate-x-1/2 z-20 flex items-center gap-3" data-testid="sport-indicators">
        {sportsImages.map((img, idx) => (
          <button
            key={idx}
            onClick={() => {
              clearInterval(timerRef.current);
              setNextIdx(idx);
              setTransitioning(true);
              setTimeout(() => {
                setCurrentIdx(idx);
                setTransitioning(false);
              }, FADE_MS);
            }}
            className={`h-1 rounded-full transition-all duration-500 ${
              idx === currentIdx
                ? 'w-8 bg-white'
                : 'w-3 bg-white/30 hover:bg-white/50'
            }`}
            aria-label={img.label}
          />
        ))}
      </div>

      {/* Navigation */}
      <nav className="relative z-20 pl-6 pr-6 py-6" data-testid="cinematic-nav">
        <div className="liquid-glass rounded-full px-6 py-3 flex items-center justify-between max-w-5xl mx-auto">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
              <Activity className="w-5 h-5 text-white" />
            </div>
            <span className="text-white font-semibold text-lg tracking-tight"
              style={{ fontFamily: "'Instrument Serif', serif" }}>
              Empire<span className="text-blue-400">AI</span>
            </span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            {[
              { label: 'Features', href: '#sports' },
              { label: 'Pricing', href: '#pricing' },
              { label: 'About', href: '#how-it-works' },
            ].map((link) => (
              <button
                key={link.label}
                onClick={() => scrollToSection(link.href)}
                className="text-white/80 hover:text-white transition-colors text-sm font-medium"
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => scrollToSection('#contact')}
              className="text-white text-sm font-medium hidden sm:block hover:text-white/80 transition-colors"
              data-testid="cinematic-signup-btn"
            >
              Sign Up
            </button>
            <button
              onClick={() => scrollToSection('#contact')}
              className="liquid-glass rounded-full px-6 py-2 text-white text-sm font-medium"
              data-testid="cinematic-login-btn"
            >
              Contact
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Content */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 py-12 text-center -translate-y-[5%]">
        <h1
          data-testid="cinematic-heading"
          className="text-5xl md:text-6xl lg:text-7xl text-white mb-8 tracking-tight whitespace-nowrap italic"
          style={{ fontFamily: "'Instrument Serif', serif" }}
        >
          Built for the curious
        </h1>

        <div className="max-w-xl w-full space-y-4">
          <form
            onSubmit={handleSubmit}
            data-testid="cinematic-email-form"
            className="liquid-glass rounded-full pl-6 pr-2 py-2 flex items-center gap-3"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              data-testid="cinematic-email-input"
              className="flex-1 bg-transparent border-none outline-none text-white placeholder:text-white/40 text-base"
            />
            <button
              type="submit"
              data-testid="cinematic-email-submit"
              className="bg-white rounded-full p-3 text-black hover:bg-white/90 transition-colors flex-shrink-0"
            >
              <ArrowRight className="w-5 h-5" />
            </button>
          </form>

          <p className="text-white/70 text-sm leading-relaxed px-4">
            AI-powered umpiring for cricket, football, tennis and beyond.
            Real-time decisions with 99.7% accuracy.
          </p>

          <div className="flex justify-center">
            <button
              onClick={() => scrollToSection('#how-it-works')}
              data-testid="cinematic-manifesto-btn"
              className="liquid-glass rounded-full px-8 py-3 text-white text-sm font-medium hover:bg-white/5 transition-colors"
            >
              Explore Our Vision
            </button>
          </div>
        </div>
      </div>

      {/* Social icons footer */}
      <div className="relative z-10 flex justify-center gap-4 pb-12" data-testid="cinematic-social">
        {[
          { icon: Instagram, label: 'Instagram' },
          { icon: Twitter, label: 'Twitter' },
          { icon: Globe, label: 'Website' },
        ].map(({ icon: Icon, label }) => (
          <button
            key={label}
            aria-label={label}
            className="liquid-glass rounded-full p-4 text-white/80 hover:text-white hover:bg-white/5 transition-all"
          >
            <Icon className="w-5 h-5" />
          </button>
        ))}
      </div>
    </section>
  );
}
