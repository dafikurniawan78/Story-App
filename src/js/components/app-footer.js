import { LitElement, html } from 'lit';
import { msg } from '@lit/localize';

class AppFooter extends LitElement {
  createRenderRoot() {
    return this;
  }
 
  render() {
    const year = new Date().getFullYear();
    return html`
      <footer class="app-footer">
        <div class="container">
          <div class="app-footer__grid">
            <!-- Brand -->
            <div>
              <h5 class="app-footer__brand-name">Story<span>App</span></h5>
              <p class="app-footer__desc">
                ${msg('Platform berbagi cerita dan momen berharga bersama teman dan keluarga. Abadikan setiap kenangan indah dalam sebuah story.')}
              </p>
              <div class="app-footer__social">
                <a href="#" aria-label="Instagram"><i class="bi bi-instagram"></i></a>
                <a href="#" aria-label="Twitter"><i class="bi bi-twitter-x"></i></a>
                <a href="#" aria-label="Facebook"><i class="bi bi-facebook"></i></a>
                <a href="#" aria-label="YouTube"><i class="bi bi-youtube"></i></a>
              </div>
            </div>
 
            <!-- Navigasi -->
            <div>
              <h6 class="app-footer__col-title">${msg('Navigasi')}</h6>
              <ul class="app-footer__links">
                <li><a href="index.html">${msg('Beranda')}</a></li>
                <li><a href="add-story.html">${msg('Tambah Story')}</a></li>
                <li><a href="about.html">${msg('Tentang Kami')}</a></li>
              </ul>
            </div>
 
            <!-- Informasi -->
            <div>
              <h6 class="app-footer__col-title">${msg('Informasi')}</h6>
              <ul class="app-footer__links">
                <li><a href="#">${msg('Kebijakan Privasi')}</a></li>
                <li><a href="#">${msg('Syarat & Ketentuan')}</a></li>
                <li><a href="#">${msg('Hubungi Kami')}</a></li>
                <li><a href="#">FAQ</a></li>
              </ul>
            </div>
          </div>
 
          <div class="app-footer__divider"></div>
 
          <div class="app-footer__bottom">
            <p>&copy; ${year} StoryApp. ${msg('Dibuat dengan')} <i class="bi bi-heart-fill text-danger"></i> ${msg('untuk berbagi cerita.')}</p>
            <p>${msg('Dibangun dengan Bootstrap 5, Lit 3 & Sass')}</p>
          </div>
        </div>
      </footer>
    `;
  }
}
 
customElements.define('app-footer', AppFooter);
export default AppFooter;