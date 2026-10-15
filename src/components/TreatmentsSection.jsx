import { useScrollReveal } from '../hooks/useScrollReveal'

import laserImg from '../assets/laser.jpg'
import microImg from '../assets/microneedling.jpg'
import peelImg  from '../assets/chemical-peels.jpg'
import prpImg   from '../assets/prp.jpg'

const treatments = [
  {
    emoji: '🔴',
    title: 'Laser Skin Resurfacing',
    lines: [
      'Solution: Uses laser technology to remove damaged skin layers and stimulate collagen production for smoother, more youthful skin.',
      'Benefits: Reduces wrinkles, fine lines, sun spots, and acne scars while improving overall skin texture and tone.',
    ],
    img: laserImg,
    accent: '#ef4444',
    tag: 'Advanced Tech',
  },
  {
    emoji: '🟠',
    title: 'Microneedling (Dermaroller Therapy)',
    lines: [
      'Solution: Tiny needles are used to create micro-injuries in the skin, which trigger the body’s healing process and boost collagen production.',
      'Benefits: Reduces the appearance of fine lines, wrinkles, acne scars, and hyperpigmentation, leading to firmer, more even-toned skin.',
    ],
    img: microImg,
    accent: '#f97316',
    tag: 'Skin Renewal',
  },
  {
    emoji: '🟡',
    title: 'Chemical Peels',
    lines: [
      'Solution: A chemical solution is applied to exfoliate the outer layers of skin, revealing fresh, youthful skin underneath.',
      'Benefits: Treats acne, dark spots, sun damage, and signs of aging while improving skin texture and brightness.',
    ],
    img: peelImg,
    accent: '#eab308',
    tag: 'Deep Exfoliation',
  },
  {
    emoji: '🟢',
    title: 'PRP Skin Rejuvenation',
    lines: [
      'Solution: Uses your own blood’s platelets to promote cell regeneration and collagen production for skin rejuvenation.',
      'Benefits: Reduces fine lines, enhances skin texture, and promotes natural healing and youthful skin.',
    ],
    img: prpImg,
    accent: '#22c55e',
    tag: 'Natural Healing',
  },
]

export default function TreatmentsSection() {
  const listRef = useScrollReveal()

  return (
    <section id="treatments" className="px-4 py-7 bg-gray-50 scroll-mt-20">
      {/* Heading */}
      <h2 className="text-[20px] font-extrabold text-gray-900 text-center mb-1">
        Our Advanced <span className="text-red-700">Skin Solutions</span>
      </h2>
      <p className="text-[12px] text-gray-400 text-center mb-4">
        Clinically proven treatments by expert dermatologists
      </p>

      <div ref={listRef} className="reveal-stagger flex flex-col gap-4">
        {treatments.map((t) => {
          const sectionId = t.title.toLowerCase().includes('laser') ? 'laser' : 
                            t.title.toLowerCase().includes('micro') ? 'micro' :
                            t.title.toLowerCase().includes('peel') ? 'peels' :
                            t.title.toLowerCase().includes('prp') ? 'prp-skin' : undefined;
          return (
            <div key={t.title} id={sectionId} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 scroll-mt-24">
              {/* Image area */}
              {t.img ? (
                <img src={t.img} alt={t.title} loading="lazy" decoding="async" className="w-full h-[180px] object-cover" />
              ) : (
                <div
                  className="w-full h-[150px] flex items-center justify-center text-[48px]"
                  style={{ background: `${t.accent}12` }}
                >
                  {t.emoji}
                </div>
              )}

              {/* Body */}
              <div className="px-4 pt-3 pb-4">
                {/* Tag + title row */}
                <div className="flex items-center gap-2 mb-2">
                  <span
                    className="text-[10px] font-bold px-2 py-0.5 rounded-full text-white"
                    style={{ background: t.accent }}
                  >
                    {t.tag}
                  </span>
                </div>
                <h3 className="text-[15px] font-bold text-gray-900 mb-2">
                  {t.emoji} {t.title}
                </h3>
                {t.lines.map((line, i) => (
                  <p key={i} className="text-[12px] text-gray-500 mb-2 leading-relaxed">{line}</p>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  )
}
