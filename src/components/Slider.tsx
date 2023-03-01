import { useState, useRef, useEffect } from 'react'

const slides = [
  {
    id: 1,
    title: 'Corte estándar',
    image: 'images/servicios/corte-estandar.jpg'
  },
  {
    id: 2,
    title: 'Arreglo de barba',
    image: 'images/servicios/arreglo-barba.jpeg'
  },
  {
    id: 3,
    title: 'Afeitado premium',
    image: 'https://placekitten.com/200/300'
  },
  {
    id: 4,
    title: 'Servicio premium',
    image: 'https://placekitten.com/200/300'
  },
  {
    id: 5,
    title: 'Corte niño y jubilado',
    image: 'https://placekitten.com/200/300'
  },
  {
    id: 6,
    title: 'Mascarillas faciales',
    image: 'https://placekitten.com/200/300'
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
      const width = sliderRef.current.firstElementChild?.clientWidth
      if (!width) return

      sliderRef.current.scrollTo({
        left: currentSlide * width + 8 * currentSlide,
        behavior: 'smooth'
      })
    }
  }, [currentSlide])

  return (
    <div className="relative mx-auto mt-10 h-72 w-72 max-w-full select-none md:w-full md:max-w-screen-sm">
      <ul
        ref={sliderRef}
        className="hideScrollbar flex h-full items-center gap-2 overflow-x-scroll">
        {slides.map((slide, i) => (
          <li
            key={i}
            className="relative h-full w-52 flex-shrink-0 text-center">
            <h3 className="absolute bottom-0 h-fit w-full bg-hb-dark/80 p-4 font-semibold backdrop-blur-sm">
              {slide.title}
            </h3>
            <img
              loading="lazy"
              src={slide.image}
              alt={slide.title}
              width={288}
              height={10}
              className="pointer-events-none h-full w-full object-cover"
            />
          </li>
        ))}
      </ul>
      <button
        className="absolute -left-12 top-1/2 hidden -translate-y-1/2 md:block"
        onClick={handlePrevSlide}>
        <img
          src="icons/left.svg"
          alt="Slide left"
          height={32}
          width={32}
          className="rounded-full bg-zinc-300/50 transition-all hover:bg-zinc-300/100"
        />
      </button>
      <button
        className="absolute -right-12 top-1/2 hidden -translate-y-1/2 md:block"
        onClick={handleNextSlide}>
        <img
          src="icons/right.svg"
          alt="Slide right"
          height={32}
          width={32}
          className="rounded-full bg-zinc-300/50 transition-all hover:bg-zinc-300/100"
        />
      </button>
    </div>
  )
}
