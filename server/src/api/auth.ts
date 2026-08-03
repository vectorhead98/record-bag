import db from "../db/sqlite"
import { Hono } from "hono"
import { deleteCookie, getCookie, setCookie } from "hono/cookie"
import { HTTPException } from "hono/http-exception"
import {
  MAX_AGE,
  loginSchema,
  unixPlus,
  type User,
  type UserRow,
} from "@record-bag/shared"

const auth = new Hono()

  .get("/me", async (c) => {
    const token = getCookie(c, "session")
    if (!token) throw new HTTPException(401, { message: "Unauthorized" })

    const user = db
      .query(
        `
        SELECT
          users.id, users.username, users.country, users.admin, users.created_at
        FROM users JOIN sessions ON sessions.user_id = users.id
        WHERE sessions.token = ? AND sessions.expires_at > unixepoch()
        `
      )
      .get(token) as User | null

    if (!user) {
      deleteCookie(c, "session", { path: "/" })
      throw new HTTPException(401, { message: "Unauthorized" })
    }

    return c.json({ user }, 200)
  })

  .post("/login", async (c) => {
    const { username, password } = loginSchema.parse(await c.req.json())

    const match = db
      .query(`SELECT * FROM users WHERE username = ?`)
      .get(username) as UserRow | null

    if (!match || !(await Bun.password.verify(password, match.password_hash))) {
      throw new HTTPException(401, { message: "Unauthorized" })
    }

    const user: User = {
      id: match.id,
      country: match.country,
      username: match.username,
      admin: match.admin,
      created_at: match.created_at,
    }

    const sessionToken = crypto.randomUUID()
    const expiresAt = unixPlus(MAX_AGE)

    db.run(
      `
      INSERT INTO sessions (token, user_id, expires_at)
      VALUES (?, ?, ?)
      `,
      [sessionToken, user.id, expiresAt]
    )

    setCookie(c, "session", sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Lax",
      path: "/",
      maxAge: MAX_AGE,
    })

    return c.json({ user }, 200)
  })

  .post("/logout", async (c) => {
    const token = getCookie(c, "session")

    if (token) {
      db.run(`DELETE FROM sessions WHERE token = ?`, [token])
    }
    deleteCookie(c, "session", { path: "/" })

    return c.json({ ok: true }, 200)
  })

export default auth
