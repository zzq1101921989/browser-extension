import React, { useState, useEffect } from 'react';
import './index.css';

const OptionsApp: React.FC = () => {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    chrome.storage.sync.get(['theme'], (result) => {
      setTheme(result.theme || 'light');
    });
  }, []);

  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme);
    chrome.storage.sync.set({ theme: newTheme });
  };

  return (
    <div className={`options-container ${theme}`}>
      <h1>Extension Options</h1>
      <div className="theme-selector">
        <label>
          <input
            type="radio"
            name="theme"
            checked={theme === 'light'}
            onChange={() => handleThemeChange('light')}
          />
          Light Theme
        </label>
        <label>
          <input
            type="radio"
            name="theme"
            checked={theme === 'dark'}
            onChange={() => handleThemeChange('dark')}
          />
          Dark Theme
        </label>
      </div>
    </div>
  );
};

export default OptionsApp;