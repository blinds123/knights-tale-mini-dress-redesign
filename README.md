# Knights Tale Mini Dress - Custom Landing Page Redesign

A highly-customized, conversion-optimized landing page featuring custom animations, micro-interactions, and a premium user experience.

## Features

- **Custom Cursor System** - Magnetic cursor effects that respond to interactive elements
- **Canvas Particle System** - Champagne gold particles that react to cursor movement
- **Scroll-Triggered Animations** - Intersection Observer-based reveals with premium easing
- **Performance Optimized** - Sub-2s load time, 60fps animations
- **Mobile Responsive** - Fully responsive design with touch-optimized interactions

## Tech Stack

- Vite 6 - Fast build tool
- Vanilla JavaScript - No framework dependencies
- Canvas API - Particle effects
- Intersection Observer - Scroll animations
- CSS Custom Properties - Theme system

## Getting Started

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build
```

## Project Structure

```
src/
├── styles/           # CSS files
├── scripts/
│   ├── core/        # Core animation systems
│   │   ├── AnimationEngine.js
│   │   ├── CursorController.js
│   │   └── ParticleSystem.js
│   └── main.js      # Entry point
└── assets/
    └── images/      # Product and testimonial images
```

## Performance Targets

- First Contentful Paint: <1.2s
- Largest Contentful Paint: <2.0s
- Time to Interactive: <2.5s
- Animation FPS: 60

## License

MIT
