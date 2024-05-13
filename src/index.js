import React from 'react';
import ReactDOM from 'react-dom'
import './index.css'
import "./custom_calendar.css"
import App from './App';
// import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './components/common/auth/auth';


ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
        <AuthProvider>
          <App />
        </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

