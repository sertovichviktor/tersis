import React from 'react'
import ReactDOM from 'react-dom/client'
import TersisApp from './routes/index' // Путь к твоей форме
import './styles.css'

const rootElement = document.getElementById('root')!
const root = ReactDOM.createRoot(rootElement)

// Рисуем форму НАПРЯМУЮ, без прослойки роутера
root.render(
  <TersisApp />
)
