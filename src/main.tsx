import React from 'react'
import ReactDOM from 'react-dom/client'

// Мы НЕ импортируем стили!
// Мы НЕ импортируем роутер!

const rootElement = document.getElementById('root')!
const root = ReactDOM.createRoot(rootElement)

root.render(
  <div style={{ padding: '100px', background: 'white' }}>
    <h1>ULTIMATE BATTLE TEST</h1>
    <p>Если это зависнет - значит проблема в твоем браузере или самом Vite-билде.</p>
    <input 
      type="text" 
      placeholder="КЛИКНИ МЕНЯ" 
      style={{ fontSize: '30px', padding: '20px' }} 
    />
  </div>
)
