// React core
import React from 'react';
// React dom client
import ReactDOM from 'react-dom/client';
// React router dom
import { BrowserRouter } from 'react-router-dom';
// Context provider
import { UserContextProvider } from 'context/UserContext';
import { HandleDrawerProvider } from 'context/DrawerContext';
import { FiltersContextProvider } from 'context/FiltersContext';
// Global Styles
import 'index.css'
// Componenet
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <UserContextProvider>
      <HandleDrawerProvider>
        <FiltersContextProvider>
          <App />
        </FiltersContextProvider>
      </HandleDrawerProvider>
    </UserContextProvider>
  </BrowserRouter>
);
