import React from 'react';
import { createRoot } from 'react-dom/client';
import App from '@/containers/App';
import { GlobalStyle } from './assets/css/global';

const container = document.getElementById('root');

const root = createRoot(container!);

const Root = () => (
  <>
    <GlobalStyle />
    <App />
  </>
);

root.render(<Root />);
