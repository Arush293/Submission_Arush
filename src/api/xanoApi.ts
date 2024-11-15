// src/api/xanoApi.ts

export const loginUser = async (email: string, password: string) => {
  const response = await fetch('https://x8ki-letl-twmt.n7.xano.io/api:JK7UWNZj/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    return null; // Or handle the error accordingly
  }

  return response.json();
};

export const submitForm = async (formData: any) => {
  const response = await fetch('YOUR_XANO_FORM_SUBMISSION_ENDPOINT', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  });

  if (!response.ok) {
    throw new Error('Failed to submit form');
  }

  return response.json();
};
