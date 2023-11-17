import React from 'react';
import reportWebVitals from './reportWebVitals';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
// Redux
import { Provider } from 'react-redux';
import { store } from './app/store';
// CSS
import './index.css';
// Пути
import { PATHS } from './paths';
// Компоненты
import { Login } from './pages/login';
import { Register } from './pages/register'

const router = createBrowserRouter([
  {
    path: PATHS.home,
    element: <h1>Home</h1>
  },
  {
    path: PATHS.login,
    element: <Login />
  },
  {
    path: PATHS.register,
    element: <Register />
  },
]);

const container = document.getElementById('root')!;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
