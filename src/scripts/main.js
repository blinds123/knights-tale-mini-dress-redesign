/**
 * Main Entry Point
 * Knights Tale Mini Dress - Custom Landing Page
 */

import CursorController from './core/CursorController.js';
import ParticleSystem from './core/ParticleSystem.js';
import AnimationEngine from './core/AnimationEngine.js';

class App {
  constructor() {
    this.cursor = null;
    this.particles = null;
    this.animations = null;
  }

  async init() {
    // Wait for DOM
    if (document.readyState === 'loading') {
      await new Promise(resolve => document.addEventListener('DOMContentLoaded', resolve));
    }

    // Initialize systems
    this.initCursor();
    this.initParticles();
    this.initAnimations();
    this.initLoadingScreen();
  }

  initCursor() {
    this.cursor = new CursorController();
  }

  initParticles() {
    const canvas = document.getElementById('particlesCanvas');
    if (canvas) {
      this.particles = new ParticleSystem(canvas, {
        colors: ['#C9B580', '#DBC99F', '#EDDCBE'],
        particleCount: 100
      });
    }
  }

  initAnimations() {
    this.animations = new AnimationEngine();
    this.animations.observeElements();
  }

  initLoadingScreen() {
    const loadingScreen = document.getElementById('loadingScreen');

    // Hide loading screen when page is ready
    window.addEventListener('load', () => {
      setTimeout(() => {
        loadingScreen?.classList.add('loaded');

        // Trigger entrance animations
        this.animations?.playEntranceSequence();
      }, 500);
    });
  }
}

// Initialize app
const app = new App();
app.init();

export default app;
