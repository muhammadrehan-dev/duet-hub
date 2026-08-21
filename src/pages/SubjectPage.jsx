import { useState } from 'react'
import { useSubjectFiles } from '@/hooks/useSubjectFiles'
import { getFileExt, formatFileSize, formatCategory, EXT_ICON } from '@/lib/files'
import Spinner from '@/components/Spinner'
import FilePreviewModal from '@/components/FilePreviewModal'
import { Eye, Download, ChevronUp, ChevronDown, Search, X, File } from 'lucide-react'
import styles from './SubjectPage.module.css'

// ─── Previewable extensions ───────────────────────────────────────────────────
const PREVIEWABLE_EXTS = [
  'jpg', 'jpeg', 'png', 'gif', 'svg', 'webp', 'bmp', 'ico',
  'pdf',
  'doc', 'docx', 'ppt', 'pptx', 'xls', 'xlsx',
  'md', 'markdown',
  'txt', 'csv', 'log', 'ini', 'cfg', 'env',
  'py', 'java', 'cpp', 'c', 'h', 'js', 'jsx', 'ts', 'tsx',
  'html', 'css', 'scss', 'json', 'xml', 'yaml', 'yml',
  'sql', 'sh', 'bat', 'rb', 'php', 'go', 'rs', 'swift', 'kt', 'dart'
]

function isPreviewable(filename) {
  const ext = filename.split('.').pop().toLowerCase()
  return PREVIEWABLE_EXTS.includes(ext)
}

function FileRow({ file, onPreview }) {
  const ext = getFileExt(file.name)
  const IconComp = EXT_ICON[ext] || File
  const canPreview = isPreviewable(file.name)

  return (
    <div className={styles.fileRow}>
      <span className={styles.extBadge}>{ext}</span>
      <span className={styles.fileIcon}><IconComp size={18} /></span>
      <span className={styles.name}>{file.name}</span>
      <span className={styles.size}>{formatFileSize(file.size)}</span>
      <div className={styles.fileActions}>
        {canPreview && (
          <button
            className={styles.previewBtn}
            onClick={() => onPreview(file)}
            title="Preview file"
          >
            <Eye size={14} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '4px' }} /> Preview
          </button>
        )}
        <a href={file.download_url} className={styles.dlBtn} download target="_blank" rel="noreferrer">
          <Download size={14} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '4px' }} /> Download
        </a>
      </div>
    </div>
  )
}

function CategorySection({ category, files, onPreview }) {
  const [open, setOpen] = useState(true)
  return (
    <div className={styles.category}>
      <button className={styles.categoryHeader} onClick={() => setOpen(o => !o)}>
        <span className={styles.categoryLabel}>{formatCategory(category)}</span>
        <span className={styles.categoryMeta}>
          {files.length} {files.length === 1 ? 'file' : 'files'}
          <span className={styles.chevron}>{open ? <ChevronUp size={16} /> : <ChevronDown size={16} />}</span>
        </span>
      </button>
      {open && (
        <div className={styles.fileList}>
          {files.map((f, i) => <FileRow key={i} file={f} onPreview={onPreview} />)}
        </div>
      )}
    </div>
  )
}

export default function SubjectPage({ semester, subject, setPage }) {
  const { data, loading, error } = useSubjectFiles(semester.github, subject.id)
  const [search, setSearch] = useState('')
  const [previewFile, setPreviewFile] = useState(null)

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
        <p className="hero-label">{subject.label}</p>
        <h1 className="hero-title" style={{ fontSize: '28px' }}>{subject.desc}</h1>
        {!loading && data && (
          <p className="hero-sub">{totalFiles} file{totalFiles !== 1 ? 's' : ''} across {Object.keys(data).length} categories</p>
        )}
      </div>

      <div className={styles.searchWrapper}>
        <span className={styles.searchIcon}><Search size={16} /></span>
        <input
          className={styles.search}
          type="text"
          placeholder="Search files…"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        {search && (
          <button className={styles.clearSearch} onClick={() => setSearch('')}>
            <X size={14} />
          </button>
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
                  <CategorySection key={cat} category={cat} files={files} onPreview={setPreviewFile} />
                ))}
              </div>
      }

      {/* ── File Preview Modal ── */}
      {previewFile && (
        <FilePreviewModal
          file={previewFile}
          onClose={() => setPreviewFile(null)}
        />
      )}
    </div>
  )
}
