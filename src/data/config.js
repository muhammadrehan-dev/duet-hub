// ─── DUET Resource Hub — config ───────────────────────────────────────────────
//
// Repo layout (one repo per semester):
//
//   1st Semester/
//     Applied Physics/
//       Lectures/
//         file.pdf
//         week2/          ← sub-folders are fine, they're navigable
//           notes.pdf
//       Assignments/
//         task1.docx
//     Programming/
//       ...
//
// Every file type is shown. Every folder is clickable.

export const SITE = {
  university: 'Dawood University of Engineering & Technology',
  batch: 'Batch 25F · Cybersecurity A2',
}

export const DEVELOPER = {
  name: 'Muhammad Rehan',
  alias: 'CH4_EZIO',
  bio: 'Write whatever you want here about yourself...',
  github: 'https://github.com/muhammadrehan-dev',
}

// ─── One entry per semester → points to its own GitHub repo ──────────────────
export const SEMESTERS = [
  {
    id: '25F Cybersecurity',
    label: '25F Cybersecurity',
    rootFolder: '25F Cybersecurity',
    github: {
      user: 'muhammadrehan-dev',
      repo: 'subjects',
      branch: 'main',
      token: import.meta.env.VITE_GITHUB_TOKEN,
    },
  },
  {
    id: '24F AI',
    label: '24F Artificial Intelligence',
    driveUrl: 'https://drive.google.com/drive/folders/1TsMhbKJCMl02MP4W8P5vHerMsGNgZ4dq',
  },
]