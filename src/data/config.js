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
  batch: 'Current & Upcoming Batches',
}

export const DEVELOPER = {
  name: 'Muhammad Rehan',
  alias: 'CH4_EZIO',
  bio: 'Cybersecurity Student | Aspiring Security Researcher. Passionate about Capture The Flag competitions, reverse engineering, and building secure systems.',
  github: 'https://github.com/muhammadrehan-dev',
  // add more links if you want
}

// ─── One entry per semester → points to its own GitHub repo ──────────────────
export const SEMESTERS = [
  {
    id: '25F Cybersecurity',
    label: '25F Cybersecurity',
    // The root folder name inside the repo that holds all subjects
    rootFolder: '25F Cybersecurity',
    github: {
      user: 'muhammadrehan-dev',
      repo: 'subjects',
      branch: 'main',
      token: import.meta.env.VITE_GITHUB_TOKEN ,
    },
  },
    {
    id: '24F Artificial Intelligence',
    label: '24F Artificial Intelligence',
    // The root folder name inside the repo that holds all subjects
    rootFolder: '24F Artificial Intelligence',
   github: {
      user: 'muhammadrehan-dev',
     repo: 'subjects',
      branch: 'main',
      token: import.meta.env.VITE_GITHUB_TOKEN ,
    },
  },
  // ── Add more semesters below ─────────────────────────────────────────────
  // {
  //   id: 'semester-2',
  //   label: '2nd Semester',
  //   rootFolder: '2nd Semester',
  //   github: {
  //     user: 'muhammadrehan-dev',
  //     repo: 'sem2-resources',
  //     branch: 'main',
  //     token: import.meta.env.VITE_GITHUB_TOKEN || null,
  //   },
  // },
]

// ─── Merit Lists — same repo, different root folder ──────────────────────────
export const MERIT_LISTS = {
  id: 'Merit Lists',
  label: 'Merit Lists',
  rootFolder: 'Merit Lists',
  github: {
    user: 'muhammadrehan-dev',
    repo: 'subjects',
    branch: 'main',
    token: import.meta.env.VITE_GITHUB_TOKEN,
  },
}

// ─── Sample Papers — same repo, different root folder ────────────────────────
export const SAMPLE_PAPERS = {
  id: 'Sample Papers',
  label: 'Sample Papers',
  rootFolder: 'Sample Papers',
  github: {
    user: 'muhammadrehan-dev',
    repo: 'subjects',
    branch: 'main',
    token: import.meta.env.VITE_GITHUB_TOKEN,
  },
}
