import { useRef, useEffect, useState } from 'react';
import { Play } from 'lucide-react';

export default function VideoSection({ onOpenVideo }) {
  const sectionRef = useRef(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsInView(true); },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="video"
      ref={sectionRef}
      data-testid="video-section"
      className="py-24 md:py-32 lg:py-40 px-6 md:px-12 lg:px-24 bg-empire-bg"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className={`text-center mb-12 gsap-heading`}>
          <span className="text-xs font-body font-bold uppercase tracking-[0.2em] text-empire-blue">
            // See It In Action
          </span>
          <h2
            data-testid="video-heading"
            className="font-heading font-black text-4xl md:text-5xl lg:text-6xl text-empire-dark leading-tight tracking-tight mt-4"
          >
            Watch Empire AI<br />Transform the Game.
          </h2>
        </div>

        {/* Main video */}
        <div
          className={`relative rounded-[2rem] overflow-hidden gsap-scale transition-all duration-700 ${
            isInView ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}
          style={{ transitionDelay: '300ms' }}
        >
          <div className="aspect-video relative group cursor-pointer" onClick={() => onOpenVideo && onOpenVideo({ title: 'Empire AI Match Analysis', subtitle: 'Full demonstration of real-time AI officiating', duration: '3:24', image: 'https://images.unsplash.com/photo-1508344928928-7137b29de218?q=80&w=2400&auto=format&fit=crop' })}>
            <img
              src="https://images.unsplash.com/photo-1508344928928-7137b29de218?q=80&w=2400&auto=format&fit=crop"
              alt="Empire AI in action"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300" />

            {/* Play button */}
            <button
              data-testid="video-play-btn"
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full glass-heavy flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-xl"
            >
              <Play className="w-8 h-8 text-empire-dark fill-empire-dark ml-1" />
            </button>

            {/* Glass overlay info */}
            <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
              <div className="glass-heavy rounded-2xl px-5 py-3">
                <p className="text-sm font-body font-semibold text-empire-dark">
                  Empire AI Match Analysis
                </p>
                <p className="text-xs font-body text-empire-gray mt-0.5">
                  Full demonstration of real-time AI officiating
                </p>
              </div>
              <div className="glass-heavy rounded-full px-3 py-1.5 text-xs font-body font-semibold text-empire-dark">
                3:24
              </div>
            </div>
          </div>
        </div>

        {/* Smaller video thumbnails */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          {[
            {
              title: 'Cricket Ball Tracking',
              duration: '2:15',
              image: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?q=80&w=800&auto=format&fit=crop',
            },
            {
              title: 'Football VAR System',
              duration: '1:48',
              image: 'https://images.unsplash.com/photo-1518605368461-1ee7c510808a?q=80&w=800&auto=format&fit=crop',
            },
            {
              title: 'Tennis Line Calling',
              duration: '2:02',
              image: 'https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?q=80&w=800&auto=format&fit=crop',
            },
          ].map((vid, i) => (
            <div
              key={i}
              data-testid={`video-thumb-${i}`}
              className={`group cursor-pointer transition-all duration-500 ${
                isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${500 + i * 150}ms` }}
            >
              <div className="relative rounded-2xl overflow-hidden aspect-video">
                <img
                  src={vid.image}
                  alt={vid.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full glass-heavy flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Play className="w-5 h-5 text-empire-dark fill-empire-dark ml-0.5" />
                </div>
                <span className="absolute bottom-3 right-3 glass-heavy rounded-full px-2.5 py-1 text-[11px] font-body font-semibold text-empire-dark">
                  {vid.duration}
                </span>
              </div>
              <h4 className="mt-3 font-heading font-bold text-base text-empire-dark">{vid.title}</h4>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
