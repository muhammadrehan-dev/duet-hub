import {
  FileText,
  FileEdit,
  FileSpreadsheet,
  FileCode,
  Image as ImageIcon,
  Code2,
  Globe,
  Palette,
  Archive,
  File
} from 'lucide-react'

// ─── File helpers ─────────────────────────────────────────────────────────────

const EXT_MAP = {
  // Documents
  pdf: { label: 'PDF', icon: FileText, color: '#c0392b' },
  doc: { label: 'DOC', icon: FileEdit, color: '#2980b9' },
  docx:{ label: 'DOC', icon: FileEdit, color: '#2980b9' },
  ppt: { label: 'PPT', icon: FileText, color: '#e67e22' },
  pptx:{ label: 'PPT', icon: FileText, color: '#e67e22' },
  xls: { label: 'XLS', icon: FileSpreadsheet, color: '#27ae60' },
  xlsx:{ label: 'XLS', icon: FileSpreadsheet, color: '#27ae60' },
  txt: { label: 'TXT', icon: FileText, color: '#7f8c8d' },
  md:  { label: 'MD',  icon: FileCode, color: '#7f8c8d' },
  // Images
  jpg: { label: 'IMG', icon: ImageIcon, color: '#8e44ad' },
  jpeg:{ label: 'IMG', icon: ImageIcon, color: '#8e44ad' },
  png: { label: 'IMG', icon: ImageIcon, color: '#8e44ad' },
  gif: { label: 'GIF', icon: ImageIcon, color: '#8e44ad' },
  svg: { label: 'SVG', icon: ImageIcon, color: '#8e44ad' },
  // Code
  py:  { label: 'PY',   icon: Code2, color: '#3498db' },
  java:{ label: 'JAVA', icon: Code2, color: '#e74c3c' },
  cpp: { label: 'C++',  icon: Code2, color: '#2c3e50' },
  c:   { label: 'C',    icon: Code2, color: '#2c3e50' },
  js:  { label: 'JS',   icon: Code2, color: '#f39c12' },
  ts:  { label: 'TS',   icon: Code2, color: '#2980b9' },
  html:{ label: 'HTML', icon: Globe, color: '#e67e22' },
  css: { label: 'CSS',  icon: Palette, color: '#3498db' },
  // Archives
  zip: { label: 'ZIP', icon: Archive, color: '#95a5a6' },
  rar: { label: 'RAR', icon: Archive, color: '#95a5a6' },
}

export function getFileExt(filename) {
  return (filename || '').split('.').pop().toLowerCase()
}

export function getFileInfo(filename) {
  const ext = getFileExt(filename)
  return EXT_MAP[ext] || { label: ext.toUpperCase() || 'FILE', icon: File, color: '#95a5a6' }
}

export const EXT_ICON = new Proxy({}, {
  get: (_, prop) => {
    const info = EXT_MAP[prop]
    return info ? info.icon : File
  }
})

export function formatCategory(cat) {
  if (!cat) return ''
  return cat.charAt(0).toUpperCase() + cat.slice(1)
}

export function formatFileSize(bytes) {
  if (!bytes)          return ''
  if (bytes < 1024)    return `${bytes} B`
  if (bytes < 1048576) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / 1048576).toFixed(1)} MB`
}

