import { html, LitElement } from "lit";
import { property } from "lit/decorators.js";
import AOS from "../../utils/animate-on-scroll";

export default class StHeroAreaOne extends LitElement {
  @property({ type: Object })
  config?: {
    main_title: string;
    description: string;
    bgk_color: string;
    text_color: string;
    image: string;
    image1: string;
    image2: string;
    image3: string;
  };

  // Render in light DOM so Salla styles work correctly
  createRenderRoot() {
    return this;
  }

  private mouseX = 0;
  private mouseY = 0;
  private styleElement: HTMLStyleElement | null = null;

  connectedCallback() {
    super.connectedCallback();
    this.handleMouseMove = this.handleMouseMove.bind(this);
    window.addEventListener('mousemove', this.handleMouseMove);
    this.injectStyles();
    AOS.init();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener('mousemove', this.handleMouseMove);
    this.styleElement?.remove();
  }

  updated(changedProperties: any) {
    super.updated(changedProperties);
    AOS.refresh();
  }

  injectStyles() {
    if (this.styleElement) return;

    this.styleElement = document.createElement('style');
    this.styleElement.textContent = `
      .st-hero-area-one {
        display: block;
        width: 100%;
        position: relative;
        overflow: visible;
        padding: 4rem 1.5rem;
      }

      .st-hero-area-one__container {
        max-width: 1200px;
        margin: 0 auto;
        display: flex;
        flex-direction: column-reverse;
        align-items: center;
        gap: 2rem;
        padding: 0 1.5rem;
      }

      @media (min-width: 1024px) {
        .st-hero-area-one__container {
          flex-direction: row;
          gap: 2.5rem;
          padding: 0 2rem;
        }
      }

      .st-hero-area-one__content {
        max-width: 42rem;
        margin: 0 auto;
      }

      @media (min-width: 1024px) {
        .st-hero-area-one__content {
          margin: 0;
          flex: 1;
        }
      }

      .st-hero-area-one__title {
        font-size: 1.5rem;
        font-weight: 700;
        margin-bottom: 1rem;
        line-height: 1.3;
      }

      @media (min-width: 640px) {
        .st-hero-area-one__title {
          font-size: 1.875rem;
        }
      }

      @media (min-width: 768px) {
        .st-hero-area-one__title {
          font-size: 3rem;
        }
      }

      .st-hero-area-one__description {
        margin-top: 0.5rem;
        font-size: 1rem;
        opacity: 0.6;
        line-height: 2;
        max-width: 36rem;
      }

      .st-hero-area-one__button-wrap {
        margin-top: 1rem;
        display: flex;
        align-items: center;
        gap: 1.5rem;
      }

      .st-hero-area-one__image-section {
        position: relative;
        display: flex;
        justify-content: center;
        margin-bottom: 2rem;
        flex-shrink: 0;
      }

      @media (min-width: 1024px) {
        .st-hero-area-one__image-section {
          margin-bottom: 0;
        }
      }

      .st-hero-area-one__image-wrapper {
        position: relative;
      }

      .st-hero-area-one__main-image {
        max-width: 11rem;
        position: relative;
        z-index: 1;
      }

      @media (min-width: 768px) {
        .st-hero-area-one__main-image {
          max-width: 580px;
        }
      }

      .st-hero-area-one__parallax-image {
        position: absolute;
        z-index: 0;
        transition: transform 0.1s ease-out;
      }

      .st-hero-area-one__parallax-image--1 {
        bottom: 260px;
        right: -110px;
      }

      @media (min-width: 768px) {
        .st-hero-area-one__parallax-image--1 {
          bottom: 330px;
          right: -140px;
        }
      }

      .st-hero-area-one__parallax-image--2 {
        bottom: 4rem;
        right: 60%;
      }

      .st-hero-area-one__parallax-image--3 {
        bottom: -4rem;
        left: -100%;
      }

      @media (min-width: 768px) {
        .st-hero-area-one__parallax-image--3 {
          left: -120%;
        }
      }
    `;
    document.head.appendChild(this.styleElement);
  }

  handleMouseMove(e: MouseEvent) {
    const rect = this.getBoundingClientRect();
    this.mouseX = (e.clientX - rect.left - rect.width / 2) * 0.1;
    this.mouseY = (e.clientY - rect.top - rect.height / 2) * 0.1;
    this.updateParallax();
  }

  updateParallax() {
    const parallaxImages = this.querySelectorAll('.st-hero-area-one__parallax-image');
    if (parallaxImages) {
      parallaxImages.forEach((img, index) => {
        const factors = [
          { x: 0.7, y: 0.8 },
          { x: 0.8, y: 0.9 },
          { x: 0.5, y: 1.2 }
        ];
        const factor = factors[index] || { x: 0.5, y: 0.5 };
        (img as HTMLElement).style.transform = `translate(${this.mouseX * factor.x}px, ${this.mouseY * factor.y}px)`;
      });
    }
  }

  render() {
    if (!this.config) {
      return html`<div>Configuration is required</div>`;
    }

    const bgColor = this.config.bgk_color || '#F2F2F4';
    const textColor = this.config.text_color || '#121212';

    return html`
      <div
        class="st-hero-area-one"
        style="background-color: ${bgColor}; color: ${textColor};"
      >
        <div class="st-hero-area-one__container">
          <div class="st-hero-area-one__content">
            <h2 
              class="st-hero-area-one__title" 
              data-animate="fade-up"
              data-delay="0"
            >
              ${this.config.main_title}
              
            </h2>
            <p 
              class="st-hero-area-one__description" 
              data-animate="fade-up"
              data-delay="150"
            >
              ${this.config.description}
            </p>
            <div 
              class="st-hero-area-one__button-wrap"
              data-animate="fade-up"
              data-delay="300"
            >
              <salla-add-product-button width="wide"></salla-add-product-button>
            </div>
          </div>

          <div class="st-hero-area-one__image-section">
            <div class="st-hero-area-one__image-wrapper">
              ${this.config.image ? html`
                <img
                  src="${this.config.image}"
                  alt=""
                  class="st-hero-area-one__main-image"
                  data-animate="scale-in"
                  data-delay="100"
                />
              ` : ''}

              ${this.config.image1 ? html`
                <img
                  src="${this.config.image1}"
                  alt=""
                  class="st-hero-area-one__parallax-image st-hero-area-one__parallax-image--1"
                  data-animate="zoom-in"
                  data-delay="200"
                />
              ` : ''}

              ${this.config.image2 ? html`
                <img
                  src="${this.config.image2}"
                  alt=""
                  class="st-hero-area-one__parallax-image st-hero-area-one__parallax-image--2"
                  data-animate="zoom-in"
                  data-delay="300"
                />
              ` : ''}

              ${this.config.image3 ? html`
                <img
                  src="${this.config.image3}"
                  alt=""
                  class="st-hero-area-one__parallax-image st-hero-area-one__parallax-image--3"
                  data-animate="zoom-in"
                  data-delay="400"
                />
              ` : ''}
            </div>
          </div>
        </div>
      </div>
    `;
  }
}