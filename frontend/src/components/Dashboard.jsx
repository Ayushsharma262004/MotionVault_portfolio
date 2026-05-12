import { useRef, useEffect, useState } from 'react';
import { MessageSquare, Mail, Users, Globe, Clock, Database, RefreshCw } from 'lucide-react';
import axios from 'axios';

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export default function Dashboard() {
  const sectionRef = useRef(null);
  const [isInView, setIsInView] = useState(false);
  const [contacts, setContacts] = useState([]);
  const [subscribers, setSubscribers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetched, setFetched] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          if (!fetched) fetchData();
        }
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [fetched]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [cRes, sRes] = await Promise.all([
        axios.get(`${API}/contacts`),
        axios.get(`${API}/subscribers`),
      ]);
      setContacts(cRes.data);
      setSubscribers(sRes.data);
      setFetched(true);
    } catch (err) {
      console.error('Dashboard fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  const uniqueSports = [...new Set(contacts.map(c => c.sport).filter(Boolean))];
  const recentContacts = contacts.slice(-5).reverse();

  return (
    <section
      id="dashboard"
      ref={sectionRef}
      data-testid="dashboard-section"
      className="py-24 md:py-32 lg:py-40 px-6 md:px-12 lg:px-24 bg-white relative overflow-hidden"
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-empire-blue/3 blur-[120px]" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16 gsap-heading">
          <span className="text-xs font-body font-bold uppercase tracking-[0.2em] text-empire-green">
            // Database Overview
          </span>
          <h2
            data-testid="dashboard-heading"
            className="font-heading font-black text-4xl md:text-5xl lg:text-6xl text-empire-dark leading-tight tracking-tight mt-4"
          >
            Platform<br />Analytics.
          </h2>
          <p className="mt-4 text-base md:text-lg font-body text-empire-gray max-w-xl mx-auto leading-relaxed">
            Overview of inquiries, subscriptions, and engagement received through the Empire AI platform.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5 mb-8 gsap-stagger">
          {[
            { icon: MessageSquare, label: 'Contact Inquiries', value: contacts.length, color: '#3081FF' },
            { icon: Mail, label: 'Email Subscribers', value: subscribers.length, color: '#22C55E' },
            { icon: Globe, label: 'Sports Covered', value: uniqueSports.length, color: '#FF3B30' },
            { icon: Users, label: 'Total Leads', value: contacts.length + subscribers.length, color: '#3081FF' },
          ].map((stat, i) => (
            <div
              key={i}
              data-testid={`dashboard-stat-${i}`}
              className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${stat.color}10` }}>
                  <stat.icon className="w-4 h-4" style={{ color: stat.color }} />
                </div>
                {loading && <RefreshCw className="w-3.5 h-3.5 text-gray-300 animate-spin" />}
              </div>
              <div className="font-heading font-bold text-3xl text-empire-dark tracking-tight">{stat.value}</div>
              <p className="text-xs font-body text-empire-gray mt-1">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Data tables */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {/* Recent contacts */}
          <div
            data-testid="dashboard-recent-contacts"
            className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-heading font-bold text-lg text-empire-dark">Recent Inquiries</h3>
              <div className="flex items-center gap-1.5 text-xs font-body text-empire-blue font-semibold">
                <Database className="w-3 h-3" />
                {contacts.length} records
              </div>
            </div>
            {recentContacts.length === 0 ? (
              <div className="text-center py-8">
                <MessageSquare className="w-6 h-6 text-gray-300 mx-auto mb-2" />
                <p className="text-sm font-body text-empire-gray">No inquiries yet</p>
              </div>
            ) : (
              <div className="space-y-3">
                {recentContacts.map((c, i) => (
                  <div key={i} className="flex items-start gap-3 py-2.5 border-b border-gray-50 last:border-0">
                    <div className="w-8 h-8 rounded-lg bg-empire-blue/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs font-body font-bold text-empire-blue">
                        {c.name?.charAt(0)?.toUpperCase() || '?'}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-body font-medium text-empire-dark truncate">{c.name}</span>
                        {c.sport && (
                          <span className="text-[10px] font-body font-semibold bg-empire-green/10 text-empire-green px-2 py-0.5 rounded-full flex-shrink-0">
                            {c.sport}
                          </span>
                        )}
                      </div>
                      <p className="text-xs font-body text-empire-gray truncate mt-0.5">{c.message}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-[10px] font-body text-empire-blue">{c.email}</span>
                        {c.created_at && (
                          <span className="text-[10px] font-body text-empire-gray">
                            {new Date(c.created_at).toLocaleDateString()}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Subscribers */}
          <div
            data-testid="dashboard-subscribers-list"
            className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-heading font-bold text-lg text-empire-dark">Email Subscribers</h3>
              <div className="flex items-center gap-1.5 text-xs font-body text-empire-green font-semibold">
                <Mail className="w-3 h-3" />
                {subscribers.length} subscribed
              </div>
            </div>
            {subscribers.length === 0 ? (
              <div className="text-center py-8">
                <Mail className="w-6 h-6 text-gray-300 mx-auto mb-2" />
                <p className="text-sm font-body text-empire-gray">No subscribers yet</p>
              </div>
            ) : (
              <div className="space-y-2.5">
                {subscribers.slice(-8).reverse().map((s, i) => (
                  <div key={i} className="flex items-center gap-3 py-2 border-b border-gray-50 last:border-0">
                    <div className="w-8 h-8 rounded-lg bg-empire-green/10 flex items-center justify-center flex-shrink-0">
                      <Mail className="w-3.5 h-3.5 text-empire-green" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="text-sm font-body font-medium text-empire-dark truncate block">{s.email}</span>
                    </div>
                    {s.created_at && (
                      <span className="text-[10px] font-body text-empire-gray flex-shrink-0">
                        {new Date(s.created_at).toLocaleDateString()}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Sports breakdown */}
          <div
            data-testid="dashboard-sports-breakdown"
            className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm"
          >
            <h3 className="font-heading font-bold text-lg text-empire-dark mb-4">Interest by Sport</h3>
            {uniqueSports.length === 0 ? (
              <div className="text-center py-8">
                <Globe className="w-6 h-6 text-gray-300 mx-auto mb-2" />
                <p className="text-sm font-body text-empire-gray">No sport data yet</p>
              </div>
            ) : (
              <div className="space-y-3">
                {uniqueSports.map((sport) => {
                  const count = contacts.filter(c => c.sport === sport).length;
                  const pct = Math.round((count / contacts.length) * 100);
                  return (
                    <div key={sport}>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-body font-medium text-empire-dark">{sport}</span>
                        <span className="text-xs font-body text-empire-gray">{count} ({pct}%)</span>
                      </div>
                      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full bg-empire-blue transition-all duration-1000"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Recent activity */}
          <div
            data-testid="dashboard-recent-activity"
            className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm"
          >
            <h3 className="font-heading font-bold text-lg text-empire-dark mb-4">Recent Activity</h3>
            <div className="space-y-3">
              {[...contacts.slice(-3).reverse().map(c => ({
                type: 'contact',
                text: `${c.name} sent an inquiry`,
                detail: c.email,
                time: c.created_at,
              })),
              ...subscribers.slice(-3).reverse().map(s => ({
                type: 'subscribe',
                text: 'New email subscription',
                detail: s.email,
                time: s.created_at,
              }))].sort((a, b) => new Date(b.time) - new Date(a.time)).slice(0, 5).map((item, i) => (
                <div key={i} className="flex items-center gap-3 py-2 border-b border-gray-50 last:border-0">
                  <div className={`w-2 h-2 rounded-full flex-shrink-0 ${item.type === 'contact' ? 'bg-empire-blue' : 'bg-empire-green'}`} />
                  <div className="flex-1 min-w-0">
                    <span className="text-sm font-body text-empire-dark block truncate">{item.text}</span>
                    <span className="text-[10px] font-body text-empire-gray">{item.detail}</span>
                  </div>
                  {item.time && (
                    <span className="text-[10px] font-body text-empire-gray flex-shrink-0 flex items-center gap-1">
                      <Clock className="w-2.5 h-2.5" />
                      {new Date(item.time).toLocaleDateString()}
                    </span>
                  )}
                </div>
              ))}
              {contacts.length === 0 && subscribers.length === 0 && (
                <div className="text-center py-6">
                  <p className="text-sm font-body text-empire-gray">No activity yet</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
