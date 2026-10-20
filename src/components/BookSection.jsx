import BookForm from './BookForm'

const trustPoints = [
  'Free skin analysis before any treatment is recommended',
  'Consultation with a certified dermatologist',
  'Your details are never shared or sold',
]

export default function BookSection() {
  return (
    <section id="book" className="bg-[#F9FAFB] px-5 py-12 scroll-mt-20">
      <div className="max-w-[400px] mx-auto text-center mb-6">
        <h2 className="text-[24px] font-extrabold text-[#1A1A1A] leading-[1.28] mb-2.5">
          Book a Consultation in <span className="text-primary">Warangal</span>
        </h2>

        <ul className="mt-5 text-left bg-primary/5 rounded-xl p-4 flex flex-col gap-3.5">
          {trustPoints.map((point) => (
            <li key={point} className="flex items-center gap-3 text-[13px] font-medium text-[#1A1A1A]">
              <span className="shrink-0 w-5 h-5 rounded-full bg-primary/15 text-primary flex items-center justify-center">
                <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="3">
                  <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              {point}
            </li>
          ))}
        </ul>
      </div>

      <div className="max-w-[400px] mx-auto">
        <BookForm />
      </div>
    </section>
  )
}
