import { LitElement, html } from 'lit';
import { msg, updateWhenLocaleChanges } from '@lit/localize';
import { Auth } from '../utils/auth';

class AppNavbar extends LitElement {
  static properties = {
    activePage: { type: String },
    _scrolled: { type: Boolean, state: true },
  };

  createRenderRoot() {
    return this;
  }

  constructor() {
    super();
    updateWhenLocaleChanges(this);
    this.activePage = 'index';
    this._scrolled = false;
    this._handleScroll = this._handleScroll.bind(this);
  }

  connectedCallback() {
    super.connectedCallback();
    window.addEventListener('scroll', this._handleScroll);
  }

  disconnectedCallback() {
    window.removeEventListener('scroll', this._handleScroll);
    super.disconnectedCallback();
  }

  _handleScroll() {
    this._scrolled = window.scrollY > 20;
  }

  _onLogout(e) {
    e.preventDefault();
    Auth.clearToken();
    window.location.replace('/login.html');
  }

  render() {
    console.log(`Rendering AppNavbar. Current msg('Beranda') is: ${msg('Beranda')}`);
    return html`
      <!-- OFFCANVAS NAVIGATION -->
      <div class="offcanvas offcanvas-start offcanvas-story" tabindex="-1" id="offcanvasNav">
        <div class="offcanvas-story__header offcanvas-header">
          <h5 class="offcanvas-title offcanvas-story__title"><i class="bi bi-camera-reels-fill me-2"></i>StoryApp</h5>
          <button type="button" class="btn-close" data-bs-dismiss="offcanvas"></button>
        </div>
        <div class="offcanvas-story__body offcanvas-body d-flex flex-column">
          <ul class="offcanvas-story__nav">
            <li>
              <a href="index.html" class="${this.activePage === 'index' ? 'active' : ''}">
                <i class="bi bi-house-door-fill"></i> ${msg('Beranda')}
              </a>
            </li>
            <li>
              <a href="add-story.html" class="${this.activePage === 'add-story' ? 'active' : ''}">
                <i class="bi bi-plus-circle-fill"></i> ${msg('Tambah Story')}
              </a>
            </li>
            <li>
              <a href="about.html" class="${this.activePage === 'about' ? 'active' : ''}">
                <i class="bi bi-people-fill"></i> ${msg('Tentang Kami')}
              </a>
            </li>
          </ul>
          <div class="offcanvas-story__divider"></div>
          <ul class="offcanvas-story__nav">
            <li><a href="#"><i class="bi bi-shield-lock-fill"></i> ${msg('Kebijakan Privasi')}</a></li>
            <li><a href="#"><i class="bi bi-question-circle-fill"></i> ${msg('Bantuan')}</a></li>
            <li>
              <a href="javascript:void(0)" @click="${this._onLogout}">
                <i class="bi bi-box-arrow-right text-danger"></i> ${msg('Keluar')}
              </a>
            </li>
          </ul>
          <div class="mt-auto offcanvas-story__footer">
            <locale-picker theme="dark" class="mb-3 d-block"></locale-picker>
            <p>StoryApp &copy; 2024</p>
          </div>
        </div>
      </div>

      <!-- NAVBAR -->
      <nav class="app-navbar ${this._scrolled ? 'scrolled' : ''}">
        <a class="app-navbar__brand" href="index.html">
          <div class="app-navbar__brand-icon"><i class="bi bi-camera-reels-fill"></i></div>
          <span class="app-navbar__brand-text">Story<span>App</span></span>
        </a>
        <div class="app-navbar__actions">
          <button class="app-navbar__menu-btn" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNav">
            <i class="bi bi-list"></i> ${msg('Menu')}
          </button>
          <locale-picker theme="light" class="d-none d-sm-inline-block me-2"></locale-picker>
          
          ${this.activePage === 'add-story'
            ? html`
                <a class="app-navbar__add-btn" href="index.html">
                  <i class="bi bi-house-fill"></i><span class="d-none d-sm-inline"> ${msg('Beranda')}</span>
                </a>
              `
            : html`
                <a class="app-navbar__add-btn" href="add-story.html">
                  <i class="bi bi-plus-lg"></i><span class="d-none d-sm-inline"> ${msg('Tambah Story')}</span>
                </a>
              `}
              
          <button class="btn btn-outline-danger btn-sm rounded-pill ms-2 d-none d-sm-inline-block" @click="${this._onLogout}">
            <i class="bi bi-box-arrow-right"></i>
          </button>
        </div>
      </nav>
    `;
  }
}

customElements.define('app-navbar', AppNavbar);
export default AppNavbar;
