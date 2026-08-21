import { 
  Terminal, ShieldCheck, Zap, Globe, Code2, GitBranch, 
  Cat, Box, Cpu, Shield, Database, Activity, 
  MessageSquare, Mail, 
  BookOpen, Feather, Leaf, Laptop, ArrowRight, Camera,
  GraduationCap, AlertTriangle, Sparkles
} from 'lucide-react'
import styles from './AboutPage.module.css'

function InstagramIcon({ size = 14, className, style }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} style={style}>
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  )
}

function LinkedinIcon({ size = 14, className, style }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} style={style}>
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  )
}

function GithubIcon({ size = 14, className, style }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} style={style}>
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  )
}

const SKILLS = [
  { label: 'Linux', icon: <Terminal size={18} /> },
  { label: 'Cybersecurity', icon: <ShieldCheck size={18} /> },
  { label: 'Open Source', icon: <Zap size={18} /> },
  { label: 'Networking', icon: <Globe size={18} /> },
  { label: 'Python', icon: <Code2 size={18} /> },
  { label: 'Git & GitHub', icon: <GitBranch size={18} /> },
]

const ANIMALS = [
  { animal: 'Cat',      tech: 'GitHub',         icon: <Cat size={18} /> },
  { animal: 'Snake',    tech: 'Python',         icon: <Code2 size={18} /> },
  { animal: 'Whale',    tech: 'Docker',         icon: <Box size={18} /> },
  { animal: 'Penguin',  tech: 'Linux',          icon: <Terminal size={18} /> },
  { animal: 'Fox',      tech: 'Firefox',        icon: <Globe size={18} /> },
  { animal: 'Dragon',   tech: 'Kali Linux',     icon: <Shield size={18} /> },
  { animal: 'Crab',     tech: 'OpenClaw',       icon: <Cpu size={18} /> },
  { animal: 'Crab',     tech: 'Rust',           icon: <Cpu size={18} /> },
  { animal: 'Elephant', tech: 'PostgreSQL',     icon: <Database size={18} /> },
  { animal: 'Shark',    tech: 'Wireshark',      icon: <Activity size={18} /> },
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
    badge: <ArrowRight size={14} />,
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
      { label: 'Instagram', url: 'https://www.instagram.com/syedsheharyartariq/', icon: <InstagramIcon size={14} /> },
      { label: 'LinkedIn', url: 'https://www.linkedin.com/in/syed-sheharyar-tariq/', icon: <LinkedinIcon size={14} /> },
      { label: 'WhatsApp', url: 'https://wa.me/923319712139', icon: <MessageSquare size={14} /> },
      { label: 'Email', url: 'mailto:syedsheharyarprofessional@gmail.com', icon: <Mail size={14} /> }
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
      { label: 'WhatsApp', url: 'https://wa.me/923198971870', icon: <MessageSquare size={14} /> },
      { label: 'Email', url: 'mailto:abdulhayykhan.1@gmail.com', icon: <Mail size={14} /> }
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

      {/* Hero Banner */}
      <div 
        className={styles.heroBanner}
        style={{ backgroundImage: `url("/main campus garden image by Sidra tul Muntaha.png")` }}
      >
        <div className={styles.heroOverlay} />
        <div className={styles.heroContent}>
          <p className={styles.heroTagline}>ABOUT DUET RESOURCE HUB • STUDENT INITIATIVE</p>
          <h1 className={styles.heroTitle}>BUILT BY STUDENTS</h1>
          <p className={styles.heroDescription}>
            A student-driven open initiative empowering Dawood University with centralized academic repositories, past papers, and freshman guides.
          </p>
        </div>
        <span className={styles.heroCreditBadge}>
          <Camera size={12} /> Image by Sidra tul Muntaha
        </span>
      </div>

      {/* The Story */}
      <div style={{ marginBottom: '3.5rem' }}>
        <p className="section-label">The Story Behind DUET Hub</p>
        <h2 style={{ fontSize: '28px', fontWeight: 800, fontFamily: 'var(--font-sans)', margin: '0 0 1.5rem 0' }}>How It All Started</h2>

        <div className={styles.storyContainer}>
          <div className={styles.storyLine} />
          
          <div className={styles.storyStep}>
            <div className={styles.storyBadge}>
              <GraduationCap size={24} />
            </div>
            <div className={styles.storyCard}>
              <div className={styles.storyHeader}>
                <h3 className={styles.storyTitle}>August 2025: The Naive Freshman Arrival</h3>
                <span className={styles.storyDate}>Chapter 01</span>
              </div>
              <p className={styles.storyText}>
                Joined Dawood University of Engineering &amp; Technology, enrolled in Cybersecurity (25F). Fresh start, new campus, big dreams, and absolutely zero idea how academic portals, attendance rules, or midterms actually worked here.
              </p>
            </div>
          </div>

          <div className={styles.storyStep}>
            <div className={styles.storyBadge}>
              <BookOpen size={24} />
            </div>
            <div className={styles.storyCard}>
              <div className={styles.storyHeader}>
                <h3 className={styles.storyTitle}>October 2025: Midterms &amp; PDF Chaos</h3>
                <span className={styles.storyDate}>Chapter 02</span>
              </div>
              <p className={styles.storyText}>
                Exams hit and panic set in. Nobody knew where past papers were, lecture slides were buried across 40 different WhatsApp groups, and my phone was a mess of corrupt PDF screenshots. I went into exams underprepared and paid the price.
              </p>
            </div>
          </div>

          <div className={styles.storyStep}>
            <div className={styles.storyBadge}>
              <Code2 size={24} />
            </div>
            <div className={styles.storyCard}>
              <div className={styles.storyHeader}>
                <h3 className={styles.storyTitle}>November 2025: The Eureka Moment</h3>
                <span className={styles.storyDate}>Chapter 03</span>
              </div>
              <p className={styles.storyText}>
                I decided nobody in my batch — or future batches coming after us — should go through the same academic chaos. Armed with VS Code and way too much caffeine, I built DUET Hub: one clean, centralized, zero-login repository for notes, lectures, assignments, and past papers.
              </p>
            </div>
          </div>

          <div className={styles.storyStep}>
            <div className={styles.storyBadge}>
              <Terminal size={24} />
            </div>
            <div className={styles.storyCard}>
              <div className={styles.storyHeader}>
                <h3 className={styles.storyTitle}>Present Day: The Linus Torvalds Philosophy</h3>
                <span className={styles.storyDate}>Chapter 04</span>
              </div>
              <p className={styles.storyText}>
                I'm a massive fan of Linus Torvalds and the open-source Linux philosophy — the belief that when one person shares tools freely, thousands benefit. DUET Hub is our contribution to the internet, to DUET, and to the next generation of engineers in Karachi.
              </p>
            </div>
          </div>
        </div>

        {/* Linus Torvalds Inspired Quote Box */}
        <div className={styles.quoteBox}>
          <p className={styles.quoteText}>
            "Talk is cheap. Show me the code. We built DUET Hub so high-quality academic resources remain 100% free, open, and accessible for every student forever."
          </p>
          <p className={styles.quoteAuthor}>— Inspired by Linus Torvalds &amp; Open Source Ethics</p>
        </div>
      </div>

      {/* Campus Environment Gallery */}
      <p className="section-label" style={{ marginTop: '3rem' }}>Campus Environment &amp; Infrastructure</p>
      <div className={styles.photoShowcaseGrid}>
        <div className={styles.photoCard}>
          <div className={styles.photoImageWrap}>
            <img src="/main campus garden image by Sidra tul Muntaha.png" alt="Main Campus Courtyard Lawn" className={styles.photoImage} />
            <span className={styles.photoCreditBadge}>
              <Camera size={11} /> Sidra tul Muntaha
            </span>
          </div>
          <div className={styles.photoMeta}>
            <p className={styles.photoTitle}>Main Campus Courtyard Lawn</p>
          </div>
        </div>

        <div className={styles.photoCard}>
          <div className={styles.photoImageWrap}>
            <img src="/cemet campus confrence hall image by official facebook page of cemet campus.png" alt="CEMET Conference Hall" className={styles.photoImage} />
            <span className={styles.photoCreditBadge}>
              <Camera size={11} /> Official Facebook Page
            </span>
          </div>
          <div className={styles.photoMeta}>
            <p className={styles.photoTitle}>CEMET Campus Conference Hall</p>
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
              <Mail size={14} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '4px' }} /> CH4_Ezio@proton.me
            </a>
            <a
              href="https://wa.me/923229680603"
              target="_blank"
              rel="noreferrer"
              className={styles.contactBtn}
            >
              <MessageSquare size={14} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '4px' }} /> WhatsApp
            </a>
            <a
              href="https://linkedin.com/in/muhammad-rehanriaz"
              target="_blank"
              rel="noreferrer"
              className={styles.contactBtn}
            >
              <LinkedinIcon size={14} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '4px' }} /> LinkedIn
            </a>
            <a
              href="https://github.com/muhammadrehan-dev"
              target="_blank"
              rel="noreferrer"
              className={styles.contactBtn}
            >
              <GithubIcon size={14} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '4px' }} /> GitHub
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
          <p className={styles.hobbyGroupLabel}>
            <BookOpen size={16} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '6px' }} /> Books
          </p>
          <div className={styles.hobbiesList}>
            {HOBBIES.filter(h => h.group === 'books').map(h => (
              <span key={h.label} className={`${styles.hobbyTag} ${HOBBY_COLORS[h.group]}`}>{h.label}</span>
            ))}
          </div>
        </div>
        <div className={styles.hobbyGroup}>
          <p className={styles.hobbyGroupLabel}>
            <Feather size={16} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '6px' }} /> Urdu Literature
          </p>
          <div className={styles.hobbiesList}>
            {HOBBIES.filter(h => h.group === 'urdu').map(h => (
              <span key={h.label} className={`${styles.hobbyTag} ${HOBBY_COLORS[h.group]}`}>{h.label}</span>
            ))}
          </div>
        </div>
        <div className={styles.hobbyGroup}>
          <p className={styles.hobbyGroupLabel}>
            <Leaf size={16} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '6px' }} /> Life
          </p>
          <div className={styles.hobbiesList}>
            {HOBBIES.filter(h => h.group === 'life').map(h => (
              <span key={h.label} className={`${styles.hobbyTag} ${HOBBY_COLORS[h.group]}`}>{h.label}</span>
            ))}
          </div>
        </div>
        <div className={styles.hobbyGroup}>
          <p className={styles.hobbyGroupLabel}>
            <Laptop size={16} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '6px' }} /> Tech
          </p>
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
