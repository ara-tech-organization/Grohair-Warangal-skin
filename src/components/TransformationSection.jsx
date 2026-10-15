import { useState, useEffect, useRef } from 'react'
import { useScrollReveal } from '../hooks/useScrollReveal'

const reviews = [
  { name: "Vidhu Priya", time: 'GloSkin client', avatar: 'VP', color: '#c0001a', text: "I've been getting treatments for my dry skin (HydraFacial and Q-switch) here for the past 4 months, and my skin has improved so much it's now plump and glowing. The doctors are highly professional and explain every procedure in detail." },
  { name: "Sai Sathish Rosh", time: 'GloSkin client', avatar: 'SS', color: '#7c3aed', text: "I'm absolutely delighted with the Glutathione treatment I received at the Mogappair branch! It has beautifully lightened my skin tone to a fair and radiant complexion. I wholeheartedly recommend this place." },
  { name: "Jaya Kummar", time: 'HydraFacial client', avatar: 'JK', color: '#0891b2', text: "Treatments are good, 100% safe. I had a HydraFacial and was stunned with the result. Staff and doctors are very respectful, and I'm planning to have a medi facial next week." },
  { name: "Sruti Shivam", time: 'HydraFacial client', avatar: 'SS', color: '#059669', text: "The staff was knowledgeable and attentive, and the atmosphere was relaxing. I went for a HydraFacial and my skin feels amazing. I highly recommend them!" },
  { name: "Sumanth Ravi", time: 'Hair fall patient', avatar: 'SR', color: '#d97706', text: "I consulted Dr Nikitha for my hair fall problem. She explained everything and suggested the best treatment. This is my 4th session and I have visible results. Much recommended!" },
  { name: "Arun Viran", time: 'GroHair client', avatar: 'AV', color: '#be185d', text: "I had a great experience with hair treatment in this clinic. I'll recommend the clinic and the doctors to everyone. Very hygienic and well maintained." },
]

const Stars = () => (
  <div className="flex gap-0.5">
    {Array(5).fill(0).map((_, i) => (
      <svg key={i} viewBox="0 0 20 20" fill="#f59e0b" className="w-3.5 h-3.5">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ))}
  </div>
)

export default function TransformationSection() {
  const headRef                     = useScrollReveal()
  const [active, setActive]         = useState(0)
  const [visible, setVisible]       = useState(true)
  const [animDir, setAnimDir]       = useState('left')
  const [touchStart, setTouchStart] = useState(null)
  const timerRef                    = useRef(null)

  const goTo = (newIdx, dir = 'left') => {
    clearInterval(timerRef.current)
    setAnimDir(dir)
    setVisible(false)
    setTimeout(() => {
      setActive(newIdx)
      setVisible(true)
      startAuto()
    }, 280)
  }

  const startAuto = () => {
    clearInterval(timerRef.current)
    timerRef.current = setInterval(() => {
      setActive((prev) => {
        const next = (prev + 1) % reviews.length
        goTo(next, 'left')
        return prev
      })
    }, 4000)
  }

  useEffect(() => { startAuto(); return () => clearInterval(timerRef.current) }, [])

  const onTouchStart = (e) => setTouchStart(e.touches[0].clientX)
  const onTouchEnd   = (e) => {
    if (touchStart === null) return
    const diff = touchStart - e.changedTouches[0].clientX
    if (Math.abs(diff) > 40) {
      const next = diff > 0
        ? (active + 1) % reviews.length
        : (active - 1 + reviews.length) % reviews.length
      goTo(next, diff > 0 ? 'left' : 'right')
    }
    setTouchStart(null)
  }

  const r = reviews[active]

  return (
    <section id="reviews" className="py-8 bg-gray-50 scroll-mt-20">
      {/* Heading */}
      <div ref={headRef} className="reveal px-4 mb-6 text-center">
        <h2 className="text-[22px] font-bold text-gray-900 mb-1">
          What Our <span className="text-red-700">Patients Say</span>
        </h2>
        <p className="text-[13px] text-gray-400">Real experiences from real people</p>
      </div>

      {/* ── Review card ── */}
      <div
        className="mx-4 rounded-2xl overflow-hidden shadow-sm border border-gray-100 bg-white"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        {/* Header — white, no colour strip */}
        <div className="px-4 pt-4 pb-3 border-b border-gray-100">
          <div className="flex items-center justify-between">
            {/* Avatar + name */}
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-[13px] shrink-0"
                style={{ background: r.color }}
              >
                {r.avatar}
              </div>
              <div>
                <p className="text-[14px] font-bold text-gray-900 leading-tight">{r.name}</p>
                <div className="flex items-center gap-1.5 mt-0.5">
                  {r.badge && (
                    <span className="text-[9px] font-semibold bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded-full">
                      {r.badge}
                    </span>
                  )}
                  <span className="text-[10px] text-gray-400">{r.time}</span>
                </div>
              </div>
            </div>

            {/* Google G */}
            <div className="w-8 h-8 bg-gray-50 border border-gray-100 rounded-full flex items-center justify-center shrink-0">
              <svg viewBox="0 0 24 24" className="w-4 h-4">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
            </div>
          </div>
          {/* Stars */}
          <div className="flex gap-0.5 mt-2">
            <Stars />
          </div>
        </div>

        {/* Review text — animates */}
        <div
          className="px-4 py-4 min-h-[110px]"
          style={{
            transition: 'opacity 0.28s ease, transform 0.28s ease',
            opacity:   visible ? 1 : 0,
            transform: visible ? 'translateX(0)'
              : animDir === 'left' ? 'translateX(-18px)' : 'translateX(18px)',
          }}
        >
          <p className="text-[13px] text-gray-600 leading-relaxed">{r.text}</p>
        </div>

        {/* Footer — arrows + counter + dots */}
        <div className="px-4 py-3 border-t border-gray-100 flex items-center justify-between">
          {/* Prev arrow */}
          <button
            onClick={() => goTo((active - 1 + reviews.length) % reviews.length, 'right')}
            className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-200 bg-gray-50 active:bg-gray-100"
            aria-label="Previous"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-4 h-4 text-gray-500">
              <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          {/* Dots + counter */}
          <div className="flex flex-col items-center gap-1">
            <div className="flex gap-1.5">
              {reviews.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i, i >= active ? 'left' : 'right')}
                  className={`rounded-full transition-all duration-300 ${
                    i === active ? 'w-4 h-2 bg-red-600' : 'w-2 h-2 bg-gray-200'
                  }`}
                />
              ))}
            </div>
            <span className="text-[10px] text-gray-400">{active + 1} / {reviews.length}</span>
          </div>

          {/* Next arrow */}
          <button
            onClick={() => goTo((active + 1) % reviews.length, 'left')}
            className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-200 bg-gray-50 active:bg-gray-100"
            aria-label="Next"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-4 h-4 text-gray-500">
              <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  )
}
