import { LitElement as c, html as o } from "lit";
import { property as f } from "lit/decorators.js";
var d = Object.defineProperty, u = (a, e, s, l) => {
  for (var t = void 0, r = a.length - 1, i; r >= 0; r--)
    (i = a[r]) && (t = i(e, s, t) || t);
  return t && d(e, s, t), t;
};
class n extends c {
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
      .st-features-two {
        display: block;
        width: 100%;
        position: relative;
        padding: 3rem 0;
      }

      .st-features-two__header {
        text-align: center;
        margin-bottom: 2rem;
      }

      .st-features-two__title {
        font-size: 2rem;
        font-weight: 700;
        margin: 0 0 0.5rem 0;
      }

      @media (min-width: 768px) {
        .st-features-two__title {
          font-size: 2.5rem;
        }
      }

      .st-features-two__subtitle {
        font-size: 1rem;
        margin: 0;
        opacity: 0.8;
      }

      .st-features-two__grid {
        display: grid;
        grid-template-columns: 1fr;
        gap: 2.5rem;
      }

      @media (min-width: 768px) {
        .st-features-two__grid {
          grid-template-columns: repeat(3, 1fr);
        }
      }

      .st-features-two__feature {
        display: flex;
        flex-direction: column;
        gap: 2.5rem;
        justify-content: flex-start;
        align-items: center;
        text-align: center;
      }

      .st-features-two__feature-image {
        width: 280px;
        height: 280px;
        object-fit: contain;
      }

      .st-features-two__feature-desc {
        opacity: 0.6;
        max-width: 24rem;
        margin: 0;
        line-height: 1.7;
      }
    `, document.head.appendChild(this.styleElement));
  }
  getFeatures() {
    return this.config ? [
      { image: this.config.feature1_image, desc: this.config.feature1_desc },
      { image: this.config.feature2_image, desc: this.config.feature2_desc },
      { image: this.config.feature3_image, desc: this.config.feature3_desc }
    ].filter((e) => e.image || e.desc) : [];
  }
  render() {
    if (!this.config)
      return o`<div>Configuration is required</div>`;
    const e = this.config.bg_color || "#ffffff", s = this.config.text_color || "#121212", l = this.config.title_color || s, t = this.config.subtitle_color || s, r = this.getFeatures();
    return o`
      <div
        class="st-features-two s-block"
        style="background-color: ${e}; color: ${s};"
      >
        <div class="st-features-two__header">
          <h2 class="st-features-two__title" style="color: ${l};">${this.config.title}</h2>
          <p class="st-features-two__subtitle" style="color: ${t};">${this.config.subtitle}</p>
        </div>

        <div class="container">
          <div class="st-features-two__grid">
            ${r.map((i) => o`
              <div class="st-features-two__feature">
                ${i.image ? o`
                  <img
                    src="${i.image}"
                    alt=""
                    class="st-features-two__feature-image"
                    width="280"
                    height="280"
                  />
                ` : ""}
                <p class="st-features-two__feature-desc">${i.desc}</p>
              </div>
            `)}
          </div>
        </div>
      </div>
    `;
  }
}
u([
  f({ type: Object })
], n.prototype, "config");
typeof n < "u" && n.registerSallaComponent("salla-st-features-two");
export {
  n as default
};
