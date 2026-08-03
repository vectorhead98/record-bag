import { z } from "zod"
import { COUNTRY_CODES } from "../lib/country-codes"

export const zBoolInt = z.number().int().min(0).max(1)

export const zEmail = z.email().max(254)

export const zNotEmpty = z.string().min(1)

export const zPosInt = z.number().int().positive()

export const countrySchema = z.enum(COUNTRY_CODES)

export const countryInsertSchema = z
  .union([z.literal(""), z.null(), z.undefined(), countrySchema])
  .transform((val) => (!val ? "NN" : val))
