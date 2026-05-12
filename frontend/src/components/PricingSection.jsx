import { useRef, useEffect, useState } from 'react';
import { Check, ArrowRight, Sparkles } from 'lucide-react';

const plans = [
  {
    name: 'Turf Setup',
    price: '2,499',
    period: '/month',
    description: 'Perfect for local turfs and practice facilities.',
    features: [
      '4 AI cameras',
      'Basic ball tracking',
      'Cloud storage (50GB)',
      'Mobile dashboard',
      'Email support',
      'Monthly reports',
    ],
    popular: false,
    cta: 'Get Started',
  },
  {
    name: 'Academy Package',
    price: '5,999',
    period: '/month',
    description: 'For coaching academies and training centers.',
    features: [
      '8 AI cameras',
      'Advanced ball tracking',
      'Cloud storage (200GB)',
      'Full analytics dashboard',
      'Player performance reports',
      'Priority support',
      'Custom rule sets',
      'Video replay system',
    ],
    popular: true,
    cta: 'Start Free Trial',
  },
  {
    name: 'Tournament',
    price: '12,999',
    period: '/month',
    description: 'For tournament organizers and professional leagues.',
    features: [
      '16 AI cameras',
      'Multi-sport support',
      'Unlimited cloud storage',
      'Real-time referee dashboard',
      'Broadcast integration',
      'Dedicated support manager',
      'API access',
      'Custom branding',
      'Installation included',
    ],
    popular: false,
    cta: 'Contact Sales',
  },
];

export default function PricingSection() {
  const sectionRef = useRef(null);
  const [isInView, setIsInView] = useState(false);

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
      id="pricing"
      ref={sectionRef}
      data-testid="pricing-section"
      className="py-24 md:py-32 lg:py-40 px-6 md:px-12 lg:px-24 bg-empire-bg"
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className={`text-center mb-16 gsap-heading`}>
          <span className="text-xs font-body font-bold uppercase tracking-[0.2em] text-empire-blue">
            // Pricing
          </span>
          <h2
            data-testid="pricing-heading"
            className="font-heading font-black text-4xl md:text-5xl lg:text-6xl text-empire-dark leading-tight tracking-tight mt-4"
          >
            Choose Your<br />Setup.
          </h2>
          <p className="mt-4 text-base md:text-lg font-body text-empire-gray max-w-xl mx-auto leading-relaxed">
            From local turfs to international stadiums. Scale as you grow.
          </p>
        </div>

        {/* Pricing cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start gsap-stagger">
          {plans.map((plan, i) => (
            <div
              key={i}
              data-testid={`pricing-card-${plan.name.toLowerCase().replace(/\s/g, '-')}`}
              className={`relative rounded-2xl p-7 transition-all duration-500 ${
                plan.popular
                  ? 'bg-white border-2 border-empire-blue/20 shadow-xl scale-[1.02] glow-blue'
                  : 'bg-white border border-gray-200 shadow-sm'
              } ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{ transitionDelay: `${200 + i * 150}ms` }}
            >
              {plan.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-empire-blue text-white text-xs font-body font-semibold shadow-md">
                  <Sparkles className="w-3 h-3" />
                  Most Popular
                </div>
              )}

              <h3 className="font-heading font-bold text-xl text-empire-dark">{plan.name}</h3>
              <p className="text-sm font-body text-empire-gray mt-1">{plan.description}</p>

              <div className="mt-5 flex items-baseline gap-1">
                <span className="font-heading font-black text-4xl text-empire-dark">${plan.price}</span>
                <span className="text-sm font-body text-empire-gray">{plan.period}</span>
              </div>

              <button
                data-testid={`pricing-cta-${plan.name.toLowerCase().replace(/\s/g, '-')}`}
                className={`w-full mt-6 py-3 rounded-xl text-sm font-body font-semibold transition-all duration-200 flex items-center justify-center gap-2 ${
                  plan.popular
                    ? 'bg-empire-blue text-white hover:shadow-lg shadow-md'
                    : 'bg-gray-100 text-empire-dark hover:bg-gray-200'
                }`}
              >
                {plan.cta}
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="mt-6 space-y-3">
                {plan.features.map((f, fi) => (
                  <div key={fi} className="flex items-start gap-2.5">
                    <Check className={`w-4 h-4 flex-shrink-0 mt-0.5 ${plan.popular ? 'text-empire-blue' : 'text-empire-green'}`} />
                    <span className="text-sm font-body text-empire-dark/80">{f}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Enterprise */}
        <div
          className={`mt-12 text-center glass-card rounded-2xl p-8 transition-all duration-700 ${
            isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{ transitionDelay: '700ms' }}
        >
          <h3 className="font-heading font-bold text-2xl text-empire-dark">Enterprise Stadium Solution</h3>
          <p className="text-sm font-body text-empire-gray mt-2 max-w-xl mx-auto">
            Custom deployment for international stadiums and broadcasting networks. 32+ cameras, unlimited processing, and dedicated on-site engineering.
          </p>
          <button
            data-testid="pricing-enterprise-cta"
            className="mt-6 px-6 py-3 bg-empire-dark text-white rounded-xl text-sm font-body font-semibold hover:bg-empire-dark/90 transition-colors inline-flex items-center gap-2"
          >
            Talk to Sales
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
