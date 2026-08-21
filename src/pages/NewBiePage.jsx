import { useState } from 'react'
import { 
  Globe, ClipboardList, GraduationCap, Cloud, Phone, Laptop, 
  Package, GitBranch, Bot, Gem, ShieldCheck, Zap, 
  Brain, Printer, Key, Lightbulb, CheckCircle2, 
  Building2, Camera, ChevronUp, ChevronDown, ArrowRight, BookOpen, Coffee, Clock, ShieldAlert, Award
} from 'lucide-react'
import styles from './Newbiepage.module.css'

const COMMANDMENTS = [
  {
    step: '01',
    title: 'The 75% Attendance Rule is Sacred',
    detail: '74.9% means an automatic exam ban on the QOBE portal. The portal algorithm has no heart and accepts zero excuses. Check your attendance weekly!',
    icon: <ShieldAlert size={22} />
  },
  {
    step: '02',
    title: 'Setup Your University Email Day 1',
    detail: 'Your @students.duet.edu.pk email unlocks free Microsoft Office 365, 1TB OneDrive storage, GitHub Student Developer Pack, and Azure credits. Claim them immediately!',
    icon: <Cloud size={22} />
  },
  {
    step: '03',
    title: 'Master the QOBE Portal',
    detail: 'QOBE is where your GPA, course outline, attendance, and mid/final marks live. First login via Microsoft, then set a memorable password.',
    icon: <GraduationCap size={22} />
  },
  {
    step: '04',
    title: 'Befriend Seniors & Get Past Papers',
    detail: 'Seniors hold the holy grail of past mid/final exam paper solutions, lab manual hints, and notes. Ask nicely and treat them to cafeteria chai!',
    icon: <Coffee size={22} />
  },
  {
    step: '05',
    title: 'Buy a Home Printer Early',
    detail: 'Lab reports, assignment coversheets, attendance forms — you will print constantly. A basic home printer pays for itself by Week 3.',
    icon: <Printer size={22} />
  }
]

const PERKS = [
  { icon: <Package size={22} />, label: 'Free Microsoft 365', desc: 'Word, Excel, PowerPoint, Teams & 1TB OneDrive storage' },
  { icon: <GitBranch size={22} />, label: 'GitHub Student Pack', desc: 'Free GitHub Pro, domain names & developer tools' },
  { icon: <Bot size={22} />, label: 'Copilot Pro Access', desc: 'AI code assistant & research tools included with GitHub Pro' },
  { icon: <Cloud size={22} />, label: 'Azure Cloud Credits', desc: 'Student cloud credits for hosting Web & AI projects' }
]

const PORTALS = [
  {
    name: 'QOBE Student Portal',
    url: 'https://student.qualityobe.com/site/login',
    icon: <GraduationCap size={24} />,
    purpose: 'Attendance · Marks · Courses · Assignments',
    login: 'Login via university Microsoft Azure email',
    tip: 'Check your attendance every Friday! Don\'t wait for midterm week to realize you missed too many classes.',
    color: 'blue'
  },
  {
    name: 'Azure Proxy Portal',
    url: 'https://portal-duet.msappproxy.net/',
    icon: <Cloud size={24} />,
    purpose: 'Semester Fee Challan Download Only',
    login: 'Login with your @students.duet.edu.pk Azure credentials',
    tip: 'This portal does one specific job — downloading semester fee challans. Keep your credentials handy during fee week.',
    color: 'green'
  }
]

const CAMPUS_PHOTOS = [
  {
    title: 'Main Campus Lawns & Greenery',
    image: '/main campus garden image by Sidra tul Muntaha.png',
    credit: 'Sidra tul Muntaha'
  },
  {
    title: 'IC&S Gulberg Campus Courtyard',
    image: '/gulber inside image by fozan.png',
    credit: 'Fozan'
  },
  {
    title: 'Main Auditorium Events & Celebrations',
    image: '/main campus auditorium image by life as dawoodian.png',
    credit: 'Life as Dawoodian'
  }
]

const FAQS = [
  {
    q: 'What email format will I receive as a freshman?',
    a: 'Your email follows the format: Batch-Dept-Roll@students.duet.edu.pk (e.g., 25F-CY-102@students.duet.edu.pk). It is powered by Microsoft Azure. Guard it with your life because it unlocks free Microsoft 365, GitHub Pro, and Azure credits!'
  },
  {
    q: 'Is the 75% attendance rule really enforced strictly?',
    a: 'YES! 74.9% means an automatic exam ban on the QOBE portal. There are no manual overrides or medical exceptions after the portal locks. Check QOBE weekly to maintain your attendance buffer!'
  },
  {
    q: 'What is the Wi-Fi password on campus?',
    a: 'Network name is "Student". The password is typically duet@1234, Duet@1234, or DUET@1234. Try all three! Speed in the library is fast and ideal for downloading lecture slides.'
  },
  {
    q: 'How do I download my semester fee challan?',
    a: 'Log into the Azure Proxy Portal (portal-duet.msappproxy.net) using your university Azure ID and click "Download Challan". Pay at any designated bank or via 1Bill on your mobile banking app.'
  },
  {
    q: 'Are there student societies & tech clubs at DUET?',
    a: 'Yes! DUET has active chapters including DLS (Dawood Literary Society), WLWJ Society (Cybersecurity), ACM Student Chapter, and IEEE Student Branch. Join early to build your network and resume!'
  }
]

function FaqItem({ q, a }) {
  const [open, setOpen] = useState(false)
  return (
    <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '14px', marginBottom: '10px', overflow: 'hidden' }}>
      <button 
        onClick={() => setOpen(o => !o)}
        style={{ width: '100%', padding: '1.25rem 1.5rem', background: 'none', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'space-between', textAlign: 'left', cursor: 'pointer', fontFamily: 'var(--font-ui)', fontWeight: 700, fontSize: '15px', color: 'var(--text-primary)' }}
      >
        <span>{q}</span>
        {open ? <ChevronUp size={18} style={{ color: 'var(--accent)', flexShrink: 0 }} /> : <ChevronDown size={18} style={{ color: 'var(--text-muted)', flexShrink: 0 }} />}
      </button>
      {open && (
        <div style={{ padding: '0 1.5rem 1.25rem 1.5rem', fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.6, fontFamily: 'var(--font-ui)', borderTop: '1px solid var(--border)', paddingTop: '1rem' }}>
          {a}
        </div>
      )}
    </div>
  )
}

export default function NewBiePage() {
  return (
    <div className="page">
      {/* Hero Banner */}
      <div 
        className={styles.heroBanner}
        style={{ backgroundImage: `url("/main campus garden image by Sidra tul Muntaha.png")` }}
      >
        <div className={styles.heroOverlay} />
        <div className={styles.heroContent}>
          <p className={styles.heroTagline}>FRESHMAN SURVIVAL GUIDE</p>
          <h1 className={styles.heroTitle}>WELCOME TO DUET (TRY NOT TO PANIC)</h1>
          <p className={styles.heroDescription}>
            The unofficial survival manual for new Dawoodians — 75% attendance rules, QOBE portal setup, free Microsoft &amp; GitHub perks, cafeteria chai culture, and 1st semester pro-tips.
          </p>
        </div>
        <span className={styles.heroCreditBadge}>
          <Camera size={12} /> Image by Sidra tul Muntaha
        </span>
      </div>

      {/* Freshman 5 Commandments Roadmap */}
      <div style={{ marginBottom: '3.5rem' }}>
        <p className="section-label">Freshman Survival Roadmap</p>
        <h2 style={{ fontSize: '28px', fontWeight: 800, fontFamily: 'var(--font-sans)', margin: '0 0 1.5rem 0' }}>The 5 Commandments for Freshmen</h2>

        <div className={styles.roadmapContainer}>
          <div className={styles.roadmapLine} />
          {COMMANDMENTS.map(cmd => (
            <div key={cmd.step} className={styles.roadmapStep}>
              <div className={styles.roadmapBadge}>
                {cmd.icon}
                <span className={styles.roadmapStepNum}>{cmd.step}</span>
              </div>
              <div className={styles.roadmapCard}>
                <h3 className={styles.roadmapTitle}>{cmd.title}</h3>
                <p className={styles.roadmapDetail}>{cmd.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Free Student Perks & Benefits */}
      <div style={{ marginBottom: '3.5rem' }}>
        <p className="section-label">Student Perks</p>
        <h2 style={{ fontSize: '28px', fontWeight: 800, fontFamily: 'var(--font-sans)', margin: '0 0 1.5rem 0' }}>Free Software Perks With Your Uni ID</h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.25rem' }}>
          {PERKS.map((perk, i) => (
            <div key={i} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '16px', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: 'var(--accent-light)', color: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {perk.icon}
              </div>
              <h3 style={{ fontSize: '16px', fontWeight: 800, margin: 0, color: 'var(--text-primary)', fontFamily: 'var(--font-ui)' }}>{perk.label}</h3>
              <p style={{ fontSize: '13px', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.5, fontFamily: 'var(--font-ui)' }}>{perk.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Official Portals Guide */}
      <div style={{ marginBottom: '3.5rem' }}>
        <p className="section-label">Essential Student Portals</p>
        <h2 style={{ fontSize: '28px', fontWeight: 800, fontFamily: 'var(--font-sans)', margin: '0 0 1.5rem 0' }}>Portals You Will Use Every Week</h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
          {PORTALS.map((portal, i) => (
            <div key={i} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '18px', padding: '1.75rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '46px', height: '46px', borderRadius: '12px', background: 'var(--accent-light)', color: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {portal.icon}
                </div>
                <div>
                  <h3 style={{ fontSize: '18px', fontWeight: 800, margin: 0, fontFamily: 'var(--font-ui)' }}>{portal.name}</h3>
                  <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--accent)', background: 'var(--accent-light)', padding: '2px 8px', borderRadius: '99px', display: 'inline-block', marginTop: '4px' }}>
                    {portal.purpose}
                  </span>
                </div>
              </div>
              <p style={{ fontSize: '13px', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.6, fontFamily: 'var(--font-ui)' }}>
                <strong>Login:</strong> {portal.login}
              </p>
              <div style={{ background: 'var(--bg-alt)', border: '1px solid var(--border)', padding: '10px 14px', borderRadius: '10px', fontSize: '12px', color: 'var(--text-muted)', fontFamily: 'var(--font-ui)' }}>
                💡 <strong>Pro Tip:</strong> {portal.tip}
              </div>
              <a 
                href={portal.url} 
                target="_blank" 
                rel="noreferrer" 
                className="btn btn-primary"
                style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '8px', textDecoration: 'none', padding: '10px 18px', fontSize: '13px', fontWeight: 700, marginTop: 'auto' }}
              >
                Open {portal.name} <ArrowRight size={15} />
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* Campus Photos Showcase */}
      <div style={{ marginBottom: '3.5rem' }}>
        <p className="section-label">Campus Life</p>
        <h2 style={{ fontSize: '28px', fontWeight: 800, fontFamily: 'var(--font-sans)', margin: '0 0 1.5rem 0' }}>Life as a Dawoodian</h2>

        <div className={styles.photoShowcaseGrid}>
          {CAMPUS_PHOTOS.map((photo, idx) => (
            <div key={idx} className={styles.photoCard}>
              <div className={styles.photoImageWrap}>
                <img src={photo.image} alt={photo.title} className={styles.photoImage} />
                <span className={styles.photoCreditBadge}>
                  <Camera size={11} /> Image by {photo.credit}
                </span>
              </div>
              <div className={styles.photoMeta}>
                <p className={styles.photoTitle}>{photo.title}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Relatable Freshman FAQs */}
      <div style={{ marginBottom: '3.5rem' }}>
        <p className="section-label">Freshman FAQs</p>
        <h2 style={{ fontSize: '28px', fontWeight: 800, fontFamily: 'var(--font-sans)', margin: '0 0 1.5rem 0' }}>Frequently Asked Questions</h2>

        {FAQS.map((faq, i) => (
          <FaqItem key={i} q={faq.q} a={faq.a} />
        ))}
      </div>
    </div>
  )
}