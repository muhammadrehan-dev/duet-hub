import { Link } from 'react-router-dom'
import { SITE } from '@/data/config'
import { Heart, Camera, ArrowUpRight, GraduationCap } from 'lucide-react'
import styles from './Footer.module.css'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      {/* Background Aerial View Image with 30% Opacity */}
      <div 
        className={styles.bgImage}
        style={{ backgroundImage: `url("/main campus outside image by  AD_ADEEL_AHMED.png")` }}
      />
      <div className={styles.bgOverlay} />

      <div className={styles.container}>
        <div className={styles.inner}>
          {/* Brand & Overview Column */}
          <div className={styles.brandCol}>
            <div className={styles.logoRow}>
              <span className={styles.logoBadge}>⬡ DUETHub</span>
              <span className={styles.statusPill}>FREE &amp; OPEN SOURCE</span>
            </div>
            <p className={styles.tagline}>
              High-quality academic resources &amp; study materials for Dawood University of Engineering &amp; Technology ({SITE.batch}).
            </p>
            <div className={styles.photoBadge}>
              <Camera size={12} />
              <span>Background: Main Campus Aerial View by AD_ADEEL_AHMED</span>
            </div>
          </div>

          {/* Quick Links Column */}
          <div className={styles.linksCol}>
            <p className={styles.colTitle}>Navigation</p>
            <div className={styles.linksList}>
              <Link to="/" className={styles.navLink}>Home</Link>
              <Link to="/resources" className={styles.navLink}>Academic Resources</Link>
              <Link to="/bus-points" className={styles.navLink}>Bus Points &amp; Routes</Link>
              <Link to="/gallery" className={styles.navLink}>Campus Gallery</Link>
              <Link to="/admissions" className={styles.navLink}>Admissions Guide</Link>
              <Link to="/about" className={styles.navLink}>About DUET Hub</Link>
            </div>
          </div>

          {/* Developer & Credit Column */}
          <div className={styles.creditCol}>
            <p className={styles.colTitle}>Built with Care</p>
            <p className={styles.creditText}>
              Developed with <Heart size={14} fill="#e74c3c" color="#e74c3c" className={styles.heartIcon} /> by{' '}
              <a
                href="https://github.com/muhammadrehan-dev"
                target="_blank"
                rel="noreferrer"
                className={styles.devLink}
              >
                CH4_EZIO <ArrowUpRight size={13} />
              </a>
            </p>
            <p className={styles.univText}>
              <GraduationCap size={13} style={{ display: 'inline', marginRight: '4px', verticalAlign: 'middle' }} />
              Dawood University of Engineering &amp; Technology, Karachi
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className={styles.bottom}>
          <span>Free forever · Open source · Made in Karachi, Pakistan</span>
          <span className={styles.batchSpan}>{SITE.batch}</span>
        </div>
      </div>
    </footer>
  )
}
