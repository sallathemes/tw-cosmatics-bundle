import { LitElement as c, html as i } from "lit";
import { property as f } from "lit/decorators.js";
var _ = Object.defineProperty, g = (r, e, n, a) => {
  for (var o = void 0, s = r.length - 1, t; s >= 0; s--)
    (t = r[s]) && (o = t(e, n, o) || o);
  return o && _(e, n, o), o;
};
class l extends c {
  constructor() {
    super(...arguments), this.styleElement = null;
  }
  createRenderRoot() {
    return this;
  }
  connectedCallback() {
    super.connectedCallback(), this.injectStyles();
  }
  disconnectedCallback() {
    var e;
    super.disconnectedCallback(), (e = this.styleElement) == null || e.remove();
  }
  injectStyles() {
    this.styleElement || (this.styleElement = document.createElement("style"), this.styleElement.textContent = `
      .st-footer {
        display: block;
        width: 100%;
      }

      .st-footer__main {
        padding: 3rem 0;
        text-align: center;
      }

      @media (min-width: 640px) {
        .st-footer__main {
          padding: 3.5rem 0;
        }
      }

      .st-footer__logo {
        max-width: 200px;
        height: auto;
        margin: 0 auto 1.5rem;
      }

      .st-footer__description {
        max-width: 36rem;
        margin: 0 auto 2.5rem;
        opacity: 0.7;
        line-height: 1.7;
      }

      .st-footer__nav {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        gap: 1rem 2rem;
        margin-bottom: 2rem;
      }

      .st-footer__nav-link {
        font-size: 0.875rem;
        opacity: 0.8;
        text-decoration: none;
        transition: opacity 0.2s;
        color: inherit;
      }

      .st-footer__nav-link:hover {
        opacity: 1;
      }

      .st-footer__social {
        display: flex;
        justify-content: center;
        gap: 1.5rem;
        margin-top: 2rem;
      }

      .st-footer__social-link {
        width: 24px;
        height: 24px;
        opacity: 0.6;
        transition: opacity 0.2s;
        color: inherit;
      }

      .st-footer__social-link:hover {
        opacity: 1;
      }

      .st-footer__social-link i {
        font-size: 1.5rem;
      }

      .st-footer__meta {
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
        gap: 1.5rem 3rem;
        padding: 2rem 0;
        border-top: 1px solid rgba(128, 128, 128, 0.1);
      }

      .st-footer__meta-item {
        display: flex;
        align-items: center;
        gap: 1rem;
        text-decoration: none;
        color: inherit;
      }

      .st-footer__meta-image {
        height: 42px;
        width: auto;
        object-fit: contain;
      }

      .st-footer__meta-text {
        text-align: start;
      }

      .st-footer__meta-subtitle {
        font-size: 0.75rem;
        opacity: 0.7;
        margin: 0;
      }

      .st-footer__meta-title {
        font-weight: 700;
        margin: 0;
      }

      .st-footer__bottom {
        background: var(--color-base-50, #f9fafb);
        padding: 1.25rem 0;
        font-size: 0.875rem;
        opacity: 0.7;
      }

      .st-footer__bottom-inner {
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        gap: 0.5rem;
      }
    `, document.head.appendChild(this.styleElement));
  }
  getNavLinks() {
    return this.config ? [
      { text: this.config.nav1_text, url: this.config.nav1_url },
      { text: this.config.nav2_text, url: this.config.nav2_url },
      { text: this.config.nav3_text, url: this.config.nav3_url },
      { text: this.config.nav4_text, url: this.config.nav4_url },
      { text: this.config.nav5_text, url: this.config.nav5_url }
    ].filter((e) => e.text) : [];
  }
  getSocialLinks() {
    return this.config ? [
      { icon: "sicon-facebook", url: this.config.facebook_url },
      { icon: "sicon-instagram", url: this.config.instagram_url },
      { icon: "sicon-twitter", url: this.config.twitter_url },
      { icon: "sicon-youtube", url: this.config.youtube_url },
      { icon: "sicon-snapchat", url: this.config.snapchat_url },
      { icon: "sicon-tiktok", url: this.config.tiktok_url }
    ].filter((e) => e.url) : [];
  }
  getMetaItems() {
    return this.config ? [
      {
        image: this.config.meta1_image,
        title: this.config.meta1_title,
        subtitle: this.config.meta1_subtitle,
        url: this.config.meta1_url
      },
      {
        image: this.config.meta2_image,
        title: this.config.meta2_title,
        subtitle: this.config.meta2_subtitle,
        url: this.config.meta2_url
      }
    ].filter((e) => e.image || e.title) : [];
  }
  render() {
    if (!this.config)
      return i`<div>Configuration is required</div>`;
    const e = this.config.bg_color || "#ffffff", n = this.config.text_color || "#121212", a = this.getNavLinks(), o = this.getSocialLinks(), s = this.getMetaItems();
    return i`
      <footer
        class="st-footer s-block s-block--fullwidth"
        style="background-color: ${e}; color: ${n};"
      >
        <div class="container">
          <div class="st-footer__main">
            ${this.config.logo ? i`
              <img
                src="${this.config.logo}"
                alt="Logo"
                class="st-footer__logo"
              />
            ` : ""}

            ${this.config.description ? i`
              <p class="st-footer__description">${this.config.description}</p>
            ` : ""}

            ${a.length > 0 ? i`
              <nav class="st-footer__nav">
                ${a.map((t) => i`
                  <a href="${t.url || "#"}" class="st-footer__nav-link">${t.text}</a>
                `)}
              </nav>
            ` : ""}

            ${o.length > 0 ? i`
              <div class="st-footer__social">
                ${o.map((t) => i`
                  <a href="${t.url}" target="_blank" rel="noopener" class="st-footer__social-link">
                    <i class="${t.icon}"></i>
                  </a>
                `)}
              </div>
            ` : ""}
          </div>

          ${s.length > 0 ? i`
            <div class="st-footer__meta">
              ${s.map((t) => i`
                <a
                  href="${t.url || "#"}"
                  target="${t.url ? "_blank" : "_self"}"
                  rel="noopener"
                  class="st-footer__meta-item"
                >
                  ${t.image ? i`
                    <img src="${t.image}" alt="${t.title}" class="st-footer__meta-image" />
                  ` : ""}
                  <div class="st-footer__meta-text">
                    ${t.subtitle ? i`<p class="st-footer__meta-subtitle">${t.subtitle}</p>` : ""}
                    ${t.title ? i`<p class="st-footer__meta-title">${t.title}</p>` : ""}
                  </div>
                </a>
              `)}
            </div>
          ` : ""}
        </div>

        <div class="st-footer__bottom">
          <div class="container">
            <div class="st-footer__bottom-inner">
              <span>${this.config.copyright_text || "© جميع الحقوق محفوظة"}</span>
              <span>${this.config.powered_by_text || "صنع بإتقان على منصة سلة"}</span>
            </div>
          </div>
        </div>
      </footer>
    `;
  }
}
g([
  f({ type: Object })
], l.prototype, "config");
typeof l < "u" && l.registerSallaComponent("salla-st-footer");
export {
  l as default
};
