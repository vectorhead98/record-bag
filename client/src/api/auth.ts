import { client } from "./client"
import type { Login, User } from "@record-bag/shared"

export const authMeQueryKey = ["auth", "me"] as const

export type AuthApiResponse = User | null

async function parseAuthApiResponse(res: Response): Promise<AuthApiResponse> {
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
  return parseAuthApiResponse(await client.auth.me.$get())
}

export async function handleAuthLogin(data: Login): Promise<AuthApiResponse> {
  return parseAuthApiResponse(await client.auth.login.$post({ json: data }))
}

export async function handleAuthLogout(): Promise<void> {
  const res = await client.auth.logout.$post()
  if (!res.ok) {
    throw new Error(`logout error ${res.status}`)
  }
}
