import { useState } from 'react'
import { MERIT_LISTS, SAMPLE_PAPERS } from '@/data/config'
import styles from './AdmissionsPage.module.css'



const TEST_PATTERN_2026 = {
  compulsory: [
    { label: 'English', questions: 25, icon: '📖' },
    { label: 'Analytical Reasoning', questions: 10, icon: '🧠' },
    { label: 'General Knowledge', questions: 15, icon: '🌍' },
  ],
  optional: [
    {
      group: 'Pre-Engineering / Pre-Medical (with Addl Maths)',
      subjects: [
        { label: 'Physics', q: 20 },
        { label: 'Chemistry', q: 10 },
        { label: 'Maths', q: 20 },
      ]
    },
    {
      group: 'Computer Science / General Science',
      subjects: [
        { label: 'Physics / Statistics', q: 20 },
        { label: 'Math', q: 10 },
        { label: 'Computer', q: 20 },
      ]
    },
    {
      group: 'Pre-Medical',
      subjects: [
        { label: 'Physics', q: 20 },
        { label: 'Chemistry', q: 10 },
        { label: 'Biology', q: 20 },
      ]
    },
    {
      group: 'Commerce',
      subjects: [
        { label: 'Business Math', q: 20 },
        { label: 'Economics', q: 10 },
        { label: 'Accounting', q: 20 },
      ]
    },
    {
      group: 'Arts',
      subjects: [
        { label: 'English Comprehension', q: 25 },
        { label: 'General Math', q: 25 },
      ]
    },
  ]
}

const MERIT_FORMULA = [
  { label: 'Entry Test Score', weight: 60, color: 'blue' },
  { label: 'Intermediate Marks', weight: 30, color: 'green' },
  { label: 'Matric Marks', weight: 10, color: 'amber' },
]

const MERIT_DEDUCTION = [
  { year: '1 Year Gap', deduction: '10% deduction from Intermediate marks' },
  { year: '2+ Year Gap', deduction: '20% deduction from Intermediate marks' },
]

const APPLICATION_STEPS = [
  {
    title: 'Account Registration',
    detail: 'Register at admission.duet.edu.pk. Use exact name spellings as per your Matric certificate. Provide a valid email to receive your password.',
    icon: '👤'
  },
  {
    title: 'Photo Upload',
    detail: 'Upload a recent (last 6 months) passport photo with a blue background. Testing agencies may disallow entry if the photo does not match.',
    icon: '📸'
  },
  {
    title: 'Fee Payment',
    detail: 'Pay at any selected bank branch. Allied Bank users can pay via App (Educational Payments). 1Bill is also available via your banking app.',
    icon: '💳'
  },
  {
    title: 'Verification Check',
    detail: 'Log in within 3 days of payment to confirm photo verification. If unverified, re-upload a compliant photo immediately.',
    icon: '✅'
  },
  {
    title: 'Admit Card',
    detail: 'Download your admit card once the deadline passes. Print it and bring it to the campus. Venue and schedule will be printed on the card.',
    icon: '🎟️'
  }
]

const CAMPUSES = [
  {
    name: 'Jinnah Campus (Main)',
    location: 'New M.A. Jinnah Road, Karachi',
    focus: 'Engineering, Architecture & Applied Sciences',
    icon: '🏛️'
  },
  {
    name: 'Gulberg Town Campus',
    location: 'Dastagir Block 9, Federal B Area, Karachi',
    focus: 'Computing Sciences (CS, AI, Cyber, Data Science)',
    icon: '💡'
  },
  {
    name: 'Rohri-Sukkur Campus (CEMENT)',
    location: 'NH 5, Rohri, Sukkur',
    focus: 'Computing & Management Programs',
    icon: '🌉'
  }
]

const TIMELINE = [
  {
    icon: '📢',
    period: 'April to May',
    event: 'Admissions Open',
    detail: 'DUET officially announces undergraduate admissions. Watch the official website and your school notice boards. The window is typically 3 to 4 weeks and closes without warning.',
  },
  {
    icon: '📝',
    period: 'May to June',
    event: 'Online Application Submission',
    detail: 'Fill the form on admissions.duet.edu.pk. Upload scanned documents. Pay the application challan at any branch of the designated bank. Triple-check your matric and intermediate marks before submitting.',
  },
  {
    icon: '🎟️',
    period: 'June',
    event: 'Admit Card Download',
    detail: 'Download your roll number slip from the admissions portal. Print it. Bring it to the test centre. A phone screenshot is a backup only. The physical copy is what they check.',
  },
  {
    icon: '✏️',
    period: 'June to July',
    event: 'Entry Test at DUET Campus',
    detail: 'MCQ paper held on campus. 100 questions in 90 minutes. Bring your admit card and original CNIC or B-Form. No original documents means no entry. No exceptions whatsoever.',
  },
  {
    icon: '📋',
    period: 'July',
    event: 'Merit List Published',
    detail: 'Results are displayed on the admissions portal. Multiple merit lists are released as seats are filled. Keep checking. Students who miss their enrollment window free up seats that go to the next batch on the list.',
  },
  {
    icon: '✅',
    period: 'July to August',
    event: 'Fee Deposit and Enrollment',
    detail: 'If your name appears on the merit list, deposit the admission fee within the given deadline. Missing this by even one day cancels your seat. Treat this deadline exactly like an exam.',
  },
  {
    icon: '🎓',
    period: 'August to September',
    event: 'Orientation and Classes Begin',
    detail: 'Attend orientation. It covers things you actually need to know. Collect your university ID. Set up your Azure email on Day 1 and do not skip the Microsoft Authenticator setup.',
  },
]

const DOCS_REQUIRED = [
  { icon: '📄', name: 'Matric Certificate and DMC',         note: 'Original plus 2 attested copies' },
  { icon: '📄', name: 'Intermediate Certificate and DMC',   note: 'Original plus 2 attested copies' },
  { icon: '🆔', name: 'CNIC or B-Form',                     note: 'Original plus 2 attested copies' },
  { icon: '🏠', name: 'Domicile Certificate',               note: 'Karachi or Sindh domicile required' },
  { icon: '📸', name: 'Passport Photos',                    note: '4 to 6 recent photos on white or blue background' },
  { icon: '📋', name: 'Character Certificate',              note: 'Issued by your previous institution' },
  { icon: '💾', name: 'Scanned copies of everything above', note: 'Keep in Google Drive. QOBE will ask for them more than once.' },
]

const TIPS = [
  {
    icon: '📅',
    title: 'Apply on Day 1',
    body: 'The portal opens for a limited time only. The moment admissions go live, submit your application. Late submissions are not accepted for any reason.',
  },
  {
    icon: '📖',
    title: 'Your Syllabus Is FSc, Not School',
    body: 'The entry test covers FSc Part 1 and Part 2 content. If you have not opened those books since exams, open them now. The test is not matric level.',
  },
  {
    icon: '⏱️',
    title: 'Practice Under Time Pressure',
    body: '100 questions in 90 minutes is 54 seconds per question. Speed is half the battle. Solve timed MCQ sets regularly, not casually.',
  },
  {
    icon: '🗂️',
    title: 'Get Documents Attested Early',
    body: 'Attestation from a Gazetted Officer takes time. There are queues. Get everything attested before the portal even opens so you are not scrambling on the last day.',
  },
  {
    icon: '🎯',
    title: 'Rank Your Departments Carefully',
    body: 'You choose departments in order of preference during application. Your first choice is processed first. Put what you actually want at the top. You cannot change this after submitting.',
  },
  {
    icon: '💰',
    title: 'Apply for the Fee Waiver',
    body: 'DUET offers a full 100% tuition fee waiver to around 300 eligible students. Almost nobody applies for it. It takes a few minutes. Do it the same day you submit your application.',
  },
]

const FAQS = [
  {
    q: 'What is the minimum FSc percentage required to apply?',
    a: 'The official minimum is 60% in FSc or equivalent. In reality, for competitive departments like CS and AI, the final merit cut-off is usually between 75% and 90% depending on the year. 60% qualifies you to apply, not necessarily to get in. Download the past merit lists on this page and check the actual cut-offs for each department.',
  },
  {
    q: 'Is ICS with Physics and Maths accepted for CS, AI, Cybersecurity and Data Science?',
    a: 'Yes. For all four IC&S Campus programs, ICS with Physics and Mathematics is accepted as equivalent to FSc Pre-Engineering. Both qualify.',
  },
  {
    q: 'How is merit calculated?',
    a: 'Merit is a weighted combination of three scores: 60% from your entry test result, 30% from your intermediate marks, and 10% from your matric marks. A strong entry test performance can lift a moderate academic percentage. Neither alone is enough.',
  },
  {
    q: 'Is there negative marking in the entry test?',
    a: 'No. There is no negative marking. Attempt every single question. Leaving anything blank is a guaranteed zero on that question. Guess intelligently if you are unsure.',
  },
  {
    q: 'How many questions are in each section of the test?',
    a: 'The test has 100 MCQs in total across three sections. Approximately 40 questions from Mathematics, 30 from Physics, and 30 from English and IQ or reasoning. Total time is 90 minutes.',
  },
  {
    q: 'Where can I find past papers for the DUET entry test?',
    a: 'DUET does not officially publish past papers. Community-sourced papers circulate on Facebook groups (search DUET Admissions followed by the year) and on Telegram (search DUET Entry Test). Your actual preparation base should be FSc Part 1 and Part 2 textbooks. Any past paper you find is practice under format, not a shortcut.',
  },
  {
    q: 'Can I apply to multiple departments?',
    a: 'Yes. During the application you rank departments by preference. If your merit qualifies for your first choice you get it. If not, it moves to your second choice, then third. Rank honestly in order of what you actually want.',
  },
  {
    q: 'Is there a fee waiver available?',
    a: 'Yes. DUET offers a 100% tuition fee waiver to approximately 300 eligible students per intake. Most people who qualify never apply for it because they do not know it exists. Apply for it on the same day you submit your admission form.',
  },
  {
    q: 'What happens if I miss the fee deposit deadline after being selected?',
    a: 'Your seat is cancelled automatically. No grace period. No extension. No negotiation. The next student on the merit list takes your seat immediately. Treat the fee deadline the same way you would treat an exam date.',
  },
  {
    q: 'Is there an age limit for applying?',
    a: 'No official age limit is enforced. Students with a gap year or those reapplying are still eligible. Just ensure all documents are current and in order.',
  },
  {
    q: 'Can students from other provinces apply?',
    a: 'DUET is a Sindh province university and Sindh domicile is the standard requirement. Students from other provinces should check the official admissions notification each year as the rules around open merit and reserved seats can change.',
  },
]

const ELIGIBILITY_GROUPS = [
  {
    title: 'Engineering Programs',
    minMarks: '60%',
    ageLimit: '22 Years',
    groups: [
      'Pre-Engineering (Physics, Chemistry, Maths)',
      'Pre-Medical (with Additional Mathematics)',
      'General Science (Physics, Maths, CS)'
    ],
    note: 'For General Science, Chemistry is required as a remedial subject (except for Computer/Electronic/Telecom Engg).',
    color: 'blue'
  },
  {
    title: 'Sciences & B.Arch',
    minMarks: '50%',
    ageLimit: '25 Years (BS) / 22 Years (B.Arch)',
    groups: [
      'Pre-Engineering',
      'Pre-Medical with Additional Mathematics',
      'Pre-Medical (BS only, zero-credit Addl. Maths required in 1st year)',
      'Computer Science (Maths, Physics, CS/Stats)'
    ],
    color: 'purple'
  },
  {
    title: 'Management & Technology',
    minMarks: '50% (HSC) / 60% (DAE)',
    ageLimit: '25 Years',
    groups: [
      'Pre-Engineering / Pre-Medical',
      'Computer Science / General Science',
      'Arts / Commerce',
      'DAE (Relevant technologies)',
      'Added: BS Business Information System'
    ],
    color: 'green'
  },
  {
    title: 'Material Science',
    minMarks: '50% (HSC) / 60% (DAE)',
    ageLimit: '25 Years',
    groups: [
      'Pre-Engineering / Pre-Medical (with Addl. Maths)',
      'Computer Science',
      'DAE (Relevant technologies)'
    ],
    color: 'amber'
  }
]

const DAE_MAPPING = [
  { tech: 'Electronics Engineering', fields: 'Automation, Avionics, Bio-Medical, Electrical, Electronics, Instrumentation, Mechatronics, Radar, Radio, Telecommunication' },
  { tech: 'Chemical / Petroleum & Gas', fields: 'Chemical, Chemical Processing, Footwear, Glass, Ceramics, Leather, Petro Chemical, Petroleum' },
  { tech: 'Industrial & Manufacturing', fields: 'Auto & Diesel, Automation, Cast Metal & Foundry, Mechanical, Production, Mechatronics, Vacuum' },
  { tech: 'Computer / Software / System', fields: 'Automation, Computer, IT, Electrical, Electronics, Instrumentation, Radar, Radio, Software, Telecommunication' },
  { tech: 'Architecture', fields: 'Architecture, Civil' },
]

const INELIGIBILITY = [
  'Conviction by a court of law for an offense involving moral turpitude.',
  'Failure to obtain IBCC equivalence certificate before the interview.',
  'Applying for DAE reserved seats in a non-specified technology.',
  'Found with tempered certificates (legal action will be taken).',
  'Already holding admission elsewhere without a cancellation certificate.'
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

function TimelineItem({ item, index }) {
  const [open, setOpen] = useState(false)
  return (
    <div className={styles.timelineItem} onClick={() => setOpen(o => !o)}>
      <div className={styles.timelineLeft}>
        <div className={styles.timelineDot}>{item.icon}</div>
        {index < TIMELINE.length - 1 && <div className={styles.timelineLine} />}
      </div>
      <div className={styles.timelineContent}>
        <p className={styles.timelinePeriod}>{item.period}</p>
        <p className={styles.timelineEvent}>{item.event}</p>
        {open && <p className={styles.timelineDetail}>{item.detail}</p>}
        <button className={styles.timelineToggle}>{open ? 'Show less ▲' : 'Details ▼'}</button>
      </div>
    </div>
  )
}

function ProgramEligibilityCard({ group }) {
  return (
    <div className={`${styles.programCard} ${styles[`prog_${group.color}`]}`}>
      <div className={styles.programTop}>
        <span className={styles.programIcon}>🎓</span>
        <div>
          <p className={styles.programDept}>{group.title}</p>
          <div className={styles.programMeta}>
            <span className={styles.programMinBadge}>Min {group.minMarks}</span>
            <span className={styles.programSeatsBadge}>Age: {group.ageLimit}</span>
          </div>
        </div>
      </div>
      <div className={styles.programEligibility}>
        <strong>Eligible Groups:</strong>
        <ul style={{ paddingLeft: '1.2rem', marginTop: '0.4rem', marginBottom: '0.4rem' }}>
          {group.groups.map(g => <li key={g}>{g}</li>)}
        </ul>
        {group.note && <p style={{ fontSize: '11px', fontStyle: 'italic', color: 'var(--text-muted)' }}>{group.note}</p>}
      </div>
    </div>
  )
}


// ─── Page ─────────────────────────────────────────────────────────────────────

export default function AdmissionsPage({ setPage }) {
  return (
    <div className="page">

      {/* Hero */}
      <div className="hero">
        <p className="hero-label">Admission 2026 Guide • Updated Merit Policies</p>
        <h1 className="hero-title">Getting Into DUET.<br />The Official 2026 Roadmap.</h1>
        <p className="hero-sub">
          Eligibility, revised entry test breakdown, merit formula, campus locations, 
          step-by-step application guide and results-awaiting policy. Everything updated for Batch 26F.
        </p>
      </div>

      {/* Application Guide */}
      <p className="section-label" style={{ marginTop: '2rem' }}>Step-by-Step Application Guide</p>
      <div className={styles.tipsGrid}>
        {APPLICATION_STEPS.map((s, i) => (
          <div key={i} className={styles.tipCard}>
            <span className={styles.tipIcon}>{s.icon}</span>
            <p className={styles.tipTitle}>Step {i + 1}: {s.title}</p>
            <p className={styles.tipBody}>{s.detail}</p>
          </div>
        ))}
      </div>

      {/* Campus Locations */}
      <p className="section-label" style={{ marginTop: '3rem' }}>DUET Campuses & Locations</p>
      <div className={styles.docsGrid}>
        {CAMPUSES.map(c => (
          <div key={c.name} className={styles.docCard}>
            <span className={styles.docIcon}>{c.icon}</span>
            <div>
              <p className={styles.docName}>{c.name}</p>
              <p className={styles.docNote}>{c.location}</p>
              <p style={{ fontSize: '11px', marginTop: '4px', color: 'var(--accent)' }}>{c.focus}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Last Year Admission Analysis */}
      <p className="section-label" style={{ marginTop: '2rem' }}>Full Admission Analysis (Batch 25F · 4th List)</p>
      <div className={styles.analysisCard}>
        <p className={styles.analysisIntro}>
          We analyzed all 75 pages of the 4th merit list to bring you the most accurate competition data. 
          Use these CPNs as a baseline for your preparation.
        </p>

        <div className={styles.analysisTableWrapper}>
          <table className={styles.analysisTable}>
            <thead>
              <tr>
                <th>Department</th>
                <th>Highest CPN</th>
                <th>Closing CPN</th>
                <th>Allotted*</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>BS Computer Science</td><td>83.49</td><td>68.55</td><td>210+</td></tr>
              <tr><td>BS Artificial Intelligence</td><td>81.26</td><td>64.32</td><td>120+</td></tr>
              <tr><td>BE Computer System</td><td>80.50</td><td>65.44</td><td>75+</td></tr>
              <tr><td>BS Cyber Security</td><td>80.03</td><td>61.23</td><td>90+</td></tr>
              <tr><td>BE Electronics</td><td>76.39</td><td>59.88</td><td>80+</td></tr>
              <tr><td>BS Data Science</td><td>76.67</td><td>60.03</td><td>85+</td></tr>
              <tr><td>BE Chemical</td><td>74.80</td><td>56.08</td><td>60+</td></tr>
              <tr><td>BE Petroleum & Gas</td><td>70.50</td><td>54.14</td><td>45+</td></tr>
              <tr><td>BS Information Security</td><td>73.22</td><td>53.21</td><td>40+</td></tr>
              <tr><td>Bachelor of Architecture</td><td>77.26</td><td>51.68</td><td>35+</td></tr>
              <tr><td>BS Management & Tech</td><td>73.03</td><td>51.16</td><td>55+</td></tr>
              <tr><td>BE Industrial & Management</td><td>74.84</td><td>55.42</td><td>40+</td></tr>
              <tr><td>BS Environmental Science</td><td>73.79</td><td>51.47</td><td>30+</td></tr>
              <tr><td>BS Chemistry</td><td>59.49</td><td>51.34</td><td>25+</td></tr>
              <tr><td>BE Materials Eng.</td><td>60.71</td><td>51.97</td><td>20+</td></tr>
              <tr><td>BE Energy & Enviro</td><td>68.97</td><td>51.85</td><td>25+</td></tr>
              <tr><td>BS Material Science</td><td>60.06</td><td>52.12</td><td>15+</td></tr>
              <tr><td>BS Industrial Management</td><td>78.87</td><td>51.16</td><td>30+</td></tr>
              <tr><td style={{ color: 'var(--text-muted)' }}>BE Telecommunication</td><td colSpan="3" style={{ fontSize: '11px', textAlign: 'center' }}>Discontinued from Fall-2025 onwards</td></tr>
              <tr><td style={{ color: 'var(--accent)' }}>BS Business Information System</td><td colSpan="3" style={{ fontSize: '11px', textAlign: 'center' }}>New Program for 2026 Intake</td></tr>
            </tbody>
          </table>
        </div>

        <div className={styles.analysisFooter}>
          <p>* "Allotted" refers to candidates placed in this specific 4th list. Total seats per dept are higher (~150-170 for CS/AI).</p>
        </div>
      </div>

      {/* Program Eligibility */}
      <p className="section-label" style={{ marginTop: '3rem' }}>Program-specific Eligibility</p>
      <div className={styles.programsGrid}>
        {ELIGIBILITY_GROUPS.map(group => (
          <ProgramEligibilityCard key={group.title} group={group} />
        ))}
      </div>

      {/* DAE Mapping */}
      <p className="section-label" style={{ marginTop: '3rem' }}>DAE Accepted Technologies</p>
      <div className={styles.analysisCard} style={{ padding: '0' }}>
        <div className={styles.analysisTableWrapper}>
          <table className={styles.analysisTable}>
            <thead>
              <tr>
                <th>Target Engineering Program</th>
                <th>Relevant DAE Fields</th>
              </tr>
            </thead>
            <tbody>
              {DAE_MAPPING.map(m => (
                <tr key={m.tech}>
                  <td style={{ fontWeight: '600' }}>{m.tech}</td>
                  <td style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>{m.fields}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Ineligibility */}
      <p className="section-label" style={{ marginTop: '3rem' }}>General Ineligibility Rules</p>
      <div className={styles.docsWarning} style={{ display: 'block' }}>
        <ul style={{ paddingLeft: '1.2rem' }}>
          {INELIGIBILITY.map((text, i) => (
            <li key={i} style={{ marginBottom: '0.5rem' }}>{text}</li>
          ))}
        </ul>
      </div>

      {/* Merit Formula */}
      <p className="section-label" style={{ marginTop: '3rem' }}>How Merit Is Calculated</p>
      <div className={styles.meritCard}>
        <p className={styles.meritIntro}>
          Your admission merit is a weighted score combining three factors. The entry test carries the most weight by far.
        </p>
        <div className={styles.meritBars}>
          {MERIT_FORMULA.map(m => (
            <div key={m.label} className={styles.meritRow}>
              <div className={styles.meritRowLabel}>
                <span className={styles.meritLabel}>{m.label}</span>
                <span className={styles.meritWeight}>{m.weight}%</span>
              </div>
              <div className={styles.meritBarTrack}>
                <div
                  className={`${styles.meritBarFill} ${styles[`merit_${m.color}`]}`}
                  style={{ width: `${m.weight}%` }}
                />
              </div>
            </div>
          ))}
        </div>
        <div className={styles.meritNote}>
          <span>💡</span>
          <p>
            <strong>Awaiting Results?</strong> You can apply! Enter 1st Year (Part-I) marks if 2nd Year exams 
            were recently given. DAE students can enter combined 1st + 2nd Year marks.
          </p>
        </div>
        <div className={styles.docsWarning} style={{ display: 'block', marginTop: '1rem' }}>
          <p style={{ fontWeight: '700', marginBottom: '0.5rem' }}>Gap Year Deduction Policy:</p>
          <ul style={{ paddingLeft: '1.2rem', fontSize: '12px' }}>
            {MERIT_DEDUCTION.map((d, i) => (
              <li key={i} style={{ marginBottom: '4px' }}><strong>{d.year}:</strong> {d.deduction}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* Entry Test Breakdown */}
      <p className="section-label" style={{ marginTop: '3rem' }}>2026 Entry Test Pattern</p>
      <div className={styles.testMeta}>
        <div className={styles.testMetaPill}>✏️ 100 MCQs</div>
        <div className={styles.testMetaPill}>⏱️ 90 Minutes</div>
        <div className={styles.testMetaPill}>✅ No Negative Marking</div>
      </div>

      <div className={styles.meritCard} style={{ gap: '2rem' }}>
        <div>
          <p style={{ fontWeight: '700', marginBottom: '1rem', fontSize: '14px' }}>Part 1: Compulsory Section (50 Marks)</p>
          <div className={styles.testMeta} style={{ marginBottom: '0' }}>
            {TEST_PATTERN_2026.compulsory.map(c => (
              <div key={c.label} className={styles.testMetaPill} style={{ background: 'var(--accent-light)' }}>
                {c.icon} {c.label}: {c.questions}
              </div>
            ))}
          </div>
        </div>

        <div>
          <p style={{ fontWeight: '700', marginBottom: '1rem', fontSize: '14px' }}>Part 2: Optional Section (50 Marks)</p>
          <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
            Questions are based on your academic background. Choose the correct group:
          </p>
          <div className={styles.analysisTableWrapper} style={{ border: 'none' }}>
            <table className={styles.analysisTable}>
              <thead>
                <tr>
                  <th>Academic Group</th>
                  <th>Subject Breakdown</th>
                </tr>
              </thead>
              <tbody>
                {TEST_PATTERN_2026.optional.map(opt => (
                  <tr key={opt.group}>
                    <td style={{ fontSize: '12px', fontWeight: '600' }}>{opt.group}</td>
                    <td>
                      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                        {opt.subjects.map(s => (
                          <span key={s.label} style={{ fontSize: '11px', background: 'var(--surface-hover)', padding: '2px 8px', borderRadius: '4px' }}>
                            {s.label}: {s.q}
                          </span>
                        ))}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Past Merit Lists */}
      <p className="section-label" style={{ marginTop: '3rem' }}>Past Merit Lists</p>
      <div className={styles.meritListsIntroBox}>
        <span>📊</span>
        <p>
          The most reliable way to know if you have a realistic chance is to look at actual
          cut-off scores from past years. Browse the merit list PDFs below, organized by year
          and department. Compare multiple years to spot the trend.
        </p>
      </div>
      <div
        className={styles.meritListBrowseCard}
        onClick={() => setPage({
          id: 'browser',
          semester: MERIT_LISTS,
          initialPath: MERIT_LISTS.rootFolder,
          initialCrumbs: [
            { label: 'Admissions', path: null },
            { label: 'Merit Lists', path: MERIT_LISTS.rootFolder },
          ],
        })}
      >
        <span className={styles.meritListBrowseIcon}>🗂</span>
        <div className={styles.meritListBrowseInfo}>
          <p className={styles.meritListBrowseLabel}>Browse Merit Lists</p>
          <p className={styles.meritListBrowseNote}>Past merit list PDFs organized by year and department</p>
        </div>
        <span className={styles.meritListBrowseArrow}>→</span>
      </div>

      {/* Sample Papers */}
      <p className="section-label" style={{ marginTop: '2.5rem' }}>Entry Test Sample Papers</p>
      <div className={styles.meritListsIntroBox}>
        <span>📝</span>
        <p>
          Practice is key to clearing the entry test. We have collected sample papers and 
          past question patterns to help you understand the difficulty level and the 
          type of questions asked in Mathematics, Physics, and English.
        </p>
      </div>
      <div
        className={styles.meritListBrowseCard}
        onClick={() => setPage({
          id: 'browser',
          semester: SAMPLE_PAPERS,
          initialPath: SAMPLE_PAPERS.rootFolder,
          initialCrumbs: [
            { label: 'Admissions', path: null },
            { label: 'Sample Papers', path: SAMPLE_PAPERS.rootFolder },
          ],
        })}
      >
        <span className={styles.meritListBrowseIcon}>📚</span>
        <div className={styles.meritListBrowseInfo}>
          <p className={styles.meritListBrowseLabel}>Browse Sample Papers</p>
          <p className={styles.meritListBrowseNote}>Official sample papers and community-sourced past questions</p>
        </div>
        <span className={styles.meritListBrowseArrow}>→</span>
      </div>

      {/* Admission Timeline */}
      <p className="section-label" style={{ marginTop: '3rem' }}>Admission Timeline</p>
      <div className={styles.timelineCard}>
        <p className={styles.timelineIntro}>
          Every step below has a hard deadline. Miss one and you lose your seat. Click any step to read details.
        </p>
        <div className={styles.timeline}>
          {TIMELINE.map((item, i) => (
            <TimelineItem key={i} item={item} index={i} />
          ))}
        </div>
      </div>

      {/* Documents */}
      <p className="section-label" style={{ marginTop: '3rem' }}>Documents You Will Need</p>
      <div className={styles.docsGrid}>
        {DOCS_REQUIRED.map(d => (
          <div key={d.name} className={styles.docCard}>
            <span className={styles.docIcon}>{d.icon}</span>
            <div>
              <p className={styles.docName}>{d.name}</p>
              <p className={styles.docNote}>{d.note}</p>
            </div>
          </div>
        ))}
      </div>
      <div className={styles.docsWarning}>
        <span>⚠️</span>
        <p>
          Get everything attested <strong>before</strong> the portal opens. Attestation from a Gazetted Officer has
          queues and takes more time than you expect. Do not start this process on the last day of admissions.
        </p>
      </div>

      {/* Tips */}
      <p className="section-label" style={{ marginTop: '3rem' }}>Tips That Actually Help</p>
      <div className={styles.tipsGrid}>
        {TIPS.map(t => (
          <div key={t.title} className={styles.tipCard}>
            <span className={styles.tipIcon}>{t.icon}</span>
            <p className={styles.tipTitle}>{t.title}</p>
            <p className={styles.tipBody}>{t.body}</p>
          </div>
        ))}
      </div>

      {/* FAQs */}
      <p className="section-label" style={{ marginTop: '3rem' }}>Admissions FAQs</p>
      <div className={styles.faqList}>
        {FAQS.map(f => <FaqItem key={f.q} q={f.q} a={f.a} />)}
      </div>

      {/* CTA */}
      <div className={styles.ctaCard}>
        <p className={styles.ctaTitle}>Ready to apply?</p>
        <p className={styles.ctaText}>
          The admissions portal opens seasonally. Bookmark it, check it daily once announced,
          and submit the moment it goes live. Do not be the person who found out admissions
          closed yesterday.
        </p>
        <div className={styles.ctaButtons}>
          <a
            href="https://admissions.duet.edu.pk"
            target="_blank"
            rel="noreferrer"
            className={styles.ctaBtnPrimary}
          >
            Admissions Portal ↗
          </a>
          <a
            href="https://duet.edu.pk"
            target="_blank"
            rel="noreferrer"
            className={styles.ctaBtnSecondary}
          >
            DUET Official Website ↗
          </a>
        </div>
      </div>

    </div>
  )
}
