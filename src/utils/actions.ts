export const handleSignIn = async (email: string, AUTH: string, emit: any, authStore: any) => {
    try {
      const response = await fetch(AUTH, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
        }),
      });
  
      const data = await response.json();

      console.log(data)
  
      if (response.ok) {
        emit('close')
        emit('emailSent');
        authStore.setEmail(email);
        localStorage.setItem('email', email);
      }
  
    } catch (error) {
      console.error('Sign-In error:', error);
    }
  };
  
  
export const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

export const isValidPhoneNumber = (phoneNumber: string): boolean => {
    const phoneRegex = /^\+?\d{10,12}$/;
    return phoneRegex.test(phoneNumber);
};

export function formatAmountWithCommas(amount: number | string) {
  if(amount){
    return amount.toLocaleString();
  }
}

export function formatPhoneNumber(phoneNumber: string) {
  let cleaned = phoneNumber.replace(/\D/g, '');

  if (cleaned.startsWith('0')) {
      return cleaned;
  }

  return '0' + cleaned;
}
