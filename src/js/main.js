import React from 'react';
import { createRoot } from 'react-dom/client'
import InfoPanel from './components/InfoPanel'
import Translator from './components/Translator'

chrome.runtime.onMessage.addListener((request, sender, response) => {
  if (request.action === 'showInfo') {
    injectComponent('page-tools-info', <InfoPanel />)
    response({ success: true })
  }

  if (request.action === 'showTranslator') {
    injectComponent('page-tools-translator', <Translator />)
    response({ success: true });
  }
    
  if (request.action === 'closeAll') {
    ['page-tools-info', 'page-tools-translator'].forEach(id => {
      const el = document.getElementById(id)
      if (el) el.remove()
    })
    response({ success: true })
  }

})

function injectComponent(id, component) {
  const existing = document.getElementById(id)
  if (existing) {
    existing.remove()
  }

  const div = document.createElement('div');
  div.setAttribute('id', id)
  document.body.appendChild(div)
  
  const root = createRoot(div)
  root.render(component)
}