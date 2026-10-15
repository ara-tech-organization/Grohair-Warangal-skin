import { useScrollReveal } from '../hooks/useScrollReveal'

const points = [
  { text: 'Personalized Skin Analysis',       icon: '🔬' },
  { text: 'Advanced Skin Rejuvenation Therapies', icon: '💉' },
  { text: 'Proven Clinical Results',                  icon: '📊' },
  { text: 'Safe & Effective Treatments',              icon: '🛡️' },
]

export default function CtaBanner() {
  const ref      = useScrollReveal()
  const listRef  = useScrollReveal()

  return (
    <section
      className="px-4 py-8"
      style={{ background: 'linear-gradient(160deg,#fff7f7 0%,#ffeaea 50%,#fff1f1 100%)' }}
    >
      {/* Heading */}
      <div ref={ref} className="reveal text-center mb-6">
        <span className="inline-block bg-red-100 text-red-700 text-[11px] font-bold tracking-widest uppercase px-3 py-1 rounded-full mb-3">
          Why Us
        </span>
        <h2 className="text-[22px] font-extrabold text-gray-900 mb-1">
          Why Choose <span className="text-red-600">GroSkin?</span>
        </h2>
        <p className="text-[12px] text-gray-400">Trusted by thousands across Tamil Nadu</p>
      </div>

      {/* Points */}
      <div ref={listRef} className="reveal-stagger flex flex-col gap-3 mb-7">
        {points.map((pt) => (
          <div
            key={pt.text}
            className="flex items-center gap-3 bg-white rounded-xl px-4 py-3 shadow-sm border border-red-100"
          >
            <span className="text-[20px] shrink-0">{pt.icon}</span>
            <span className="text-[13px] font-semibold text-gray-800">{pt.text}</span>
            <span className="ml-auto shrink-0 w-5 h-5 rounded-full bg-red-600 flex items-center justify-center">
              <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" className="w-3 h-3">
                <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </div>
        ))}
      </div>

    </section>
  )
}
