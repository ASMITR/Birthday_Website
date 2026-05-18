"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Mail, Heart, X } from "lucide-react"
import Button from "../Button"

const photos = [
    { src: "/images/1.png", caption: "A memory to cherish 💛" },
    { src: "/images/2.png", caption: "Beautiful moments 🌸" },
    { src: "/images/3.png", caption: "Always smiling ✨" },
    { src: "/images/4.png", caption: "Forever in my heart 💖" },
    { src: "/images/5.png", caption: "Pure happiness 🌟" },
    { src: "/images/6.png", caption: "My favourite person 🎀" },
    { src: "/images/7.png", caption: "You make life beautiful 🦋" },
]

export default function PhotosScreen({ onNext }) {
    const [selected, setSelected] = useState(null)

    return (
        <div className="w-full max-w-md mx-auto px-4 py-10 flex flex-col items-center gap-6">

            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center"
            >
                <span className="text-xs font-semibold tracking-widest text-primary/60 uppercase">Gallery</span>
                <h2 className="text-3xl md:text-4xl font-bold text-primary mt-1">Sweet Moments 📸</h2>
                <p className="text-sm text-foreground/50 mt-1">Tap any photo to view</p>
            </motion.div>

            {/* Photos grid */}
            <div className="w-full flex flex-col gap-5">
                {photos.map((p, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1, duration: 0.5 }}
                        onClick={() => setSelected(p)}
                        className="w-full rounded-[32px] overflow-hidden shadow-xl shadow-violet-200/50 cursor-pointer active:scale-95 transition-transform duration-200"
                    >
                        <img
                            loading="lazy"
                            src={p.src}
                            alt={`Memory ${i + 1}`}
                            className="w-full object-cover"
                        />
                        <div className="bg-white/80 backdrop-blur-sm px-5 py-3 flex items-center justify-between">
                            <p className="text-sm font-medium text-foreground/80">{p.caption}</p>
                            <Heart size={14} className="text-primary fill-primary shrink-0" />
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Hearts */}
            <div className="flex gap-1.5">
                {[...Array(5)].map((_, i) => (
                    <motion.div
                        key={i}
                        animate={{ scale: [1, 1.3, 1] }}
                        transition={{ duration: 1, delay: i * 0.2, repeat: Infinity }}
                    >
                        <Heart size={14} className="text-primary fill-primary" />
                    </motion.div>
                ))}
            </div>

            <Button onClick={onNext} className="bg-gradient-to-r from-violet-500 to-purple-600 text-white shadow-lg shadow-violet-300">
                <Mail size={18} /> Open My Message
            </Button>

            {/* Fullscreen lightbox */}
            <AnimatePresence>
                {selected && (
                    <motion.div
                        className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/95"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        onClick={() => setSelected(null)}
                    >
                        {/* Close button */}
                        <motion.button
                            className="absolute top-5 right-5 z-10 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white border border-white/20"
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.5 }}
                            transition={{ duration: 0.3, delay: 0.1 }}
                            onClick={() => setSelected(null)}
                        >
                            <X size={18} />
                        </motion.button>

                        {/* Image */}
                        <motion.img
                            src={selected.src}
                            alt="Full view"
                            className="max-w-full max-h-[80vh] object-contain rounded-2xl shadow-2xl"
                            initial={{ scale: 0.7, opacity: 0, y: 40 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.7, opacity: 0, y: 40 }}
                            transition={{ type: "spring", stiffness: 260, damping: 22 }}
                            onClick={e => e.stopPropagation()}
                        />

                        {/* Caption */}
                        <motion.p
                            className="mt-5 text-white/80 text-sm font-medium text-center px-6"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            transition={{ delay: 0.2, duration: 0.4 }}
                        >
                            {selected.caption}
                        </motion.p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
