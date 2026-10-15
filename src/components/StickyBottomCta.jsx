import { Link } from 'react-router-dom'

export default function StickyBottomCta() {
  return (
    <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[425px] min-w-[320px] z-50 px-3 py-2 bg-white shadow-[0_-2px_12px_rgba(0,0,0,0.15)]">
      <Link
        to="/book"
        className="btn-shimmer flex items-center justify-center gap-2 w-full text-white text-[14px] font-bold py-[13px] rounded-2xl uppercase tracking-wide active:scale-95 transition-all shadow-[0_4px_15px_rgba(139,0,0,0.3)]"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-4 h-4 shrink-0">
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
          <line x1="16" y1="2" x2="16" y2="6" />
          <line x1="8" y1="2" x2="8" y2="6" />
          <line x1="3" y1="10" x2="21" y2="10" />
        </svg>
        Book a Consultation
      </Link>
    </div>
  )
}
