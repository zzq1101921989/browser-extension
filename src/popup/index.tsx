// src/popup/index.tsx
import { createRoot } from 'react-dom/client';
import PopupApp from './PopupApp';
import AppContextProvider from './context';
import {ReactNode} from "react";

const container = document.getElementById('root');
const root = createRoot(container!); // 非空断言

//  挂载弹窗组件
root.render(
    <AppContextProvider>
        <PopupApp />
    </AppContextProvider> as ReactNode
);