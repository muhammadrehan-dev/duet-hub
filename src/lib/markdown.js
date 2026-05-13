// ─── Markdown / frontmatter utilities ────────────────────────────────────────

export function parseFrontmatter(raw) {
  const match = raw.match(/^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/)
  if (!match) return { fm: {}, body: raw }

  const fm = {}
  match[1].split('\n').forEach(line => {
    const i = line.indexOf(':')
    if (i < 0) return
    const key = line.slice(0, i).trim()
    let val = line.slice(i + 1).trim().replace(/^['"]|['"]$/g, '')
    if (val === 'true')  val = true
    if (val === 'false') val = false
    fm[key] = val
  })

  return { fm, body: match[2].trim() }
}

export async function fetchAndParse(downloadUrl) {
  const res = await fetch(downloadUrl)
  const text = await res.text()
  return parseFrontmatter(text)
}
