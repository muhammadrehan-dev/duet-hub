import styles from './AboutPage.module.css'

const SKILLS = [
  { label: 'Linux', icon: '🐧' },
  { label: 'Cybersecurity', icon: '🔐' },
  { label: 'Open Source', icon: '⚡' },
  { label: 'Networking', icon: '🌐' },
  { label: 'Python', icon: '🐍' },
  { label: 'Git & GitHub', icon: '🐙' },

]

const ANIMALS = [
  { animal: 'Cat',      tech: 'GitHub',         icon: '🐱' },
  { animal: 'Snake',    tech: 'Python',         icon: '🐍' },
  { animal: 'Whale',    tech: 'Docker',         icon: '🐋' },
  { animal: 'Penguin',  tech: 'Linux',          icon: '🐧' },
  { animal: 'Fox',      tech: 'Firefox',        icon: '🦊' },
  { animal: 'Dragon',   tech: 'Kali Linux',     icon: '🐉' },
  { animal: 'Crab',     tech: 'OpenClaw',       icon: '🦀' },
  { animal: 'Crab',     tech: 'Rust',           icon: '🦀' },
  { animal: 'Elephant', tech: 'PostgreSQL',     icon: '🐘' },
  { animal: 'Shark',    tech: 'Wireshark',      icon: '🦈' },
]

const HOBBIES = [
  { label: 'Franz Kafka', group: 'books' },
  { label: 'Fyodor Dostoevsky', group: 'books' },
  { label: 'Leo Tolstoy', group: 'books' },
  { label: 'J.K. Rowling', group: 'books' },
  { label: 'Ibn-e-Safi', group: 'urdu' },
  { label: 'Hashim Nadeem', group: 'urdu' },
  { label: 'Ahmed Faraz', group: 'urdu' },
  { label: 'Saadat Hasan Manto', group: 'urdu' },
  { label: 'Gardening', group: 'life' },
  { label: 'Travelling', group: 'life' },
  { label: 'Bricking Linux installs', group: 'tech' },
  { label: 'Vulnerability finding', group: 'tech' },
  { label: 'CTF Challenges', group: 'tech' },
]

const HOBBY_COLORS = {
  books: styles.tagBooks,
  urdu:  styles.tagUrdu,
  life:  styles.tagLife,
  tech:  styles.tagTech,
}

const PROJECTS = [
  {
    name: 'TrustUs-PK',
    desc: 'A Sarcastic Cybersecurity Firm',
    url: 'https://trustuspk.vercel.app',
    badge: 'Live',
  },
  {
    name: 'Duetology',
    desc: 'Anonymous confessions & teacher ratings for DUET students',
    url: 'https://duetology.vercel.app',
    badge: 'Live',
  },
  {
    name: 'More on GitHub',
    desc: 'See all my projects and experiments',
    url: 'https://github.com/muhammadrehan-dev',
    badge: '→',
  },
]

const CONTRIBUTORS = [
  {
    name: 'Syed Sheharyar Tariq',
    avatar: 'ST',
    roll: '25F-AI-077',
    dept: 'Artificial Intelligence',
    role: '25F AI Resource Maintainer',
    bio: 'All course content of 25F Artificial Intelligence is maintained and managed by Syed Sheharyar Tariq. Dedicated to open knowledge and study aids.',
    contacts: [
      { label: 'Instagram', url: 'https://www.instagram.com/syedsheharyartariq/', icon: '📸' },
      { label: 'LinkedIn', url: 'https://www.linkedin.com/in/syed-sheharyar-tariq/', icon: 'in' },
      { label: 'WhatsApp', url: 'https://wa.me/923319712139', icon: '💬' },
      { label: 'Email', url: 'mailto:syedsheharyarprofessional@gmail.com', icon: '✉' }
    ]
  },
  {
    name: 'Abdul Hayy Khan',
    avatar: 'AK',
    roll: '24F-AI-051',
    dept: 'Artificial Intelligence',
    role: '24F AI Central Drive Lead',
    bio: 'Privately maintains and manages the centralized university course materials drive, ensuring batch-wide access to lecture notes, past papers, and solutions.',
    contacts: [
      { label: 'WhatsApp', url: 'https://wa.me/923198971870', icon: '💬' },
      { label: 'Email', url: 'mailto:abdulhayykhan.1@gmail.com', icon: '✉' }
    ],
    helpers: [
      { name: 'Mafazia Saqib', roll: '24F-AI-003' },
      { name: 'Muhammad Nihal Sheikh', roll: '24F-AI-029' },
      { name: 'Muhammad Amaan', roll: '24F-AI-030' },
      { name: 'Muskan Zahid', roll: '24F-AI-052' }
    ]
  }
]

export default function AboutPage() {
  return (
    <div className="page">

      {/* Hero */}
      <div className="hero">
        <p className="hero-label">About this project</p>
        <h1 className="hero-title">Built from frustration.<br />Shared with love.</h1>
        <p className="hero-sub">A student-made resource hub for DUET Cybersecurity students / past, present, and future.</p>
      </div>

      {/* The Story */}
      <p className="section-label">The Story</p>
      <div className={styles.storyCard}>
        <div className={styles.storyTimeline}>
          <div className={styles.timelineItem}>
            <span className={styles.timelineDot} />
            <div>
              <p className={styles.timelineDate}>August 2025</p>
              <p className={styles.timelineText}>
                I joined Dawood University of Engineering &amp; Technology, enrolled in
                Cybersecurity. Fresh start, new environment, zero idea how things worked here.
              </p>
            </div>
          </div>
          <div className={styles.timelineItem}>
            <span className={styles.timelineDot} />
            <div>
              <p className={styles.timelineDate}>October 2025 Mids week</p>
              <p className={styles.timelineText}>
                Exams hit and I had no clue how teachers set papers, where past papers were,
                or which lectures to prioritize. My phone was a mess of random PDFs scattered
                everywhere. I went in underprepared and paid the price.
              </p>
            </div>
          </div>
          <div className={styles.timelineItem}>
            <span className={styles.timelineDot} />
            <div>
              <p className={styles.timelineDate}>After mids , the idea</p>
              <p className={styles.timelineText}>
                I decided nobody in my class  or the batches coming after us , should go
                through the same chaos. So I built DUET Hub: one clean place for notes,
                lectures, assignments, and past papers. No login. No nonsense.
              </p>
            </div>
          </div>
          <div className={styles.timelineItem}>
            <span className={styles.timelineDot} />
            <div>
              <p className={styles.timelineDate}>The bigger picture</p>
              <p className={styles.timelineText}>
                I'm a huge fan of Linus Torvalds and what Linux represents,  the idea that
                one person sharing something freely can benefit millions. This is my small
                version of that: contributing to the internet, to DUET, to the next generation
                of Cybersecurity students in Karachi.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Developer */}
      <p className="section-label" style={{ marginTop: '3rem' }}>The Developer</p>
      <div className={styles.devCard}>
        <div className={styles.devAvatarWrap}>
          <div className={styles.devAvatar}>CH</div>
          <div className={styles.devBadge}>Batch 25F</div>
        </div>
        <div className={styles.devInfo}>
          <p className={styles.devName}>Muhammad Rehan</p>
          <p className={styles.devAlias}>@CH4_EZIO · Cybersecurity A2</p>
          <p className={styles.devBio}>
            Cybersecurity student at DUET, Linux enthusiast, open-source believer.
            I spend way too much time in the terminal and not enough time sleeping.
            I read Kafka in the day and break Linux installs at night.
            If it runs on Linux, I'm probably already interested.
          </p>
          <div className={styles.devContacts}>
            <a href="mailto:CH4_Ezio@proton.me" className={styles.contactBtn}>
              ✉ CH4_Ezio@proton.me
            </a>
            <a
              href="https://linkedin.com/in/muhammad-rehanriaz"
              target="_blank"
              rel="noreferrer"
              className={styles.contactBtn}
            >
              in LinkedIn
            </a>
            <a
              href="https://github.com/muhammadrehan-dev"
              target="_blank"
              rel="noreferrer"
              className={styles.contactBtn}
            >
              ⌥ GitHub
            </a>
          </div>
          <p className={styles.contactNote}>Don't hesitate to reach out — happy to chat.</p>
        </div>
      </div>

      {/* Resource Contributors */}
      <p className="section-label" style={{ marginTop: '3rem' }}>Resource Contributors</p>
      <p className={styles.contributorsIntro}>
        Special thanks to the amazing students who shared their departments' drives, materials, and resources to help expand the DUET Resource Hub.
      </p>
      <div className={styles.contributorsGrid}>
        {CONTRIBUTORS.map((c, i) => (
          <div key={i} className={styles.contributorCard}>
            <div className={styles.contributorHeader}>
              <div className={styles.contributorAvatar}>{c.avatar}</div>
              <div>
                <p className={styles.contributorName}>{c.name}</p>
                <p className={styles.contributorMeta}>
                  {c.roll} · {c.dept}
                </p>
              </div>
            </div>
            
            <span className={styles.contributorRole}>{c.role}</span>
            <p className={styles.contributorBio}>{c.bio}</p>
            
            {c.helpers && (
              <div className={styles.helpersSection}>
                <p className={styles.helpersTitle}>Core Contributors / Helpers</p>
                <div className={styles.helpersGrid}>
                  {c.helpers.map((h, j) => (
                    <span key={j} className={styles.helperChip}>
                      {h.name} <span className={styles.helperRoll}>({h.roll})</span>
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className={styles.contributorContacts}>
              {c.contacts.map((contact, idx) => (
                <a
                  key={idx}
                  href={contact.url}
                  target="_blank"
                  rel="noreferrer"
                  className={styles.contactBtn}
                >
                  {contact.icon} {contact.label}
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Skills */}
      <p className="section-label" style={{ marginTop: '3rem' }}>Skills &amp; Interests</p>
      <div className={styles.skillsGrid}>
        {SKILLS.map(s => (
          <div key={s.label} className={styles.skillChip}>
            <span>{s.icon}</span>
            <span>{s.label}</span>
          </div>
        ))}
      </div>

      {/* Favourite Animals (tech mascots) */}
      <p className="section-label" style={{ marginTop: '2.5rem' }}>Favourite Animals <span className={styles.sectionNote}></span></p>
      <div className={styles.animalsGrid}>
        {ANIMALS.map((a, i) => (
          <div key={i} className={styles.animalChip}>
            <span className={styles.animalIcon}>{a.icon}</span>
            <div>
              <p className={styles.animalName}>{a.animal}</p>
              <p className={styles.animalTech}>{a.tech}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Hobbies */}
      <p className="section-label" style={{ marginTop: '2.5rem' }}>Outside of Class</p>
      <div className={styles.hobbyGroups}>
        <div className={styles.hobbyGroup}>
          <p className={styles.hobbyGroupLabel}>📚 Books</p>
          <div className={styles.hobbiesList}>
            {HOBBIES.filter(h => h.group === 'books').map(h => (
              <span key={h.label} className={`${styles.hobbyTag} ${HOBBY_COLORS[h.group]}`}>{h.label}</span>
            ))}
          </div>
        </div>
        <div className={styles.hobbyGroup}>
          <p className={styles.hobbyGroupLabel}>✒️ Urdu Literature</p>
          <div className={styles.hobbiesList}>
            {HOBBIES.filter(h => h.group === 'urdu').map(h => (
              <span key={h.label} className={`${styles.hobbyTag} ${HOBBY_COLORS[h.group]}`}>{h.label}</span>
            ))}
          </div>
        </div>
        <div className={styles.hobbyGroup}>
          <p className={styles.hobbyGroupLabel}>🌿 Life</p>
          <div className={styles.hobbiesList}>
            {HOBBIES.filter(h => h.group === 'life').map(h => (
              <span key={h.label} className={`${styles.hobbyTag} ${HOBBY_COLORS[h.group]}`}>{h.label}</span>
            ))}
          </div>
        </div>
        <div className={styles.hobbyGroup}>
          <p className={styles.hobbyGroupLabel}>💻 Tech</p>
          <div className={styles.hobbiesList}>
            {HOBBIES.filter(h => h.group === 'tech').map(h => (
              <span key={h.label} className={`${styles.hobbyTag} ${HOBBY_COLORS[h.group]}`}>{h.label}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Projects */}
      <p className="section-label" style={{ marginTop: '3rem' }}>Projects</p>
      <div className={styles.projectsGrid}>
        {PROJECTS.map(p => (
          <a
            key={p.name}
            href={p.url}
            target="_blank"
            rel="noreferrer"
            className={styles.projectCard}
          >
            <div className={styles.projectTop}>
              <p className={styles.projectName}>{p.name}</p>
              <span className={styles.projectBadge}>{p.badge}</span>
            </div>
            <p className={styles.projectDesc}>{p.desc}</p>
            <p className={styles.projectUrl}>{p.url.replace('https://', '')}</p>
          </a>
        ))}
      </div>

      {/* Contribute */}
      <p className="section-label" style={{ marginTop: '3rem' }}>Contribute</p>
      <div className={styles.contributeCard}>
        <p className={styles.contributeIntro}>
          Have notes, assignments, or past papers? Upload them — they'll show up here
          automatically for everyone. No account needed beyond GitHub.
        </p>
        <div className={styles.steps}>
          <div className={styles.step}>
            <span className={styles.stepNum}>1</span>
            <div>
              <p className={styles.stepTitle}>Fork the repository</p>
              <p className={styles.stepDesc}>Open it on GitHub and hit Fork</p>
            </div>
          </div>
          <div className={styles.step}>
            <span className={styles.stepNum}>2</span>
            <div>
              <p className={styles.stepTitle}>Upload your files</p>
              <p className={styles.stepDesc}>Drop them in the correct semester &amp; subject folder</p>
            </div>
          </div>
          <div className={styles.step}>
            <span className={styles.stepNum}>3</span>
            <div>
              <p className={styles.stepTitle}>Open a pull request</p>
              <p className={styles.stepDesc}>It'll be reviewed and merged — your files go live</p>
            </div>
          </div>
        </div>
        <a
          href="https://github.com/muhammadrehan-dev/subjects"
          target="_blank"
          rel="noreferrer"
          className={styles.repoBtn}
        >
          View Repository on GitHub →
        </a>
      </div>

    </div>
  )
}
