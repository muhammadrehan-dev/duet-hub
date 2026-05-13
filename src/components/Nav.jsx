import styles from './Nav.module.css'

const LINKS = [
  { id: 'home',  label: 'Home' },
  { id: 'newbie', label: 'Newbie' },
  { id: 'about', label: 'About' },
]

export default function Nav({ page, setPage }) {
  return (
    <nav className={styles.nav}>
      <a className={styles.brand} onClick={() => setPage({ id: 'home' })}>
        <span className={styles.brandIcon}>⬡</span>
        <span className={styles.brandText}>DUET<span className={styles.brandAccent}>Hub</span></span>
      </a>
      <ul className={styles.links}>
        {LINKS.map(l => (
          <li key={l.id}>
            <a
              className={`${styles.link} ${page.id === l.id ? styles.active : ''}`}
              onClick={() => setPage({ id: l.id })}
            >
              {l.label}
              {page.id === l.id && <span className={styles.activeDot} />}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
