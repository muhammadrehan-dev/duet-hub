import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './styles/global.css'
import { registerSW } from 'virtual:pwa-register'

// Register PWA service worker with logging
const updateSW = registerSW({
  onNeedRefresh() {
    console.log('PWA: New content available, please refresh.')
  },
  onOfflineReady() {
    console.log('PWA: App is ready to work offline.')
  },
  onRegisteredSW(swUrl, r) {
    console.log(`PWA: Service Worker registered at ${swUrl}`)
  },
  onRegisterError(error) {
    console.error('PWA: Service Worker registration failed:', error)
  },
  immediate: true,
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
