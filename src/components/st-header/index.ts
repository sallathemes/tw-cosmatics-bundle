import { html, LitElement } from "lit";
import { property } from "lit/decorators.js";
import AOS from "../../utils/animate-on-scroll";

export default class StHeader extends LitElement {
  @property({ type: Object })
  config?: {
    logo: string;
    bg_color: string;
    sticky: boolean;
  };

  private styleElement: HTMLStyleElement | null = null;

  createRenderRoot() {
    return this;
  }

  connectedCallback() {
    super.connectedCallback();
    this.injectStyles();
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
    `;
    document.head.appendChild(this.styleElement);
  }

  render() {
    if (!this.config) {
      return html`<div>Configuration is required</div>`;
    }

    const bgColor = this.config.bg_color || '#ffffff';
    const isSticky = this.config.sticky !== false;

    return html`
      <header
        class="st-header s-block s-block--fullwidth ${isSticky ? 'st-header--sticky' : ''}"
        style="background-color: ${bgColor};"
      >
        <div class="container">
          <div class="st-header__inner">
            ${this.config.logo ? html`
              <img
                src="${this.config.logo}"
                alt="Logo"
                class="st-header__logo"
                data-animate="fade-down"
                data-delay="0"
              />
            ` : html`
              <salla-store-logo data-animate="fade-down" data-delay="0"></salla-store-logo>
            `}
          </div>
        </div>
      </header>
    `;
  }
}
