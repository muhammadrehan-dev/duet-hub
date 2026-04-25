import { useState } from 'react'
import { useSubjectFiles } from '@/hooks/useSubjectFiles'
import { getFileExt, formatFileSize, formatCategory, EXT_ICON } from '@/lib/files'
import Spinner from '@/components/Spinner'
import styles from './SubjectPage.module.css'

function FileRow({ file }) {
  const ext = getFileExt(file.name)
  const icon = EXT_ICON[ext] || '📁'

  return (
    <div className={styles.fileRow}>
      <span className={styles.extBadge}>{ext}</span>
      <span className={styles.fileIcon}>{icon}</span>
      <span className={styles.name}>{file.name}</span>
      <span className={styles.size}>{formatFileSize(file.size)}</span>
      <a href={file.download_url} className={styles.dlBtn} download target="_blank" rel="noreferrer">
        ↓ Download
      </a>
    </div>
  )
}

function CategorySection({ category, files }) {
  const [open, setOpen] = useState(true)
  return (
    <div className={styles.category}>
      <button className={styles.categoryHeader} onClick={() => setOpen(o => !o)}>
        <span className={styles.categoryLabel}>{formatCategory(category)}</span>
        <span className={styles.categoryMeta}>
          {files.length} {files.length === 1 ? 'file' : 'files'}
          <span className={styles.chevron}>{open ? '▲' : '▼'}</span>
        </span>
      </button>
      {open && (
        <div className={styles.fileList}>
          {files.map((f, i) => <FileRow key={i} file={f} />)}
        </div>
      )}
    </div>
  )
}

export default function SubjectPage({ semester, subject, setPage }) {
  const { data, loading, error } = useSubjectFiles(semester.github, subject.id)
  const [search, setSearch] = useState('')

  const categories = data
    ? Object.entries(data)
        .map(([cat, files]) => [
          cat,
          search
            ? files.filter(f => f.name.toLowerCase().includes(search.toLowerCase()))
            : files,
        ])
        .filter(([, files]) => files.length > 0)
    : []

  const totalFiles = data ? Object.values(data).flat().length : 0

  return (
    <div className="page">
      <div className={styles.breadcrumb}>
        <button className={styles.breadcrumbBtn} onClick={() => setPage({ id: 'home' })}>Home</button>
        <span className={styles.sep}>/</span>
        <button className={styles.breadcrumbBtn} onClick={() => setPage({ id: 'semester', semester })}>
          {semester.label}
        </button>
        <span className={styles.sep}>/</span>
        <span className={styles.breadcrumbCurrent}>{subject.label}</span>
      </div>

      <div className="hero">
        <p className="hero-label">{subject.icon} {subject.label}</p>
        <h1 className="hero-title" style={{ fontSize: '28px' }}>{subject.desc}</h1>
        {!loading && data && (
          <p className="hero-sub">{totalFiles} file{totalFiles !== 1 ? 's' : ''} across {Object.keys(data).length} categories</p>
        )}
      </div>

      <div className={styles.searchWrapper}>
        <span className={styles.searchIcon}>⌕</span>
        <input
          className={styles.search}
          type="text"
          placeholder="Search files…"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        {search && (
          <button className={styles.clearSearch} onClick={() => setSearch('')}>✕</button>
        )}
      </div>

      {loading
        ? <div className="empty-state"><Spinner /></div>
        : error
          ? <div className="empty-state">Error loading files: {error}</div>
          : categories.length === 0
            ? <div className="empty-state">
                {search ? `No files matching "${search}"` : 'No files uploaded yet.'}
              </div>
            : <div className={styles.categories}>
                {categories.map(([cat, files]) => (
                  <CategorySection key={cat} category={cat} files={files} />
                ))}
              </div>
      }
    </div>
  )
}
