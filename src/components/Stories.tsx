import { useState, useRef, useEffect } from 'react'
import stories from '../content/stories.json'

export default function Stories() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [currentStory, setCurrentStory] = useState(0)
  const [timer, setTimer] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [isMuted, setIsMuted] = useState(true)

  const handlePrevStory = () => {
    if (currentStory === 0) {
      setCurrentStory(stories.length - 1)
      setTimer(0)
      return
    }
    setCurrentStory(currentStory - 1)
    setTimer(0)
  }

  const handleNextStory = () => {
    if (currentStory === stories.length - 1) {
      setCurrentStory(0)
      setTimer(0)
      return
    }
    setCurrentStory(currentStory + 1)
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

  // New source (made to fix safari :/)
  useEffect(() => {
    setTimer(0)

    if (!videoRef.current) return
    videoRef.current.load()
  }, [currentStory])

  return (
    <div className="group relative mx-auto h-96 w-52 overflow-hidden rounded-2xl bg-zinc-700">
      <div className="absolute top-0 h-12 w-full bg-gradient-to-b from-black opacity-70 transition-all group-hover:opacity-70 sm:opacity-0" />
      <ul className="absolute top-1 right-1/2 mx-auto flex w-fit translate-x-1/2 gap-2">
        <Progress currentStory={currentStory} timer={timer} storyIndex={0} />
        <Progress currentStory={currentStory} timer={timer} storyIndex={1} />
        <Progress currentStory={currentStory} timer={timer} storyIndex={2} />
        <Progress currentStory={currentStory} timer={timer} storyIndex={3} />
      </ul>
      <video
        ref={videoRef}
        onEnded={handleNextStory}
        poster={stories[currentStory].poster}
        autoPlay
        muted
        playsInline
        className="h-full object-cover">
        <source src={`${stories[currentStory].src}.webm`} type="video/webm" />
        <source src={`${stories[currentStory].src}.mp4`} type="video/mp4" />
      </video>
      <div
        onClick={handlePrevStory}
        className="absolute top-0 left-0 h-full w-14"
      />
      <div
        onClick={handleTogglePauseResume}
        className="absolute top-0 right-1/2 h-full w-24 translate-x-1/2 "
      />
      <div
        onClick={handleNextStory}
        className="absolute top-0 right-0 h-full w-14"
      />
      {isMuted && (
        <img
          onClick={handleToggleMuteUnmute}
          src="icons/muted.svg"
          alt="Unmute instagram story"
          className="absolute top-2 left-1 w-9 p-2 opacity-80 transition-all group-hover:opacity-80 sm:opacity-0"
        />
      )}
      {!isMuted && (
        <img
          onClick={handleToggleMuteUnmute}
          src="icons/unmuted.svg"
          alt="Mute instagram story"
          className="absolute top-2 left-1 w-9 p-2 opacity-80 transition-all group-hover:opacity-80 sm:opacity-0"
        />
      )}
    </div>
  )
}

type ProgressProps = {
  currentStory: number
  timer: number
  storyIndex: number
}

function Progress({ currentStory, timer, storyIndex }: ProgressProps) {
  return (
    <li className="relative h-1 w-10 overflow-hidden rounded-sm">
      <div className="absolute top-0 h-1 w-full bg-zinc-300 opacity-50" />
      {currentStory > storyIndex && (
        <div className="absolute top-0 h-1 w-full bg-hb-light opacity-70" />
      )}
      {currentStory === storyIndex && (
        <div
          className="absolute top-0 h-1 bg-hb-light opacity-70 transition-all"
          style={{
            width: `${(timer / stories[storyIndex].duration) * 100}%`
          }}
        />
      )}
    </li>
  )
}
