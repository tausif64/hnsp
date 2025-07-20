import { AppSidebar } from "@/components/app-sidebar"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar"
import type { ReactNode } from "react"
import { Bell, Clock, Funnel, Moon, Search } from 'lucide-react';
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import DateRangePicker from "@/components/my-component/DateRangePicker"

export default function Layout({ children }: { children: ReactNode }) {
    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <header className="flex shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-30">
                    <div className="flex justify-center flex-col px-4 gap-2 w-full shadow-md">
                        <div className="flex items-center justify-between w-full py-2 mt-4">
                            <div className="flex items-center gap-2">
                                <SidebarTrigger className="-ml-1 [&_svg:not([class*='size-'])]:size-6" />
                                <Separator
                                    orientation="vertical"
                                    className="mr-2 data-[orientation=vertical]:h-6"
                                />
                                <Button variant='ghost' className="bg-transparent h-8 shadow-none border-1 rounded text-black ">MEGA MENU</Button>
                            </div>
                            <div className="flex items-center [&_svg:not([class*='size-'])]:size-5">
                                <Button variant='ghost'>
                                    <Search />
                                </Button>
                                <Button variant='ghost'>
                                    <Moon />
                                </Button>
                                <Button variant='ghost' className="relative mr-1">
                                    <Bell />
                                    <Badge className="absolute right-0 -top-2 h-6 w-6 rounded-full" variant='destructive'>
                                        48
                                    </Badge>
                                </Button>
                                <Button variant='ghost' className="relative mr-1">
                                    <Clock />
                                    <Badge className="absolute right-0 -top-2 h-6 w-6 rounded-full bg-green-500 text-white" variant='outline'>
                                        8
                                    </Badge>
                                </Button>
                                <Avatar>
                                    <AvatarImage src="https://github.com/shadcn.png" />
                                    <AvatarFallback>CN</AvatarFallback>
                                </Avatar>
                            </div>
                        </div>

                        <div className="mb-5 flex items-center justify-between w-full">
                            <div className="flex items-center gap-2">
                                <div className="font-bold">Dashboard</div>
                                <Separator
                                    orientation="vertical"
                                    className="data-[orientation=vertical]:h-4"
                                />
                                <div className="font-medium">Home</div>
                                <div className="ml-4">Dashboard</div>
                            </div>
                            <div className="flex items-center gap-2 max-sm:hidden">
                                <DateRangePicker />
                                <Button variant='ghost' type='button' className="bg-[#3454D1] text-white h-8 shadow-none border-1 rounded hover:bg-[#2841a3] hover:text-white">
                                    <Funnel /> <span>FILTER</span>
                                </Button>
                            </div>
                        </div>
                    </div>
                </header>
                <div className="h-full layout">
                    {children}
                </div>
                <footer className="py-5 px-7 w-full bg-[#03409E] font-medium text-white">Copyright © 2025</footer>
            </SidebarInset>
        </SidebarProvider>
    )
}
