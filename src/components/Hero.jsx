import heroBg from '../assets/bg-hero.jpg'

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative w-full flex flex-col overflow-hidden bg-[#0a0a0a]"
    >
      {/* Background image layer */}
      {heroBg && (
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url(${heroBg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center top',
          }}
        />
      )}

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/40" />

      <div className="relative z-10 px-5 py-12 text-center">
        <h1 className="text-[34px] leading-[1.2] font-extrabold text-white mb-2 drop-shadow-md">
          Best <span className="text-white">Skin Clinic</span> in Mogappair
        </h1>

        {/* Trust badges */}
        <div className="grid grid-cols-3 gap-2 mt-[18px]">
          <div className="badge-shimmer flex items-center justify-center text-center px-1.5 py-3 rounded-[10px] border border-white/25 text-white text-[11px] font-bold leading-tight">
            Expert Dermatologist
          </div>
          <div className="badge-shimmer flex items-center justify-center text-center px-1.5 py-3 rounded-[10px] border border-white/25 text-white text-[11px] font-bold leading-tight">
            <span><strong className="text-[#ffd9d9] font-extrabold">5000+</strong> Patients</span>
          </div>
          <div className="badge-shimmer flex items-center justify-center text-center px-1.5 py-3 rounded-[10px] border border-white/25 text-white text-[11px] font-bold leading-tight">
            <span><strong className="text-[#ffd9d9] font-extrabold">4.8</strong> Google Rated</span>
          </div>
        </div>

        <p className="text-[14px] text-white/75 mt-[18px] mb-1 drop-shadow-md">
          Personalized skin treatments in Mogappair with expert dermatologists, offering professional solutions for acne, pigmentation, ageing, and other skin concerns.
        </p>

        <button
          type="button"
          onClick={() => document.getElementById('book-form')?.scrollIntoView({ behavior: 'smooth', block: 'center' })}
          className="cta-pulse btn-shimmer inline-flex items-center justify-center gap-2 mt-5 text-white text-[15px] font-semibold py-3.5 px-7 rounded-full shadow-[0_4px_14px_rgba(212,42,42,0.4)] transition-transform active:scale-[0.97]"
        >
          Book a Consultation
        </button>
      </div>
    </section>
  )
}
