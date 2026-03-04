import { html, LitElement } from "lit";
import { property } from "lit/decorators.js";
import AOS from "../../utils/animate-on-scroll";

export default class StFaqs extends LitElement {
  @property({ type: Object })
  config?: {
    title: string;
    sub_title: string;
    image: string;
    bg_color: string;
    text_color: string;
    faq1_question: string;
    faq1_answer: string;
    faq2_question: string;
    faq2_answer: string;
    faq3_question: string;
    faq3_answer: string;
    faq4_question: string;
    faq4_answer: string;
    faq5_question: string;
    faq5_answer: string;
  };

  private styleElement: HTMLStyleElement | null = null;
  private instanceId = Math.random().toString(36).substring(2, 9);

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
      .st-faqs {
        display: block;
        width: 100%;
        padding: 2rem 0 4rem;
      }

      @media (min-width: 640px) {
        .st-faqs {
          padding: 4rem 0;
        }
      }

      .st-faqs__grid {
        display: grid;
        grid-template-columns: 1fr;
        align-items: start;
        gap: 2rem;
      }

      @media (min-width: 1024px) {
        .st-faqs__grid {
          grid-template-columns: repeat(2, 1fr);
        }
      }

      @media (min-width: 1280px) {
        .st-faqs__grid {
          padding: 0 5rem;
        }
      }

      .st-faqs__content {
        height: 100%;
        padding: 0;
        display: flex;
        flex-direction: column;
        gap: 1rem;
      }

      @media (min-width: 768px) {
        .st-faqs__content {
          padding: 4rem;
          background-color: var(--color-base-50, #f9fafb);
        }
      }

      .st-faqs__subtitle {
        text-align: center;
        font-size: 0.95rem;
        margin: 0;
        opacity: 0.8;
      }

      .st-faqs__title {
        font-size: 1.5rem;
        font-weight: 700;
        text-align: center;
        margin: 0 0 2rem 0;
      }

      @media (min-width: 640px) {
        .st-faqs__title {
          font-size: 1.875rem;
        }
      }

      @media (min-width: 768px) {
        .st-faqs__title {
          font-size: 2.25rem;
          text-align: start;
        }
      }

      .st-faqs__item {
        margin-bottom: 1rem;
      }

      .st-faqs__item input {
        display: none;
      }

      .st-faqs__item-inner {
        border-radius: 0.5rem;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        position: relative;
        overflow: hidden;
        background: var(--color-background, #fff);
      }

      .st-faqs__question {
        display: block;
        font-size: 0.875rem;
        font-weight: 700;
        padding: 1.5rem;
        padding-left: 4rem;
        cursor: pointer;
        transition: color 0.2s;
        line-height: 1.5;
        position: relative;
      }

      [dir="rtl"] .st-faqs__question {
        padding-left: 1.5rem;
        padding-right: 4rem;
      }

      .st-faqs__question:hover {
        color: var(--color-primary, #4f46e5);
      }

      .st-faqs__toggle-icon {
        position: absolute;
        top: 18px;
        right: 1rem;
        width: 2rem;
        height: 2rem;
        background: var(--color-base-50, #f9fafb);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.3s;
      }

      [dir="ltr"] .st-faqs__toggle-icon {
        right: auto;
        left: 1rem;
      }

      .st-faqs__question:hover .st-faqs__toggle-icon {
        background: var(--color-primary, #4f46e5);
        color: var(--color-primary-reverse, #fff);
      }

      .st-faqs__answer-wrap {
        position: relative;
      }

      .st-faqs__answer {
        padding: 0 1.5rem;
        padding-left: 2.5rem;
        color: var(--color-base-600, #4b5563);
        font-size: 0.875rem;
        max-height: 0;
        opacity: 0;
        transform: translateY(-8px);
        transition: all 0.3s;
        line-height: 1.5;
        overflow: hidden;
      }

      [dir="rtl"] .st-faqs__answer {
        padding-left: 1.5rem;
        padding-right: 2.5rem;
      }

      .st-faqs__item input:checked ~ .st-faqs__item-inner .st-faqs__answer {
        max-height: 500px;
        opacity: 1;
        transform: translateY(0);
        padding-bottom: 2rem;
      }

      .st-faqs__item input:checked ~ .st-faqs__item-inner .st-faqs__toggle-icon {
        background: var(--color-primary, #4f46e5);
        color: var(--color-primary-reverse, #fff);
      }

      .st-faqs__item input:checked ~ .st-faqs__item-inner .st-faqs__toggle-icon::before {
        content: '−';
      }

      .st-faqs__toggle-icon::before {
        content: '+';
        font-size: 1.25rem;
        font-weight: 300;
      }

      .st-faqs__image-col {
        display: none;
        height: 100%;
      }

      @media (min-width: 1024px) {
        .st-faqs__image-col {
          display: block;
        }
      }

      .st-faqs__image {
        width: 100%;
        height: 100%;
        object-fit: cover;
        background: var(--color-base-50, #f9fafb);
      }
    `;
    document.head.appendChild(this.styleElement);
  }

  private getFaqs() {
    if (!this.config) return [];

    return [
      { question: this.config.faq1_question, answer: this.config.faq1_answer },
      { question: this.config.faq2_question, answer: this.config.faq2_answer },
      { question: this.config.faq3_question, answer: this.config.faq3_answer },
      { question: this.config.faq4_question, answer: this.config.faq4_answer },
      { question: this.config.faq5_question, answer: this.config.faq5_answer },
    ].filter(f => f.question && f.answer);
  }

  render() {
    if (!this.config) {
      return html`<div>Configuration is required</div>`;
    }

    const bgColor = this.config.bg_color || '#ffffff';
    const textColor = this.config.text_color || '#121212';
    const faqs = this.getFaqs();

    return html`
      <div
        class="st-faqs s-block s-block--fullwidth"
        style="background-color: ${bgColor}; color: ${textColor};"
      >
        <div class="container">
          <div class="st-faqs__grid">
            <div class="st-faqs__content">
              <p 
                class="st-faqs__subtitle"
                data-animate="fade-up"
                data-delay="0"
              >${this.config.sub_title}</p>
              <h2 
                class="st-faqs__title"
                data-animate="fade-up"
                data-delay="150"
              >${this.config.title}</h2>

              ${faqs.map((faq, index) => html`
                <div 
                  class="st-faqs__item"
                  data-animate="fade-up"
                  data-delay="${300 + (index * 100)}"
                >
                  <input type="checkbox" id="faq-${this.instanceId}-${index}" name="faqs-${this.instanceId}" />
                  <div class="st-faqs__item-inner">
                    <label for="faq-${this.instanceId}-${index}" class="st-faqs__question">
                      ${faq.question}
                      <span class="st-faqs__toggle-icon"></span>
                    </label>
                    <div class="st-faqs__answer-wrap">
                      <div class="st-faqs__answer">
                        <p>${faq.answer}</p>
                      </div>
                    </div>
                  </div>
                </div>
              `)}
            </div>

            <div 
              class="st-faqs__image-col"
              data-animate="fade-left"
              data-delay="200"
            >
              ${this.config.image ? html`
                <img
                  src="${this.config.image}"
                  alt="${this.config.title}"
                  class="st-faqs__image"
                />
              ` : ''}
            </div>
          </div>
        </div>
      </div>
    `;
  }
}
