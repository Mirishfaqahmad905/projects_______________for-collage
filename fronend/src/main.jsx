// index.jsx or App.jsx
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'; // Ensure you import BrowserRouter
import App from './App';
// src/main.jsx or src/App.jsx
import './index.css';  // or wherever your CSS file is located
import store from './container/reduxToolKit/Store';
import {Provider} from 'react-redux';

ReactDOM.render(

    <App />
 
,
  document.getElementById('root')
);
