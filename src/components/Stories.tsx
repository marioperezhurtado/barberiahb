import { useState, useRef, useEffect } from 'react'

const STORIES = [
  { src: 'ig-story-barberia-hb-1.mp4', duration: 54 },
  { src: 'ig-story-barberia-hb-2.mp4', duration: 61 },
  { src: 'ig-story-barberia-hb-3.mp4', duration: 13 },
  { src: 'ig-story-barberia-hb-4.mp4', duration: 0 }
]

export default function Stories() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [currentStory, setCurrentStory] = useState(0)
  const [timer, setTimer] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [isMuted, setIsMuted] = useState(true)

  const handlePrevStory = () => {
    if (currentStory === 0) {
      setCurrentStory(STORIES.length - 1)
    } else {
      setCurrentStory(currentStory - 1)
    }
    setIsPaused(false)
    setTimer(0)
  }

  const handleNextStory = () => {
    if (currentStory === STORIES.length - 1) {
      setCurrentStory(0)
    } else {
      setCurrentStory(currentStory + 1)
    }
    setIsPaused(false)
    setTimer(0)
  }

  const handleTogglePauseResume = () => setIsPaused((p) => !p)
  const handleToggleMuteUnmute = () => setIsMuted((m) => !m)

  // Timer interval
  useEffect(() => {
    if (!videoRef.current) return

    const interval = setInterval(() => {
      if (isPaused) return
      setTimer((p) => p + 1)
    }, 1000)

    return () => clearInterval(interval)
  }, [isPaused])

  // Play / Pause
  useEffect(() => {
    if (!videoRef.current) return
    if (isPaused) {
      videoRef.current.pause()
      return
    }
    videoRef.current.play()
  }, [isPaused])

  // Mute / Unmute
  useEffect(() => {
    if (!videoRef.current) return
    if (isMuted) {
      videoRef.current.muted = true
      return
    }
    videoRef.current.muted = false
  }, [isMuted])

  console.log(Math.round((timer / STORIES[0].duration) * 100))

  return (
    <div className="group relative mx-auto h-96 w-52 overflow-hidden rounded-2xl">
      <div className="absolute top-0 h-12 w-full bg-gradient-to-b from-black opacity-0 transition-all group-hover:opacity-70" />
      <ul className="absolute top-1 right-1/2 mx-auto flex w-fit translate-x-1/2 gap-2">
        <li className="relative h-1 w-10 overflow-hidden rounded-sm">
          <div className="absolute top-0 h-1 w-full bg-zinc-300 opacity-50" />
          {currentStory > 0 && (
            <div className="absolute top-0 h-1 w-full bg-hb-light opacity-70" />
          )}
          {currentStory === 0 && (
            <div
              className="absolute top-0 h-1 bg-hb-light opacity-70 transition-all"
              style={{
                width: `${(timer / STORIES[0].duration) * 100}%`
              }}
            />
          )}
        </li>
        <li className="relative h-1 w-10 overflow-hidden rounded-sm">
          <div className="absolute top-0 h-1 w-full bg-zinc-300 opacity-50" />
          {currentStory > 1 && (
            <div className="absolute top-0 h-1 w-full bg-hb-light opacity-70" />
          )}
          {currentStory === 1 && (
            <div
              className="absolute top-0 h-1 bg-hb-light opacity-70 transition-all"
              style={{
                width: `${(timer / STORIES[0].duration) * 100}%`
              }}
            />
          )}
        </li>
        <li className="relative h-1 w-10 overflow-hidden rounded-sm">
          <div className="absolute top-0 h-1 w-full bg-zinc-300 opacity-50" />
          {currentStory > 2 && (
            <div className="absolute top-0 h-1 w-full bg-hb-light opacity-70" />
          )}
          {currentStory === 2 && (
            <div
              className="absolute top-0 h-1 bg-hb-light opacity-70 transition-all"
              style={{
                width: `${(timer / STORIES[0].duration) * 100}%`
              }}
            />
          )}
        </li>
        <li className="relative h-1 w-10 overflow-hidden rounded-sm">
          <div className="absolute top-0 h-1 w-full bg-zinc-300 opacity-50" />
          {currentStory > 3 && (
            <div className="absolute top-0 h-1 w-full bg-hb-light opacity-70" />
          )}
          {currentStory === 3 && (
            <div
              className="absolute top-0 h-1 bg-hb-light opacity-70 transition-all"
              style={{
                width: `${(timer / STORIES[0].duration) * 100}%`
              }}
            />
          )}
        </li>
      </ul>
      <video
        ref={videoRef}
        src={`ig-stories/${STORIES[currentStory].src}`}
        onEnded={handleNextStory}
        autoPlay
        muted
        playsInline
        className="h-full object-cover"
      />
      <div
        onClick={handlePrevStory}
        className="absolute left-0 top-0 h-full w-14"
      />
      <div
        onClick={handleTogglePauseResume}
        className="absolute right-1/2 top-0 h-full w-24 translate-x-1/2 "
      />
      <div
        onClick={handleNextStory}
        className="absolute right-0 top-0 h-full w-14"
      />
      {isMuted && (
        <img
          onClick={handleToggleMuteUnmute}
          src="icons/muted.svg"
          alt="Unmute instagram story"
          className="absolute top-4 left-3 w-5 opacity-0 transition-all group-hover:opacity-80"
        />
      )}
      {!isMuted && (
        <img
          onClick={handleToggleMuteUnmute}
          src="icons/unmuted.svg"
          alt="Mute instagram story"
          className="absolute top-4 left-3 w-5 opacity-0 transition-all group-hover:opacity-80"
        />
      )}
    </div>
  )
}
