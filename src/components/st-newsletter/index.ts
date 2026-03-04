import { html, LitElement } from "lit";
import { property, state } from "lit/decorators.js";
import AOS from "../../utils/animate-on-scroll";

export default class StNewsletter extends LitElement {
  @property({ type: Object })
  config?: {
    title: string;
    subtitle: string;
    button_text: string;
    placeholder: string;
    bg_color: string;
    text_color: string;
    button_bg_color: string;
    button_text_color: string;
  };

  @state()
  private email = '';

  @state()
  private isSubmitting = false;

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
      .st-newsletter {
        display: block;
        width: 100%;
        border-radius: 0.5rem;
        padding: 1.75rem 1.25rem;
      }

      @media (min-width: 768px) {
        .st-newsletter {
          padding: 1.75rem 2.25rem;
        }
      }

      @media (min-width: 1024px) {
        .st-newsletter {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
      }

      .st-newsletter__content {
        margin-bottom: 1.5rem;
      }

      @media (min-width: 1024px) {
        .st-newsletter__content {
          margin-bottom: 0;
        }
      }

      .st-newsletter__title {
        font-size: 1.25rem;
        font-weight: 600;
        margin: 0 0 0.25rem 0;
      }

      .st-newsletter__subtitle {
        font-size: 0.875rem;
        opacity: 0.6;
        margin: 0;
      }

      .st-newsletter__form {
        display: flex;
        flex-direction: column;
        gap: 0.75rem;
      }

      @media (min-width: 640px) {
        .st-newsletter__form {
          flex-direction: row;
          align-items: center;
        }
      }

      .st-newsletter__input-wrap {
        position: relative;
        flex: 1;
      }

      .st-newsletter__input {
        width: 100%;
        min-width: 280px;
        padding: 0.75rem 1rem;
        padding-left: 7.5rem;
        border: none;
        border-radius: 0.375rem;
        background: rgba(255, 255, 255, 0.1);
        color: inherit;
        font-size: 0.875rem;
        box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.1);
      }

      [dir="rtl"] .st-newsletter__input {
        padding-left: 1rem;
        padding-right: 7.5rem;
      }

      .st-newsletter__input::placeholder {
        color: inherit;
        opacity: 0.5;
      }

      .st-newsletter__input:focus {
        outline: none;
        box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.25);
      }

      .st-newsletter__button {
        position: absolute;
        top: 50%;
        left: 0.375rem;
        transform: translateY(-50%);
        padding: 0.5rem 1rem;
        border: none;
        border-radius: 0.25rem;
        font-size: 0.875rem;
        font-weight: 600;
        cursor: pointer;
        transition: opacity 0.2s;
        min-width: 100px;
      }

      [dir="rtl"] .st-newsletter__button {
        left: auto;
        right: 0.375rem;
      }

      .st-newsletter__button:hover {
        opacity: 0.9;
      }

      .st-newsletter__button:disabled {
        opacity: 0.6;
        cursor: not-allowed;
      }
    `;
    document.head.appendChild(this.styleElement);
  }

  private handleSubmit(e: Event) {
    e.preventDefault();
    if (!this.email || this.isSubmitting) return;

    this.isSubmitting = true;

    // Trigger salla newsletter subscription if available
    if (typeof (window as any).salla !== 'undefined') {
      (window as any).salla.newsletter.subscribe(this.email)
        .then(() => {
          this.email = '';
          this.isSubmitting = false;
        })
        .catch(() => {
          this.isSubmitting = false;
        });
    } else {
      // Fallback - just reset
      setTimeout(() => {
        this.email = '';
        this.isSubmitting = false;
      }, 1000);
    }
  }

  private handleInput(e: Event) {
    this.email = (e.target as HTMLInputElement).value;
  }

  render() {
    if (!this.config) {
      return html`<div>Configuration is required</div>`;
    }

    const bgColor = this.config.bg_color || 'var(--color-primary, #4f46e5)';
    const textColor = this.config.text_color || '#ffffff';
    const buttonBgColor = this.config.button_bg_color || '#ffffff';
    const buttonTextColor = this.config.button_text_color || 'var(--color-primary, #4f46e5)';

    return html`
      <div
        class="st-newsletter s-block"
        style="background-color: ${bgColor}; color: ${textColor};"
      >
        <div class="st-newsletter__content">
          <h3 class="st-newsletter__title" data-animate="fade-right" data-delay="0">${this.config.title || 'النشرة الإخبارية'}</h3>
          <p class="st-newsletter__subtitle" data-animate="fade-right" data-delay="150">${this.config.subtitle || 'كن أول من يعرف عن الخصومات والعروض والأحداث'}</p>
        </div>

        <form class="st-newsletter__form" @submit="${this.handleSubmit}" data-animate="fade-left" data-delay="300">
          <div class="st-newsletter__input-wrap">
            <input
              type="email"
              class="st-newsletter__input"
              placeholder="${this.config.placeholder || 'ادخل ايميلك الشخصي'}"
              .value="${this.email}"
              @input="${this.handleInput}"
              required
              data-animate="fade-up"
              data-delay="350"
            />
            <button
              type="submit"
              class="st-newsletter__button"
              style="background-color: ${buttonBgColor}; color: ${buttonTextColor};"
              ?disabled="${this.isSubmitting}"
              data-animate="scale-in"
              data-delay="400"
            >
              ${this.isSubmitting ? '...' : (this.config.button_text || 'اشترك الآن')}
            </button>
          </div>
        </form>
      </div>
    `;
  }
}
