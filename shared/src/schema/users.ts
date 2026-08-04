import { z } from "zod"
import { countrySchema, zBoolInt, zEmail, zNotEmpty, zPosInt } from "./z"

const userRowSchema = z.object({
  id: zPosInt,
  email: zEmail,
  username: z.string().trim().min(1).max(12),
  country: countrySchema,
  password_hash: zNotEmpty,
  admin: zBoolInt,
  created_at: zPosInt,
})

export type UserRow = z.infer<typeof userRowSchema>

const userSchema = userRowSchema.omit({
  email: true,
  password_hash: true,
})

export type User = z.infer<typeof userSchema>

export const loginSchema = z.object({
  username: zNotEmpty,
  password: zNotEmpty,
})

export type Login = z.input<typeof loginSchema>
