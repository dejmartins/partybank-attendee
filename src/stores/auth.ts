import { defineStore } from 'pinia';
import { jwtDecode } from 'jwt-decode';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    email: '',
    name: '',
    token: '',
    isAuthenticated: false,
    decodedEmail: ''
  }),

  actions: {
    setEmail(newEmail: string) {
      this.email = newEmail;
    },

    setName(newName: string) {
      this.name = newName;
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

        console.log('decoded', decoded)
        // @ts-ignore
        const { username, fullName, exp } = decoded;

        if (decoded.sub) {
          this.decodedEmail = username;
          this.name = fullName;
        }

        if (exp && exp > currentTime) {
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
