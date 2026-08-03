import { useRouteContext, useRouter } from "@tanstack/react-router"
import { useQueryClient } from "@tanstack/react-query"
import { authMeQueryKey, handleAuthLogout } from "@/api/auth"
import { lookUpCountry } from "@/lib/countries"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu"
import { Item, ItemContent, ItemDescription, ItemTitle } from "../ui/item"
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "../ui/sidebar"
import { toast } from "../ui/toast"
import { AudioWaveformIcon } from "lucide-react"

export function SidebarBrand() {
  const { user } = useRouteContext({ from: "/_auth" })
  const { username, flag } = {
    username: user?.username ?? "guest",
    flag: lookUpCountry(user?.country ?? "NN").flag,
  }
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
          <DropdownMenuContent className="min-w-60">
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <Item size="xs">
                  <ItemContent>
                    <ItemTitle>User</ItemTitle>
                    <ItemDescription>
                      <span>{`${flag} ${username}`}</span>
                    </ItemDescription>
                  </ItemContent>
                </Item>
              </DropdownMenuItem>
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
          queryClient.setQueryData(authMeQueryKey, null)
          await router.invalidate()
        } catch (err) {
          toast.add({
            type: "error",
            description: err instanceof Error ? err.message : "Logout failed",
          })
        }
      }}
    >
      <Item size="xs">
        <ItemContent>
          <ItemTitle>Logout</ItemTitle>
        </ItemContent>
      </Item>
    </DropdownMenuItem>
  )
}
