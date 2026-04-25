// ─── File helpers ─────────────────────────────────────────────────────────────

const EXT_MAP = {
  // Documents
  pdf: { label: 'PDF', icon: '📄', color: '#c0392b' },
  doc: { label: 'DOC', icon: '📝', color: '#2980b9' },
  docx:{ label: 'DOC', icon: '📝', color: '#2980b9' },
  ppt: { label: 'PPT', icon: '📊', color: '#e67e22' },
  pptx:{ label: 'PPT', icon: '📊', color: '#e67e22' },
  xls: { label: 'XLS', icon: '📋', color: '#27ae60' },
  xlsx:{ label: 'XLS', icon: '📋', color: '#27ae60' },
  txt: { label: 'TXT', icon: '📃', color: '#7f8c8d' },
  md:  { label: 'MD',  icon: '📓', color: '#7f8c8d' },
  // Images
  jpg: { label: 'IMG', icon: '🖼', color: '#8e44ad' },
  jpeg:{ label: 'IMG', icon: '🖼', color: '#8e44ad' },
  png: { label: 'IMG', icon: '🖼', color: '#8e44ad' },
  gif: { label: 'GIF', icon: '🖼', color: '#8e44ad' },
  svg: { label: 'SVG', icon: '🖼', color: '#8e44ad' },
  // Code
  py:  { label: 'PY',   icon: '🐍', color: '#3498db' },
  java:{ label: 'JAVA', icon: '☕', color: '#e74c3c' },
  cpp: { label: 'C++',  icon: '⚙',  color: '#2c3e50' },
  c:   { label: 'C',    icon: '⚙',  color: '#2c3e50' },
  js:  { label: 'JS',   icon: '🟨', color: '#f39c12' },
  ts:  { label: 'TS',   icon: '🟦', color: '#2980b9' },
  html:{ label: 'HTML', icon: '🌐', color: '#e67e22' },
  css: { label: 'CSS',  icon: '🎨', color: '#3498db' },
  // Archives
  zip: { label: 'ZIP', icon: '📦', color: '#95a5a6' },
  rar: { label: 'RAR', icon: '📦', color: '#95a5a6' },
}

export function getFileInfo(filename) {
  const ext = filename.split('.').pop().toLowerCase()
  return EXT_MAP[ext] || { label: ext.toUpperCase() || 'FILE', icon: '📁', color: '#95a5a6' }
}

export function formatFileSize(bytes) {
  if (!bytes)          return ''
  if (bytes < 1024)    return `${bytes} B`
  if (bytes < 1048576) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / 1048576).toFixed(1)} MB`
}
