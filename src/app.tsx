import React, { useState } from 'react'

export default function App() {
  const [status, setStatus] = useState('READY')

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
        setStatus('SUCCESS: SENT');
        (e.target as HTMLFormElement).reset();
      } else {
        setStatus('SERVER ERROR');
      }
    } catch (err) {
      setStatus('CONNECTION ERROR');
    }
  };

  return (
    <div style={{ background: '#050a14', color: 'white', minHeight: '100vh', padding: '50px', fontFamily: 'sans-serif' }}>
      <h1>TERSIS DEBUG FORM</h1>
      <p style={{ color: '#0052ff' }}>STATUS: {status}</p>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '400px', marginTop: '30px' }}>
        <input name="from" placeholder="From (Country/City)" required style={s.input} />
        <input name="email" type="email" placeholder="Email" required style={s.input} />
        <textarea name="message" placeholder="Message" rows={5} style={s.input} />
        <button type="submit" style={s.button}>SEND TEST</button>
      </form>
    </div>
  )
}

const s = {
  input: { padding: '15px', background: '#0a1628', border: '1px solid #1E5EFF', color: 'white', borderRadius: '8px', outline: 'none' },
  button: { padding: '15px', background: '#0052ff', color: 'white', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }
};
