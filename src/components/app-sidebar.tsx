import * as React from "react"
import {
  Airplay,
  FileText,
  Users,
  Briefcase,
  PersonStanding,
  Presentation,
  HeartHandshake
} from "lucide-react"

import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"

import icon from "../assets/icon.png"
import { NavMenu } from "./my-component/NavMenu"
import type { RootState } from "@/store/store"
import { useSelector } from "react-redux"

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "/",
      icon: Airplay,
    },
    {
      title: "Report",
      url: "/report",
      icon: FileText,
    },
    {
      title: "Access",
      url: "/access",
      icon: Users,
    },
    {
      title: "Activity",
      url: "/activity",
      icon: PersonStanding,
    },
    {
      title: "Stock",
      url: "/stock",
      icon: Briefcase,
    },
    {
      title: "Project",
      url: "/project",
      icon: Presentation,
    },
    {
      title: "Help",
      url: "/help",
      icon: HeartHandshake,
    },
  ],

}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user } = useSelector((state: RootState) => state.auth);
  const newUser = { ...user, avatar: "/avatars/shadcn.jpg" };

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader className="bg-[#03409E]">
        <img src={icon} alt='icon' className="h-16 w-54 object-center object-cover" />
      </SidebarHeader>
      <SidebarContent>
        <NavMenu items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={newUser} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
