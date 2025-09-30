// src/popup/PopupApp.tsx
import React, {useEffect} from 'react';
import './PopupApp.css';
import Selector from './components/Selector';
import Status from './components/Status';

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
      <Status />
      <Selector />
    </div>
  );
};

export default PopupApp;