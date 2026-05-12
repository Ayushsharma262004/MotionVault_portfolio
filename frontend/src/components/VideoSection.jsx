import { useRef, useEffect, useState } from 'react';
import { Play } from 'lucide-react';

export default function VideoSection({ onOpenVideo }) {
  const sectionRef = useRef(null);
  const [isInView, setIsInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setIsInView(true); }, { threshold: 0.1 });
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  const vids = [
    { title: 'Cricket Ball Tracking', duration: '2:15', image: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?q=80&w=800&auto=format&fit=crop' },
    { title: 'Football VAR System', duration: '1:48', image: 'https://images.unsplash.com/photo-1701363539457-875b9bc9bbc1?q=80&w=800&auto=format&fit=crop' },
    { title: 'Tennis Line Calling', duration: '2:02', image: 'https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?q=80&w=800&auto=format&fit=crop' },
  ];

  return (
    <section id="video" ref={sectionRef} data-testid="video-section" className="py-24 md:py-32 lg:py-40 px-6 md:px-12 lg:px-24 bg-empire-dark relative overflow-hidden">
      <div className="absolute bottom-0 left-1/4 w-[600px] h-[600px] rounded-full bg-empire-red/3 blur-[150px] gsap-parallax" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="section-divider gsap-line-draw origin-left mb-24" />
        <div className="text-center mb-12 gsap-heading">
          <span className="text-xs font-body font-bold uppercase tracking-[0.25em] text-empire-red">// See It In Action</span>
          <h2 data-testid="video-heading" className="font-heading font-black text-4xl md:text-5xl lg:text-6xl text-white leading-tight tracking-tight mt-4">
            Watch Empire AI<br /><span className="text-gradient-red">Transform the Game.</span>
          </h2>
        </div>

        {/* Main video */}
        <div className="gsap-scale parallax-img-wrap rounded-[2rem] overflow-hidden cursor-pointer group"
          onClick={() => onOpenVideo && onOpenVideo({ title: 'Empire AI Match Analysis', duration: '3:24', image: 'https://images.unsplash.com/photo-1508344928928-7137b29de218?q=80&w=2400&auto=format&fit=crop' })}>
          <div className="aspect-video relative">
            <img src="https://images.unsplash.com/photo-1508344928928-7137b29de218?q=80&w=2400&auto=format&fit=crop" alt="Empire AI" className="w-full h-full object-cover gsap-parallax-img" />
            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors duration-300" />
            <button data-testid="video-play-btn" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full bg-empire-red/90 flex items-center justify-center group-hover:scale-110 group-hover:bg-empire-red transition-all duration-300 shadow-2xl shadow-empire-red/30">
              <Play className="w-8 h-8 text-white fill-white ml-1" />
            </button>
            <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
              <div className="liquid-glass rounded-2xl px-5 py-3"><p className="text-sm font-body font-semibold text-white">Empire AI Match Analysis</p><p className="text-xs font-body text-white/50 mt-0.5">Full demonstration of real-time AI officiating</p></div>
              <div className="liquid-glass rounded-full px-3 py-1.5 text-xs font-body font-semibold text-white/80">3:24</div>
            </div>
          </div>
        </div>

        {/* Thumbnails */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 gsap-stagger">
          {vids.map((vid, i) => (
            <div key={i} data-testid={`video-thumb-${i}`}
              onClick={() => onOpenVideo && onOpenVideo({ title: vid.title, duration: vid.duration, image: vid.image })}
              className="group cursor-pointer">
              <div className="parallax-img-wrap relative rounded-2xl overflow-hidden aspect-video">
                <img src={vid.image} alt={vid.title} className="w-full h-full object-cover gsap-parallax-img group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-empire-red/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Play className="w-5 h-5 text-white fill-white ml-0.5" />
                </div>
                <span className="absolute bottom-3 right-3 liquid-glass rounded-full px-2.5 py-1 text-[11px] font-body font-semibold text-white/80">{vid.duration}</span>
              </div>
              <h4 className="mt-3 font-heading font-bold text-base text-white/90 group-hover:text-empire-red transition-colors">{vid.title}</h4>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
