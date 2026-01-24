import { html, LitElement } from "lit";
import { property, state } from "lit/decorators.js";

interface ImageItem {
  image: string;
}

export default class ImagesGallery extends LitElement {
  @property({ type: Object })
  config?: {
    title: string;
    subtitle: string;
    subtitle_color: string;
    images: ImageItem[];
  };

  @state()
  private lightboxOpen = false;

  @state()
  private currentSlide = 0;

  private styleElement: HTMLStyleElement | null = null;

  // Render in light DOM so Salla styles work correctly
  createRenderRoot() {
    return this;
  }

  connectedCallback() {
    super.connectedCallback();
    this.injectStyles();
    window.addEventListener('keydown', this.handleKeydown);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.styleElement?.remove();
    window.removeEventListener('keydown', this.handleKeydown);
  }

  injectStyles() {
    if (this.styleElement) return;

    this.styleElement = document.createElement('style');
    this.styleElement.textContent = `
      .images-gallery {
        padding: 3rem 0;
      }

      .images-gallery__container {
        max-width: 1200px;
        margin: 0 auto;
        padding: 0 1rem;
      }

      .images-gallery__header {
        text-align: center;
        margin-bottom: 2rem;
      }

      .images-gallery__subtitle {
        font-size: 0.875rem;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.05em;
        margin-bottom: 0.5rem;
      }

      .images-gallery__title {
        font-size: 1.5rem;
        font-weight: 700;
        color: #1f2937;
      }

      @media (min-width: 768px) {
        .images-gallery__title {
          font-size: 2rem;
        }
      }

      .images-gallery__grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 1rem;
        list-style: none;
        padding: 0;
        margin: 0;
      }

      @media (min-width: 640px) {
        .images-gallery__grid {
          grid-template-columns: repeat(3, 1fr);
        }
      }

      @media (min-width: 768px) {
        .images-gallery__grid {
          padding: 0 3.5rem;
        }
      }

      @media (min-width: 1024px) {
        .images-gallery__grid {
          grid-template-columns: repeat(4, 1fr);
        }
      }

      .images-gallery__item {
        position: relative;
        cursor: pointer;
      }

      .images-gallery__item-wrapper {
        position: relative;
        display: block;
        width: 100%;
        overflow: hidden;
        background-color: #f3f4f6;
        aspect-ratio: 10 / 7;
      }

      .images-gallery__item-image {
        width: 100%;
        height: 100%;
        object-fit: cover;
        pointer-events: none;
      }

      .images-gallery__item-overlay {
        position: absolute;
        inset: 0;
        background-color: rgba(0, 0, 0, 0.5);
        color: #fff;
        pointer-events: none;
        display: flex;
        justify-content: center;
        align-items: center;
        transition: opacity 0.3s;
        opacity: 0;
      }

      .images-gallery__item:hover .images-gallery__item-overlay {
        opacity: 1;
      }

      .images-gallery__item-overlay i {
        font-size: 1.25rem;
        transition: transform 0.5s;
        transform: scale(0);
      }

      .images-gallery__item:hover .images-gallery__item-overlay i {
        transform: scale(1);
      }

      /* Lightbox Styles */
      .images-gallery__lightbox {
        position: fixed;
        inset: 0;
        background-color: rgba(0, 0, 0, 0.9);
        z-index: 9999;
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 0;
        visibility: hidden;
        transition: opacity 0.3s, visibility 0.3s;
      }

      .images-gallery__lightbox--open {
        opacity: 1;
        visibility: visible;
      }

      .images-gallery__lightbox-close {
        position: absolute;
        top: 1rem;
        right: 1rem;
        width: 40px;
        height: 40px;
        background: rgba(255, 255, 255, 0.1);
        border: none;
        border-radius: 50%;
        color: #fff;
        font-size: 1.5rem;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: background 0.3s;
      }

      .images-gallery__lightbox-close:hover {
        background: rgba(255, 255, 255, 0.2);
      }

      .images-gallery__lightbox-image {
        max-width: 90%;
        max-height: 90%;
        object-fit: contain;
      }

      .images-gallery__lightbox-nav {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        width: 48px;
        height: 48px;
        background: rgba(255, 255, 255, 0.1);
        border: none;
        border-radius: 50%;
        color: #fff;
        font-size: 1.5rem;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: background 0.3s;
      }

      .images-gallery__lightbox-nav:hover {
        background: rgba(255, 255, 255, 0.2);
      }

      .images-gallery__lightbox-nav--prev {
        left: 1rem;
      }

      .images-gallery__lightbox-nav--next {
        right: 1rem;
      }

      .images-gallery__lightbox-counter {
        position: absolute;
        bottom: 1rem;
        left: 50%;
        transform: translateX(-50%);
        color: #fff;
        font-size: 0.875rem;
      }
    `;
    document.head.appendChild(this.styleElement);
  }

  openLightbox(index: number) {
    this.currentSlide = index;
    this.lightboxOpen = true;
    document.body.style.overflow = 'hidden';
  }

  closeLightbox() {
    this.lightboxOpen = false;
    document.body.style.overflow = '';
  }

  prevSlide() {
    if (!this.config?.images) return;
    this.currentSlide = this.currentSlide === 0
      ? this.config.images.length - 1
      : this.currentSlide - 1;
  }

  nextSlide() {
    if (!this.config?.images) return;
    this.currentSlide = this.currentSlide === this.config.images.length - 1
      ? 0
      : this.currentSlide + 1;
  }

  handleKeydown = (e: KeyboardEvent) => {
    if (!this.lightboxOpen) return;
    if (e.key === 'Escape') this.closeLightbox();
    if (e.key === 'ArrowLeft') this.prevSlide();
    if (e.key === 'ArrowRight') this.nextSlide();
  };

  render() {
    if (!this.config) {
      return html`<div>Configuration is required</div>`;
    }

    const subtitleColor = this.config.subtitle_color || '#000000';
    const images = this.config.images || [];

    return html`
      <section class="images-gallery">
        <div class="images-gallery__container">
          <!-- Header -->
          <div class="images-gallery__header">
            ${this.config.subtitle ? html`
              <p class="images-gallery__subtitle" style="color: ${subtitleColor};">${this.config.subtitle}</p>
            ` : ''}
            ${this.config.title ? html`
              <h2 class="images-gallery__title">${this.config.title}</h2>
            ` : ''}
          </div>

          <!-- Grid -->
          <ul class="images-gallery__grid">
            ${images.map((image, index) => html`
              <li class="images-gallery__item" @click=${() => this.openLightbox(index)}>
                <div class="images-gallery__item-wrapper">
                  <img
                    src="${image.image}"
                    alt=""
                    class="images-gallery__item-image"
                  />
                  <div class="images-gallery__item-overlay">
                    <i class="sicon-add"></i>
                  </div>
                </div>
              </li>
            `)}
          </ul>
        </div>

        <!-- Lightbox -->
        <div
          class="images-gallery__lightbox ${this.lightboxOpen ? 'images-gallery__lightbox--open' : ''}"
          @click=${(e: Event) => {
            if (e.target === e.currentTarget) this.closeLightbox();
          }}
        >
          <button class="images-gallery__lightbox-close" @click=${this.closeLightbox}>
            <i class="sicon-cancel"></i>
          </button>

          ${images.length > 0 ? html`
            <img
              src="${images[this.currentSlide]?.image}"
              alt=""
              class="images-gallery__lightbox-image"
            />
          ` : ''}

          ${images.length > 1 ? html`
            <button class="images-gallery__lightbox-nav images-gallery__lightbox-nav--prev" @click=${this.prevSlide}>
              <i class="sicon-keyboard-arrow-right"></i>
            </button>
            <button class="images-gallery__lightbox-nav images-gallery__lightbox-nav--next" @click=${this.nextSlide}>
              <i class="sicon-keyboard-arrow-left"></i>
            </button>
          ` : ''}

          <div class="images-gallery__lightbox-counter">
            ${this.currentSlide + 1} / ${images.length}
          </div>
        </div>
      </section>
    `;
  }
}
