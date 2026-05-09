import { LitElement, html } from 'lit';
import { msg, str } from '@lit/localize';
import './story-card.js';
 
class StoryList extends LitElement {
  static properties = {
    stories: { type: Array, state: true },
    loading: { type: Boolean, state: true },
    error:   { type: String, state: true },
    filter:  { type: String },
  };
 
  // Nonaktifkan shadow DOM
  createRenderRoot() {
    return this;
  }
 
  constructor() {
    super();
    this.stories = [];
    this.loading = true;
    this.error   = '';
    this.filter  = '';
  }
 
  connectedCallback() {
    super.connectedCallback();
    this._fetchStories();
  }
 
  async _fetchStories() {
    this.loading = true;
    try {
      const res  = await fetch('data/DATA.json');
      const json = await res.json();
      if (!json.error && Array.isArray(json.listStory)) {
        this.stories = json.listStory;
      } else {
        this.error = json.message || msg('Gagal memuat data.');
      }
    } catch (e) {
      this.error = msg('Tidak dapat memuat data. Pastikan file data/DATA.json tersedia.');
    } finally {
      this.loading = false;
    }
  }
 
  get _filteredStories() {
    if (!this.filter) return this.stories;
    const q = this.filter.toLowerCase();
    return this.stories.filter(
      (s) =>
        s.name.toLowerCase().includes(q) ||
        s.description.toLowerCase().includes(q)
    );
  }
 
  _renderLoading() {
    return html`
      <div class="col-12 text-center py-5">
        <div class="spinner-border text-warning" style="width:3rem;height:3rem;" role="status">
          <span class="visually-hidden">${msg('Memuat...')}</span>
        </div>
        <p class="mt-3 text-muted">${msg('Memuat stories…')}</p>
      </div>
    `;
  }
 
  _renderError() {
    return html`
      <div class="col-12">
        <div class="alert alert-story alert-danger d-flex align-items-center gap-3" role="alert">
          <i class="bi bi-exclamation-triangle-fill fs-4"></i>
          <div>
            <strong>${msg('Oops!')}</strong> ${this.error}
            <button class="btn btn-sm btn-outline-danger ms-3" @click="${this._fetchStories}">
              ${msg('Coba lagi')}
            </button>
          </div>
        </div>
      </div>
    `;
  }
 
  _renderEmpty() {
    return html`
      <div class="col-12">
        <div class="empty-state">
          <div class="empty-state__icon"><i class="bi bi-journal-x"></i></div>
          <h4 class="empty-state__title">${msg('Tidak ada story ditemukan')}</h4>
          <p>${msg('Coba ubah kata pencarian atau tambahkan story baru.')}</p>
        </div>
      </div>
    `;
  }
 
  render() {
    if (this.loading) {
      return html`<div class="row g-4">${this._renderLoading()}</div>`;
    }
    if (this.error) {
      return html`<div class="row g-4">${this._renderError()}</div>`;
    }
 
    const list = this._filteredStories;
    if (list.length === 0) {
      return html`<div class="row g-4">${this._renderEmpty()}</div>`;
    }
 
    return html`
      <div class="row row-cols-1 row-cols-md-2 row-cols-xl-3 g-4">
        ${list.map(
          (story) => html`
            <div class="col">
              <story-card
                story-id="${story.id}"
                name="${story.name}"
                description="${story.description}"
                photo-url="${story.photoUrl}"
                created-at="${story.createdAt}"
              ></story-card>
            </div>
          `
        )}
      </div>
    `;
  }
}
 
customElements.define('story-list', StoryList);
export default StoryList;
