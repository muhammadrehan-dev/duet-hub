import { useState } from 'react'
import { MERIT_LISTS, SAMPLE_PAPERS } from '@/data/config'
import FilePreviewModal from '@/components/FilePreviewModal'
import { 
  BookOpen, Brain, Globe, UserCheck, Camera, CreditCard, 
  CheckCircle2, Ticket, Building2, Lightbulb, MapPin, 
  Megaphone, FileText, Edit3, ClipboardList, GraduationCap, 
  FileCheck, IdCard, Home, HardDrive, Calendar, Clock, 
  FolderKanban, Target, Coins, BarChart3, AlertTriangle, 
  ArrowRight, ExternalLink, ChevronUp, ChevronDown, Calculator, Sparkles, Download, Eye
} from 'lucide-react'
import styles from './AdmissionsPage.module.css'

const CAMPUSES = [
  {
    name: 'Main Campus (New M.A. Jinnah Road)',
    location: 'New M.A. Jinnah Road, Karachi',
    focus: 'Home of Chemical, Metallurgy, Petroleum, Electronics & Civil Engineering Departments.',
    image: '/main campus main gate image by Faheem Bozdar.png',
    credit: 'Faheem Bozdar',
    tag: 'Main Hub',
  },
  {
    name: 'Gulberg Town IC&S Campus',
    location: 'Dastagir Block 9, Federal B Area, Karachi',
    focus: 'Home of Computer Science, AI, Cybersecurity, Data Science & AR/VR Research Labs.',
    image: '/gulberg campus academic block image by Syed Shayan.png',
    credit: 'Syed Shayan',
    tag: 'Tech Hub',
  },
  {
    name: 'CEMET Rohri-Sukkur Campus',
    location: 'NH 5, Rohri, Sukkur',
    focus: 'Center of Excellence in Modern Engineering & Computing Technologies.',
    image: '/cemet campus ariel view image by official facebook page.png',
    credit: 'Official Facebook Page',
    tag: 'Interior Sindh Hub',
  }
]

const APPLICATION_STEPS = [
  {
    step: '01',
    title: 'Account Registration',
    detail: 'Register on admissions.duet.edu.pk. Type your name EXACTLY as printed on your Matric certificate (unless you want a typo on your degree for 4 years).',
    icon: <UserCheck size={22} />
  },
  {
    step: '02',
    title: 'Photo Upload (No Filters!)',
    detail: 'Upload a clear passport photo with a blue background. The security uncle at the gate will compare it to your face, so save Instagram filters for later.',
    icon: <Camera size={22} />
  },
  {
    step: '03',
    title: 'Bank Challan Payment',
    detail: 'Pay the application fee at any Allied Bank branch or via 1Bill. Keep the original paid slip safe like your gold medal.',
    icon: <CreditCard size={22} />
  },
  {
    step: '04',
    title: 'Entry Test Day Panic',
    detail: '100 MCQs in 90 minutes. 54 seconds per question. Bring 2 black ballpoint pens, your admit card, and your original CNIC or B-Form.',
    icon: <Edit3 size={22} />
  },
  {
    step: '05',
    title: 'Merit List Refreshing at 2 AM',
    detail: 'The merit lists drop online when you least expect it. Keep refreshing the portal and check where your name stands.',
    icon: <ClipboardList size={22} />
  },
  {
    step: '06',
    title: 'Fee Deposit & Welcome to DUET!',
    detail: 'Pay your tuition fee before the strict deadline. Congratulations! You are officially a Dawoodian. Time to celebrate with cafeteria chai!',
    icon: <GraduationCap size={22} />
  }
]

const DOCS_REQUIRED = [
  { icon: <FileCheck size={20} />, name: 'Matric Certificate & Marksheet (DMC)', note: 'Original + 2 attested copies' },
  { icon: <FileCheck size={20} />, name: 'Intermediate Marksheet / Admit Card', note: 'Original + 2 attested copies' },
  { icon: <IdCard size={20} />, name: 'CNIC or B-Form', note: 'Original + 2 attested copies' },
  { icon: <Home size={20} />, name: 'Domicile & PRC (Form C)', note: 'Karachi or Sindh Domicile' },
  { icon: <Camera size={20} />, name: 'Passport Photos (Blue BG)', note: '6 recent passport size photos' },
  { icon: <ClipboardList size={20} />, name: 'Character Certificate', note: 'Issued by your college principal' }
]

const FAQS = [
  {
    q: 'What is the minimum FSc percentage required to apply for CS / AI?',
    a: 'The official minimum eligibility is 60% in FSc Pre-Engineering or ICS. However, for competitive computing fields (CS, AI, Cyber, Data Science), the actual merit cut-off usually lands between 76% and 88% aggregate. Apply early and score high on the entry test!'
  },
  {
    q: 'How is the DUET Merit Aggregate calculated?',
    a: 'Merit formula: 60% Entry Test Score + 30% Intermediate Marks + 10% Matric Marks. You can use our live Aggregate Calculator above to calculate your exact merit percentage!'
  },
  {
    q: 'Is there negative marking in the DUET Entry Test?',
    a: 'NO! There is ZERO negative marking. Attempt all 100 questions. Never leave an answer blank — smart guessing is strongly encouraged!'
  },
  {
    q: 'Can pre-medical students apply for Engineering & CS?',
    a: 'Yes! Pre-medical students who took or are taking Additional Mathematics can apply for all Engineering & Computing programs. Pre-medical students can also apply for BS programs with a 0-credit Math course in 1st year.'
  },
  {
    q: 'What happens if I miss the fee deposit deadline after appearing on the merit list?',
    a: 'Your seat is automatically cancelled and offered to the next candidate on the waiting list. Treat the fee deposit deadline as strictly as an exam date!'
  }
]

// ─── Subcomponents ───────────────────────────────────────────────────────────
function MeritCalculator() {
  const [matric, setMatric] = useState('950')
  const [inter, setInter] = useState('850')
  const [testScore, setTestScore] = useState('72')

  const matricNum = Math.min(Math.max(parseFloat(matric) || 0, 0), 1100)
  const interNum = Math.min(Math.max(parseFloat(inter) || 0, 0), 1100)
  const testNum = Math.min(Math.max(parseFloat(testScore) || 0, 0), 100)

  const matricPct = (matricNum / 1100) * 10
  const interPct = (interNum / 1100) * 30
  const testPct = (testNum / 100) * 60

  const aggregate = (matricPct + interPct + testPct).toFixed(2)

  let feedback = ''
  if (aggregate >= 80) {
    feedback = "Māshā’Allāh! Outstanding score! You are basically guaranteed a seat in CS, AI, or Cyber! Time to get ready for 8 AM labs!"
  } else if (aggregate >= 72) {
    feedback = "Great aggregate! Excellent chances for Chemical, Electronics, Metallurgy, or CS 2nd list!"
  } else if (aggregate >= 60) {
    feedback = "Solid! You qualify for Petroleum, Industrial, Energy, or Civil Engineering. Keep an eye on subsequent merit lists!"
  } else {
    feedback = "Borderline. Make sure to check open merit reserved quotas and stay updated with late lists!"
  }

  return (
    <div className={styles.calculatorCard}>
      <div className={styles.calcHeader}>
        <h2 className={styles.calcTitle}>
          <Calculator size={24} style={{ color: '#1A98D5' }} /> DUET Merit Aggregate Calculator
        </h2>
        <span className={styles.calcTag}>Formula: 60% Test + 30% Inter + 10% Matric</span>
      </div>

      <div className={styles.calcGrid}>
        <div className={styles.calcInputGroup}>
          <label className={styles.calcLabel}>
            <span>Matric Marks</span>
            <span style={{ color: 'var(--text-muted)' }}>out of 1100</span>
          </label>
          <input 
            type="number" 
            className={styles.calcInput} 
            value={matric} 
            onChange={e => setMatric(e.target.value)}
            placeholder="e.g. 950" 
          />
        </div>

        <div className={styles.calcInputGroup}>
          <label className={styles.calcLabel}>
            <span>Intermediate Marks</span>
            <span style={{ color: 'var(--text-muted)' }}>out of 1100</span>
          </label>
          <input 
            type="number" 
            className={styles.calcInput} 
            value={inter} 
            onChange={e => setInter(e.target.value)}
            placeholder="e.g. 850" 
          />
        </div>

        <div className={styles.calcInputGroup}>
          <label className={styles.calcLabel}>
            <span>Entry Test Score</span>
            <span style={{ color: 'var(--text-muted)' }}>out of 100</span>
          </label>
          <input 
            type="number" 
            className={styles.calcInput} 
            value={testScore} 
            onChange={e => setTestScore(e.target.value)}
            placeholder="e.g. 72" 
          />
        </div>
      </div>

      <div className={styles.calcResultBox}>
        <div>
          <p style={{ fontSize: '12px', opacity: 0.85, margin: 0, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Calculated Merit Aggregate</p>
          <h3 className={styles.calcScoreText}>{aggregate}%</h3>
        </div>
        <p className={styles.calcFeedback}>{feedback}</p>
      </div>
    </div>
  )
}

function FaqItem({ q, a }) {
  const [open, setOpen] = useState(false)
  return (
    <div className={`${styles.faqItem} ${open ? styles.faqOpen : ''}`} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '14px', marginBottom: '10px', overflow: 'hidden' }}>
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

export default function AdmissionsPage() {
  const [previewFile, setPreviewFile] = useState(null)

  return (
    <div className="page">
      {/* Hero Banner */}
      <div 
        className={styles.heroBanner}
        style={{ backgroundImage: `url("/main campus main gate image by Faheem Bozdar.png")` }}
      >
        <div className={styles.heroOverlay} />
        <div className={styles.heroContent}>
          <p className={styles.heroTagline}>DAWOODIAN ADMISSIONS 2026 SURVIVAL GUIDE</p>
          <h1 className={styles.heroTitle}>GETTING INTO DUET</h1>
          <p className={styles.heroDescription}>
            Everything you need to secure your seat without losing your sanity — merit formulas, entry test patterns, campus photo tours, document checklists, and past merit archives.
          </p>
        </div>
        <span className={styles.heroCreditBadge}>
          <Camera size={12} /> Image by Faheem Bozdar
        </span>
      </div>

      {/* Interactive Aggregate Calculator */}
      <MeritCalculator />

      {/* Campus Showcase Section */}
      <div style={{ marginBottom: '3.5rem' }}>
        <p className="section-label">DUET Campuses &amp; Academic Hubs</p>
        <h2 style={{ fontSize: '28px', fontWeight: 800, fontFamily: 'var(--font-sans)', margin: '0 0 1.5rem 0' }}>Explore Our 3 University Campuses</h2>
        
        <div className={styles.campusGrid}>
          {CAMPUSES.map((campus, idx) => (
            <div key={idx} className={styles.campusCard}>
              <div className={styles.campusImgWrap}>
                <img src={campus.image} alt={campus.name} className={styles.campusImg} />
                <span className={styles.campusCreditBadge}>
                  <Camera size={11} /> Image by {campus.credit}
                </span>
              </div>
              <div className={styles.campusBody}>
                <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--accent)', background: 'var(--accent-light)', padding: '3px 10px', borderRadius: '99px', alignSelf: 'flex-start' }}>
                  {campus.tag}
                </span>
                <h3 className={styles.campusName}>{campus.name}</h3>
                <p className={styles.campusLocation}>
                  <MapPin size={13} style={{ color: 'var(--accent)' }} /> {campus.location}
                </p>
                <p className={styles.campusFocus}>{campus.focus}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 6-Step Admission Journey Roadmap */}
      <div style={{ marginBottom: '3.5rem' }}>
        <p className="section-label">Interactive Student Roadmap</p>
        <h2 style={{ fontSize: '28px', fontWeight: 800, fontFamily: 'var(--font-sans)', margin: '0 0 1.5rem 0' }}>The 6-Step DUET Admission Roadmap</h2>
        
        <div className={styles.roadmapContainer}>
          <div className={styles.roadmapLine} />
          {APPLICATION_STEPS.map(step => (
            <div key={step.step} className={styles.roadmapStep}>
              <div className={styles.roadmapBadge}>
                {step.icon}
                <span className={styles.roadmapStepNum}>{step.step}</span>
              </div>
              <div className={styles.roadmapCard}>
                <div className={styles.roadmapCardHeader}>
                  <h3 className={styles.roadmapTitle}>{step.title}</h3>
                </div>
                <p className={styles.roadmapDetail}>{step.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Required Documents Checklist */}
      <div style={{ marginBottom: '3.5rem' }}>
        <p className="section-label">Document Checklist</p>
        <h2 style={{ fontSize: '28px', fontWeight: 800, fontFamily: 'var(--font-sans)', margin: '0 0 1.5rem 0' }}>Documents Needed Before Form Deadline</h2>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem' }}>
          {DOCS_REQUIRED.map((doc, i) => (
            <div key={i} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '14px', padding: '1.25rem', display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
              <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: 'var(--accent-light)', color: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                {doc.icon}
              </div>
              <div>
                <p style={{ fontSize: '14px', fontWeight: 700, margin: '0 0 4px 0', color: 'var(--text-primary)', fontFamily: 'var(--font-ui)' }}>{doc.name}</p>
                <p style={{ fontSize: '12px', color: 'var(--text-muted)', margin: 0, fontFamily: 'var(--font-ui)' }}>{doc.note}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Downloadable Merit Archives & Sample Papers */}
      <div style={{ marginBottom: '3.5rem' }}>
        <p className="section-label">Official Archives &amp; Practice Materials</p>
        <h2 style={{ fontSize: '28px', fontWeight: 800, fontFamily: 'var(--font-sans)', margin: '0 0 1.5rem 0' }}>Download Merit Lists &amp; Entry Test Sample Papers</h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.25rem' }}>
          {/* Merit Lists Archive Card */}
          <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '18px', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: 'var(--accent-light)', color: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <FileText size={22} />
              </div>
              <div>
                <h3 style={{ fontSize: '16px', fontWeight: 800, margin: 0, fontFamily: 'var(--font-ui)' }}>{MERIT_LISTS.label}</h3>
                <p style={{ fontSize: '12px', color: 'var(--text-muted)', margin: '2px 0 0 0' }}>Official Merit Archives</p>
              </div>
            </div>
            <p style={{ fontSize: '13px', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.5 }}>
              View cut-off percentages and rank archives across Computer Science, Cyber, Chemical, Petroleum, Electronics &amp; Civil Engineering.
            </p>
            <a 
              href={`/browser/${encodeURIComponent(MERIT_LISTS.id)}`}
              className="btn btn-primary"
              style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '8px', textDecoration: 'none', padding: '10px 18px', fontSize: '13px', fontWeight: 700 }}
            >
              Browse Merit Lists <ArrowRight size={15} />
            </a>
          </div>

          {/* Sample Papers Card */}
          <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '18px', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: 'var(--accent-light)', color: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <BookOpen size={22} />
              </div>
              <div>
                <h3 style={{ fontSize: '16px', fontWeight: 800, margin: 0, fontFamily: 'var(--font-ui)' }}>{SAMPLE_PAPERS.label}</h3>
                <p style={{ fontSize: '12px', color: 'var(--text-muted)', margin: '2px 0 0 0' }}>Pre-Engineering &amp; Computer Science</p>
              </div>
            </div>
            <p style={{ fontSize: '13px', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.5 }}>
              Practice real entry test paper patterns, sample MCQs, and subject breakdowns for Physics, Chemistry, Maths &amp; English.
            </p>
            <a 
              href={`/browser/${encodeURIComponent(SAMPLE_PAPERS.id)}`}
              className="btn btn-primary"
              style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '8px', textDecoration: 'none', padding: '10px 18px', fontSize: '13px', fontWeight: 700 }}
            >
              Browse Sample Papers <ArrowRight size={15} />
            </a>
          </div>
        </div>
      </div>

      {/* Relatable Admissions FAQ */}
      <div style={{ marginBottom: '3.5rem' }}>
        <p className="section-label">Aspirant FAQs</p>
        <h2 style={{ fontSize: '28px', fontWeight: 800, fontFamily: 'var(--font-sans)', margin: '0 0 1.5rem 0' }}>Frequently Asked Questions</h2>
        {FAQS.map((faq, i) => (
          <FaqItem key={i} q={faq.q} a={faq.a} />
        ))}
      </div>

      {/* File Preview Modal */}
      {previewFile && (
        <FilePreviewModal
          file={previewFile}
          onClose={() => setPreviewFile(null)}
        />
      )}
    </div>
  )
}
