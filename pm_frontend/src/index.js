// React core
import React from 'react';
// React dom client
import ReactDOM from 'react-dom/client';
// Redux
import { Provider } from 'react-redux';
import store from 'redux/store';
// React router dom
import { BrowserRouter } from 'react-router-dom';
// Global Styles
import 'index.css'
// Componenet
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);
