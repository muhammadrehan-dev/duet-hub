import { SITE, SEMESTERS, DEVELOPER } from '@/data/config'
import styles from './HomePage.module.css'

function SemesterCard({ semester, setPage }) {
  return (
    <div
      className={styles.semesterCard}
      onClick={() => setPage({
        id: 'browser',
        semester,
        initialPath: semester.rootFolder,
        initialCrumbs: [
          { label: 'Home', path: null },
          { label: semester.label, path: semester.rootFolder },
        ],
      })}
    >
      <div className={styles.semesterIcon}>🗂</div>
      <div className={styles.semesterInfo}>
        <p className={styles.semesterLabel}>{semester.label}</p>
        <p className={styles.semesterRepo}>{semester.github.repo}</p>
      </div>
      <span className={styles.semesterArrow}>→</span>
    </div>
  )
}

export default function HomePage({ setPage }) {
  return (
    <div className="page">
      <div className="hero">
        <p className="hero-label">25F Cybersecurity & 24F Artificial Intelligence. </p>
        <h1 className="hero-title">{SITE.university}</h1>
        <p className="hero-sub">Browse course materials.</p>
      </div>

      <p className="section-label">Contents</p>
      <div className={styles.semestersGrid}>
        {SEMESTERS.map(sem => (
          <SemesterCard key={sem.id} semester={sem} setPage={setPage} />
        ))}
      </div>
    </div>
  )
}
