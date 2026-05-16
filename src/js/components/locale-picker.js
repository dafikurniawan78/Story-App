import { LitElement, html } from 'lit';
import { updateWhenLocaleChanges } from '@lit/localize';
import { allLocales } from '../generated/locale-codes.js';
import { getLocale, changeLocale } from '../localization.js';

class LocalePicker extends LitElement {
  static properties = {
    _currentLocale: { type: String, state: true },
    _open: { type: Boolean, state: true },
    theme: { type: String, reflect: true }
  };

  createRenderRoot() {
    return this;
  }

  constructor() {
    super();
    updateWhenLocaleChanges(this);
    this._currentLocale = getLocale();
    this._open = false;
    this.theme = 'dark';
    this._closeMenu = this._closeMenu.bind(this);
  }

  connectedCallback() {
    super.connectedCallback();
    window.addEventListener('click', this._closeMenu);
  }

  disconnectedCallback() {
    window.removeEventListener('click', this._closeMenu);
    super.disconnectedCallback();
  }

  _closeMenu() {
    this._open = false;
  }

  _toggleMenu(e) {
    e.stopPropagation();
    this._open = !this._open;
  }

  _selectLocale(locale) {
    if (locale !== this._currentLocale) {
      this._currentLocale = locale;
      changeLocale(locale);
    }
    this._open = false;
  }

  _getLocaleData(code) {
    const data = {
      'id': { name: 'Indonesia', flag: '🇮🇩' },
      'en': { name: 'English', flag: '🇺🇸' },
      'es': { name: 'Español', flag: '🇪🇸' }
    };
    return data[code] || { name: code, flag: '🌐' };
  }

  render() {
    const current = this._getLocaleData(this._currentLocale);

    return html`
      <div class="locale-picker-custom ${this.theme}">
        <div class="locale-picker-custom__trigger" @click=${this._toggleMenu}>
          <span class="flag">${current.flag}</span>
          <span class="name">${current.name}</span>
          <span class="arrow ${this._open ? 'open' : ''}"><i class="bi bi-chevron-down"></i></span>
        </div>
        
        <div class="locale-picker-custom__menu ${this._open ? 'show' : ''}">
          ${allLocales.map(locale => {
            const item = this._getLocaleData(locale);
            return html`
              <div class="locale-picker-custom__item ${locale === this._currentLocale ? 'active' : ''}" 
                   @click=${() => this._selectLocale(locale)}>
                <span class="flag">${item.flag}</span>
                <span>${item.name}</span>
              </div>
            `;
          })}
        </div>
      </div>
    `;
  }
}

customElements.define('locale-picker', LocalePicker);
export default LocalePicker;
