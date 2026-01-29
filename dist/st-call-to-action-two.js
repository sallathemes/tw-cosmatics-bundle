import { LitElement as d, html as o } from "lit";
import { property as p, state as u } from "lit/decorators.js";
var _ = Object.defineProperty, n = (a, t, e, l) => {
  for (var i = void 0, r = a.length - 1, s; r >= 0; r--)
    (s = a[r]) && (i = s(t, e, i) || i);
  return i && _(t, e, i), i;
};
class c extends d {
  constructor() {
    super(...arguments), this.product = void 0, this.styleElement = null;
  }
  createRenderRoot() {
    return this;
  }
  connectedCallback() {
    super.connectedCallback(), this.injectStyles(), this.product = window.product;
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

      .st-call-to-action-two__product-card {
        position: relative;
        width: 100%;
      }

      .st-call-to-action-two__product-image {
        height: 404px;
        width: 100%;
        overflow: hidden;
        background-color: #e5e7eb;
        margin-bottom: 1rem;
        position: relative;
      }

      .st-call-to-action-two__product-image:hover {
        opacity: 0.75;
      }

      .st-call-to-action-two__product-image img {
        height: 100%;
        width: 100%;
        object-fit: cover;
        object-position: center;
      }

      .st-call-to-action-two__product-content {
        text-align: center;
      }

      .st-call-to-action-two__product-name {
        font-size: 1.5rem;
        font-weight: 500;
        margin-bottom: 1.25rem;
      }

      .st-call-to-action-two__product-price {
        display: inline-flex;
        align-items: center;
        gap: 1.25rem;
        margin-bottom: 1rem;
      }

      .st-call-to-action-two__sale-price {
        font-size: 1.5rem;
        font-weight: 700;
        color: var(--primary-color, #000);
      }

      .st-call-to-action-two__regular-price {
        font-size: 1rem;
        text-decoration: line-through;
        opacity: 0.6;
      }

      .st-call-to-action-two__rating {
        margin-bottom: 1rem;
        display: flex;
        flex-direction: column;
        align-items: center;
      }

      .st-call-to-action-two__button-wrap {
        display: flex;
        justify-content: center;
      }
    `, document.head.appendChild(this.styleElement));
  }
  renderProductCard() {
    var e, l;
    if (!this.product)
      return o`<div>Product data not available</div>`;
    const t = this.product.sale_price && this.product.sale_price !== this.product.regular_price;
    return o`
      <div class="st-call-to-action-two__product-card">
        <div class="st-call-to-action-two__product-image">
          <img src="${(e = this.product.image) == null ? void 0 : e.url}" alt="${this.product.name}" />
        </div>
        <div class="st-call-to-action-two__product-content">
          <h3 class="st-call-to-action-two__product-name">
            ${this.product.name}
          </h3>
          <div class="st-call-to-action-two__product-price">
            ${t ? o`
              <span class="st-call-to-action-two__sale-price">
                ${this.product.sale_price} ${this.product.currency}
              </span>
              <span class="st-call-to-action-two__regular-price">
                ${this.product.regular_price} ${this.product.currency}
              </span>
            ` : o`
              <span class="st-call-to-action-two__sale-price">
                ${this.product.price} ${this.product.currency}
              </span>
            `}
          </div>
          <div class="st-call-to-action-two__rating">
            <salla-rating-stars size="large" value="${((l = this.product.rating) == null ? void 0 : l.stars) || 5}"></salla-rating-stars>
          </div>
          <div class="st-call-to-action-two__button-wrap">
            <salla-add-product-button width="wide"></salla-add-product-button>
          </div>
        </div>
      </div>
    `;
  }
  render() {
    if (!this.config)
      return o`<div>Configuration is required</div>`;
    const t = this.config.bg_color || "#ffffff";
    return o`
      <div
        class="st-call-to-action-two s-block"
        style="background-color: ${t};"
      >
        <div class="container">
          <div class="st-call-to-action-two__wrapper">
            <div class="st-call-to-action-two__image-col">
              ${this.config.image ? o`
                <img
                  src="${this.config.image}"
                  alt=""
                  class="st-call-to-action-two__image"
                />
              ` : ""}
            </div>
            <div class="st-call-to-action-two__product-col">
              ${this.renderProductCard()}
            </div>
          </div>
        </div>
      </div>
    `;
  }
}
n([
  p({ type: Object })
], c.prototype, "config");
n([
  u()
], c.prototype, "product");
typeof c < "u" && c.registerSallaComponent("salla-st-call-to-action-two");
export {
  c as default
};
