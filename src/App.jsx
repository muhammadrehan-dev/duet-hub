import { useState, useEffect } from 'react'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/react'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import HomePage from '@/pages/HomePage'
import AboutPage from '@/pages/AboutPage'
import BrowserPage from '@/pages/BrowserPage'
import SemesterPage from '@/pages/SemesterPage'
import NewBiePage from '@/pages/NewBiePage'
import AdmissionsPage from '@/pages/AdmissionsPage'

export default function App() {
  const [page, setPage] = useState({ id: 'home' })

  // ── SEO: Dynamic Title ──────────────────────────────────────────────────
  useEffect(() => {
    const titles = {
      home: 'DUET Resource Hub | Admissions & Student Resources',
      admissions: 'Admissions Guide | DUET Resource Hub',
      newbie: 'Newbie Guide | DUET Resource Hub',
      about: 'About Us | DUET Resource Hub',
      semester: `${page.semester?.label || 'Semester'} | DUET Resource Hub`,
      browser: `${page.semester?.label || 'Resources'} | DUET Resource Hub`
    }
    document.title = titles[page.id] || 'DUET Resource Hub'
  }, [page])

  const renderPage = () => {
    switch (page.id) {
      case 'home':
        return <HomePage setPage={setPage} />
      case 'about':
        return <AboutPage />
      case 'newbie':
        return <NewBiePage />
      case 'admissions':
        return <AdmissionsPage setPage={setPage} />
      case 'semester':
        return <SemesterPage semester={page.semester} setPage={setPage} />
      case 'browser':
        return (
          <BrowserPage
            semester={page.semester}
            initialPath={page.initialPath}
            initialCrumbs={page.initialCrumbs}
            setPage={setPage}
          />
        )
      default:
        return <HomePage setPage={setPage} />
    }
  }

  return (
    <>
      <Nav page={page} setPage={setPage} />
      <main>{renderPage()}</main>
      <Footer />
      <Analytics />
      <SpeedInsights />
    </>
  )
}