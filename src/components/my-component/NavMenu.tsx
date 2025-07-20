import { type LucideIcon } from "lucide-react"

import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import { NavLink } from "react-router-dom"

const activeLink = ({ isActive }: { isActive: boolean; }) => (isActive ? "group active" : "");

export function NavMenu({
    items
}: {
    items: {
        title: string
        url: string
        icon?: LucideIcon
    }[],
}) 
{
    return (
        <SidebarGroup>
            <SidebarGroupLabel className="font-bold">NAVIGATION</SidebarGroupLabel>
            <SidebarMenu>
                {items.map((item, index) => (
                    <SidebarMenuItem key={index}>
                        <NavLink to={item.url} className={activeLink}>
                            <SidebarMenuButton tooltip={item.title}>
                                {item.icon && <item.icon />}
                                <span>{item.title}</span>
                            </SidebarMenuButton>
                       </NavLink>
                    </SidebarMenuItem>
                ))}
            </SidebarMenu>
        </SidebarGroup>
    )
}
