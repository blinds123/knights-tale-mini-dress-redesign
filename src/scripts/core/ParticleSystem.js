/**
 * Champagne Gold Particle System
 * Creates magical atmosphere with canvas-based particles
 */

export default class ParticleSystem {
  constructor(canvas, config = {}) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');

    this.config = {
      particleCount: 100,
      colors: ['#C9B580', '#DBC99F', '#EDDCBE'],
      minSize: 1,
      maxSize: 3,
      minSpeed: 0.2,
      maxSpeed: 0.8,
      cursorRepelDist: 120,
      ...config
    };

    this.particles = [];
    this.cursor = { x: -1000, y: -1000 };

    this.resize();
    this.init();
    this.animate();

    // Handle resize
    window.addEventListener('resize', () => this.resize());

    // Track cursor
    document.addEventListener('mousemove', (e) => {
      this.cursor.x = e.clientX;
      this.cursor.y = e.clientY + window.scrollY;
    });
  }

  init() {
    for (let i = 0; i < this.config.particleCount; i++) {
      this.particles.push(this.createParticle());
    }
  }

  createParticle() {
    return {
      x: Math.random() * this.canvas.width,
      y: Math.random() * this.canvas.height,
      size: Math.random() * (this.config.maxSize - this.config.minSize) + this.config.minSize,
      speedX: (Math.random() - 0.5) * this.config.maxSpeed,
      speedY: (Math.random() - 0.5) * this.config.maxSpeed,
      opacity: Math.random() * 0.5 + 0.2,
      color: this.config.colors[Math.floor(Math.random() * this.config.colors.length)],
      pulseSpeed: Math.random() * 0.02 + 0.01,
      pulsePhase: Math.random() * Math.PI * 2
    };
  }

  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  animate() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.particles.forEach(p => {
      // Update position
      p.x += p.speedX;
      p.y += p.speedY;

      // Pulse opacity
      p.pulsePhase += p.pulseSpeed;
      const currentOpacity = p.opacity * (0.5 + Math.sin(p.pulsePhase) * 0.5);

      // Cursor repulsion
      const dx = p.x - this.cursor.x;
      const dy = p.y - this.cursor.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < this.config.cursorRepelDist) {
        const force = (this.config.cursorRepelDist - dist) / this.config.cursorRepelDist;
        p.x += dx * force * 0.1;
        p.y += dy * force * 0.1;
      }

      // Wrap around edges
      if (p.x < 0) p.x = this.canvas.width;
      if (p.x > this.canvas.width) p.x = 0;
      if (p.y < 0) p.y = this.canvas.height;
      if (p.y > this.canvas.height) p.y = 0;

      // Draw particle
      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      this.ctx.fillStyle = p.color;
      this.ctx.globalAlpha = currentOpacity;
      this.ctx.fill();
    });

    this.ctx.globalAlpha = 1;
    requestAnimationFrame(() => this.animate());
  }
}
