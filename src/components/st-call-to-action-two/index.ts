import { html, LitElement } from "lit";
import { property, state } from "lit/decorators.js";
import AOS from "../../utils/animate-on-scroll";

declare global {
  interface Window {
    product?: {
      id: number;
      name: string;
      price: string;
      regular_price: string;
      sale_price: string;
      currency: string;
      image: { url: string };
      status: string;
      rating?: { stars: number };
    };
  }
}

export default class StCallToActionTwo extends LitElement {
  @property({ type: Object })
  config?: {
    image: string;
    bg_color: string;
  };

  @state()
  private product: Window['product'] = undefined;

  private styleElement: HTMLStyleElement | null = null;

  createRenderRoot() {
    return this;
  }

  connectedCallback() {
    super.connectedCallback();
    this.injectStyles();
    this.product = window.product;
    AOS.init();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.styleElement?.remove();
  }

  updated(changedProperties: any) {
    super.updated(changedProperties);
    AOS.refresh();
  }

  injectStyles() {
    if (this.styleElement) return;

    this.styleElement = document.createElement('style');
    this.styleElement.textContent = `
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
    `;
    document.head.appendChild(this.styleElement);
  }

  private renderProductCard() {
    if (!this.product) {
      return html`<div>Product data not available</div>`;
    }

    const hasSalePrice = this.product.sale_price && this.product.sale_price !== this.product.regular_price;

    return html`
      <div class="st-call-to-action-two__product-card">
        <div class="st-call-to-action-two__product-image">
          <img src="${this.product.image?.url}" alt="${this.product.name}" />
        </div>
        <div class="st-call-to-action-two__product-content">
          <h3 class="st-call-to-action-two__product-name">
            ${this.product.name}
          </h3>
          <div class="st-call-to-action-two__product-price">
            ${hasSalePrice ? html`
              <span class="st-call-to-action-two__sale-price">
                ${this.product.sale_price} ${this.product.currency}
              </span>
              <span class="st-call-to-action-two__regular-price">
                ${this.product.regular_price} ${this.product.currency}
              </span>
            ` : html`
              <span class="st-call-to-action-two__sale-price">
                ${this.product.price} ${this.product.currency}
              </span>
            `}
          </div>
          <div class="st-call-to-action-two__rating">
            <salla-rating-stars size="large" value="${this.product.rating?.stars || 5}"></salla-rating-stars>
          </div>
          <div class="st-call-to-action-two__button-wrap">
            <salla-add-product-button width="wide"></salla-add-product-button>
          </div>
        </div>
      </div>
    `;
  }

  render() {
    if (!this.config) {
      return html`<div>Configuration is required</div>`;
    }

    const bgColor = this.config.bg_color || '#ffffff';

    return html`
      <div
        class="st-call-to-action-two s-block"
        style="background-color: ${bgColor};"
      >
        <div class="container">
          <div class="st-call-to-action-two__wrapper">
            <div 
              class="st-call-to-action-two__image-col"
              data-animate="fade-left"
              data-delay="0"
            >
              ${this.config.image ? html`
                <img
                  src="${this.config.image}"
                  alt=""
                  class="st-call-to-action-two__image"
                />
              ` : ''}
            </div>
            <div 
              class="st-call-to-action-two__product-col"
              data-animate="fade-right"
              data-delay="150"
            >
              ${this.renderProductCard()}
            </div>
          </div>
        </div>
      </div>
    `;
  }
}
