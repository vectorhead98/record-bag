import type { COUNTRY_CODES } from "./country-codes"

export type CountryCode = (typeof COUNTRY_CODES)[number]

export const MAX_AGE = 7 * 24 * 60 * 60

export function unixNow(): number {
  return Math.floor(Date.now() / 1000)
}

export function unixPlus(seconds: number): number {
  return unixNow() + seconds
}
