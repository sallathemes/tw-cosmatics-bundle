import { LitElement as c, html as i } from "lit";
import { property as a } from "lit/decorators.js";
var p = Object.defineProperty, d = (r, t, s, l) => {
  for (var e = void 0, o = r.length - 1, n; o >= 0; o--)
    (n = r[o]) && (e = n(t, s, e) || e);
  return e && p(t, s, e), e;
};
class h extends c {
  constructor() {
    super(...arguments), this.styleElement = null;
  }
  // Render in light DOM so Salla styles work correctly
  createRenderRoot() {
    return this;
  }
  connectedCallback() {
    super.connectedCallback(), this.injectStyles();
  }
  disconnectedCallback() {
    var t;
    super.disconnectedCallback(), (t = this.styleElement) == null || t.remove();
  }
  injectStyles() {
    this.styleElement || (this.styleElement = document.createElement("style"), this.styleElement.textContent = `
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
        font-size: 1.25rem;
        font-weight: 500;
        line-height: 1;
        margin: 0;
      }

      .st-how-to-use__step-desc {
        opacity: 0.6;
        margin: 0;
        font-size: 0.95rem;
        line-height: 1.6;
      }

      .st-how-to-use__step-list {
        list-style: none;
        padding: 0;
        margin: 0.5rem 0 0 0;
        font-size: 0.875rem;
        line-height: 1.75;
      }

      .st-how-to-use__step-list-item {
        display: flex;
        align-items: center;
        gap: 0.5rem;
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
    `, document.head.appendChild(this.styleElement));
  }
  getSteps() {
    return this.config ? [
      {
        title: this.config.step1_title || "",
        desc: this.config.step1_desc || "",
        list: [this.config.step1_list1, this.config.step1_list2, this.config.step1_list3].filter(Boolean)
      },
      {
        title: this.config.step2_title || "",
        desc: this.config.step2_desc || "",
        list: [this.config.step2_list1, this.config.step2_list2, this.config.step2_list3].filter(Boolean)
      },
      {
        title: this.config.step3_title || "",
        desc: this.config.step3_desc || "",
        list: [this.config.step3_list1, this.config.step3_list2, this.config.step3_list3].filter(Boolean)
      },
      {
        title: this.config.step4_title || "",
        desc: this.config.step4_desc || "",
        list: [this.config.step4_list1, this.config.step4_list2, this.config.step4_list3].filter(Boolean)
      }
    ].filter((t) => t.title) : [];
  }
  renderCheckIcon() {
    return i`
      <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
      </svg>
    `;
  }
  renderStep(t, s) {
    return i`
      <div class="st-how-to-use__step">
        <div class="st-how-to-use__step-header">
          <strong class="st-how-to-use__step-number">${s + 1}</strong>
          <svg class="st-how-to-use__step-line" viewBox="0 0 200 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <line x1="0" y1="10" x2="200" y2="10" stroke="currentColor" stroke-width="2" stroke-dasharray="8 4"/>
          </svg>
        </div>
        <div class="st-how-to-use__step-content">
          <h3 class="st-how-to-use__step-title">${t.title}</h3>
          <p class="st-how-to-use__step-desc">${t.desc}</p>
          ${t.list.length > 0 ? i`
            <ul class="st-how-to-use__step-list">
              ${t.list.map((l) => i`
                <li class="st-how-to-use__step-list-item">
                  ${this.renderCheckIcon()}
                  <span>${l}</span>
                </li>
              `)}
            </ul>
          ` : ""}
        </div>
      </div>
    `;
  }
  render() {
    if (!this.config)
      return i`<div>Configuration is required</div>`;
    const t = this.config.bg_color || "#ffffff", s = this.config.text_color || "#121212", l = this.config.subtitle_color || s, e = this.getSteps();
    return i`
      <div
        class="st-how-to-use s-block"
        style="background-color: ${t}; color: ${s};"
      >
        <div class="st-how-to-use__header">
          <h2 class="st-how-to-use__title">${this.config.title}</h2>
          <p class="st-how-to-use__subtitle" style="color: ${l};">${this.config.subtitle}</p>
        </div>

        <div class="container">
          <div class="st-how-to-use__grid">
            ${e.map((o, n) => this.renderStep(o, n))}
          </div>
        </div>
      </div>
    `;
  }
}
d([
  a({ type: Object })
], h.prototype, "config");
typeof h < "u" && h.registerSallaComponent("salla-st-how-to-use");
export {
  h as default
};
