import { LitElement as n, html as i } from "lit";
import { property as r } from "lit/decorators.js";
var d = Object.defineProperty, p = (o, t, c, f) => {
  for (var e = void 0, l = o.length - 1, s; l >= 0; l--)
    (s = o[l]) && (e = s(t, c, e) || e);
  return e && d(t, c, e), e;
};
class a extends n {
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
    var t;
    super.disconnectedCallback(), (t = this.styleElement) == null || t.remove();
  }
  injectStyles() {
    this.styleElement || (this.styleElement = document.createElement("style"), this.styleElement.textContent = `
      .st-call-to-action-two {
        display: block;
        width: 100%;
        padding: 2rem 0;
      }

      .st-call-to-action-two__wrapper {
        display: flex;
        justify-content: center;
        gap: 2.5rem;
      }

      .st-call-to-action-two__image-col {
        flex: 1;
        height: 616px;
        position: relative;
        display: none;
      }

      @media (min-width: 768px) {
        .st-call-to-action-two__image-col {
          display: block;
        }
      }

      .st-call-to-action-two__image {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 8px;
      }

      .st-call-to-action-two__product-col {
        width: 370px;
        flex-shrink: 0;
      }
    `, document.head.appendChild(this.styleElement));
  }
  render() {
    if (!this.config)
      return i`<div>Configuration is required</div>`;
    const t = this.config.bg_color || "#ffffff";
    return i`
      <div
        class="st-call-to-action-two s-block"
        style="background-color: ${t};"
      >
        <div class="container">
          <div class="st-call-to-action-two__wrapper">
            <div class="st-call-to-action-two__image-col">
              ${this.config.image ? i`
                <img
                  src="${this.config.image}"
                  alt=""
                  class="st-call-to-action-two__image"
                />
              ` : ""}
            </div>
            <div class="st-call-to-action-two__product-col">
              <salla-product-card></salla-product-card>
            </div>
          </div>
        </div>
      </div>
    `;
  }
}
p([
  r({ type: Object })
], a.prototype, "config");
typeof a < "u" && a.registerSallaComponent("salla-st-call-to-action-two");
export {
  a as default
};
