import { useState } from 'react'

type Slide = {
  id: number
  title: string
  image: string
  price: number
  description: string
}

export default function Slide({ slide }: { slide: Slide }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <li
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
      className="relative h-full w-52 flex-shrink-0 text-center font-body">
      <div
        className={`absolute flex h-full w-full flex-col gap-4 bg-hb-dark/80 p-4 backdrop-blur-sm transition-all duration-500 
        ${isOpen ? 'top-0 pt-10' : 'top-[235px]'}`}>
        <h3 className="font-bold">{slide.title}</h3>
        <p>{slide.description}</p>
      </div>
      <button
        className={`absolute top-0 left-0 m-1 rounded-full bg-zinc-200/70 backdrop-blur-sm transition-all sm:hidden 
        ${isOpen ? 'opacity-0' : 'opacity-100'}`}>
        <img
          src="icons/info.svg"
          alt="Más información"
          width={28}
          height={28}
          className="pointer-events-none"
        />
      </button>
      <p className="absolute top-0 right-0 m-1 rounded-full bg-hb-dark/50 p-1 px-2 text-sm font-bold text-yellow-300 backdrop-blur-sm">
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
  )
}
