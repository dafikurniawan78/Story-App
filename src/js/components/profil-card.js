import { LitElement, html, css } from 'lit';
import { msg } from '@lit/localize';

class ProfileCard extends LitElement {
  static properties = {
    name:   { type: String },
    role:   { type: String },
    bio:    { type: String },
    github: { type: String },
    email:  { type: String },
  };
 
  // Shadow DOM aktif (default LitElement)
  static styles = css`
    :host {
      display: block;
      height: 100%;
    }
 
    .card {
      font-family: 'DM Sans', 'Segoe UI', sans-serif;
      background: #ffffff;
      border-radius: 20px;
      border: 1.5px solid #E5E0D8;
      padding: 2rem 1.5rem;
      text-align: center;
      height: 100%;
      transition: transform 0.25s ease, box-shadow 0.25s ease;
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
      box-sizing: border-box;
    }
 
    .card:hover {
      transform: translateY(-4px);
      box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
    }
 
    .avatar {
      width: 100px;
      height: 100px;
      border-radius: 50%;
      background: linear-gradient(135deg, #F5945A, #C4500E);
      display: flex;
      align-items: center;
      justify-content: center;
      font-family: 'Playfair Display', Georgia, serif;
      font-size: 2rem;
      font-weight: 700;
      color: white;
      margin: 0 auto 1.25rem;
      box-shadow: 0 8px 24px rgba(232, 99, 26, 0.3);
    }
 
    .name {
      font-family: 'Playfair Display', Georgia, serif;
      font-size: 1.25rem;
      font-weight: 700;
      color: #1A1A1A;
      margin: 0 0 0.25rem;
    }
 
    .role {
      font-size: 0.75rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      color: #E8631A;
      margin: 0 0 1rem;
    }
 
    .bio {
      font-size: 0.875rem;
      color: #6B7280;
      line-height: 1.7;
      margin: 0 0 1.25rem;
    }
 
    .socials {
      display: flex;
      justify-content: center;
      gap: 0.75rem;
      flex-wrap: wrap;
    }
 
    .social-btn {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      background: #F8F6F2;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #6B7280;
      text-decoration: none;
      font-size: 1rem;
      transition: all 0.25s ease;
      border: none;
      cursor: pointer;
    }
 
    .social-btn:hover {
      background: #E8631A;
      color: white;
      transform: translateY(-2px);
    }
 
    /* SVG icons inline karena bootstrap-icons tidak bisa diakses di shadow DOM */
    .icon-github::before  { content: '⌨'; }
    .icon-email::before   { content: '✉'; }
    .icon-linkedin::before { content: 'in'; font-size: 0.75rem; font-weight: 700; }
    .icon-twitter::before { content: '✕'; font-weight: 700; }
  `;
 
  _getInitials(name) {
    if (!name) return 'D';
    const parts = name.trim().split(' ');
    return parts.length >= 2
      ? (parts[0][0] + parts[1][0]).toUpperCase()
      : parts[0].slice(0, 2).toUpperCase();
  }
 
  render() {
    const initials = this._getInitials(this.name);
 
    return html`
      <div class="card">
        <div class="avatar">${initials}</div>
        <h3 class="name">${this.name || msg('Developer')}</h3>
        <p class="role">${this.role || msg('Team Member')}</p>
        <p class="bio">${this.bio || msg('Member dari tim StoryApp yang berdedikasi tinggi.')}</p>
        <div class="socials">
          ${this.github
            ? html`<a class="social-btn" href="${this.github}" target="_blank" rel="noopener" title="GitHub">
                <span class="icon-github"></span>
              </a>`
            : ''}
          ${this.email
            ? html`<a class="social-btn" href="mailto:${this.email}" title="Email">
                <span class="icon-email"></span>
              </a>`
            : ''}
          <a class="social-btn" href="#" title="LinkedIn">
            <span class="icon-linkedin"></span>
          </a>
          <a class="social-btn" href="#" title="Twitter/X">
            <span class="icon-twitter"></span>
          </a>
        </div>
      </div>
    `;
  }
}
 
customElements.define('profile-card', ProfileCard);
export default ProfileCard;