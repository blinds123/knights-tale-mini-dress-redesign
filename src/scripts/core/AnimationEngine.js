/**
 * Core Animation Engine
 * Orchestrates scroll-triggered animations with Intersection Observer
 */

export default class AnimationEngine {
  constructor() {
    this.config = {
      reducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
      threshold: 0.15,
      rootMargin: '50px'
    };

    this.observer = null;
    this.animatedElements = new Set();
  }

  init() {
    // Skip if reduced motion is preferred
    if (this.config.reducedMotion) {
      this.showAllElements();
      return;
    }

    this.setupObserver();
  }

  setupObserver() {
    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !this.animatedElements.has(entry.target)) {
          this.animatedElements.add(entry.target);
          entry.target.classList.add('animate-in');

          // Optional: unobserve after animation
          // this.observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: this.config.threshold,
      rootMargin: this.config.rootMargin
    });
  }

  observeElements() {
    this.init();

    // Observe elements with animation classes
    const animatedElements = document.querySelectorAll('.hero-eyebrow, .hero-title, .hero-subtitle, .price-display, .cta-group, .hero-social-proof');

    animatedElements.forEach(el => {
      this.observer?.observe(el);
    });
  }

  playEntranceSequence() {
    // Trigger entrance animations with staggered delays
    const elements = document.querySelectorAll('.hero-eyebrow, .hero-title, .hero-subtitle, .price-display, .cta-group, .hero-social-proof');

    elements.forEach((el, index) => {
      setTimeout(() => {
        el.classList.add('animate-in');
      }, index * 100);
    });
  }

  showAllElements() {
    // For reduced motion, show all elements immediately
    const animatedElements = document.querySelectorAll('.hero-eyebrow, .hero-title, .hero-subtitle, .price-display, .cta-group, .hero-social-proof');

    animatedElements.forEach(el => {
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    });
  }

  destroy() {
    this.observer?.disconnect();
    this.animatedElements.clear();
  }
}
