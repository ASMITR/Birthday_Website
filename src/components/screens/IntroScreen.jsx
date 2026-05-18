"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Gift, Sparkles } from "lucide-react"
import Button from "../Button"

// 🖼️ Adjust desktop image position: "object-top" | "object-center" | "object-[center_10%]" | "object-[center_20%]" | "object-[center_30%]"
const DESKTOP_IMG_POSITION = "object-[center_20%]"

export default function IntroScreen({ onNext }) {
    const [loaded, setLoaded] = useState(false)

    return (
        <div className="fixed inset-0 w-full h-full z-10 bg-black">

            {/* ── MOBILE & TABLET: full-screen background ── */}
            <div className="lg:hidden w-full h-full">
                <motion.img
                    src="/images/1.png"
                    alt="Birthday Girl"
                    onLoad={() => setLoaded(true)}
                    initial={{ opacity: 0, scale: 1.05, filter: "blur(12px)" }}
                    animate={loaded ? { opacity: 1, scale: 1, filter: "blur(0px)" } : {}}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                    className="absolute inset-0 w-full h-full object-cover object-top will-change-transform"
                />

                <motion.div
                    className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/85"
                    initial={{ opacity: 0 }}
                    animate={loaded ? { opacity: 1 } : {}}
                    transition={{ duration: 1, delay: 0.3 }}
                />

                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={loaded ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.8, duration: 0.7 }}
                    className="absolute top-8 left-0 right-0 flex justify-center z-10"
                >
                    <div className="flex items-center gap-1.5 bg-white/20 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-semibold text-white border border-white/30">
                        <Sparkles size={12} />
                        A Birthday Surprise
                        <Sparkles size={12} />
                    </div>
                </motion.div>

                {["🎉", "🎊", "✨", "🎈"].map((e, i) => (
                    <motion.span
                        key={i}
                        className="absolute text-3xl pointer-events-none select-none z-10"
                        style={{ left: `${[6, 80, 14, 74][i]}%`, top: `${[14, 12, 78, 76][i]}%` }}
                        initial={{ opacity: 0 }}
                        animate={loaded ? { opacity: 1, y: [0, -12, 0], rotate: [-5, 5, -5] } : {}}
                        transition={{ duration: 2.5 + i * 0.4, repeat: Infinity, ease: "easeInOut", delay: 1 + i * 0.3 }}
                    >
                        {e}
                    </motion.span>
                ))}

                <motion.div
                    className="absolute bottom-0 left-0 right-0 z-10 px-7 pb-12 pt-20 bg-gradient-to-t from-black/80 via-black/50 to-transparent flex flex-col items-center gap-5"
                    initial={{ opacity: 0, y: 40 }}
                    animate={loaded ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.9, duration: 0.8, ease: "easeOut" }}
                >
                    <div className="text-center">
                        <span className="text-xs font-semibold tracking-widest text-white/60 uppercase">Today is your day</span>
                        <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight mt-1 drop-shadow-lg">
                            A Cutiepie was born,<br />21 years ago! 🥳
                        </h1>
                        <p className="text-white/80 text-sm md:text-base mt-3 leading-relaxed">
                            Yes, it is <span className="font-bold text-white">YOU!</span> A little surprise has been crafted with love, just for you. 🎁
                        </p>
                    </div>
                    <Button onClick={() => onNext?.()} className="bg-gradient-to-r from-violet-500 to-purple-600 text-white shadow-lg shadow-violet-900/50">
                        <Gift size={18} />
                        Start the Surprise
                    </Button>
                </motion.div>
            </div>

            {/* ── DESKTOP: split layout ── */}
            <div className="hidden lg:flex w-full h-full">

                {/* Left — image panel */}
                <div className="relative w-1/2 h-full overflow-hidden">
                    <motion.img
                        src="/images/1.png"
                        alt="Birthday Girl"
                        onLoad={() => setLoaded(true)}
                        initial={{ opacity: 0, scale: 1.05, filter: "blur(12px)" }}
                        animate={loaded ? { opacity: 1, scale: 1, filter: "blur(0px)" } : {}}
                        transition={{ duration: 1.2, ease: "easeOut" }}
                        className={`w-full h-full object-cover ${DESKTOP_IMG_POSITION} will-change-transform`}
                    />
                    <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent to-black/60"
                        initial={{ opacity: 0 }}
                        animate={loaded ? { opacity: 1 } : {}}
                        transition={{ duration: 1, delay: 0.3 }}
                    />
                </div>

                {/* Right — content panel */}
                <div className="relative w-1/2 h-full flex flex-col items-center justify-center px-16 bg-gradient-to-br from-zinc-900 to-black">

                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={loaded ? { opacity: 1, y: 0 } : {}}
                        transition={{ delay: 0.8, duration: 0.7 }}
                        className="absolute top-8 flex justify-center"
                    >
                        <div className="flex items-center gap-1.5 bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-semibold text-white border border-white/20">
                            <Sparkles size={12} />
                            A Birthday Surprise
                            <Sparkles size={12} />
                        </div>
                    </motion.div>

                    {["🎉", "🎊", "✨", "🎈"].map((e, i) => (
                        <motion.span
                            key={i}
                            className="absolute text-3xl pointer-events-none select-none"
                            style={{ left: `${[55, 88, 58, 85][i]}%`, top: `${[12, 10, 80, 78][i]}%` }}
                            initial={{ opacity: 0 }}
                            animate={loaded ? { opacity: 1, y: [0, -12, 0], rotate: [-5, 5, -5] } : {}}
                            transition={{ duration: 2.5 + i * 0.4, repeat: Infinity, ease: "easeInOut", delay: 1 + i * 0.3 }}
                        >
                            {e}
                        </motion.span>
                    ))}

                    <motion.div
                        className="flex flex-col items-center gap-6 text-center"
                        initial={{ opacity: 0, y: 40 }}
                        animate={loaded ? { opacity: 1, y: 0 } : {}}
                        transition={{ delay: 0.9, duration: 0.8, ease: "easeOut" }}
                    >
                        <div>
                            <span className="text-xs font-semibold tracking-widest text-white/50 uppercase">Today is your day</span>
                            <h1 className="text-5xl xl:text-6xl font-bold text-white leading-tight mt-2 drop-shadow-lg">
                                A Cutiepie was born,<br />21 years ago! 🥳
                            </h1>
                            <p className="text-white/70 text-base mt-4 leading-relaxed max-w-sm">
                                Yes, it is <span className="font-bold text-white">YOU!</span> A little surprise has been crafted with love, just for you. 🎁
                            </p>
                        </div>
                        <Button onClick={() => onNext?.()} className="bg-gradient-to-r from-violet-500 to-purple-600 text-white shadow-lg shadow-violet-900/50">
                            <Gift size={18} />
                            Start the Surprise
                        </Button>
                    </motion.div>
                </div>
            </div>
        </div>
    )
}
