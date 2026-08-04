import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "../ui/sidebar"
import { SidebarMain } from "./sidebar-main"
import { SidebarUser } from "./sidebar-user"

export function AppSidebar() {
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarUser />
      </SidebarHeader>
      <SidebarContent>
        <SidebarMain />
      </SidebarContent>
      <SidebarFooter>{/* ??? */}</SidebarFooter>
    </Sidebar>
  )
}
