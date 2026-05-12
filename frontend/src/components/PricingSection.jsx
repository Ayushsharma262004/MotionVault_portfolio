import { useNavigate } from 'react-router-dom';
import { Check, ArrowRight, Sparkles } from 'lucide-react';

const plans = [
  { name: 'Turf Setup', slug: 'turf-setup', price: '2,499', period: '/month', description: 'Perfect for local turfs and practice facilities.', features: ['4 AI cameras', 'Basic ball tracking', 'Cloud storage (50GB)', 'Mobile dashboard', 'Email support', 'Monthly reports'], popular: false, cta: 'Get Started' },
  { name: 'Academy Package', slug: 'academy-package', price: '5,999', period: '/month', description: 'For coaching academies and training centers.', features: ['8 AI cameras', 'Advanced ball tracking', 'Cloud storage (200GB)', 'Full analytics dashboard', 'Player performance reports', 'Priority support', 'Custom rule sets', 'Video replay system'], popular: true, cta: 'Start Free Trial' },
  { name: 'Tournament', slug: 'tournament', price: '12,999', period: '/month', description: 'For tournament organizers and professional leagues.', features: ['16 AI cameras', 'Multi-sport support', 'Unlimited cloud storage', 'Real-time referee dashboard', 'Broadcast integration', 'Dedicated support', 'API access', 'Custom branding', 'Installation included'], popular: false, cta: 'Contact Sales' },
];

export default function PricingSection() {
  const navigate = useNavigate();
  return (
    <section id="pricing" data-testid="pricing-section" className="py-24 md:py-32 lg:py-40 px-6 md:px-12 lg:px-24 bg-empire-dark relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-empire-red/4 blur-[150px] gsap-parallax" />
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="section-divider gsap-line-draw origin-left mb-24" />
        <div className="text-center mb-16 gsap-heading">
          <span className="text-xs font-body font-bold uppercase tracking-[0.25em] text-empire-red">// Pricing</span>
          <h2 data-testid="pricing-heading" className="font-heading font-black text-4xl md:text-5xl lg:text-6xl text-white leading-tight tracking-tight mt-4">
            Choose Your<br /><span className="text-gradient-red">Setup.</span>
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start gsap-stagger">
          {plans.map((plan, i) => (
            <div key={i} data-testid={`pricing-card-${plan.name.toLowerCase().replace(/\s/g, '-')}`}
              className={`relative rounded-2xl p-7 transition-all duration-500 ${plan.popular ? 'dark-glass border-empire-red/20 border scale-[1.02] glow-red' : 'dark-glass'}`}>
              {plan.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-empire-red text-white text-xs font-body font-semibold shadow-lg shadow-empire-red/30">
                  <Sparkles className="w-3 h-3" />Most Popular
                </div>
              )}
              <h3 className="font-heading font-bold text-xl text-white">{plan.name}</h3>
              <p className="text-sm font-body text-white/40 mt-1">{plan.description}</p>
              <div className="mt-5 flex items-baseline gap-1">
                <span className="font-heading font-black text-4xl text-white">${plan.price}</span>
                <span className="text-sm font-body text-white/40">{plan.period}</span>
              </div>
              <button data-testid={`pricing-cta-${plan.name.toLowerCase().replace(/\s/g, '-')}`} onClick={() => navigate(`/plan/${plan.slug}`)}
                className={`w-full mt-6 py-3 rounded-xl text-sm font-body font-semibold transition-all duration-200 flex items-center justify-center gap-2 ${
                  plan.popular ? 'bg-empire-red text-white hover:shadow-lg shadow-empire-red/20' : 'bg-white/5 text-white hover:bg-white/10'}`}>
                {plan.cta}<ArrowRight className="w-4 h-4" />
              </button>
              <div className="mt-6 space-y-3">
                {plan.features.map((f, fi) => (
                  <div key={fi} className="flex items-start gap-2.5">
                    <Check className={`w-4 h-4 flex-shrink-0 mt-0.5 ${plan.popular ? 'text-empire-red' : 'text-empire-red/60'}`} />
                    <span className="text-sm font-body text-white/60">{f}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-12 text-center dark-glass rounded-2xl p-8 gsap-scale">
          <h3 className="font-heading font-bold text-2xl text-white">Enterprise Stadium Solution</h3>
          <p className="text-sm font-body text-white/40 mt-2 max-w-xl mx-auto">Custom deployment for international stadiums. 32+ cameras, unlimited processing, dedicated on-site engineering.</p>
          <button data-testid="pricing-enterprise-cta" onClick={() => navigate('/plan/enterprise')}
            className="mt-6 px-6 py-3 bg-empire-red text-white rounded-xl text-sm font-body font-semibold hover:bg-empire-red-light transition-colors inline-flex items-center gap-2">
            Talk to Sales<ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
