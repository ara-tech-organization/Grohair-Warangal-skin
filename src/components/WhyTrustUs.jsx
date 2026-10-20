import { useScrollReveal } from '../hooks/useScrollReveal'

const stats = [
  { value: '15+',   label: 'Years\nExperience', icon: '🏆' },
  { value: '5000+', label: 'Happy\nPatients',   icon: '😊' },
  { value: '100%',  label: 'Certified\nDoctors', icon: '✅' },
]

const trust = [
  {
    icon: '🔬',
    title: 'Advanced Technology',
    desc: 'Latest PRP, GFC & Laser equipment used by certified dermatologists.',
  },
  {
    icon: '🛡️',
    title: 'Safe & Non-Surgical',
    desc: 'All procedures are clinically safe with no downtime or side effects.',
  },
  {
    icon: '📋',
    title: 'Personalised Plans',
    desc: 'Every patient gets a custom treatment plan based on their skin analysis.',
  },
]

export default function WhyTrustUs() {
  const statsRef = useScrollReveal()
  const trustRef = useScrollReveal()

  return (
    <section className="bg-white">
      {/* ── Stats banner ── */}
      <div className="bg-gray-900 px-4 py-6">
        <h2 className="text-[20px] font-bold text-white text-center mb-5">
          Why Trust <span className="text-red-400">Gloskin Warangal?</span>
        </h2>
        <div ref={statsRef} className="reveal-stagger grid grid-cols-3 gap-3">
          {stats.map((s) => (
            <div key={s.value} className="flex flex-col items-center text-center">
              <span className="text-[22px] mb-1">{s.icon}</span>
              <p className="text-[22px] font-extrabold text-white leading-none">{s.value}</p>
              <p className="text-[10px] text-white/50 mt-1 whitespace-pre-line leading-snug">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Trust points ── */}
      <div ref={trustRef} className="reveal-stagger px-4 py-5 flex flex-col gap-3">
        {trust.map((item) => (
          <div key={item.title} className="flex items-start gap-4 bg-gray-50 rounded-2xl p-4 border border-gray-100">
            <span className="text-[26px] shrink-0 mt-0.5">{item.icon}</span>
            <div>
              <h3 className="text-[14px] font-bold text-gray-900 mb-1">{item.title}</h3>
              <p className="text-[12px] text-gray-500 leading-relaxed">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
