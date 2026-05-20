import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'

export const Route = createFileRoute('/')({
  component: TestForm,
})

function TestForm() {
  const [status, setStatus] = useState('READY')

  // Функция-щит: не дает событию уйти "выше" к роутеру
  const stopPropa = (e: React.SyntheticEvent) => {
    e.stopPropagation();
  };

  return (
    <div style={{ padding: '50px', background: '#050a14', color: '#fff', minHeight: '100vh' }}>
      <h1>FORM TEST (ROUTER ACTIVE)</h1>
      <p>Status: {status}</p>
      
      <form 
        onSubmit={(e) => { e.preventDefault(); setStatus('SENT'); }}
        style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '300px' }}
      >
        <input 
          name="test" 
          placeholder="Кликни сюда" 
          autoComplete="one-time-code" // Убивает лаг автозаполнения Chrome
          onFocus={stopPropa}           // Не дает роутеру начать Preload
          onClick={stopPropa}           // Не дает роутеру начать Preload
          style={{ padding: '15px', color: '#000', fontSize: '18px' }} 
        />
        <button type="submit" style={{ padding: '15px', background: 'blue', border: 'none', color: '#fff', cursor: 'pointer' }}>
          SUBMIT
        </button>
      </form>

      <div style={{marginTop: '40px', color: '#555'}}>
        <p>Если сейчас НЕ ЗАВИСНЕТ — значит мы нашли причину (Preload Intent в роутере).</p>
      </div>
    </div>
  )
}
