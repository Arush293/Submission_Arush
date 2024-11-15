import React, { useState } from 'react';

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleRequestReset = () => {
    // Logic to send password reset email can be added here
    setMessage('Password reset link has been sent to your email.');
  };

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-2xl">Forgot Password</h1>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
        className="border p-2 mb-4"
      />
      <button onClick={handleRequestReset} className="bg-blue-500 text-white p-2">
        Request Password Reset
      </button>
      {message && <p className="text-green-500">{message}</p>}
    </div>
  );
};

export default ForgotPassword;
