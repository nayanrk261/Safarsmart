import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

function PriceChart({ data }) {
  if (!data || data.length === 0) return null

  const chartData = data.map(item => ({
    time: item._id.date,
    minPrice: item.minPrice,
    avgPrice: Math.round(item.avgPrice)
  }))

  return (
    <div style={{
      background: '#fff',
      border: '1px solid #e5e7eb',
      borderRadius: '12px',
      padding: '20px 24px',
      marginBottom: '24px'
    }}>
      <h3 style={{ margin: '0 0 20px 0', fontSize: '16px', fontWeight: '600' }}>
        Price History
      </h3>
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis dataKey="time" tick={{ fontSize: 11 }} />
          <YAxis tick={{ fontSize: 11 }} domain={['auto', 'auto']} />
          <Tooltip formatter={(val) => `₹${val}`} />
          <Line
            type="monotone"
            dataKey="minPrice"
            stroke="#16a34a"
            strokeWidth={2}
            dot={{ r: 4 }}
            name="Min Price"
          />
          <Line
            type="monotone"
            dataKey="avgPrice"
            stroke="#3b82f6"
            strokeWidth={2}
            dot={{ r: 4 }}
            name="Avg Price"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

export default PriceChart