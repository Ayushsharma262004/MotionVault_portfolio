import { useState, useEffect } from 'react';
import { Menu, X, Activity } from 'lucide-react';

const navLinks = [
  { label: 'Home', href: '#hero' },
  { label: 'Features', href: '#sports' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Dashboard', href: '#dashboard' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Blog', href: '#blog' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNav = (href) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav
      data-testid="navbar"
      className={`fixed top-4 left-1/2 -translate-x-1/2 w-[92%] max-w-5xl z-50 rounded-full py-2.5 px-5 transition-all duration-500 ${
        scrolled
          ? 'glass-heavy shadow-lg'
          : 'bg-white/30 backdrop-blur-md border border-white/20'
      }`}
    >
      <div className="flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2.5" data-testid="navbar-logo">
          <div className="w-9 h-9 rounded-xl bg-empire-blue flex items-center justify-center">
            <Activity className="w-5 h-5 text-white" />
          </div>
          <span className="font-heading font-bold text-lg text-empire-dark tracking-tight">
            Empire<span className="text-empire-blue">AI</span>
          </span>
        </div>

        {/* Desktop nav */}
        <div className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => handleNav(link.href)}
              data-testid={`nav-link-${link.label.toLowerCase().replace(/\s/g, '-')}`}
              className="px-3 py-1.5 text-sm font-body font-medium text-empire-dark/70 hover:text-empire-dark rounded-full hover:bg-black/5 transition-all duration-200"
            >
              {link.label}
            </button>
          ))}
        </div>

        {/* CTA + Mobile toggle */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-1.5 text-xs font-body text-empire-green font-medium">
            <span className="w-2 h-2 rounded-full bg-empire-green animate-pulse" />
            Live
          </div>
          <button
            data-testid="navbar-book-demo"
            onClick={() => handleNav('#contact')}
            className="hidden sm:block px-4 py-2 text-sm font-body font-semibold text-white bg-empire-blue rounded-full hover:scale-[1.02] active:scale-95 transition-transform duration-200 shadow-md"
          >
            Book Demo
          </button>
          <button
            data-testid="navbar-mobile-toggle"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden w-9 h-9 flex items-center justify-center rounded-full hover:bg-black/5 transition-colors"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div
          data-testid="mobile-menu"
          className="lg:hidden mt-3 pb-3 border-t border-gray-200/50 pt-3 flex flex-col gap-1"
        >
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => handleNav(link.href)}
              className="px-4 py-2.5 text-sm font-body font-medium text-empire-dark/80 hover:bg-black/5 rounded-xl text-left transition-colors"
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={() => handleNav('#contact')}
            className="mt-2 mx-4 px-4 py-2.5 text-sm font-body font-semibold text-white bg-empire-blue rounded-full text-center"
          >
            Book Demo
          </button>
        </div>
      )}
    </nav>
  );
}
