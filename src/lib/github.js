// ─── GitHub API layer ─────────────────────────────────────────────────────────

function makeHeaders(token) {
  const h = { 'Accept': 'application/vnd.github.v3+json' }
  if (token) h['Authorization'] = `Bearer ${token}`
  return h
}

// Fetch contents of any path in a repo (files + folders)
export async function getContents(github, path = '') {
  const { user, repo, branch, token } = github
  const encodedPath = path ? `/${encodeURIComponent(path).replace(/%2F/g, '/')}` : ''
  const url = `https://api.github.com/repos/${user}/${repo}/contents${encodedPath}?ref=${branch}`
  const res = await fetch(url, { headers: makeHeaders(token) })
  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(err.message || `GitHub ${res.status}`)
  }
  return res.json() // returns array of { name, path, type: 'file'|'dir', size, download_url, sha }
}

// News / deadlines (live in content/ of the first semester repo)
export async function getNewsFiles(github) {
  try {
    const files = await getContents(github, 'content/news')
    return files.filter(f => f.name.endsWith('.md'))
  } catch { return [] }
}

export async function getDeadlineFiles(github) {
  try {
    const files = await getContents(github, 'content/deadlines')
    return files.filter(f => f.name.endsWith('.md'))
  } catch { return [] }
}
