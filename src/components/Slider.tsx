import { useState, useRef, useEffect } from 'react'

const slides = [
  {
    id: 1,
    title: 'Corte niño y jubilado',
    image: 'https://via.placeholder.com/150'
  },
  {
    id: 2,
    title: 'Corte estándar',
    image: 'https://via.placeholder.com/150'
  },
  {
    id: 3,
    title: 'Arreglo de barba',
    image: 'https://via.placeholder.com/150'
  },
  {
    id: 4,
    title: 'Corte + Arreglo de barba',
    image: 'https://via.placeholder.com/150'
  },
  {
    id: 5,
    title: 'Afeitado premium',
    image: 'https://via.placeholder.com/150'
  },
  {
    id: 6,
    title: 'Servicio premium',
    image: 'https://via.placeholder.com/150'
  },
  {
    id: 7,
    title: 'Mascarillas faciales',
    image: 'https://via.placeholder.com/150'
  }
]

export default function Slider() {
  const sliderRef = useRef<HTMLUListElement>(null)
  const [currentSlide, setCurrentSlide] = useState(0)

  const handleNextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1)
      return
    }
    setCurrentSlide(0)
  }

  const handlePrevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1)
      return
    }
    setCurrentSlide(slides.length - 1)
  }

  useEffect(() => {
    if (sliderRef.current) {
      const nextScrollWidth = currentSlide * 288 + 8 * currentSlide

      sliderRef.current.scrollTo({
        left: nextScrollWidth,
        behavior: 'smooth'
      })
    }
  }, [currentSlide])

  return (
    <div className="relative mx-auto mt-10 h-60 max-w-screen-md select-none overflow-hidden rounded-sm">
      <ul
        ref={sliderRef}
        className="hideScrollbar flex h-full items-center gap-2 overflow-x-scroll">
        {slides.map((slide, i) => (
          <li
            key={i}
            className="relative h-60 w-72 flex-shrink-0 overflow-hidden rounded-sm text-center">
            <h3 className="absolute top-0 w-full p-4">{slide.title}</h3>
            <img
              loading="lazy"
              src={slide.image}
              alt={slide.title}
              width={288}
              height={10}
              className="pointer-events-none h-60 object-cover"
            />
          </li>
        ))}
      </ul>
      <div className="absolute top-1/2 flex w-full -translate-y-1/2 justify-between px-2 text-hb-dark">
        <button
          onClick={handlePrevSlide}
          className="h-10 w-10 rounded-full bg-zinc-300/50">
          &#8617;
        </button>
        <button
          onClick={handleNextSlide}
          className="h-10 w-10 rounded-full bg-zinc-300/50">
          &#8618;
        </button>
      </div>
    </div>
  )
}
