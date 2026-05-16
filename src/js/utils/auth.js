const TOKEN_KEY = 'token';

export const Auth = {
  saveToken(token) {
    sessionStorage.setItem(TOKEN_KEY, token);
  },
  getToken() {
    return sessionStorage.getItem(TOKEN_KEY);
  },
  clearToken() {
    sessionStorage.removeItem(TOKEN_KEY);
  },
  isAuthenticated() {
    return !!this.getToken();
  },
  requireLogin() {
    if (!this.isAuthenticated()) {
      window.location.replace('/login.html');
    }
  },
  redirectIfAuthenticated() {
    if (this.isAuthenticated()) {
      window.location.replace('/index.html');
    }
  },
};
