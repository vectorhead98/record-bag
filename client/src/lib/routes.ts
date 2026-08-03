import {
  Disc3Icon,
  FactoryIcon,
  HeadphonesIcon,
  UserIcon,
  type LucideIcon,
} from "lucide-react"

const PATHS = ["/albums", "/artists", "/labels", "/mixes"] as const

type RoutePath = (typeof PATHS)[number]

export type Route = {
  name: string
  path: RoutePath
  Icon: LucideIcon
}

export const appRoutes: Route[] = [
  {
    name: "Albums",
    path: "/albums",
    Icon: Disc3Icon,
  },
  {
    name: "Artists",
    path: "/artists",
    Icon: UserIcon,
  },
  {
    name: "Labels",
    path: "/labels",
    Icon: FactoryIcon,
  },
  {
    name: "Mixes",
    path: "/mixes",
    Icon: HeadphonesIcon,
  },
] as const
