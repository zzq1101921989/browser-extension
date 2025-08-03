// src/popup/index.tsx
import { createRoot } from 'react-dom/client';
import PopupApp from './PopupApp';
import AppContextProvider from './context';

const container = document.getElementById('root');
const root = createRoot(container!); // 非空断言

root.render(
    <AppContextProvider>
        <PopupApp />
    </AppContextProvider>
);