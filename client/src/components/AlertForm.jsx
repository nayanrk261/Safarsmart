import { useState } from 'react'
import axios from 'axios'

function AlertForm() {
  const [form, setForm] = useState({
    travelDate: '',
    maxPrice: '',
    telegram: ''
  })
  const [status, setStatus] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async () => {
    if (!form.travelDate || !form.maxPrice || !form.telegram) {
      setStatus({ type: 'error', message: 'Saari fields bharo!' })
      return
    }

    setLoading(true)
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/api/alerts`, {
        whatsapp: form.telegram,
        travelDate: form.travelDate,
        maxPrice: parseInt(form.maxPrice)
      })
      setStatus({ type: 'success', message: '✅ Alert set ho gaya! Jab price drop hoga toh Telegram pe message aayega.' })
      setForm({ travelDate: '', maxPrice: '', telegram: '' })
    } catch (err) {
      setStatus({ type: 'error', message: '❌ Kuch error aaya, dobara try karo.' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{
      background: '#fff',
      border: '1px solid #e5e7eb',
      borderRadius: '12px',
      padding: '20px 24px',
      marginBottom: '24px'
    }}>
      <h3 style={{ margin: '0 0 6px 0', fontSize: '16px', fontWeight: '600' }}>
        🔔 Price Alert Set Karo
      </h3>
      <p style={{ color: '#888', fontSize: '13px', margin: '0 0 20px 0' }}>
        Jab price tumhare budget se kam ho — Telegram pe instant alert aayega
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px', marginBottom: '16px' }}>
        <div>
          <label style={{ fontSize: '12px', color: '#666', display: 'block', marginBottom: '6px' }}>
            Travel Date
          </label>
          <input
            type="date"
            value={form.travelDate}
            onChange={e => setForm({ ...form, travelDate: e.target.value })}
            style={{
              width: '100%',
              padding: '10px 12px',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
              fontSize: '14px',
              outline: 'none',
              boxSizing: 'border-box'
            }}
          />
        </div>

        <div>
          <label style={{ fontSize: '12px', color: '#666', display: 'block', marginBottom: '6px' }}>
            Max Price (₹)
          </label>
          <input
            type="number"
            placeholder="e.g. 600"
            value={form.maxPrice}
            onChange={e => setForm({ ...form, maxPrice: e.target.value })}
            style={{
              width: '100%',
              padding: '10px 12px',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
              fontSize: '14px',
              outline: 'none',
              boxSizing: 'border-box'
            }}
          />
        </div>

        <div>
          <label style={{ fontSize: '12px', color: '#666', display: 'block', marginBottom: '6px' }}>
            Telegram Chat ID
          </label>
          <input
            type="text"
            placeholder="e.g. 123456789"
            value={form.telegram}
            onChange={e => setForm({ ...form, telegram: e.target.value })}
            style={{
              width: '100%',
              padding: '10px 12px',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
              fontSize: '14px',
              outline: 'none',
              boxSizing: 'border-box'
            }}
          />
        </div>
      </div>

      <button
        onClick={handleSubmit}
        disabled={loading}
        style={{
          background: loading ? '#94a3b8' : '#16a34a',
          color: '#fff',
          border: 'none',
          borderRadius: '8px',
          padding: '10px 24px',
          fontSize: '14px',
          fontWeight: '600',
          cursor: loading ? 'not-allowed' : 'pointer',
          width: '100%'
        }}
      >
        {loading ? 'Setting alert...' : '🔔 Alert Set Karo'}
      </button>

      {status && (
        <div style={{
          marginTop: '12px',
          padding: '10px 14px',
          borderRadius: '8px',
          fontSize: '13px',
          background: status.type === 'success' ? '#f0fdf4' : '#fef2f2',
          color: status.type === 'success' ? '#16a34a' : '#dc2626',
          border: `1px solid ${status.type === 'success' ? '#86efac' : '#fca5a5'}`
        }}>
          {status.message}
        </div>
      )}
    </div>
  )
}

export default AlertForm