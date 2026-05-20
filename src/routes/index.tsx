import React, { useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: () => <BareForm />,
})

function BareForm() {
  const [status, setStatus] = useState('Ready')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('Sending...');
    const data = Object.fromEntries(new FormData(e.currentTarget));

    try {
      const res = await fetch('/send.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (res.ok) setStatus('SUCCESS!');
      else setStatus('SERVER ERROR');
    } catch (err) {
      setStatus('NETWORK ERROR');
    }
  };

  return (
    <div style={{ background: '#000', color: '#fff', minHeight: '100vh', padding: '50px' }}>
      <h1>BARE FORM TEST</h1>
      <p>Status: {status}</p>
      
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px', maxWidth: '300px' }}>
        <input name="from" placeholder="From" required style={{ padding: '10px' }} />
        <input name="email" type="email" placeholder="Email" required style={{ padding: '10px' }} />
        <button type="submit" style={{ padding: '10px', background: 'blue', color: 'white' }}>SEND</button>
      </form>
    </div>
  )
}
