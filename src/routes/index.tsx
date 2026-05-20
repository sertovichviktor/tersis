import React, { useState, useCallback } from 'react'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: TersisTestForm,
})

function TersisTestForm() {
  const [status, setStatus] = useState('Waiting for input...')
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Функция отправки
  const handleSubmit = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setStatus('Sending to send.php...')

    const formData = new FormData(e.currentTarget)
    const data = Object.fromEntries(formData.entries())

    try {
      const response = await fetch('/send.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (response.ok) {
        setStatus('SUCCESS: Form sent to send.php!')
        e.currentTarget.reset()
      } else {
        setStatus(`SERVER ERROR: ${response.status}`)
      }
    } catch (err) {
      setStatus(`NETWORK ERROR: Maybe send.php is missing?`)
    } finally {
      setIsSubmitting(false)
    }
  }, [])

  return (
    <div style={{ 
      background: '#050a14', 
      color: 'white', 
      minHeight: '100vh', 
      padding: '50px', 
      fontFamily: 'sans-serif' 
    }}>
      <h1 style={{ color: '#0052ff' }}>TERSIS REACT TEST FORM</h1>
      
      <div style={{ 
        background: '#111C2E', 
        padding: '20px', 
        borderRadius: '10px', 
        marginBottom: '20px',
        border: '1px solid #1E5EFF'
      }}>
        <strong>Status:</strong> <span style={{ color: '#00ff00' }}>{status}</span>
      </div>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px', maxWidth: '500px' }}>
        <input 
          name="from" 
          placeholder="FROM (COUNTRY/CITY)" 
          required 
          style={inputStyle}
        />
        <input 
          name="email" 
          type="email"
          placeholder="YOUR EMAIL" 
          required 
          style={inputStyle}
        />
        <textarea 
          name="message" 
          placeholder="MESSAGE" 
          rows={5} 
          style={inputStyle}
        />
        
        <button 
          type="submit" 
          disabled={isSubmitting}
          style={{ 
            padding: '15px', 
            background: isSubmitting ? '#333' : '#0052ff', 
            color: 'white', 
            border: 'none', 
            borderRadius: '5px', 
            fontWeight: 'bold',
            cursor: 'pointer'
          }}
        >
          {isSubmitting ? 'SENDING...' : 'SEND TEST REQUEST'}
        </button>
      </form>

      <div style={{ marginTop: '50px', fontSize: '12px', color: '#666' }}>
        <p>Инструкция:</p>
        <ol>
          <li>Кликни в любое поле. Если НЕ ЗАВИСЛО — значит проблема в тяжелых элементах (видео/SVG).</li>
          <li>Введи данные и нажми кнопку.</li>
          <li>Если статус стал SUCCESS — значит React + PHP работают идеально.</li>
        </ol>
      </div>
    </div>
  )
}

const inputStyle = {
  padding: '12px',
  background: '#0a1628',
  border: '1px solid #1A2C45',
  color: 'white',
  borderRadius: '5px',
  outline: 'none'
}
