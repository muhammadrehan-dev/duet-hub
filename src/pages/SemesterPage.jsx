import styles from './SemesterPage.module.css'

function SubjectCard({ subject, semester, setPage }) {
  return (
    <div
      className={styles.subjectCard}
      onClick={() => setPage({ id: 'subject', semester, subject })}
    >
      <span className={styles.subjectIcon}>{subject.icon}</span>
      <p className={styles.subjectLabel}>{subject.label}</p>
      <p className={styles.subjectDesc}>{subject.desc}</p>
      <span className={styles.arrow}>→</span>
    </div>
  )
}

export default function SemesterPage({ semester, setPage }) {
  return (
    <div className="page">
      <button className={styles.back} onClick={() => setPage({ id: 'home' })}>← Back</button>

      <div className="hero">
        <p className="hero-label">Academic Resources</p>
        <h1 className="hero-title">{semester.label}</h1>
        <p className="hero-sub">
          {semester.subjects.length} subjects · {semester.github.repo}
        </p>
      </div>

      <p className="section-label">Select a Subject</p>
      <div className={styles.subjectsGrid}>
        {semester.subjects.map(s => (
          <SubjectCard key={s.id} subject={s} semester={semester} setPage={setPage} />
        ))}
      </div>
    </div>
  )
}
