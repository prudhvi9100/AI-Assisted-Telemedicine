import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Search, Filter, MoreHorizontal, UserX, UserCheck, Shield } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const users = [
  { id: 1, name: "John Doe", email: "john@example.com", role: "Patient", status: "Active", joined: "Oct 12, 2025" },
  { id: 2, name: "Dr. Jane Smith", email: "jane@clinic.com", role: "Doctor", status: "Active", joined: "Sep 05, 2025" },
  { id: 3, name: "Sarah Connor", email: "sarah@sky.net", role: "Patient", status: "Blocked", joined: "Aug 22, 2025" },
  { id: 4, name: "Dr. Robert Wilson", email: "bob@med.org", role: "Doctor", status: "Active", joined: "Jul 15, 2025" },
]

export default function UserManagement() {
  return (
    <DashboardLayout role="admin">
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground">User Management</h1>
          <p className="text-muted-foreground">Manage all registered patients and doctors on the platform.</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="relative flex-1 w-full max-w-md">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search by name or email..." className="pl-10 border-border" />
          </div>
          <div className="flex gap-2 w-full sm:w-auto">
            <Button variant="outline" className="gap-2 flex-1 sm:flex-none bg-transparent">
              <Filter className="h-4 w-4" /> Filter
            </Button>
            <Button className="gap-2 flex-1 sm:flex-none">
              <Shield className="h-4 w-4" /> Admin Controls
            </Button>
          </div>
        </div>

        <Card className="border-border">
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Joined Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <div>
                        <p className="font-bold">{user.name}</p>
                        <p className="text-xs text-muted-foreground">{user.email}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{user.role}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={user.status === "Active" ? "secondary" : "destructive"} className="gap-1">
                        {user.status === "Active" ? <UserCheck className="h-3 w-3" /> : <UserX className="h-3 w-3" />}
                        {user.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{user.joined}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-48">
                          <DropdownMenuLabel>User Actions</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>View Details</DropdownMenuItem>
                          <DropdownMenuItem>Edit Permissions</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          {user.status === "Active" ? (
                            <DropdownMenuItem className="text-destructive">Block User</DropdownMenuItem>
                          ) : (
                            <DropdownMenuItem className="text-emerald-600">Unblock User</DropdownMenuItem>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
