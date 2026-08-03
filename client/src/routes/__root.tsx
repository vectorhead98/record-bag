import { createRootRouteWithContext, Outlet } from "@tanstack/react-router"
import { queryOptions } from "@tanstack/react-query"
import { authMeQueryKey, handleAuthMe } from "@/api/auth-api"
import type { RouterContext } from "@/lib/config"

export const Route = createRootRouteWithContext<RouterContext>()({
  beforeLoad: async ({ context }) => {
    const user = await context.queryClient.ensureQueryData(
      queryOptions({
        queryKey: authMeQueryKey,
        queryFn: handleAuthMe,
        retry: false,
      })
    )
    return { user }
  },
  component: () => <Outlet />,
})
