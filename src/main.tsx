import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from '@tanstack/react-router'
import { router } from './router'
import './style.css' // Проверь: style.css или styles.css?

const rootElement = document.getElementById('root')!
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement)
  root.render(
    // Убрали StrictMode для снижения нагрузки на Fornex
    <RouterProvider router={router} />
  )
}
