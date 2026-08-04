import { Disc3Icon, FactoryIcon, HeadphonesIcon, UserIcon } from "lucide-react"

export const MAIN_ROUTES = [
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
