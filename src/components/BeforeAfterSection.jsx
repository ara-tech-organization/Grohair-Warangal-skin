import { useState, useEffect, useRef } from 'react'
import { useScrollReveal } from '../hooks/useScrollReveal'

import b1 from '../assets/before&after/b1.png'
import b2 from '../assets/before&after/b2.png'
import b3 from '../assets/before&after/b3.png'
import b4 from '../assets/before&after/b4.png'

const slides = [b1, b2, b3, b4]
const INTERVAL = 3000

export default function BeforeAfterSection() {
  const headRef = useScrollReveal()
  const [idx, setIdx] = useState(0)
  const [touchX, setTouchX] = useState(null)
  const timerRef = useRef(null)

  const start = () => {
    clearInterval(timerRef.current)
    timerRef.current = setInterval(() => setIdx((p) => (p + 1) % slides.length), INTERVAL)
  }

  useEffect(() => {
    start()
    return () => clearInterval(timerRef.current)
  }, [])

  const goTo = (i) => {
    setIdx((i + slides.length) % slides.length)
    start()
  }

  const onTouchStart = (e) => setTouchX(e.touches[0].clientX)
  const onTouchEnd = (e) => {
    if (touchX === null) return
    const diff = touchX - e.changedTouches[0].clientX
    if (diff > 40) goTo(idx + 1)
    else if (diff < -40) goTo(idx - 1)
    setTouchX(null)
  }

  return (
    <section id="results" className="py-7 bg-white scroll-mt-20">
      <div ref={headRef} className="reveal px-4 mb-5 text-center">
        <h2 className="text-[22px] font-bold text-gray-900 mb-1">
          Real <span className="text-red-700">Results</span>
        </h2>
        <p className="text-[13px] text-gray-400">Visible results from our patients</p>
      </div>

      <div
        className="relative mx-4 max-w-[400px] sm:mx-auto rounded-2xl overflow-hidden border border-gray-100 shadow-sm"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <div
          className="flex transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${idx * 100}%)` }}
        >
          {slides.map((src, i) => (
            <img
              key={src}
              src={src}
              alt={`Before and after result ${i + 1}`}
              loading={i === 0 ? 'eager' : 'lazy'}
              className="w-full shrink-0 aspect-[4/5] object-cover"
            />
          ))}
        </div>
        <button
          type="button"
          onClick={() => goTo(idx - 1)}
          aria-label="Previous result"
          className="absolute left-2 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center rounded-full bg-white/85 shadow-md active:scale-95"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-4 h-4 text-gray-800">
            <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <button
          type="button"
          onClick={() => goTo(idx + 1)}
          aria-label="Next result"
          className="absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center rounded-full bg-white/85 shadow-md active:scale-95"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-4 h-4 text-gray-800">
            <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      <div className="flex justify-center gap-1.5 mt-4">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Show result ${i + 1}`}
            className={`rounded-full transition-all duration-300 ${i === idx ? 'w-4 h-2 bg-red-600' : 'w-2 h-2 bg-gray-200'}`}
          />
        ))}
      </div>
    </section>
  )
}
