import React from 'react';
import ReactDOM from 'react-dom/client';
// import { Auth0Provider } from '@auth0/auth0-react';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import store from './store/store';
import {Provider} from "react-redux";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  <React.StrictMode>
    {/* <Auth0Provider
     domain="dev-uokxxijypydxl1e6.us.auth0.com"
     clientId="2HmedTJAW37bVtsYP5REkzM5AKkl4rrH"
     authorizationParams={{
       redirect_uri: window.location.origin
     }}> */}
     <Provider store={store}>
    <App />
    </Provider>
    {/* </Auth0Provider> */}
  </React.StrictMode>

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
