import { useRef } from 'react'
import Slide from './Slide'

const slides = [
  {
    id: 1,
    title: 'Corte estándar',
    image: 'images/servicios/corte-estandar.webp',
    price: 8,
    description: 'Corte de pelo estándar con tijera y/o máquina.'
  },
  {
    id: 2,
    title: 'Arreglo de barba',
    image: 'images/servicios/arreglo-barba.webp',
    price: 4,
    description: 'Dale un aspecto pulido y bien cuidado a tu barba.'
  },
  {
    id: 3,
    title: 'Corte niño y jubilado',
    image: 'images/servicios/corte-niño-jubilado.webp',
    price: 7,
    description:
      'Atendemos a clientes de todas las edades, con un descuento especial para niños y personas mayores.'
  },
  {
    id: 4,
    title: 'Afeitado premium',
    image: 'images/servicios/afeitado-premium.webp',
    price: 7,
    description:
      'Afeitado con vapor, para una piel suave y sin irritaciones, y un acabado perfecto.'
  },
  {
    id: 5,
    title: 'Servicio premium',
    image: 'images/servicios/servicio-premium.webp',
    price: 25,
    description:
      'Todo lo que necesitas para estar a punto. Corte, afeitado, arreglo de barba, masaje de cabeza y mascarilla facial.'
  },
  {
    id: 6,
    title: 'Mascarillas faciales',
    image: 'images/servicios/mascarillas-faciales.webp',
    price: 6,
    description:
      'Ofrecemos diferentes mascarillas faciales para un cuidado completo.'
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
        className="hideScrollbar flex h-full items-center gap-2 overflow-y-hidden overflow-x-scroll">
        {slides.map((slide) => (
          <Slide slide={slide} key={slide.id} />
        ))}
      </ul>
      <button
        className="absolute -left-12 top-1/2 hidden -translate-y-1/2 md:block"
        onClick={() => handleScroll('prev')}>
        <img
          src="icons/left.svg"
          alt="Deslizar a la izquierda"
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
          alt="Deslizar a la derecha"
          height={32}
          width={32}
          className="rounded-full bg-zinc-300/50 transition-all hover:bg-zinc-300/100"
        />
      </button>
    </div>
  )
}
