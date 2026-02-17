import { NextResponse } from "next/server"

import { emailSchema } from "@/lib/validation/subscribe"

export async function POST(req: Request) {
  try {
    const body = (await req.json().catch(() => null)) as unknown
    const emailRaw = (body as { email?: unknown } | null)?.email

    const parsed = emailSchema.safeParse(emailRaw)
    if (!parsed.success) {
      const message =
        parsed.error.issues[0]?.message ?? "Introduz um email válido."
      return NextResponse.json({ ok: false, message }, { status: 400 })
    }

    const apiSecret = process.env.CONVERTKIT_API_SECRET
    const tagId = process.env.CONVERTKIT_TAG_ID

    if (!apiSecret || !tagId) {
      return NextResponse.json(
        { ok: false, message: "Configuração de email indisponível." },
        { status: 500 }
      )
    }

    const res = await fetch(
      `https://api.convertkit.com/v3/tags/${tagId}/subscribe`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
        body: JSON.stringify({
          api_secret: apiSecret,
          email: parsed.data,
        }),
      }
    )

    if (!res.ok) {
      const text = await res.text().catch(() => "")
      return NextResponse.json(
        {
          ok: false,
          message: "Não foi possível subscrever. Tenta novamente.",
          debug: process.env.NODE_ENV === "development" ? text : undefined,
        },
        { status: 502 }
      )
    }

    const data = (await res.json().catch(() => null)) as {
      subscription?: { created_at?: string; state?: string }
    } | null

    const createdAt = data?.subscription?.created_at
    const alreadySubscribed =
      typeof createdAt === "string" &&
      Date.now() - new Date(createdAt).getTime() > 10_000

    return NextResponse.json(
      {
        ok: true,
        alreadySubscribed,
        ...(process.env.NODE_ENV === "development" && data
          ? { _debugKit: data }
          : {}),
      },
      { status: 200 }
    )
  } catch {
    return NextResponse.json(
      { ok: false, message: "Algo correu mal. Tenta novamente." },
      { status: 500 }
    )
  }
}

