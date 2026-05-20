import React, { useState } from 'react'

export default function TersisApp() {
  const [status, setStatus] = useState('System Ready (No Router)')

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
    <div style={{ background: '#050a14', color: 'white', minHeight: '100vh', padding: '50px' }}>
      <h1>TERSIS NO-ROUTER TEST</h1>
      <p style={{ color: '#0052ff' }}>Status: {status}</p>
      
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '400px' }}>
        <input 
          name="from" 
          placeholder="CLICK AND TYPE HERE" 
          required 
          autoComplete="off"
          style={{ padding: '15px', background: '#0a1628', color: 'white', border: '1px solid #0052ff' }} 
        />
        <button type="submit" style={{ padding: '15px', background: '#0052ff', color: 'white', cursor: 'pointer' }}>
          SEND TEST
        </button>
      </form>
    </div>
  )
}
