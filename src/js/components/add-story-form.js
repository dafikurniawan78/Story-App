import { LitElement, html } from 'lit';
import { msg, str } from '@lit/localize';
import { bootstrap } from 'bootstrap';

class AddStoryForm extends LitElement {
  static properties = {
    description:  { type: String, state: true },
    photoFile:    { type: Object, state: true },
    photoPreview: { type: String, state: true },
    submitting:   { type: Boolean, state: true },
    errors:       { type: Object, state: true },
    charCount:    { type: Number, state: true },
    dragOver:     { type: Boolean, state: true },
  };
 
  createRenderRoot() {
    return this;
  }
 
  constructor() {
    super();
    this.description  = '';
    this.photoFile    = null;
    this.photoPreview = '';
    this.submitting   = false;
    this.errors       = {};
    this.charCount    = 0;
    this.dragOver     = false;
  }
 
  _MAX_CHARS = 500;
 
  _validate() {
    const errs = {};
    if (!this.description.trim()) {
      errs.description = msg('Deskripsi tidak boleh kosong.');
    } else if (this.description.trim().length < 10) {
      errs.description = msg('Deskripsi minimal 10 karakter.');
    } else if (this.description.length > this._MAX_CHARS) {
      errs.description = msg(str`Deskripsi maksimal ${this._MAX_CHARS} karakter.`);
    }
    if (!this.photoFile) {
      errs.photo = msg('Foto wajib diunggah.');
    }
    return errs;
  }
 
  _onDescriptionInput(e) {
    this.description = e.target.value;
    this.charCount   = e.target.value.length;
    if (this.errors.description) {
      const errs = { ...this.errors };
      delete errs.description;
      this.errors = errs;
    }
  }
 
  _onPhotoChange(e) {
    const file = e.target.files?.[0];
    this._handleFile(file);
  }
 
  _handleFile(file) {
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      this.errors = { ...this.errors, photo: msg('File harus berupa gambar (JPG, PNG, WEBP).') };
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      this.errors = { ...this.errors, photo: msg('Ukuran file maksimal 5MB.') };
      return;
    }
    this.photoFile = file;
    const reader   = new FileReader();
    reader.onload  = (ev) => { this.photoPreview = ev.target.result; };
    reader.readAsDataURL(file);
    const errs = { ...this.errors };
    delete errs.photo;
    this.errors = errs;
  }
 
  _onDragOver(e) { e.preventDefault(); this.dragOver = true; }
  _onDragLeave()  { this.dragOver = false; }
  _onDrop(e) {
    e.preventDefault();
    this.dragOver = false;
    this._handleFile(e.dataTransfer?.files?.[0]);
  }
 
  _removePhoto() {
    this.photoFile    = null;
    this.photoPreview = '';
  }
 
  async _onSubmit(e) {
    e.preventDefault();
    const errs = this._validate();
    if (Object.keys(errs).length > 0) {
      this.errors = errs;
      return;
    }
    this.submitting = true;
    // Simulasi submit untuk aplikasi statis
    await new Promise((r) => setTimeout(r, 1500));
    this.submitting = false;
    // Tampilkan Bootstrap modal sukses
    const modalEl = document.getElementById('successModal');
    if (modalEl && window.bootstrap) {
      new window.bootstrap.Modal(modalEl).show();
    }
  }
 
  resetForm() {
    this.description  = '';
    this.photoFile    = null;
    this.photoPreview = '';
    this.errors       = {};
    this.charCount    = 0;
  }
 
  _getCharClass() {
    if (this.charCount > this._MAX_CHARS) return 'danger';
    if (this.charCount > this._MAX_CHARS * 0.85) return 'warning';
    return '';
  }
 
  render() {
    const hasDescError  = !!this.errors.description;
    const hasPhotoError = !!this.errors.photo;
    const charClass     = this._getCharClass();
 
    return html`
      <form novalidate @submit="${this._onSubmit}">
 
        <!-- Deskripsi -->
        <div class="form-field">
          <label class="form-field__label" for="description">
            ${msg('Deskripsi')} <span class="required">*</span>
          </label>
          <textarea
            id="description"
            class="custom-input ${hasDescError ? 'is-invalid' : this.description ? 'is-valid' : ''}"
            placeholder="${msg('Ceritakan pengalamanmu yang menarik…')}"
            .value="${this.description}"
            @input="${this._onDescriptionInput}"
            rows="6"
          ></textarea>
          <div class="char-count ${charClass}">
            ${this.charCount} / ${this._MAX_CHARS}
          </div>
          ${hasDescError
            ? html`<div class="invalid-feedback d-block mt-1">
                <i class="bi bi-exclamation-circle me-1"></i>${this.errors.description}
               </div>`
            : ''}
          <p class="form-field__hint">
            <i class="bi bi-info-circle me-1"></i>
            ${msg(str`Minimal 10 karakter, maksimal ${this._MAX_CHARS} karakter.`)}
          </p>
        </div>
 
        <!-- Foto -->
        <div class="form-field">
          <label class="form-field__label">
            ${msg('Foto')} <span class="required">*</span>
          </label>
          <div
            class="photo-upload ${this.dragOver ? 'drag-over' : ''} ${this.photoFile ? 'has-file' : ''} ${hasPhotoError ? 'border-danger' : ''}"
            @dragover="${this._onDragOver}"
            @dragleave="${this._onDragLeave}"
            @drop="${this._onDrop}"
          >
            <input
              type="file"
              accept="image/*"
              class="photo-upload__input"
              @change="${this._onPhotoChange}"
            />
            ${this.photoPreview
              ? html`
                  <div class="photo-upload__preview">
                    <img src="${this.photoPreview}" alt="${msg('Preview foto')}" />
                  </div>
                  <div class="photo-upload__file-name">
                    <i class="bi bi-check-circle-fill text-success"></i>
                    ${this.photoFile?.name}
                    <button
                      type="button"
                      class="btn btn-sm btn-outline-danger ms-2"
                      @click="${(e) => { e.stopPropagation(); this._removePhoto(); }}"
                    >
                      <i class="bi bi-x-lg"></i>
                    </button>
                  </div>
                `
              : html`
                  <div class="photo-upload__icon"><i class="bi bi-cloud-upload"></i></div>
                  <p class="photo-upload__title">${msg('Klik atau seret foto ke sini')}</p>
                  <p class="photo-upload__subtitle">${msg('JPG, PNG, WEBP • Maks. 5MB')}</p>
                `}
          </div>
          ${hasPhotoError
            ? html`<div class="invalid-feedback d-block mt-1">
                <i class="bi bi-exclamation-circle me-1"></i>${this.errors.photo}
               </div>`
            : ''}
        </div>
 
        <!-- Actions -->
        <div class="form-actions">
          <a href="index.html" class="form-actions__cancel">
            <i class="bi bi-arrow-left me-1"></i> ${msg('Kembali')}
          </a>
          <button type="submit" class="form-actions__submit" ?disabled="${this.submitting}">
            ${this.submitting
              ? html`<span class="spinner-border spinner-border-sm me-2"></span>${msg('Mengunggah…')}`
              : html`<i class="bi bi-send-fill me-1"></i>${msg('Publikasikan Story')}`}
          </button>
        </div>
      </form>
    `;
  }
}
 
customElements.define('add-story-form', AddStoryForm);
export default AddStoryForm;