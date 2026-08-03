import { z } from "zod"
import {
  countryInsertSchema,
  countrySchema,
  zBoolInt,
  zEmail,
  zNotEmpty,
  zPosInt,
} from "./z"

export const userRowSchema = z.object({
  id: zPosInt,
  email: zEmail,
  username: z.string().trim().min(1).max(12),
  country: countrySchema,
  password_hash: zNotEmpty,
  admin: zBoolInt,
  created_at: zPosInt,
})

export type UserRow = z.infer<typeof userRowSchema>

export const userSchema = userRowSchema.omit({
  email: true,
  password_hash: true,
})

export type User = z.infer<typeof userSchema>

export const createUserSchema = userRowSchema
  .pick({ email: true, username: true })
  .extend({
    country: countryInsertSchema,
    password: z.string().trim().min(8),
  })

export type CreateUser = z.input<typeof createUserSchema>

export const userDefaultValues = {
  icon: "",
  country: "",
  email: "",
  username: "",
  password: "",
} as CreateUser

export const loginSchema = z.object({
  username: zNotEmpty,
  password: zNotEmpty,
})

export type Login = z.input<typeof loginSchema>
