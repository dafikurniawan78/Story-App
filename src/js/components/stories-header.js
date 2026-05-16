import { LitElement, html } from 'lit';
import { msg, updateWhenLocaleChanges } from '@lit/localize';

class StoriesHeader extends LitElement {
  constructor() {
    super();
    updateWhenLocaleChanges(this);
  }

  createRenderRoot() {
    return this;
  }

  _onSearch(e) {
    if (window.filterStories) {
      window.filterStories(e.target.value);
    }
  }

  render() {
    return html`
      <div class="section-header">
        <div>
          <h2 class="section-header__title">${msg(html`Semua <span>Stories</span>`)}</h2>
          <p class="section-header__subtitle"><i class="bi bi-clock me-1"></i>${msg('Diperbarui secara berkala')}</p>
        </div>
        <div class="d-flex align-items-center gap-3 flex-wrap">
          <div class="input-group input-group-sm" style="width:220px;">
            <span class="input-group-text bg-white border-end-0"><i class="bi bi-search text-muted"></i></span>
            <input type="text" id="searchInput" class="form-control border-start-0 ps-0" placeholder="${msg('Cari story...')}" @input="${this._onSearch}" />
          </div>
          <div class="dropdown">
            <button class="btn btn-outline-secondary btn-sm dropdown-toggle rounded-pill" type="button" data-bs-toggle="dropdown">
              <i class="bi bi-filter me-1"></i>${msg('Filter')}
            </button>
            <ul class="dropdown-menu dropdown-menu-end shadow-sm border-0 rounded-3">
              <li><h6 class="dropdown-header">${msg('Urutkan')}</h6></li>
              <li><a class="dropdown-item" href="#">${msg('Terbaru')}</a></li>
              <li><a class="dropdown-item" href="#">${msg('Terlama')}</a></li>
              <li><hr class="dropdown-divider"></li>
              <li><a class="dropdown-item" href="#">${msg('A-Z')}</a></li>
            </ul>
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define('stories-header', StoriesHeader);
export default StoriesHeader;
