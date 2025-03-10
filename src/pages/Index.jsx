
import React, { useState, useEffect } from 'react'
import './Index.css'

function Index() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    // Replace with your actual API endpoint
    fetch('https://your-backend-api-url.com/data')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok')
        }
        return response.json()
      })
      .then(data => {
        setData(data)
        setLoading(false)
      })
      .catch(error => {
        setError(error.message)
        setLoading(false)
      })
  }, [])

  if (loading) return <div className="loading">Loading...</div>
  if (error) return <div className="error">Error: {error}</div>

  return (
    <div className="page-container">
      <header className="header">
        <h1>My App</h1>
      </header>
      
      <main className="main-content">
        <section className="data-section">
          <h2>Data from API</h2>
          <div className="data-grid">
            {data.map((item, index) => (
              <div key={index} className="data-card">
                <h3>{item.title || 'Item ' + (index + 1)}</h3>
                <p>{item.description || 'No description available'}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
      
      <footer className="footer">
        <p>&copy; {new Date().getFullYear()} My Application</p>
      </footer>
    </div>
  )
}

export default Index
