import { useRef, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock, ArrowUpRight } from 'lucide-react';

const posts = [
  {
    slug: 'future-of-ai-in-sports',
    title: 'The Future of AI in Sports Officiating',
    excerpt: 'How machine learning is revolutionizing the way we officiate competitive sports, from cricket pitches to football stadiums.',
    category: 'AI & Sports',
    readTime: '6 min',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop',
    date: 'Dec 12, 2025',
  },
  {
    slug: 'smart-stadium-technology',
    title: 'Smart Stadium Technology: A New Era',
    excerpt: 'Exploring how integrated camera systems and edge computing are transforming stadiums into intelligent venues.',
    category: 'Technology',
    readTime: '4 min',
    image: 'https://images.unsplash.com/photo-1518605368461-1ee7c510808a?q=80&w=800&auto=format&fit=crop',
    date: 'Dec 8, 2025',
  },
  {
    slug: 'automated-umpiring-systems',
    title: 'Automated Umpiring: Beyond Human Limits',
    excerpt: 'Why AI-powered officiating delivers consistency and accuracy that surpasses even the most experienced human referees.',
    category: 'Innovation',
    readTime: '5 min',
    image: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?q=80&w=800&auto=format&fit=crop',
    date: 'Dec 4, 2025',
  },
  {
    slug: 'sports-vision-ai-deep-dive',
    title: 'Sports Vision AI: Technical Deep Dive',
    excerpt: 'Under the hood of computer vision models that track balls at 240fps and predict trajectories with sub-millimeter accuracy.',
    category: 'Engineering',
    readTime: '8 min',
    image: 'https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?q=80&w=800&auto=format&fit=crop',
    date: 'Nov 28, 2025',
  },
];

export default function BlogSection() {
  const sectionRef = useRef(null);
  const [isInView, setIsInView] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsInView(true); },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="blog"
      ref={sectionRef}
      data-testid="blog-section"
      className="py-24 md:py-32 lg:py-40 px-6 md:px-12 lg:px-24 bg-white"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className={`flex flex-col md:flex-row md:items-end md:justify-between mb-12 gsap-heading`}>
          <div>
            <span className="text-xs font-body font-bold uppercase tracking-[0.2em] text-empire-blue">
              // Insights
            </span>
            <h2
              data-testid="blog-heading"
              className="font-heading font-black text-4xl md:text-5xl lg:text-6xl text-empire-dark leading-tight tracking-tight mt-4"
            >
              Latest from<br />Empire AI.
            </h2>
          </div>
          <button
            data-testid="blog-view-all"
            className="mt-4 md:mt-0 flex items-center gap-2 text-sm font-body font-semibold text-empire-blue hover:underline"
          >
            View All Posts
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>

        {/* Blog grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 gsap-stagger">
          {posts.map((post, i) => (
            <article
              key={i}
              data-testid={`blog-card-${i}`}
              onClick={() => navigate(`/blog/${post.slug}`)}
              className={`group cursor-pointer transition-all duration-500 ${
                isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${200 + i * 100}ms` }}
            >
              <div className="relative rounded-2xl overflow-hidden aspect-[16/10] mb-4">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4">
                  <span className="glass-heavy rounded-full px-3 py-1 text-xs font-body font-semibold text-empire-dark">
                    {post.category}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-3 mb-2">
                <span className="text-xs font-body text-empire-gray">{post.date}</span>
                <span className="text-empire-gray/30">|</span>
                <span className="flex items-center gap-1 text-xs font-body text-empire-gray">
                  <Clock className="w-3 h-3" />
                  {post.readTime}
                </span>
              </div>
              <h3 className="font-heading font-bold text-xl md:text-2xl text-empire-dark tracking-tight group-hover:text-empire-blue transition-colors duration-200">
                {post.title}
              </h3>
              <p className="mt-2 text-sm font-body text-empire-gray leading-relaxed">
                {post.excerpt}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
