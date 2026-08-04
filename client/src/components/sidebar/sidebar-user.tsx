import { useRouteContext, useRouter } from "@tanstack/react-router"
import { useQueryClient } from "@tanstack/react-query"
import { authQueryKey, handleAuthLogout } from "@/api/auth"
import { lookUpCountry } from "@/lib/countries"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu"
import { Separator } from "../ui/separator"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "../ui/sidebar"
import { toast } from "../ui/toast"
import { ItemWrapper } from "../ui"
import { AudioWaveformIcon } from "lucide-react"

export function SidebarUser() {
  const { open } = useSidebar()
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger className="w-full">
            <SidebarMenuButton>
              <div className="size-4 flex items-center justify-center">
                <AudioWaveformIcon className="size-5" />
              </div>
              <span className="text-base">Record Bag</span>
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            side={!open ? "right" : "bottom"}
            className="min-w-48"
          >
            <DropdownMenuGroup>
              <UserItem />
              <Separator className="my-1" />
              <LogoutItem />
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}

function LogoutItem() {
  const router = useRouter()
  const queryClient = useQueryClient()
  return (
    <DropdownMenuItem
      variant="destructive"
      onClick={async () => {
        try {
          await handleAuthLogout()
          queryClient.setQueryData(authQueryKey, null)
          await router.invalidate()
        } catch (err) {
          toast.add({
            type: "error",
            description: err instanceof Error ? err.message : "Logout failed",
          })
        }
      }}
    >
      <ItemWrapper size="xs" title="Logout" />
    </DropdownMenuItem>
  )
}

function UserItem() {
  const { user } = useRouteContext({ from: "/_auth" })
  const { username, flag } = {
    username: user?.username ?? "guest",
    flag: lookUpCountry(user?.country ?? "NN").flag,
  }
  return (
    <DropdownMenuItem>
      <ItemWrapper size="xs" title="User" description={`${flag} ${username}`} />
    </DropdownMenuItem>
  )
}
