import { useEffect, useRef, useState } from 'react'

export default function TreatmentSelect({ name, placeholder, options, value, onChange, required }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  function select(option) {
    onChange({ target: { name, value: option } })
    setOpen(false)
  }

  return (
    <div className="relative" ref={ref}>
      <input type="hidden" name={name} value={value} required={required} />
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between gap-2 text-left px-4 py-3 rounded-[14px] border border-[#E5E7EB] bg-white text-[14px] outline-none transition-colors"
      >
        <span className={value ? 'text-[#1A1A1A] truncate' : 'text-[#9CA3AF] truncate'}>
          {value || placeholder}
        </span>
        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" className={`shrink-0 text-[#9CA3AF] transition-transform duration-200 ${open ? 'rotate-180' : ''}`}>
          <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      {open && (
        <ul role="listbox" className="absolute z-20 mt-1.5 w-full bg-white border border-[#E5E7EB] rounded-[14px] shadow-[0_8px_24px_rgba(0,0,0,0.12)] overflow-hidden">
          {options.map((option) => (
            <li key={option}>
              <button
                type="button"
                role="option"
                aria-selected={value === option}
                onClick={() => select(option)}
                className="w-full text-left px-4 py-3 text-[14px] text-[#1A1A1A] hover:bg-[#F9FAFB] active:bg-[#F9FAFB] transition-colors"
              >
                {option}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
