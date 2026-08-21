import { SITE } from '@/data/config'
import { Heart } from 'lucide-react'
import styles from './Footer.module.css'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.left}>
          <span className={styles.logo}>⬡ DUETHub</span>
          <p className={styles.tagline}>Open resources for {SITE.batch}</p>
        </div>
        <div className={styles.right}>
          <p className={styles.credit}>
            Built with <Heart size={14} fill="#e74c3c" color="#e74c3c" style={{ display: 'inline', verticalAlign: 'middle', margin: '0 2px' }} /> by{' '}
            <a
              href="https://github.com/muhammadrehan-dev"
              target="_blank"
              rel="noreferrer"
              className={styles.link}
            >
              CH4_EZIO
            </a>
          </p>
          <p className={styles.sub}>Dawood University of Engineering &amp; Technology</p>
        </div>
      </div>
      <div className={styles.bottom}>
        <span>Free forever · Open source · Made in Karachi</span>
      </div>
    </footer>
  )
}
