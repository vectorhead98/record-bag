import { Link } from "@tanstack/react-router"
import { MAIN_ROUTES } from "@/lib/routes"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../ui/sidebar"

export function SidebarMain() {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Collection</SidebarGroupLabel>
      <SidebarMenu>
        {MAIN_ROUTES.map(({ name, path, Icon }) => (
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
