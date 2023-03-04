import { useRef } from 'react'
import Slide from './Slide'
import servicios from '../content/servicios.json'

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

    console.log(newScroll, maxScroll)

    if (newScroll < 0 || newScroll > maxScroll) {
      sliderRef.current.scrollTo({ left: jumpTo, behavior: 'smooth' })
      return
    }
    sliderRef.current.scrollTo({ left: newScroll, behavior: 'smooth' })
  }

  return (
    <div className="relative mx-auto mt-10 h-72 w-full max-w-sm select-none xs:max-w-lg md:max-w-screen-sm">
      <ul
        ref={sliderRef}
        className="hideScrollbar flex h-full items-center gap-2 overflow-y-hidden overflow-x-scroll">
        {servicios.map((s, i) => (
          <Slide slide={s} key={i} />
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
