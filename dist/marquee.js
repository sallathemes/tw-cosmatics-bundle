import { LitElement as d, html as s } from "lit";
import { property as m } from "lit/decorators.js";
var c = Object.defineProperty, f = (a, t, r, n) => {
  for (var e = void 0, i = a.length - 1, o; i >= 0; i--)
    (o = a[i]) && (e = o(t, r, e) || e);
  return e && c(t, r, e), e;
};
class l extends d {
  constructor() {
    super(...arguments), this.styleElement = null;
  }
  // Render in light DOM so Salla styles work correctly
  createRenderRoot() {
    return this;
  }
  connectedCallback() {
    super.connectedCallback(), this.injectStyles(), this.style.display = "block", this.style.overflow = "hidden";
  }
  disconnectedCallback() {
    var t;
    super.disconnectedCallback(), (t = this.styleElement) == null || t.remove();
  }
  injectStyles() {
    this.styleElement || (this.styleElement = document.createElement("style"), this.styleElement.textContent = `
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
    `, document.head.appendChild(this.styleElement));
  }
  render() {
    if (!this.config)
      return s`<div>Configuration is required</div>`;
    const t = this.config.bg_color || "#000000", r = this.config.text_color || "#ffffff", n = this.config.texts || [];
    return s`
      <div
        class="st-marquee"
        style="background-color: ${t}; color: ${r};"
      >
        <div class="st-marquee__wrapper">
          <div class="st-marquee__content">
            ${n.map((e) => s`
              <h3 class="st-marquee__text">${e.title}</h3>
            `)}
          </div>
          <div class="st-marquee__content" aria-hidden="true">
            ${n.map((e) => s`
              <h3 class="st-marquee__text">${e.title}</h3>
            `)}
          </div>
        </div>
      </div>
    `;
  }
}
f([
  m({ type: Object })
], l.prototype, "config");
typeof l < "u" && l.registerSallaComponent("salla-marquee");
export {
  l as default
};
