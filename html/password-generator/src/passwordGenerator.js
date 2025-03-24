import React, { useState } from 'react';


const upperCase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const lowerCase = 'abcdefghijklmnopqrstuvwxyz';
const numbers = '0123456789';
const symbols = '!@#$%^&*()_-+=<>?/[]{}|';


const PasswordGenerator = () => {
  const [password, setPassword] = useState('');
  const [length, setLength] = useState(16);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);

  const handleGeneratePassword = () => {
    let allCharacters = '';
    if (includeUppercase) allCharacters += upperCase;
    if (includeLowercase) allCharacters += lowerCase;
    if (includeNumbers) allCharacters += numbers;
    if (includeSymbols) allCharacters += symbols;

    if (allCharacters === '') {
      alert('Please select at least one character type!');
      return;
    }

    let generatedPassword = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * allCharacters.length);
      generatedPassword += allCharacters[randomIndex];
    }
    setPassword(generatedPassword);
  };

  return (
    <div className='container'>
      <div className='display'>
        <input
          type='text'
          id='password'
          value={password}
          readOnly
          placeholder='Password'
        />
        <img src='password.png' alt='Password Icon' />
      </div>

      <button onClick={handleGeneratePassword}>
        <img src='generate.png' alt='Generate Icon' /> Generate Password
      </button>

      <h2> Modify Password Requirements</h2>
      <label className='length'>
        Length of Password:
        <input
          type='range'
          id='password-length'
          min='1'
          max='100'
          value={length}
          onChange={(e) => setLength(e.target.value)}
        />
        <span id='length-value'>{length}</span>
      </label>

      <label className='custom-checkbox'>
        <input
          type='checkbox'
          checked={includeUppercase}
          onChange={() => setIncludeUppercase(!includeUppercase)}
        />
        <span></span> {/* Custom checkbox */}
        Uppercase Letters
      </label>
      <label className='custom-checkbox'>
        <input
          type='checkbox'
          checked={includeLowercase}
          onChange={() => setIncludeLowercase(!includeLowercase)}
        />
        <span></span> {/* Custom checkbox */}
        Lowercase Letters
      </label>
      <label className='custom-checkbox'>
        <input
          type='checkbox'
          checked={includeNumbers}
          onChange={() => setIncludeNumbers(!includeNumbers)}
        />
        <span></span> {/* Custom checkbox */}
        Numbers
      </label>
      <label className='custom-checkbox'>
        <input
          type='checkbox'
          checked={includeSymbols}
          onChange={() => setIncludeSymbols(!includeSymbols)}
        />
        <span></span> {/* Custom checkbox */}
        Symbols
      </label>
    </div>
  );
};

export default PasswordGenerator;
