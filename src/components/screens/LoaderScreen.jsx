"use client"

import { motion } from "framer-motion"
import { Sparkles } from "lucide-react"

export default function LoaderScreen({ onDone }) {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center gap-8"
        >
            {/* Pulsing cake */}
            <div className="relative flex items-center justify-center">
                <motion.div
                    className="absolute w-36 h-36 rounded-full bg-purple-200/40"
                    animate={{ scale: [1, 1.4, 1], opacity: [0.5, 0, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.div
                    className="absolute w-24 h-24 rounded-full bg-violet-300/40"
                    animate={{ scale: [1, 1.6, 1], opacity: [0.6, 0, 0.6] }}
                    transition={{ duration: 2, delay: 0.3, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.div
                    animate={{ rotate: [0, -8, 8, -8, 0], scale: [1, 1.1, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                    className="text-7xl relative z-10"
                >
                    🎂
                </motion.div>
            </div>

            {/* Text */}
            <div className="text-center">
                <motion.h1
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.8 }}
                    className="text-2xl md:text-3xl font-bold text-primary"
                >
                    Something special
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7, duration: 0.8 }}
                    className="text-foreground/70 mt-1 text-sm"
                >
                    is waiting just for you...
                </motion.p>
            </div>

            {/* Start button */}
            <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1, type: "spring", stiffness: 200 }}
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.95 }}
                onClick={onDone}
                className="flex items-center gap-2 bg-gradient-to-r from-violet-400 to-purple-500 text-white font-semibold px-8 py-3.5 rounded-full shadow-lg shadow-purple-200 text-base"
            >
                <Sparkles size={18} />
                Open Your Surprise
                <Sparkles size={18} />
            </motion.button>

            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.3 }}
                className="text-xs text-foreground/40"
            >
                🎵 Music will play on click
            </motion.p>
        </motion.div>
    )
}
