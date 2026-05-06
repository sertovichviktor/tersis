import React, { useState, useCallback } from 'react'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: TersisApp,
})

function TersisApp() {
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    setIsSubmitted(true);

    fetch('/send.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }).finally(() => {
      form.reset();
      setTimeout(() => setIsSubmitted(false), 3000);
    });
  }, []);

  return (
    <div className="min-h-screen p-10">
      <h1 className="text-4xl font-bold mb-10">TERSIS DIAGNOSTIC BUILD</h1>
      
      <div className="max-w-4xl mx-auto bg-[#0F1A2B] p-10 rounded-2xl border border-white/10">
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-xs text-gray-400">FROM (COUNTRY/CITY)</label>
              <input name="from" required placeholder="Kaunas, Lithuania" />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-xs text-gray-400">TO (COUNTRY/CITY)</label>
              <input name="to" required placeholder="Berlin, Germany" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-xs text-gray-400">CARGO TYPE</label>
              <input name="cargoType" placeholder="Electronics..." />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-xs text-gray-400">WEIGHT (KG)</label>
              <input name="weight" placeholder="5000" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-xs text-gray-400">VOLUME (M³)</label>
              <input name="volume" placeholder="10" />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-xs text-gray-400">NAME</label>
              <input name="name" required placeholder="John Doe" />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs text-gray-400">EMAIL</label>
            <input name="email" type="email" required placeholder="john@company.com" />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs text-gray-400">PHONE</label>
            <input name="phone" required placeholder="+370..." />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs text-gray-400">MESSAGE (OPTIONAL)</label>
            <textarea name="message" rows={4} placeholder="Details..." />
          </div>

          <button type="submit" disabled={isSubmitted}>
            {isSubmitted ? 'SENT SUCCESS' : 'TEST SEND'}
          </button>
        </form>
      </div>

      <div className="mt-20 text-gray-500 text-sm">
        <p>Если это сообщение видно и форма не виснет - значит виновато видео или карта.</p>
      </div>
    </div>
  )
}
