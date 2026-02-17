'use client'

import * as React from "react"
import Image from 'next/image'
import { AnimatePresence, motion } from 'framer-motion'
import { Loader2, Mail } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { emailSchema } from "@/lib/validation/subscribe"

export default function ComingSoon() {
  const [email, setEmail] = React.useState("")
  const [error, setError] = React.useState<string | null>(null)
  const [status, setStatus] = React.useState<"idle" | "loading" | "success">(
    "idle"
  )
  const [shake, setShake] = React.useState(false)
  const [alreadySubscribed, setAlreadySubscribed] = React.useState(false)

  function validate(raw: string) {
    const parsed = emailSchema.safeParse(raw)
    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message ?? "Introduz um email válido.")
      return null
    }
    setError(null)
    return parsed.data
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus("idle")

    const sanitized = validate(email)
    if (!sanitized) {
      setShake(true)
      setTimeout(() => setShake(false), 500)
      return
    }

    setStatus("loading")
    const res = await fetch("/api/subscribe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: sanitized }),
    })

    if (!res.ok) {
      const data = (await res.json().catch(() => null)) as
        | { message?: string }
        | null
      setStatus("idle")
      setError(data?.message ?? "Não foi possível subscrever. Tenta novamente.")
      return
    }

    const data = (await res.json()) as { alreadySubscribed?: boolean }
    setAlreadySubscribed(Boolean(data.alreadySubscribed))
    setStatus("success")
    setError(null)
  }

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
              duration: 30,
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

        <div className="w-full max-w-md fade-in-up-delay-3 mb-10">
          <p className="text-brand-grey text-sm sm:text-base mb-3">
            Deixa o teu email aqui para ficares a par de novidades sobre a plataforma.
          </p>

          <form onSubmit={onSubmit} className="w-full" noValidate>
            <label htmlFor="email" className="sr-only">
              Endereço de email
            </label>

            <div
              className={[
                "flex items-stretch w-full rounded-xl border bg-white shadow-sm overflow-hidden",
                error
                  ? "border-red-500 focus-within:ring-2 focus-within:ring-red-500/30"
                  : status === "success"
                    ? "border-green-500 focus-within:ring-2 focus-within:ring-green-500/30"
                    : "border-brand-grey/30 focus-within:ring-2 focus-within:ring-brand-red/30",
                shake ? "animate-shake" : "",
              ].join(" ")}
            >
              <div className="relative flex-1">
                <Input
                  id="email"
                  name="email"
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  placeholder="Endereço de email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value)
                    if (status === "success") {
                      setStatus("idle")
                      setAlreadySubscribed(false)
                    }
                    if (error) setError(null)
                  }}
                  onBlur={() => validate(email)}
                  aria-invalid={!!error}
                  className="border-0 shadow-none rounded-none focus-visible:ring-0 focus-visible:ring-offset-0 pr-12 h-12"
                  disabled={status === "loading"}
                />
                <div className="absolute right-4 top-1/2 -translate-y-1/2">
                  <div className="h-7 w-7 rounded-full bg-brand-grey/10 flex items-center justify-center">
                    <Mail className="h-4 w-4 text-brand-grey" aria-hidden="true" />
                  </div>
                </div>
              </div>

              <Button
                type="submit"
                variant="brand"
                className="h-12 rounded-none px-6 font-semibold overflow-hidden min-w-[132px]"
                disabled={status === "loading"}
              >
                <AnimatePresence mode="wait" initial={false}>
                  {status === "loading" ? (
                    <motion.span
                      key="loading"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.18 }}
                      className="inline-flex items-center justify-center"
                    >
                      <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                      <span className="sr-only">A subscrever</span>
                    </motion.span>
                  ) : (
                    <motion.span
                      key="idle"
                      initial={{ opacity: 0, scale: 0.96 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.96 }}
                      transition={{ duration: 0.18 }}
                      className="inline-block"
                    >
                      Subscrever
                    </motion.span>
                  )}
                </AnimatePresence>
              </Button>
            </div>

            <div className="mt-2 min-h-5 text-left text-sm">
              {error ? (
                <p className={`text-red-600 ${shake ? "animate-shake" : ""}`}>
                  {error}
                </p>
              ) : status === "success" ? (
                <p className="text-green-600">
                  {alreadySubscribed
                    ? "Este email já está na lista. Vemo-nos em breve!"
                    : "Email recebido! Vemo-nos em breve!"}
                </p>
              ) : null}
            </div>
          </form>
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
