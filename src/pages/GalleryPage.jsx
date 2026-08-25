import { useState, useEffect } from 'react'
import { 
  Search, 
  MapPin, 
  Camera, 
  X, 
  ChevronLeft, 
  ChevronRight,
  Maximize2
} from 'lucide-react'
import styles from './GalleryPage.module.css'

const GALLERY_ITEMS = [
  {
    id: 1,
    title: 'Main Campus Gate — 14th August Celebrations',
    location: 'Main Campus, New M.A. Jinnah Road',
    image: '/main campus main gate on independence day image by aheer.png',
    credit: 'Aheer',
    avatar: 'A',
    avatarBg: '#1A98D5',
    category: 'MAIN',
    aspectRatio: '16/10',
    description: 'Main entrance gate beautifully decorated with traditional green and white lights for Independence Day.',
  },
  {
    id: 2,
    title: 'IC&S Gulberg Campus Courtyard',
    location: 'Gulberg Town Campus',
    image: '/gulber inside image by fozan.png',
    credit: 'Fozan',
    avatar: 'F',
    avatarBg: '#10B981',
    category: 'GULBERG',
    aspectRatio: '4/3',
    description: 'Serene courtyard view inside the Gulberg IC&S campus showing greenery and academic block.',
  },
  {
    id: 3,
    title: 'Chemical Engineering Dept View',
    location: 'Main Campus Courtyard',
    image: '/main campus image from chemical dept image by Aftab Ullah.png',
    credit: 'Aftab Ullah',
    avatar: 'A',
    avatarBg: '#F59E0B',
    category: 'MAIN',
    aspectRatio: '3/4',
    description: 'Perspective view of the main campus quadrangle captured from Chemical Department walkway.',
  },
  {
    id: 4,
    title: 'CEMET Campus Aerial Landmark View',
    location: 'Rohri-Sukkur (CEMET) Campus',
    image: '/cemet campus ariel view image by official facebook page.png',
    credit: 'Official Facebook Page',
    avatar: 'D',
    avatarBg: '#8B5CF6',
    category: 'CEMET',
    aspectRatio: '16/9',
    description: 'High-altitude aerial landmark view of the state-of-the-art CEMET Sukkur Campus facility.',
  },
  {
    id: 5,
    title: 'Main Auditorium Night Celebration',
    location: 'Main Campus Auditorium',
    image: '/duet auditorium night view 14 aug celebration image by official facebook.png',
    credit: 'Official Facebook Page',
    avatar: 'D',
    avatarBg: '#EC4899',
    category: 'CELEBRATIONS',
    aspectRatio: '16/10',
    description: 'Vibrant green and white illumination of the main auditorium during Independence night celebration.',
  },
  {
    id: 6,
    title: 'Main Campus Lawn & Greenery',
    location: 'Main Campus Lawns',
    image: '/main campus garden image by Sidra tul Muntaha.png',
    credit: 'Sidra tul Muntaha',
    avatar: 'S',
    avatarBg: '#14B8A6',
    category: 'MAIN',
    aspectRatio: '4/3',
    description: 'Lush green lawns and palm trees framing the central academic pathways.',
  },
  {
    id: 7,
    title: 'Main Entrance Gate & Security Check',
    location: 'Jinnah Main Entrance',
    image: '/main campus main gate image by Faheem Bozdar.png',
    credit: 'Faheem Bozdar',
    avatar: 'F',
    avatarBg: '#6366F1',
    category: 'MAIN',
    aspectRatio: '16/10',
    description: 'Daylight view of the iconic DUET main entrance arch on New M.A. Jinnah Road.',
  },
  {
    id: 8,
    title: 'Gulberg Campus Front Entrance',
    location: 'Gulberg Town Campus',
    image: '/gulberg-campus.png',
    credit: 'Zubia Abdul Sattar',
    avatar: 'Z',
    avatarBg: '#06B6D4',
    category: 'GULBERG',
    aspectRatio: '16/9',
    description: 'Front facade and entry area of the IC&S Gulberg Campus block.',
  },
  {
    id: 9,
    title: '14th August Night Lights Display',
    location: 'Main Campus Night Lights',
    image: '/main campus night view 14 aug lighting celebration image official facebook.png',
    credit: 'Official Facebook Page',
    avatar: 'D',
    avatarBg: '#F97316',
    category: 'CELEBRATIONS',
    aspectRatio: '16/9',
    description: 'Spectacular decorative light display covering the main building facade at night.',
  },
  {
    id: 10,
    title: 'CEMET Campus Conference Hall',
    location: 'Rohri-Sukkur (CEMET) Campus',
    image: '/cemet campus confrence hall image by official facebook page of cemet campus.png',
    credit: 'Official Facebook Page',
    avatar: 'D',
    avatarBg: '#8B5CF6',
    category: 'CEMET',
    aspectRatio: '16/10',
    description: 'Modern executive conference auditorium equipped for symposiums and academic seminars.',
  },
  {
    id: 11,
    title: 'Main Auditorium Stage & Lighting',
    location: 'Main Campus Auditorium',
    image: '/main campus auditorium image by life as dawoodian.png',
    credit: 'Life as Dawoodian',
    avatar: 'L',
    avatarBg: '#3B82F6',
    category: 'CELEBRATIONS',
    aspectRatio: '4/3',
    description: 'Stage lighting setup prepared for student graduation convocation ceremony.',
  },
  {
    id: 12,
    title: 'Gulberg Campus Academic Block',
    location: 'Gulberg Town Campus',
    image: '/gulberg campus academic block image by Syed Shayan.png',
    credit: 'Syed Shayan',
    avatar: 'S',
    avatarBg: '#10B981',
    category: 'GULBERG',
    aspectRatio: '16/9',
    description: 'Clear blue sky framing the Gulberg engineering academic wing.',
  },
  {
    id: 13,
    title: 'AR/VR Lab & Garden View',
    location: 'Gulberg Academic Block',
    image: '/gulberg campus academic block view from garden showing AR VR lab from outside image by zubia abdul sattar.png',
    credit: 'Zubia Abdul Sattar',
    avatar: 'Z',
    avatarBg: '#06B6D4',
    category: 'GULBERG',
    aspectRatio: '4/3',
    description: 'Exterior view of the newly established AR/VR Advanced Computing Laboratory.',
  },
  {
    id: 14,
    title: 'Cafeteria Sitting & Campus View',
    location: 'Gulberg Campus Cafeteria',
    image: '/gulberg campus academic block view from sitting in cafeteria image by fozan.png',
    credit: 'Fozan',
    avatar: 'F',
    avatarBg: '#1A98D5',
    category: 'GULBERG',
    aspectRatio: '3/4',
    description: 'Relaxed student seating patio outside the student cafeteria.',
  },
  {
    id: 15,
    title: 'Main Campus Outside Aerial View',
    location: 'New M.A. Jinnah Road',
    image: '/main campus outside image by  AD_ADEEL_AHMED.png',
    credit: 'AD_ADEEL_AHMED',
    avatar: 'A',
    avatarBg: '#6366F1',
    category: 'MAIN',
    aspectRatio: '16/9',
    description: 'Panoramic urban view of DUET Main Campus situated on Karachi’s central artery.',
  },
]

export default function GalleryPage() {
  const [activeTab, setActiveTab] = useState('ALL')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedPhoto, setSelectedPhoto] = useState(null)

  const filteredItems = GALLERY_ITEMS.filter(item => {
    if (activeTab !== 'ALL' && item.category !== activeTab) return false

    if (!searchQuery.trim()) return true
    const q = searchQuery.toLowerCase()
    return (
      item.title.toLowerCase().includes(q) ||
      item.location.toLowerCase().includes(q) ||
      item.credit.toLowerCase().includes(q) ||
      item.category.toLowerCase().includes(q)
    )
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

  return (
    <div className="page">
      {/* Hero Banner (Full 100vh Screen Height) */}
      <div className={styles.heroBanner}>
        <div className={styles.heroOverlay} />
        <div className={styles.heroContent}>
          <p className={styles.heroTagline}>CAMPUS PHOTO SHOWCASE</p>
          <h1 className={styles.heroTitle}>CAMPUS EVENT GALLERY</h1>
          <p className={styles.heroDescription}>
            A visual chronicle of Dawood University of Engineering &amp; Technology — capturing main campus landmarks, IC&amp;S Gulberg departments, CEMET Sukkur facilities, and student celebrations.
          </p>
        </div>
      </div>

      {/* Search & Category Controls */}
      <div className={styles.galleryControlsBar}>
        <div className={styles.searchBox}>
          <Search size={18} className={styles.searchIcon} />
          <input 
            type="text" 
            placeholder="Search campus photos, locations, photographers..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={styles.searchInput}
          />
          {searchQuery && (
            <button className={styles.clearSearchBtn} onClick={() => setSearchQuery('')}>
              <X size={15} />
            </button>
          )}
        </div>

        {/* Filter Pills */}
        <div className={styles.filterTabs}>
          <button 
            className={`${styles.tabBtn} ${activeTab === 'ALL' ? styles.activeTab : ''}`}
            onClick={() => setActiveTab('ALL')}
          >
            All Photos ({GALLERY_ITEMS.length})
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
            Gulberg Campus
          </button>
          <button 
            className={`${styles.tabBtn} ${activeTab === 'CELEBRATIONS' ? styles.activeTab : ''}`}
            onClick={() => setActiveTab('CELEBRATIONS')}
          >
            Events &amp; Celebrations
          </button>
          <button 
            className={`${styles.tabBtn} ${activeTab === 'CEMET' ? styles.activeTab : ''}`}
            onClick={() => setActiveTab('CEMET')}
          >
            CEMET Campus
          </button>
        </div>
      </div>

      {/* Fixed Height Justified Image Collage Grid */}
      <div className={styles.pinterestMasonrySection}>
        {filteredItems.length === 0 ? (
          <div className={styles.emptyGalleryState}>
            <Camera size={42} style={{ opacity: 0.4 }} />
            <h3>No campus photos found</h3>
            <p>Try resetting your search query or category filter.</p>
            <button className="btn btn-primary" onClick={() => { setActiveTab('ALL'); setSearchQuery('') }}>
              Reset Filters
            </button>
          </div>
        ) : (
          <div className={styles.pinterestGrid}>
            {filteredItems.map(item => (
              <div 
                key={item.id} 
                className={styles.pinterestCard}
                style={{ aspectRatio: item.aspectRatio }}
                onClick={() => setSelectedPhoto(item)}
              >
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className={styles.cardImg} 
                  loading="lazy"
                />

                {/* Hover overlay indicator */}
                <div className={styles.cardHoverOverlay}>
                  <span className={styles.expandIconBadge}>
                    <Maximize2 size={16} /> Full Screen
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Full Screen Image Viewer Modal */}
      {selectedPhoto && (
        <div className={styles.fullScreenOverlay} onClick={() => setSelectedPhoto(null)}>
          {/* Close Button */}
          <button className={styles.fullScreenCloseBtn} onClick={() => setSelectedPhoto(null)}>
            <X size={24} />
          </button>

          {/* Left Arrow */}
          <button 
            className={`${styles.fullScreenNavBtn} ${styles.fullScreenNavLeft}`}
            onClick={handlePrevPhoto}
            aria-label="Previous Photo"
          >
            <ChevronLeft size={28} />
          </button>

          {/* Full Screen Content Wrapper */}
          <div className={styles.fullScreenContainer} onClick={e => e.stopPropagation()}>
            <div className={styles.fullScreenImageWrap}>
              <img 
                src={selectedPhoto.image} 
                alt={selectedPhoto.title} 
                className={styles.fullScreenMainImg} 
              />
            </div>

            {/* Bottom Caption & Photo Credit Bar */}
            <div className={styles.fullScreenCaptionBar}>
              <div className={styles.captionMainGroup}>
                <span className={styles.fullScreenCategoryBadge}>{selectedPhoto.category} CAMPUS</span>
                <h2 className={styles.fullScreenTitle}>{selectedPhoto.title}</h2>
                <div className={styles.fullScreenLocationTag}>
                  <MapPin size={14} color="var(--accent)" />
                  <span>{selectedPhoto.location}</span>
                </div>
                {selectedPhoto.description && (
                  <p className={styles.fullScreenDescription}>{selectedPhoto.description}</p>
                )}
              </div>

              {/* Photo Credit Badge */}
              <div className={styles.fullScreenCreditBadge}>
                <div 
                  className={styles.creditAvatar}
                  style={{ backgroundColor: selectedPhoto.avatarBg }}
                >
                  {selectedPhoto.avatar}
                </div>
                <div className={styles.creditMeta}>
                  <span className={styles.creditSub}>Photo Credit</span>
                  <span className={styles.creditName}>{selectedPhoto.credit}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Arrow */}
          <button 
            className={`${styles.fullScreenNavBtn} ${styles.fullScreenNavRight}`}
            onClick={handleNextPhoto}
            aria-label="Next Photo"
          >
            <ChevronRight size={28} />
          </button>
        </div>
      )}
    </div>
  )
}
