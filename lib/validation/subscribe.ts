import { z } from "zod"

export function sanitizeEmail(input: string) {
  return input.replace(/\s+/g, "").trim().toLowerCase()
}

export const emailSchema = z.preprocess(
  (val) => (typeof val === "string" ? val : ""),
  z
    .string()
    .transform((val) => sanitizeEmail(val))
    .pipe(
      z
        .string()
        .min(1, { message: "O email é obrigatório." })
        .pipe(z.email("Introduz um email válido."))
    )
)

