import { useState, useEffect, useCallback } from 'react'
import { getFileInfo, formatFileSize } from '@/lib/files'
import styles from './FilePreviewModal.module.css'

// ─── File type classification ──────────────────────────────────────────────────

const IMAGE_EXTS = ['jpg', 'jpeg', 'png', 'gif', 'svg', 'webp', 'bmp', 'ico']
const PDF_EXTS   = ['pdf']
const OFFICE_EXTS = ['doc', 'docx', 'ppt', 'pptx', 'xls', 'xlsx']
const TEXT_EXTS  = ['txt', 'csv', 'log', 'ini', 'cfg', 'env']
const MD_EXTS    = ['md', 'markdown']
const CODE_EXTS  = ['py', 'java', 'cpp', 'c', 'h', 'js', 'jsx', 'ts', 'tsx', 'html', 'css', 'scss', 'json', 'xml', 'yaml', 'yml', 'sql', 'sh', 'bat', 'rb', 'php', 'go', 'rs', 'swift', 'kt', 'dart']

function getExt(filename) {
  return (filename || '').split('.').pop().toLowerCase()
}

function getPreviewType(filename) {
  const ext = getExt(filename)
  if (IMAGE_EXTS.includes(ext))  return 'image'
  if (PDF_EXTS.includes(ext))    return 'pdf'
  if (OFFICE_EXTS.includes(ext)) return 'office'
  if (MD_EXTS.includes(ext))     return 'markdown'
  if (TEXT_EXTS.includes(ext))   return 'text'
  if (CODE_EXTS.includes(ext))   return 'code'
  return 'unsupported'
}

// ─── Simple Markdown → HTML renderer ───────────────────────────────────────────

function renderMarkdown(raw) {
  let html = raw
    // Escape HTML entities
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')

  // Code blocks (``` ... ```)
  html = html.replace(/```(\w*)\n([\s\S]*?)```/g, (_, lang, code) => {
    return `<pre><code>${code.trim()}</code></pre>`
  })

  // Inline code
  html = html.replace(/`([^`]+)`/g, '<code>$1</code>')

  // Headers
  html = html.replace(/^######\s+(.+)$/gm, '<h6>$1</h6>')
  html = html.replace(/^#####\s+(.+)$/gm, '<h5>$1</h5>')
  html = html.replace(/^####\s+(.+)$/gm, '<h4>$1</h4>')
  html = html.replace(/^###\s+(.+)$/gm, '<h3>$1</h3>')
  html = html.replace(/^##\s+(.+)$/gm, '<h2>$1</h2>')
  html = html.replace(/^#\s+(.+)$/gm, '<h1>$1</h1>')

  // Blockquotes
  html = html.replace(/^&gt;\s+(.+)$/gm, '<blockquote>$1</blockquote>')

  // Bold and italic
  html = html.replace(/\*\*\*(.+?)\*\*\*/g, '<strong><em>$1</em></strong>')
  html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
  html = html.replace(/\*(.+?)\*/g, '<em>$1</em>')
  html = html.replace(/__(.+?)__/g, '<strong>$1</strong>')

  // Links
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noreferrer">$1</a>')

  // Images
  html = html.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" />')

  // Horizontal rule
  html = html.replace(/^---+$/gm, '<hr />')
  html = html.replace(/^\*\*\*+$/gm, '<hr />')

  // Unordered lists
  html = html.replace(/^[\s]*[-*+]\s+(.+)$/gm, '<li>$1</li>')

  // Ordered lists
  html = html.replace(/^[\s]*\d+\.\s+(.+)$/gm, '<li>$1</li>')

  // Wrap consecutive <li> in <ul>
  html = html.replace(/((?:<li>.*<\/li>\n?)+)/g, '<ul>$1</ul>')

  // Paragraphs (wrap remaining lines)
  html = html
    .split('\n\n')
    .map(block => {
      const trimmed = block.trim()
      if (!trimmed) return ''
      if (trimmed.startsWith('<')) return trimmed
      return `<p>${trimmed.replace(/\n/g, '<br />')}</p>`
    })
    .join('\n')

  return html
}

// ─── Viewers ───────────────────────────────────────────────────────────────────

function ImageViewer({ url }) {
  const [loaded, setLoaded] = useState(false)
  const [error, setError] = useState(false)

  return (
    <div className={styles.imageViewer}>
      {!loaded && !error && (
        <div className={styles.loading}>
          <div className={styles.loadingBar} />
          <span>Loading image…</span>
        </div>
      )}
      {error ? (
        <div className={styles.error}>
          <span className={styles.errorIcon}>🖼</span>
          <p className={styles.errorText}>Failed to load image</p>
          <a href={url} target="_blank" rel="noreferrer" className={styles.errorFallback}>
            Open in new tab ↗
          </a>
        </div>
      ) : (
        <img
          src={url}
          alt="Preview"
          onLoad={() => setLoaded(true)}
          onError={() => setError(true)}
          style={{ display: loaded ? 'block' : 'none' }}
        />
      )}
    </div>
  )
}

function PDFViewer({ url }) {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const googleViewerUrl = `https://docs.google.com/gview?url=${encodeURIComponent(url)}&embedded=true`

  return (
    <div className={styles.iframeViewer}>
      {loading && (
        <div className={styles.loading}>
          <div className={styles.loadingBar} />
          <span>Loading PDF preview…</span>
        </div>
      )}
      <iframe
        src={googleViewerUrl}
        title="PDF Preview"
        onLoad={() => setLoading(false)}
        onError={() => { setLoading(false); setError(true) }}
        style={{ display: loading ? 'none' : 'block' }}
      />
      {error && (
        <div className={styles.error}>
          <span className={styles.errorIcon}>📄</span>
          <p className={styles.errorText}>PDF preview unavailable</p>
          <a href={url} target="_blank" rel="noreferrer" className={styles.errorFallback}>
            Download PDF instead ↓
          </a>
        </div>
      )}
    </div>
  )
}

function OfficeViewer({ url }) {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const officeUrl = `https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(url)}`

  return (
    <div className={styles.iframeViewer}>
      {loading && (
        <div className={styles.loading}>
          <div className={styles.loadingBar} />
          <span>Loading document preview…</span>
        </div>
      )}
      <iframe
        src={officeUrl}
        title="Office Document Preview"
        onLoad={() => setLoading(false)}
        onError={() => { setLoading(false); setError(true) }}
        style={{ display: loading ? 'none' : 'block' }}
      />
      {error && (
        <div className={styles.error}>
          <span className={styles.errorIcon}>📝</span>
          <p className={styles.errorText}>Document preview unavailable</p>
          <a href={url} target="_blank" rel="noreferrer" className={styles.errorFallback}>
            Download file instead ↓
          </a>
        </div>
      )}
    </div>
  )
}

function TextViewer({ url }) {
  const [content, setContent] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    fetch(url)
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch')
        return res.text()
      })
      .then(text => { setContent(text); setLoading(false) })
      .catch(() => { setError(true); setLoading(false) })
  }, [url])

  if (loading) return (
    <div className={styles.loading}>
      <div className={styles.loadingBar} />
      <span>Loading file…</span>
    </div>
  )
  if (error) return (
    <div className={styles.error}>
      <span className={styles.errorIcon}>📃</span>
      <p className={styles.errorText}>Could not load file content</p>
      <a href={url} target="_blank" rel="noreferrer" className={styles.errorFallback}>
        Download file instead ↓
      </a>
    </div>
  )

  return (
    <div className={styles.textViewer}>
      <pre className={styles.textContent}>{content}</pre>
    </div>
  )
}

function MarkdownViewer({ url }) {
  const [content, setContent] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    fetch(url)
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch')
        return res.text()
      })
      .then(text => { setContent(text); setLoading(false) })
      .catch(() => { setError(true); setLoading(false) })
  }, [url])

  if (loading) return (
    <div className={styles.loading}>
      <div className={styles.loadingBar} />
      <span>Loading markdown…</span>
    </div>
  )
  if (error) return (
    <div className={styles.error}>
      <span className={styles.errorIcon}>📓</span>
      <p className={styles.errorText}>Could not load markdown</p>
      <a href={url} target="_blank" rel="noreferrer" className={styles.errorFallback}>
        Download file instead ↓
      </a>
    </div>
  )

  // Strip frontmatter
  let body = content
  const fmMatch = body.match(/^---\s*\n[\s\S]*?\n---\s*\n([\s\S]*)$/)
  if (fmMatch) body = fmMatch[1]

  return (
    <div className={styles.textViewer}>
      <div
        className={styles.markdownContent}
        dangerouslySetInnerHTML={{ __html: renderMarkdown(body) }}
      />
    </div>
  )
}

function CodeViewer({ url, filename }) {
  const [content, setContent] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const ext = getExt(filename)

  useEffect(() => {
    fetch(url)
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch')
        return res.text()
      })
      .then(text => { setContent(text); setLoading(false) })
      .catch(() => { setError(true); setLoading(false) })
  }, [url])

  if (loading) return (
    <div className={styles.loading}>
      <div className={styles.loadingBar} />
      <span>Loading source code…</span>
    </div>
  )
  if (error) return (
    <div className={styles.error}>
      <span className={styles.errorIcon}>⚙</span>
      <p className={styles.errorText}>Could not load source code</p>
      <a href={url} target="_blank" rel="noreferrer" className={styles.errorFallback}>
        Download file instead ↓
      </a>
    </div>
  )

  const lines = content.split('\n')

  return (
    <div className={styles.codeViewer}>
      <div className={styles.codeBlock}>
        <div className={styles.codeHeader}>
          <span>{filename}</span>
          <span>{lines.length} lines · {ext.toUpperCase()}</span>
        </div>
        <pre className={styles.codeContent}>
          <span className={styles.lineNumbers}>
            {lines.map((_, i) => `${i + 1}\n`).join('')}
          </span>
          {content}
        </pre>
      </div>
    </div>
  )
}

function UnsupportedViewer({ url, filename }) {
  const info = getFileInfo(filename)
  return (
    <div className={styles.unsupported}>
      <span className={styles.unsupportedIcon}>{info.icon}</span>
      <p className={styles.unsupportedText}>
        Preview is not available for <strong>.{getExt(filename)}</strong> files
      </p>
      <p className={styles.unsupportedHint}>You can download the file to view it locally</p>
      <a href={url} target="_blank" rel="noreferrer" className={styles.errorFallback} download>
        ↓ Download file
      </a>
    </div>
  )
}

// ─── Main Modal Component ──────────────────────────────────────────────────────

export default function FilePreviewModal({ file, onClose }) {
  const info = getFileInfo(file.name)
  const previewType = getPreviewType(file.name)
  const url = file.download_url

  // Close on Escape
  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Escape') onClose()
  }, [onClose])

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [handleKeyDown])

  // Close on overlay click
  function handleOverlayClick(e) {
    if (e.target === e.currentTarget) onClose()
  }

  function renderViewer() {
    switch (previewType) {
      case 'image':    return <ImageViewer url={url} />
      case 'pdf':      return <PDFViewer url={url} />
      case 'office':   return <OfficeViewer url={url} />
      case 'markdown': return <MarkdownViewer url={url} />
      case 'text':     return <TextViewer url={url} />
      case 'code':     return <CodeViewer url={url} filename={file.name} />
      default:         return <UnsupportedViewer url={url} filename={file.name} />
    }
  }

  return (
    <div className={styles.overlay} onClick={handleOverlayClick}>
      <div className={styles.modal}>
        {/* ── Header ── */}
        <div className={styles.header}>
          <span className={styles.headerIcon}>{info.icon}</span>
          <div className={styles.headerInfo}>
            <div className={styles.headerName}>{file.name}</div>
            <div className={styles.headerMeta}>
              <span
                className={styles.headerBadge}
                style={{ '--ext-color': info.color }}
              >
                {info.label}
              </span>
              {file.size > 0 && (
                <span className={styles.headerSize}>{formatFileSize(file.size)}</span>
              )}
            </div>
          </div>
          <div className={styles.headerActions}>
            <a
              href={url}
              download
              target="_blank"
              rel="noreferrer"
              className={styles.downloadBtn}
            >
              <span className={styles.downloadIcon}>↓</span>
              <span className={styles.downloadText}>Download</span>
            </a>
            <button className={styles.closeBtn} onClick={onClose} title="Close preview">
              ✕
            </button>
          </div>
        </div>

        {/* ── Content ── */}
        <div className={styles.content}>
          {renderViewer()}
        </div>
      </div>
    </div>
  )
}
