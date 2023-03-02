import { useState, useRef, useEffect } from 'react'

const slides = [
  {
    id: 1,
    title: 'Corte estándar',
    image: 'images/servicios/corte-estandar.jpg',
    price: 8
  },
  {
    id: 2,
    title: 'Arreglo de barba',
    image: 'images/servicios/arreglo-barba.jpeg',
    price: 4
  },
  {
    id: 3,
    title: 'Afeitado premium',
    image: 'https://placekitten.com/200/300',
    price: 7
  },
  {
    id: 4,
    title: 'Servicio premium',
    image: 'https://placekitten.com/200/300',
    price: 25
  },
  {
    id: 5,
    title: 'Corte niño y jubilado',
    image: 'https://placekitten.com/200/300',
    price: 7
  },
  {
    id: 6,
    title: 'Mascarillas faciales',
    image: 'https://placekitten.com/200/300',
    price: 6
  }
]

export default function Slider() {
  const sliderRef = useRef<HTMLUListElement>(null)

  const handleScroll = (direction: 'next' | 'prev') => {
    if (!sliderRef.current) return

    const currentScroll = sliderRef.current.scrollLeft
    const maxScroll = sliderRef.current.clientWidth

    const slideWidth = sliderRef.current.firstElementChild?.clientWidth
    if (!slideWidth) return

    const newScroll =
      currentScroll + (direction === 'next' ? +slideWidth + 8 : -slideWidth - 8)
    const jumpTo = direction === 'next' ? 0 : maxScroll

    if (newScroll < -8 || newScroll > maxScroll + 8) {
      sliderRef.current.scrollTo({ left: jumpTo, behavior: 'smooth' })
      return
    }
    sliderRef.current.scrollTo({ left: newScroll, behavior: 'smooth' })
  }

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
            <p className="absolute top-0 right-0 m-1 rounded-full bg-hb-dark/50 p-1 font-bold text-yellow-300">
              {slide.price}€
            </p>

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
        onClick={() => handleScroll('prev')}>
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
        onClick={() => handleScroll('next')}>
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
