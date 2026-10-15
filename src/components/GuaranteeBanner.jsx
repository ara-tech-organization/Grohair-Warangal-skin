import guaranteeImg from '../assets/Guarantee.png'

export default function GuaranteeBanner() {
  return (
    <div className="w-full bg-white">
      <img
        src={guaranteeImg}
        alt="Guarantee"
        loading="lazy"
        decoding="async"
        className="w-full object-contain"
      />
    </div>
  )
}
