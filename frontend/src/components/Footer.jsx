import { useState } from 'react';
import { Activity, ArrowRight, CheckCircle, AlertCircle } from 'lucide-react';
import axios from 'axios';

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const footerLinks = {
  Product: ['Features', 'Pricing', 'Dashboard', 'API Docs', 'Changelog'],
  Sports: ['Cricket AI', 'Football Referee', 'Tennis Vision', 'Multi-Sport'],
  Company: ['About Us', 'Careers', 'Blog', 'Press Kit', 'Contact'],
  Legal: ['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'GDPR'],
};

const socialLinks = [
  { name: 'Twitter', href: '#' },
  { name: 'LinkedIn', href: '#' },
  { name: 'YouTube', href: '#' },
  { name: 'GitHub', href: '#' },
];

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subStatus, setSubStatus] = useState(null);
  const [subLoading, setSubLoading] = useState(false);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email) return;
    setSubLoading(true);
    setSubStatus(null);
    try {
      await axios.post(`${API}/subscribe`, { email });
      setSubStatus('success');
      setEmail('');
    } catch (err) {
      setSubStatus(err.response?.status === 400 ? 'exists' : 'error');
    } finally {
      setSubLoading(false);
    }
  };

  return (
    <footer data-testid="footer" className="bg-gray-50 border-t border-gray-200">
      {/* Email CTA */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 py-16 md:py-20">
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8 md:p-12 text-center">
          <h3 className="font-heading font-black text-3xl md:text-4xl text-empire-dark tracking-tight">
            Stay Ahead of the Game
          </h3>
          <p className="mt-3 text-base font-body text-empire-gray max-w-md mx-auto">
            Get the latest updates on AI sports technology, product launches, and industry insights.
          </p>
          <form
            onSubmit={handleSubscribe}
            data-testid="subscribe-form"
            className="mt-6 flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
          >
            <input
              data-testid="subscribe-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 px-4 py-3 rounded-xl border border-gray-200 text-sm font-body text-empire-dark placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-empire-blue/30 focus:border-empire-blue/50"
              placeholder="Enter your email"
              required
            />
            <button
              type="submit"
              data-testid="subscribe-submit"
              disabled={subLoading}
              className="px-6 py-3 rounded-xl bg-empire-blue text-white text-sm font-body font-semibold hover:shadow-lg shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-60 whitespace-nowrap"
            >
              {subLoading ? 'Subscribing...' : 'Subscribe'}
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
          {subStatus === 'success' && (
            <div data-testid="subscribe-success" className="mt-3 flex items-center justify-center gap-2 text-sm font-body text-empire-green">
              <CheckCircle className="w-4 h-4" />
              Subscribed successfully!
            </div>
          )}
          {subStatus === 'exists' && (
            <div data-testid="subscribe-exists" className="mt-3 flex items-center justify-center gap-2 text-sm font-body text-empire-blue">
              <CheckCircle className="w-4 h-4" />
              You're already subscribed!
            </div>
          )}
          {subStatus === 'error' && (
            <div data-testid="subscribe-error" className="mt-3 flex items-center justify-center gap-2 text-sm font-body text-empire-red">
              <AlertCircle className="w-4 h-4" />
              Something went wrong. Try again.
            </div>
          )}
        </div>
      </div>

      {/* Footer links */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 pb-12">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-empire-blue flex items-center justify-center">
                <Activity className="w-4 h-4 text-white" />
              </div>
              <span className="font-heading font-bold text-base text-empire-dark">
                Empire<span className="text-empire-blue">AI</span>
              </span>
            </div>
            <p className="text-sm font-body text-empire-gray leading-relaxed">
              AI-powered sports officiating for the modern era.
            </p>
            <div className="flex gap-3 mt-4">
              {socialLinks.map((s) => (
                <a
                  key={s.name}
                  href={s.href}
                  data-testid={`footer-social-${s.name.toLowerCase()}`}
                  className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center text-xs font-body font-bold text-empire-gray hover:bg-empire-blue hover:text-white transition-all duration-200"
                >
                  {s.name[0]}
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-body font-bold text-sm text-empire-dark mb-3">{title}</h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm font-body text-empire-gray hover:text-empire-blue transition-colors duration-200"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-gray-200 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs font-body text-empire-gray">
            2025 Empire AI. All rights reserved.
          </p>
          <p className="text-xs font-body text-empire-gray">
            Transforming sports officiating with artificial intelligence.
          </p>
        </div>
      </div>

      {/* Giant text */}
      <div className="overflow-hidden pb-8">
        <p
          data-testid="footer-giant-text"
          className="text-center font-heading font-black text-[12vw] leading-none tracking-tighter text-gray-100 select-none"
        >
          EMPIRE AI
        </p>
      </div>
    </footer>
  );
}
