import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/styles.sass'
import App from './App';
import reportWebVitals from './reportWebVitals';
import { initializeApp } from "firebase/app";


// Your web app's Firebase configuration
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


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();
