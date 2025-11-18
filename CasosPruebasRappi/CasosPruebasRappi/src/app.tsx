import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css';
import { RouterProvider } from 'react-router-dom';
import { Approuter } from './router/app.router';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={Approuter} />
  </StrictMode>,
);
