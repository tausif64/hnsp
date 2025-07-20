import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar"

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"

const invoices = [
    {
        name: "Name",
        date: "23-03-2025",
        assigned: "mar.audrey@gmail.com",
        status: "Editor",
    },
    {
        name: "Name",
        date: "23-03-2025",
        assigned: "mar.audrey@gmail.com",
        status: "Editor",
    },
    {
        name: "Name",
        date: "23-03-2025",
        assigned: "mar.audrey@gmail.com",
        status: "Program Head",
    },
    {
        name: "Name",
        date: "23-03-2025",
        assigned: "mar.audrey@gmail.com",
        status: "Coordinator",
    },
]

const AccessPage = () => {
    return (
        <div className="p-8">
            <Button type="button">Add User</Button>
            <Table className="max-w-3xl">
                <TableHeader>
                    <TableRow>
                        <TableHead>NAME</TableHead>
                        <TableHead>DATE</TableHead>
                        <TableHead>ASSIGNED</TableHead>
                        <TableHead>STATUS</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {invoices.map((item) => (
                        <TableRow key={item.name}>
                            <TableCell className="font-medium flex items-center gap-4">
                                <Avatar>
                                    <AvatarImage className="rounded-full h-10 " src="https://github.com/shadcn.png" />
                                    <AvatarFallback>CN</AvatarFallback>
                                </Avatar>
                                <div>
                                    {item.name}
                                </div>
                            </TableCell>
                            <TableCell>{item.date}</TableCell>
                            <TableCell>{item.assigned}</TableCell>
                            <TableCell>
                                <Select>
                                    <SelectTrigger className="w-[180px]">
                                        <SelectValue placeholder={item.status} />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectLabel>Status</SelectLabel>
                                            <SelectItem value="editor">Editor</SelectItem>
                                            <SelectItem value="programHead">Program Head</SelectItem>
                                            <SelectItem value="coordinator">Coordinator</SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}

export default AccessPage