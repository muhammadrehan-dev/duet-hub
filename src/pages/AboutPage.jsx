import { useState } from 'react'
import { 
  Terminal, ShieldCheck, Zap, Globe, Code2, GitBranch, 
  Cat, Box, Cpu, Shield, Database, Activity, 
  MessageSquare, Mail, 
  BookOpen, Feather, Leaf, Laptop, ArrowRight, Camera,
  GraduationCap, AlertTriangle, Sparkles, Quote, RefreshCw,
  Copy, Check, ChevronLeft, ChevronRight, Grid
} from 'lucide-react'
import { QUOTES } from '@/data/quotes'
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

const INTERESTS = [
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
  const [currentQuoteIndex] = useState(() => Math.floor(Math.random() * QUOTES.length))
  const [copiedQuoteId, setCopiedQuoteId] = useState(null)

  const currentQuote = QUOTES[currentQuoteIndex]

  const handleCopyQuote = (quoteObj) => {
    const text = `"${quoteObj.quote}" — ${quoteObj.author} (${quoteObj.category})`
    navigator.clipboard.writeText(text)
    setCopiedQuoteId(quoteObj.id)
    setTimeout(() => setCopiedQuoteId(null), 2000)
  }

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

        {/* Dynamic Open Source Quotes Section (Randomly Picks 1 of 22 Quotes on Visit) */}
        <div className={styles.quotesSectionContainer}>
          <div className={styles.quotesSectionHeader}>
            <div>
              <p className="hero-label" style={{ color: 'var(--accent)', fontWeight: 700, margin: 0 }}>WORDS TO CODE BY</p>
              <h2 style={{ fontSize: '26px', fontWeight: 800, fontFamily: 'var(--font-sans)', margin: '4px 0 0 0' }}>
                Open Source &amp; Engineering Wisdom
              </h2>
            </div>
          </div>

          {/* Main Random Quote Box */}
          <div className={styles.featuredQuoteBox}>
            <div className={styles.quoteIconBadge}>
              <Quote size={28} />
            </div>

            <div className={styles.quoteContentGroup}>
              <div className={styles.quoteMetaHeader}>
                <span className={styles.quoteTagPill}>{currentQuote.tag}</span>
                <span className={styles.quoteCategoryPill}>{currentQuote.category}</span>
              </div>

              <p className={styles.featuredQuoteText}>
                "{currentQuote.quote}"
              </p>

              <div className={styles.quoteFooterRow}>
                <p className={styles.featuredQuoteAuthor}>
                  — Inspired by <strong>{currentQuote.author}</strong>
                </p>

                <button 
                  className={styles.copyQuoteBtn}
                  onClick={() => handleCopyQuote(currentQuote)}
                >
                  {copiedQuoteId === currentQuote.id ? <Check size={14} color="#10B981" /> : <Copy size={14} />}
                  <span>{copiedQuoteId === currentQuote.id ? 'Copied!' : 'Copy Quote'}</span>
                </button>
              </div>
            </div>
          </div>
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
        <div className={styles.devHeader}>
          <div className={styles.devAvatar}>
            MR
          </div>
          <div>
            <div className={styles.devNameRow}>
              <h2 className={styles.devName}>Muhammad Rehan</h2>
              <span className={styles.devBadge}>Cybersecurity '25F</span>
            </div>
            <p className={styles.devRole}>Creator &amp; Maintainer of DUET Resource Hub</p>
          </div>
        </div>

        <p className={styles.devBio}>
          Sophomore Cybersecurity student at Dawood University of Engineering &amp; Technology (Batch 25F). 
          Passionate about CTFs, reverse engineering, Linux administration, open-source culture, and building tools that make academic life easier for every Dawoodian.
        </p>

        <p className={styles.subLabel}>Core Interests</p>
        <div className={styles.interestsGrid}>
          {INTERESTS.map((item, index) => (
            <div key={index} className={styles.interestItem}>
              {item.icon}
              <span>{item.label}</span>
            </div>
          ))}
        </div>

        <p className={styles.subLabel} style={{ marginTop: '1.5rem' }}>Tech &amp; Animal Analogies</p>
        <div className={styles.interestsGrid}>
          {ANIMALS.map((item, index) => (
            <div key={index} className={styles.interestItem}>
              {item.icon}
              <span>{item.animal} = {item.tech}</span>
            </div>
          ))}
        </div>

        <p className={styles.subLabel} style={{ marginTop: '1.5rem' }}>Authors, Urdu Literature &amp; Hobbies</p>
        <div className={styles.hobbiesWrap}>
          {HOBBIES.map((h, i) => (
            <span key={i} className={`${styles.hobbyTag} ${HOBBY_COLORS[h.group]}`}>
              {h.label}
            </span>
          ))}
        </div>

        <p className={styles.subLabel} style={{ marginTop: '1.5rem' }}>Connect with Developer</p>
        <div className={styles.linksRow}>
          <a href="https://github.com/muhammadrehan-dev" target="_blank" rel="noreferrer" className="btn btn-secondary" style={{ fontSize: '13px', padding: '8px 14px' }}>
            <GithubIcon size={14} /> GitHub
          </a>
          <a href="https://linkedin.com/in/muhammadrehan-dev" target="_blank" rel="noreferrer" className="btn btn-secondary" style={{ fontSize: '13px', padding: '8px 14px' }}>
            <LinkedinIcon size={14} /> LinkedIn
          </a>
          <a href="https://instagram.com/ch4_ezio" target="_blank" rel="noreferrer" className="btn btn-secondary" style={{ fontSize: '13px', padding: '8px 14px' }}>
            <InstagramIcon size={14} /> Instagram
          </a>
          <a href="mailto:contact@rehan.dev" className="btn btn-secondary" style={{ fontSize: '13px', padding: '8px 14px' }}>
            <Mail size={14} /> Email
          </a>
        </div>
      </div>

      {/* Projects */}
      <p className="section-label" style={{ marginTop: '3rem' }}>Other Projects by Developer</p>
      <div className={styles.projectsGrid}>
        {PROJECTS.map((proj, index) => (
          <a key={index} href={proj.url} target="_blank" rel="noreferrer" className={styles.projectCard}>
            <div className={styles.projectTop}>
              <h3 className={styles.projectName}>{proj.name}</h3>
              <span className={styles.projectBadge}>{proj.badge}</span>
            </div>
            <p className={styles.projectDesc}>{proj.desc}</p>
          </a>
        ))}
      </div>

      {/* Key Contributors */}
      <p className="section-label" style={{ marginTop: '3.5rem' }}>Key Contributors &amp; Resource Managers</p>
      <h2 style={{ fontSize: '28px', fontWeight: 800, fontFamily: 'var(--font-sans)', margin: '0 0 1.5rem 0' }}>Community Leadership</h2>

      <div className={styles.contributorsGrid}>
        {CONTRIBUTORS.map((c, i) => (
          <div key={i} className={styles.contributorCard}>
            <div className={styles.contributorHeader}>
              <div className={styles.contributorAvatar}>{c.avatar}</div>
              <div>
                <h3 className={styles.contributorName}>{c.name}</h3>
                <span className={styles.contributorRole}>{c.role}</span>
              </div>
            </div>

            <div className={styles.contributorMeta}>
              <span>{c.dept}</span> • <span>Roll: {c.roll}</span>
            </div>

            <p className={styles.contributorBio}>{c.bio}</p>

            {c.helpers && (
              <div className={styles.helpersSection}>
                <p className={styles.helpersTitle}>Core Team Helpers:</p>
                <div className={styles.helpersList}>
                  {c.helpers.map((h, idx) => (
                    <span key={idx} className={styles.helperPill}>
                      {h.name} ({h.roll})
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className={styles.contactsRow}>
              {c.contacts.map((contact, idx) => (
                <a 
                  key={idx} 
                  href={contact.url} 
                  target="_blank" 
                  rel="noreferrer" 
                  className={styles.contactBtn}
                >
                  {contact.icon}
                  <span>{contact.label}</span>
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>

    </div>
  )
}
