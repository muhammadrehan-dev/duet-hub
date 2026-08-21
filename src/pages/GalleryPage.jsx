const GALLERY_ITEMS = [
  {
    id: 1,
    title: 'Main Campus Gate — 14th August Celebrations',
    location: 'Main Campus, New M.A. Jinnah Road',
    image: '/main campus main gate on independence day image by aheer.png',
    credit: 'Aheer',
    category: 'MAIN',
    layout: 'tall',
  },
  {
    id: 2,
    title: 'IC&S Gulberg Campus Courtyard',
    location: 'Gulberg Town Campus',
    image: '/gulber inside image by fozan.png',
    credit: 'Fozan',
    category: 'GULBERG',
    layout: 'wide',
  },
  {
    id: 3,
    title: 'Chemical Engineering Department View',
    location: 'Main Campus Courtyard',
    image: '/main campus image from chemical dept image by Aftab Ullah.png',
    credit: 'Aftab Ullah',
    category: 'MAIN',
    layout: 'normal',
  },

  {
    id: 5,
    title: 'Main Auditorium Night Celebration — 14th August',
    location: 'Main Campus Auditorium',
    image: '/duet auditorium night view 14 aug celebration image by official facebook.png',
    credit: 'Official Facebook Page',
    category: 'CELEBRATIONS',
    layout: 'normal',
  },
  {
    id: 6,
    title: 'Main Campus Lawn & Greenery',
    location: 'Main Campus Lawns',
    image: '/main campus garden image by Sidra tul Muntaha.png',
    credit: 'Sidra tul Muntaha',
    category: 'MAIN',
    layout: 'wide',
  },
  {
    id: 7,
    title: 'Main Entrance Gate & Security Check',
    location: 'Jinnah Main Entrance',
    image: '/main campus main gate image by Faheem Bozdar.png',
    credit: 'Faheem Bozdar',
    category: 'MAIN',
    layout: 'normal',
  },
  {
    id: 8,
    title: 'Gulberg Campus Front View & Entrance',
    location: 'Gulberg Town Campus',
    image: '/gulberg-campus.png',
    credit: 'Zubia Abdul Sattar',
    category: 'GULBERG',
    layout: 'normal',
  },
  {
    id: 9,
    title: '14th August Independence Day Celebrations',
    location: 'Main Campus Night Lights',
    image: '/main campus night view 14 aug lighting celebration image official facebook.png',
    credit: 'Official Facebook Page',
    category: 'CELEBRATIONS',
    layout: 'wide',
  },
  {
    id: 10,
    title: 'CEMET Campus Conference Hall',
    location: 'Rohri-Sukkur (CEMET) Campus',
    image: '/cemet campus confrence hall image by official facebook page of cemet campus.png',
    credit: 'Official Facebook Page',
    category: 'CEMET',
    layout: 'normal',
  },
  {
    id: 11,
    title: 'Main Auditorium Stage View',
    location: 'Main Campus',
    image: '/main campus auditorium image by life as dawoodian.png',
    credit: 'Life as Dawoodian',
    category: 'CELEBRATIONS',
    layout: 'normal',
  },
  {
    id: 12,
    title: 'Gulberg Campus Academic Block',
    location: 'Gulberg Town Campus',
    image: '/gulberg campus academic block image by Syed Shayan.png',
    credit: 'Syed Shayan',
    category: 'GULBERG',
    layout: 'wide',
  },
  {
    id: 13,
    title: 'Gulberg Academic Block View from Gardens',
    location: 'Gulberg Academic Block',
    image: '/gulberg campus academic block view from garden showing AR VR lab from outside image by zubia abdul sattar.png',
    credit: 'Zubia Abdul Sattar',
    category: 'GULBERG',
    layout: 'normal',
  },
  {
    id: 14,
    title: 'Academic Block View from Cafeteria Sitting Area',
    location: 'Gulberg Campus Cafeteria',
    image: '/gulberg campus academic block view from sitting in cafeteria image by fozan.png',
    credit: 'Fozan',
    category: 'GULBERG',
    layout: 'normal',
  },
  {
    id: 15,
    title: 'Main Campus Outside Aerial View',
    location: 'New M.A. Jinnah Road',
    image: '/main campus outside image by  AD_ADEEL_AHMED.png',
    credit: 'AD_ADEEL_AHMED',
    category: 'MAIN',
    layout: 'wide',
  },
]

import { useState, useEffect, useRef } from 'react'
import { ArrowUpRight, Camera, X, MapPin, ChevronLeft, ChevronRight } from 'lucide-react'
import styles from './GalleryPage.module.css'

export default function GalleryPage() {
  const [activeTab, setActiveTab] = useState('ALL')
  const [selectedPhoto, setSelectedPhoto] = useState(null)
  
  const containerRef = useRef(null)
  const trackRef = useRef(null)
  const translateRef = useRef(0)
  const [translateX, setTranslateX] = useState(0)
  const [progressPct, setProgressPct] = useState(0)

  const filteredItems = GALLERY_ITEMS.filter(item => {
    if (activeTab === 'ALL') return true
    if (item.type === 'stat') return activeTab === 'ALL'
    return item.category === activeTab
  })

  const selectedIndex = filteredItems.findIndex(i => i.id === selectedPhoto?.id)

  const handlePrevPhoto = (e) => {
    if (e) e.stopPropagation()
    if (selectedIndex === -1) return
    const prevIndex = selectedIndex > 0 ? selectedIndex - 1 : filteredItems.length - 1
    setSelectedPhoto(filteredItems[prevIndex])
  }

  const handleNextPhoto = (e) => {
    if (e) e.stopPropagation()
    if (selectedIndex === -1) return
    const nextIndex = selectedIndex < filteredItems.length - 1 ? selectedIndex + 1 : 0
    setSelectedPhoto(filteredItems[nextIndex])
  }

  useEffect(() => {
    if (!selectedPhoto) return
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') handlePrevPhoto()
      if (e.key === 'ArrowRight') handleNextPhoto()
      if (e.key === 'Escape') setSelectedPhoto(null)
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [selectedPhoto, selectedIndex, filteredItems])

  useEffect(() => {
    translateRef.current = 0
    setTranslateX(0)
    setProgressPct(0)
  }, [activeTab])

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const handleWheel = (e) => {
      // Ignore if user is scrolling horizontally directly
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) return

      const track = trackRef.current
      if (!track) return

      const trackWidth = track.scrollWidth
      const windowWidth = window.innerWidth
      const maxTranslate = trackWidth - windowWidth + 120

      if (maxTranslate <= 0) return

      const delta = e.deltaY * 1.25
      const proposedTranslate = translateRef.current - delta

      // If scrolling DOWN and not yet reached the far right end:
      if (delta > 0 && translateRef.current > -maxTranslate) {
        e.preventDefault()
        const newTranslate = Math.max(proposedTranslate, -maxTranslate)
        translateRef.current = newTranslate
        setTranslateX(newTranslate)
        setProgressPct((-newTranslate / maxTranslate) * 100)
      } 
      // If scrolling UP and not yet back at the far left start:
      else if (delta < 0 && translateRef.current < 0) {
        e.preventDefault()
        const newTranslate = Math.min(proposedTranslate, 0)
        translateRef.current = newTranslate
        setTranslateX(newTranslate)
        setProgressPct((-newTranslate / maxTranslate) * 100)
      }
    }

    container.addEventListener('wheel', handleWheel, { passive: false })
    return () => container.removeEventListener('wheel', handleWheel)
  }, [filteredItems])

  return (
    <div className="page">
      {/* Hero Banner */}
      <div 
        className={styles.heroBanner}
        style={{ backgroundImage: `url("/main campus night view 14 aug lighting celebration image official facebook.png")` }}
      >
        <div className={styles.heroOverlay} />
        <div className={styles.heroContent}>
          <p className={styles.heroTagline}>VISUAL MEMORIES &amp; LANDMARKS</p>
          <h1 className={styles.heroTitle}>CAMPUS EVENT GALLERY</h1>
          <p className={styles.heroDescription}>
            A curated visual story of Dawood University of Engineering &amp; Technology — main campus lawns, Gulberg IC&amp;S labs, CEMET campus, and 14th August celebrations captured by students.
          </p>
        </div>
        <span className={styles.heroCreditBadge}>
          <Camera size={12} /> Image by Official Facebook Page
        </span>
      </div>

      {/* Filter Tabs */}
      <div className={styles.filterTabs}>
        <button 
          className={`${styles.tabBtn} ${activeTab === 'ALL' ? styles.activeTab : ''}`}
          onClick={() => setActiveTab('ALL')}
        >
          All Moments ({GALLERY_ITEMS.filter(i => i.type !== 'stat').length})
        </button>
        <button 
          className={`${styles.tabBtn} ${activeTab === 'MAIN' ? styles.activeTab : ''}`}
          onClick={() => setActiveTab('MAIN')}
        >
          Main Campus
        </button>
        <button 
          className={`${styles.tabBtn} ${activeTab === 'GULBERG' ? styles.activeTab : ''}`}
          onClick={() => setActiveTab('GULBERG')}
        >
          Gulberg Town Campus
        </button>
        <button 
          className={`${styles.tabBtn} ${activeTab === 'CELEBRATIONS' ? styles.activeTab : ''}`}
          onClick={() => setActiveTab('CELEBRATIONS')}
        >
          Celebrations &amp; Events
        </button>
        <button 
          className={`${styles.tabBtn} ${activeTab === 'CEMET' ? styles.activeTab : ''}`}
          onClick={() => setActiveTab('CEMET')}
        >
          CEMET Campus
        </button>
      </div>

      {/* Horizontal Scroll Lock Gallery Section */}
      <div className={styles.horizontalGallerySection} ref={containerRef}>
        <div 
          className={styles.scrollTrack} 
          ref={trackRef}
          style={{ transform: `translateX(${translateX}px)` }}
        >
          {filteredItems.map(item => {
            if (item.type === 'stat') {
              return (
                <div key={item.id} className={styles.horizontalStatCard}>
                  <h2 style={{ fontSize: '56px', fontWeight: 900, margin: 0, lineHeight: 1 }}>{item.stat}</h2>
                  <p style={{ fontSize: '18px', fontWeight: 700, margin: 0 }}>{item.label}</p>
                  <p style={{ fontSize: '13px', opacity: 0.85, margin: 0 }}>{item.sub}</p>
                </div>
              )
            }

            return (
              <div 
                key={item.id} 
                className={styles.horizontalCard}
                onClick={() => setSelectedPhoto(item)}
              >
                <img src={item.image} alt={item.title} className={styles.horizontalCardImg} />
                <div className={styles.horizontalCardOverlay} />
                
                <div className={styles.bentoArrow}>
                  <ArrowUpRight size={18} />
                </div>

                <div className={styles.horizontalCardContent}>
                  <p style={{ fontSize: '18px', fontWeight: 800, margin: 0, lineHeight: 1.2 }}>{item.title}</p>
                  <p style={{ fontSize: '13px', opacity: 0.9, margin: '6px 0 0 0' }}>{item.location}</p>
                  <span className={styles.photoCreditBadge} style={{ position: 'relative', display: 'inline-flex', marginTop: '10px' }}>
                    <Camera size={11} /> Image by {item.credit}
                  </span>
                </div>
              </div>
            )
          })}
        </div>

        <div className={styles.scrollProgressTrack}>
          <div className={styles.scrollProgressBar} style={{ width: `${progressPct}%` }} />
        </div>
      </div>

      {/* Lightbox Preview Modal */}
      {selectedPhoto && (
        <div className={styles.lightboxModal} onClick={() => setSelectedPhoto(null)}>
          <button 
            className={`${styles.lightboxNavBtn} ${styles.lightboxNavLeft}`}
            onClick={handlePrevPhoto}
            aria-label="Previous Photo"
          >
            <ChevronLeft size={24} />
          </button>

          <div className={styles.lightboxContent} onClick={e => e.stopPropagation()}>
            <button className={styles.lightboxClose} onClick={() => setSelectedPhoto(null)}>
              <X size={20} />
            </button>
            <img src={selectedPhoto.image} alt={selectedPhoto.title} className={styles.lightboxImg} />
            <div className={styles.lightboxFooter}>
              <div>
                <h3 style={{ fontSize: '18px', fontWeight: 800, margin: 0, color: '#fff' }}>{selectedPhoto.title}</h3>
                <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.7)', margin: '4px 0 0 0', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <MapPin size={13} /> {selectedPhoto.location}
                </p>
              </div>
              <span className={styles.photoCreditBadge}>
                <Camera size={12} /> Image by {selectedPhoto.credit}
              </span>
            </div>
          </div>

          <button 
            className={`${styles.lightboxNavBtn} ${styles.lightboxNavRight}`}
            onClick={handleNextPhoto}
            aria-label="Next Photo"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      )}
    </div>
  )
}
