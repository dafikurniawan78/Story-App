// Import our custom CSS
import '../sass/main.scss';

import './localization.js';
import 'bootstrap';
import './components/story-card.js';
import './components/story-list.js';
import './components/add-story-form.js';
import './components/app-footer.js';
import './components/app-navbar.js';
import './components/hero-section.js';
import './components/profile-card.js';
import './components/locale-picker.js';
import './components/login-form.js';
import './components/register-form.js';
import { Auth } from './utils/auth';
import './components/stories-header.js';

// ==============================
// Route Protection
// ==============================
const path = window.location.pathname;
if (path.includes('login.html') || path.includes('register.html')) {
  Auth.redirectIfAuthenticated();
} else {
  Auth.requireLogin();
}
 
// ==============================
// Logout Global Handler
// ==============================
window.logout = () => {
  Auth.clearToken();
  window.location.replace('/login.html');
};

// ==============================
// Show welcome toast on dashboard
// ==============================
document.addEventListener('DOMContentLoaded', () => {
  const toastEl = document.getElementById('liveToast');
  if (toastEl) {
    const { Toast } = window.bootstrap || {};
    if (Toast) {
      new Toast(toastEl, { delay: 3500 }).show();
    }
  }
});
 
// ==============================
// Search/filter stories
// ==============================
window.filterStories = (value) => {
  const el = document.getElementById('storyListEl');
  if (el) {
    el.filter = value;
  }
};
 
// ==============================
// Reset add-story form (dipanggil dari modal)
// ==============================
window.resetStoryForm = () => {
  const formEl = document.querySelector('add-story-form');
  if (formEl) {
    formEl.resetForm();
  }
};

// ==============================
// Manual Force Update on Locale Change
// ==============================
window.addEventListener('lit-localize-status', (event) => {
  if (event.detail.status === 'ready') {
    console.log(`Localization is ready for: ${event.detail.readyLocale}. Forcing update...`);
    const allLitElements = document.querySelectorAll('*');
    allLitElements.forEach(el => {
      if (el.requestUpdate) {
        el.requestUpdate();
      }
    });
  }
});
