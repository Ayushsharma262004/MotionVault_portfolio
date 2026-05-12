import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../components/ui/accordion';

const faqs = [
  { q: 'How accurate is Empire AI?', a: 'Empire AI achieves 99.7% decision accuracy across all supported sports. Each decision includes a confidence score, and low-confidence calls are flagged for human review.' },
  { q: 'Which sports are supported?', a: 'We support cricket, football (soccer), and tennis with full AI officiating. Additional sports including badminton, baseball, and rugby are in development.' },
  { q: 'Does it work offline?', a: 'Yes. Edge computing processes all data locally. Internet is only needed for cloud backups and remote dashboard access.' },
  { q: 'How many cameras are required?', a: 'Minimum 4 cameras for basic tracking. Recommended 8-16 for full coverage. Professional stadiums use 32+ cameras.' },
  { q: 'Can it work in local turfs?', a: 'Absolutely. Our Turf Setup package is designed for local venues with a compact 4-camera system.' },
  { q: 'Is cloud integration included?', a: 'Cloud integration is included in all plans. Match data and analytics sync automatically to our secure platform.' },
  { q: 'What is the installation timeline?', a: 'Turf: 1-2 days. Academy: 3-5 days. Tournament/Enterprise: 1-2 weeks including calibration.' },
  { q: 'How are edge cases handled?', a: 'When confidence is below 95%, decisions are flagged for human review with supporting visual evidence.' },
];

export default function FaqSection() {
  return (
    <section id="faq" data-testid="faq-section" className="py-24 md:py-32 lg:py-40 px-6 md:px-12 lg:px-24 bg-empire-black">
      <div className="max-w-3xl mx-auto">
        <div className="section-divider gsap-line-draw origin-left mb-24" />
        <div className="text-center mb-14 gsap-heading">
          <span className="text-xs font-body font-bold uppercase tracking-[0.25em] text-empire-red">// FAQ</span>
          <h2 data-testid="faq-heading" className="font-heading font-black text-4xl md:text-5xl lg:text-6xl text-white leading-tight tracking-tight mt-4">
            Questions?<br /><span className="text-gradient-red">Answered.</span>
          </h2>
        </div>
        <div className="gsap-reveal">
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, i) => (
              <AccordionItem key={i} value={`item-${i}`} data-testid={`faq-item-${i}`}
                className="border border-white/6 rounded-2xl px-6 overflow-hidden bg-empire-surface shadow-sm hover:border-empire-red/15 transition-colors data-[state=open]:border-empire-red/20 data-[state=open]:bg-empire-surface-light">
                <AccordionTrigger data-testid={`faq-trigger-${i}`} className="text-left font-heading font-bold text-base md:text-lg text-white hover:no-underline py-5">{faq.q}</AccordionTrigger>
                <AccordionContent className="text-sm font-body text-white/50 leading-relaxed pb-5">{faq.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
