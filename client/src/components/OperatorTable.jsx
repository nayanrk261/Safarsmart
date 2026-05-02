function OperatorTable({ data }) {
  if (!data || data.length === 0) return null

  return (
    <div style={{
      background: '#fff',
      border: '1px solid #e5e7eb',
      borderRadius: '12px',
      padding: '20px 24px',
      marginBottom: '24px'
    }}>
      <h3 style={{ margin: '0 0 20px 0', fontSize: '16px', fontWeight: '600' }}>
        Operator Comparison
      </h3>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
        <thead>
          <tr style={{ borderBottom: '2px solid #e5e7eb' }}>
            <th style={{ textAlign: 'left', padding: '8px 12px', color: '#888', fontWeight: '600' }}>Operator</th>
            <th style={{ textAlign: 'left', padding: '8px 12px', color: '#888', fontWeight: '600' }}>Bus Type</th>
            <th style={{ textAlign: 'center', padding: '8px 12px', color: '#888', fontWeight: '600' }}>Min Price</th>
            <th style={{ textAlign: 'center', padding: '8px 12px', color: '#888', fontWeight: '600' }}>Max Price</th>
            <th style={{ textAlign: 'center', padding: '8px 12px', color: '#888', fontWeight: '600' }}>Avg Price</th>
            <th style={{ textAlign: 'center', padding: '8px 12px', color: '#888', fontWeight: '600' }}>Rating</th>
          </tr>
        </thead>
        <tbody>
          {data.map((op, index) => (
            <tr key={index} style={{
              borderBottom: '1px solid #f3f4f6',
              background: index === 0 ? '#f0fdf4' : 'transparent'
            }}>
              <td style={{ padding: '12px', fontWeight: index === 0 ? '600' : '400' }}>
                {index === 0 ? '🏆 ' : ''}{op._id}
              </td>
              <td style={{ padding: '12px', color: '#666' }}>{op.busType}</td>
              <td style={{ padding: '12px', textAlign: 'center', color: '#16a34a', fontWeight: '600' }}>
                ₹{op.minPrice}
              </td>
              <td style={{ padding: '12px', textAlign: 'center', color: '#dc2626' }}>
                ₹{op.maxPrice}
              </td>
              <td style={{ padding: '12px', textAlign: 'center' }}>
                ₹{Math.round(op.avgPrice)}
              </td>
              <td style={{ padding: '12px', textAlign: 'center' }}>
                ⭐ {op.avgRating ? op.avgRating.toFixed(1) : 'N/A'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default OperatorTable