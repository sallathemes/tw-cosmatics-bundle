import { LitElement as m, html as o } from "lit";
import { property as h } from "lit/decorators.js";
var d = Object.defineProperty, c = (r, e, t, s) => {
  for (var a = void 0, i = r.length - 1, l; i >= 0; i--)
    (l = r[i]) && (a = l(e, t, a) || a);
  return a && d(e, t, a), a;
};
class n extends m {
  constructor() {
    super(...arguments), this.mouseX = 0, this.mouseY = 0, this.styleElement = null;
  }
  // Render in light DOM so Salla styles work correctly
  createRenderRoot() {
    return this;
  }
  connectedCallback() {
    super.connectedCallback(), this.handleMouseMove = this.handleMouseMove.bind(this), window.addEventListener("mousemove", this.handleMouseMove), this.injectStyles();
  }
  disconnectedCallback() {
    var e;
    super.disconnectedCallback(), window.removeEventListener("mousemove", this.handleMouseMove), (e = this.styleElement) == null || e.remove();
  }
  injectStyles() {
    this.styleElement || (this.styleElement = document.createElement("style"), this.styleElement.textContent = `
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
    `, document.head.appendChild(this.styleElement));
  }
  handleMouseMove(e) {
    const t = this.getBoundingClientRect();
    this.mouseX = (e.clientX - t.left - t.width / 2) * 0.1, this.mouseY = (e.clientY - t.top - t.height / 2) * 0.1, this.updateParallax();
  }
  updateParallax() {
    const e = this.querySelectorAll(".st-hero-area-one__parallax-image");
    e && e.forEach((t, s) => {
      const i = [
        { x: 0.7, y: 0.8 },
        { x: 0.8, y: 0.9 },
        { x: 0.5, y: 1.2 }
      ][s] || { x: 0.5, y: 0.5 };
      t.style.transform = `translate(${this.mouseX * i.x}px, ${this.mouseY * i.y}px)`;
    });
  }
  render() {
    if (!this.config)
      return o`<div>Configuration is required</div>`;
    const e = this.config.bgk_color || "#F2F2F4", t = this.config.text_color || "#121212";
    return o`
      <div
        class="st-hero-area-one"
        style="background-color: ${e}; color: ${t};"
      >
        <div class="st-hero-area-one__container">
          <div class="st-hero-area-one__content">
            <h2 class="st-hero-area-one__title">${this.config.main_title}</h2>
            <p class="st-hero-area-one__description">${this.config.description}</p>
            <div class="st-hero-area-one__button-wrap">
              <salla-add-product-button width="wide"></salla-add-product-button>
            </div>
          </div>

          <div class="st-hero-area-one__image-section">
            <div class="st-hero-area-one__image-wrapper">
              ${this.config.image ? o`
                <img
                  src="${this.config.image}"
                  alt=""
                  class="st-hero-area-one__main-image"
                />
              ` : ""}

              ${this.config.image1 ? o`
                <img
                  src="${this.config.image1}"
                  alt=""
                  class="st-hero-area-one__parallax-image st-hero-area-one__parallax-image--1"
                />
              ` : ""}

              ${this.config.image2 ? o`
                <img
                  src="${this.config.image2}"
                  alt=""
                  class="st-hero-area-one__parallax-image st-hero-area-one__parallax-image--2"
                />
              ` : ""}

              ${this.config.image3 ? o`
                <img
                  src="${this.config.image3}"
                  alt=""
                  class="st-hero-area-one__parallax-image st-hero-area-one__parallax-image--3"
                />
              ` : ""}
            </div>
          </div>
        </div>
      </div>
    `;
  }
}
c([
  h({ type: Object })
], n.prototype, "config");
typeof n < "u" && n.registerSallaComponent("salla-st-hero-area-one");
export {
  n as default
};
