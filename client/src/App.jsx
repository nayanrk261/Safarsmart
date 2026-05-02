import { useState, useEffect } from 'react'
import axios from 'axios'
import PriceChart from './components/PriceChart'
import LowestFare from './components/LowestFare'
import OperatorTable from './components/OperatorTable'
import AlertForm from './components/AlertForm'

function App() {
  const [lowest, setLowest] = useState(null)
  const [operators, setOperators] = useState([])
  const [history, setHistory] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [lowestRes, operatorsRes, historyRes] = await Promise.all([
          axios.get('http://localhost:5000/api/prices/lowest'),
          axios.get('http://localhost:5000/api/prices/operators'),
          axios.get('http://localhost:5000/api/prices/history'),
        ])
        setLowest(lowestRes.data)
        setOperators(operatorsRes.data)
        setHistory(historyRes.data)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  if (loading) return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <p style={{ fontSize: '18px', color: '#666' }}>Loading FareWise...</p>
    </div>
  )

  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '24px', fontFamily: 'sans-serif' }}>
      <h1 style={{ fontSize: '28px', fontWeight: '700', marginBottom: '4px' }}>
        🚌 FareWise
      </h1>
      <p style={{ color: '#666', marginBottom: '32px' }}>
        Sambhajinagar → Pune · Live Price Tracker
      </p>

      <LowestFare data={lowest} />
      <AlertForm />
      <PriceChart data={history} />
      <OperatorTable data={operators} />
    </div>
  )
}

export default App