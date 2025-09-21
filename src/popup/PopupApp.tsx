// src/popup/PopupApp.tsx
import React from 'react';
import './PopupApp.css';
import Selector from './components/Selector';
import Header from './components/Header';

const PopupApp: React.FC = () => {

  return (
    <div className="popup-container">
      <Header />
      <Selector />
    </div>
  );
};

export default PopupApp;