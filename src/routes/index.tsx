import React, { useState } from 'react'

// МЫ ПОЛНОСТЬЮ УБРАЛИ createFileRoute ДЛЯ ТЕСТА
export function TersisApp() {
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitted(true);
    const data = Object.fromEntries(new FormData(e.currentTarget));
    
    fetch('/send.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }).finally(() => {
      setTimeout(() => setIsSubmitted(false), 3000);
    });
  };

  return (
    <div style={{ background: '#050a14', minHeight: '100vh', color: 'white', padding: '50px' }}>
      <h1>FINAL TEST (NO ROUTER)</h1>
      <p>Если это сообщение не зависнет при клике - значит виноват TanStack Router.</p>
      
      <form onSubmit={handleSubmit} style={{ marginTop: '50px', display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '400px' }}>
        <input 
          name="test_field" 
          placeholder="Кликни сюда!" 
          style={{ padding: '15px', background: '#0a1628', color: 'white', border: '1px solid #1E5EFF' }}
          autoComplete="off" 
        />
        <button type="submit" style={{ padding: '15px', background: '#1E5EFF', color: 'white', border: 'none', cursor: 'pointer' }}>
          {isSubmitted ? 'SENT' : 'SEND TEST'}
        </button>
      </form>
    </div>
  )
}

// Это нужно, если твой main.tsx всё еще ищет компонент TersisApp
export default TersisApp;
