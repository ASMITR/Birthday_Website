"use client"

import { useState, useRef, useEffect } from "react"
import { AnimatePresence, motion } from "framer-motion"
import LoaderScreen from "@/components/screens/LoaderScreen"
import IntroScreen from "@/components/screens/IntroScreen"
import CakeScreen from "@/components/screens/CakeScreen"
import PhotosScreen from "@/components/screens/PhotosScreen"
import ReasonsScreen from "@/components/screens/ReasonsScreen"
import WishScreen from "@/components/screens/WishScreen"
import MessageScreen from "@/components/screens/MessageScreen"

const particles = [
  { id: 1,  emoji: "🎈", x: "5%",   dur: 7,   delay: 0,   size: "text-3xl" },
  { id: 2,  emoji: "✨", x: "15%",  dur: 5,   delay: 1,   size: "text-xl"  },
  { id: 3,  emoji: "🎀", x: "25%",  dur: 8,   delay: 2,   size: "text-2xl" },
  { id: 4,  emoji: "⭐", x: "35%",  dur: 6,   delay: 0.5, size: "text-lg"  },
  { id: 5,  emoji: "🎂", x: "45%",  dur: 9,   delay: 1.5, size: "text-3xl" },
  { id: 6,  emoji: "🌟", x: "55%",  dur: 5.5, delay: 3,   size: "text-xl"  },
  { id: 7,  emoji: "🎁", x: "65%",  dur: 7.5, delay: 0.8, size: "text-2xl" },
  { id: 8,  emoji: "✨", x: "75%",  dur: 6.5, delay: 2.5, size: "text-lg"  },
  { id: 9,  emoji: "🎈", x: "85%",  dur: 8.5, delay: 1.2, size: "text-3xl" },
  { id: 10, emoji: "💛", x: "92%",  dur: 5,   delay: 3.5, size: "text-xl"  },
  { id: 11, emoji: "🌟", x: "10%",  dur: 7,   delay: 4,   size: "text-2xl" },
  { id: 12, emoji: "🎀", x: "70%",  dur: 6,   delay: 2.2, size: "text-lg"  },
]

export default function HomePage() {
  const [currentScreen, setCurrentScreen] = useState(0)
  const [playing, setPlaying] = useState(false)
  const audioRef = useRef(null)

  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = 0.5
  }, [])

  const playMusic = () => {
    const audio = audioRef.current
    if (!audio) return
    audio.play().catch(() => {})
    setPlaying(true)
  }

  const toggleMusic = () => {
    const audio = audioRef.current
    if (!audio) return
    if (playing) {
      audio.pause()
    } else {
      audio.play().catch(() => {})
    }
    setPlaying(p => !p)
  }

  const screens = [
    <LoaderScreen key="loader" onDone={() => { setCurrentScreen(1); playMusic() }} />,
    <IntroScreen key="intro" onNext={() => setCurrentScreen(2)} />,
    <CakeScreen key="cake" onNext={() => setCurrentScreen(3)} />,
    <PhotosScreen key="photos" onNext={() => setCurrentScreen(4)} />,
    <ReasonsScreen key="reasons" onNext={() => setCurrentScreen(5)} />,
    <WishScreen key="wish" onNext={() => setCurrentScreen(6)} />,
    <MessageScreen key="message" onReplay={() => setCurrentScreen(0)} />,
  ]

  return (
    <main className="min-h-screen overflow-hidden relative">

      {/* Floating background decorations */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {particles.map(p => (
          <motion.span
            key={p.id}
            className={`absolute ${p.size} select-none`}
            style={{ left: p.x, bottom: "-10%" }}
            animate={{ y: ["-10vh", "-110vh"], x: ["0px", "20px", "-20px", "0px"], opacity: [0, 1, 1, 0] }}
            transition={{ duration: p.dur, delay: p.delay, repeat: Infinity, ease: "easeInOut" }}
          >
            {p.emoji}
          </motion.span>
        ))}
      </div>

      <div className={`relative z-10 flex min-h-screen items-center justify-center ${currentScreen === 1 ? '' : 'p-4 md:p-6'}`}>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentScreen}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1, transition: { duration: 1 } }}
            exit={{ opacity: 0, transition: { duration: 0.8 } }}
            transition={{ duration: 0.8 }}
            className="flex items-center justify-center w-full"
          >
            {screens[currentScreen]}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Background audio */}
      <audio ref={audioRef} src="/music/Music.mp3" loop preload="auto" />

      {/* Music toggle */}
      <AnimatePresence>
        {currentScreen > 0 && (
          <motion.button
            initial={{ x: -60, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -60, opacity: 0 }}
            transition={{ duration: 0.6 }}
            onClick={toggleMusic}
            className="fixed bottom-4 left-4 z-50 w-11 h-11 rounded-full bg-white/80 backdrop-blur-sm shadow-lg flex items-center justify-center text-xl border border-violet-200 hover:scale-110 active:scale-95 transition-transform duration-200"
            title={playing ? "Pause music" : "Play music"}
          >
            {playing ? "🔊" : "🔇"}
          </motion.button>
        )}
      </AnimatePresence>

      {/* Watermark */}
      <motion.div
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="fixed bottom-4 right-4 text-sm text-black/40 pointer-events-none z-50 font-light">
        @ASMITR
      </motion.div>
    </main>
  )
}
