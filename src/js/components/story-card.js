import { LitElement, html } from 'lit';
import { msg, str } from '@lit/localize';
 
class StoryCard extends LitElement {
  static properties = {
    storyId:     { type: String, attribute: 'story-id' },
    name:        { type: String },
    description: { type: String },
    photoUrl:    { type: String, attribute: 'photo-url' },
    createdAt:   { type: String, attribute: 'created-at' },
    liked:       { type: Boolean, state: true },
  };

  constructor() {
    super();
    this.liked = false;
  }
 
  // Nonaktifkan shadow DOM
  createRenderRoot() {
    return this;
  }
 
  _getInitial(name) {
    if (!name) return '?';
    const parts = name.trim().split(' ');
    return parts.length >= 2
      ? (parts[0][0] + parts[1][0]).toUpperCase()
      : parts[0].slice(0, 2).toUpperCase();
  }
 
  _formatDate(isoString) {
    if (!isoString) return '-';
    const date = new Date(isoString);
    // Saran 4: Format tanggal agar mudah dibaca (JavaScript)
    return date.toLocaleDateString('id-ID', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }
 
  _truncate(text, max = 120) {
    if (!text) return '';
    return text.length > max ? text.slice(0, max) + '…' : text;
  }
 
  _toggleLike() {
    this.liked = !this.liked;
  }
 
  _showFeatureAlert(feature) {
    window.alert(msg(str`Fitur ${feature} akan segera hadir!`));
  }
 
  render() {
    const initials = this._getInitial(this.name);
    const dateStr  = this._formatDate(this.createdAt);
    const desc     = this._truncate(this.description);
 
    return html`
      <div class="story-card h-100">
        <div class="story-card__image-wrap">
          <img
            src="${this.photoUrl || 'https://picsum.photos/800/450?random=0'}"
            alt="${msg(str`Story oleh ${this.name}`)}"
            loading="lazy"
          />
          <span class="story-card__badge">
            <i class="bi bi-camera-fill me-1"></i>Story
          </span>
        </div>
 
        <div class="story-card__body">
          <div class="story-card__author">
            <div class="story-card__author-info">
              <div class="story-card__avatar">${initials}</div>
              <div class="story-card__author-text">
                <div class="story-card__author-name">${this.name || msg('Anonim')}</div>
                <div class="story-card__date">
                  <i class="bi bi-calendar3 me-1"></i>${dateStr}
                </div>
              </div>
            </div>
          </div>
 
          <p class="story-card__description">${desc}</p>
 
          <div class="story-card__footer">
            <div class="story-card__actions">
              <button class="story-card__action-btn" title="${msg('Suka')}" @click="${this._toggleLike}">
                <i class="bi ${this.liked ? 'bi-heart-fill text-danger' : 'bi-heart'}"></i>
              </button>
              <button class="story-card__action-btn" title="${msg('Komentar')}" @click="${() => this._showFeatureAlert('Komentar')}">
                <i class="bi bi-chat"></i>
              </button>
              <button class="story-card__action-btn" title="${msg('Bagikan')}" @click="${() => this._showFeatureAlert('Bagikan')}">
                <i class="bi bi-share"></i>
              </button>
            </div>
            <button class="story-card__read-btn" @click="${() => this._showFeatureAlert('Baca Selengkapnya')}">
              ${msg('Baca')} <i class="bi bi-arrow-right ms-1"></i>
            </button>
          </div>
        </div>
      </div>
    `;
  }
}
 
customElements.define('story-card', StoryCard);
export default StoryCard;