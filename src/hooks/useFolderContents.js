// ─── Hook: fetch a folder's direct children (files + sub-folders) ─────────────
import { useState, useEffect } from 'react'
import { getContents } from '@/lib/github'

export function useFolderContents(github, path) {
  const [items,   setItems]   = useState(null)   // null = not loaded yet
  const [loading, setLoading] = useState(true)
  const [error,   setError]   = useState(null)

  useEffect(() => {
    if (!github) return
    let cancelled = false
    setLoading(true)
    setItems(null)
    setError(null)

    getContents(github, path)
      .then(data => {
        if (cancelled) return
        // Sort: folders first, then files, both alpha
        const sorted = [...data].sort((a, b) => {
          if (a.type !== b.type) return a.type === 'dir' ? -1 : 1
          return a.name.localeCompare(b.name)
        })
        setItems(sorted)
        setLoading(false)
      })
      .catch(err => {
        if (!cancelled) { setError(err.message); setLoading(false) }
      })

    return () => { cancelled = true }
  }, [github, path])

  return { items, loading, error }
}
