import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/styles.sass'
import App from './App';
import reportWebVitals from './reportWebVitals';
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAbgBz8H_809TDPhzw9UEjcyVHeqTVuyqg",
  authDomain: "ecommerce-coderhouse-16e23.firebaseapp.com",
  projectId: "ecommerce-coderhouse-16e23",
  storageBucket: "ecommerce-coderhouse-16e23.appspot.com",
  messagingSenderId: "934295799656",
  appId: "1:934295799656:web:2b2b8f0af494af745078dd",
  measurementId: "G-NEW9Q7VV2G"
};

// Initialize Firebase
initializeApp(firebaseConfig);
// getAnalytics(app);


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
