import { LitElement, html } from 'lit';
import { msg } from '@lit/localize';

class HeroSection extends LitElement {
  createRenderRoot() {
    return this;
  }

  render() {
    return html`
      <section class="hero">
        <div class="container">
          <div class="hero__inner">
            <div class="row align-items-center g-5">
              <div class="col-lg-7">
                <div class="hero__tag"><i class="bi bi-stars"></i> ${msg('Platform Cerita Digital')}</div>
                <h1 class="hero__title">Bagikan <span>Momentmu</span><br />kepada Dunia</h1>
                <p class="hero__subtitle">
                  ${msg('StoryApp adalah tempat terbaik untuk mengabadikan dan berbagi cerita berharga bersama orang-orang terdekat. Setiap momen layak dikenang.')}
                </p>
                <div class="hero__cta">
                  <a href="add-story.html" class="hero__btn-primary"><i class="bi bi-plus-circle-fill"></i> ${msg('Mulai Bercerita')}</a>
                  <a href="#stories" class="hero__btn-secondary"><i class="bi bi-arrow-down-circle"></i> ${msg('Jelajahi Stories')}</a>
                </div>
                <div class="hero__stats">
                  <div class="hero__stat"><div class="hero__stat-number">9+</div><div class="hero__stat-label">${msg('Stories Aktif')}</div></div>
                  <div class="hero__stat"><div class="hero__stat-number">100%</div><div class="hero__stat-label">${msg('Gratis')}</div></div>
                  <div class="hero__stat"><div class="hero__stat-number">&#8734;</div><div class="hero__stat-label">${msg('Kenangan')}</div></div>
                </div>
              </div>
              <div class="col-lg-5 d-none d-lg-flex flex-column gap-3">
                <div class="hero-feature">
                  <div class="hero-feature__icon"><i class="bi bi-images"></i></div>
                  <div><div class="hero-feature__title">${msg('Foto Berkualitas')}</div><div class="hero-feature__desc">${msg('Upload foto hingga 5MB')}</div></div>
                  <span class="badge rounded-pill ms-auto" style="background:#F5C842;color:#1A2E4A;">${msg('Baru')}</span>
                </div>
                <div class="hero-feature">
                  <div class="hero-feature__icon"><i class="bi bi-people-fill"></i></div>
                  <div><div class="hero-feature__title">${msg('Komunitas Aktif')}</div><div class="hero-feature__desc">${msg('Terhubung dengan sesama')}</div></div>
                </div>
                <div class="hero-feature">
                  <div class="hero-feature__icon"><i class="bi bi-shield-check-fill"></i></div>
                  <div><div class="hero-feature__title">${msg('Privasi Terjaga')}</div><div class="hero-feature__desc">${msg('Data Anda aman bersama kami')}</div></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    `;
  }
}

customElements.define('hero-section', HeroSection);
export default HeroSection;
