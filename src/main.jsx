import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/index.css'
import App from './App.jsx'

import { RouterProvider, createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

const root = createRouter({ routeTree })
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={root} />
  </StrictMode>,
)
