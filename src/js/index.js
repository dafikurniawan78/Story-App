// Import our custom CSS
import '../sass/main.scss';

import 'bootstrap';
import './components/story-card.js';
import './components/story-list.js';
import './components/add-story-form.js';
import './components/app-footer.js';
import './components/profil-card.js';
import './components/locale-picker.js';
 
// ==============================
// Show welcome toast on dashboard
// ==============================
document.addEventListener('DOMContentLoaded', () => {
  const toastEl = document.getElementById('liveToast');
  if (toastEl) {
    // Bootstrap tersedia via bundle setelah import 'bootstrap'
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
