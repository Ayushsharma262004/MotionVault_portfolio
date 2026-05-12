import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { ArrowLeft, Activity, Check, Send, CheckCircle, AlertCircle } from 'lucide-react';
import axios from 'axios';

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const planDetails = {
  'turf-setup': {
    name: 'Turf Setup',
    price: '2,499',
    period: '/month',
    description: 'Perfect for local turfs and practice facilities. Get started with AI-powered officiating in your venue.',
    features: ['4 AI cameras', 'Basic ball tracking', 'Cloud storage (50GB)', 'Mobile dashboard', 'Email support', 'Monthly reports'],
    color: '#3081FF',
  },
  'academy-package': {
    name: 'Academy Package',
    price: '5,999',
    period: '/month',
    description: 'For coaching academies and training centers. Advanced analytics to improve player performance.',
    features: ['8 AI cameras', 'Advanced ball tracking', 'Cloud storage (200GB)', 'Full analytics dashboard', 'Player performance reports', 'Priority support', 'Custom rule sets', 'Video replay system'],
    color: '#22C55E',
  },
  'tournament': {
    name: 'Tournament Package',
    price: '12,999',
    period: '/month',
    description: 'For tournament organizers and professional leagues. Full-featured AI officiating for competitive events.',
    features: ['16 AI cameras', 'Multi-sport support', 'Unlimited cloud storage', 'Real-time referee dashboard', 'Broadcast integration', 'Dedicated support manager', 'API access', 'Custom branding', 'Installation included'],
    color: '#FF3B30',
  },
  'enterprise': {
    name: 'Enterprise Stadium',
    price: 'Custom',
    period: '',
    description: 'Custom deployment for international stadiums and broadcasting networks. 32+ cameras, unlimited processing, and dedicated on-site engineering.',
    features: ['32+ AI cameras', 'All sports supported', 'Unlimited everything', 'On-site engineering team', 'Custom integrations', 'White-label option', 'SLA guarantee', '24/7 support', 'Training included', 'Hardware provided'],
    color: '#3081FF',
  },
};

export default function PlanSignup() {
  const { planId } = useParams();
  const navigate = useNavigate();
  const plan = planDetails[planId];
  const [form, setForm] = useState({ name: '', email: '', phone: '', organization: '', message: '' });
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  if (!plan) {
    return (
      <div className="min-h-screen bg-empire-bg font-body flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-heading font-bold text-3xl text-empire-dark">Plan not found</h1>
          <button onClick={() => navigate('/')} className="mt-4 px-5 py-2.5 bg-empire-blue text-white rounded-xl text-sm font-body font-semibold">Back to Home</button>
        </div>
      </div>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email) return;
    setLoading(true);
    setStatus(null);
    try {
      await axios.post(`${API}/contact`, {
        name: form.name,
        email: form.email,
        phone: form.phone,
        sport: plan.name,
        message: `[Plan Inquiry: ${plan.name}] Organization: ${form.organization || 'N/A'}. ${form.message}`,
      });
      setStatus('success');
      setForm({ name: '', email: '', phone: '', organization: '', message: '' });
    } catch {
      setStatus('error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-empire-bg font-body" data-testid="plan-signup-page">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-6 md:px-12 py-4 flex items-center gap-4">
          <button
            data-testid="plan-back-btn"
            onClick={() => navigate('/')}
            className="w-9 h-9 rounded-xl bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 text-empire-dark" />
          </button>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-empire-blue flex items-center justify-center">
              <Activity className="w-4 h-4 text-white" />
            </div>
            <span className="font-heading font-bold text-lg text-empire-dark">
              Empire<span className="text-empire-blue">AI</span>
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 md:px-12 py-12 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Plan details */}
          <div>
            <div
              className="inline-block px-3 py-1 rounded-full text-xs font-body font-semibold mb-4"
              style={{ backgroundColor: `${plan.color}15`, color: plan.color }}
            >
              {plan.name}
            </div>
            <h1
              data-testid="plan-title"
              className="font-heading font-black text-3xl md:text-4xl text-empire-dark leading-tight tracking-tight"
            >
              Get Started with<br />{plan.name}
            </h1>
            <p className="mt-4 text-base font-body text-empire-gray leading-relaxed">{plan.description}</p>

            <div className="mt-6 flex items-baseline gap-1">
              <span className="font-heading font-black text-4xl text-empire-dark">{plan.price === 'Custom' ? 'Custom' : `$${plan.price}`}</span>
              {plan.period && <span className="text-sm font-body text-empire-gray">{plan.period}</span>}
            </div>

            <div className="mt-8 space-y-3">
              <h3 className="font-heading font-bold text-sm text-empire-dark uppercase tracking-wider">What's included</h3>
              {plan.features.map((f, i) => (
                <div key={i} className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 flex-shrink-0" style={{ color: plan.color }} />
                  <span className="text-sm font-body text-empire-dark/80">{f}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Signup form */}
          <div>
            <form
              onSubmit={handleSubmit}
              data-testid="plan-signup-form"
              className="bg-white rounded-2xl border border-gray-100 shadow-sm p-7 space-y-5"
            >
              <h2 className="font-heading font-bold text-xl text-empire-dark mb-1">
                {plan.price === 'Custom' ? 'Contact Our Team' : 'Request Setup'}
              </h2>
              <p className="text-sm font-body text-empire-gray mb-4">
                Fill in your details and our team will reach out within 24 hours.
              </p>

              <div>
                <label className="block text-xs font-body font-semibold text-empire-dark mb-1.5">Full Name *</label>
                <input
                  data-testid="plan-name"
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-body text-empire-dark placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-empire-blue/30 focus:border-empire-blue/50 transition-all"
                  placeholder="Your name"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-body font-semibold text-empire-dark mb-1.5">Email *</label>
                <input
                  data-testid="plan-email"
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-body text-empire-dark placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-empire-blue/30 focus:border-empire-blue/50 transition-all"
                  placeholder="you@email.com"
                  required
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-body font-semibold text-empire-dark mb-1.5">Phone</label>
                  <input
                    data-testid="plan-phone"
                    type="tel"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-body text-empire-dark placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-empire-blue/30 focus:border-empire-blue/50 transition-all"
                    placeholder="+1 (555) 000-0000"
                  />
                </div>
                <div>
                  <label className="block text-xs font-body font-semibold text-empire-dark mb-1.5">Organization</label>
                  <input
                    data-testid="plan-organization"
                    type="text"
                    value={form.organization}
                    onChange={(e) => setForm({ ...form, organization: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-body text-empire-dark placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-empire-blue/30 focus:border-empire-blue/50 transition-all"
                    placeholder="Club or venue name"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-body font-semibold text-empire-dark mb-1.5">Additional Details</label>
                <textarea
                  data-testid="plan-message"
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-body text-empire-dark placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-empire-blue/30 focus:border-empire-blue/50 transition-all resize-none"
                  placeholder="Tell us about your venue and requirements..."
                />
              </div>

              {status === 'success' && (
                <div data-testid="plan-success" className="flex items-center gap-2 text-sm font-body text-empire-green bg-empire-green/5 rounded-xl px-4 py-3">
                  <CheckCircle className="w-4 h-4" />
                  Request submitted! We'll be in touch within 24 hours.
                </div>
              )}
              {status === 'error' && (
                <div data-testid="plan-error" className="flex items-center gap-2 text-sm font-body text-empire-red bg-empire-red/5 rounded-xl px-4 py-3">
                  <AlertCircle className="w-4 h-4" />
                  Something went wrong. Please try again.
                </div>
              )}

              <button
                type="submit"
                data-testid="plan-submit"
                disabled={loading}
                className="w-full py-3 rounded-xl text-white text-sm font-body font-semibold hover:shadow-lg shadow-md transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-60"
                style={{ backgroundColor: plan.color }}
              >
                {loading ? 'Submitting...' : plan.price === 'Custom' ? 'Contact Sales Team' : 'Submit Request'}
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
