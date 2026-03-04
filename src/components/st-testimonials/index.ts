import { html, LitElement } from "lit";
import { property } from "lit/decorators.js";
import AOS from "../../utils/animate-on-scroll";

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
      /* Main testimonials section */
      .st-testimonials {
        display: block;
        width: 100%;
        overflow: hidden;
        background-color: #f9fafb; /* bg-base-50 */
        padding: 1.25rem 0; /* py-5 */
        padding-bottom: 4rem !important; /* !pb-16 */
      }

      @media (min-width: 640px) {
        .st-testimonials {
          padding: 3rem 0; /* sm:py-12 */
          padding-bottom: 4rem !important; /* !pb-16 */
        }
      }

      /* Title styling */
      .st-testimonials__title {
        font-size: 2rem;
        font-weight: bold;
        margin-bottom: 0.5rem;
        text-align: center;
        color: #111827;
      }

      @media (min-width: 768px) {
        .st-testimonials__title {
          font-size: 2.5rem;
        }
      }

      .st-testimonials__subtitle {
        font-size: 1rem;
        color: #6b7280;
        text-align: center;
        margin-bottom: 2rem; /* mb-8 */
      }

      /* Slider wrapper */
      .st-testimonials__slider-wrapper {
        margin-bottom: 2.5rem; /* mb-10 */
        position: relative;
      }

      /* Testimonials slider */
      .testimonials-slider {
        padding: 1.25rem 0; /* py-5 */
        position: relative;
      }

      /* Swiper slide */
      .st-testimonials__slide {
        height: auto; /* h-auto */
        width: 100%; /* w-full */
        padding: 0 0.125rem; /* px-[5px] */
      }

      @media (min-width: 640px) {
        .st-testimonials__slide {
          width: 50%; /* sm:w-1/2 */
          padding: 0 0.625rem; /* sm:px-2.5 */
        }
      }

      /* Card styling - NO BOX SHADOW */
      .st-testimonials__card {
        background-color: #ffffff; /* bg-background */
        border-radius: 1rem; /* rounded-2xl */
        padding: 1.25rem; /* p-5 */
        display: flex; /* flex */
        flex-direction: column; /* flex-col */
        justify-content: center; /* justify-center */
        align-items: center; /* items-center */
        gap: 1.25rem; /* gap-5 */
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); /* transition-all duration-300 */
        height: 100%;
        /* NO box-shadow as per requirement */
      }

      @media (min-width: 768px) {
        .st-testimonials__card {
          flex-direction: row; /* md:flex-row */
        }
      }

      .st-testimonials__card:hover {
        transform: translateY(-0.25rem); /* hover:-translate-y-1 */
      }

      /* Header section */
      .st-testimonials__header {
        display: flex; /* flex */
        align-items: center; /* items-center */
        gap: 0.5rem; /* space-x-2 rtl:space-x-reverse */
        position: relative; /* relative */
        flex-shrink: 0; /* shrink-0 */
      }

      /* Avatar image - exact match to landing repo */
      .st-testimonials__avatar {
        position: relative; /* relative */
        object-fit: cover; /* object-cover */
        height: 5rem; /* h-20 */
        width: 5rem; /* w-20 */
        border-radius: 50%; /* rounded-full */
        background-color: #f9fafb; /* bg-base-50 */
        display: block;
      }

      @media (min-width: 768px) {
        .st-testimonials__avatar {
          height: 12.5rem; /* md:h-[200px] */
          width: 12.5rem; /* md:w-[200px] */
          border-radius: 1rem; /* md:rounded-2xl */
        }
      }

      /* Content section */
      .st-testimonials__content {
        height: 100%; /* h-full */
        display: flex; /* flex */
        flex-direction: column; /* flex-col */
        flex: 1;
      }

      /* Rating section - SMALL STARS with GOLDEN COLOR */
      .st-testimonials__rating {
        margin-bottom: 0.5rem; /* mb-2 */
        display: flex; /* flex */
        justify-content: center; /* justify-center */
      }

      @media (min-width: 768px) {
        .st-testimonials__rating {
          justify-content: flex-start; /* md:justify-start */
        }
      }

      /* Custom star styling - small golden stars */
      .st-testimonials__rating salla-rating-stars {
        font-size: 0.875rem; /* Small size */
        --rating-star-size: 16px; /* Small stars */
        --rating-star-color: #fbbf24; /* Golden color */
        --rating-star-active-color: #f59e0b; /* Active golden */
        --rating-star-inactive-color: #e5e7eb; /* Gray inactive */
      }

      /* Text content */
      .st-testimonials__text {
        line-height: 1.5; /* leading-6 */
        margin-top: 0; /* mt-0 */
        color: #6b7280; /* text-base-600 */
        margin-bottom: 1rem; /* mb-4 */
        text-align: center; /* text-center */
        font-size: 1rem;
      }

      @media (min-width: 768px) {
        .st-testimonials__text {
          margin-top: 1rem; /* md:mt-4 */
          text-align: start; /* md:text-start */
        }
      }

      /* Name styling */
      .st-testimonials__name {
        font-size: 0.75rem; /* text-xs */
        color: #4f46e5; /* text-primary */
        text-align: center; /* text-center */
        margin: 0;
      }

      @media (min-width: 640px) {
        .st-testimonials__name {
          font-size: 1rem; /* sm:text-base */
        }
      }

      @media (min-width: 768px) {
        .st-testimonials__name {
          text-align: start; /* md:text-start */
        }
      }

      /* Swiper customizations */
      .testimonials-slider .swiper-slide {
        height: auto !important;
        display: flex !important;
      }

      .testimonials-slider .swiper-slide > div {
        height: 100%;
        width: 100%;
      }

      /* Navigation arrows - clean style, proper positioning */
      .testimonials-slider .swiper-button-next,
      .testimonials-slider .swiper-button-prev {
        color: #6b7280 !important; /* Gray color */
        background: white !important;
        border-radius: 50% !important;
        width: 44px !important;
        height: 44px !important;
        margin-top: -22px !important; /* Center vertically */
        border: 1px solid #e5e7eb !important;
        /* NO box-shadow as per requirement */
        transition: all 0.2s ease !important;
      }

      .testimonials-slider .swiper-button-next::after,
      .testimonials-slider .swiper-button-prev::after {
        font-size: 18px !important;
        font-weight: bold !important;
      }

      .testimonials-slider .swiper-button-next:hover,
      .testimonials-slider .swiper-button-prev:hover {
        color: #4f46e5 !important;
        border-color: #4f46e5 !important;
      }

      /* Position arrows properly */
      .testimonials-slider .swiper-button-prev {
        left: 10px !important;
      }

      .testimonials-slider .swiper-button-next {
        right: 10px !important;
      }

      /* REMOVE pagination dots completely */
      .testimonials-slider .swiper-pagination {
        display: none !important;
      }

      /* Hide pagination bullets */
      .testimonials-slider .swiper-pagination-bullet {
        display: none !important;
      }
    `;
    document.head.appendChild(this.styleElement);
  }

  private getTestimonials() {
    if (!this.config) return [];

    return [
      {
        name: this.config.testimonial1_name || 'خالد النعماني مكة المكرمة',
        content: this.config.testimonial1_content || 'هو كريم ترطيب جيد. إنه ليس سيئاً، لكنه ليس رائقاً أيضاً',
        avatar: this.config.testimonial1_avatar,
        rating: this.config.testimonial1_rating || 5
      },
      {
        name: this.config.testimonial2_name || 'سارة العتيبي',
        content: this.config.testimonial2_content || 'تجربة شراء مميزة، المنتج وصل بحالة ممتازة.',
        avatar: this.config.testimonial2_avatar,
        rating: this.config.testimonial2_rating || 5
      },
      {
        name: this.config.testimonial3_name || 'أحمد السالم',
        content: this.config.testimonial3_content || 'جودة عالية وسعر مناسب، سأطلب مرة أخرى بالتأكيد.',
        avatar: this.config.testimonial3_avatar,
        rating: this.config.testimonial3_rating || 5
      },
      {
        name: this.config.testimonial4_name || 'فاطمة النور',
        content: this.config.testimonial4_content || 'خدمة عملاء ممتازة ومنتج يستحق التجربة.',
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
      <section
        class="st-testimonials s-block s-block--testimonials s-block--fullwidth overflow-hidden"
        style="background-color: ${bgColor}; color: ${textColor};"
        id="testimonials-slider-${this.instanceId}"
      >
        <div class="container">
          <!-- Title Component -->
          <div class="text-center mb-8">
            <h2 class="st-testimonials__title">${this.config.title || 'أصوات حقيقية، تجارب ملهمة'}</h2>
            <p class="st-testimonials__subtitle">${this.config.subtitle || 'شاهد تجارب عملائنا و رأيهم حول منتجنا'}</p>
          </div>

          <div class="st-testimonials__slider-wrapper">
            <salla-slider
              type="carousel"
              class="testimonials-slider py-5"
              auto-play
              navigation="true"
              loop="true"
              slides-per-view="1"
              slides-per-view-tablet="2"
              space-between="10"
              id="testimonials-${this.instanceId}-slider"
            >
              <div slot="items">
                ${testimonials.map((item, index) => html`
                  <div 
                    class="swiper-slide st-testimonials__slide" 
                    data-aos="fade-up" 
                    data-aos-delay="${150 * index}"
                  >
                    <div class="st-testimonials__card">
                      <header class="st-testimonials__header">
                        <img
                          class="st-testimonials__avatar"
                          src="${item.avatar}"
                          alt="${item.name}"
                          width="70"
                          height="70"
                          loading="lazy"
                        />
                      </header>
                      <div class="st-testimonials__content">
                        <div class="st-testimonials__rating">
                          <salla-rating-stars value="${item.rating}"></salla-rating-stars>
                        </div>
                        <p class="st-testimonials__text">${item.content}</p>
                        <h4 class="st-testimonials__name">${item.name}</h4>
                      </div>
                    </div>
                  </div>
                `)}
              </div>
            </salla-slider>
          </div>
        </div>
      </section>
    `;
  }
}