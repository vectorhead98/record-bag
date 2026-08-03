import { createFileRoute, redirect, Outlet } from "@tanstack/react-router"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { TooltipProvider } from "@/components/ui/tooltip"
import { AppHeader } from "@/components/header/app-header"
import { AppSidebar } from "@/components/sidebar/app-sidebar"

export const Route = createFileRoute("/_auth")({
  beforeLoad: ({ context }) => {
    if (!context.user) {
      throw redirect({ to: "/" })
    }
  },
  component: AuthLayout,
})

function AuthLayout() {
  return (
    <TooltipProvider>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <AppHeader />
          <Outlet />
        </SidebarInset>
      </SidebarProvider>
    </TooltipProvider>
  )
}
