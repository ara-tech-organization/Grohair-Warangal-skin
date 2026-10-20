import beforeImg from '../assets/h1.png'
import afterImg from '../assets/h1-1.png'

export default function RealResults() {
  return (
    <section className="px-4 py-7 bg-white">
      <h2 className="text-[22px] font-bold text-gray-900 text-center mb-1">Real Results</h2>
      <p className="text-[13px] text-gray-500 text-center mb-5">Visible transformations of our patients</p>

      {/* Before / After */}
      <div className="flex gap-2 mb-5">
        <div className="flex-1 relative rounded-xl overflow-hidden">
          <img src={beforeImg} alt="Before" loading="lazy" decoding="async" className="w-full h-[160px] object-cover" />
          <span className="absolute bottom-0 left-0 bg-black/60 text-white text-[10px] font-bold px-2 py-1 tracking-widest">
            BEFORE
          </span>
        </div>
        <div className="flex-1 relative rounded-xl overflow-hidden">
          <img src={afterImg} alt="After" loading="lazy" decoding="async" className="w-full h-[160px] object-cover" />
          <span className="absolute bottom-0 right-0 bg-red-700/90 text-white text-[10px] font-bold px-2 py-1 tracking-widest">
            AFTER
          </span>
        </div>
      </div>

      {/* Testimonial */}
      <div className="bg-gray-50 rounded-xl px-4 py-4 border-l-4 border-red-700 text-center">
        <div className="text-yellow-500 text-base tracking-widest mb-2">★★★★★</div>
        <p className="text-[13px] text-gray-700 leading-relaxed italic mb-2">
          "I saw significant hair regrowth within 3 months of GFC treatment. Highly recommend the experts here!"
        </p>
        <p className="text-[12px] font-bold text-gray-900">- Ramesh Kumar, Warangal</p>
      </div>
    </section>
  )
}
