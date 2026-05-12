import { useState } from 'react';
import { Send, CheckCircle, AlertCircle } from 'lucide-react';
import axios from 'axios';
const API = `${process.env.REACT_APP_BACKEND_URL}/api`;
const sports = ['Cricket', 'Football', 'Tennis', 'Multiple Sports', 'Other'];

export default function ContactSection() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', sport: '', message: '' });
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setLoading(true); setStatus(null);
    try { await axios.post(`${API}/contact`, form); setStatus('success'); setForm({ name: '', email: '', phone: '', sport: '', message: '' }); }
    catch { setStatus('error'); } finally { setLoading(false); }
  };

  return (
    <section id="contact" data-testid="contact-section" className="py-24 md:py-32 lg:py-40 px-6 md:px-12 lg:px-24 bg-empire-dark relative overflow-hidden">
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full bg-empire-red/4 blur-[150px] gsap-parallax" />
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="section-divider gsap-line-draw origin-left mb-24" />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          <div className="gsap-slide-left">
            <span className="text-xs font-body font-bold uppercase tracking-[0.25em] text-empire-red">// Get In Touch</span>
            <h2 data-testid="contact-heading" className="font-heading font-black text-4xl md:text-5xl lg:text-6xl text-white leading-tight tracking-tight mt-4">
              Let's Build<br />the <span className="text-gradient-red">Future.</span>
            </h2>
            <p className="mt-5 text-base md:text-lg font-body text-white/50 leading-relaxed max-w-md">Whether you're a local turf owner or managing an international stadium, our team is ready to deploy AI-powered officiating.</p>
            <div className="mt-10 space-y-5">
              {[{ l: 'Email', v: 'hello@empireai.sport' }, { l: 'Sales', v: 'sales@empireai.sport' }, { l: 'Support', v: 'support@empireai.sport' }].map((c) => (
                <div key={c.l}><span className="text-xs font-body font-bold uppercase tracking-wider text-white/30">{c.l}</span><p className="text-base font-body font-medium text-white/80 mt-0.5">{c.v}</p></div>
              ))}
            </div>
          </div>
          <div className="gsap-slide-right">
            <form onSubmit={handleSubmit} data-testid="contact-form" className="dark-glass rounded-2xl p-7 space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div><label className="block text-xs font-body font-semibold text-white/70 mb-1.5">Name *</label>
                  <input data-testid="contact-name" type="text" value={form.name} onChange={(e) => setForm({...form, name: e.target.value})}
                    className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/8 text-sm font-body text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-empire-red/30 focus:border-empire-red/40 transition-all" placeholder="Your name" required /></div>
                <div><label className="block text-xs font-body font-semibold text-white/70 mb-1.5">Email *</label>
                  <input data-testid="contact-email" type="email" value={form.email} onChange={(e) => setForm({...form, email: e.target.value})}
                    className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/8 text-sm font-body text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-empire-red/30 focus:border-empire-red/40 transition-all" placeholder="you@email.com" required /></div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div><label className="block text-xs font-body font-semibold text-white/70 mb-1.5">Phone</label>
                  <input data-testid="contact-phone" type="tel" value={form.phone} onChange={(e) => setForm({...form, phone: e.target.value})}
                    className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/8 text-sm font-body text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-empire-red/30 focus:border-empire-red/40 transition-all" placeholder="+1 (555) 000-0000" /></div>
                <div><label className="block text-xs font-body font-semibold text-white/70 mb-1.5">Sport</label>
                  <select data-testid="contact-sport" value={form.sport} onChange={(e) => setForm({...form, sport: e.target.value})}
                    className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/8 text-sm font-body text-white focus:outline-none focus:ring-2 focus:ring-empire-red/30 focus:border-empire-red/40 transition-all">
                    <option value="" className="bg-empire-dark">Select sport</option>
                    {sports.map((s) => (<option key={s} value={s} className="bg-empire-dark">{s}</option>))}
                  </select></div>
              </div>
              <div><label className="block text-xs font-body font-semibold text-white/70 mb-1.5">Message *</label>
                <textarea data-testid="contact-message" value={form.message} onChange={(e) => setForm({...form, message: e.target.value})} rows={4}
                  className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/8 text-sm font-body text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-empire-red/30 focus:border-empire-red/40 transition-all resize-none" placeholder="Tell us about your venue..." required /></div>
              {status === 'success' && <div data-testid="contact-success" className="flex items-center gap-2 text-sm font-body text-green-400 bg-green-500/10 rounded-xl px-4 py-3"><CheckCircle className="w-4 h-4" />Message sent successfully!</div>}
              {status === 'error' && <div data-testid="contact-error" className="flex items-center gap-2 text-sm font-body text-empire-red bg-empire-red/10 rounded-xl px-4 py-3"><AlertCircle className="w-4 h-4" />Something went wrong. Try again.</div>}
              <button type="submit" data-testid="contact-submit" disabled={loading}
                className="w-full py-3 rounded-xl bg-empire-red text-white text-sm font-body font-semibold hover:bg-empire-red-light hover:shadow-lg shadow-empire-red/20 transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-60">
                {loading ? 'Sending...' : 'Send Message'}<Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
