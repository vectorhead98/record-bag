import { Link } from "@tanstack/react-router"
import type { Route } from "@/lib/routes"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../ui/sidebar"

export function SidebarMain({ routes }: { routes: Route[] }) {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Routes</SidebarGroupLabel>
      <SidebarMenu>
        {routes.map(({ name, path, Icon }) => (
          <SidebarMenuItem key={path}>
            <Link to={path}>
              <SidebarMenuButton>
                <Icon />
                <span className="text-sm">{name}</span>
              </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  )
}
