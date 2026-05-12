import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function useScrollReveal() {
  useEffect(() => {
    const ctx = gsap.context(() => {

      // ── Section headings: cinematic scale + blur reveal ──
      gsap.utils.toArray('.gsap-heading').forEach((el) => {
        gsap.fromTo(el,
          { y: 80, opacity: 0, scale: 0.92, filter: 'blur(8px)' },
          {
            y: 0, opacity: 1, scale: 1, filter: 'blur(0px)',
            duration: 1.2, ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none none' },
          }
        );
      });

      // ── Stagger grid children ──
      gsap.utils.toArray('.gsap-stagger').forEach((grid) => {
        gsap.fromTo(grid.children,
          { y: 50, opacity: 0, scale: 0.95 },
          {
            y: 0, opacity: 1, scale: 1,
            duration: 0.8, ease: 'power2.out', stagger: 0.12,
            scrollTrigger: { trigger: grid, start: 'top 82%', toggleActions: 'play none none none' },
          }
        );
      });

      // ── Parallax images: slow vertical shift on scroll ──
      gsap.utils.toArray('.gsap-parallax-img').forEach((img) => {
        gsap.fromTo(img,
          { y: -30 },
          {
            y: 30, ease: 'none',
            scrollTrigger: { trigger: img.closest('.parallax-img-wrap') || img, start: 'top bottom', end: 'bottom top', scrub: 1.2 },
          }
        );
      });

      // ── Scale-in reveal ──
      gsap.utils.toArray('.gsap-scale').forEach((el) => {
        gsap.fromTo(el,
          { scale: 0.88, opacity: 0 },
          {
            scale: 1, opacity: 1,
            duration: 1, ease: 'power2.out',
            scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none none' },
          }
        );
      });

      // ── Slide from left ──
      gsap.utils.toArray('.gsap-slide-left').forEach((el) => {
        gsap.fromTo(el,
          { x: -80, opacity: 0 },
          {
            x: 0, opacity: 1,
            duration: 1, ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none none' },
          }
        );
      });

      // ── Slide from right ──
      gsap.utils.toArray('.gsap-slide-right').forEach((el) => {
        gsap.fromTo(el,
          { x: 80, opacity: 0 },
          {
            x: 0, opacity: 1,
            duration: 1, ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none none' },
          }
        );
      });

      // ── Fade-up reveal ──
      gsap.utils.toArray('.gsap-reveal').forEach((el) => {
        gsap.fromTo(el,
          { y: 40, opacity: 0 },
          {
            y: 0, opacity: 1,
            duration: 0.9, ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none none' },
          }
        );
      });

      // ── Floating parallax orbs ──
      gsap.utils.toArray('.gsap-parallax').forEach((el) => {
        gsap.to(el, {
          y: -80, ease: 'none',
          scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: 1.5 },
        });
      });

      // ── Horizontal line draw ──
      gsap.utils.toArray('.gsap-line-draw').forEach((el) => {
        gsap.fromTo(el,
          { scaleX: 0 },
          {
            scaleX: 1, duration: 1.2, ease: 'power2.inOut',
            scrollTrigger: { trigger: el, start: 'top 90%', toggleActions: 'play none none none' },
          }
        );
      });

    }, document.body);

    return () => ctx.revert();
  }, []);
}
