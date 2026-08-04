import { createRootRouteWithContext, Outlet } from "@tanstack/react-router"
import { queryOptions } from "@tanstack/react-query"
import { authQueryKey, handleAuthMe } from "@/api/auth"
import type { RouterContext } from "@/lib/config"

export const Route = createRootRouteWithContext<RouterContext>()({
  beforeLoad: async ({ context }) => {
    const user = await context.queryClient.ensureQueryData(
      queryOptions({
        queryKey: authQueryKey,
        queryFn: handleAuthMe,
      })
    )
    return { user }
  },
  component: () => <Outlet />,
})
