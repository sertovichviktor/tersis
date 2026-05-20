import React, { useState, useCallback } from 'react'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: TersisTestForm,
})

function TersisTestForm() {
  const [status, setStatus] = useState('System Ready')

  const handleSubmit = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setStatus('Sending...')
    const data = Object.fromEntries(new FormData(e.currentTarget))

    try {
      const response = await fetch('/send.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (response.ok) setStatus('SUCCESS!')
      else setStatus('SERVER ERROR')
    } catch (err) {
      setStatus('CONNECTION ERROR')
    }
  }, [])

  return (
    <div style={{ background: '#050a14', color: 'white', minHeight: '100vh', padding: '50px' }}>
      <h1>TERSIS REACT DEBUG</h1>
      <p style={{ color: '#0052ff' }}>Status: {status}</p>

      <form 
        onSubmit={handleSubmit} 
        style={{ display: 'flex', flexDirection: 'column', gap: '15px', maxWidth: '400px' }}
        autoComplete="off"
      >
        <input 
          name="from" 
          placeholder="КЛИКНИ СЮДА" 
          required 
          /* autoComplete="one-time-code" — заставляет Chrome ПЕРЕСТАТЬ сканировать сайт */
          autoComplete="one-time-code" 
          style={inputStyle}
        />
        <button type="submit" style={btnStyle}>SEND TEST</button>
      </form>
    </div>
  )
}

const inputStyle = { padding: '15px', background: '#0a1628', border: '1px solid #1A2C45', color: 'white' }
const btnStyle = { padding: '15px', background: '#0052ff', color: 'white', border: 'none', cursor: 'pointer' }
