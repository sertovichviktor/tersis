import React, { useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'

// Это обязательная привязка, чтобы не было "Not Found"
export const Route = createFileRoute('/')({
  component: TersisApp,
})

function TersisApp() {
  const [debugInfo, setDebugInfo] = useState('Ready to test')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setDebugInfo('Sending...');
    
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      const response = await fetch('/send.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      // Читаем ответ от PHP
      const result = await response.json();
      setDebugInfo(`SUCCESS: ${JSON.stringify(result)}`);
    } catch (error: any) {
      setDebugInfo(`ERROR: ${error.message}`);
    }
  };

  return (
    <div style={{ background: '#050a14', color: 'white', minHeight: '100vh', padding: '40px', fontFamily: 'sans-serif' }}>
      <h1 style={{ color: '#0052ff' }}>TERSIS FORM DEBUG MODE</h1>
      <p style={{ background: '#111C2E', padding: '15px', borderRadius: '8px' }}>
        <strong>Status:</strong> {debugInfo}
      </p>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px', maxWidth: '400px', marginTop: '30px' }}>
        <input 
          name="from" 
          placeholder="From (Country/City)" 
          required 
          style={{ padding: '12px', borderRadius: '6px', border: '1px solid #1A2C45', background: '#0a1628', color: 'white' }}
        />
        <input 
          name="name" 
          placeholder="Your Name" 
          required 
          style={{ padding: '12px', borderRadius: '6px', border: '1px solid #1A2C45', background: '#0a1628', color: 'white' }}
        />
        <input 
          name="email" 
          type="email"
          placeholder="Your Email" 
          required 
          style={{ padding: '12px', borderRadius: '6px', border: '1px solid #1A2C45', background: '#0a1628', color: 'white' }}
        />
        <button 
          type="submit" 
          style={{ padding: '15px', borderRadius: '6px', background: '#0052ff', color: 'white', border: 'none', fontWeight: 'bold', cursor: 'pointer' }}
        >
          TEST SEND TO PHP
        </button>
      </form>

      <div style={{ marginTop: '40px', color: '#666', fontSize: '12px' }}>
        Если это сообщение видно и клик по инпуту НЕ вешает страницу — значит проблема была в Видео/Карте/Блюре.
      </div>
    </div>
  )
}
