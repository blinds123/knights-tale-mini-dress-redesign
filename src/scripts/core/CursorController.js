/**
 * Custom Cursor Controller
 * Magnetic cursor effects with smooth following
 */

export default class CursorController {
  constructor() {
    // Check for touch device
    this.isTouch = 'ontouchstart' in window;

    if (this.isTouch || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return; // Skip custom cursor on touch devices
    }

    this.cursor = document.getElementById('cursor');
    this.follower = document.getElementById('cursorFollower');

    if (!this.cursor || !this.follower) return;

    this.mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    this.pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    this.magneticElement = null;

    this.init();
  }

  init() {
    // Track mouse movement
    document.addEventListener('mousemove', (e) => {
      this.mouse.x = e.clientX;
      this.mouse.y = e.clientY;
    });

    // Add magnetic behavior to CTAs
    this.addMagneticBehavior();

    // Start animation loop
    this.animate();
  }

  addMagneticBehavior() {
    const magneticElements = document.querySelectorAll('[data-magnetic]');

    magneticElements.forEach(el => {
      el.addEventListener('mouseenter', (e) => {
        const rect = el.getBoundingClientRect();
        this.magneticElement = {
          element: el,
          centerX: rect.left + rect.width / 2,
          centerY: rect.top + rect.height / 2,
          strength: 0.15
        };

        this.follower.style.width = '60px';
        this.follower.style.height = '60px';
      });

      el.addEventListener('mouseleave', () => {
        this.magneticElement = null;
        this.follower.style.width = '40px';
        this.follower.style.height = '40px';
        el.style.transform = '';
      });
    });
  }

  animate() {
    // Smooth lerp for follower
    this.pos.x += (this.mouse.x - this.pos.x) * 0.15;
    this.pos.y += (this.mouse.y - this.pos.y) * 0.15;

    // Update cursor positions
    this.cursor.style.transform = `translate(${this.mouse.x - 4}px, ${this.mouse.y - 4}px)`;
    this.follower.style.transform = `translate(${this.pos.x - 20}px, ${this.pos.y - 20}px)`;

    // Apply magnetic effect
    if (this.magneticElement) {
      const { element, centerX, centerY, strength } = this.magneticElement;
      const deltaX = (this.mouse.x - centerX) * strength;
      const deltaY = (this.mouse.y - centerY) * strength;

      // Limit movement to 8px
      const clampedX = Math.max(-8, Math.min(8, deltaX));
      const clampedY = Math.max(-8, Math.min(8, deltaY));

      element.style.transform = `translate(${clampedX}px, ${clampedY}px)`;
    }

    requestAnimationFrame(() => this.animate());
  }
}
