import React from 'react'
import ReactDOM from 'react-dom/client'
// Мы импортируем файл напрямую. Проверь, чтобы он назывался App.tsx (с большой буквы)
import App from './App' 
import './styles.css'

const rootElement = document.getElementById('root')
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement)
  root.render(
    <App />
  )
}
