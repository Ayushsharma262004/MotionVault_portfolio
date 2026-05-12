import { useRef, useState, useEffect } from 'react';
import { Send, CheckCircle, AlertCircle } from 'lucide-react';
import axios from 'axios';

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const sports = ['Cricket', 'Football', 'Tennis', 'Multiple Sports', 'Other'];

export default function ContactSection() {
  const sectionRef = useRef(null);
  const [isInView, setIsInView] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', phone: '', sport: '', message: '' });
  const [status, setStatus] = useState(null); // 'success' | 'error' | null
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsInView(true); },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setLoading(true);
    setStatus(null);
    try {
      await axios.post(`${API}/contact`, form);
      setStatus('success');
      setForm({ name: '', email: '', phone: '', sport: '', message: '' });
    } catch {
      setStatus('error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      data-testid="contact-section"
      className="py-24 md:py-32 lg:py-40 px-6 md:px-12 lg:px-24 bg-empire-bg"
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Left info */}
          <div className={`transition-all duration-700 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <span className="text-xs font-body font-bold uppercase tracking-[0.2em] text-empire-blue">
              // Get In Touch
            </span>
            <h2
              data-testid="contact-heading"
              className="font-heading font-black text-4xl md:text-5xl lg:text-6xl text-empire-dark leading-tight tracking-tight mt-4"
            >
              Let's Build<br />the Future.
            </h2>
            <p className="mt-5 text-base md:text-lg font-body text-empire-gray leading-relaxed max-w-md">
              Whether you're a local turf owner or managing an international stadium, our team is ready to help you deploy AI-powered officiating.
            </p>

            <div className="mt-10 space-y-5">
              {[
                { label: 'Email', value: 'hello@empireai.sport' },
                { label: 'Sales', value: 'sales@empireai.sport' },
                { label: 'Support', value: 'support@empireai.sport' },
              ].map((c) => (
                <div key={c.label}>
                  <span className="text-xs font-body font-bold uppercase tracking-wider text-empire-gray/60">{c.label}</span>
                  <p className="text-base font-body font-medium text-empire-dark mt-0.5">{c.value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Contact form */}
          <div
            className={`transition-all duration-700 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
            style={{ transitionDelay: '200ms' }}
          >
            <form
              onSubmit={handleSubmit}
              data-testid="contact-form"
              className="bg-white rounded-2xl border border-gray-100 shadow-sm p-7 space-y-5"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-body font-semibold text-empire-dark mb-1.5">Name *</label>
                  <input
                    data-testid="contact-name"
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
                    data-testid="contact-email"
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-body text-empire-dark placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-empire-blue/30 focus:border-empire-blue/50 transition-all"
                    placeholder="you@email.com"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-body font-semibold text-empire-dark mb-1.5">Phone</label>
                  <input
                    data-testid="contact-phone"
                    type="tel"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-body text-empire-dark placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-empire-blue/30 focus:border-empire-blue/50 transition-all"
                    placeholder="+1 (555) 000-0000"
                  />
                </div>
                <div>
                  <label className="block text-xs font-body font-semibold text-empire-dark mb-1.5">Sport</label>
                  <select
                    data-testid="contact-sport"
                    value={form.sport}
                    onChange={(e) => setForm({ ...form, sport: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-body text-empire-dark focus:outline-none focus:ring-2 focus:ring-empire-blue/30 focus:border-empire-blue/50 transition-all bg-white"
                  >
                    <option value="">Select sport</option>
                    {sports.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-body font-semibold text-empire-dark mb-1.5">Message *</label>
                <textarea
                  data-testid="contact-message"
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-body text-empire-dark placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-empire-blue/30 focus:border-empire-blue/50 transition-all resize-none"
                  placeholder="Tell us about your venue and requirements..."
                  required
                />
              </div>

              {status === 'success' && (
                <div data-testid="contact-success" className="flex items-center gap-2 text-sm font-body text-empire-green bg-empire-green/5 rounded-xl px-4 py-3">
                  <CheckCircle className="w-4 h-4" />
                  Message sent successfully! We'll be in touch soon.
                </div>
              )}

              {status === 'error' && (
                <div data-testid="contact-error" className="flex items-center gap-2 text-sm font-body text-empire-red bg-empire-red/5 rounded-xl px-4 py-3">
                  <AlertCircle className="w-4 h-4" />
                  Something went wrong. Please try again.
                </div>
              )}

              <button
                type="submit"
                data-testid="contact-submit"
                disabled={loading}
                className="w-full py-3 rounded-xl bg-empire-blue text-white text-sm font-body font-semibold hover:shadow-lg shadow-md transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-60"
              >
                {loading ? 'Sending...' : 'Send Message'}
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
