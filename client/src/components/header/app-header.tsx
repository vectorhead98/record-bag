import { Separator } from "../ui/separator"
import { SidebarTrigger } from "../ui/sidebar"

export function AppHeader() {
  return (
    <div className="sticky top-0 h-12 z-10 flex items-center gap-2 border-b p-2">
      <SidebarTrigger size="icon_lg" />
      <Separator orientation="vertical" />
    </div>
  )
}
