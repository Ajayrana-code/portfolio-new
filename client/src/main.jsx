import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './styles/base/global.css';
import './styles/base/token.css';
import './styles/base/typography.css';


ReactDOM.createRoot(
  document.getElementById('root')
).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
