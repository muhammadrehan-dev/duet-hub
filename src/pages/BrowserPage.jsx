import { useState, useEffect } from 'react'
import { useFolderContents } from '@/hooks/useFolderContents'
import { getFileInfo, formatFileSize } from '@/lib/files'
import Spinner from '@/components/Spinner'
import FilePreviewModal from '@/components/FilePreviewModal'
import styles from './BrowserPage.module.css'

// ─── Breadcrumb ───────────────────────────────────────────────────────────────
function Breadcrumb({ crumbs, onNavigate }) {
  return (
    <nav className={styles.breadcrumb}>
      {crumbs.map((crumb, i) => (
        <span key={i} className={styles.breadcrumbItem}>
          {i > 0 && <span className={styles.sep}>/</span>}
          {i < crumbs.length - 1 ? (
            <button className={styles.breadcrumbBtn} onClick={() => onNavigate(i)}>
              {crumb.label}
            </button>
          ) : (
            <span className={styles.breadcrumbCurrent}>{crumb.label}</span>
          )}
        </span>
      ))}
    </nav>
  )
}

// ─── Folder row ───────────────────────────────────────────────────────────────
function FolderRow({ item, onClick }) {
  return (
    <div className={styles.folderRow} onClick={onClick}>
      <span className={styles.folderIcon}>📂</span>
      <span className={styles.folderName}>{item.name}</span>
      <span className={styles.folderArrow}>→</span>
    </div>
  )
}

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

// ─── File row ─────────────────────────────────────────────────────────────────
function FileRow({ item, onPreview }) {
  const info = getFileInfo(item.name)
  const canPreview = isPreviewable(item.name)

  return (
    <div className={styles.fileRow}>
      <span className={styles.fileEmoji}>{info.icon}</span>
      <span
        className={styles.extBadge}
        style={{ '--ext-color': info.color }}
      >
        {info.label}
      </span>
      <span className={styles.fileName}>{item.name}</span>
      <span className={styles.fileSize}>{formatFileSize(item.size)}</span>
      <div className={styles.fileActions}>
        {canPreview && (
          <button
            className={styles.previewBtn}
            onClick={() => onPreview(item)}
            title="Preview file"
          >
            👁 Preview
          </button>
        )}
        <a
          href={item.download_url}
          className={styles.dlBtn}
          download
          target="_blank"
          rel="noreferrer"
          title="Download file"
        >
          ↓
        </a>
      </div>
    </div>
  )
}

// ─── Folder contents view ─────────────────────────────────────────────────────
function FolderView({ github, path, onEnterFolder, onPreview }) {
  const { items, loading, error } = useFolderContents(github, path)
  const [search, setSearch] = useState('')

  useEffect(() => { setSearch('') }, [path])

  if (loading) return <div className="empty-state"><Spinner /></div>
  if (error)   return <div className="empty-state" style={{ color: 'var(--red)' }}>Error: {error}</div>
  if (!items || items.length === 0)
    return <div className="empty-state">This folder is empty.</div>

  const folders = items.filter(i => i.type === 'dir')
  const files   = items.filter(i => i.type === 'file')

  const filteredFolders = search
    ? folders.filter(f => f.name.toLowerCase().includes(search.toLowerCase()))
    : folders
  const filteredFiles = search
    ? files.filter(f => f.name.toLowerCase().includes(search.toLowerCase()))
    : files

  const hasResults = filteredFolders.length + filteredFiles.length > 0

  return (
    <div>
      {/* Stats bar */}
      <div className={styles.statsBar}>
        {folders.length > 0 && (
          <span className={styles.statChip}>📂 {folders.length} folder{folders.length !== 1 ? 's' : ''}</span>
        )}
        {files.length > 0 && (
          <span className={styles.statChip}>📄 {files.length} file{files.length !== 1 ? 's' : ''}</span>
        )}
      </div>

      {/* Search */}
      {items.length > 5 && (
        <div className={styles.searchWrapper}>
          <span className={styles.searchIcon}>⌕</span>
          <input
            className={styles.search}
            type="text"
            placeholder="Filter files and folders…"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          {search && (
            <button className={styles.clearSearch} onClick={() => setSearch('')}>✕</button>
          )}
        </div>
      )}

      {!hasResults && (
        <div className="empty-state">Nothing matches "{search}"</div>
      )}

      {/* Folders */}
      {filteredFolders.length > 0 && (
        <div className={styles.section}>
          {filteredFolders.length < folders.length && (
            <p className={styles.sectionLabel}>Folders ({filteredFolders.length} shown)</p>
          )}
          <div className={styles.folderList}>
            {filteredFolders.map(f => (
              <FolderRow key={f.path} item={f} onClick={() => onEnterFolder(f)} />
            ))}
          </div>
        </div>
      )}

      {/* Files */}
      {filteredFiles.length > 0 && (
        <div className={styles.section}>
          {folders.length > 0 && filteredFiles.length > 0 && (
            <p className={styles.sectionLabel}>
              Files{filteredFiles.length < files.length ? ` (${filteredFiles.length} shown)` : ''}
            </p>
          )}
          <div className={styles.fileList}>
            {filteredFiles.map(f => (
              <FileRow key={f.path} item={f} onPreview={onPreview} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

// ─── Main BrowserPage ─────────────────────────────────────────────────────────
export default function BrowserPage({ semester, initialPath, initialCrumbs, setPage }) {
  // crumbs: [{ label, path }]
  const [crumbs, setCrumbs] = useState(initialCrumbs || [
    { label: 'Home', path: null },
    { label: semester.label, path: null },
  ])
  const currentPath = crumbs[crumbs.length - 1].path

  // ── Preview state ──
  const [previewFile, setPreviewFile] = useState(null)

  function enterFolder(folderItem) {
    setCrumbs(prev => [...prev, { label: folderItem.name, path: folderItem.path }])
  }

  function navigateToCrumb(index) {
    setCrumbs(prev => prev.slice(0, index + 1))
  }

  // Determine what to show as page title
  const pageTitle = crumbs[crumbs.length - 1].label
  const pageDepth = crumbs.length

  return (
    <div className="page">
      <Breadcrumb crumbs={crumbs} onNavigate={navigateToCrumb} />

      <div className={styles.pageHeader}>
        <div className={styles.pageHeaderIcon}>
          {pageDepth <= 2 ? '🗂' : pageDepth === 3 ? '📚' : '📂'}
        </div>
        <div>
          <h1 className={styles.pageTitle}>{pageTitle}</h1>
          {currentPath && (
            <p className={styles.pagePath}>{currentPath}</p>
          )}
        </div>
      </div>

      <FolderView
        github={semester.github}
        path={currentPath ?? (semester.rootFolder || '')}
        onEnterFolder={enterFolder}
        onPreview={setPreviewFile}
      />

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
