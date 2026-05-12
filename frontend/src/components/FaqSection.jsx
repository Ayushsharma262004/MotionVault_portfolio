import { useRef, useEffect, useState } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../components/ui/accordion';

const faqs = [
  {
    question: 'How accurate is Empire AI?',
    answer: 'Empire AI achieves 99.7% decision accuracy across all supported sports. Our models are trained on millions of professional match frames and continuously improve through active learning. Each decision includes a confidence score, and the system flags low-confidence calls for human review.',
  },
  {
    question: 'Which sports are currently supported?',
    answer: 'We currently support cricket, football (soccer), and tennis with full AI officiating capabilities. Each sport has dedicated models trained on sport-specific rules and physics. Additional sports including badminton, baseball, and rugby are in active development.',
  },
  {
    question: 'Does Empire AI work offline?',
    answer: 'Yes. Our edge computing architecture processes all data locally at the venue. An internet connection is only needed for cloud backups, software updates, and remote dashboard access. Core officiating functions work entirely offline with zero dependency on cloud servers.',
  },
  {
    question: 'How many cameras are required?',
    answer: 'The minimum setup requires 4 cameras for basic ball tracking. Our recommended configuration uses 8-16 cameras for comprehensive coverage. Professional stadium installations use 32+ cameras for broadcast-quality analysis with full 3D reconstruction.',
  },
  {
    question: 'Can Empire AI work in local turfs and small venues?',
    answer: 'Absolutely. Our Turf Setup package is specifically designed for local venues, practice facilities, and coaching academies. The compact 4-camera system is easy to install and requires minimal infrastructure — just power and a mounting surface.',
  },
  {
    question: 'Is cloud integration included?',
    answer: 'Cloud integration is included in all plans. Match data, replays, and analytics are automatically synced to our secure cloud platform. You can access historical data, generate reports, and manage multiple venues from a single dashboard. Storage limits vary by plan.',
  },
  {
    question: 'What is the installation timeline?',
    answer: 'Turf Setup installations are completed in 1-2 days. Academy packages take 3-5 days. Tournament and Enterprise installations require 1-2 weeks including calibration and testing. Our team handles everything from mounting to final calibration.',
  },
  {
    question: 'How does Empire AI handle edge cases and controversies?',
    answer: 'The system provides confidence scores for every decision. When confidence is below 95%, the decision is flagged for human review with supporting visual evidence. Our interface makes it easy for officials to override AI decisions while maintaining a complete audit trail.',
  },
];

export default function FaqSection() {
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
      id="faq"
      ref={sectionRef}
      data-testid="faq-section"
      className="py-24 md:py-32 lg:py-40 px-6 md:px-12 lg:px-24 bg-white"
    >
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className={`text-center mb-14 transition-all duration-700 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span className="text-xs font-body font-bold uppercase tracking-[0.2em] text-empire-blue">
            // FAQ
          </span>
          <h2
            data-testid="faq-heading"
            className="font-heading font-black text-4xl md:text-5xl lg:text-6xl text-empire-dark leading-tight tracking-tight mt-4"
          >
            Questions?<br />Answered.
          </h2>
        </div>

        {/* Accordion */}
        <div
          className={`transition-all duration-700 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          style={{ transitionDelay: '200ms' }}
        >
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, i) => (
              <AccordionItem
                key={i}
                value={`item-${i}`}
                data-testid={`faq-item-${i}`}
                className="border border-gray-100 rounded-2xl px-6 overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow data-[state=open]:shadow-md data-[state=open]:border-empire-blue/20"
              >
                <AccordionTrigger
                  data-testid={`faq-trigger-${i}`}
                  className="text-left font-heading font-bold text-base md:text-lg text-empire-dark hover:no-underline py-5"
                >
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-sm font-body text-empire-gray leading-relaxed pb-5">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
