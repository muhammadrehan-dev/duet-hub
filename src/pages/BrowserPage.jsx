import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useFolderContents } from '@/hooks/useFolderContents'
import { getFileInfo, formatFileSize } from '@/lib/files'
import Spinner from '@/components/Spinner'
import FilePreviewModal from '@/components/FilePreviewModal'
import { 
  Folder, ArrowRight, Eye, Download, FileText, 
  Search, X, FolderArchive, BookOpen, ChevronLeft,
  LayoutGrid, List, HardDrive, CornerUpLeft
} from 'lucide-react'
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

// ─── File row / card ──────────────────────────────────────────────────────────
function FileRow({ item, onPreview }) {
  const info = getFileInfo(item.name)
  const IconComp = info.icon || FileText
  const canPreview = isPreviewable(item.name)

  return (
    <div className={styles.fileRow}>
      <div className={styles.fileIconWrap}>
        <IconComp size={18} />
      </div>
      <span className={styles.extBadge} style={{ '--ext-color': info.color }}>
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
            <Eye size={13} /> Preview
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
          <Download size={15} />
        </a>
      </div>
    </div>
  )
}

// ─── Folder View Component ────────────────────────────────────────────────────
function FolderView({ github, path, onEnterFolder, onPreview }) {
  const { items, loading, error } = useFolderContents(github, path)
  const [search, setSearch] = useState('')
  const [viewMode, setViewMode] = useState('list') // 'list' or 'grid'

  useEffect(() => { setSearch('') }, [path])

  if (loading) return <div className="empty-state" style={{ padding: '4rem 0' }}><Spinner /></div>
  if (error)   return <div className="empty-state" style={{ color: 'var(--red)', padding: '3rem 0' }}>Error loading folder: {error}</div>
  if (!items || items.length === 0)
    return <div className="empty-state" style={{ padding: '3rem 0' }}>This folder is empty.</div>

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
      {/* Control Bar: Search & Filter & View Mode */}
      <div className={styles.controlBar}>
        <div className={styles.searchWrapper}>
          <Search size={16} className={styles.searchIcon} />
          <input
            className={styles.search}
            type="text"
            placeholder="Search files and subfolders..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          {search && (
            <button className={styles.clearSearch} onClick={() => setSearch('')}>
              <X size={14} />
            </button>
          )}
        </div>

        <div className={styles.controlsRight}>
          <div className={styles.statsBar}>
            {folders.length > 0 && (
              <span className={styles.statChip}>
                <Folder size={14} /> {folders.length} folder{folders.length !== 1 ? 's' : ''}
              </span>
            )}
            {files.length > 0 && (
              <span className={styles.statChip}>
                <FileText size={14} /> {files.length} file{files.length !== 1 ? 's' : ''}
              </span>
            )}
          </div>

          <div className={styles.viewModeGroup}>
            <button 
              className={`${styles.viewModeBtn} ${viewMode === 'list' ? styles.activeViewMode : ''}`}
              onClick={() => setViewMode('list')}
              title="List View"
            >
              <List size={16} />
            </button>
            <button 
              className={`${styles.viewModeBtn} ${viewMode === 'grid' ? styles.activeViewMode : ''}`}
              onClick={() => setViewMode('grid')}
              title="Grid Cards View"
            >
              <LayoutGrid size={16} />
            </button>
          </div>
        </div>
      </div>

      {!hasResults && (
        <div className="empty-state" style={{ padding: '3rem 0' }}>Nothing matches "{search}"</div>
      )}

      {/* Subfolders Grid */}
      {filteredFolders.length > 0 && (
        <div style={{ marginBottom: '2rem' }}>
          <p className={styles.sectionLabel}>Directories ({filteredFolders.length})</p>
          <div className={styles.folderGrid}>
            {filteredFolders.map(f => (
              <div key={f.path} className={styles.folderCard} onClick={() => onEnterFolder(f)}>
                <div className={styles.folderCardIcon}>
                  <Folder size={20} />
                </div>
                <span className={styles.folderCardName}>{f.name}</span>
                <ArrowRight size={16} className={styles.folderCardArrow} />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Files Table */}
      {filteredFiles.length > 0 && (
        <div>
          <p className={styles.sectionLabel}>Files ({filteredFiles.length})</p>
          <div className={styles.fileListTable}>
            {filteredFiles.map(f => (
              <FileRow key={f.path} item={f} onPreview={onPreview} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

// ─── Main BrowserPage Component ───────────────────────────────────────────────
export default function BrowserPage({ semester, initialPath, initialCrumbs }) {
  const navigate = useNavigate()
  const [crumbs, setCrumbs] = useState(initialCrumbs || [
    { label: 'Home', path: null },
    { label: semester.label, path: null },
  ])
  const [previewFile, setPreviewFile] = useState(null)

  const currentPath = crumbs[crumbs.length - 1].path
  const pageTitle = crumbs[crumbs.length - 1].label

  function enterFolder(folderItem) {
    setCrumbs(prev => [...prev, { label: folderItem.name, path: folderItem.path }])
  }

  function navigateToCrumb(index) {
    if (index === 0) {
      navigate('/resources')
      return
    }
    setCrumbs(prev => prev.slice(0, index + 1))
  }

  function goBackOneLevel() {
    if (crumbs.length > 1) {
      navigateToCrumb(crumbs.length - 2)
    } else {
      navigate('/resources')
    }
  }

  return (
    <div className="page" style={{ paddingTop: '80px' }}>
      {/* Directory Header Card */}
      <div className={styles.headerCard}>
        <div className={styles.topBar}>
          <button className={styles.backBtn} onClick={goBackOneLevel}>
            <CornerUpLeft size={15} /> Go Up Level
          </button>
          <span className={styles.repoBadge}>
            <HardDrive size={13} /> {semester.github?.repo || 'DUET Repository'}
          </span>
        </div>

        <Breadcrumb crumbs={crumbs} onNavigate={navigateToCrumb} />

        <div className={styles.headerMain}>
          <div className={styles.folderBigIcon}>
            <FolderArchive size={28} />
          </div>
          <div>
            <h1 className={styles.pageTitle}>{pageTitle}</h1>
            <p className={styles.pagePath}>
              {currentPath || semester.rootFolder || 'Root Directory'}
            </p>
          </div>
        </div>
      </div>

      {/* Directory Contents */}
      <FolderView
        github={semester.github}
        path={currentPath ?? (semester.rootFolder || '')}
        onEnterFolder={enterFolder}
        onPreview={setPreviewFile}
      />

      {/* File Preview Modal */}
      {previewFile && (
        <FilePreviewModal
          file={previewFile}
          onClose={() => setPreviewFile(null)}
        />
      )}
    </div>
  )
}
