import { LitElement as c, html as d } from "lit";
import { property as u, state as m } from "lit/decorators.js";
var p = Object.defineProperty, l = (n, t, s, o) => {
  for (var e = void 0, r = n.length - 1, a; r >= 0; r--)
    (a = n[r]) && (e = a(t, s, e) || e);
  return e && p(t, s, e), e;
};
class i extends c {
  constructor() {
    super(...arguments), this.email = "", this.isSubmitting = !1, this.styleElement = null;
  }
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
    `, document.head.appendChild(this.styleElement));
  }
  handleSubmit(t) {
    t.preventDefault(), !(!this.email || this.isSubmitting) && (this.isSubmitting = !0, typeof window.salla < "u" ? window.salla.newsletter.subscribe(this.email).then(() => {
      this.email = "", this.isSubmitting = !1;
    }).catch(() => {
      this.isSubmitting = !1;
    }) : setTimeout(() => {
      this.email = "", this.isSubmitting = !1;
    }, 1e3));
  }
  handleInput(t) {
    this.email = t.target.value;
  }
  render() {
    if (!this.config)
      return d`<div>Configuration is required</div>`;
    const t = this.config.bg_color || "var(--color-primary, #4f46e5)", s = this.config.text_color || "#ffffff", o = this.config.button_bg_color || "#ffffff", e = this.config.button_text_color || "var(--color-primary, #4f46e5)";
    return d`
      <div
        class="st-newsletter s-block"
        style="background-color: ${t}; color: ${s};"
      >
        <div class="st-newsletter__content">
          <h3 class="st-newsletter__title">${this.config.title || "النشرة الإخبارية"}</h3>
          <p class="st-newsletter__subtitle">${this.config.subtitle || "كن أول من يعرف عن الخصومات والعروض والأحداث"}</p>
        </div>

        <form class="st-newsletter__form" @submit="${this.handleSubmit}">
          <div class="st-newsletter__input-wrap">
            <input
              type="email"
              class="st-newsletter__input"
              placeholder="${this.config.placeholder || "ادخل ايميلك الشخصي"}"
              .value="${this.email}"
              @input="${this.handleInput}"
              required
            />
            <button
              type="submit"
              class="st-newsletter__button"
              style="background-color: ${o}; color: ${e};"
              ?disabled="${this.isSubmitting}"
            >
              ${this.isSubmitting ? "..." : this.config.button_text || "اشترك الآن"}
            </button>
          </div>
        </form>
      </div>
    `;
  }
}
l([
  u({ type: Object })
], i.prototype, "config");
l([
  m()
], i.prototype, "email");
l([
  m()
], i.prototype, "isSubmitting");
typeof i < "u" && i.registerSallaComponent("salla-st-newsletter");
export {
  i as default
};
