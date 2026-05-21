import React, { useState } from 'react'

export default function App() {
  const [status, setStatus] = useState('READY')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('SENDING...');
    const data = Object.fromEntries(new FormData(e.currentTarget));

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
    <div style={{ background: '#050a14', color: 'white', minHeight: '100vh', padding: '50px' }}>
      <h1>TERSIS DEBUG</h1>
      <p style={{ color: '#0052ff' }}>STATUS: {status}</p>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '400px' }}>
        <input name="from" placeholder="From" required style={{ padding: '15px' }} />
        <input name="email" type="email" placeholder="Email" required style={{ padding: '15px' }} />
        <button type="submit" style={{ padding: '15px', background: '#0052ff', color: 'white' }}>SEND TEST</button>
      </form>
    </div>
  )
}
