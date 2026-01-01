'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'

export default function ComingSoon() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 py-8 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 left-10 text-brand-red/20 text-6xl font-light select-none animate-float" style={{ animationDelay: '0s', animationDuration: '6s' }}>あ</div>
        <div className="absolute top-40 right-20 text-brand-red/20 text-5xl font-light select-none animate-float" style={{ animationDelay: '1s', animationDuration: '7s' }}>か</div>
        <div className="absolute bottom-32 left-20 text-brand-red/20 text-7xl font-light select-none animate-float" style={{ animationDelay: '2s', animationDuration: '8s' }}>さ</div>
        <div className="absolute bottom-20 right-10 text-brand-red/20 text-4xl font-light select-none animate-float" style={{ animationDelay: '0.5s', animationDuration: '6.5s' }}>た</div>
        <div className="absolute top-1/3 left-1/4 text-brand-red/15 text-8xl font-light select-none animate-float" style={{ animationDelay: '1.5s', animationDuration: '9s' }}>な</div>
        <div className="absolute bottom-1/3 right-1/4 text-brand-red/15 text-8xl font-light select-none animate-float" style={{ animationDelay: '2.5s', animationDuration: '7.5s' }}>は</div>
        <div className="absolute top-1/2 left-1/3 text-brand-red/20 text-5xl font-light select-none animate-float" style={{ animationDelay: '3s', animationDuration: '8.5s' }}>い</div>
        <div className="absolute top-2/3 right-1/3 text-brand-red/20 text-6xl font-light select-none animate-float" style={{ animationDelay: '1.2s', animationDuration: '7.2s' }}>う</div>
        <div className="absolute top-10 right-1/2 text-brand-red/15 text-4xl font-light select-none animate-float" style={{ animationDelay: '2.2s', animationDuration: '6.8s' }}>え</div>
        <div className="absolute bottom-10 left-1/2 text-brand-red/20 text-5xl font-light select-none animate-float" style={{ animationDelay: '0.8s', animationDuration: '8.2s' }}>お</div>
        <div className="absolute top-1/4 right-1/5 text-brand-red/15 text-7xl font-light select-none animate-float" style={{ animationDelay: '3.5s', animationDuration: '9.5s' }}>き</div>
        <div className="absolute bottom-1/4 left-1/5 text-brand-red/20 text-6xl font-light select-none animate-float" style={{ animationDelay: '1.8s', animationDuration: '7.8s' }}>く</div>
      </div>

      <div className="relative z-10 flex flex-col items-center text-center max-w-2xl mx-auto">
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            opacity: { duration: 0.8 },
            y: { duration: 0.8 },
          }}
        >
          <motion.div
            animate={{
              rotate: [0, 360, 0],
            }}
            transition={{
              duration: 5,
              ease: "easeInOut",
              repeat: Infinity,
              repeatType: "loop",
            }}
            style={{ display: "inline-block" }}
          >
            <Image
              src="/logo.png"
              alt="luso日本語 Logo"
              width={280}
              height={280}
              priority
              className="drop-shadow-lg"
            />
          </motion.div>
        </motion.div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-light tracking-tight mb-6 fade-in-up-delay-1">
          <span style={{ color: '#000200' }}>luso</span>
          <span style={{ color: '#c91900' }}>日本語</span>
        </h1>

        <div className="fade-in-up-delay-2 mb-8">
          <span className="inline-block px-6 py-2 rounded-full bg-brand-red text-white text-sm font-medium tracking-wider uppercase pulse-subtle">
            COMING SOON...
          </span>
        </div>

        <div className="text-brand-grey text-lg sm:text-xl mb-12 fade-in-up-delay-3 max-w-md">
          <p className="mb-2">Aprende japonês facilmente.</p>
          <p>Criado para falantes de português.</p>
        </div>

        <div className="w-24 h-px bg-gradient-to-r from-transparent via-brand-grey/30 to-transparent fade-in-up-delay-3"></div>
      </div>

      <footer className="absolute bottom-6 text-center">
        <p className="text-brand-grey/40 text-xs">
          © {new Date().getFullYear()} luso日本語. Todos os direitos reservados.
        </p>
      </footer>
    </main>
  )
}
