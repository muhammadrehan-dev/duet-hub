import { useState } from 'react'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/react'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import HomePage from '@/pages/HomePage'
import AboutPage from '@/pages/AboutPage'
import BrowserPage from '@/pages/BrowserPage'
import SemesterPage from '@/pages/SemesterPage'

export default function App() {
  const [page, setPage] = useState({ id: 'home' })

  const renderPage = () => {
    switch (page.id) {
      case 'home':
        return <HomePage setPage={setPage} />
      case 'about':
        return <AboutPage />
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
