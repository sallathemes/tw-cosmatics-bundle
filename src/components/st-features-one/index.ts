import { html, LitElement } from "lit";
import { property } from "lit/decorators.js";
import AOS from "../../utils/animate-on-scroll";

export default class StFeaturesOne extends LitElement {
  @property({ type: Object })
  config?: {
    title: string;
    subtitle: string;
    bg_color: string;
    text_color: string;
    title_color: string;
    subtitle_color: string;
    icon_color: string;
    main_image: string;
    main_image_classes: string;
    float_image1: string;
    float_image2: string;
    from_right: number;
    from_bottom: number;
    reversed_image: boolean;
    feature1_icon: string;
    feature1_title: string;
    feature1_desc: string;
    feature2_icon: string;
    feature2_title: string;
    feature2_desc: string;
    feature3_icon: string;
    feature3_title: string;
    feature3_desc: string;
    feature4_icon: string;
    feature4_title: string;
    feature4_desc: string;
  };

  private styleElement: HTMLStyleElement | null = null;

  createRenderRoot() {
    return this;
  }

  connectedCallback() {
    super.connectedCallback();
    this.injectStyles();
    // Ensure animation system is initialized
    AOS.init();
  }

  updated(changedProperties: any) {
    super.updated(changedProperties);
    // Refresh animation system to observe new elements
    AOS.refresh();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.styleElement?.remove();
  }

  injectStyles() {
    if (this.styleElement) return;

    this.styleElement = document.createElement('style');
    this.styleElement.textContent = `
      .st-features-one {
        display: block;
        width: 100%;
        position: relative;
        padding: 4rem 0 4rem;
        overflow: visible;
        font-family: 'Baloo Bhaijaan 2', sans-serif;
      }

      .container {
        width: 100vw;
        margin: 0 auto;
        padding: 0 0.75rem;
        max-width: 100%;
      }
j
      @media (min-width: 640px) {
        .container {
          padding: 0 1rem;
        }
      }

      @media (min-width: 768px) {
        .container {
          padding: 0 1.5rem;
        }
      }

      @media (min-width: 1024px) {
        .container {
          padding: 0 2rem;
        }
      }

      @media (min-width: 1200px) {
        .container {
          width: 1340px;
        }
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
        top: 80px;
        width: 200px;
        height: 200px;
        z-index: 0;
        display: block;
        object-fit: cover;
      }

      @media (min-width: 768px) {
        .st-features-one__float-image {
          width: 250px;
          height: 250px;
        }
      }

      @media (min-width: 1024px) {
        .st-features-one__float-image {
          width: 300px;
          height: 300px;
        }
      }

      .st-features-one__float-image--left {
        left: -5rem;
      }

      @media (min-width: 768px) {
        .st-features-one__float-image--left {
          left: -8rem;
        }
      }

      @media (min-width: 1024px) {
        .st-features-one__float-image--left {
          left: -10rem;
        }
      }

      .st-features-one__float-image--right {
        right: -10px;
        top: -13px;
      }

      @media (min-width: 768px) {
        .st-features-one__float-image--right {
          right: -100px;
        }
      }

      @media (min-width: 1024px) {
        .st-features-one__float-image--right {
          right: -45px;
        }
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
        display: block;
        position: relative;
        grid-column: span 12;
        margin-bottom: 2rem;
        text-align: center;
      }

      @media (min-width: 768px) {
        .st-features-one__image-col {
          grid-column: span 4;
          margin-bottom: 0;
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
        height: 200px;
        object-fit: cover;
      }

      @media (min-width: 768px) and (max-width: 1023px) {
        .st-features-one__float-image-2 {
          right: 60px !important;
          bottom: 150px !important;
        }
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
        text-align: center;
      }

      @media (min-width: 768px) {
        .st-features-one__header {
          text-align: right;
        }
      }

      .st-features-one__title {
        font-size: 1.75rem;
        font-weight: 700;
        margin: 0 0 0.5rem 0;
        line-height: 1.3;
        max-width: 48rem;
      }

      @media (min-width: 640px) {
        .st-features-one__title {
          font-size: 2rem;
          line-height: 1.2;
        }
      }

      @media (min-width: 768px) {
        .st-features-one__title {
          font-size: 2.5rem;
          line-height: 1.4;
        }
      }

      @media (min-width: 1024px) {
        .st-features-one__title {
          font-size: 3rem;
        }
      }

      .dark .st-features-one__title {
        color: #f9fafb !important;
      }

      .st-features-one__subtitle {
        font-size: 14px;
        margin: 0;
        opacity: 0.8;
        line-height: 1.6;
      }

      @media (min-width: 768px) {
        .st-features-one__subtitle {
          font-size: 1.25rem;
        }
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
        font-size: 1.125rem;
        font-weight: 600;
        line-height: 1.5;
        margin: 0;
        word-wrap: break-word;
        overflow-wrap: break-word;
      }

      @media (min-width: 768px) {
        .st-features-one__feature-title {
          font-size: 1rem;
        }
      }

      .st-features-one__feature-desc {
        margin: 0.75rem 0 0 0;
        font-size: 1rem;
        line-height: 1.6;
        opacity: 0.7;
        word-wrap: break-word;
        overflow-wrap: break-word;
        white-space: normal;
      }

      @media (min-width: 768px) {
        .st-features-one__feature-desc {
          font-size: 1rem;
          line-height: 1.7;
        }
      }
    `;
    document.head.appendChild(this.styleElement);
  }

  private getFeatures() {
    if (!this.config) return [];

    return [
      { icon: this.config.feature1_icon, title: this.config.feature1_title, desc: this.config.feature1_desc },
      { icon: this.config.feature2_icon, title: this.config.feature2_title, desc: this.config.feature2_desc },
      { icon: this.config.feature3_icon, title: this.config.feature3_title, desc: this.config.feature3_desc },
      { icon: this.config.feature4_icon, title: this.config.feature4_title, desc: this.config.feature4_desc },
    ].filter(f => f.title);
  }

  render() {
    if (!this.config) {
      return html`<div>Configuration is required</div>`;
    }

    const bgColor = this.config.bg_color || '#ffffff';
    const textColor = this.config.text_color || '#121212';
    const titleColor = this.config.title_color || textColor;
    const subtitleColor = this.config.subtitle_color || textColor;
    const iconColor = this.config.icon_color || textColor;
    const isReversed = this.config.reversed_image;
    const features = this.getFeatures();

    return html`
      <div
        class="st-features-one s-block s-block--fullwidth"
        style="background-color: ${bgColor}; color: ${textColor};"
      >
        <div class="container">
          <div class="st-features-one__grid">
            <div class="st-features-one__image-col ${isReversed ? 'st-features-one__image-col--reversed' : ''}">
              ${this.config.float_image1 ? html`
                <img
                  src="${this.config.float_image1}"
                  alt="decorative image"
                  width="300"
                  height="300"
                  class="st-features-one__float-image ${isReversed ? 'st-features-one__float-image--left' : 'st-features-one__float-image--right'}"
                  data-animate="fade-left"
                  data-delay="300"
                />
              ` : ''}
              
              ${this.config.main_image ? html`
                <img
                  src="${this.config.main_image}"
                  alt="product image"
                  class="st-features-one__main-image ${this.config.main_image_classes || ''}"
                  data-animate="zoom-in"
                  data-delay="100"
                />
              ` : ''}

              ${this.config.float_image2 ? html`
                <img
                  src="${this.config.float_image2}"
                  alt="decorative image"
                  width="200"
                  height="200"
                  class="st-features-one__float-image-2"
                  style="right: ${this.config.from_right || 150}px; bottom: ${this.config.from_bottom || 20}px;"
                  data-animate="fade-right"
                  data-delay="200"
                />
              ` : ''}
            </div>

            <div class="st-features-one__content-col">
              <div class="st-features-one__header">
                <p 
                  class="st-features-one__subtitle" 
                  style="color: ${subtitleColor};"
                  data-animate="fade-up"
                  data-delay="0"
                >${this.config.subtitle}</p>
                <h2 
                  class="st-features-one__title" 
                  style="color: ${titleColor};"
                  data-animate="fade-up"
                  data-delay="150"
                >${this.config.title}</h2>
              </div>

              <div class="st-features-one__features-grid">
                ${features.map((feature, index) => html`
                  <div 
                    class="st-features-one__feature"
                    data-animate="fade-up"
                    data-delay="${300 + (index * 150)}"
                  >
                    <div class="st-features-one__feature-icon-wrap">
                      <i class="st-features-one__feature-icon ${feature.icon}" style="color: ${iconColor};"></i>
                    </div>
                    <h3 class="st-features-one__feature-title">${feature.title}</h3>
                    <p class="st-features-one__feature-desc">${feature.desc}</p>
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
