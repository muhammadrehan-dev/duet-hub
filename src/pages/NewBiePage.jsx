import { useState } from 'react'
import styles from './Newbiepage.module.css'

// ─── Data ─────────────────────────────────────────────────────────────────────

const QUICK_LINKS = [
  { label: 'DUET Website',       url: 'https://duet.edu.pk',                         icon: '🌐', note: 'Official site (when it\'s up)' },
  { label: 'Admissions Portal',  url: 'https://admissions.duet.edu.pk',              icon: '📋', note: 'Apply & track admission' },
  { label: 'QOBE Portal',        url: 'https://student.qualityobe.com/site/login',   icon: '🎓', note: 'Attendance, marks, courses — the one that matters' },
  { label: 'Azure Proxy',        url: 'https://portal-duet.msappproxy.net/',         icon: '☁️', note: 'Challan download. That\'s literally it.' },
]

const CONTACTS = [
  {
    name: 'M. Tameel Bhatti',
    role: 'Admission Helpline',
    contact: '0345 3656773',
    via: 'Call or WhatsApp',
    icon: '📞',
  },
  {
    name: 'IT Support',
    role: 'IT Department',
    contact: 'itsupport@duet.edu.pk',
    via: 'Email (and prayer)',
    icon: '💻',
  },
]

const FAQS = [
  {
    q: 'What email format will I get?',
    a: 'Batch-Dept-Roll@students.duet.edu.pk — e.g. 25F-CY-102@students.duet.edu.pk. It\'s a Microsoft Azure account. Guard it with your life. It unlocks a shocking amount of free stuff that you\'ll probably never fully use.',
  },
  {
    q: 'What is the minimum attendance to appear in exams?',
    a: 'Exactly 75%. And yes, 74.9% means you are OUT. No mercy, no negotiating, no sad face exceptions. The system is automated and does not care about your feelings. Two of my friends found this out the hard way. Don\'t be them. 😅',
  },
  {
    q: 'How do I pay the challan fee?',
    a: 'Download your challan from the Azure Proxy portal using your university Azure ID, then pay at the bank or online. Simple — just don\'t lose the challan and pretend you never got it. That doesn\'t work.',
  },
  {
    q: 'When are mids and finals?',
    a: 'Mids: 8 weeks after session starts. Finals: 8 weeks after mids. Mark your calendar on Day 1, not Day 55 when you\'re already panicking.',
  },
  {
    q: 'Is there a dress code?',
    a: 'No formal dress code. Casual is fine. Just don\'t show up looking like you\'re at a beach. Keep it decent and nobody will say anything.',
  },
  {
    q: 'What documents do I need to keep?',
    a: 'Matric, Intermediate, Domicile, CNIC/B-Form, passport photos. Keep soft copies EVERYWHERE. QOBE will ask for them, then ask again, then ask one more time just to see if you\'re paying attention.',
  },
  {
    q: 'Are DUET servers always up?',
    a: 'LOL. No. The servers go down more often than my motivation on a Monday morning. Bookmark QOBE and Azure direct links and don\'t route through the main site every single time.',
  },
  {
    q: 'Is there a fee waiver available?',
    a: 'Yes — 100% tuition fee waiver for 300 eligible students. Check the admissions portal immediately. This is a genuinely massive opportunity and somehow most people don\'t even know it exists.',
  },
  {
    q: 'What is the campus WiFi password?',
    a: 'The network name is "Student". The password is one of duet@1234, Duet@1234, or DUET@1234. Nobody actually knows which one is correct at any given time — just try all three until one works. The WiFi itself is impressively fast, especially in the library. A true gem of modern infrastructure. 🙏',
  },
  {
    q: 'Is there university transport?',
    a: 'Yes! DUET runs several buses across Karachi. Go to the transport office at the main campus, register your pickup point, and you\'re set. Much better than bribing a rickshaw driver every morning.',
  },
  {
    q: 'Is there a hostel?',
    a: 'No official hostel. You\'re on your own. Start hunting for a nearby room or apartment early because Karachi waits for no one and neither does your landlord.',
  },
  {
    q: 'When can I get an internship?',
    a: 'The university officially arranges internships in your final year. Before that, you\'re expected to find one yourself. The good news is DUET has connections with some genuinely top tier industry names. The bad news is you have to survive until final year first. Start applying early anyway — nobody is stopping you.',
  },
  {
    q: 'Is there a library and is it actually useful?',
    a: 'Yes there is a library and yes it is useful, especially if you need a quiet place to sit and look productive. The WiFi is also at its best in there, which is honestly reason enough to go.',
  },
]

const PERKS = [
  { icon: '📦', label: 'All Microsoft Apps', desc: 'Word, Excel, Teams, OneDrive — free with your uni ID' },
  { icon: '🐙', label: 'GitHub Pro', desc: 'Free with your .edu email — includes Copilot Pro' },
  { icon: '🤖', label: 'Copilot Pro', desc: 'Via GitHub Pro — includes access to Claude models' },
  { icon: '💎', label: 'Gemini Pro', desc: 'Sometimes available with university email (check Google)' },
  { icon: '☁️', label: 'Azure Credits', desc: 'Microsoft Azure student credits for cloud projects' },
]

const CLUBS = [
  { name: 'DLS',  full: 'Dawood Literary Society',      icon: '📚', color: 'purple' },
  { name: 'WLWJ', full: 'WLWJ Society (Cybersecurity)', icon: '🔐', color: 'red' },
  { name: 'ACM',  full: 'ACM Student Chapter',           icon: '⚙️', color: 'blue' },
  { name: 'IEEE', full: 'IEEE Dawood Student Branch',    icon: '⚡', color: 'yellow' },
]

const APPS = [
  { icon: '📦', label: 'MS Office Suite', desc: 'Word, Excel, PowerPoint — free with your uni ID. Use them for every assignment and pretend you didn\'t use AI to write it.' },
  { icon: '🤖', label: 'ChatGPT', desc: 'Your unofficial teaching assistant. Great for understanding concepts, debugging logic, and explaining why your code doesn\'t work at 2am.' },
  { icon: '🧠', label: 'Claude', desc: 'The other AI that actually reads your whole assignment brief before answering. Surprisingly useful for long form writing and structured thinking.' },
  { icon: '🖨️', label: 'Buy a Printer', desc: 'Not an app, but more important than any app. Printing assignments per semester will cost you more than your tuition fee. A home printer pays for itself by Week 3.' },
]

const PORTALS = [
  {
    name: 'Azure Proxy Portal',
    url: 'https://portal-duet.msappproxy.net/',
    icon: '☁️',
    purpose: 'Challan download only',
    login: 'Login with your university Azure ID & password',
    tip: 'This portal does ONE thing — download your challan. That\'s it. Don\'t stare at it waiting for more features.',
    color: 'blue',
  },
  {
    name: 'QOBE Portal',
    url: 'https://student.qualityobe.com/site/login',
    icon: '🎓',
    purpose: 'Attendance · Marks · Courses · Assignments · Documents',
    login: 'First login via Microsoft university account, then set a QOBE password',
    tip: 'Once you set your QOBE password, you can log in directly anywhere — great for library PCs when you\'re checking if you\'re still alive attendance-wise.',
    color: 'green',
  },
]

// ─── Stories ──────────────────────────────────────────────────────────────────

const STORIES = [
  {
    icon: '☁️',
    date: 'Day 1 — The Azure Incident',
    title: 'I locked myself out of my university account before the semester even started.',
    text: `Got my credentials. Logged in. Immediately changed the password to something clever. Immediately forgot what that was. Completely locked out of my own account in under 4 minutes.

So I go to the IT Department to reset it. They say: "Sure, we'll send a code to your Authenticator app." I say: "Great." The Authenticator says: "First, verify your identity via the code we sent to your Outlook." I open Outlook. Outlook says: "Enter the OTP showing on your Authenticator."

I stared at my phone for 30 seconds. The two apps were asking each other for verification codes like two security guards who both forgot their IDs. I had to physically walk to the IT office, explain the situation, and watch them also be confused for a few minutes before solving it.

Lesson: Set up your recovery email and phone number THE MOMENT you first log in. Before you do anything else. Before you even blink.`,
  },
  {
    icon: '📋',
    date: 'Week 2 The QOBE',
    title: 'I uploaded my documents. QOBE said "documents not uploaded." I uploaded again.',
    text: `QOBE has a talent for making you feel like nothing you do is real. I uploaded my Matric certificate. Portal said okay and after a few said portal forgot that i uploaded it and asked me to upload again .

Keep everything in a Google Drive folder: Matric, Intermediate, Domicile, CNIC, passport photos, and a spare soul. You'll need all of them at some point.`,
  },
  {
    icon: '📊',
    date: 'Mids Week  The Attendance Wake-Up Call',
    title: 'They checked their attendance right before mids. That was a mistake.',
    text: `There's a specific kind of panic that sets in when you open QOBE two days before midterms and realize you've been "casually skipping" one class a little too consistently.

The 75% rule isn't a suggestion. The system doesn't do rounding in your favour. It doesn't care that you were tired, or sick, or that the class was at 8am and that's basically still night. Two people in my batch sat out of finals because of this. Don't let that be you.

Check your attendance after every class (literally just once after each class) . Not every month. Every week. Make it a habit like checking your phone which you're already doing every 4 minutes anyway.`,
  },
  {
    icon: '🖨️',
    date: 'Month 1, The Print Shop Economy',
    title: 'I spent more on printing in one month than I did on actual food.',
    text: `Nobody prepares you for the sheer volume of things that need to be printed at a Pakistani university. Assignment coversheet. Lab file. Lab report. Attendance form. Challan. Another challan because you lost the first one.

I was running to the print shop every other day like it was a second campus. By the time I did the math, I realised a basic home printer would have paid for itself in six weeks.

Buy a printer. I don't care what anyone says. Buy a printer. This is the most practical advice on this entire page.`,
  },
  {
    icon: '🎓',
    date: 'Finals Week  The 75% Wake-Up Call',
    title: 'One student in my class took attendance lightly. He reappeared in summer.',
    text: `He wasn't the type to fail subjects. He understood the material fine just didn't understand that the portal doesn't care about that.

When finals came, he was barred. One person, but it was a very visible lesson for the rest of us. No warning, no negotiation, no appeal that went anywhere. The system blocked him automatically. He had to register for the summer repeat semester and sit the exams again while everyone else moved forward.

The 75% rule feels theoretical until it happens to someone you sit next to every day.

Check your attendance on QOBE every week. Treat 80% as your personal floor — that buffer is for actual sick days and real emergencies, not for "I'll skip just this once."`,
  },
  {
    icon: '🔐',
    date: 'Semester 1 , The Authenticator Incident',
    title: '10–15 students uninstalled the Authenticator app. Then needed it to log in.',
    text: `The setup process asks you to install Microsoft Authenticator. A surprising number of students treated this as optional and uninstalled it later to free up space or because it felt unnecessary.

Then came the day Azure required an OTP to log in. They reinstalled Authenticator. Authenticator said: "First set up via Outlook." They opened Outlook. Outlook said: "Enter the OTP from your Authenticator."

The loop was complete. Neither app would move first without the other.

Each of them had to go to the IT department individually to get their account manually recovered. IT handled it but it took time, trips, and a queue. The IT department sorted everyone out eventually, but it was entirely avoidable.

Install Authenticator Day 1. Never uninstall it. If you change phones, migrate it before wiping. It is not decorative it is your key to everything Microsoft.`,
  },
  {
    icon: '📶',
    date: 'Every Day The WiFi Reality',
    title: 'Campus WiFi: sometimes 200 Mbps, sometimes 500 Kbps. Plan accordingly.',
    text: `The student network is called "Student". Password is one of duet@1234, Duet@1234, or DUET@1234 try all three, nobody consistently knows which one is active.

Speed is genuinely unpredictable. Off-peak you can hit 40 Mbps comfortably, occasionally even 200 Mbps. During peak hours between classes, lunch break, exam season it can crawl to 1 Mbps or drop entirely.

The library PCs run on the same provider as the student network but tend to hold up slightly better during peak hours. In reality it's marginal — faculty WiFi might be 800 Kbps when student is at 500 Kbps, but if more people start connecting to that network too, it drops to 100 Kbps just as fast.

Honest advice: for anything that actually matters, use your brain insted of Wi-Fi , JK;) , must have a plan B like mobile data ready `,
  },
  {
    icon: '🤖',
    date: 'Semester 1 ,GitHub Student Pack & Copilot',
    title: 'I got Copilot Pro free. Built agents with it. One wiped my data. Would do again.',
    text: `Your university email qualifies you for the GitHub Student Developer Pack. This includes GitHub Copilot Pro and I mean actually useful, not the stripped-down version. I run it straight from the terminal.

I've built multiple agents that handle tasks for me. It's genuinely powerful once you figure out what you're doing.

One of them wiped my data during an early experiment. It said oops, let me restart from basics and then wiped the remaining data too. I did not have anything important on that machine, which is the only reason this is a funny story and not a tragedy.

Lesson: do not run unsupervised AI agents on your main machine. Use a VM, a spare drive, or something you genuinely don't mind losing. Get the Student Pack anyway it's one of the best things your .edu email unlocks.`,
  },
]

// ─── Sub-components ───────────────────────────────────────────────────────────

function FaqItem({ q, a }) {
  const [open, setOpen] = useState(false)
  return (
    <div className={`${styles.faqItem} ${open ? styles.faqOpen : ''}`}>
      <button className={styles.faqQ} onClick={() => setOpen(o => !o)}>
        <span>{q}</span>
        <span className={styles.faqChevron}>{open ? '▲' : '▼'}</span>
      </button>
      {open && <p className={styles.faqA}>{a}</p>}
    </div>
  )
}

function StoryItem({ story }) {
  const [open, setOpen] = useState(false)
  return (
    <div className={styles.storyItem} onClick={() => setOpen(o => !o)}>
      <div className={styles.storyItemHeader}>
        <span className={styles.storyItemDot}>{story.icon}</span>
        <div className={styles.storyItemMeta}>
          <p className={styles.storyItemDate}>{story.date}</p>
          <p className={styles.storyItemTitle}>{story.title}</p>
        </div>
        <span className={styles.storyChevron}>{open ? '▲' : '▼'}</span>
      </div>
      {open && (
        <div className={styles.storyItemBody}>
          {story.text.split('\n\n').map((para, i) => (
            <p key={i} className={styles.storyItemPara}>{para}</p>
          ))}
        </div>
      )}
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function NewbiePage() {
  return (
    <div className="page">

      {/* Hero */}
      <div className="hero">
        <p className="hero-label">You just got admitted. Congratulations. Now read this.</p>
        <h1 className="hero-title">Welcome to DUET.<br />Try not to panic.</h1>
        <p className="hero-sub">
          Everything a newbie needs — portals, emails, rules, perks, and the stuff nobody tells
          you until it costs you. Written by a student who learned most of this the hard way,
          so you don't have to.
        </p>
      </div>

      {/* ── Stories from the field ── */}
      <p className="section-label">Things That Happened to Me So They Don't Happen to You</p>
      <div className={styles.storyCard}>
        <p className={styles.storyIntro}>
          Real events. Real mistakes. Mildly traumatic. Fully preventable.<br />
          Click any story to read it — consider it free tuition.
        </p>
        <div className={styles.storyTimeline}>
          {STORIES.map((s, i) => (
            <StoryItem key={i} story={s} />
          ))}
        </div>
      </div>

      {/* FAQs */}
      <p className="section-label" style={{ marginTop: '3rem' }}>FAQs — Read These First</p>
      <div className={styles.faqList}>
        {FAQS.map(f => <FaqItem key={f.q} q={f.q} a={f.a} />)}
      </div>

      {/* Azure Email Setup */}
      <p className="section-label" style={{ marginTop: '3rem' }}>Your University Email (Handle With Care)</p>
      <div className={styles.emailCard}>
        <div className={styles.emailFormat}>
          <p className={styles.emailFormatLabel}>Your email format</p>
          <p className={styles.emailFormatValue}>YY[Semester]-[Dept]-[Roll]@students.duet.edu.pk</p>
          <p className={styles.emailFormatExample}>e.g. 25F-CY-102@students.duet.edu.pk</p>
        </div>
        <div className={styles.emailSteps}>
          <p className={styles.emailStepsTitle}>First login checklist — in this exact order, or you'll regret it:</p>
          <ul className={styles.emailStepsList}>
            <li>You'll get a <strong>temporary password</strong> from your class advisor.</li>
            <li>Do your first login on a <strong>PC</strong>, not your phone. Trust the process.</li>
            <li>Change your password and <strong>set up Microsoft Authenticator</strong> immediately.</li>
            <li>Add a <strong>recovery email &amp; phone number</strong>. If you skip this and lock yourself out, you'll be physically walking to the IT Department to break the authentication deadlock between Outlook and Authenticator, both demanding codes from each other like two confused bouncers. I know this because I did exactly that. On Day 1. 😬</li>
          </ul>
        </div>
      </div>

      {/* Portals */}
      <p className="section-label" style={{ marginTop: '3rem' }}>The Two Portals (Know Them)</p>
      <div className={styles.portalsGrid}>
        {PORTALS.map(p => (
          <div key={p.name} className={`${styles.portalCard} ${styles[`portal_${p.color}`]}`}>
            <div className={styles.portalTop}>
              <span className={styles.portalIcon}>{p.icon}</span>
              <div>
                <p className={styles.portalName}>{p.name}</p>
                <p className={styles.portalPurpose}>{p.purpose}</p>
              </div>
            </div>
            <p className={styles.portalLogin}>🔑 {p.login}</p>
            <div className={styles.portalTip}>
              <span className={styles.portalTipIcon}>💡</span>
              <p>{p.tip}</p>
            </div>
            <a href={p.url} target="_blank" rel="noreferrer" className={styles.portalBtn}>
              Open Portal →
            </a>
          </div>
        ))}
      </div>

      {/* QOBE warning */}
      <div className={styles.qobeWarning}>
        <span className={styles.qobeWarningIcon}>📂</span>
        <div>
          <p className={styles.qobeWarningTitle}>Keep your documents uploaded on QOBE</p>
          <p className={styles.qobeWarningText}>
            QOBE will ask for your documents, and may ask again later just to keep you on your toes.
            If you don't upload them, your portal gets blocked. You'll usually get 2–3 days notice.
            Keep soft copies of everything (Matric, Intermediate, Domicile, CNIC) in a Google Drive
            folder and thank yourself later.
          </p>
        </div>
      </div>

      {/* Attendance warning */}
      <p className="section-label" style={{ marginTop: '3rem' }}>The 75% Rule (Non-Negotiable)</p>
      <div className={styles.attendanceCard}>
        <div className={styles.attendanceVisual}>
          <div className={styles.attendanceDanger}>
            <span className={styles.attendancePct}>74.9%</span>
            <span className={styles.attendanceVerdict}>❌ Barred</span>
          </div>
          <div className={styles.attendanceDivider}>vs</div>
          <div className={styles.attendanceSafe}>
            <span className={styles.attendancePct}>75.0%</span>
            <span className={styles.attendanceVerdict}>✅ You're in</span>
          </div>
        </div>
        <p className={styles.attendanceText}>
          The system is automated and has no empathy whatsoever. It will block you at 74.9%
          without blinking. Two students in my batch got stopped from appearing in finals over this.
          Attend your classes. No, seriously. 🙏
        </p>
      </div>

      {/* Perks */}
      <p className="section-label" style={{ marginTop: '3rem' }}>Free Stuff With Your Uni ID 🎁</p>
      <div className={styles.perksGrid}>
        {PERKS.map(p => (
          <div key={p.label} className={styles.perkCard}>
            <span className={styles.perkIcon}>{p.icon}</span>
            <p className={styles.perkLabel}>{p.label}</p>
            <p className={styles.perkDesc}>{p.desc}</p>
          </div>
        ))}
      </div>
      <p className={styles.perksNote}>
        This list will grow. A .edu email is genuinely powerful, more than most students realize. Use it before you graduate and lose it forever.
      </p>

      {/* Clubs */}
      <p className="section-label" style={{ marginTop: '3rem' }}>Student Societies</p>
      <div className={styles.clubsGrid}>
        {CLUBS.map(c => (
          <div key={c.name} className={`${styles.clubCard} ${styles[`club_${c.color}`]}`}>
            <span className={styles.clubIcon}>{c.icon}</span>
            <p className={styles.clubName}>{c.name}</p>
            <p className={styles.clubFull}>{c.full}</p>
          </div>
        ))}
      </div>
      <div className={styles.clubsNote}>
        <span>🌟</span>
        <p>
          Join a society. Seriously. The people, events, and chaos will make university actually
          worth remembering. Studying alone in your room every day is a valid choice — it's just
          a boring one you'll regret.
          <strong> From personal experience: say yes to things.</strong>
        </p>
      </div>

      {/* Campuses */}
      <p className="section-label" style={{ marginTop: '3rem' }}>Campuses in Karachi</p>
      <div className={styles.campusesGrid}>
        <div className={styles.campusCard}>
          <span className={styles.campusIcon}>🏛️</span>
          <p className={styles.campusName}>Engineering Campus</p>
          <p className={styles.campusDesc}>Main campus · Engineering departments</p>
        </div>
        <div className={styles.campusCard}>
          <span className={styles.campusIcon}>💡</span>
          <p className={styles.campusName}>IC&amp;S Campus</p>
          <p className={styles.campusDesc}>CS · AI · Cybersecurity · Data Science</p>
        </div>
      </div>

      {/* Fee Waiver */}
      <p className="section-label" style={{ marginTop: '3rem' }}>100% Tuition Fee Waiver</p>
      <div className={styles.waiverCard}>
        <div className={styles.waiverBadge}>💰 Big Opportunity</div>
        <p className={styles.waiverText}>
          DUET offers a <strong>100% tuition fee waiver</strong> to 300 students who meet
          the eligibility requirements. Most people don't even know this exists.
          Check the admissions portal the moment you're admitted and apply if you qualify.
          Don't sleep on free money.
        </p>
        <a href="https://admissions.duet.edu.pk" target="_blank" rel="noreferrer" className={styles.waiverBtn}>
          Check Admissions Portal →
        </a>
      </div>

      {/* Recommended Apps */}
      <p className="section-label" style={{ marginTop: '3rem' }}>Recommended Apps &amp; Tools 🛠️</p>
      <div className={styles.perksGrid}>
        {APPS.map(a => (
          <div key={a.label} className={styles.perkCard}>
            <span className={styles.perkIcon}>{a.icon}</span>
            <p className={styles.perkLabel}>{a.label}</p>
            <p className={styles.perkDesc}>{a.desc}</p>
          </div>
        ))}
      </div>

      {/* Final tip */}
      <div className={styles.finalTip}>
        <p className={styles.finalTipTitle}>One last thing 👋</p>
        <p className={styles.finalTipText}>
          University goes fast, embarrassingly fast. Don't spend four years just chasing
          grades and going home. Explore, break things, join stuff, make friends, attend events,
          and enjoy the mess. You're in Karachi, studying at DUET, with access to cool technology
          and actual interesting people. Make it count.
        </p>
        <p className={styles.finalTipSig}>— Muhammad Rehan (CH4_EZIO), Batch 25F</p>
      </div>

    </div>
  )
}