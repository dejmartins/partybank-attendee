import { defineStore } from 'pinia';
import { jwtDecode } from 'jwt-decode';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    email: '',
    firstName: '',
    lastName: '',
    phoneNumber: '',
    token: '',
    isAuthenticated: false,
    decodedEmail: ''
  }),

  actions: {
    setEmail(newEmail: string) {
      this.email = newEmail;
    },

    setFirstName(newFirstName: string) {
      this.firstName = newFirstName;
    },

    setLastName(newLastName: string) {
      this.lastName = newLastName;
    },

    setPhoneNumber(newNumber: string) {
      this.phoneNumber = newNumber;
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
        const { username, firstName, lastName, phoneNumber, exp } = decoded;

        if (decoded.sub) {
          this.decodedEmail = username;
          this.firstName = firstName;
          this.lastName = lastName;
          this.phoneNumber = phoneNumber;

          console.log(firstName)

          const userData = {
            firstName: firstName,
            lastName: lastName,
            phoneNumber: phoneNumber
          };

          sessionStorage.setItem('userData', JSON.stringify(userData));
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
