import { useState } from 'react'
import { MERIT_LISTS, SAMPLE_PAPERS } from '@/data/config'
import styles from './AdmissionsPage.module.css'


const PROGRAMS = [
  {
    dept: 'Computer Science',
    code: 'CS',
    icon: '💻',
    seats: '150 to 170',
    minPct: '60%',
    eligibility: 'FSc Pre-Engineering or ICS with Physics and Mathematics',
    color: 'blue',
  },
  {
    dept: 'Artificial Intelligence',
    code: 'AI',
    icon: '🤖',
    seats: '150 to 170',
    minPct: '60%',
    eligibility: 'FSc Pre-Engineering or ICS with Physics and Mathematics',
    color: 'purple',
  },
  {
    dept: 'Cybersecurity',
    code: 'CY',
    icon: '🔐',
    seats: '150 to 170',
    minPct: '60%',
    eligibility: 'FSc Pre-Engineering or ICS with Physics and Mathematics',
    color: 'red',
  },
  {
    dept: 'Data Science',
    code: 'DS',
    icon: '📊',
    seats: '150 to 170',
    minPct: '60%',
    eligibility: 'FSc Pre-Engineering or ICS with Physics and Mathematics',
    color: 'green',
  },
]

const JINNAH_PROGRAMS = [
  {
    dept: 'Computer System Eng.',
    code: 'CSE',
    icon: '⚙️',
    seats: '60 to 80',
    minPct: '60%',
    eligibility: 'FSc Pre-Engineering Only',
    color: 'blue',
  },
  {
    dept: 'Electronics Engineering',
    code: 'EE',
    icon: '🔌',
    seats: '60 to 80',
    minPct: '60%',
    eligibility: 'FSc Pre-Engineering Only',
    color: 'amber',
  },
  {
    dept: 'Chemical Engineering',
    code: 'CE',
    icon: '🧪',
    seats: '60 to 80',
    minPct: '60%',
    eligibility: 'FSc Pre-Engineering Only',
    color: 'green',
  },
  {
    dept: 'Industrial Eng. & Management',
    code: 'IE',
    icon: '🏭',
    seats: '50 to 70',
    minPct: '60%',
    eligibility: 'FSc Pre-Engineering Only',
    color: 'purple',
  },
  {
    dept: 'Petroleum & Gas Engineering',
    code: 'PG',
    icon: '⛽',
    seats: '50 to 60',
    minPct: '60%',
    eligibility: 'FSc Pre-Engineering Only',
    color: 'red',
  },
  {
    dept: 'Metallurgy & Materials',
    code: 'MM',
    icon: '🔩',
    seats: '40 to 50',
    minPct: '60%',
    eligibility: 'FSc Pre-Engineering Only',
    color: 'blue',
  },
  {
    dept: 'Energy & Environment',
    code: 'EN',
    icon: '☀️',
    seats: '40 to 50',
    minPct: '60%',
    eligibility: 'FSc Pre-Engineering Only',
    color: 'green',
  },
  {
    dept: 'Architecture & Planning',
    code: 'AR',
    icon: '🏛️',
    seats: '40 to 50',
    minPct: '60%',
    eligibility: 'FSc Pre-Engineering or Humanities with Maths',
    color: 'teal',
  },
]

const TEST_SECTIONS = [
  {
    icon: '🧮',
    title: 'Mathematics',
    questions: 40,
    topics: [
      'Algebra and Functions',
      'Matrices and Determinants',
      'Sequences and Series',
      'Calculus (differentiation basics)',
      'Trigonometry',
      'Probability and Statistics',
    ],
    tip: 'Straight from FSc Part 1 and 2. Focus on speed — you will know the method but the clock is the real enemy.',
    color: 'blue',
  },
  {
    icon: '⚗️',
    title: 'Physics',
    questions: 30,
    topics: [
      'Mechanics and Motion',
      'Electricity and Magnetism',
      'Waves, Sound and Optics',
      'Thermodynamics',
      'Modern Physics',
      'Measurements and Vectors',
    ],
    tip: 'Numerical questions dominate. Pick the right formula fast, plug in numbers, move on. No time to derive from scratch.',
    color: 'purple',
  },
  {
    icon: '🧠',
    title: 'English and IQ',
    questions: 30,
    topics: [
      'Vocabulary and synonyms',
      'Antonyms',
      'Sentence completion',
      'Reading comprehension',
      'Logical and verbal reasoning',
      'Pattern recognition and analogies',
    ],
    tip: 'This section surprises most students. It is not FSc English — it is closer to an aptitude test. Practice NTS and GAT style questions specifically.',
    color: 'green',
  },
]

const MERIT_FORMULA = [
  { label: 'Entry Test Score', weight: 60, color: 'blue' },
  { label: 'Intermediate Marks', weight: 30, color: 'green' },
  { label: 'Matric Marks', weight: 10, color: 'amber' },
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


// ─── Page ─────────────────────────────────────────────────────────────────────

export default function AdmissionsPage({ setPage }) {
  return (
    <div className="page">

      {/* Hero */}
      <div className="hero">
        <p className="hero-label">Before the admission letter arrives, read this.</p>
        <h1 className="hero-title">Getting Into DUET.<br />Here is Everything You Need to Know.</h1>
        <p className="hero-sub">
          Eligibility, entry test breakdown, merit formula, past merit lists, sample papers, 
          documents, timeline and tips that actually help. Written by a student who went through it.
        </p>
      </div>

      {/* Past Merit Lists */}
      <p className="section-label" style={{ marginTop: '2rem' }}>Past Merit Lists</p>
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

      {/* Last Year Admission Analysis */}
      <p className="section-label" style={{ marginTop: '3rem' }}>Full Admission Analysis (Batch 25F · 4th List)</p>
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
            </tbody>
          </table>
        </div>

        <div className={styles.analysisFooter}>
          <p>* "Allotted" refers to candidates placed in this specific 4th list. Total seats per dept are higher (~150-170 for CS/AI).</p>
        </div>
      </div>

      {/* Programs and Eligibility - IC&S */}
      <p className="section-label">IC&S Campus Programs and Eligibility</p>
      <div className={styles.programsGrid}>
        {PROGRAMS.map(p => (
          <div key={p.code} className={`${styles.programCard} ${styles[`prog_${p.color}`]}`}>
            <div className={styles.programTop}>
              <span className={styles.programIcon}>{p.icon}</span>
              <div>
                <p className={styles.programDept}>{p.dept}</p>
                <p className={styles.programCode}>{p.code} · IC&S Campus</p>
              </div>
            </div>
            <p className={styles.programEligibility}>{p.eligibility}</p>
            <div className={styles.programMeta}>
              <span className={styles.programSeatsBadge}>{p.seats} seats</span>
              <span className={styles.programMinBadge}>{p.minPct} minimum</span>
            </div>
          </div>
        ))}
      </div>

      {/* Programs and Eligibility - Main Campus */}
      <p className="section-label" style={{ marginTop: '2.5rem' }}>Main Jinnah Campus Programs</p>
      <div className={styles.programsGrid}>
        {JINNAH_PROGRAMS.map(p => (
          <div key={p.code} className={`${styles.programCard} ${styles[`prog_${p.color}`]}`}>
            <div className={styles.programTop}>
              <span className={styles.programIcon}>{p.icon}</span>
              <div>
                <p className={styles.programDept}>{p.dept}</p>
                <p className={styles.programCode}>{p.code} · Main Campus</p>
              </div>
            </div>
            <p className={styles.programEligibility}>{p.eligibility}</p>
            <div className={styles.programMeta}>
              <span className={styles.programSeatsBadge}>{p.seats} seats</span>
              <span className={styles.programMinBadge}>{p.minPct} minimum</span>
            </div>
          </div>
        ))}
      </div>

      <p className={styles.programsNote}>
        Seat counts are based on average yearly intake. Verify exact figures on the official admissions notification.
      </p>

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
            A strong entry test can compensate for average academic marks. Neither alone guarantees admission.
            If your FSc percentage is moderate, put serious effort into the test preparation. That 50% is where
            most students either win or lose their seat.
          </p>
        </div>
      </div>

      {/* Entry Test Breakdown */}
      <p className="section-label" style={{ marginTop: '3rem' }}>Entry Test Breakdown</p>
      <div className={styles.testMeta}>
        <div className={styles.testMetaPill}>✏️ 100 MCQs</div>
        <div className={styles.testMetaPill}>⏱️ 90 Minutes</div>
        <div className={styles.testMetaPill}>✅ No Negative Marking</div>
        <div className={styles.testMetaPill}>📍 DUET Campus, Karachi</div>
      </div>
      <div className={styles.sectionsGrid}>
        {TEST_SECTIONS.map(s => (
          <div key={s.title} className={`${styles.sectionCard} ${styles[`sec_${s.color}`]}`}>
            <div className={styles.sectionTop}>
              <span className={styles.sectionIcon}>{s.icon}</span>
              <div>
                <p className={styles.sectionTitle}>{s.title}</p>
                <p className={styles.sectionWeight}>~{s.questions} questions</p>
              </div>
            </div>
            <ul className={styles.sectionTopics}>
              {s.topics.map(t => <li key={t}>{t}</li>)}
            </ul>
            <div className={styles.sectionTip}>
              <span>💡</span>
              <p>{s.tip}</p>
            </div>
          </div>
        ))}
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
