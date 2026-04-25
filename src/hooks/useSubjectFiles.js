import { useState, useEffect } from 'react'
import { getSubjectFiles } from '@/lib/github'

export function useSubjectFiles(github, subjectId) {
  const [data,    setData]    = useState(null)
  const [loading, setLoading] = useState(true)
  const [error,   setError]   = useState(null)

  useEffect(() => {
    if (!github || !subjectId) return
    let cancelled = false
    setLoading(true)
    setData(null)

    getSubjectFiles(github, subjectId)
      .then(files => {
        if (!cancelled) { setData(files); setLoading(false) }
      })
      .catch(err => {
        if (!cancelled) { setError(err.message); setLoading(false) }
      })

    return () => { cancelled = true }
  }, [github, subjectId])

  return { data, loading, error }
}
