# Empire AI - Product Requirements Document

## Original Problem Statement
Build a premium futuristic animated landing page for Empire AI, an AI-powered automated umpiring and referee platform for cricket, football, tennis, and multiple ball-oriented sports.

## User Personas
- **Local Turf Owners**: Need affordable AI umpiring for practice facilities
- **Coaching Academies**: Want player performance analysis and training tools
- **Tournament Organizers**: Need professional-grade automated officiating
- **Stadium Operators**: Enterprise-level multi-camera AI referee systems
- **Sports Broadcasters**: Looking for integrated AI analysis for broadcasts

## Core Requirements (Static)
- Landing page with cinematic, immersive design
- AI sports officiating content across cricket, football, tennis
- Email collection and contact form (MongoDB backend)
- Light-themed glassmorphism design
- GSAP/CSS scroll animations
- Responsive design (mobile + desktop)

## What's Been Implemented (Dec 12, 2025)

### Frontend (React + TailwindCSS + GSAP)
1. **Navbar** - Floating glassmorphism with smooth scroll navigation, mobile hamburger menu, live status dot
2. **Hero Section** - Cinematic headline with rotating text, stats cards, CTAs, background orbs, **mouse-follow spotlight effect**
3. **Sports Showcase** - Tab-based (Cricket/Football/Tennis) with images, AI overlay mockup, feature tags, stats
4. **How It Works** - 5-step animated timeline with IntersectionObserver reveals
5. **Live AI Dashboard** - Bento grid with live ball speed, decision log, heatmap, match stats, camera feeds
6. **Video Storytelling** - Main video thumbnail + 3 sport-specific thumbnails with play buttons, **opens video modal**
7. **Blog Section** - 4 editorial blog cards with category tags, read time, hover effects
8. **Pricing Section** - 3 tier cards (Turf/Academy/Tournament) + Enterprise CTA
9. **FAQ Section** - 8 questions using Shadcn Accordion component
10. **Contact Section** - Form with name/email/phone/sport/message, submits to API
11. **Footer** - Email subscription, link columns, social links, giant "EMPIRE AI" text
12. **Video Modal** - Glassmorphism modal triggered from Watch Demo / play buttons, close via X/Escape/backdrop
13. **Admin Panel** (/admin) - Dashboard with stats, contacts table, subscribers table, search, tabs, refresh
14. **GSAP ScrollTrigger** - Cinematic scroll-triggered animations (headings, stagger grids, parallax orbs, scale reveals)

### Backend (FastAPI + MongoDB)
- POST /api/contact - Save contact form submissions
- GET /api/contacts - Retrieve all contacts
- POST /api/subscribe - Email subscription (duplicate detection)
- GET /api/subscribers - Retrieve all subscribers

### Design System
- Fonts: Outfit (headings) + Manrope (body)
- Colors: White (#FAFAFA), Blue (#3081FF), Green (#22C55E), Red (#FF3B30)
- Glassmorphism surfaces (heavy/light/card variants)
- CSS animations: float, glow-pulse, slide-up
- IntersectionObserver scroll reveals

## Test Results
- Backend: 100%
- Frontend: 100% — all new features verified working

## Prioritized Backlog

### P0 (Critical)
- None remaining

### P1 (Important)
- Integrate actual email service (SendGrid/Resend) for contact notifications
- Replace placeholder videos with real demo content
- Add admin authentication to protect /admin route

### P2 (Nice to Have)
- Delete contacts/subscribers from admin
- Real-time dashboard with WebSocket updates
- Multi-language support
- Dark mode toggle
- SEO optimization (meta tags, structured data)
- Performance optimization (lazy loading images, code splitting)

## Next Tasks
1. Integrate email service for sending actual notification emails
2. Replace placeholder video content with real demos
3. Add admin authentication
4. Add magnetic button hover effects
