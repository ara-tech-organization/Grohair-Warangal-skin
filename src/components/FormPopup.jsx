import { useEffect, useState } from 'react'
import BookForm from './BookForm'

const POPUP_DELAY_MS = 3000

export default function FormPopup() {
  const [open, setOpen] = useState(false)

  // Opens on every page load / refresh, 3s after the site appears.
  useEffect(() => {
    const timer = setTimeout(() => setOpen(true), POPUP_DELAY_MS)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open])

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/55 px-4 py-6 overflow-y-auto"
      onClick={() => setOpen(false)}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Book Your Consultation"
        className="relative w-full max-w-[400px] my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          aria-label="Close"
          onClick={() => setOpen(false)}
          className="absolute -top-3 -right-2 z-10 w-10 h-10 rounded-full bg-[#B5B5B5] text-white flex items-center justify-center shadow-md active:scale-95 transition-transform"
        >
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>
        <BookForm
          formId="popup-book-form"
          className="bg-white p-6 rounded-3xl text-left shadow-2xl"
        />
      </div>
    </div>
  )
}
