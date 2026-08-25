import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { SEMESTERS, MERIT_LISTS, SAMPLE_PAPERS } from '@/data/config'
import { FolderArchive, Search, ArrowRight, Camera, FileText, Award, BookOpen } from 'lucide-react'
import styles from './ResourcesPage.module.css'

export default function ResourcesPage() {
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState('')
  const [activeTab, setActiveTab] = useState('ALL')

  const ALL_ITEMS = [
    ...SEMESTERS.map(s => ({ ...s, category: 'SEMESTER', icon: FolderArchive, desc: 'Curated semester course folders, lecture slides, and past papers.' })),
    { ...MERIT_LISTS, category: 'ARCHIVE', icon: Award, desc: 'Historical merit lists, department cutoffs, and admissions stats.' },
    { ...SAMPLE_PAPERS, category: 'ARCHIVE', icon: FileText, desc: 'Official entry test sample papers and pattern guides.' },
  ]

  const filteredItems = ALL_ITEMS.filter(item => {
    const matchesTab = activeTab === 'ALL' || item.category === activeTab
    const matchesSearch = item.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          (item.github?.repo && item.github.repo.toLowerCase().includes(searchQuery.toLowerCase()))
    return matchesTab && matchesSearch
  })

  return (
    <div className="page">
      {/* Dedicated Hero Banner */}
      <div 
        className={styles.heroBanner}
        style={{ backgroundImage: `url("/main campus image from chemical dept image by Aftab Ullah.png")` }}
      >
        <div className={styles.heroOverlay} />
        <div className={styles.heroContent}>
          <p className={styles.heroTagline}>ACADEMIC ARCHIVES &amp; MATERIALS</p>
          <h1 className={styles.heroTitle}>COURSE RESOURCES</h1>
          <p className={styles.heroDescription}>
            Explore curated semester repositories, lecture presentations, past exam papers, lab manuals, sample papers, and merit list archives.
          </p>
        </div>
      </div>

      {/* Controls & Search */}
      <div className={styles.controlsSection}>
        <div className={styles.searchBarWrap}>
          <Search size={18} className={styles.searchIcon} />
          <input 
            type="text"
            className={styles.searchInput}
            placeholder="Search semester, course, or past paper..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className={styles.categoryTabs}>
          <button 
            className={`${styles.tabBtn} ${activeTab === 'ALL' ? styles.activeTab : ''}`}
            onClick={() => setActiveTab('ALL')}
          >
            All Resources ({ALL_ITEMS.length})
          </button>
          <button 
            className={`${styles.tabBtn} ${activeTab === 'SEMESTER' ? styles.activeTab : ''}`}
            onClick={() => setActiveTab('SEMESTER')}
          >
            Semesters ({SEMESTERS.length})
          </button>
          <button 
            className={`${styles.tabBtn} ${activeTab === 'ARCHIVE' ? styles.activeTab : ''}`}
            onClick={() => setActiveTab('ARCHIVE')}
          >
            Merit &amp; Entry Test (2)
          </button>
        </div>
      </div>

      {/* Resources Grid */}
      <div className={styles.resourcesGrid}>
        {filteredItems.map(item => {
          const IconComp = item.icon || FolderArchive
          return (
            <div 
              key={item.id}
              className={styles.resourceCard}
              onClick={() => navigate(`/browser/${encodeURIComponent(item.id)}`)}
            >
              <div className={styles.cardHeader}>
                <div className={styles.cardIcon}>
                  <IconComp size={22} />
                </div>
                <div>
                  <h3 className={styles.cardTitle}>{item.label}</h3>
                  {item.github?.repo && <p className={styles.cardSub}>{item.github.repo}</p>}
                </div>
              </div>
              <p className={styles.cardDesc}>{item.desc}</p>
              <div className={styles.cardFooter}>
                <span>Browse Files</span>
                <ArrowRight size={16} />
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
