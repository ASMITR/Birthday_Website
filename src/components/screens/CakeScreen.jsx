"use client"

import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import confetti from "canvas-confetti"
import { Flame, MoveRight } from "lucide-react"
import Button from "../Button"

const confettiColors = ["#a78bfa", "#7c3aed", "#ddd6fe", "#c4b5fd", "#f0abfc"]

const sparkles = [
    { id: 1, emoji: "✨", x: "8%",  y: "12%", delay: 0,   dur: 2.4 },
    { id: 2, emoji: "⭐", x: "82%", y: "8%",  delay: 0.5, dur: 2.8 },
    { id: 3, emoji: "🌟", x: "48%", y: "4%",  delay: 1.0, dur: 2.2 },
    { id: 4, emoji: "✨", x: "18%", y: "55%", delay: 1.4, dur: 2.6 },
    { id: 5, emoji: "⭐", x: "76%", y: "50%", delay: 0.7, dur: 3.0 },
    { id: 6, emoji: "🌟", x: "90%", y: "30%", delay: 1.8, dur: 2.3 },
]

export default function CakeScreen({ onNext }) {
    const [lit, setLit] = useState(false)
    const [blowing, setBlowing] = useState(false)

    const lightCandle = () => {
        if (lit) return
        setBlowing(true)
        setTimeout(() => {
            setBlowing(false)
            setLit(true)
            setTimeout(() => burst(), 600)
        }, 700)
    }

    const burst = () => {
        confetti({ particleCount: 120, spread: 100, origin: { y: 0.55 }, colors: confettiColors })
        setTimeout(() => confetti({ particleCount: 60, angle: 60,  spread: 70, origin: { x: 0, y: 0.65 }, colors: confettiColors }), 300)
        setTimeout(() => confetti({ particleCount: 60, angle: 120, spread: 70, origin: { x: 1, y: 0.65 }, colors: confettiColors }), 300)
    }

    return (
        <div className="w-full min-h-screen flex flex-col items-center justify-center px-6 py-12 gap-8">

            {/* Title */}
            <AnimatePresence mode="wait">
                {lit ? (
                    <motion.div
                        key="lit-title"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.5 }}
                        className="text-center"
                    >
                        <p className="text-xs font-semibold tracking-widest text-primary/60 uppercase">🎊 Wishing you</p>
                        <h2 className="text-3xl md:text-5xl font-bold text-primary leading-tight mt-1">
                            Happy Birthday,<br />Cutiepiee! 🎂
                        </h2>
                    </motion.div>
                ) : (
                    <motion.div key="unlit-title" exit={{ opacity: 0 }} className="text-center">
                        <p className="text-xs font-semibold tracking-widest text-primary/50 uppercase mb-2">Make it special</p>
                        <h2 className="text-3xl md:text-4xl font-bold text-primary">Light the Candle 🕯️</h2>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Cake stage */}
            <div
                className="relative w-full max-w-sm h-72 md:h-80 rounded-[40px] flex items-end justify-center pb-8 overflow-hidden shadow-2xl"
                style={{ background: "linear-gradient(to bottom, #1a0a2e 0%, #2d1b4e 40%, #4a2c6e 70%, #e9d5ff 100%)" }}
            >
                {[...Array(18)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-1 h-1 rounded-full bg-white"
                        style={{ left: `${(i * 37 + 5) % 95}%`, top: `${(i * 23 + 3) % 55}%` }}
                        animate={{ opacity: [0.2, 1, 0.2], scale: [0.8, 1.3, 0.8] }}
                        transition={{ duration: 1.5 + (i % 4) * 0.5, delay: i * 0.15, repeat: Infinity }}
                    />
                ))}

                <AnimatePresence>
                    {lit && (
                        <motion.div
                            className="absolute bottom-0 left-1/2 -translate-x-1/2 w-64 h-24 rounded-full"
                            style={{ background: "radial-gradient(ellipse, rgba(167,139,250,0.4) 0%, transparent 70%)" }}
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 1 }}
                        />
                    )}
                </AnimatePresence>

                <AnimatePresence>
                    {!lit && sparkles.map(s => (
                        <motion.span
                            key={s.id}
                            className="absolute text-base pointer-events-none select-none"
                            style={{ left: s.x, top: s.y }}
                            initial={{ opacity: 0, y: 0, scale: 0.5 }}
                            animate={{ opacity: [0, 1, 0], y: [-5, -16, -5], scale: [0.5, 1.1, 0.5] }}
                            transition={{ duration: s.dur, delay: s.delay, repeat: Infinity, ease: "easeInOut" }}
                            exit={{ opacity: 0, transition: { duration: 0.3 } }}
                        >
                            {s.emoji}
                        </motion.span>
                    ))}
                </AnimatePresence>

                <div className="relative z-10">
                    <Cake lit={lit} blowing={blowing} />
                </div>
            </div>

            {/* Button */}
            <AnimatePresence mode="wait">
                {!lit ? (
                    <motion.div key="light" exit={{ opacity: 0, scale: 0.8 }} transition={{ duration: 0.4 }}>
                        <Button onClick={lightCandle} className="bg-gradient-to-r from-violet-500 to-purple-600 text-white shadow-lg shadow-violet-300">
                            <Flame size={18} /> Light the Candle
                        </Button>
                    </motion.div>
                ) : (
                    <motion.div key="next" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, delay: 2 }}>
                        <Button onClick={onNext} className="bg-gradient-to-r from-violet-500 to-purple-600 text-white shadow-lg shadow-violet-300">
                            Next <MoveRight size={18} />
                        </Button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

function Cake({ lit, blowing }) {
    return (
        <div className="flex flex-col items-center">
            <div className="cake">
                <div className="plate"></div>
                <div className="layer layer-bottom"></div>
                <div className="layer layer-middle"></div>
                <div className="layer layer-top"></div>
                <div className="icing"></div>
                <div className="drip drip1"></div>
                <div className="drip drip2"></div>
                <div className="drip drip3"></div>
                <div className="candle">
                    <AnimatePresence>
                        {blowing && (
                            <motion.div key="smoke" className="smoke"
                                initial={{ opacity: 0.8, scaleX: 0.5, y: 0 }}
                                animate={{ opacity: 0, scaleX: 1.8, y: -30 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.7, ease: "easeOut" }}
                            />
                        )}
                    </AnimatePresence>
                    {lit && (
                        <motion.div key="flame" className="flame"
                            initial={{ opacity: 0, scaleY: 0.2, y: 10 }}
                            animate={{ opacity: 1, scaleY: 1, y: 0 }}
                            transition={{ duration: 0.9, ease: [0.25, 0.1, 0.25, 1.0] }}
                        />
                    )}
                </div>
            </div>
        </div>
    )
}
