import { useState, useEffect } from 'react'

export default function PWAInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handler = (e) => {
      // Prevent the mini-infobar from appearing on mobile
      e.preventDefault()
      // Stash the event so it can be triggered later.
      setDeferredPrompt(e)
      // Update UI notify the user they can install the PWA
      setIsVisible(true)
    }

    window.addEventListener('beforeinstallprompt', handler)

    // Check if already installed
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsVisible(false)
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handler)
    }
  }, [])

  const handleInstallClick = async () => {
    if (!deferredPrompt) return

    // Show the install prompt
    deferredPrompt.prompt()

    // Wait for the user to respond to the prompt
    const { outcome } = await deferredPrompt.userChoice
    console.log(`PWA: User response to the install prompt: ${outcome}`)

    // We've used the prompt, and can't use it again, throw it away
    setDeferredPrompt(null)
    setIsVisible(false)
  }

  if (!isVisible) return null

  return (
    <div style={{
      position: 'fixed',
      bottom: '20px',
      left: '50%',
      transform: 'translateX(-50%)',
      zIndex: 1000,
      background: '#ffffff',
      border: 'none',
      borderRadius: '0',
      padding: '12px 20px',
      display: 'flex',
      alignItems: 'center',
      gap: '15px',
      boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
      backdropFilter: 'blur(8px)',
      width: 'max-content',
      maxWidth: '90vw'
    }}>
      <div style={{ fontSize: '20px' }}>📱</div>
      <div style={{ flex: 1 }}>
        <p style={{ margin: 0, fontSize: '13px', fontWeight: '700', color: '#0d1117' }}>Install DUET Hub</p>
        <p style={{ margin: 0, fontSize: '11px', color: '#4b5563' }}>Access resources faster from your home screen</p>
      </div>
      <button 
        onClick={handleInstallClick}
        style={{
          background: '#7FC4A0',
          color: '#0d1117',
          border: 'none',
          padding: '8px 16px',
          borderRadius: '6px',
          fontSize: '12px',
          fontWeight: '700',
          cursor: 'pointer'
        }}
      >
        Install
      </button>
      <button 
        onClick={() => setIsVisible(false)}
        style={{
          background: 'none',
          border: 'none',
          color: '#4b5563',
          fontSize: '16px',
          cursor: 'pointer',
          padding: '0 5px'
        }}
      >
        ×
      </button>
    </div>
  )
}
