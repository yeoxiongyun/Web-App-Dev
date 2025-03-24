import React, { useState } from 'react';

const PasswordStrength = () => {
  const [password, setPassword] = useState('');
  const [strength, setStrength] = useState('');

  const evaluateStrength = (password) => {
    if (password.length === 0) {
      setStrength('');
    } else if (password.length < 6) {
      setStrength('weak');
    } else if (password.length >= 6 && password.length < 12) {
      setStrength('medium');
    } else {
      setStrength('strong');
    }
  };

  return (
    <div className='password-strength-container'>
      <h1>Password Strength Indicator</h1>

      <div className='input-box'>
        <input
          type='password'
          id='custom-password'
          placeholder='Type or copy your password here'
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            evaluateStrength(e.target.value);
          }}
        />
        <p id='message'>
          Password is <span id='strength'>{strength}</span>
        </p>
      </div>
    </div>
  );
};

export default PasswordStrength;
