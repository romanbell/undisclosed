import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Router, Routes, Route } from 'react-router-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// constructor(props) {
//   super(props);
//   this.ref = React.createRef();
// }

// // This is simply an example that demonstrates
// // how you can dispatch an event on the element.
// triggerKeyPress() {
//   this.ref.dispatchEvent(new KeyboardEvent('keypress', {
//     key: 'Enter',
//   }));
// }



ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root'),
  // document.body.addEventListener('keydown', App.handleImgSwitch)
);



// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
