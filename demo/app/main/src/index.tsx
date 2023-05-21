import React from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { ExampleHook, ExampleRoutes } from './examples';


const router = createBrowserRouter([
  {
    path: '/hook',
    element: <ExampleHook />
  },
  {
    path: '*',
    element: <ExampleRoutes />
  },
]);

const container = document.getElementById('app');
const root = createRoot(container);

root.render(
  <RouterProvider router={router} />
);

