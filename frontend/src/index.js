import React from 'react';
import ReactDOM from 'react-dom/client';
import { router } from './App';
import { CookiesProvider } from 'react-cookie';
import { RouterProvider } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
    <CookiesProvider>
      <ToastContainer />
      <RouterProvider router={router} />
    </CookiesProvider>
  </>
);

