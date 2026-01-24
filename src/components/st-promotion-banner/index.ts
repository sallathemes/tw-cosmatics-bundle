import { html, LitElement } from "lit";
import { property, state } from "lit/decorators.js";

export default class StPromotionBanner extends LitElement {
  @property({ type: Object })
  config?: {
    bg_color: string;
    text_color: string;
    has_animated_starts_in_bg: boolean;
    date: string;
    part1_icon: string;
    part1_title: string;
    part1_subtitle: string;
    part2_icon: string;
    part2_title: string;
    part2_subtitle: string;
    banner_btn_text: string;
  };

  @state()
  private countdown = { days: 0, hours: 0, minutes: 0, seconds: 0 };

  private countdownInterval: number | null = null;
  private styleElement: HTMLStyleElement | null = null;

  // Render in light DOM so Salla styles work correctly
  createRenderRoot() {
    return this;
  }

  connectedCallback() {
    super.connectedCallback();
    this.injectStyles();
    this.startCountdown();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.styleElement?.remove();
    if (this.countdownInterval) {
      clearInterval(this.countdownInterval);
    }
  }

  injectStyles() {
    if (this.styleElement) return;

    this.styleElement = document.createElement('style');
    this.styleElement.textContent = `
      .st-promotion-banner {
        display: block;
        width: 100%;
        position: relative;
        background-size: auto;
        background-repeat: repeat;
        background-position: center -80px;
        padding: 1.5rem 0;
      }

      .st-promotion-banner__container {
        max-width: 1200px;
        margin: 0 auto;
        padding: 0 1rem;
        display: flex;
        flex-direction: column;
        gap: 2rem;
        justify-content: space-between;
        align-items: center;
      }

      @media (min-width: 1280px) {
        .st-promotion-banner__container {
          flex-direction: row;
          gap: 0;
        }
      }

      .st-promotion-banner__content-wrap {
        display: flex;
        flex-direction: column;
        gap: 2rem;
        align-items: center;
      }

      @media (min-width: 1280px) {
        .st-promotion-banner__content-wrap {
          flex-direction: row;
          gap: 0;
        }
      }

      .st-promotion-banner__content-wrap > *:not(:last-child) {
        border-left: 1px solid rgba(255, 255, 255, 0.3);
      }

      [dir="rtl"] .st-promotion-banner__content-wrap > *:not(:last-child) {
        border-left: none;
        border-right: 1px solid rgba(255, 255, 255, 0.3);
      }

      .st-promotion-banner__part {
        display: flex;
        gap: 1.25rem;
        padding: 0 2rem;
      }

      .st-promotion-banner__icon {
        font-size: 3rem;
        width: 3rem;
        height: 3rem;
        line-height: 1;
      }

      .st-promotion-banner__icon--spinning {
        animation: st-promotion-banner-spin 3s linear infinite;
      }

      @keyframes st-promotion-banner-spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
      }

      .st-promotion-banner__text {
        display: flex;
        flex-direction: column;
      }

      .st-promotion-banner__title {
        font-size: 1.25rem;
        font-weight: 700;
        line-height: 1.2;
        margin-bottom: 0.25rem;
      }

      .st-promotion-banner__subtitle {
        font-size: 1rem;
        opacity: 0.9;
        line-height: 1;
      }

      .st-promotion-banner__countdown-wrap {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 0 2rem;
      }

      .st-promotion-banner__countdown {
        display: flex;
        direction: ltr;
        gap: 0.5rem;
        align-items: center;
      }

      .st-promotion-banner__countdown-block {
        width: 32px;
        height: 42px;
        background: #fff;
        color: #fe0145;
        font-size: 1.875rem;
        font-weight: 700;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 4px;
      }

      .st-promotion-banner__countdown-separator {
        color: #fff;
        font-size: 1.5rem;
        font-weight: bold;
      }

      .st-promotion-banner__btn button {
        background: linear-gradient(to top, #facc15, #fef08a);
        color: #000;
        font-weight: 500;
        font-size: 1.25rem;
        border-radius: 30px;
        padding: 0.5rem 2.5rem;
        border: 2px solid rgba(255, 255, 255, 0.5);
        cursor: pointer;
        animation: st-promotion-banner-pulse 1s ease-in-out infinite alternate;
      }

      .st-promotion-banner__btn button:hover {
        background: linear-gradient(to top, #facc15, #facc15);
      }

      @keyframes st-promotion-banner-pulse {
        0% { transform: scale(1); }
        100% { transform: scale(1.05); }
      }
    `;
    document.head.appendChild(this.styleElement);
  }

  startCountdown() {
    const updateCountdown = () => {
      if (!this.config?.date) return;

      const targetDate = new Date(this.config.date).getTime();
      const now = new Date().getTime();
      const diff = targetDate - now;

      if (diff <= 0) {
        this.countdown = { days: 0, hours: 0, minutes: 0, seconds: 0 };
        if (this.countdownInterval) {
          clearInterval(this.countdownInterval);
        }
        return;
      }

      this.countdown = {
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((diff % (1000 * 60)) / 1000)
      };
    };

    updateCountdown();
    this.countdownInterval = window.setInterval(updateCountdown, 1000);
  }

  private formatNumber(num: number): string {
    return num.toString().padStart(2, '0');
  }

  render() {
    if (!this.config) {
      return html`<div>Configuration is required</div>`;
    }

    const bgColor = this.config.bg_color || '#000000';
    const textColor = this.config.text_color || '#ffffff';
    const hasAnimatedStars = this.config.has_animated_starts_in_bg;

    return html`
      <div
        class="st-promotion-banner"
        style="background-color: ${bgColor}; color: ${textColor}; ${hasAnimatedStars ? 'background-image: url(/banner-bar/animated-stars.gif);' : ''}"
      >
        <div class="st-promotion-banner__container">
          <div class="st-promotion-banner__content-wrap">
            <!-- Part 1 -->
            ${this.config.part1_title ? html`
              <div class="st-promotion-banner__part">
                <i class="st-promotion-banner__icon st-promotion-banner__icon--spinning ${this.config.part1_icon}"></i>
                <div class="st-promotion-banner__text">
                  <h2 class="st-promotion-banner__title">${this.config.part1_title}</h2>
                  <p class="st-promotion-banner__subtitle">${this.config.part1_subtitle}</p>
                </div>
              </div>
            ` : ''}

            <!-- Part 2 -->
            ${this.config.part2_title ? html`
              <div class="st-promotion-banner__part">
                <i class="st-promotion-banner__icon ${this.config.part2_icon}"></i>
                <div class="st-promotion-banner__text">
                  <h2 class="st-promotion-banner__title">${this.config.part2_title}</h2>
                  <p class="st-promotion-banner__subtitle">${this.config.part2_subtitle}</p>
                </div>
              </div>
            ` : ''}

            <!-- Countdown -->
            <div class="st-promotion-banner__countdown-wrap">
              <div class="st-promotion-banner__countdown">
                <span class="st-promotion-banner__countdown-block">${this.formatNumber(this.countdown.seconds)}</span>
                <span class="st-promotion-banner__countdown-separator">:</span>
                <span class="st-promotion-banner__countdown-block">${this.formatNumber(this.countdown.minutes)}</span>
                <span class="st-promotion-banner__countdown-separator">:</span>
                <span class="st-promotion-banner__countdown-block">${this.formatNumber(this.countdown.hours)}</span>
                <span class="st-promotion-banner__countdown-separator">:</span>
                <span class="st-promotion-banner__countdown-block">${this.formatNumber(this.countdown.days)}</span>
              </div>
            </div>
          </div>

          <!-- Banner Button -->
          ${this.config.banner_btn_text ? html`
            <div class="st-promotion-banner__btn">
              <button>${this.config.banner_btn_text}</button>
            </div>
          ` : ''}
        </div>
      </div>
    `;
  }
}
