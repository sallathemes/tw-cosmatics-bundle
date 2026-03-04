import { html, LitElement } from "lit";
import { property } from "lit/decorators.js";
import AOS from "../../utils/animate-on-scroll";

export default class StFooter extends LitElement {
  @property({ type: Object })
  config?: {
    logo: string;
    description: string;
    bg_color: string;
    text_color: string;
    nav1_text: string;
    nav1_url: string;
    nav2_text: string;
    nav2_url: string;
    nav3_text: string;
    nav3_url: string;
    nav4_text: string;
    nav4_url: string;
    nav5_text: string;
    nav5_url: string;
    facebook_url: string;
    instagram_url: string;
    twitter_url: string;
    youtube_url: string;
    snapchat_url: string;
    tiktok_url: string;
    meta1_image: string;
    meta1_title: string;
    meta1_subtitle: string;
    meta1_url: string;
    meta2_image: string;
    meta2_title: string;
    meta2_subtitle: string;
    meta2_url: string;
    copyright_text: string;
    powered_by_text: string;
  };

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
    `;
    document.head.appendChild(this.styleElement);
  }

  private getNavLinks() {
    if (!this.config) return [];
    return [
      { text: this.config.nav1_text, url: this.config.nav1_url },
      { text: this.config.nav2_text, url: this.config.nav2_url },
      { text: this.config.nav3_text, url: this.config.nav3_url },
      { text: this.config.nav4_text, url: this.config.nav4_url },
      { text: this.config.nav5_text, url: this.config.nav5_url },
    ].filter(link => link.text);
  }

  private getSocialLinks() {
    if (!this.config) return [];
    return [
      { icon: 'sicon-facebook', url: this.config.facebook_url },
      { icon: 'sicon-instagram', url: this.config.instagram_url },
      { icon: 'sicon-twitter', url: this.config.twitter_url },
      { icon: 'sicon-youtube', url: this.config.youtube_url },
      { icon: 'sicon-snapchat', url: this.config.snapchat_url },
      { icon: 'sicon-tiktok', url: this.config.tiktok_url },
    ].filter(link => link.url);
  }

  private getMetaItems() {
    if (!this.config) return [];
    return [
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
      },
    ].filter(item => item.image || item.title);
  }

  render() {
    if (!this.config) {
      return html`<div>Configuration is required</div>`;
    }

    const bgColor = this.config.bg_color || '#ffffff';
    const textColor = this.config.text_color || '#121212';
    const navLinks = this.getNavLinks();
    const socialLinks = this.getSocialLinks();
    const metaItems = this.getMetaItems();

    return html`
      <footer
        class="st-footer s-block s-block--fullwidth"
        style="background-color: ${bgColor}; color: ${textColor};"
      >
        <div class="container">
          <div class="st-footer__main">
            ${this.config.logo ? html`
              <img
                src="${this.config.logo}"
                alt="Logo"
                class="st-footer__logo"
                data-animate="fade-up"
                data-delay="0"
              />
            ` : ''}

            ${this.config.description ? html`
              <p class="st-footer__description" data-animate="fade-up" data-delay="150">${this.config.description}</p>
            ` : ''}

            ${navLinks.length > 0 ? html`
              <nav class="st-footer__nav" data-animate="fade-up" data-delay="300">
                ${navLinks.map((link, index) => html`
                  <a href="${link.url || '#'}" class="st-footer__nav-link" data-animate="fade-up" data-delay="${350 + (index * 50)}">${link.text}</a>
                `)}
              </nav>
            ` : ''}

            ${socialLinks.length > 0 ? html`
              <div class="st-footer__social" data-animate="fade-up" data-delay="500">
                ${socialLinks.map((link, index) => html`
                  <a href="${link.url}" target="_blank" rel="noopener" class="st-footer__social-link" data-animate="scale-in" data-delay="${550 + (index * 50)}">
                    <i class="${link.icon}"></i>
                  </a>
                `)}
              </div>
            ` : ''}
          </div>

          ${metaItems.length > 0 ? html`
            <div class="st-footer__meta" data-animate="fade-up" data-delay="600">
              ${metaItems.map((item, index) => html`
                <a
                  href="${item.url || '#'}"
                  target="${item.url ? '_blank' : '_self'}"
                  rel="noopener"
                  class="st-footer__meta-item"
                  data-animate="fade-${index === 0 ? 'left' : 'right'}"
                  data-delay="${650 + (index * 100)}"
                >
                  ${item.image ? html`
                    <img src="${item.image}" alt="${item.title}" class="st-footer__meta-image" data-animate="scale-in" data-delay="${700 + (index * 100)}" />
                  ` : ''}
                  <div class="st-footer__meta-text">
                    ${item.subtitle ? html`<p class="st-footer__meta-subtitle">${item.subtitle}</p>` : ''}
                    ${item.title ? html`<p class="st-footer__meta-title">${item.title}</p>` : ''}
                  </div>
                </a>
              `)}
            </div>
          ` : ''}
        </div>

        <div class="st-footer__bottom">
          <div class="container">
            <div class="st-footer__bottom-inner">
              <span data-animate="fade-right" data-delay="800">${this.config.copyright_text || '© جميع الحقوق محفوظة'}</span>
              <span data-animate="fade-left" data-delay="850">${this.config.powered_by_text || 'صنع بإتقان على منصة سلة'}</span>
            </div>
          </div>
        </div>
      </footer>
    `;
  }
}
