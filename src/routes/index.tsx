import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'

export const Route = createFileRoute('/')({
  component: HomePage,
})

function HomePage() {
  const [status, setStatus] = useState('READY')

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setStatus('SENT')
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#050a14',
        padding: '60px 20px',
      }}
    >
      <div
        style={{
          maxWidth: '500px',
          margin: '0 auto',
        }}
      >
        <h1
          style={{
            fontSize: '42px',
            fontWeight: 800,
            marginBottom: '10px',
          }}
        >
          TERSIS TEST
        </h1>

        <p
          style={{
            color: '#777',
            marginBottom: '30px',
          }}
        >
          Status: {status}
        </p>

        <form
          onSubmit={handleSubmit}
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
          }}
        >
          <input
            placeholder="FROM"
            autoComplete="off"
          />

          <input
            placeholder="EMAIL"
            type="email"
            autoComplete="off"
          />

          <textarea
            placeholder="MESSAGE"
            rows={5}
          />

          <button type="submit">
            SEND
          </button>
        </form>
      </div>
    </div>
  )
}
