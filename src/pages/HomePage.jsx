import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { SITE, SEMESTERS } from '@/data/config'
import { 
  FolderArchive, ArrowRight, Camera, ArrowUpRight, 
  BookOpen, GraduationCap, Users, ShieldCheck, Zap, 
  FileText, Sparkles, Layers, Globe, Code2, Heart,
  Mail, MessageSquare, UploadCloud
} from 'lucide-react'
import styles from './HomePage.module.css'

function SemesterCard({ semester }) {
  const navigate = useNavigate()
  return (
    <div
      className={styles.semesterCard}
      onClick={() => navigate(`/browser/${encodeURIComponent(semester.id)}`)}
    >
      <div className={styles.semesterIcon}>
        <FolderArchive size={22} />
      </div>
      <div className={styles.semesterInfo}>
        <p className={styles.semesterLabel}>{semester.label}</p>
        <p className={styles.semesterRepo}>{semester.github.repo}</p>
      </div>
      <span className={styles.semesterArrow}>
        <ArrowRight size={18} />
      </span>
    </div>
  )
}

const HERO_SLIDES = [
  {
    image: '/main campus main gate image by Faheem Bozdar.png',
    credit: 'Faheem Bozdar',
    caption: 'Jinnah Main Campus Entrance Gate',
  },
  {
    image: '/gulber inside image by fozan.png',
    credit: 'Fozan',
    caption: 'IC&S Gulberg Campus Courtyard',
  },
  {
    image: '/main campus image from chemical dept image by Aftab Ullah.png',
    credit: 'Aftab Ullah',
    caption: 'Chemical Engineering Department View',
  },
  {
    image: '/main campus main gate on independence day image by aheer.png',
    credit: 'Aheer',
    caption: 'Main Campus Independence Day Banners',
  },
]

const GALLERY_PHOTOS = [
  {
    id: 1,
    title: 'Main Campus Gate — 14th August',
    location: 'Main Campus, New M.A. Jinnah Road',
    image: '/main campus main gate on independence day image by aheer.png',
    credit: 'Aheer',
    layout: 'tall',
  },
  {
    id: 2,
    title: 'IC&S Gulberg Campus',
    location: 'Gulberg Town Campus',
    image: '/gulber inside image by fozan.png',
    credit: 'Fozan',
    layout: 'wide',
  },
  {
    id: 3,
    title: 'Chemical Dept Courtyard',
    location: 'Main Campus',
    image: '/main campus image from chemical dept image by Aftab Ullah.png',
    credit: 'Aftab Ullah',
    layout: 'normal',
  },
  {
    id: 5,
    title: 'Main Auditorium Night Celebration',
    location: '14th August Celebrations',
    image: '/duet auditorium night view 14 aug celebration image by official facebook.png',
    credit: 'Official Facebook Page',
    layout: 'normal',
  },
  {
    id: 6,
    title: 'Main Campus Lawn & Gardens',
    location: 'Main Campus',
    image: '/main campus garden image by Sidra tul Muntaha.png',
    credit: 'Sidra tul Muntaha',
    layout: 'wide',
  },
  {
    id: 7,
    title: 'Jinnah Entrance Gate',
    location: 'Main Entrance',
    image: '/main campus main gate image by Faheem Bozdar.png',
    credit: 'Faheem Bozdar',
    layout: 'normal',
  },
]

export default function HomePage() {
  const navigate = useNavigate()
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % HERO_SLIDES.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const slide = HERO_SLIDES[currentSlide]

  return (
    <div className="page">
      {/* Dynamic Hero Carousel */}
      <div className={styles.heroBanner}>
        <div className={styles.heroSlidesTrack}>
          {HERO_SLIDES.map((s, idx) => (
            <div
              key={idx}
              className={`${styles.heroSlide} ${idx === currentSlide ? styles.activeSlide : ''}`}
              style={{ backgroundImage: `url("${s.image}")` }}
            />
          ))}
        </div>

        <div className={styles.heroOverlay} />

        <div className={styles.heroContent}>
          <p className={styles.heroTagline}>
            UNOFFICIAL STUDENT RESOURCE HUB — FOR THE STUDENTS, BY THE STUDENTS
          </p>
          <h1 className={styles.heroTitle}>
            WELCOME TO DUET HUB
          </h1>
          <p className={styles.heroDescription}>
            The centralized open academic repository for Dawood University of Engineering &amp; Technology. Access lecture slides, past papers, lab manuals, merit calculators, and freshman survival guides — zero login required.
          </p>
          <div className={styles.heroActions}>
            <button 
              className={styles.heroBtnPrimary}
              onClick={() => navigate('/resources')}
            >
              Browse Course Material <ArrowRight size={16} />
            </button>
            <button 
              className={styles.heroBtnSecondary}
              onClick={() => navigate('/admissions')}
            >
              Admissions 2026 Guide
            </button>
          </div>
        </div>

        <span className={styles.heroCreditBadge}>
          <Camera size={12} /> Image by {slide.credit}
        </span>
      </div>

      {/* Live Impact Stats Bar */}
      <div className={styles.statsBar}>
        <div className={styles.statCard}>
          <div className={styles.statIcon}><BookOpen size={24} /></div>
          <div>
            <p className={styles.statValue}>1,800+</p>
            <p className={styles.statLabel}>Course Files &amp; Slides</p>
          </div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statIcon}><Layers size={24} /></div>
          <div>
            <p className={styles.statValue}>14+</p>
            <p className={styles.statLabel}>Academic Departments</p>
          </div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statIcon}><Globe size={24} /></div>
          <div>
            <p className={styles.statValue}>3</p>
            <p className={styles.statLabel}>University Campuses</p>
          </div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statIcon}><ShieldCheck size={24} /></div>
          <div>
            <p className={styles.statValue}>100%</p>
            <p className={styles.statLabel}>Free &amp; Open Access</p>
          </div>
        </div>
      </div>

      {/* ─── SECTION 1: WHO WE ARE (Image + Text Split) ────────────────────────── */}
      <div style={{ marginBottom: '3.5rem' }}>
        <p className="section-label">Our Student Collective</p>
        
        <div className={styles.featureSection}>
          <div className={styles.featureImageWrap}>
            <img 
              src="/main campus main gate on independence day image by aheer.png" 
              alt="Main Campus Gate" 
              className={styles.featureImg} 
            />
            <span className={styles.heroCreditBadge} style={{ position: 'absolute', bottom: '14px', right: '14px' }}>
              <Camera size={11} /> Image by Aheer
            </span>
          </div>

          <div className={styles.featureBody}>
            <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--accent)', background: 'var(--accent-light)', padding: '4px 12px', borderRadius: '99px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Student Collective
            </span>
            <h2 className={styles.featureTitle}>Who We Are</h2>
            <p className={styles.featureText}>
              DUET Hub is not just a single-person project — it is a student collective initiative powered by contributions from many Dawoodians across Cybersecurity, Artificial Intelligence, Computer Science, Chemical, Petroleum, Electronics, Metallurgy, and Civil Engineering batches. Led by <strong>Muhammad Rehan (@CH4_EZIO)</strong>, Syed Sheharyar Tariq, Abdul Hayy Khan, and student drive maintainers, we work together to preserve academic knowledge for everyone.
            </p>
            <button 
              className="btn btn-secondary"
              onClick={() => navigate('/about')}
              style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '10px 18px', fontSize: '13px', fontWeight: 700 }}
            >
              Meet The Contributors <ArrowRight size={15} />
            </button>
          </div>
        </div>
      </div>

      {/* ─── SECTION 2: WHAT WE DO (Image + Text Split) ────────────────────────── */}
      <div style={{ marginBottom: '3.5rem' }}>
        <p className="section-label">Academic Repositories</p>
        
        <div className={styles.featureSection}>
          <div className={styles.featureBody}>
            <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--accent)', background: 'var(--accent-light)', padding: '4px 12px', borderRadius: '99px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Open Repositories
            </span>
            <h2 className={styles.featureTitle}>What We Do</h2>
            <p className={styles.featureText}>
              We organize university semester folders, lecture presentations, lab manuals, syllabus outlines, past exam papers, and entry test sample papers into one fast, searchable web repository. Students can preview PDFs directly in their browser or download files with a single click — zero login required.
            </p>
            <button 
              className="btn btn-primary"
              onClick={() => navigate('/resources')}
              style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '10px 18px', fontSize: '13px', fontWeight: 700 }}
            >
              Explore Course Files <ArrowRight size={15} />
            </button>
          </div>

          <div className={styles.featureImageWrap}>
            <img 
              src="/gulberg campus academic block image by Syed Shayan.png" 
              alt="IC&S Gulberg Academic Block" 
              className={styles.featureImg} 
            />
            <span className={styles.heroCreditBadge} style={{ position: 'absolute', bottom: '14px', right: '14px' }}>
              <Camera size={11} /> Image by Syed Shayan
            </span>
          </div>
        </div>
      </div>

      {/* ─── SECTION 3: WHY WE BUILT DUET HUB (Image + Text Split) ─────────────── */}
      <div style={{ marginBottom: '3.5rem' }}>
        <p className="section-label">Free Education Mission</p>
        
        <div className={styles.featureSection}>
          <div className={styles.featureImageWrap}>
            <img 
              src="/main campus garden image by Sidra tul Muntaha.png" 
              alt="Main Campus Gardens" 
              className={styles.featureImg} 
            />
            <span className={styles.heroCreditBadge} style={{ position: 'absolute', bottom: '14px', right: '14px' }}>
              <Camera size={11} /> Image by Sidra tul Muntaha
            </span>
          </div>

          <div className={styles.featureBody}>
            <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--accent)', background: 'var(--accent-light)', padding: '4px 12px', borderRadius: '99px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Our Mission
            </span>
            <h2 className={styles.featureTitle}>Why We Built DUET Hub</h2>
            <p className={styles.featureText}>
              We built DUET Hub to eliminate the academic chaos of files lost in 40+ WhatsApp group chats. Guided by open-source principles, we believe every Dawoodian student deserves instant, 100% free, and unrestricted access to high-quality academic study materials from Day 1 to graduation.
            </p>
            <button 
              className="btn btn-secondary"
              onClick={() => navigate('/newbie')}
              style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '10px 18px', fontSize: '13px', fontWeight: 700 }}
            >
              Freshman Survival Guide <ArrowRight size={15} />
            </button>
          </div>
        </div>
      </div>

      {/* Contribute & Share Section with Images */}
      <div style={{ marginBottom: '3.5rem' }}>
        <p className="section-label">Student Community Contributions</p>
        <h2 style={{ fontSize: '28px', fontWeight: 800, fontFamily: 'var(--font-sans)', margin: '0 0 1.5rem 0' }}>Contribute Photos, Notes &amp; Past Papers</h2>

        <div className={styles.contributeGrid}>
          {/* Contribution Card 1: Campus Photos */}
          <div className={styles.contributeCard}>
            <div className={styles.contributeImgWrap}>
              <img 
                src="/gulberg campus academic block image by Syed Shayan.png" 
                alt="IC&S Gulberg Campus Block" 
                className={styles.contributeImg} 
              />
              <span className={styles.heroCreditBadge} style={{ position: 'absolute', bottom: '12px', right: '12px' }}>
                <Camera size={11} /> Image by Syed Shayan
              </span>
            </div>
            <div className={styles.contributeBody}>
              <h3 className={styles.contributeTitle}>Share Your Campus &amp; Event Photos</h3>
              <p className={styles.contributeDesc}>
                Captured great photos of DUET main campus, IC&amp;S Gulberg, CEMET Sukkur, 14th August celebrations, or student life? Email or send them to us — we will feature them on the website with your photographer credit badge!
              </p>
              <div className={styles.contributeBtnGroup}>
                <a href="mailto:CH4_Ezio@proton.me" className={styles.contactBadgeBtn}>
                  <Mail size={13} /> ProtonMail
                </a>
                <a href="mailto:syedsheharyarprofessional@gmail.com" className={styles.contactBadgeBtn}>
                  <Mail size={13} /> Gmail
                </a>
                <a href="https://wa.me/923229680603" target="_blank" rel="noreferrer" className={styles.contactBadgeBtn}>
                  <MessageSquare size={13} /> WhatsApp
                </a>
              </div>
            </div>
          </div>

          {/* Contribution Card 2: Study Materials */}
          <div className={styles.contributeCard}>
            <div className={styles.contributeImgWrap}>
              <img 
                src="/cemet campus confrence hall image by official facebook page of cemet campus.png" 
                alt="CEMET Conference Hall" 
                className={styles.contributeImg} 
              />
              <span className={styles.heroCreditBadge} style={{ position: 'absolute', bottom: '12px', right: '12px' }}>
                <Camera size={11} /> Image by Official Facebook Page
              </span>
            </div>
            <div className={styles.contributeBody}>
              <h3 className={styles.contributeTitle}>Contribute Notes, Assignments &amp; Past Papers</h3>
              <p className={styles.contributeDesc}>
                Have lecture slides, solved lab files, past exam papers, or syllabus notes for your department? Help thousands of Dawoodians by sending your files to us via email, WhatsApp, or GitHub pull request!
              </p>
              <div className={styles.contributeBtnGroup}>
                <a href="mailto:CH4_Ezio@proton.me" className={styles.contactBadgeBtn}>
                  <Mail size={13} /> ProtonMail
                </a>
                <a href="mailto:syedsheharyarprofessional@gmail.com" className={styles.contactBadgeBtn}>
                  <Mail size={13} /> Gmail
                </a>
                <a href="https://wa.me/923229680603" target="_blank" rel="noreferrer" className={styles.contactBadgeBtn}>
                  <MessageSquare size={13} /> WhatsApp
                </a>
                <a href="https://github.com/muhammadrehan-dev/subjects" target="_blank" rel="noreferrer" className={styles.contactBadgeBtn}>
                  <UploadCloud size={13} /> GitHub Repo
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Semester Catalog Section */}
      <div style={{ marginBottom: '3.5rem' }}>
        <p id="contents-section" className="section-label">Semester Catalog</p>
        <h2 style={{ fontSize: '28px', fontWeight: 800, fontFamily: 'var(--font-sans)', margin: '0 0 1.5rem 0' }}>Browse By Semester</h2>
        
        <div className={styles.semestersGrid}>
          {SEMESTERS.map(sem => (
            <SemesterCard key={sem.id} semester={sem} />
          ))}
        </div>
      </div>

      {/* Campus Event Gallery Preview */}
      <div style={{ marginTop: '3.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem' }}>
          <div>
            <p className="hero-label" style={{ color: 'var(--accent)', fontWeight: 700, margin: 0 }}>MOMENTS WE'VE LIVED</p>
            <h2 id="gallery-section" style={{ fontSize: '28px', fontWeight: 800, fontFamily: 'var(--font-sans)', margin: '4px 0 0 0' }}>Campus Event Gallery</h2>
          </div>
          <button 
            className="btn btn-secondary"
            onClick={() => navigate('/gallery')}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '10px 18px', fontSize: '13px', fontWeight: 700 }}
          >
            Explore Full Gallery <ArrowRight size={15} />
          </button>
        </div>

        <div className={styles.bentoGrid}>
          {GALLERY_PHOTOS.map(item => {
            let layoutClass = styles.bentoCardNormal
            if (item.layout === 'tall') layoutClass = styles.bentoCardTall
            if (item.layout === 'wide') layoutClass = styles.bentoCardWide

            return (
              <div 
                key={item.id} 
                className={`${styles.bentoCard} ${layoutClass}`}
                onClick={() => navigate('/gallery')}
              >
                <img src={item.image} alt={item.title} className={styles.bentoImg} />
                <div className={styles.bentoOverlay} />
                
                <div className={styles.bentoArrow}>
                  <ArrowUpRight size={18} />
                </div>

                <div className={styles.bentoContent}>
                  <p style={{ fontSize: '16px', fontWeight: 800, margin: 0, lineHeight: 1.2 }}>{item.title}</p>
                  <p style={{ fontSize: '12px', opacity: 0.9, margin: '4px 0 0 0' }}>{item.location}</p>
                  <span className={styles.photoCreditBadge} style={{ position: 'relative', display: 'inline-flex', marginTop: '8px', bottom: 'auto', right: 'auto' }}>
                    <Camera size={11} /> Image by {item.credit}
                  </span>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
