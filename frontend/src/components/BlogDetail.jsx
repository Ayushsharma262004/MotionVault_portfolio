import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Clock, ArrowUpRight, Activity, Calendar, User } from 'lucide-react';

const blogPosts = {
  'future-of-ai-in-sports': {
    title: 'The Future of AI in Sports Officiating',
    category: 'AI & Sports',
    readTime: '6 min',
    date: 'Dec 12, 2025',
    author: 'Empire AI Research',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2400&auto=format&fit=crop',
    content: [
      { type: 'paragraph', text: 'The integration of artificial intelligence into sports officiating represents one of the most significant technological shifts in competitive sports history. From cricket pitches to football stadiums, AI systems are now capable of making split-second decisions with accuracy that surpasses human capability.' },
      { type: 'heading', text: 'The Evolution of Sports Technology' },
      { type: 'paragraph', text: 'Sports officiating has always been a challenging endeavor. Human referees and umpires must process vast amounts of visual information in real-time, often under extreme pressure. The introduction of technologies like Hawk-Eye in tennis and DRS in cricket marked the beginning of technology-assisted officiating. However, these systems were limited in scope and required significant human intervention.' },
      { type: 'paragraph', text: 'Modern AI systems, like those developed by Empire AI, take this concept to an entirely new level. Using computer vision models trained on millions of professional match frames, these systems can track balls, players, and field markers simultaneously across multiple camera feeds.' },
      { type: 'heading', text: 'How AI Officiating Works' },
      { type: 'paragraph', text: 'The process begins with ultra-high-speed cameras positioned around the venue, capturing every angle at 240 frames per second. Computer vision algorithms then identify and track every moving object in real-time. Physics-based prediction models calculate trajectories, bounce points, and potential outcomes.' },
      { type: 'paragraph', text: 'The decision engine applies sport-specific rules to this data, generating instant, accurate decisions with confidence scoring. When confidence is below a threshold, the system flags the decision for human review, providing supporting visual evidence to help officials make the final call.' },
      { type: 'heading', text: 'The Numbers Speak' },
      { type: 'paragraph', text: 'Empire AI systems achieve 99.7% decision accuracy across supported sports, with response times under 50 milliseconds. This level of performance eliminates the controversial calls that have plagued sports for decades, while maintaining the human element that makes sports compelling.' },
      { type: 'heading', text: 'Looking Ahead' },
      { type: 'paragraph', text: 'The future of AI in sports extends beyond officiating. Predictive analytics, player performance optimization, injury prevention, and fan engagement are all areas where AI will play an increasingly important role. Empire AI is at the forefront of this revolution, developing systems that enhance the integrity and excitement of competitive sports worldwide.' },
    ],
  },
  'smart-stadium-technology': {
    title: 'Smart Stadium Technology: A New Era',
    category: 'Technology',
    readTime: '4 min',
    date: 'Dec 8, 2025',
    author: 'Empire AI Engineering',
    image: 'https://images.unsplash.com/photo-1518605368461-1ee7c510808a?q=80&w=2400&auto=format&fit=crop',
    content: [
      { type: 'paragraph', text: 'The modern sports stadium is evolving from a simple venue into an intelligent ecosystem. Smart stadium technology combines IoT sensors, AI cameras, edge computing, and cloud analytics to create immersive, data-rich experiences for players, officials, and fans alike.' },
      { type: 'heading', text: 'Connected Infrastructure' },
      { type: 'paragraph', text: 'At the heart of a smart stadium is its camera network. Empire AI installations use 8 to 32+ high-speed cameras strategically positioned around the venue. These cameras are synchronized to sub-millisecond precision, creating a comprehensive 3D view of the entire playing field.' },
      { type: 'paragraph', text: 'Edge computing nodes process data locally, ensuring that critical officiating decisions happen with minimal latency. The hybrid cloud architecture then syncs data for long-term storage, analysis, and remote access.' },
      { type: 'heading', text: 'Beyond Officiating' },
      { type: 'paragraph', text: 'Smart stadiums enable a range of capabilities beyond automated officiating: real-time player tracking for broadcast graphics, automated highlight generation, crowd analytics, and personalized fan experiences through mobile apps.' },
      { type: 'paragraph', text: 'The data collected during matches feeds into machine learning models that continuously improve accuracy and expand capabilities. Each match makes the system smarter, creating a virtuous cycle of improvement.' },
      { type: 'heading', text: 'Implementation at Scale' },
      { type: 'paragraph', text: 'Empire AI has deployed smart stadium technology across 120+ venues worldwide, from local training facilities to international cricket grounds. The modular architecture allows venues to start with basic setups and scale as needed, making smart technology accessible to organizations of all sizes.' },
    ],
  },
  'automated-umpiring-systems': {
    title: 'Automated Umpiring: Beyond Human Limits',
    category: 'Innovation',
    readTime: '5 min',
    date: 'Dec 4, 2025',
    author: 'Empire AI Product',
    image: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?q=80&w=2400&auto=format&fit=crop',
    content: [
      { type: 'paragraph', text: 'Human umpires and referees have been the backbone of sports officiating for centuries. But as sports become faster, stakes grow higher, and broadcast technology captures every frame, the limitations of human perception become increasingly apparent.' },
      { type: 'heading', text: 'The Consistency Problem' },
      { type: 'paragraph', text: 'Studies show that even elite officials make incorrect calls 5-8% of the time. Factors like fatigue, viewing angle, pressure, and cognitive bias all contribute to inconsistency. In high-stakes matches, a single wrong call can determine outcomes worth millions.' },
      { type: 'paragraph', text: 'Automated systems eliminate these human factors. They process every frame with the same precision, unaffected by pressure, fatigue, or bias. The result is a level of consistency that was previously impossible.' },
      { type: 'heading', text: 'How Empire AI Achieves 99.7% Accuracy' },
      { type: 'paragraph', text: 'Our system combines multiple AI models working in parallel. Object detection identifies and tracks the ball and players. Physics models predict trajectories and outcomes. Rule engines apply sport-specific regulations. And confidence scoring ensures that borderline cases receive appropriate human oversight.' },
      { type: 'heading', text: 'The Human Element' },
      { type: 'paragraph', text: 'Importantly, automated umpiring does not replace human officials — it empowers them. Officials retain final authority over all decisions. The AI system serves as an incredibly accurate assistant, providing data and analysis that helps officials make better calls.' },
      { type: 'paragraph', text: 'This collaborative approach combines the best of both worlds: the consistency and speed of AI with the judgment and authority of experienced officials.' },
    ],
  },
  'sports-vision-ai-deep-dive': {
    title: 'Sports Vision AI: Technical Deep Dive',
    category: 'Engineering',
    readTime: '8 min',
    date: 'Nov 28, 2025',
    author: 'Empire AI CTO',
    image: 'https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?q=80&w=2400&auto=format&fit=crop',
    content: [
      { type: 'paragraph', text: 'Behind every instant decision made by Empire AI lies a sophisticated pipeline of computer vision, machine learning, and real-time processing systems. This deep dive explores the technical architecture that enables sub-50ms decision-making across multiple sports.' },
      { type: 'heading', text: 'The Camera Pipeline' },
      { type: 'paragraph', text: 'Each camera in the Empire AI network captures at 240fps with a resolution of 4K. Frames are immediately processed by on-camera FPGAs that perform initial feature extraction, reducing the data that needs to be transmitted to the central processing unit.' },
      { type: 'paragraph', text: 'Time synchronization across cameras uses IEEE 1588 Precision Time Protocol, achieving sub-microsecond accuracy. This ensures that multi-camera triangulation produces reliable 3D position data.' },
      { type: 'heading', text: 'Object Detection & Tracking' },
      { type: 'paragraph', text: 'We use a custom architecture based on transformer-based detection models, optimized for sports contexts. The model detects balls (even at 150+ km/h), players, field markings, and equipment simultaneously. Multi-object tracking uses a combination of Kalman filtering and learned appearance features.' },
      { type: 'heading', text: 'Physics Engine' },
      { type: 'paragraph', text: 'Once ball position is established, our physics engine models flight dynamics including air resistance, spin (measured via visual rotation analysis), and surface interaction. For cricket, this includes modeling pitch behavior, seam position, and atmospheric conditions.' },
      { type: 'heading', text: 'Decision Engine' },
      { type: 'paragraph', text: 'The final stage is the sport-specific decision engine. Each sport module encodes the complete rulebook as a formal system, which is evaluated against the physical measurements. Confidence scoring combines measurement uncertainty with rule proximity to generate calibrated probability estimates.' },
    ],
  },
};

const slugs = Object.keys(blogPosts);

export default function BlogDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const post = blogPosts[slug];

  if (!post) {
    return (
      <div className="min-h-screen bg-empire-bg font-body flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-heading font-bold text-3xl text-empire-dark">Post not found</h1>
          <button
            onClick={() => navigate('/')}
            className="mt-4 px-5 py-2.5 bg-empire-blue text-white rounded-xl text-sm font-body font-semibold"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  const currentIdx = slugs.indexOf(slug);
  const nextSlug = slugs[(currentIdx + 1) % slugs.length];
  const nextPost = blogPosts[nextSlug];

  return (
    <div className="min-h-screen bg-white font-body" data-testid="blog-detail-page">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-6 md:px-12 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              data-testid="blog-back-btn"
              onClick={() => navigate('/')}
              className="w-9 h-9 rounded-xl bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 text-empire-dark" />
            </button>
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-empire-blue flex items-center justify-center">
                <Activity className="w-3.5 h-3.5 text-white" />
              </div>
              <span className="font-heading font-bold text-base text-empire-dark">
                Empire<span className="text-empire-blue">AI</span>
              </span>
              <span className="text-xs font-body text-empire-gray">/</span>
              <span className="text-xs font-body text-empire-gray">Blog</span>
            </div>
          </div>
        </div>
      </div>

      {/* Hero image */}
      <div className="w-full h-[300px] md:h-[420px] relative overflow-hidden">
        <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent" />
      </div>

      {/* Article */}
      <article className="max-w-3xl mx-auto px-6 md:px-12 -mt-20 relative z-10">
        {/* Meta */}
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <span className="px-3 py-1 rounded-full bg-empire-blue/10 text-xs font-body font-semibold text-empire-blue">
            {post.category}
          </span>
          <span className="flex items-center gap-1 text-xs font-body text-empire-gray">
            <Calendar className="w-3 h-3" /> {post.date}
          </span>
          <span className="flex items-center gap-1 text-xs font-body text-empire-gray">
            <Clock className="w-3 h-3" /> {post.readTime} read
          </span>
          <span className="flex items-center gap-1 text-xs font-body text-empire-gray">
            <User className="w-3 h-3" /> {post.author}
          </span>
        </div>

        {/* Title */}
        <h1
          data-testid="blog-detail-title"
          className="font-heading font-black text-3xl md:text-4xl lg:text-5xl text-empire-dark leading-tight tracking-tight mb-8"
        >
          {post.title}
        </h1>

        {/* Content */}
        <div className="space-y-5" data-testid="blog-detail-content">
          {post.content.map((block, i) => {
            if (block.type === 'heading') {
              return (
                <h2 key={i} className="font-heading font-bold text-xl md:text-2xl text-empire-dark tracking-tight mt-10 mb-3">
                  {block.text}
                </h2>
              );
            }
            return (
              <p key={i} className="text-base font-body text-empire-gray leading-[1.85]">
                {block.text}
              </p>
            );
          })}
        </div>

        {/* Divider */}
        <div className="border-t border-gray-200 my-12" />

        {/* Next article */}
        <div className="mb-16">
          <span className="text-xs font-body font-bold uppercase tracking-[0.2em] text-empire-blue mb-4 block">Next Article</span>
          <div
            data-testid="blog-next-article"
            onClick={() => navigate(`/blog/${nextSlug}`)}
            className="group cursor-pointer flex items-center gap-6 p-5 rounded-2xl bg-gray-50 hover:bg-gray-100 transition-colors"
          >
            <img
              src={nextPost.image}
              alt={nextPost.title}
              className="w-20 h-20 rounded-xl object-cover flex-shrink-0"
            />
            <div className="flex-1 min-w-0">
              <h3 className="font-heading font-bold text-lg text-empire-dark group-hover:text-empire-blue transition-colors truncate">
                {nextPost.title}
              </h3>
              <p className="text-sm font-body text-empire-gray mt-0.5">{nextPost.readTime} read</p>
            </div>
            <ArrowUpRight className="w-5 h-5 text-empire-gray group-hover:text-empire-blue transition-colors flex-shrink-0" />
          </div>
        </div>
      </article>
    </div>
  );
}
