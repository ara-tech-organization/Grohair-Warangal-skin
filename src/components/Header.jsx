import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import logoImg from '../assets/Logo.png'

const navItems = [
  { path: '/', label: 'Home' },
  { path: '/treatments', label: 'Treatments' },
  { path: '/reviews', label: 'Patient Reviews' },
  { path: '/book', label: 'Book Consultation' },
  { path: '/contact', label: 'Contact' },
]

export default function Header() {
  const [open, setOpen] = useState(false)
  const menuRef = useRef(null)

  useEffect(() => {
    function handleClick(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  return (
    <header className="relative flex items-center justify-between px-4 py-0.5 bg-white border-b border-gray-200 sticky top-0 z-50">
      {/* Logo */}
      <img src={logoImg} alt="Advanced GroSkin & GloSkin" style={{ height: '55px', width: 'auto', minWidth: '80px', objectFit: 'contain' }} />

      <div className="flex items-center gap-4 h-full" ref={menuRef}>
        {/* Phone icon button */}
        <a
          href="tel:+918270956789"
          aria-label="Call us"
          onClick={() => {
            window.dataLayer = window.dataLayer || [];
            window.dataLayer.push({ event: 'contact_click', channel: 'phone' });
          }}
          className="w-9 h-9 bg-red-700 rounded-full flex items-center justify-center text-white shrink-0"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-[18px] h-[18px]">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.4 2 2 0 0 1 3.59 1.22h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.78a16 16 0 0 0 6 6l1.27-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
          </svg>
        </a>

        {/* Hamburger menu */}
        <button
          type="button"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
          className="flex flex-col items-center justify-center gap-[5px] w-9 h-9 shrink-0"
        >
          <span className={`block w-[20px] h-[2px] bg-gray-900 rounded-full transition-transform duration-200 ${open ? 'rotate-45 translate-y-[6.5px]' : ''}`} />
          <span className={`block w-[20px] h-[2px] bg-gray-900 rounded-full transition-opacity duration-200 ${open ? 'opacity-0' : ''}`} />
          <span className={`block w-[20px] h-[2px] bg-gray-900 rounded-full transition-transform duration-200 ${open ? '-rotate-45 -translate-y-[6.5px]' : ''}`} />
        </button>

        {open && (
          <>
            <div className="fixed inset-0 bg-black/20 z-40" onClick={() => setOpen(false)} />
            <div className="absolute top-full right-4 mt-1 w-[190px] bg-white border border-gray-200 rounded-[10px] shadow-lg overflow-hidden z-50">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => {
                    setOpen(false)
                    window.dataLayer = window.dataLayer || [];
                    window.dataLayer.push({ event: 'navigation_click', target: item.path });
                  }}
                  className="block w-full text-left px-4 py-2 text-[13px] font-semibold text-gray-900 border-b border-gray-100 last:border-b-0 active:bg-gray-50 transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </>
        )}
      </div>
    </header>
  )
}
