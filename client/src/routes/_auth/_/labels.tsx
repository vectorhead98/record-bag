import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/_auth/_/labels")({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_auth/_/labels"!</div>
}
