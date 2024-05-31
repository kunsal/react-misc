import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import store from './store';
import axios from 'axios';
import authenticatedService from './config/authenticated-service';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
import { refresh } from './services/auth-service';

const persistor = persistStore(store);

authenticatedService.interceptors.request.use((request) => {
  request.headers.Accept = 'application/json';
  request.headers['Content-Type'] = 'application/json;charset=utf-8';
  console.log(request);
  return request;
})

authenticatedService.interceptors.response.use(
  response => {
    console.log('Custom caught response', response);
    return response;
  },
  async (error) => {
    console.log('Custom caught error');
    console.log(error);
    if (error.response.status === 403) {
      await refresh();
      return authenticatedService(error.config);
    }
    if (error.response.status === 401) {
      // window.location.href = '/login';
      console.log('Unauthorized from index.js')
    }
    return error;
  }
)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>

  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
