import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import 'font-awesome/css/font-awesome.min.css';
// index.js ya App.js

import './Assets/css/style.css';
// import './Assets/css/bootstrap.css';
import './Assets/lib/animate/animate.min.css';
import { Toaster } from 'react-hot-toast';
// import 'bootstrap/dist/css/bootstrap.min.css';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
    <Toaster position="top-center" />
    <App />
  </>
);


