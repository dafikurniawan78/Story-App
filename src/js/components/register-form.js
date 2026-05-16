import { LitElement, html } from 'lit';
import { msg, updateWhenLocaleChanges } from '@lit/localize';
import api from '../network/api';

class RegisterForm extends LitElement {
  static properties = {
    name: { type: String },
    email: { type: String },
    password: { type: String },
    showPassword: { type: Boolean },
    loading: { type: Boolean },
    errorMsg: { type: String },
    successMsg: { type: String },
  };

  createRenderRoot() {
    return this;
  }

  constructor() {
    super();
    updateWhenLocaleChanges(this);
    this.name = '';
    this.email = '';
    this.password = '';
    this.showPassword = false;
    this.loading = false;
    this.errorMsg = '';
    this.successMsg = '';
  }

  _togglePassword() {
    this.showPassword = !this.showPassword;
  }

  _onInput(e) {
    this[e.target.name] = e.target.value;
    this.errorMsg = '';
  }

  async _onSubmit(e) {
    e.preventDefault();
    if (this.password.length < 8) {
      this.errorMsg = msg('Password minimal 8 karakter');
      return;
    }

    this.loading = true;
    this.errorMsg = '';
    this.successMsg = '';

    try {
      await api.post('/register', {
        name: this.name,
        email: this.email,
        password: this.password,
      });
      
      this.successMsg = msg('Akun berhasil dibuat! Silakan login.');
      // Kosongkan form
      this.name = '';
      this.email = '';
      this.password = '';
      
      setTimeout(() => {
        window.location.replace('/login.html');
      }, 2000);
      
    } catch (error) {
      this.errorMsg = error.response?.data?.message || msg('Gagal melakukan pendaftaran. Email mungkin sudah digunakan.');
    } finally {
      this.loading = false;
    }
  }

  render() {
    return html`
      <p class="auth-page__subtitle">${msg('Bergabung dan bagikan ceritamu ke dunia')}</p>
      <form @submit="${this._onSubmit}">
        ${this.errorMsg
          ? html`<div class="alert alert-danger mb-4" role="alert">
              <i class="bi bi-exclamation-triangle-fill me-2"></i> ${this.errorMsg}
            </div>`
          : ''}
          
        ${this.successMsg
          ? html`<div class="alert alert-success mb-4" role="alert">
              <i class="bi bi-check-circle-fill me-2"></i> ${this.successMsg}
            </div>`
          : ''}
          
        <div class="mb-3">
          <label for="name" class="form-label">${msg('Nama Lengkap')}</label>
          <input
            type="text"
            class="form-control custom-input"
            id="name"
            name="name"
            required
            .value="${this.name}"
            @input="${this._onInput}"
            placeholder="${msg('Nama Anda')}"
          />
        </div>

        <div class="mb-3">
          <label for="email" class="form-label">${msg('Email')}</label>
          <input
            type="email"
            class="form-control custom-input"
            id="email"
            name="email"
            required
            .value="${this.email}"
            @input="${this._onInput}"
            placeholder="nama@email.com"
          />
        </div>

        <div class="mb-4">
          <label for="password" class="form-label">${msg('Password')}</label>
          <div class="input-group">
            <input
              type="${this.showPassword ? 'text' : 'password'}"
              class="form-control custom-input"
              id="password"
              name="password"
              required
              minlength="8"
              .value="${this.password}"
              @input="${this._onInput}"
              placeholder="••••••••"
            />
            <span class="input-group-text password-toggle bg-white" @click="${this._togglePassword}">
              <i class="bi ${this.showPassword ? 'bi-eye-slash' : 'bi-eye'}"></i>
            </span>
          </div>
          <div class="form-text text-muted">${msg('Minimal 8 karakter')}</div>
        </div>

        <button type="submit" class="btn btn-primary w-100 py-3" ?disabled="${this.loading}">
          ${this.loading
            ? html`<span class="spinner-border spinner-border-sm me-2"></span>${msg('Memproses...')}`
            : msg('Daftar')}
        </button>

        <p class="text-center mt-4 mb-0 text-muted">
          ${msg('Sudah punya akun?')} <a href="/login.html" class="text-primary fw-bold text-decoration-none">${msg('Masuk di sini')}</a>
        </p>
      </form>
    `;
  }
}

customElements.define('register-form', RegisterForm);
export default RegisterForm;
