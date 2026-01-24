import { LitElement as p, html as r } from "lit";
import { property as d, state as m } from "lit/decorators.js";
var b = Object.defineProperty, l = (a, t, o, i) => {
  for (var n = void 0, e = a.length - 1, c; e >= 0; e--)
    (c = a[e]) && (n = c(t, o, n) || n);
  return n && b(t, o, n), n;
};
class s extends p {
  constructor() {
    super(...arguments), this.countdown = { days: 0, hours: 0, minutes: 0, seconds: 0 }, this.countdownInterval = null, this.styleElement = null;
  }
  // Render in light DOM so Salla styles work correctly
  createRenderRoot() {
    return this;
  }
  connectedCallback() {
    super.connectedCallback(), this.injectStyles(), this.startCountdown();
  }
  disconnectedCallback() {
    var t;
    super.disconnectedCallback(), (t = this.styleElement) == null || t.remove(), this.countdownInterval && clearInterval(this.countdownInterval);
  }
  injectStyles() {
    this.styleElement || (this.styleElement = document.createElement("style"), this.styleElement.textContent = `
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
    `, document.head.appendChild(this.styleElement));
  }
  startCountdown() {
    const t = () => {
      var e;
      if (!((e = this.config) != null && e.date)) return;
      const o = new Date(this.config.date).getTime(), i = (/* @__PURE__ */ new Date()).getTime(), n = o - i;
      if (n <= 0) {
        this.countdown = { days: 0, hours: 0, minutes: 0, seconds: 0 }, this.countdownInterval && clearInterval(this.countdownInterval);
        return;
      }
      this.countdown = {
        days: Math.floor(n / 864e5),
        hours: Math.floor(n % 864e5 / 36e5),
        minutes: Math.floor(n % 36e5 / 6e4),
        seconds: Math.floor(n % 6e4 / 1e3)
      };
    };
    t(), this.countdownInterval = window.setInterval(t, 1e3);
  }
  formatNumber(t) {
    return t.toString().padStart(2, "0");
  }
  render() {
    if (!this.config)
      return r`<div>Configuration is required</div>`;
    const t = this.config.bg_color || "#000000", o = this.config.text_color || "#ffffff", i = this.config.has_animated_starts_in_bg;
    return r`
      <div
        class="st-promotion-banner"
        style="background-color: ${t}; color: ${o}; ${i ? "background-image: url(/banner-bar/animated-stars.gif);" : ""}"
      >
        <div class="st-promotion-banner__container">
          <div class="st-promotion-banner__content-wrap">
            <!-- Part 1 -->
            ${this.config.part1_title ? r`
              <div class="st-promotion-banner__part">
                <i class="st-promotion-banner__icon st-promotion-banner__icon--spinning ${this.config.part1_icon}"></i>
                <div class="st-promotion-banner__text">
                  <h2 class="st-promotion-banner__title">${this.config.part1_title}</h2>
                  <p class="st-promotion-banner__subtitle">${this.config.part1_subtitle}</p>
                </div>
              </div>
            ` : ""}

            <!-- Part 2 -->
            ${this.config.part2_title ? r`
              <div class="st-promotion-banner__part">
                <i class="st-promotion-banner__icon ${this.config.part2_icon}"></i>
                <div class="st-promotion-banner__text">
                  <h2 class="st-promotion-banner__title">${this.config.part2_title}</h2>
                  <p class="st-promotion-banner__subtitle">${this.config.part2_subtitle}</p>
                </div>
              </div>
            ` : ""}

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
          ${this.config.banner_btn_text ? r`
            <div class="st-promotion-banner__btn">
              <button>${this.config.banner_btn_text}</button>
            </div>
          ` : ""}
        </div>
      </div>
    `;
  }
}
l([
  d({ type: Object })
], s.prototype, "config");
l([
  m()
], s.prototype, "countdown");
typeof s < "u" && s.registerSallaComponent("salla-st-promotion-banner");
export {
  s as default
};
