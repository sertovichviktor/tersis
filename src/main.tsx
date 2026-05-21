import React, { useState } from 'react'
import ReactDOM from 'react-dom/client'

// Стили пишем прямо тут, чтобы не зависеть от файлов
const App = () => {
  const [status, setStatus] = useState('READY')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('SENDING...');
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      const res = await fetch('/send.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (res.ok) setStatus('SUCCESS: SENT');
      else setStatus('SERVER ERROR');
    } catch (err) {
      setStatus('CONNECTION ERROR');
    }
  };

  return (
    <div style={{ background: '#050a14', color: 'white', minHeight: '100vh', padding: '50px', fontFamily: 'sans-serif' }}>
      <h1 style={{ color: '#0052ff' }}>TERSIS ULTIMATE DEBUG</h1>
      <p>Статус: <strong>{status}</strong></p>
      
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '400px', marginTop: '30px' }}>
        <input 
          name="from" 
          placeholder="КЛИКНИ И ПИШИ ТУТ" 
          required 
          autoComplete="off"
          style={{ padding: '15px', background: '#0a1628', color: 'white', border: '1px solid #1E5EFF', borderRadius: '8px' }} 
        />
        <button type="submit" style={{ padding: '15px', background: '#0052ff', color: 'white', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}>
          SEND TEST
        </button>
      </form>
      
      <div style={{ marginTop: '50px', color: '#666', fontSize: '12px' }}>
        Если это НЕ ЗАВИСНЕТ - значит сервер Fornex и React в порядке.
      </div>
    </div>
  )
}

const rootElement = document.getElementById('root')!
ReactDOM.createRoot(rootElement).render(<App />)
