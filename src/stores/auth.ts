import { defineStore } from 'pinia';
import { jwtDecode } from 'jwt-decode';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    email: '',
    token: '',
    isAuthenticated: false,
    decodedEmail: ''
  }),

  actions: {
    setEmail(newEmail: string) {
      this.email = newEmail;
    },

    setToken(newToken: string) {
      this.token = newToken;
      this.isAuthenticated = this.checkTokenValidity(newToken);
    },

    clearAuth() {
      this.email = '';
      this.token = '';
      this.isAuthenticated = false;
      this.decodedEmail = '';

      sessionStorage.clear();
    },

    checkTokenValidity(token: string): boolean {
      try {
        const decoded = jwtDecode(token);
        const currentTime = Date.now() / 1000;

        if (decoded.sub) {
          this.decodedEmail = decoded.sub;
        }

        if (decoded.exp && decoded.exp > currentTime) {
          return true;
        }

        return false;
      } catch (error) {
        console.error('Error decoding token:', error);
        return false;
      }
    }
  },
  persist: {
    storage: sessionStorage,
  }
});
