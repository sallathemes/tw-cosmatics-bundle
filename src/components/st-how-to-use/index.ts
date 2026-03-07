import { html, LitElement } from "lit";
import { property } from "lit/decorators.js";
import AOS from "../../utils/animate-on-scroll";

interface Step {
  title: string;
  desc: string;
  list: string[];
}

export default class StHowToUse extends LitElement {
  @property({ type: Object })
  config?: {
    title: string;
    subtitle: string;
    subtitle_color: string;
    bg_color: string;
    text_color: string;
    step1_title: string;
    step1_desc: string;
    step1_list1: string;
    step1_list2: string;
    step1_list3: string;
    step2_title: string;
    step2_desc: string;
    step2_list1: string;
    step2_list2: string;
    step2_list3: string;
    step3_title: string;
    step3_desc: string;
    step3_list1: string;
    step3_list2: string;
    step3_list3: string;
    step4_title: string;
    step4_desc: string;
    step4_list1: string;
    step4_list2: string;
    step4_list3: string;
  };

  private styleElement: HTMLStyleElement | null = null;

  // Render in light DOM so Salla styles work correctly
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
      .st-how-to-use {
        display: block;
        width: 100%;
        position: relative;
        padding: 3rem 0;
      }

      .st-how-to-use__header {
        text-align: center;
        margin-bottom: 2rem;
      }

      .st-how-to-use__title {
        font-size: 2rem;
        font-weight: 700;
        margin: 0 0 0.5rem 0;
      }

      @media (min-width: 768px) {
        .st-how-to-use__title {
          font-size: 2.5rem;
        }
      }

      .st-how-to-use__subtitle {
        font-size: 1rem;
        margin: 0;
        opacity: 0.8;
      }

      .st-how-to-use__grid {
        display: grid;
        gap: 2.5rem;
      }

      @media (min-width: 768px) {
        .st-how-to-use__grid {
          grid-template-columns: repeat(2, 1fr);
        }
      }

      @media (min-width: 1024px) {
        .st-how-to-use__grid {
          grid-template-columns: repeat(4, 1fr);
          gap: 4rem;
        }
      }

      .st-how-to-use__step {
        display: flex;
        flex-direction: column;
        gap: 1.5rem;
        justify-content: flex-start;
      }

      .st-how-to-use__step-header {
        display: flex;
        gap: 1.5rem;
        align-items: flex-start;
      }

      .st-how-to-use__step-number {
        font-weight: 700;
        font-size: 3.75rem;
        line-height: 1;
        margin-bottom: 1.25rem;
      }

      .st-how-to-use__step-line {
        max-width: 200px;
        height: auto;
        opacity: 0.3;
      }

      .st-how-to-use__step-content {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
      }

      .st-how-to-use__step-title {
        font-size: 1rem;
        font-weight: 600;
        line-height: 1;
        margin: 0 0 0.5625rem 0;
      }

      .st-how-to-use__step-desc {
        opacity: 0.6;
        margin: 0;
        font-size: 0.8125rem;
        line-height: 1.6;
      }

      .st-how-to-use__step-list {
        list-style: none;
        padding: 0;
        margin: 0.5rem 0 0 0;
        font-size: 0.8125rem;
        line-height: 1.75;
      }

      .st-how-to-use__step-list-item {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        margin-bottom: 0.5rem;
      }

      .st-how-to-use__step-list-item svg {
        width: 14px;
        height: 14px;
        flex-shrink: 0;
        color: #22c55e;
      }

      .st-how-to-use__step-list-item span {
        opacity: 0.7;
      }
    `;
    document.head.appendChild(this.styleElement);
  }

  private getSteps(): Step[] {
    if (!this.config) return [];

    return [
      {
        title: this.config.step1_title || '',
        desc: this.config.step1_desc || '',
        list: [this.config.step1_list1, this.config.step1_list2, this.config.step1_list3].filter(Boolean)
      },
      {
        title: this.config.step2_title || '',
        desc: this.config.step2_desc || '',
        list: [this.config.step2_list1, this.config.step2_list2, this.config.step2_list3].filter(Boolean)
      },
      {
        title: this.config.step3_title || '',
        desc: this.config.step3_desc || '',
        list: [this.config.step3_list1, this.config.step3_list2, this.config.step3_list3].filter(Boolean)
      },
      {
        title: this.config.step4_title || '',
        desc: this.config.step4_desc || '',
        list: [this.config.step4_list1, this.config.step4_list2, this.config.step4_list3].filter(Boolean)
      }
    ].filter(step => step.title);
  }

  private renderCheckIcon() {
    return html`
      <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
      </svg>
    `;
  }

  private renderStep(step: Step, index: number) {
    return html`
      <div class="st-how-to-use__step" data-animate="fade-up" data-delay="${300 + (index * 100)}">
        <div class="st-how-to-use__step-header">
          <strong class="st-how-to-use__step-number" data-animate="scale-in" data-delay="${350 + (index * 100)}">${index + 1}</strong>
          <img class="st-how-to-use__step-line" src="/step-line.png" alt="" data-animate="fade-right" data-delay="${400 + (index * 100)}">
        </div>
        <div class="st-how-to-use__step-content">
          <h3 class="st-how-to-use__step-title">${step.title}</h3>
          <p class="st-how-to-use__step-desc">${step.desc}</p>
          ${step.list.length > 0 ? html`
            <ul class="st-how-to-use__step-list">
              ${step.list.map((item, itemIndex) => html`
                <li class="st-how-to-use__step-list-item" data-animate="fade-up" data-delay="${450 + (index * 100) + (itemIndex * 50)}">
                  ${this.renderCheckIcon()}
                  <span>${item}</span>
                </li>
              `)}
            </ul>
          ` : ''}
        </div>
      </div>
    `;
  }

  render() {
    if (!this.config) {
      return html`<div>Configuration is required</div>`;
    }

    const bgColor = this.config.bg_color || '#ffffff';
    const textColor = this.config.text_color || '#121212';
    const subtitleColor = this.config.subtitle_color || textColor;
    const steps = this.getSteps();

    return html`
      <div
        class="st-how-to-use s-block"
        style="background-color: ${bgColor}; color: ${textColor};"
      >
        <div class="st-how-to-use__header">
          <p class="st-how-to-use__subtitle aos-animate" style="color: ${subtitleColor};" data-animate="fade-up" data-delay="0">${this.config.subtitle}</p>
          <h2 class="st-how-to-use__title" data-animate="fade-up" data-delay="150">${this.config.title}</h2>
        </div>

        <div class="container">
          <div class="st-how-to-use__grid">
            ${steps.map((step, index) => this.renderStep(step, index))}
          </div>
        </div>
      </div>
    `;
  }
}
