import { LitElement as m, html as l } from "lit";
import { property as d, state as c } from "lit/decorators.js";
var h = Object.defineProperty, n = (s, e, t, o) => {
  for (var i = void 0, r = s.length - 1, g; r >= 0; r--)
    (g = s[r]) && (i = g(e, t, i) || i);
  return i && h(e, t, i), i;
};
class a extends m {
  constructor() {
    super(...arguments), this.lightboxOpen = !1, this.currentSlide = 0, this.styleElement = null, this.handleKeydown = (e) => {
      this.lightboxOpen && (e.key === "Escape" && this.closeLightbox(), e.key === "ArrowLeft" && this.prevSlide(), e.key === "ArrowRight" && this.nextSlide());
    };
  }
  // Render in light DOM so Salla styles work correctly
  createRenderRoot() {
    return this;
  }
  connectedCallback() {
    super.connectedCallback(), this.injectStyles(), window.addEventListener("keydown", this.handleKeydown);
  }
  disconnectedCallback() {
    var e;
    super.disconnectedCallback(), (e = this.styleElement) == null || e.remove(), window.removeEventListener("keydown", this.handleKeydown);
  }
  injectStyles() {
    this.styleElement || (this.styleElement = document.createElement("style"), this.styleElement.textContent = `
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
    `, document.head.appendChild(this.styleElement));
  }
  openLightbox(e) {
    this.currentSlide = e, this.lightboxOpen = !0, document.body.style.overflow = "hidden";
  }
  closeLightbox() {
    this.lightboxOpen = !1, document.body.style.overflow = "";
  }
  prevSlide() {
    var e;
    (e = this.config) != null && e.images && (this.currentSlide = this.currentSlide === 0 ? this.config.images.length - 1 : this.currentSlide - 1);
  }
  nextSlide() {
    var e;
    (e = this.config) != null && e.images && (this.currentSlide = this.currentSlide === this.config.images.length - 1 ? 0 : this.currentSlide + 1);
  }
  render() {
    var o;
    if (!this.config)
      return l`<div>Configuration is required</div>`;
    const e = this.config.subtitle_color || "#000000", t = this.config.images || [];
    return l`
      <section class="images-gallery">
        <div class="images-gallery__container">
          <!-- Header -->
          <div class="images-gallery__header">
            ${this.config.subtitle ? l`
              <p class="images-gallery__subtitle" style="color: ${e};">${this.config.subtitle}</p>
            ` : ""}
            ${this.config.title ? l`
              <h2 class="images-gallery__title">${this.config.title}</h2>
            ` : ""}
          </div>

          <!-- Grid -->
          <ul class="images-gallery__grid">
            ${t.map((i, r) => l`
              <li class="images-gallery__item" @click=${() => this.openLightbox(r)}>
                <div class="images-gallery__item-wrapper">
                  <img
                    src="${i.image}"
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
          class="images-gallery__lightbox ${this.lightboxOpen ? "images-gallery__lightbox--open" : ""}"
          @click=${(i) => {
      i.target === i.currentTarget && this.closeLightbox();
    }}
        >
          <button class="images-gallery__lightbox-close" @click=${this.closeLightbox}>
            <i class="sicon-cancel"></i>
          </button>

          ${t.length > 0 ? l`
            <img
              src="${(o = t[this.currentSlide]) == null ? void 0 : o.image}"
              alt=""
              class="images-gallery__lightbox-image"
            />
          ` : ""}

          ${t.length > 1 ? l`
            <button class="images-gallery__lightbox-nav images-gallery__lightbox-nav--prev" @click=${this.prevSlide}>
              <i class="sicon-keyboard-arrow-right"></i>
            </button>
            <button class="images-gallery__lightbox-nav images-gallery__lightbox-nav--next" @click=${this.nextSlide}>
              <i class="sicon-keyboard-arrow-left"></i>
            </button>
          ` : ""}

          <div class="images-gallery__lightbox-counter">
            ${this.currentSlide + 1} / ${t.length}
          </div>
        </div>
      </section>
    `;
  }
}
n([
  d({ type: Object })
], a.prototype, "config");
n([
  c()
], a.prototype, "lightboxOpen");
n([
  c()
], a.prototype, "currentSlide");
typeof a < "u" && a.registerSallaComponent("salla-images-gallery");
export {
  a as default
};
