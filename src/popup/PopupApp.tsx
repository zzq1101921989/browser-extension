// src/popup/PopupApp.tsx
import React from 'react';
import './PopupApp.css';
import Selector from './components/Selector';
import Status from './components/Status';

const PopupApp: React.FC = () => {

  return (
    <div className="popup-container">
      <Status />
      <Selector />
    </div>
  );
};

export default PopupApp;