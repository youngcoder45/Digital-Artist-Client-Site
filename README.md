# Siddharth Shibu — Digital Artist & Logo Designer Portfolio

A premium, award-worthy portfolio website for a professional digital artist and logo designer. Built with vanilla HTML5, CSS3, and JavaScript (ES6+).

## ✨ Features

- **Immersive Hero Section** — Animated gradient orbs, floating geometric shapes, particle network, and mouse parallax effects
- **About Section** — Animated stat counters with IntersectionObserver
- **Skills Grid** — Stagger-animated skill cards with hover effects
- **Portfolio Gallery** — Filterable grid with category tabs and a full-screen lightbox modal with navigation
- **Creative Process** — Animated timeline showing the 6-step workflow
- **Service Cards** — Hover-animated cards with gradient accents
- **Testimonial Slider** — Auto-playing, glassmorphism slider with touch support and manual controls
- **Client Marquee** — Infinite scrolling client logo bar (pauses on hover)
- **Pricing Cards** — Three-tier pricing with a highlighted "Professional" plan
- **FAQ Accordion** — Animated accordion with smooth transitions
- **Contact Form** — Animated form with real-time validation
- **Premium Footer** — Multi-column footer with navigation and social links

## 🎨 Design Highlights

- **Dark theme** with neon purple/cyan/orange accents
- **Scroll-triggered reveal animations** (fade, slide, scale, stagger)
- **Smooth scroll** navigation with active link highlighting
- **Loading screen** with animated progress bar
- **Scroll progress indicator** at the top of the page
- **Back-to-top button** with smooth scroll
- **Ripple effect** on buttons
- **Responsive** across all device sizes
- **Accessible** — semantic HTML, ARIA labels, keyboard navigation, screen reader friendly
- **SEO optimized** — meta tags, Open Graph, Twitter Cards, JSON-LD structured data, robots.txt, sitemap.xml

## 🛠 Tech Stack

- HTML5 (semantic)
- CSS3 (custom properties, flexbox, grid, animations)
- Vanilla JavaScript (ES6+)
- No frameworks, libraries, or build tools

## 📁 File Structure

```
/
├── index.html              # Main HTML with all sections
├── css/
│   ├── style.css           # Base styles, variables, components
│   ├── animations.css      # Keyframes, scroll reveal, hover effects
│   └── responsive.css      # All responsive breakpoints
├── js/
│   ├── main.js             # App init, navbar, testimonials, FAQ, form
│   ├── portfolio.js        # Gallery data, filtering, lightbox modal
│   ├── animations.js       # Scroll reveal, counters, cursor, parallax
│   └── utils.js            # DOM helpers, throttle, debounce, lazy load
├── assets/
│   ├── images/             # Image assets (placeholder)
│   ├── icons/              # SVG favicon
│   ├── logos/              # Logo assets (placeholder)
│   └── fonts/              # Custom fonts (placeholder)
├── robots.txt              # SEO - search engine instructions
├── sitemap.xml             # SEO - sitemap for crawlers
└── README.md               # This file
```

## 🚀 Getting Started

Since there are no build tools or dependencies, you can run the site in two ways:

### 1. Directly open the file
Open `index.html` in any modern browser.

### 2. Using a static server (recommended for best performance)
```bash
# Python 3
python -m http.server 8000

# Node.js (requires npx)
npx serve .

# VS Code Live Server extension
# Right-click index.html → Open with Live Server
```

Then open `http://localhost:8000` in your browser.

## 📱 Browser Support

- Chrome (latest 2 years)
- Firefox (latest 2 years)
- Safari (latest 2 years)
- Edge (latest 2 years)

## 🎯 Performance Targets

- Lighthouse Performance: 95+
- First Contentful Paint: < 1.5s
- No render-blocking resources beyond initial CSS/JS
- Minimal JavaScript footprint (~30KB total)

## ♿ Accessibility

- Semantic HTML5 elements (`<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`)
- ARIA labels and roles throughout
- Proper heading hierarchy (h1 → h2 → h3)
- Keyboard navigable (Tab, Enter, Escape)
- Focus management (visible focus states)
- Screen reader friendly (alt text, aria-label)
- `prefers-reduced-motion` support

## 🔧 Customization

### Changing Colors
Edit CSS custom properties in `:root` block of `css/style.css`:
```css
--color-accent-purple: #8B5CF6;  /* Change to your brand color */
--color-accent-cyan: #06B6D4;
```

### Adding Portfolio Items
Edit the `portfolioData` array in `js/portfolio.js`.

### SEO / Meta
Update meta tags in the `<head>` of `index.html`.

## 📄 License

© 2026 Siddharth Shibu Studio. All rights reserved.
