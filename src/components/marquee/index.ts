import { html, LitElement } from "lit";
import { property } from "lit/decorators.js";

interface TextItem {
  title: string;
}

export default class Marquee extends LitElement {
  @property({ type: Object })
  config?: {
    bg_color: string;
    text_color: string;
    texts: TextItem[];
  };

  private styleElement: HTMLStyleElement | null = null;

  // Render in light DOM so Salla styles work correctly
  createRenderRoot() {
    return this;
  }

  connectedCallback() {
    super.connectedCallback();
    this.injectStyles();
    // Apply overflow hidden to the host element
    this.style.display = 'block';
    this.style.overflow = 'hidden';
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.styleElement?.remove();
  }

  injectStyles() {
    if (this.styleElement) return;

    this.styleElement = document.createElement('style');
    this.styleElement.textContent = `
      .st-marquee {
        display: block;
        width: 100%;
        padding: 0.75rem 0;
        overflow: hidden;
      }

      .st-marquee__wrapper {
        display: flex;
        overflow: hidden;
        gap: 2.5rem;
        white-space: nowrap;
      }

      .st-marquee__content {
        display: flex;
        flex-shrink: 0;
        gap: 2.5rem;
        min-width: 100%;
        animation: st-marquee-slide 20s linear infinite;
      }

      .st-marquee:hover .st-marquee__content {
        animation-play-state: paused;
      }

      @keyframes st-marquee-slide {
        0% {
          transform: translateX(0);
        }
        100% {
          transform: translateX(-100%);
        }
      }

      [dir="rtl"] .st-marquee__content {
        animation-name: st-marquee-slide-rtl;
      }

      @keyframes st-marquee-slide-rtl {
        0% {
          transform: translateX(0);
        }
        100% {
          transform: translateX(100%);
        }
      }

      .st-marquee__text {
        font-size: 0.875rem;
        font-weight: 700;
        margin: 0;
      }
    `;
    document.head.appendChild(this.styleElement);
  }

  render() {
    if (!this.config) {
      return html`<div>Configuration is required</div>`;
    }

    const bgColor = this.config.bg_color || '#000000';
    const textColor = this.config.text_color || '#ffffff';
    const texts = this.config.texts || [];

    return html`
      <div
        class="st-marquee"
        style="background-color: ${bgColor}; color: ${textColor};"
      >
        <div class="st-marquee__wrapper">
          <div class="st-marquee__content">
            ${texts.map((text) => html`
              <h3 class="st-marquee__text">${text.title}</h3>
            `)}
          </div>
          <div class="st-marquee__content" aria-hidden="true">
            ${texts.map((text) => html`
              <h3 class="st-marquee__text">${text.title}</h3>
            `)}
          </div>
        </div>
      </div>
    `;
  }
}
