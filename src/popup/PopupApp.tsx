// src/popup/PopupApp.tsx
import React, {useEffect} from 'react';
import './PopupApp.css';
import Selector from './components/Selector';
import Header from './components/Header';

const PopupApp: React.FC = () => {

    useEffect(() => {
        (async ()  => {
            const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
            await chrome.tabs.sendMessage(tab.id as number, {
                action: 'initial'
            });
        })()
    }, []);

  return (
    <div className="popup-container">
      <Header />
      <Selector />
    </div>
  );
};

export default PopupApp;