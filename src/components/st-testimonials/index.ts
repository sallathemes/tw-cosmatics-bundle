import { html, LitElement } from "lit";
import { property } from "lit/decorators.js";

export default class StTestimonials extends LitElement {
  @property({ type: Object })
  config?: {
    title: string;
    subtitle: string;
    bg_color: string;
    text_color: string;
    testimonial1_name: string;
    testimonial1_content: string;
    testimonial1_avatar: string;
    testimonial1_rating: number;
    testimonial2_name: string;
    testimonial2_content: string;
    testimonial2_avatar: string;
    testimonial2_rating: number;
    testimonial3_name: string;
    testimonial3_content: string;
    testimonial3_avatar: string;
    testimonial3_rating: number;
    testimonial4_name: string;
    testimonial4_content: string;
    testimonial4_avatar: string;
    testimonial4_rating: number;
  };

  private styleElement: HTMLStyleElement | null = null;
  private instanceId = Math.random().toString(36).substring(2, 9);

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
      .st-testimonials {
        display: block;
        width: 100%;
        padding: 2rem 0 4rem;
        overflow: hidden;
      }

      @media (min-width: 640px) {
        .st-testimonials {
          padding: 3rem 0;
        }
      }

      .st-testimonials__header {
        text-align: center;
        margin-bottom: 2rem;
      }

      .st-testimonials__title {
        font-size: 2rem;
        font-weight: 700;
        margin: 0 0 0.5rem 0;
      }

      @media (min-width: 768px) {
        .st-testimonials__title {
          font-size: 2.5rem;
        }
      }

      .st-testimonials__subtitle {
        font-size: 1rem;
        margin: 0;
        opacity: 0.8;
      }

      .st-testimonials__grid {
        display: grid;
        grid-template-columns: 1fr;
        gap: 1.5rem;
      }

      @media (min-width: 640px) {
        .st-testimonials__grid {
          grid-template-columns: repeat(2, 1fr);
        }
      }

      @media (min-width: 1024px) {
        .st-testimonials__grid {
          grid-template-columns: repeat(4, 1fr);
        }
      }

      .st-testimonials__item {
        background: var(--color-background, #fff);
        border-radius: 1rem;
        padding: 1.25rem;
        display: flex;
        flex-direction: column;
        gap: 1rem;
        transition: transform 0.3s ease;
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
      }

      .st-testimonials__item:hover {
        transform: translateY(-4px);
      }

      .st-testimonials__avatar {
        width: 80px;
        height: 80px;
        border-radius: 50%;
        object-fit: cover;
        background: var(--color-base-50, #f9fafb);
      }

      @media (min-width: 768px) {
        .st-testimonials__avatar {
          width: 100px;
          height: 100px;
          border-radius: 1rem;
        }
      }

      .st-testimonials__content {
        flex: 1;
        display: flex;
        flex-direction: column;
      }

      .st-testimonials__rating {
        margin-bottom: 0.5rem;
      }

      .st-testimonials__text {
        line-height: 1.5;
        color: var(--color-base-600, #4b5563);
        margin: 0 0 1rem 0;
        font-size: 0.95rem;
      }

      .st-testimonials__name {
        font-size: 0.875rem;
        color: var(--color-primary, #4f46e5);
        margin: 0;
        margin-top: auto;
      }
    `;
    document.head.appendChild(this.styleElement);
  }

  private getTestimonials() {
    if (!this.config) return [];

    return [
      {
        name: this.config.testimonial1_name,
        content: this.config.testimonial1_content,
        avatar: this.config.testimonial1_avatar,
        rating: this.config.testimonial1_rating || 5
      },
      {
        name: this.config.testimonial2_name,
        content: this.config.testimonial2_content,
        avatar: this.config.testimonial2_avatar,
        rating: this.config.testimonial2_rating || 5
      },
      {
        name: this.config.testimonial3_name,
        content: this.config.testimonial3_content,
        avatar: this.config.testimonial3_avatar,
        rating: this.config.testimonial3_rating || 5
      },
      {
        name: this.config.testimonial4_name,
        content: this.config.testimonial4_content,
        avatar: this.config.testimonial4_avatar,
        rating: this.config.testimonial4_rating || 5
      }
    ].filter(t => t.name && t.content);
  }

  render() {
    if (!this.config) {
      return html`<div>Configuration is required</div>`;
    }

    const bgColor = this.config.bg_color || '#f9fafb';
    const textColor = this.config.text_color || '#121212';
    const testimonials = this.getTestimonials();

    return html`
      <div
        class="st-testimonials s-block s-block--fullwidth"
        style="background-color: ${bgColor}; color: ${textColor};"
      >
        <div class="container">
          <div class="st-testimonials__header">
            <h2 class="st-testimonials__title">${this.config.title}</h2>
            <p class="st-testimonials__subtitle">${this.config.subtitle}</p>
          </div>

          <div class="st-testimonials__grid">
            ${testimonials.map(item => html`
              <div class="st-testimonials__item">
                ${item.avatar ? html`
                  <img
                    src="${item.avatar}"
                    alt="${item.name}"
                    class="st-testimonials__avatar"
                  />
                ` : ''}
                <div class="st-testimonials__content">
                  <div class="st-testimonials__rating">
                    <salla-rating-stars value="${item.rating}"></salla-rating-stars>
                  </div>
                  <p class="st-testimonials__text">${item.content}</p>
                  <h4 class="st-testimonials__name">${item.name}</h4>
                </div>
              </div>
            `)}
          </div>
        </div>
      </div>
    `;
  }
}
