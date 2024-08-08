import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import rootReducer from './reducer';
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/react"

const store = configureStore({
  reducer: rootReducer,
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
  <Provider store={store}>
      <BrowserRouter>
        <App />
         <Toaster />
        <Analytics />
        <SpeedInsights />

      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

