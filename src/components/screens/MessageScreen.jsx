"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Heart, RotateCcw } from "lucide-react"

export default function MessageScreen({ onReplay }) {
    const [opened, setOpened] = useState(false)

    return (
        <div className="w-full max-w-md mx-auto px-4 py-10 flex flex-col items-center gap-6">

            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center"
            >
                <span className="text-xs font-semibold tracking-widest text-primary/60 uppercase">From the heart</span>
                <h2 className="text-3xl md:text-4xl font-bold text-primary mt-1">A Special Message 💌</h2>
                {!opened && <p className="text-sm text-foreground/50 mt-1">Tap the envelope to open</p>}
            </motion.div>

            {/* Envelope / Message */}
            <div className="w-full" onClick={() => setOpened(true)}>
                <AnimatePresence mode="wait">
                    {!opened ? (
                        <motion.div
                            key="envelope"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8, y: -20 }}
                            transition={{ duration: 0.4 }}
                            className="cursor-pointer"
                        >
                            <motion.div
                                animate={{ y: [0, -10, 0] }}
                                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                                className="w-full h-52 bg-white/60 backdrop-blur-sm rounded-[32px] border-2 border-violet-200 flex flex-col items-center justify-center gap-3 shadow-xl shadow-violet-200/40"
                            >
                                <span className="text-7xl">💌</span>
                                <span className="text-sm font-medium text-primary/70">Tap to open</span>
                            </motion.div>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="message"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="w-full bg-white/60 backdrop-blur-sm border border-violet-100 rounded-[32px] p-6 shadow-xl shadow-violet-200/40"
                        >
                            <p className="text-foreground leading-relaxed text-sm md:text-base text-center italic">
                                "Happy Birthday, Cutiepie! You deserve all the happiness, love, and smiles in the world today and always. You have this special way of making everything around you brighter — your smile, your kindness, and the way you make people feel truly cared for.
                                <br /><br />
                                I hope your day is filled with laughter, surprises, and moments that make your heart happy. You are truly one of a kind, and I just want you to know how special you are.
                                <br /><br />
                                Keep being the amazing person you are, spreading joy wherever you go. Wishing you endless happiness, success, and all the sweet things life has to offer."
                            </p>
                            <div className="flex justify-center mt-5 gap-1.5">
                                {[...Array(5)].map((_, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, scale: 0 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: 0.5 + i * 0.1 }}
                                    >
                                        <Heart size={18} className="text-primary fill-primary" />
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="text-xs text-foreground/40 text-center"
            >
                Made with 💜 just for you
            </motion.p>

            <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1, type: "spring", stiffness: 200 }}
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.95 }}
                onClick={onReplay}
                className="flex items-center gap-2 bg-gradient-to-r from-violet-400 to-purple-500 text-white font-semibold px-7 py-3 rounded-full shadow-lg shadow-purple-200 text-sm"
            >
                <RotateCcw size={16} />
                Replay from Start
            </motion.button>
        </div>
    )
}
