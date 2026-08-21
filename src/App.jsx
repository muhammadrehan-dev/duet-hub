import { useEffect } from 'react'
import { Routes, Route, useLocation, useParams, Navigate } from 'react-router-dom'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/react'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import HomePage from '@/pages/HomePage'
import AboutPage from '@/pages/AboutPage'
import BrowserPage from '@/pages/BrowserPage'
import NewBiePage from '@/pages/NewBiePage'
import AdmissionsPage from '@/pages/AdmissionsPage'
import ResourcesPage from '@/pages/ResourcesPage'
import GalleryPage from '@/pages/GalleryPage'
import PWAInstallPrompt from '@/components/PWAInstallPrompt'
import { SEMESTERS, MERIT_LISTS, SAMPLE_PAPERS } from '@/data/config'

function BrowserPageWrapper() {
  const { semesterId } = useParams()
  const decodedId = semesterId ? decodeURIComponent(semesterId) : ''

  let semester = SEMESTERS.find(s => s.id === decodedId)
  if (!semester) {
    if (decodedId === 'Merit Lists' || decodedId === 'merit-lists') semester = MERIT_LISTS
    else if (decodedId === 'Sample Papers' || decodedId === 'sample-papers') semester = SAMPLE_PAPERS
    else semester = SEMESTERS[0]
  }

  return (
    <BrowserPage
      semester={semester}
      initialPath={semester.rootFolder}
      initialCrumbs={[
        { label: 'Home', path: null },
        { label: semester.label, path: semester.rootFolder },
      ]}
    />
  )
}

function PageTitleUpdater() {
  const location = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
    const titles = {
      '/': 'DUET Resource Hub | Admissions & Student Resources',
      '/resources': 'Course Resources | DUET Resource Hub',
      '/contents': 'Course Resources | DUET Resource Hub',
      '/gallery': 'Campus Event Gallery | DUET Resource Hub',
      '/admissions': 'Admissions Guide | DUET Resource Hub',
      '/newbie': 'Newbie Guide | DUET Resource Hub',
      '/about': 'About Us | DUET Resource Hub',
    }
    if (titles[location.pathname]) {
      document.title = titles[location.pathname]
    } else if (location.pathname.startsWith('/browser')) {
      document.title = 'Resources | DUET Resource Hub'
    } else {
      document.title = 'DUET Resource Hub'
    }
  }, [location])

  return null
}

export default function App() {
  return (
    <>
      <PageTitleUpdater />
      <Nav />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/resources" element={<ResourcesPage />} />
          <Route path="/contents" element={<ResourcesPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/admissions" element={<AdmissionsPage />} />
          <Route path="/newbie" element={<NewBiePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/browser/:semesterId" element={<BrowserPageWrapper />} />
          <Route path="/browser" element={<BrowserPageWrapper />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
      <PWAInstallPrompt />
      <Analytics />
      <SpeedInsights />
    </>
  )
}