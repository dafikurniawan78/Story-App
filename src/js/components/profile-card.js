import { LitElement, html, css } from 'lit';

class ProfileCard extends LitElement {
  static properties = {
    name:     { type: String },
    role:     { type: String },
    bio:      { type: String },
    github:   { type: String },
    email:    { type: String },
    imageUrl: { type: String, attribute: 'image-url' },
    _tiltX:   { type: Number, state: true },
    _tiltY:   { type: Number, state: true },
  };

  static styles = css`
    :host {
      display: block;
      perspective: 1500px;
    }

    .badge-container {
      position: relative;
      padding-top: 50px;
      display: flex;
      flex-direction: column;
      align-items: center;
      /* Animasi swing yang lebih 'kenyal' (natural) */
      animation: swing 6s cubic-bezier(0.45, 0, 0.55, 1) infinite;
      transform-origin: top center;
      transition: transform 0.5s cubic-bezier(0.23, 1, 0.32, 1);
    }

    /* Tali gantungan dengan gradasi agar terlihat bulat */
    .lanyard {
      position: absolute;
      top: -10px;
      width: 10px;
      height: 80px;
      background: linear-gradient(to right, #0a192f, #1A2E4A, #0a192f);
      border-radius: 5px;
      z-index: 1;
      box-shadow: 2px 5px 15px rgba(0,0,0,0.2);
    }

    .lanyard-clip {
      position: absolute;
      top: 60px;
      width: 28px;
      height: 24px;
      background: linear-gradient(135deg, #e0e0e0, #a0a0a0);
      border-radius: 4px;
      z-index: 5;
      box-shadow: 0 4px 8px rgba(0,0,0,0.3);
      display: flex;
      align-items: center;
      justify-content: center;
    }
    
    /* Lubang di klip */
    .lanyard-clip::after {
      content: '';
      width: 8px;
      height: 8px;
      background: #333;
      border-radius: 50%;
    }

    /* Kartu ID dengan Glassmorphism & Border Glow */
    .id-card {
      width: 300px;
      background: #ffffff;
      border-radius: 20px;
      overflow: hidden;
      box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
      border: 1.2px solid #E5E0D8;
      position: relative;
      font-family: 'Outfit', sans-serif;
      transform-style: preserve-3d;
      transition: transform 0.1s ease-out;
      backface-visibility: hidden;
    }

    /* Efek Kilauan (Glossy) dihapus agar foto jelas */

    .card-header {
      height: 100px;
      background: linear-gradient(135deg, #1A2E4A 0%, #0a192f 100%);
      position: relative;
      padding: 1.5rem;
      color: white;
    }

    .header-logo {
      font-weight: 900;
      font-size: 1.2rem;
      letter-spacing: 3px;
      opacity: 0.9;
    }
    
    .header-chip {
      position: absolute;
      right: 20px;
      top: 20px;
      width: 40px;
      height: 30px;
      background: linear-gradient(135deg, #ffd700, #b8860b);
      border-radius: 5px;
      opacity: 0.8;
    }

    .photo-area {
      margin-top: -50px;
      display: flex;
      justify-content: center;
      transform: translateZ(50px); /* 3D pop effect */
    }

    .photo-frame {
      width: 120px;
      height: 120px;
      border-radius: 50%;
      background: #fff;
      padding: 5px;
      box-shadow: 0 10px 25px rgba(0,0,0,0.2);
    }

    .photo-frame img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      object-fit: cover;
      border: 2px solid #E8631A;
      /* Optimasi ketajaman */
      image-rendering: -webkit-optimize-contrast;
      backface-visibility: hidden;
      will-change: transform;
    }

    .card-body {
      padding: 1.5rem;
      text-align: center;
      transform: translateZ(30px);
      backface-visibility: hidden;
    }

    .name {
      font-size: 1.4rem;
      font-weight: 800;
      color: #1A2E4A;
      margin: 0.5rem 0 0.1rem;
      /* Mencegah teks terlihat blur saat miring */
      -webkit-font-smoothing: antialiased;
    }

    .role {
      font-size: 0.85rem;
      font-weight: 600;
      color: #E8631A;
      text-transform: uppercase;
      letter-spacing: 2px;
      margin-bottom: 1rem;
    }

    .bio {
      font-size: 0.9rem;
      color: #4B5563;
      line-height: 1.6;
      padding: 0 10px;
    }

    .qr-area {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      margin-top: 1.5rem;
      padding: 0 1rem;
    }

    .qr-code {
      width: 50px;
      height: 50px;
      background: #fff;
      padding: 4px;
      border: 1px solid #eee;
    }

    .barcode {
      height: 30px;
      width: 120px;
      background: repeating-linear-gradient(90deg, #333 0, #333 2px, #fff 2px, #fff 4px);
      opacity: 0.7;
    }

    .card-footer {
      background: #1A2E4A;
      color: rgba(255,255,255,0.6);
      padding: 0.5rem;
      font-size: 0.6rem;
      text-transform: uppercase;
      letter-spacing: 1px;
    }

    /* Animasi Swing yang lebih luwes */
    @keyframes swing {
      0% { transform: rotate(-4deg); }
      50% { transform: rotate(4deg); }
      100% { transform: rotate(-4deg); }
    }

    /* Interaksi Mouse */
    .badge-container:hover {
      animation-play-state: paused;
    }
  `;

  constructor() {
    super();
    this._tiltX = 0;
    this._tiltY = 0;
  }

  _handleMouseMove(e) {
    const card = e.currentTarget.querySelector('.id-card');
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    this._tiltX = (y - centerY) / 10;
    this._tiltY = (centerX - x) / 10;
  }

  _handleMouseLeave() {
    this._tiltX = 0;
    this._tiltY = 0;
  }

  render() {
    return html`
      <div class="badge-container" 
           @mousemove="${this._handleMouseMove}"
           @mouseleave="${this._handleMouseLeave}">
        
        <div class="lanyard"></div>
        <div class="lanyard-clip"></div>
        
        <div class="id-card" 
             style="transform: rotateX(${this._tiltX}deg) rotateY(${this._tiltY}deg)">
          
          <div class="card-header">
            <div class="header-logo">STORYAPP</div>
            <div class="header-chip"></div>
          </div>
          
          <div class="photo-area">
            <div class="photo-frame">
              <img src="${this.imageUrl}" alt="${this.name}">
            </div>
          </div>
          
          <div class="card-body">
            <h3 class="name">${this.name}</h3>
            <p class="role">${this.role}</p>
            <p class="bio">${this.bio}</p>
            
            <div class="qr-area">
              <div class="qr-code">
                <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10 10h30v30h-30zM60 10h30v30h-30zM10 60h30v30h-30zM50 50h10v10h-10zM70 70h20v20h-20z" fill="#1A2E4A"/>
                </svg>
              </div>
              <div class="barcode"></div>
            </div>
          </div>
          
          <div class="card-footer">
            Official Developer Badge • ID #STRY-${Math.floor(Math.random()*9000)+1000}
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define('profile-card', ProfileCard);
export default ProfileCard;