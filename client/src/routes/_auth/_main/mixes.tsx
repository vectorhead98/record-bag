import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/_auth/_main/mixes")({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_auth/_/mixes"!</div>
}
