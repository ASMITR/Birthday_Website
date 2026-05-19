"use client"

import { useState, useEffect } from "react"
import { AnimatePresence, motion } from "framer-motion"
import confetti from "canvas-confetti"
import { MoveRight, Sparkles } from "lucide-react"
import Button from "../Button"

const STEPS = ["close", "think", "wish"]

const floatingStars = Array.from({ length: 22 }, (_, i) => ({
    id: i,
    x: `${(i * 41 + 7) % 94}%`,
    y: `${(i * 29 + 5) % 80}%`,
    size: i % 3 === 0 ? 5 : i % 3 === 1 ? 3 : 4,
    dur: 1.8 + (i % 5) * 0.4,
    delay: i * 0.18,
}))

const shootingStars = [
    { id: 1, x1: "10%", y1: "15%", angle: 35, delay: 1.2 },
    { id: 2, x1: "60%", y1: "8%",  angle: 25, delay: 3.5 },
    { id: 3, x1: "30%", y1: "20%", angle: 40, delay: 6.0 },
]

function burst() {
    const colors = ["#a78bfa", "#7c3aed", "#ddd6fe", "#c4b5fd", "#f0abfc", "#fff"]
    confetti({ particleCount: 160, spread: 130, origin: { y: 0.5 }, colors })
    setTimeout(() => confetti({ particleCount: 80, angle: 60,  spread: 90, origin: { x: 0,   y: 0.6 }, colors }), 350)
    setTimeout(() => confetti({ particleCount: 80, angle: 120, spread: 90, origin: { x: 1,   y: 0.6 }, colors }), 350)
    setTimeout(() => confetti({ particleCount: 60, spread: 80,  origin: { y: 0.3 }, colors }), 700)
}

export default function WishScreen({ onNext }) {
    const [step, setStep] = useState(0)   // 0=close 1=think 2=wish 3=done
    const [wished, setWished] = useState(false)

    const advance = () => {
        if (step < 2) setStep(s => s + 1)
        else if (step === 2 && !wished) {
            setWished(true)
            burst()
        }
    }

    return (
        <div className="w-full min-h-screen flex flex-col items-center justify-center px-6 py-12 gap-8">

            {/* Title */}
            <motion.div
                initial={{ opacity: 0, y: -12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center"
            >
                <span className="text-xs font-semibold tracking-widest text-primary/60 uppercase">One special moment</span>
                <h2 className="text-3xl md:text-4xl font-bold text-primary mt-1">Make a Wish 🌠</h2>
            </motion.div>

            {/* Stage */}
            <div
                className="relative w-full max-w-sm h-80 md:h-96 rounded-[40px] flex items-center justify-center overflow-hidden shadow-2xl"
                style={{ background: "linear-gradient(to bottom, #0d0520 0%, #1a0a2e 40%, #2d1b4e 75%, #4a2c6e 100%)" }}
            >
                {/* Floating stars */}
                {floatingStars.map(s => (
                    <motion.div
                        key={s.id}
                        className="absolute rounded-full bg-white"
                        style={{ left: s.x, top: s.y, width: s.size, height: s.size }}
                        animate={{ opacity: [0.15, 0.9, 0.15], scale: [0.8, 1.2, 0.8] }}
                        transition={{ duration: s.dur, delay: s.delay, repeat: Infinity, ease: "easeInOut" }}
                    />
                ))}

                {/* Shooting stars */}
                {shootingStars.map(s => (
                    <motion.div
                        key={s.id}
                        className="absolute"
                        style={{ left: s.x1, top: s.y1, rotate: s.angle }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: [0, 1, 0] }}
                        transition={{ duration: 0.6, delay: s.delay, repeat: Infinity, repeatDelay: 5 }}
                    >
                        <div className="w-16 h-[2px] rounded-full"
                            style={{ background: "linear-gradient(to right, transparent, white, transparent)" }} />
                    </motion.div>
                ))}

                {/* Glow after wish */}
                <AnimatePresence>
                    {wished && (
                        <motion.div
                            className="absolute inset-0 rounded-[40px]"
                            style={{ background: "radial-gradient(ellipse at center, rgba(167,139,250,0.35) 0%, transparent 70%)" }}
                            initial={{ opacity: 0, scale: 0.6 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 1.2 }}
                        />
                    )}
                </AnimatePresence>

                {/* Orb */}
                <div className="relative flex items-center justify-center">
                    {/* Outer pulse rings */}
                    {[1, 2, 3].map(i => (
                        <motion.div
                            key={i}
                            className="absolute rounded-full border border-violet-400/30"
                            animate={{ scale: [1, 1.6 + i * 0.3], opacity: [0.5, 0] }}
                            transition={{ duration: 2, delay: i * 0.5, repeat: Infinity, ease: "easeOut" }}
                            style={{ width: 120, height: 120 }}
                        />
                    ))}

                    {/* Burst rays after wish */}
                    <AnimatePresence>
                        {wished && [...Array(12)].map((_, i) => (
                            <motion.div
                                key={i}
                                className="absolute w-0.5 rounded-full"
                                style={{
                                    height: 40,
                                    background: "linear-gradient(to top, #a78bfa, transparent)",
                                    rotate: i * 30,
                                    transformOrigin: "bottom center",
                                    bottom: "50%",
                                }}
                                initial={{ scaleY: 0, opacity: 0 }}
                                animate={{ scaleY: [0, 1, 0], opacity: [0, 1, 0] }}
                                transition={{ duration: 0.8, delay: i * 0.04 }}
                            />
                        ))}
                    </AnimatePresence>

                    {/* Main orb button */}
                    <motion.button
                        onClick={advance}
                        disabled={wished}
                        whileHover={!wished ? { scale: 1.06 } : {}}
                        whileTap={!wished ? { scale: 0.94 } : {}}
                        animate={wished
                            ? { scale: [1, 1.25, 1], rotate: [0, 15, -15, 0] }
                            : { scale: [1, 1.04, 1] }
                        }
                        transition={wished
                            ? { duration: 0.6 }
                            : { duration: 3, repeat: Infinity, ease: "easeInOut" }
                        }
                        className="relative w-32 h-32 rounded-full flex flex-col items-center justify-center gap-1 cursor-pointer z-10"
                        style={{
                            background: wished
                                ? "radial-gradient(circle at 35% 35%, #c4b5fd, #7c3aed)"
                                : "radial-gradient(circle at 35% 35%, #ede9fe, #a78bfa)",
                            boxShadow: wished
                                ? "0 0 40px rgba(167,139,250,0.9), 0 0 80px rgba(124,58,237,0.5)"
                                : "0 0 24px rgba(167,139,250,0.6), 0 0 48px rgba(124,58,237,0.3)",
                        }}
                    >
                        <motion.span
                            className="text-4xl"
                            animate={wished ? { rotate: [0, 360] } : {}}
                            transition={{ duration: 0.8 }}
                        >
                            {wished ? "🌟" : step === 0 ? "😌" : step === 1 ? "💭" : "⭐"}
                        </motion.span>
                        <span className="text-[11px] font-bold text-violet-900/80 tracking-wide">
                            {wished ? "Wished!" : step === 0 ? "Close Eyes" : step === 1 ? "Think..." : "Tap!"}
                        </span>
                    </motion.button>
                </div>
            </div>

            {/* Step indicators */}
            <div className="flex items-center gap-3">
                {["😌 Close eyes", "💭 Think", "⭐ Wish"].map((label, i) => (
                    <motion.div
                        key={i}
                        className="flex items-center gap-1.5"
                        animate={{ opacity: step >= i ? 1 : 0.3 }}
                        transition={{ duration: 0.4 }}
                    >
                        <div className={`w-2 h-2 rounded-full transition-colors duration-300 ${step > i || wished ? "bg-primary" : step === i ? "bg-primary/60" : "bg-primary/20"}`} />
                        <span className="text-xs text-foreground/60">{label}</span>
                        {i < 2 && <div className="w-4 h-px bg-primary/20 ml-1" />}
                    </motion.div>
                ))}
            </div>

            {/* Instruction / reveal card */}
            <AnimatePresence mode="wait">
                {!wished ? (
                    <motion.p
                        key="hint"
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.4 }}
                        className="text-sm text-foreground/50 text-center"
                    >
                        {step === 0 && "Close your eyes and take a deep breath 🌙"}
                        {step === 1 && "Think of something you truly wish for 💫"}
                        {step === 2 && "Hold it in your heart... now tap the star! ⭐"}
                    </motion.p>
                ) : (
                    <motion.div
                        key="reveal"
                        initial={{ opacity: 0, scale: 0.85, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.3, type: "spring", stiffness: 200, damping: 18 }}
                        className="w-full max-w-sm bg-white/60 backdrop-blur-sm border border-violet-100 rounded-3xl px-6 py-5 shadow-lg text-center"
                    >
                        <motion.div
                            className="text-3xl mb-2"
                            animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.2, 1] }}
                            transition={{ duration: 0.8, delay: 0.5 }}
                        >
                            🌌
                        </motion.div>
                        <p className="text-lg font-bold text-primary">Your wish is on its way!</p>
                        <p className="text-sm text-foreground/60 mt-1">
                            The universe heard you. May every dream you hold come true today and always ✨
                        </p>
                        <div className="flex justify-center gap-1 mt-3">
                            {["🌟", "💫", "✨", "💫", "🌟"].map((e, i) => (
                                <motion.span
                                    key={i}
                                    className="text-base"
                                    animate={{ y: [0, -6, 0] }}
                                    transition={{ duration: 1.2, delay: i * 0.15, repeat: Infinity }}
                                >
                                    {e}
                                </motion.span>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {wished && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 1.2, type: "spring", stiffness: 200 }}
                    >
                        <Button onClick={onNext} className="bg-gradient-to-r from-violet-500 to-purple-600 text-white shadow-lg shadow-violet-300">
                            <Sparkles size={17} /> Continue
                        </Button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
