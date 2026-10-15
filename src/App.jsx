import { lazy, Suspense, useEffect, useRef, useState } from 'react'
import { Routes, Route, useParams } from 'react-router-dom'
import Header from './components/Header'
import Hero from './components/Hero'
import BookSection from './components/BookSection'

// Below-the-fold sections are code-split and loaded on demand.
const sectionImports = {
  BeforeAfterSection: () => import('./components/BeforeAfterSection'),
  GuaranteeBanner: () => import('./components/GuaranteeBanner'),
  FacingSection: () => import('./components/FacingSection'),
  TreatmentsSection: () => import('./components/TreatmentsSection'),
  TransformationSection: () => import('./components/TransformationSection'),
  CtaBanner: () => import('./components/CtaBanner'),
  Footer: () => import('./components/Footer'),
  StickyBottomCta: () => import('./components/StickyBottomCta'),
  FormPopup: () => import('./components/FormPopup'),
}
const BeforeAfterSection = lazy(sectionImports.BeforeAfterSection)
const GuaranteeBanner = lazy(sectionImports.GuaranteeBanner)
const FacingSection = lazy(sectionImports.FacingSection)
const TreatmentsSection = lazy(sectionImports.TreatmentsSection)
const TransformationSection = lazy(sectionImports.TransformationSection)
const CtaBanner = lazy(sectionImports.CtaBanner)
const Footer = lazy(sectionImports.Footer)
const StickyBottomCta = lazy(sectionImports.StickyBottomCta)
const FormPopup = lazy(sectionImports.FormPopup)

const SectionLoader = () => (
  <div className="flex justify-center py-10" aria-label="Loading">
    <div className="h-8 w-8 rounded-full border-4 border-gray-200 border-t-red-700 animate-spin" />
  </div>
)
import ThankYou from './components/ThankYou'
// URL segment -> section element id. Keeps clean, shareable /treatments, /book, etc.
// URLs instead of #hash anchors, all rendered from this same page.
export const SECTION_IDS = {
  treatments: 'treatments',
  reviews: 'reviews',
  book: 'book',
  contact: 'footer',
}

// Reverse of SECTION_IDS, plus hero -> root ('') — used by scroll-spy to know
// which URL segment a given section on screen corresponds to.
const PATH_BY_ELEMENT_ID = { hero: '', ...Object.fromEntries(Object.entries(SECTION_IDS).map(([path, id]) => [id, path])) }
const SPY_ORDER = ['hero', 'book', 'treatments', 'reviews', 'footer']
const HEADER_OFFSET = 70
const BASE = import.meta.env.BASE_URL.replace(/\/$/, '')

function Home() {
  const { section } = useParams()
  const suppressSpyRef = useRef(false)
  const [sectionsReady, setSectionsReady] = useState(false)

  // Start fetching all lazy sections right after first paint so deep links
  // (/treatments, /book...) can scroll once their targets exist.
  useEffect(() => {
    let cancelled = false
    Promise.all(Object.values(sectionImports).map((load) => load()))
      .catch(() => {})
      .then(() => { if (!cancelled) setSectionsReady(true) })
    return () => { cancelled = true }
  }, [])

  // Route -> scroll: navigating to /treatments etc. scrolls that section into view.
  useEffect(() => {
    suppressSpyRef.current = true
    const id = SECTION_IDS[section]
    if (id) {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
    const timer = setTimeout(() => { suppressSpyRef.current = false }, 900)
    return () => clearTimeout(timer)
  }, [section, sectionsReady])

  // Scroll -> route: as the user scrolls, keep the address bar in sync with
  // whichever section is currently at the top, without triggering a route
  // change (plain history.replaceState so the effect above never re-fires).
  useEffect(() => {
    let ticking = false

    function syncUrlToScroll() {
      ticking = false
      if (suppressSpyRef.current) return

      let current = SPY_ORDER[0]
      for (const id of SPY_ORDER) {
        const el = document.getElementById(id)
        if (el && el.getBoundingClientRect().top - HEADER_OFFSET <= 0) current = id
      }

      const seg = PATH_BY_ELEMENT_ID[current] ?? ''
      const newPath = seg ? `${BASE}/${seg}` : `${BASE}/`
      if (window.location.pathname !== newPath) {
        window.history.replaceState(null, '', newPath)
      }
    }

    function onScroll() {
      if (!ticking) {
        ticking = true
        window.requestAnimationFrame(syncUrlToScroll)
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className="pb-16">
      <Header />
      <Hero />
      <BookSection />
      <Suspense fallback={<SectionLoader />}>
        <BeforeAfterSection />
        <GuaranteeBanner />
        <FacingSection />
        <TreatmentsSection />
        <TransformationSection />
        <CtaBanner />
        <Footer />
        <StickyBottomCta />
        <FormPopup />
      </Suspense>
    </div>
  )
}

function App() {
  return (
    <Routes>
      <Route path="/thankyou" element={<ThankYou />} />
      <Route path="/:section?" element={<Home />} />
    </Routes>
  )
}

export default App
