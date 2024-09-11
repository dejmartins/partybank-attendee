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
      }
  
    } catch (error) {
      console.error('Sign-In error:', error);
    }
  };
  