import React, { useState, useEffect } from 'react'

const style = {
  position: 'fixed',
  bottom: '20px',
  right: '20px',
  width: '300px',
  background: '#1e1e2e',
  color: '#cdd6f4',
  borderRadius: '10px',
  padding: '14px',
  zIndex: 999999,
  fontFamily: 'Segoe UI, sans-serif',
  fontSize: '14px',
  boxShadow: '0 4px 16px rgba(0,0,0,0.3)',
}

export default function Translator() {
  const [inputText, setInputText] = useState('')
  const [translatedText, setTranslatedText] = useState('')
  const [loading, setLoading] = useState(false)
  const [visible, setVisible] = useState(true)
  const [direction, setDirection] = useState('en|ru')

  useEffect(() => {
    const selected = window.getSelection().toString().trim() // выделенный текст
    if (selected) setInputText(selected)

    function handleSelection() {
      const select = window.getSelection().toString().trim()
      if (select) {
        setInputText(select)
        setTranslatedText('')
      }
    }

    document.addEventListener('mouseup', handleSelection)

    return () => {
      document.removeEventListener('mouseup', handleSelection)
    }
}, [])

  async function handleTranslate() {
    if (!inputText.trim()) return

    setLoading(true)
    setTranslatedText('')

    try {
      const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(inputText)}&langpair=${direction}`
      const res = await fetch(url)
      const data = await res.json()
      setTranslatedText(data.responseData.translatedText)
    } catch (e) {
      setTranslatedText('Ошибка перевода')
    } finally {
      setLoading(false)
    }
  }
  if (!visible) return null

  return (
    <div style={style}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
        <span style={{fontWeight: 600, color: '#cba6f7' }}>Переводчик</span>
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

          <div style={{ display: 'flex', marginBottom: '8px', borderRadius: '6px', overflow: 'hidden' }}>
        <button
          onClick={() => { setDirection('en|ru'); setTranslatedText('') }}
          style={{
            flex: 1,
            padding: '6px',
            border: 'none',
            cursor: 'pointer',
            fontSize: '12px',
            fontWeight: 600,
            background: direction === 'en|ru' ? '#cba6f7' : '#313244',
            color: direction === 'en|ru' ? '#1e1e2e' : '#cdd6f4',
          }}
        >EN -&gt; RU</button>
        
        <button
          onClick={() => { setDirection('ru|en'); setTranslatedText('') }}
          style={{
            flex: 1,
            padding: '6px',
            border: 'none',
            cursor: 'pointer',
            fontSize: '12px',
            fontWeight: 600,
            background: direction === 'ru|en' ? '#cba6f7' : '#313244',
            color: direction === 'ru|en' ? '#1e1e2e' : '#cdd6f4',
          }}
        >RU -&gt; EN</button>
      </div>

      <textarea
        value={inputText}
        onChange={e => setInputText(e.target.value)}
        placeholder="Введите текст или выделите на странице..."
        rows={3}
        style={{
          width: '100%',
          background: '#313244',
          color: '#cdd6f4',
          border: 'none',
          borderRadius: '6px',
          padding: '8px',
          fontSize: '13px',
          resize: 'none',
          outline: 'none',
          marginBottom: '8px',
        }}
      />

      <button
        onClick={handleTranslate}
        disabled={loading}
        style={{
          width: '100%',
          padding: '8px',
          background: '#cba6f7',
          color: '#1e1e2e',
          border: 'none',
          borderRadius: '6px',
          fontWeight: 600,
          cursor: loading ? 'wait' : 'pointer',
          marginBottom: '8px',
        }}
      >
        {loading ? 'Перевожу..' : 'Перевести'}
      </button>

      {translatedText && (
        <div style={{
          background: '#313244',
          borderRadius: '6px',
          padding: '8px',
          fontSize: '13px',
          lineHeight: '1.5',
        }}>
          {translatedText}
        </div>
      )}
    </div>
  )
}