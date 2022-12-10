import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ProSidebarProvider } from 'react-pro-sidebar';
import { Provider } from "react-redux";
import store from './redux/store';
import { persistStore } from 'redux-persist'
import { PersistGate } from "redux-persist/integration/react";

const persistor = persistStore(store)
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <ProSidebarProvider>
          <App />
        </ProSidebarProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
