// React core
import React from 'react';
// React dom client
import ReactDOM from 'react-dom/client';
// React router dom
import { BrowserRouter } from 'react-router-dom';
// Context provider
import { UserContextProvider } from 'context/UserContext';
import { HandleDrawerProvider } from 'context/DrawerContext';
// Global Styles
import 'index.css'
// Componenet
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <UserContextProvider>
      <HandleDrawerProvider>
        <App />
      </HandleDrawerProvider>
    </UserContextProvider>
  </BrowserRouter>
);
