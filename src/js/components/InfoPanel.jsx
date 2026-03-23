import React, { useState, useEffect } from 'react' 

const styles = {
      position: 'fixed',
      top: '20px',
      right: '20px',
      width: '280px',
      background: '#1e1e2e',
      color: '#cdd6f4',
      borderRadius: '10px',
      padding: '14px',
      zIndex: 999999,
      fontFamily: 'Segoe UI, sans-serif',
      fontSize: '14px',
      boxShadow: '0 4px 16px rgba(0,0,0,0.3)',
    }

export default function InfoPanel() {
  const [info, setInfo] = useState(null) 
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    setInfo({
      title: document.title || '—',
      language: document.documentElement.lang || '—',
      wordCount: document.body.innerText.trim().split(/\s+/).filter(Boolean).length,
    })
  }, [])

  if (!info || !visible) return null

  return (
    <div style={styles}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
        <span style={{ fontWeight: 600, color: '#cba6f7' }}>Инфо о странице</span>
        <button
          onClick={() => setVisible(false)}
          style={{
            background: 'none',
            border: 'none',
            color: '#6c7086',
            fontSize: '16px',
            cursor: 'pointer',
            lineHeight: 1,
            padding: '0 2px',
          }}
        >X</button>
      </div>
      <p><strong>Заголовок:</strong> {info.title}</p>
      <p><strong>Язык:</strong> {info.language}</p>
      <p><strong>Слов на странице:</strong> {info.wordCount}</p>
    </div>
  ) 
}