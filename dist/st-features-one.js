import { LitElement as d, html as s } from "lit";
import { property as m } from "lit/decorators.js";
var u = Object.defineProperty, _ = (o, e, i, f) => {
  for (var t = void 0, a = o.length - 1, r; a >= 0; a--)
    (r = o[a]) && (t = r(e, i, t) || t);
  return t && u(e, i, t), t;
};
class l extends d {
  constructor() {
    super(...arguments), this.styleElement = null;
  }
  createRenderRoot() {
    return this;
  }
  connectedCallback() {
    super.connectedCallback(), this.injectStyles();
  }
  disconnectedCallback() {
    var e;
    super.disconnectedCallback(), (e = this.styleElement) == null || e.remove();
  }
  injectStyles() {
    this.styleElement || (this.styleElement = document.createElement("style"), this.styleElement.textContent = `
      .st-features-one {
        display: block;
        width: 100%;
        position: relative;
        padding: 4rem 0 4rem;
        overflow: visible;
      }

      @media (min-width: 768px) {
        .st-features-one {
          padding: 6rem 0 6rem;
        }
      }

      @media (min-width: 1024px) {
        .st-features-one {
          padding: 6rem 0 8rem;
        }
      }

      .st-features-one__float-image {
        position: absolute;
        top: 0;
        transform: translateY(-20%);
        width: 300px;
        height: auto;
        z-index: 0;
        display: none;
      }

      @media (min-width: 768px) {
        .st-features-one__float-image {
          display: block;
        }
      }

      .st-features-one__float-image--left {
        left: -160px;
        transform: translateX(-50%) translateY(-20%);
      }

      .st-features-one__float-image--right {
        right: 0;
        transform: translateX(50%) translateY(-20%);
      }

      .st-features-one__grid {
        display: block;
        position: relative;
      }

      @media (min-width: 768px) {
        .st-features-one__grid {
          display: grid;
          grid-template-columns: repeat(12, 1fr);
        }
      }

      .st-features-one__image-col {
        display: none;
        position: relative;
        grid-column: span 4;
      }

      @media (min-width: 768px) {
        .st-features-one__image-col {
          display: block;
        }
      }

      .st-features-one__image-col--reversed {
        order: 1;
      }

      .st-features-one__main-image {
        position: relative;
        z-index: 1;
        transition: transform 0.7s ease;
        max-width: 100%;
        height: auto;
      }

      .st-features-one__main-image:hover {
        transform: translateY(-6px);
      }

      .st-features-one__float-image-2 {
        position: absolute;
        z-index: 0;
        width: 200px;
        height: auto;
      }

      .st-features-one__content-col {
        grid-column: span 8;
        padding: 0 1.5rem;
      }

      @media (min-width: 768px) {
        .st-features-one__content-col {
          padding: 0 2rem;
        }
      }

      .st-features-one__header {
        margin-bottom: 2rem;
      }

      .st-features-one__title {
        font-size: 1.75rem;
        font-weight: 700;
        margin: 0 0 0.5rem 0;
        line-height: 1.3;
      }

      @media (min-width: 768px) {
        .st-features-one__title {
          font-size: 2rem;
        }
      }

      .st-features-one__subtitle {
        font-size: 1rem;
        margin: 0;
        opacity: 0.8;
      }

      .st-features-one__features-grid {
        display: grid;
        grid-template-columns: 1fr;
        gap: 2rem 2.5rem;
        margin-top: 2.5rem;
      }

      @media (min-width: 768px) {
        .st-features-one__features-grid {
          margin-top: 3rem;
        }
      }

      @media (min-width: 1024px) {
        .st-features-one__features-grid {
          grid-template-columns: repeat(2, 1fr);
          margin-top: 4rem;
        }
      }

      .st-features-one__feature {
        position: relative;
        padding-right: 4rem;
      }

      [dir="ltr"] .st-features-one__feature {
        padding-right: 0;
        padding-left: 4rem;
      }

      .st-features-one__feature-icon-wrap {
        position: absolute;
        right: 0;
        top: 0.5rem;
        width: 4rem;
        height: 4rem;
        display: flex;
        align-items: flex-start;
        justify-content: flex-start;
      }

      [dir="ltr"] .st-features-one__feature-icon-wrap {
        right: auto;
        left: 0;
      }

      .st-features-one__feature-icon {
        font-size: 2.25rem;
      }

      .st-features-one__feature-title {
        font-size: 1rem;
        font-weight: 600;
        line-height: 1.75;
        margin: 0;
      }

      .st-features-one__feature-desc {
        margin: 0.5rem 0 0 0;
        font-size: 1rem;
        line-height: 1.75;
        opacity: 0.7;
      }
    `, document.head.appendChild(this.styleElement));
  }
  getFeatures() {
    return this.config ? [
      { icon: this.config.feature1_icon, title: this.config.feature1_title, desc: this.config.feature1_desc },
      { icon: this.config.feature2_icon, title: this.config.feature2_title, desc: this.config.feature2_desc },
      { icon: this.config.feature3_icon, title: this.config.feature3_title, desc: this.config.feature3_desc },
      { icon: this.config.feature4_icon, title: this.config.feature4_title, desc: this.config.feature4_desc }
    ].filter((e) => e.title) : [];
  }
  render() {
    if (!this.config)
      return s`<div>Configuration is required</div>`;
    const e = this.config.bg_color || "#ffffff", i = this.config.text_color || "#121212", f = this.config.title_color || i, t = this.config.subtitle_color || i, a = this.config.icon_color || i, r = this.config.reversed_image, c = this.getFeatures();
    return s`
      <div
        class="st-features-one s-block s-block--fullwidth"
        style="background-color: ${e}; color: ${i};"
      >
        ${this.config.float_image1 ? s`
          <img
            src="${this.config.float_image1}"
            alt=""
            class="st-features-one__float-image ${r ? "st-features-one__float-image--left" : "st-features-one__float-image--right"}"
          />
        ` : ""}

        <div class="container">
          <div class="st-features-one__grid">
            <div class="st-features-one__image-col ${r ? "st-features-one__image-col--reversed" : ""}">
              ${this.config.main_image ? s`
                <img
                  src="${this.config.main_image}"
                  alt=""
                  class="st-features-one__main-image"
                />
              ` : ""}

              ${this.config.float_image2 ? s`
                <img
                  src="${this.config.float_image2}"
                  alt=""
                  class="st-features-one__float-image-2"
                  style="bottom: -50px; right: 20px;"
                />
              ` : ""}
            </div>

            <div class="st-features-one__content-col">
              <div class="st-features-one__header">
                <h2 class="st-features-one__title" style="color: ${f};">${this.config.title}</h2>
                <p class="st-features-one__subtitle" style="color: ${t};">${this.config.subtitle}</p>
              </div>

              <div class="st-features-one__features-grid">
                ${c.map((n) => s`
                  <div class="st-features-one__feature">
                    <div class="st-features-one__feature-icon-wrap">
                      <i class="st-features-one__feature-icon ${n.icon}" style="color: ${a};"></i>
                    </div>
                    <h3 class="st-features-one__feature-title">${n.title}</h3>
                    <p class="st-features-one__feature-desc">${n.desc}</p>
                  </div>
                `)}
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }
}
_([
  m({ type: Object })
], l.prototype, "config");
typeof l < "u" && l.registerSallaComponent("salla-st-features-one");
export {
  l as default
};
