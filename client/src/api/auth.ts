import { client } from "./client"
import type { Login, User } from "@record-bag/shared"

export const authMeQueryKey = ["auth", "me"] as const

export type AuthApiResponse = User | null

export async function parseAuthApiResponse(
  res: Response
): Promise<AuthApiResponse> {
  if (!res.ok) {
    if (res.status >= 500) {
      throw new Error(`server error ${res.status}`)
    }
    return null
  }
  const { user } = await res.json()
  return user
}

export async function handleAuthMe(): Promise<AuthApiResponse> {
  const res = await client.auth.me.$get()
  return parseAuthApiResponse(res)
}

export async function handleAuthLogin(data: Login): Promise<AuthApiResponse> {
  const res = await client.auth.login.$post({ json: data })
  return parseAuthApiResponse(res)
}
