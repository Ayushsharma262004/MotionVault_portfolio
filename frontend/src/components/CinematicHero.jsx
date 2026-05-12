import { useEffect, useRef, useCallback, useState } from 'react';
import { ArrowRight, Instagram, Twitter, Globe, Activity } from 'lucide-react';

const FADE_MS = 500;
const FADE_OUT_LEAD = 0.55;
const VIDEO_SRC = 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260328_115001_bcdaa3b4-03de-47e7-ad63-ae3e392c32d4.mp4';

export default function CinematicHero() {
  const videoRef = useRef(null);
  const rafRef = useRef(null);
  const fadingOutRef = useRef(false);
  const [email, setEmail] = useState('');

  const fadeTo = useCallback((target, duration) => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    const video = videoRef.current;
    if (!video) return;

    const startOpacity = parseFloat(video.style.opacity) || 0;
    const startTime = performance.now();

    const step = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      video.style.opacity = String(startOpacity + (target - startOpacity) * progress);
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(step);
      }
    };
    rafRef.current = requestAnimationFrame(step);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const onLoadedData = () => {
      video.style.opacity = '0';
      video.play().catch(() => {});
      fadeTo(1, FADE_MS);
    };

    const onTimeUpdate = () => {
      if (
        !fadingOutRef.current &&
        video.duration - video.currentTime <= FADE_OUT_LEAD &&
        video.duration - video.currentTime > 0
      ) {
        fadingOutRef.current = true;
        fadeTo(0, FADE_MS);
      }
    };

    const onEnded = () => {
      video.style.opacity = '0';
      setTimeout(() => {
        video.currentTime = 0;
        video.play().catch(() => {});
        fadingOutRef.current = false;
        fadeTo(1, FADE_MS);
      }, 100);
    };

    video.addEventListener('loadeddata', onLoadedData);
    video.addEventListener('timeupdate', onTimeUpdate);
    video.addEventListener('ended', onEnded);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      video.removeEventListener('loadeddata', onLoadedData);
      video.removeEventListener('timeupdate', onTimeUpdate);
      video.removeEventListener('ended', onEnded);
    };
  }, [fadeTo]);

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
      {/* Background Video */}
      <video
        ref={videoRef}
        src={VIDEO_SRC}
        autoPlay
        muted
        playsInline
        preload="auto"
        data-testid="hero-bg-video"
        className="absolute inset-0 w-full h-full object-cover translate-y-[17%] z-0"
        style={{ opacity: 0 }}
      />

      {/* Subtle gradient overlay for text legibility */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-black/40 via-transparent to-black/60 pointer-events-none" />

      {/* Navigation */}
      <nav className="relative z-20 pl-6 pr-6 py-6" data-testid="cinematic-nav">
        <div className="liquid-glass rounded-full px-6 py-3 flex items-center justify-between max-w-5xl mx-auto">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
              <Activity className="w-5 h-5 text-white" />
            </div>
            <span className="text-white font-semibold text-lg tracking-tight"
              style={{ fontFamily: "'Instrument Serif', serif" }}>
              Empire<span className="text-blue-400">AI</span>
            </span>
          </div>

          {/* Nav links */}
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

          {/* Right actions */}
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
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 py-12 text-center -translate-y-[10%]">
        <h1
          data-testid="cinematic-heading"
          className="text-5xl md:text-6xl lg:text-7xl text-white mb-8 tracking-tight whitespace-nowrap italic"
          style={{ fontFamily: "'Instrument Serif', serif" }}
        >
          Built for the curious
        </h1>

        <div className="max-w-xl w-full space-y-4">
          {/* Email input */}
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

          {/* Subtitle */}
          <p className="text-white/70 text-sm leading-relaxed px-4">
            Stay updated with the latest in AI-powered sports officiating.
            Subscribe to our newsletter and never miss exciting updates.
          </p>

          {/* Manifesto button */}
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
