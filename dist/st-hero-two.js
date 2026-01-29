import { LitElement as h, html as o } from "lit";
import { property as d } from "lit/decorators.js";
var l = Object.defineProperty, c = (s, t, i, p) => {
  for (var e = void 0, n = s.length - 1, a; n >= 0; n--)
    (a = s[n]) && (e = a(t, i, e) || e);
  return e && l(t, i, e), e;
};
class r extends h {
  constructor() {
    super(...arguments), this.styleElement = null;
  }
  // Render in light DOM so Salla styles work correctly
  createRenderRoot() {
    return this;
  }
  connectedCallback() {
    super.connectedCallback(), this.injectStyles();
  }
  disconnectedCallback() {
    var t;
    super.disconnectedCallback(), (t = this.styleElement) == null || t.remove();
  }
  injectStyles() {
    this.styleElement || (this.styleElement = document.createElement("style"), this.styleElement.textContent = `
      .st-hero-two {
        display: block;
        width: 100%;
        position: relative;
      }

      .st-hero-two__grid {
        display: grid;
        position: absolute;
        height: 100%;
        width: 100%;
        z-index: 0;
      }

      @media (min-width: 1024px) {
        .st-hero-two__grid {
          grid-template-columns: repeat(2, 1fr);
        }
      }

      .st-hero-two__grid-spacer {
        display: none;
      }

      @media (min-width: 1024px) {
        .st-hero-two__grid-spacer {
          display: block;
        }
      }

      .st-hero-two__bg-img {
        width: 100%;
        height: 100%;
        position: relative;
        background-size: cover;
        background-position: center;
        overflow: hidden;
      }

      .st-hero-two__shape {
        position: absolute;
        width: 200px;
        height: 200px;
        object-fit: contain;
      }

      .st-hero-two__shape--top {
        top: -40px;
        left: -40px;
      }

      .st-hero-two__shape--bottom {
        bottom: 0;
        right: 0;
      }

      .st-hero-two__overlay {
        position: absolute;
        background: rgba(0, 0, 0, 0.3);
        inset: 0;
      }

      @media (min-width: 1024px) {
        .st-hero-two__overlay {
          display: none;
        }
      }

      .st-hero-two__content-container {
        max-width: 1200px;
        margin: 0 auto;
        display: grid;
        position: relative;
        z-index: 1;
        min-height: 480px;
      }

      @media (min-width: 768px) {
        .st-hero-two__content-container {
          min-height: 680px;
        }
      }

      @media (min-width: 1024px) {
        .st-hero-two__content-container {
          grid-template-columns: repeat(2, 1fr);
          min-height: 880px;
        }
      }

      .st-hero-two__content {
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        text-align: center;
        gap: 1.25rem;
        padding: 1.25rem;
      }

      @media (min-width: 768px) {
        .st-hero-two__content {
          padding: 2.5rem;
        }
      }

      @media (min-width: 1024px) {
        .st-hero-two__content {
          align-items: flex-start;
          text-align: start;
          gap: 2rem;
        }
      }

      .st-hero-two__subtitle {
        font-size: 1rem;
        margin: 0;
      }

      @media (min-width: 768px) {
        .st-hero-two__subtitle {
          max-width: 66%;
        }
      }

      @media (min-width: 1024px) {
        .st-hero-two__subtitle {
          max-width: none;
        }
      }

      .st-hero-two__title {
        font-size: 2.25rem;
        line-height: 1.2;
        font-weight: 700;
        margin: 0;
      }

      @media (min-width: 768px) {
        .st-hero-two__title {
          font-size: 3rem;
          max-width: 66%;
        }
      }

      @media (min-width: 1024px) {
        .st-hero-two__title {
          font-size: 4.5rem;
          line-height: 86px;
          max-width: none;
        }
      }

      .st-hero-two__content-spacer {
        display: none;
      }

      @media (min-width: 1024px) {
        .st-hero-two__content-spacer {
          display: block;
        }
      }
    `, document.head.appendChild(this.styleElement));
  }
  render() {
    if (!this.config)
      return o`<div>Configuration is required</div>`;
    const t = this.config.bg_color || "#ffffff", i = this.config.text_color || "#121212";
    return o`
      <div
        class="st-hero-two s-block s-block--fullwidth"
        style="background-color: ${t}; color: ${i};"
      >
        <div class="st-hero-two__grid">
          <div class="st-hero-two__grid-spacer"></div>

          <div
            class="st-hero-two__bg-img"
            style="background-image: url(${this.config.image});"
          >
            ${this.config.image1 ? o`
              <img
                src="${this.config.image1}"
                alt=""
                class="st-hero-two__shape st-hero-two__shape--top"
                width="200"
                height="200"
              />
            ` : ""}

            ${this.config.image2 ? o`
              <img
                src="${this.config.image2}"
                alt=""
                class="st-hero-two__shape st-hero-two__shape--bottom"
                width="200"
                height="200"
              />
            ` : ""}
          </div>

          <div class="st-hero-two__overlay"></div>
        </div>

        <div class="st-hero-two__content-container container">
          <div class="st-hero-two__content">
            <p class="st-hero-two__subtitle">${this.config.subtitle}</p>
            <h2 class="st-hero-two__title">${this.config.title}</h2>
            <salla-add-product-button width="wide"></salla-add-product-button>
          </div>

          <div class="st-hero-two__content-spacer"></div>
        </div>
      </div>
    `;
  }
}
c([
  d({ type: Object })
], r.prototype, "config");
typeof r < "u" && r.registerSallaComponent("salla-st-hero-two");
export {
  r as default
};
