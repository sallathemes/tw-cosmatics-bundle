import { html, LitElement } from "lit";
import { property } from "lit/decorators.js";
import AOS from "../../utils/animate-on-scroll";

export default class StFeaturesTwo extends LitElement {
  @property({ type: Object })
  config?: {
    title: string;
    subtitle: string;
    title_color: string;
    subtitle_color: string;
    bg_color: string;
    text_color: string;
    feature1_image: string;
    feature1_desc: string;
    feature2_image: string;
    feature2_desc: string;
    feature3_image: string;
    feature3_desc: string;
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
    `;
    document.head.appendChild(this.styleElement);
  }

  private getFeatures() {
    if (!this.config) return [];

    return [
      { image: this.config.feature1_image, desc: this.config.feature1_desc },
      { image: this.config.feature2_image, desc: this.config.feature2_desc },
      { image: this.config.feature3_image, desc: this.config.feature3_desc },
    ].filter(f => f.image || f.desc);
  }

  render() {
    if (!this.config) {
      return html`<div>Configuration is required</div>`;
    }

    const bgColor = this.config.bg_color || '#ffffff';
    const textColor = this.config.text_color || '#121212';
    const titleColor = this.config.title_color || textColor;
    const subtitleColor = this.config.subtitle_color || textColor;
    const features = this.getFeatures();

    return html`
      <div
        class="st-features-two s-block"
        style="background-color: ${bgColor}; color: ${textColor};"
      >
        <div class="st-features-two__header">
          <h2 class="st-features-two__title" style="color: ${titleColor};" data-animate="fade-up" data-delay="0">${this.config.title}</h2>
          <p class="st-features-two__subtitle" style="color: ${subtitleColor};" data-animate="fade-up" data-delay="150">${this.config.subtitle}</p>
        </div>

        <div class="container">
          <div class="st-features-two__grid">
            ${features.map((feature, index) => html`
              <div class="st-features-two__feature" data-animate="fade-up" data-delay="${300 + (index * 100)}">
                ${feature.image ? html`
                  <img
                    src="${feature.image}"
                    alt=""
                    class="st-features-two__feature-image"
                    width="280"
                    height="280"
                    data-animate="scale-in"
                    data-delay="${350 + (index * 100)}"
                  />
                ` : ''}
                <p class="st-features-two__feature-desc">${feature.desc}</p>
              </div>
            `)}
          </div>
        </div>
      </div>
    `;
  }
}
