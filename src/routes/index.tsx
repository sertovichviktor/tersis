import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'

export const Route = createFileRoute('/')({
  component: () => <TestForm />,
})

function TestForm() {
  const [status, setStatus] = useState('READY')

  return (
    <div style={{ padding: '50px', background: '#050a14', color: '#fff', minHeight: '100vh' }}>
      <h1>FORM BARE TEST</h1>
      <p>Status: {status}</p>
      
      <form 
        onSubmit={(e) => { e.preventDefault(); setStatus('SENT'); }}
        style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '300px' }}
      >
        <input 
          name="test" 
          placeholder="Кликни сюда" 
          style={{ padding: '15px', color: '#000' }} 
        />
        <button type="submit" style={{ padding: '15px', background: 'blue', border: 'none', color: '#fff' }}>
          SUBMIT
        </button>
      </form>
    </div>
  )
}
