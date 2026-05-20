import React, { useState } from 'react'

export default function App() {
  const [status, setStatus] = useState('SYSTEM READY')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('SENDING...');
    
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      const response = await fetch('/send.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setStatus('SUCCESS: SENT TO PHP');
        (e.target as HTMLFormElement).reset();
      } else {
        setStatus('SERVER ERROR');
      }
    } catch (err) {
      setStatus('CONNECTION ERROR');
    }
  };

  return (
    <div style={{ background: '#050a14', color: 'white', minHeight: '100vh', padding: '40px', fontFamily: 'sans-serif' }}>
      <h1 style={{ color: '#0052ff', marginBottom: '10px' }}>TERSIS RESET TEST</h1>
      <p style={{ background: '#0a1628', padding: '15px', border: '1px solid #1E5EFF', display: 'inline-block' }}>
        STATUS: {status}
      </p>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '400px', marginTop: '40px' }}>
        <input name="from" placeholder="FROM (Country/City)" required style={inputStyle} />
        <input name="email" type="email" placeholder="EMAIL" required style={inputStyle} />
        <textarea name="message" placeholder="MESSAGE" rows={5} style={inputStyle} />
        <button type="submit" style={buttonStyle}>SEND TEST REQUEST</button>
      </form>
    </div>
  )
}

const inputStyle = { padding: '15px', background: '#0a1628', border: '1px solid #1A2C45', color: 'white', borderRadius: '8px', outline: 'none' };
const buttonStyle = { padding: '15px', background: '#0052ff', color: 'white', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' };
