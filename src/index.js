import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Parse from 'parse';

const root = ReactDOM.createRoot(document.getElementById('root'));


Parse.initialize("2VLf6bjwfQ78djHK3LkVITFBKC5z3l8YtoRYWDM5", "PKzwoqcW8F1wzfT7GFJzi7Ael07gjv2aJttbpQT9");
Parse.serverURL = 'https://parseapi.back4app.com/';


root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
