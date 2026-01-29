import { LitElement as a, html as i } from "lit";
import { property as c } from "lit/decorators.js";
var d = Object.defineProperty, h = (o, e, s, f) => {
  for (var t = void 0, n = o.length - 1, r; n >= 0; n--)
    (r = o[n]) && (t = r(e, s, t) || t);
  return t && d(e, s, t), t;
};
class l extends a {
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
      .st-header {
        display: block;
        width: 100%;
        padding: 1rem 0;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
      }

      .st-header--sticky {
        position: sticky;
        top: 0;
        z-index: 100;
      }

      .st-header__inner {
        display: flex;
        justify-content: center;
        align-items: center;
      }

      .st-header__logo {
        width: auto;
        height: auto;
        max-height: 40px;
        max-width: 200px;
        object-fit: contain;
      }
    `, document.head.appendChild(this.styleElement));
  }
  render() {
    if (!this.config)
      return i`<div>Configuration is required</div>`;
    const e = this.config.bg_color || "#ffffff", s = this.config.sticky !== !1;
    return i`
      <header
        class="st-header s-block s-block--fullwidth ${s ? "st-header--sticky" : ""}"
        style="background-color: ${e};"
      >
        <div class="container">
          <div class="st-header__inner">
            ${this.config.logo ? i`
              <img
                src="${this.config.logo}"
                alt="Logo"
                class="st-header__logo"
              />
            ` : i`
              <salla-store-logo></salla-store-logo>
            `}
          </div>
        </div>
      </header>
    `;
  }
}
h([
  c({ type: Object })
], l.prototype, "config");
typeof l < "u" && l.registerSallaComponent("salla-st-header");
export {
  l as default
};
