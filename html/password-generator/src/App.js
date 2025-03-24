import React from 'react';
import PasswordGenerator from './passwordGenerator';
import PasswordStrength from './passwordStrength';

import './password.css';

const App = () => {
  return (
    <div className='App'>
      <h1>Password Management Tool</h1>
      <PasswordGenerator />
      <PasswordStrength />
    </div>
  );
};

export default App;