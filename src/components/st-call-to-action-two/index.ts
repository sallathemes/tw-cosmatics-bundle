import { html, LitElement } from "lit";
import { property } from "lit/decorators.js";

export default class StCallToActionTwo extends LitElement {
  @property({ type: Object })
  config?: {
    image: string;
    bg_color: string;
  };

  private styleElement: HTMLStyleElement | null = null;

  createRenderRoot() {
    return this;
  }

  connectedCallback() {
    super.connectedCallback();
    this.injectStyles();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.styleElement?.remove();
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
    `;
    document.head.appendChild(this.styleElement);
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
            <div class="st-call-to-action-two__image-col">
              ${this.config.image ? html`
                <img
                  src="${this.config.image}"
                  alt=""
                  class="st-call-to-action-two__image"
                />
              ` : ''}
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
