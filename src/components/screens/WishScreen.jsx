"use client"

import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import confetti from "canvas-confetti"
import { MoveRight, Star } from "lucide-react"
import Button from "../Button"

export default function WishScreen({ onNext }) {
    const [wished, setWished] = useState(false)

    const makeWish = () => {
        if (wished) return
        setWished(true)
        confetti({ particleCount: 150, spread: 120, origin: { y: 0.5 }, colors: ["#a78bfa", "#7c3aed", "#ddd6fe", "#c4b5fd", "#fff"] })
        setTimeout(() => confetti({ particleCount: 80, angle: 60,  spread: 80, origin: { x: 0, y: 0.6 }, colors: ["#a78bfa", "#7c3aed"] }), 400)
        setTimeout(() => confetti({ particleCount: 80, angle: 120, spread: 80, origin: { x: 1, y: 0.6 }, colors: ["#a78bfa", "#7c3aed"] }), 400)
    }

    return (
        <div className="w-full max-w-md mx-auto px-4 py-10 flex flex-col items-center gap-8">

            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center"
            >
                <span className="text-xs font-semibold tracking-widest text-primary/60 uppercase">Close your eyes</span>
                <h2 className="text-3xl md:text-4xl font-bold text-primary mt-1">Make a Wish! 🌠</h2>
                <p className="text-sm text-foreground/50 mt-1">Think of something special, then tap the star</p>
            </motion.div>

            {/* Star button */}
            <div className="relative flex items-center justify-center">
                <AnimatePresence>
                    {wished && (
                        <>
                            {[...Array(8)].map((_, i) => (
                                <motion.div
                                    key={i}
                                    className="absolute"
                                    initial={{ opacity: 1, scale: 0, x: 0, y: 0 }}
                                    animate={{
                                        opacity: 0, scale: 1,
                                        x: Math.cos((i / 8) * Math.PI * 2) * 80,
                                        y: Math.sin((i / 8) * Math.PI * 2) * 80,
                                    }}
                                    transition={{ duration: 0.8, delay: i * 0.05 }}
                                >
                                    <Star size={18} className="text-violet-400 fill-violet-400" />
                                </motion.div>
                            ))}
                        </>
                    )}
                </AnimatePresence>

                <motion.button
                    onClick={makeWish}
                    disabled={wished}
                    whileHover={!wished ? { scale: 1.05 } : {}}
                    whileTap={!wished ? { scale: 0.95 } : {}}
                    animate={wished ? { scale: [1, 1.3, 1] } : {}}
                    transition={{ duration: 0.4 }}
                    className={`w-44 h-44 rounded-full flex flex-col items-center justify-center gap-2 shadow-2xl border-4 transition-all duration-300 ${
                        wished
                            ? "bg-gradient-to-br from-violet-500 to-purple-600 border-violet-300 cursor-default"
                            : "bg-white/70 backdrop-blur-sm border-violet-200 cursor-pointer"
                    }`}
                >
                    <motion.span
                        className="text-6xl"
                        animate={wished ? { rotate: [0, 20, -20, 0] } : {}}
                        transition={{ duration: 0.5 }}
                    >
                        {wished ? "🌟" : "⭐"}
                    </motion.span>
                    <span className={`text-sm font-semibold ${wished ? "text-white" : "text-primary/70"}`}>
                        {wished ? "Wish Made!" : "Tap to Wish"}
                    </span>
                </motion.button>
            </div>

            {/* Message */}
            <AnimatePresence>
                {wished ? (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="text-center bg-white/60 backdrop-blur-sm border border-violet-100 rounded-3xl px-6 py-5 shadow-sm w-full"
                    >
                        <p className="text-lg font-semibold text-primary">Your wish has been sent to the universe! 🌌</p>
                        <p className="text-sm text-foreground/60 mt-1">May all your dreams come true today and always ✨</p>
                    </motion.div>
                ) : (
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="text-sm text-foreground/50 text-center"
                    >
                        Close your eyes, think of something special,<br />then tap the star 🌠
                    </motion.p>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {wished && (
                    <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.8 }}>
                        <Button onClick={onNext} className="bg-gradient-to-r from-violet-500 to-purple-600 text-white shadow-lg shadow-violet-300">
                            Next <MoveRight size={18} />
                        </Button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
