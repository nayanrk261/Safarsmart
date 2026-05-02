function LowestFare({ data }) {
  if (!data) return null

  return (
    <div style={{
      background: '#f0fdf4',
      border: '1px solid #86efac',
      borderRadius: '12px',
      padding: '20px 24px',
      marginBottom: '24px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }}>
      <div>
        <p style={{ color: '#16a34a', fontWeight: '600', fontSize: '13px', marginBottom: '4px' }}>
          LOWEST FARE AVAILABLE
        </p>
        <h2 style={{ fontSize: '36px', fontWeight: '700', margin: '0 0 4px 0' }}>
          ₹{data.price}
        </h2>
        <p style={{ color: '#555', margin: 0 }}>{data.operator}</p>
        <p style={{ color: '#888', fontSize: '13px', margin: '4px 0 0 0' }}>{data.busType}</p>
      </div>
      <div style={{ textAlign: 'right' }}>
        <p style={{ color: '#888', fontSize: '13px', margin: '0 0 4px 0' }}>Rating</p>
        <p style={{ fontSize: '24px', fontWeight: '700', margin: '0 0 4px 0' }}>
          ⭐ {data.rating}
        </p>
        <p style={{ color: '#888', fontSize: '13px', margin: 0 }}>
          {data.seatsLeft} seats left
        </p>
      </div>
    </div>
  )
}

export default LowestFare