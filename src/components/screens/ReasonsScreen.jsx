"use client"

import { motion } from "framer-motion"
import { MoveRight } from "lucide-react"
import Button from "../Button"

const reasons = [
    { emoji: "😊", text: "Your smile lights up every room" },
    { emoji: "💛", text: "Your kindness is truly one of a kind" },
    { emoji: "🌟", text: "You make everything more fun" },
    { emoji: "🤗", text: "Your hugs feel like home" },
    { emoji: "✨", text: "You inspire everyone around you" },
    { emoji: "🎯", text: "Your determination is unstoppable" },
    { emoji: "🌸", text: "You bring beauty into ordinary days" },
    { emoji: "💪", text: "You are stronger than you know" },
]

export default function ReasonsScreen({ onNext }) {
    return (
        <div className="w-full max-w-md mx-auto px-4 py-10 flex flex-col items-center gap-6">

            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center"
            >
                <span className="text-xs font-semibold tracking-widest text-primary/60 uppercase">Just for you</span>
                <h2 className="text-3xl md:text-4xl font-bold text-primary mt-1">Reasons You are Amazing 💫</h2>
                <p className="text-sm text-foreground/50 mt-1">A few of the many reasons...</p>
            </motion.div>

            {/* Reasons list */}
            <div className="w-full flex flex-col gap-3">
                {reasons.map((r, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1, duration: 0.5 }}
                        className="flex items-center gap-4 bg-white/60 backdrop-blur-sm border border-violet-100 rounded-2xl px-5 py-4 shadow-sm"
                    >
                        <span className="text-3xl">{r.emoji}</span>
                        <p className="text-sm md:text-base text-foreground font-medium">{r.text}</p>
                    </motion.div>
                ))}
            </div>

            <Button onClick={onNext} className="bg-gradient-to-r from-violet-500 to-purple-600 text-white shadow-lg shadow-violet-300">
                Next <MoveRight size={18} />
            </Button>
        </div>
    )
}
