import { LitElement, html, css } from 'lit';
import { allLocales } from '../generated/locale-codes.js';
import { getLocale, setLocale } from '../localization.js';

class LocalePicker extends LitElement {
  static properties = {
    _currentLocale: { type: String, state: true }
  };

  static styles = css`
    :host {
      display: inline-block;
    }
    
    .locale-select {
      background: rgba(255, 255, 255, 0.1);
      border: 1px solid rgba(255, 255, 255, 0.2);
      color: #333;
      padding: 0.375rem 2rem 0.375rem 0.75rem;
      font-size: 0.875rem;
      border-radius: 50rem;
      appearance: none;
      background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath fill='none' stroke='%23333' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='m2 5 6 6 6-6'/%3E%3C/svg%3E");
      background-repeat: no-repeat;
      background-position: right 0.75rem center;
      background-size: 16px 12px;
      cursor: pointer;
      font-family: inherit;
    }

    /* Style for light background contexts */
    :host([theme="light"]) .locale-select {
      background-color: white;
      color: #333;
      border-color: #dee2e6;
    }

    /* Style for dark background contexts (like navbar/footer) */
    :host([theme="dark"]) .locale-select {
      background-color: rgba(255, 255, 255, 0.1);
      color: white;
      border-color: rgba(255, 255, 255, 0.3);
      background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath fill='none' stroke='%23fff' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='m2 5 6 6 6-6'/%3E%3C/svg%3E");
    }
    
    .locale-select:focus {
      outline: none;
      box-shadow: 0 0 0 0.25rem rgba(232, 99, 26, 0.25);
      border-color: #E8631A;
    }
    
    .locale-select option {
      color: #333;
      background: white;
    }
  `;

  constructor() {
    super();
    this._currentLocale = getLocale();
  }

  _localeChanged(e) {
    const newLocale = e.target.value;
    if (newLocale !== this._currentLocale) {
      this._currentLocale = newLocale;
      setLocale(newLocale);
    }
  }

  _getLocaleName(code) {
    const names = {
      'id': '🇮🇩 Indonesia',
      'en': '🇺🇸 English',
      'es': '🇪🇸 Español'
    };
    return names[code] || code;
  }

  render() {
    return html`
      <select class="locale-select" @change=${this._localeChanged} .value=${this._currentLocale}>
        ${allLocales.map(
          (locale) => html`
            <option value=${locale}>
              ${this._getLocaleName(locale)}
            </option>
          `
        )}
      </select>
    `;
  }
}

customElements.define('locale-picker', LocalePicker);
export default LocalePicker;
