import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import TreatmentSelect from './TreatmentSelect'

const treatmentOptions = [
  'Laser Skin Resurfacing',
  'Microneedling',
  'Chemical Peels',
  'PRP Skin Rejuvenation',
  'Other',
]

export default function BookForm({
  formId = 'book-form',
  className = 'bg-white border border-[#E5E7EB] shadow-[0_8px_24px_rgba(0,0,0,0.08)] p-6 rounded-2xl text-left',
}) {
  const navigate = useNavigate()
  const [status, setStatus] = useState('idle') // idle | sending | error
  const [form, setForm] = useState({ name: '', city: '', phone: '', treatment: '' })

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  async function handleSubmit(e) {
    e.preventDefault()

    if (!form.name || !form.city || !form.phone || !form.treatment) {
      alert('Please fill all required fields')
      return
    }

    if (form.phone.length !== 10) {
      alert('Please enter a valid 10-digit phone number')
      return
    }

    setStatus('sending')
    try {
      const now = new Date()
      const payload = {
        name: form.name,
        email: 'N/A',
        phone: form.phone,
        date: now.toLocaleDateString('en-IN', { year: 'numeric', month: '2-digit', day: '2-digit' }),
        time: now.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true }),
        treatment: form.treatment,
        message: `City: ${form.city}`,
        source: 'Grohair Mogappair Skin Clinic Landing Page',
      }

      const res = await fetch('https://adgrohairclinicmogappair.com/api/email.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })

      const data = await res.json()
      if (data.success) {
        window.dataLayer = window.dataLayer || []
        window.dataLayer.push({ event: 'lead_form_submitted' })
        navigate('/thankyou')
      } else {
        setStatus('error')
      }
    } catch (error) {
      console.error('Submission error:', error)
      setStatus('error')
    }
  }

  return (
    <form id={formId} onSubmit={handleSubmit} className={className}>
      <h3 className="text-center text-[20px] font-extrabold text-[#1A1A1A] mb-5">Book Your Consultation</h3>
  
      <input
        type="text" name="name" value={form.name} onChange={handleChange}
        placeholder="Enter your name" required
        className="w-full mb-3.5 px-4 py-3 rounded-[14px] border border-[#E5E7EB] text-[14px] text-[#1A1A1A] placeholder:text-[#9CA3AF] outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
      />
  
      <input
        type="text" name="city" value={form.city} onChange={handleChange}
        placeholder="Enter your city" required
        className="w-full mb-3.5 px-4 py-3 rounded-[14px] border border-[#E5E7EB] text-[14px] text-[#1A1A1A] placeholder:text-[#9CA3AF] outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
      />
  
      <input
        type="tel" name="phone" value={form.phone} onChange={handleChange}
        placeholder="Enter your 10-digit mobile number" required pattern="[0-9]{10}" maxLength={10}
        className="w-full mb-3.5 px-4 py-3 rounded-[14px] border border-[#E5E7EB] text-[14px] text-[#1A1A1A] placeholder:text-[#9CA3AF] outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
      />
  
      <div className="mb-3.5">
        <TreatmentSelect
          name="treatment"
          placeholder="Select Your Treatment"
          options={treatmentOptions}
          value={form.treatment}
          onChange={handleChange}
          required
        />
      </div>
  
      <p className="flex items-center gap-2 text-[12px] text-[#1A1A1A] mt-3.5 mb-1">
        <span className="shrink-0 w-6 h-6 rounded-md bg-primary/10 text-primary flex items-center justify-center">
          <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="4" y="10" width="16" height="10" rx="2" />
            <path d="M8 10V7a4 4 0 118 0v3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
        100% confidential — no spam calls, ever.
      </p>
  
      {status === 'error' && (
        <p className="text-red-600 text-[12px] text-center mt-2">Something went wrong. Please try again.</p>
      )}
  
      <button
        type="submit" disabled={status === 'sending'}
        className="btn-shimmer w-full mt-3 text-white text-[16px] font-bold py-4 rounded-xl shadow-[0_4px_15px_rgba(139,0,0,0.3)] transition-transform active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {status === 'sending' ? (
          <>
            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span>Submitting...</span>
          </>
        ) : 'Book Your Consultation'}
      </button>
    </form>
  )
}
