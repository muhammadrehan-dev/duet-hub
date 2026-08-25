import { useState, useEffect } from 'react'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import { Menu, X, ChevronRight } from 'lucide-react'
import styles from './Nav.module.css'

export default function Nav() {
  const location = useLocation()
  const navigate = useNavigate()
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const isHomePage = location.pathname === '/'

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 80) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }
    window.addEventListener('scroll', handleScroll)
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileMenuOpen(false)
  }, [location.pathname])

  const scrollToSection = (sectionId) => {
    setMobileMenuOpen(false)
    if (isHomePage) {
      const el = document.getElementById(sectionId)
      if (el) el.scrollIntoView({ behavior: 'smooth' })
    } else {
      navigate(`/#${sectionId}`)
    }
  }

  const isBrowserPage = location.pathname.startsWith('/browser')
  const isTransparent = !isBrowserPage && !scrolled

  return (
    <nav className={`${styles.nav} ${isTransparent ? styles.transparentNav : styles.solidNav}`}>
      {/* Brand / Logo */}
      <Link to="/" className={styles.brand}>
        <img src="/logo-512.png" alt="DUET Logo" className={styles.brandLogoImg} />
        <span className={styles.brandText}>DUET<span className={styles.brandAccent}>Hub</span></span>
      </Link>

      {/* Centered Desktop Links */}
      <ul className={styles.links}>
        <li>
          <NavLink
            to="/"
            className={({ isActive }) => `${styles.link} ${isActive ? styles.active : ''}`}
            end
          >
            {({ isActive }) => (
              <>
                Home
                {isActive && <span className={styles.activeDot} />}
              </>
            )}
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/admissions"
            className={({ isActive }) => `${styles.link} ${isActive ? styles.active : ''}`}
          >
            {({ isActive }) => (
              <>
                Admissions
                {isActive && <span className={styles.activeDot} />}
              </>
            )}
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/resources"
            className={({ isActive }) => `${styles.link} ${isActive ? styles.active : ''}`}
          >
            {({ isActive }) => (
              <>
                Resources
                {isActive && <span className={styles.activeDot} />}
              </>
            )}
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/bus-points"
            className={({ isActive }) => `${styles.link} ${isActive ? styles.active : ''}`}
          >
            {({ isActive }) => (
              <>
                Bus Points
                {isActive && <span className={styles.activeDot} />}
              </>
            )}
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/gallery"
            className={({ isActive }) => `${styles.link} ${isActive ? styles.active : ''}`}
          >
            {({ isActive }) => (
              <>
                Gallery
                {isActive && <span className={styles.activeDot} />}
              </>
            )}
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/newbie"
            className={({ isActive }) => `${styles.link} ${isActive ? styles.active : ''}`}
          >
            {({ isActive }) => (
              <>
                Newbie
                {isActive && <span className={styles.activeDot} />}
              </>
            )}
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/about"
            className={({ isActive }) => `${styles.link} ${isActive ? styles.active : ''}`}
          >
            {({ isActive }) => (
              <>
                About
                {isActive && <span className={styles.activeDot} />}
              </>
            )}
          </NavLink>
        </li>
      </ul>

      {/* Mobile Hamburger Toggle Button */}
      <button 
        className={styles.hamburgerBtn}
        onClick={() => setMobileMenuOpen(prev => !prev)}
        aria-label="Toggle Navigation Menu"
      >
        {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
      </button>

      {/* Mobile Navigation Drawer Overlay (Full-screen white from right) */}
      {mobileMenuOpen && (
        <div className={styles.mobileDrawer}>
          <div className={styles.mobileDrawerHeader}>
            <div className={styles.brand} onClick={() => setMobileMenuOpen(false)}>
              <img src="/logo-512.png" alt="DUET Logo" className={styles.brandLogoImg} />
              <span className={styles.brandText} style={{ color: '#09090B' }}>
                DUET <span className={styles.brandAccent} style={{ color: '#1A98D5' }}>HUB</span>
              </span>
            </div>
            <button 
              className={styles.mobileDrawerCloseBtn} 
              onClick={() => setMobileMenuOpen(false)}
              aria-label="Close Menu"
            >
              <X size={24} />
            </button>
          </div>

          <div className={styles.mobileNavList}>
            <Link to="/" onClick={() => setMobileMenuOpen(false)} className={`${styles.mobileLink} ${location.pathname === '/' ? styles.mobileActive : ''}`}>
              Home <ChevronRight size={18} />
            </Link>
            <Link to="/admissions" onClick={() => setMobileMenuOpen(false)} className={`${styles.mobileLink} ${location.pathname === '/admissions' ? styles.mobileActive : ''}`}>
              Admissions <ChevronRight size={18} />
            </Link>
            <Link to="/resources" onClick={() => setMobileMenuOpen(false)} className={`${styles.mobileLink} ${location.pathname === '/resources' ? styles.mobileActive : ''}`}>
              Resources &amp; Course Materials <ChevronRight size={18} />
            </Link>
            <Link to="/bus-points" onClick={() => setMobileMenuOpen(false)} className={`${styles.mobileLink} ${location.pathname === '/bus-points' ? styles.mobileActive : ''}`}>
              Bus Points &amp; Routes <ChevronRight size={18} />
            </Link>
            <Link to="/gallery" onClick={() => setMobileMenuOpen(false)} className={`${styles.mobileLink} ${location.pathname === '/gallery' ? styles.mobileActive : ''}`}>
              Campus Gallery <ChevronRight size={18} />
            </Link>
            <Link to="/newbie" onClick={() => setMobileMenuOpen(false)} className={`${styles.mobileLink} ${location.pathname === '/newbie' ? styles.mobileActive : ''}`}>
              Newbie Guide <ChevronRight size={18} />
            </Link>
            <Link to="/about" onClick={() => setMobileMenuOpen(false)} className={`${styles.mobileLink} ${location.pathname === '/about' ? styles.mobileActive : ''}`}>
              About DUET Hub <ChevronRight size={18} />
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}
