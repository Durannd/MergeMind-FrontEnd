import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/index.css'

import { RouterProvider, createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";
import { TanStackRouterDevtools } from '@tanstack/router-devtools';

const root = createRouter({ routeTree })
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <TanStackRouterDevtools router={root} />
    <RouterProvider router={root} />
  </StrictMode>,
)
